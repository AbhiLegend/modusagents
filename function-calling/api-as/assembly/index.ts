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
import { EnumParam, StringParam, ObjectParam } from "./params";
import { get_drug_info, get_drug_list } from "./warehouse";
import { models } from "@hypermode/modus-sdk-as";
import { llmWithDrugTools, ResponseWithLogs } from "./tool-helper";
import { JSON } from "json-as";

const MODEL_NAME: string = "llm"; // Refer to modus.json for the model specs

const DEFAULT_PROMPT = `
    You are a drug discovery assistant answering questions about drugs. You provide details such as availability, price, target, mechanism of action, phase, side effects, or pathways.
    Use tools to gather additional information when needed. If no tool can help, explain your role and expected question types.
    Reply in a single sentence using only data provided by tools. If in doubt, use the tool to list available drugs.
`;

/**
 * Ask a natural language question about drugs, for example, try asking about drug availability, side effects, or pathways.
 */
export function askQuestionToDrugAssistant(question: string): ResponseWithLogs {
  const model = models.getModel<OpenAIChatModel>(MODEL_NAME);
  const loop_limit: u8 = 3; // Maximum number of loops
  return llmWithDrugTools(
    model,
    [tool_get_drug_list(), tool_get_drug_info()],
    DEFAULT_PROMPT,
    question,
    executeToolCall,
    loop_limit,
  );
}

function executeToolCall(toolCall: ToolCall): string {
  if (toolCall.function.name === "get_drug_list") {
    return get_drug_list();
  } else if (toolCall.function.name === "get_drug_info") {
    return get_drug_info(toolCall.function.arguments);
  } else {
    return "";
  }
}

/**
 * Creates a Tool object to call the get_drug_info function in the drug discovery database.
 */
function tool_get_drug_info(): Tool {
  const get_drug_info = new Tool();
  const param = new ObjectParam();

  param.addRequiredProperty(
    "drug_name",
    new StringParam("A drug name in the database like 'Aspirin' or 'Ibuprofen'."),
  );

  param.addRequiredProperty(
    "attribute",
    new EnumParam(
      [
        "availability",
        "price_per_unit",
        "target",
        "mechanism_of_action",
        "phase",
        "side_effects",
        "pathways",
      ],
      "The drug information to retrieve.",
    ),
  );

  get_drug_info.function = {
    name: "get_drug_info",
    description: `Retrieve drug details like availability, price, target, mechanism of action, phase, side effects, or pathways.`,
    parameters: param.toString(),
    strict: true,
  };

  return get_drug_info;
}

/**
 * Creates a Tool object to call the get_drug_list function in the drug discovery database.
 */
function tool_get_drug_list(): Tool {
  const get_drug_list = new Tool();

  get_drug_list.function = {
    name: "get_drug_list",
    description: `Get the list of drug names in the database.`,
    parameters: null,
    strict: false,
  };

  return get_drug_list;
}
