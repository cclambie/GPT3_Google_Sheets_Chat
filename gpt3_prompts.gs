// Replace YOUR_API_KEY with your actual API key
var apiKey = "YOUR_API_KEY";

// The URL of the GPT-3 API endpoint
var endpoint = "https://api.openai.com/v1/completions";

//Create a Spreadsheet with your headings of "Prompt" in column A and "Response" in column B
var responseIndex = 1

function makeRequestToOpenAI(row, vPrompt) {
  var prompt = vPrompt;
  // The parameters for the API request
  var params = {
    "model": "text-davinci-003",
    "prompt": prompt,
    "max_tokens": 4000,
  };
  
  // The options for the API request
  var options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(params)
  };
  
  // Make the API request
  var response = UrlFetchApp.fetch(endpoint, options);
  
  // Parse the response
  var json = JSON.parse(response.getContentText());
  
  // Update the response column in the sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(row, responseIndex).setValue(json.choices[0].text);
}

function fTheTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  //var editedRange = e.range;
  var row = sheet.getLastRow();

  // Get the number of columns in the sheet
  var numColumns = sheet.getLastColumn();
  
  // Get the range for the entire row minus the response
  //var rowRange = sheet.getRange(row, 1, 1, numColumns-1);
  
  // Get the values for all cells in the row
  var vPrompt = sheet.getRange(row,1).getValue();

  
  if (vPrompt !="") {
    makeRequestToOpenAI(row, vPrompt)
  }
}
