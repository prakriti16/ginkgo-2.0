//online link - https://script.google.com/d/1xKyez5OZYm-O443R5wz7hUka0hg32nMvJMK8zvWGQ-0iAEakNOtzAyfx/edit?usp=sharing

function doGet(e) {
  if (e && e.parameter && e.parameter.id) {
    var id = e.parameter.id;
    var action = e.parameter.action;

    if (action === "in"  || action === "out") {
      return getStudentDetails(id,action);
    } else {
      return ContentService.createTextOutput("Invalid action parameter.").setMimeType(ContentService.MimeType.TEXT);
    }
  } else {
    return ContentService.createTextOutput("Please provide an ID and action in the URL parameters.").setMimeType(ContentService.MimeType.TEXT);
  }
}

function getStudentDetails(id,action) {
  if(action === "out")
{  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1izdQ4X3JBCAVAmj3js2yXir1DMQPMpmbNAVwgPAEELg/edit#gid=0"); // Replace with your spreadsheet URL
  var sourceSheet = ss.getSheetByName("Form Responses 3");
  var walmiSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1izdQ4X3JBCAVAmj3js2yXir1DMQPMpmbNAVwgPAEELg/edit#gid=5082360"); // Replace with the correct URL of your "Walmi" spreadsheet
  
  var destinationSheet=0;
  destinationSheet = walmiSpreadsheet.getSheetByName("Outing");
  //return ContentService.createTextOutput("URL of the destination sheet: " + destinationSheet.getUrl()).setMimeType(ContentService.MimeType.TEXT);
  var lr = sourceSheet.getLastRow();

  for (var i = 1; i <= lr; i++) {
    var vid = sourceSheet.getRange(i, 4).getValue();
    if (vid == id) {
      var data = [];
      for (var j = 1; j <= 7; j++) {
        data.push(sourceSheet.getRange(i, j).getValue());
      }

      // Append the data to "Sheet6"
      destinationSheet.appendRow(data);

      //return ContentService.createTextOutput("Data pushed to Sheet6: " + data.join(",")).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  // var values = destinationSheet.getRange(2, 4, destinationSheet.getLastRow(), 1).getValues();
  var val =[];

  for (var i = 2; i <= destinationSheet.getLastRow(); i++) {
    var values = destinationSheet.getRange(i, 4).getValue();
    val.push(values);
    if (values == id) {
      var timestamp = Utilities.formatDate(new Date(), "IST", "HH:mm:ss");
      var cellColumn = action === "in" ? 9 : 8;
      destinationSheet.getRange(i, cellColumn).setValue(timestamp);
      return ContentService.createTextOutput("Thank You! Your " + (action === "in" ? "In" : "Out") + " Time is " + timestamp).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  return ContentService.createTextOutput("values are " + val.join(",")).setMimeType(ContentService.MimeType.TEXT);}
  //return ContentService.createTextOutput("User not found.").setMimeType(ContentService.MimeType.TEXT);
  else{
  var val =[];
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1izdQ4X3JBCAVAmj3js2yXir1DMQPMpmbNAVwgPAEELg/edit#gid=0"); // Replace with your spreadsheet URL
  var sourceSheet = ss.getSheetByName("Form Responses 3");
  var walmiSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1izdQ4X3JBCAVAmj3js2yXir1DMQPMpmbNAVwgPAEELg/edit#gid=5082360"); // Replace with the correct URL of your "Walmi" spreadsheet
  
  var destinationSheet=0;
  destinationSheet = walmiSpreadsheet.getSheetByName("Outing");
  //return ContentService.createTextOutput("URL of the destination sheet: " + destinationSheet.getUrl()).setMimeType(ContentService.MimeType.TEXT);
  var lr = sourceSheet.getLastRow();

  for (var i = 1; i < destinationSheet.getLastRow(); i++) {
    var values = destinationSheet.getRange(i, 4).getValue();
    val.push(values);
    if (values == id) {
      var timestamp = Utilities.formatDate(new Date(), "IST", "HH:mm:ss");
      var cellColumn = action === "in" ? 9 : 8;
      destinationSheet.getRange(i, cellColumn).setValue(timestamp);
      return ContentService.createTextOutput("Thank You! Your " + (action === "in" ? "In" : "Out") + " Time is " + timestamp).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  return ContentService.createTextOutput("values are " + val.join(",")).setMimeType(ContentService.MimeType.TEXT);}
}

function doPost(e) {
   if (e && e.parameter && e.parameter.id) {
    var id = e.parameter.id;
    var action = e.parameter.action;

    if (action === "in"  || action === "out") {
      return getStudentDetails(id,action);
    } else {
      return ContentService.createTextOutput("Invalid action parameter. "+ action).setMimeType(ContentService.MimeType.TEXT);
    }
  } else {
    return ContentService.createTextOutput("Please provide an ID and action in the URL parameters.").setMimeType(ContentService.MimeType.TEXT);
  }
}

function updateInOrOutTime(id, action) {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1nxbHi8ytMTWSM2qNnMyFE1uKN914Hcb0_GjMHe7mesQ/edit#gid=793173212");
  var sheet = ss.getSheetByName("Sheet6");

  if (!sheet) {
    return ContentService.createTextOutput("Sheet 6 not found in the spreadsheet").setMimeType(ContentService.MimeType.TEXT);
  }
  
  var values = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues();

  for (var i = 0; i < values.length; i++) {
    if (values[i][0] == id) {
      var timestamp = Utilities.formatDate(new Date(), "IST", "HH:mm:ss");
      var cellColumn = action === "in" ? 7 : 8;
      sheet.getRange(i + 2, cellColumn).setValue(timestamp);
      return ContentService.createTextOutput("Thank You! Your " + (action === "in" ? "In" : "Out") + " Time is " + timestamp).setMimeType(ContentService.MimeType.TEXT);
    }
  }

  return ContentService.createTextOutput("Id Not Found").setMimeType(ContentService.MimeType.TEXT);
}



  return ContentService.createTextOutput("Id Not Found").setMimeType(ContentService.MimeType.TEXT);
}


