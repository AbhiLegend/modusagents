import {
  OpenAIChatModel,
  Tool,
  ToolCall,
  SystemMessage,
  UserMessage,
  ToolMessage,
  ResponseFormat,
  CompletionMessage,
  
  
} from "@hypermode/modus-sdk-as/models/openai/chat";

/**
 * Final response and log of each prompt iteration with tool use
 */
@json
export class ResponseWithLogs {
  response: string = "";
  logs: string[] = [];
}

export function llmWithDrugTools(
  model: OpenAIChatModel,
  tools: Tool[],
  system_prompt: string,
  question: string,
  toolCallBack: (toolCall: ToolCall) => string,
  limit: u8 = 3
): ResponseWithLogs {
  let logs: string[] = [];
  let final_response = "";
  let tool_messages: ToolMessage[] = [];
  let message: CompletionMessage | null = null;
  let loops: u8 = 0;

  // Loop until we get a response or reach the maximum number of iterations
  while (loops < limit) {
    loops++;

    // Instead of try...catch, use a flag to track errors
    let errorOccurred = false; 

    message = getLLMResponse(
      model,
      tools,
      system_prompt,
      question,
      message,
      tool_messages
    );

    // Ensure message is valid before proceeding
    if (!message) {
      logs.push("Error: No response received from LLM.");
      errorOccurred = true; 
    }

    if (!errorOccurred && message.toolCalls.length > 0) { 
      // Process tool calls
      for (let i = 0; i < message.toolCalls.length; i++) {
        logs.push(
          `Calling drug function: ${message.toolCalls[i].function.name} with ${message.toolCalls[i].function.arguments}`
        );
      }
      tool_messages = aggregateDrugToolsResponse(message.toolCalls, toolCallBack);

      for (let i = 0; i < tool_messages.length; i++) {
        logs.push(`Drug tool response: ${tool_messages[i].content}`);
      }
    } else if (!errorOccurred) { 
      // If no tool calls, finalize the response
      final_response = message.content;
      break; 
    }

    if (errorOccurred) {
      break; // Exit the loop if an error occurred
    }
  }

  // Log if the loop exited without a final response
  if (!final_response) {
    logs.push("Warning: No valid response generated within loop limit.");
  }

  return { response: final_response, logs: logs };
}

function getLLMResponse(
  model: OpenAIChatModel,
  tools: Tool[],
  system_prompt: string,
  question: string,
  last_message: CompletionMessage | null = null,
  tools_messages: ToolMessage[] = []
): CompletionMessage {
  const input = model.createInput([
    new SystemMessage(system_prompt),
    new UserMessage(question),
  ]);

  // Add the last message and tool responses to the input
  if (last_message != null) {
    input.messages.push(last_message);
  }
  for (let i = 0; i < tools_messages.length; i++) {
    input.messages.push(tools_messages[i]);
  }

  input.responseFormat = ResponseFormat.Text;
  input.tools = tools;
  input.toolChoice = "auto";

  // Initialize message with a default value to avoid "used before assigned" error
  // Initialize message with both content and tool_calls
  let message: CompletionMessage = new CompletionMessage("", "");

  // Removed try...catch to avoid "Not implemented: Exceptions" error
  message = model.invoke(input).choices[0].message; 

  return message; 
}

/**
 * Execute drug tool calls and return an array of ToolMessage
 */
function aggregateDrugToolsResponse(
  toolCalls: ToolCall[],
  toolCallBack: (toolCall: ToolCall) => string
): ToolMessage[] {
  const messages: ToolMessage[] = [];
  for (let i = 0; i < toolCalls.length; i++) {
    // Removed try...catch to avoid "Not implemented: Exceptions" error
    const content = toolCallBack(toolCalls[i]);
    const toolCallResponse = new ToolMessage(content, toolCalls[i].id);
    messages.push(toolCallResponse); 
  }
  return messages;
}