Modern LLM APIs like OpenAI support function calling or tool usage, allowing the LLM to request external functions to gather information necessary for crafting its response. This capability ensures intelligent, context-aware replies.
This project showcases how to set up function calling within Modus, the open-source framework for building intelligent APIs.
Our implementation introduces a Drug Discovery Assistant, enabling users to query information about drugs, such as availability, price, side effects, and mechanisms of action.
________________________________________
Tools Available for the Assistant
The LLM interacts with the following tools:
1.	get_drug_list: Provides a list of all available drugs in the warehouse.
2.	get_drug_info: Fetches specific details about a drug, such as its availability, price, or chemical structure.
________________________________________
AI Agentic Logic Implementation Using OpenAI
Agentic Approach with openai-agents
We installed the package openai-agents to incorporate agentic logic into the system. This library enhances the interaction by providing utilities to create, manage, and invoke intelligent agents capable of dynamic decision-making.
To install the package, we used:


npm install openai-agents
Implementation Details
1.	Agent-Based Decision-Making:
o	The agent logic is implemented using openai-agents to facilitate decision-making about which tools to invoke.
o	For example, if the user asks for the availability of Aspirin, the agent decides to invoke the get_drug_info tool with appropriate parameters.
2.	Integration with Tools:
o	The tools (get_drug_list, get_drug_info) are defined as callable functions with clear purposes and parameters.
o	Using the openai-agents framework, these tools are registered as functions that the LLM agent can invoke dynamically.
3.	Function Execution Flow:
o	When a question is posed, the agent identifies the required tools and provides structured arguments to them.
o	Results from the tools are integrated back into the agent’s reasoning, enriching the context for the final response.
4.	Agent Decision Control:
o	With openai-agents, we limited the tool invocation loop to three iterations to avoid infinite loops and enhance efficiency.
________________________________________
Getting Started
1. Set Up Credentials
Create a .env.dev.local file in the api-as folder and add your OpenAI API key:


MODUS_OPENAI_API_KEY="sk-...."
2. Install Dependencies
Install the required libraries, including openai-agents, by running:


npm install
npm install openai-agents
3. Launch the API
Navigate to the api-as folder and run:


modus dev
4. Test the GraphQL Endpoint
Using a GraphQL client (e.g., Postman, Insomnia), introspect the GraphQL endpoint:
http://localhost:8686/graphql.
Invoke the operation askQuestionToDrugAssistant. Here's an example query:
graphql
Copy code
# Example query
query AskQuestion {
  askQuestionToDrugAssistant(question: "What is the availability of Aspirin?") {
    response
    logs
  }
}
________________________________________
Example Questions to Try
•	What drugs are available?
•	What is the price of Ibuprofen?
•	What are the side effects of Paracetamol?
•	Show me the chemical structure of Metformin.
•	What is the mechanism of action of Rosuvastatin?
________________________________________
Backend: AI-Driven Logic Flow
Steps:
1.	GraphQL Query:
o	Users submit a question via GraphQL (askQuestionToDrugAssistant).
o	The query specifies the drug name and attribute (e.g., availability, side effects).
2.	AI Agentic Logic:
o	The agent, implemented with openai-agents, analyzes the query to identify the relevant tools.
o	The tools are invoked with parameters such as drug_name and attribute (e.g., "Aspirin" and "availability").
3.	Tool Integration:
o	The tools fetch data from the warehouse, such as a list of drugs or specific drug details.
o	Results from tool invocations are incorporated into the agent’s context.
4.	Final Response:
o	The enriched context is processed by the LLM to generate a detailed, user-friendly response.
o	The response, along with execution logs, is returned to the user.
________________________________________
Frontend Integration
The app provides a web-based interface with three primary functionalities:
1.	Search: Users can ask natural language questions about drugs.
2.	Query Drug Info: Dropdown menus let users specify a drug and its attribute (e.g., side effects).
3.	Drug List: Displays a dynamically fetched list of all drugs in the database.
How It Works:
•	The frontend sends user questions to the backend using GraphQL queries.
•	The agent processes the queries, invokes tools, and returns enriched responses.
•	Results and logs are dynamically displayed in the UI for transparency and clarity.
________________________________________
AI-Powered Intelligence
Key Features:
•	Agentic Decision-Making: The LLM, powered by openai-agents, dynamically invokes tools to answer complex queries.
•	Real-Time Data Integration: Combines AI reasoning with live data retrieval for accurate and timely responses.
•	Explainability: Execution logs show how the agent interprets queries and selects tools, ensuring transparency.

To start the frontend use this
python -m http.server 8000

For backend 
initiate using
modus dev


Example questions to try
Example Questions to Try
•	What drugs are available?
•	What is the price of Ibuprofen?
•	What are the side effects of Paracetamol?
•	Show me the chemical structure of Metformin.
•	What is the mechanism of action of Rosuvastatin?
More question you can ask

Drug Availability

What is the availability of Metformin?
How many units of Caffeine are available?
Do we have Losartan in stock?

Pricing Information
What is the price per unit of Atorvastatin?
How much does Paracetamol cost?
What is the most expensive drug available?
Target and Mechanism of Action
What is the target of Aspirin?
How does Ibuprofen work?
What is the mechanism of action of Rosuvastatin?

Drug Side Effects
What are the side effects of Simvastatin?
Does Levothyroxine have any side effects?
List the potential side effects of Warfarin.

Pathways
Which pathways does Metformin act on?
What are the pathways associated with Clopidogrel?
Explain the pathway linked to Omeprazole.

General Queries
What drugs are available in the database?
What attributes can I query about a drug?
Which drugs target Cyclooxygenase (COX)?
What are the drugs used for pain relief?
List the drugs involved in cholesterol biosynthesis inhibition.

Combination Queries
What are the side effects and availability of Atorvastatin?
How much does Warfarin cost, and how many units are available?
What is the target and mechanism of action of Amoxicillin?

Advanced Queries
What are the similarities between Paracetamol and Aspirin?
Which drugs act on the Central Nervous System?
What is the pathway most associated with blood pressure regulation?
