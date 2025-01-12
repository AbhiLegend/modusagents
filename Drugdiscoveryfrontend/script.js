const GRAPHQL_ENDPOINT = "http://localhost:8686/graphql";

// Fetch the list of drugs
document.getElementById("fetch-drug-list").addEventListener("click", async () => {
  const query = `
    query {
      askQuestionToDrugAssistant(question: "List all drugs") {
        response
        logs
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    console.log("Drug List Response:", result);

    // Handle invalid or null response
    if (!result.data || !result.data.askQuestionToDrugAssistant) {
      console.error("Invalid GraphQL response:", result);
      document.getElementById("drug-list").innerHTML = "<li>No valid response received.</li>";
      return;
    }

    const drugListResponse = result.data.askQuestionToDrugAssistant.response;

    // Parse and display the drug list
    const drugList = drugListResponse.replace("The available drugs are: ", "").split(", ");
    const drugListElement = document.getElementById("drug-list");
    drugListElement.innerHTML = "";
    drugList.forEach((drug) => {
      const li = document.createElement("li");
      li.textContent = drug;
      drugListElement.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching drug list:", error);
    document.getElementById("drug-list").innerHTML = "<li>Error fetching data.</li>";
  }
});

document.getElementById("search-button").addEventListener("click", async () => {
  const searchQuery = document.getElementById("search-query").value.trim();

  if (!searchQuery) {
    alert("Please enter a question.");
    return;
  }

  const query = `
    query AskQuestion($question: String!) {
      askQuestionToDrugAssistant(question: $question) {
        response
        logs
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { question: searchQuery },
      }),
    });

    const result = await response.json();
    console.log("Search Response:", result);

    // Check if the result contains valid data
    if (!result.data || !result.data.askQuestionToDrugAssistant) {
      document.getElementById("search-result").innerHTML = "<p>No valid response received.</p>";
      return;
    }

    // Extract response and logs
    const answer = result.data.askQuestionToDrugAssistant.response || "No response found.";
    const logs = result.data.askQuestionToDrugAssistant.logs || ["No logs available."];

    // Display the answer
    const resultDiv = document.getElementById("search-result");
    resultDiv.innerHTML = `<p><strong>Answer:</strong> ${answer}</p>`;

    // Display logs
    const logsDiv = document.getElementById("logs-section");
    if (logsDiv) {
      logsDiv.innerHTML = `
        <h3>Logs</h3>
        <ul>${logs.map((log) => `<li>${log}</li>`).join("")}</ul>
      `;
    }
  } catch (error) {
    console.error("Error querying GraphQL:", error);
    document.getElementById("search-result").innerHTML = "<p>Error fetching data. Please try again.</p>";
  }
});


// Query drug-specific information
document.getElementById("fetch-drug-info").addEventListener("click", async () => {
  const drugName = document.getElementById("drug-name").value.trim();
  const attribute = document.getElementById("attribute").value;

  if (!drugName || !attribute) {
    alert("Please provide both drug name and attribute.");
    return;
  }

  const question = `What is the ${attribute} of ${drugName}?`;

  const query = `
    query AskQuestion($question: String!) {
      askQuestionToDrugAssistant(question: $question) {
        response
        logs
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { question },
      }),
    });

    const result = await response.json();
    console.log("Query Drug Info Response:", result);

    // Handle invalid or null response
    if (!result.data || !result.data.askQuestionToDrugAssistant) {
      console.error("Invalid GraphQL response:", result);
      document.getElementById("drug-info-result").textContent = "No valid response received.";
      return;
    }

    const answer = result.data.askQuestionToDrugAssistant.response || "No response found.";
    document.getElementById("drug-info-result").textContent = answer;
  } catch (error) {
    console.error("Error fetching drug info:", error);
    document.getElementById("drug-info-result").textContent = "Error fetching drug info.";
  }
});
