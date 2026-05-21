# Google Sheets Integration Guide for ersbeauty

This guide explains how to automatically sync customer orders from your Next.js landing page to your Google Sheet: [Ers Beauty Orders](https://docs.google.com/spreadsheets/d/10oOEtyS-zMnp4OCBl53Oj1XHsmVhOOcRpZj3gqWMkB8/edit?usp=sharing).

We use a lightweight, secure **Google Apps Script Web App** to append order rows. This avoids having to create complex Google Cloud projects or credentials.

---

## Step 1: Add the Apps Script to your Google Sheet

1. Open your Google Sheet: [Ers Beauty Orders](https://docs.google.com/spreadsheets/d/10oOEtyS-zMnp4OCBl53Oj1XHsmVhOOcRpZj3gqWMkB8/edit?usp=sharing).
2. In the top menu, click **Extensions** > **Apps Script**.
3. Clear any existing code in the editor (under `Code.gs`) and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create headers with brand colors if the sheet is completely blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID",
        "Date & Time",
        "Customer Name",
        "Customer Phone",
        "Customer Address",
        "Delivery Area",
        "Items Ordered",
        "Delivery Charge (৳)",
        "Total Amount (৳)",
        "Payment Method",
        "Order Status"
      ]);
      
      // Beautiful brand styling for headers (Soft pink background, dark berry text)
      var range = sheet.getRange(1, 1, 1, 11);
      range.setFontWeight("bold");
      range.setBackground("#FFF5F6"); 
      range.setFontColor("#1F0D15");    
      range.setHorizontalAlignment("left");
      sheet.setRowHeight(1, 32);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Append the order row
    sheet.appendRow([
      data.orderId,
      data.createdAt,
      data.customerName,
      data.customerPhone,
      data.customerAddress,
      data.customerArea,
      data.itemsOrdered,
      data.deliveryCharge,
      data.totalAmount,
      data.paymentMethod,
      data.status
    ]);
    
    // Auto-resize columns to fit the content perfectly
    sheet.autoResizeColumns(1, 11);
    
    return ContentService.createTextOutput(JSON.stringify({ "success": true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** (floppy disk) icon at the top of the editor.

---

## Step 2: Deploy as a Web App

1. Click the blue **Deploy** button in the top right of the Apps Script window, then select **New deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Configure the settings:
   - **Description:** `Ers Beauty Order Sync`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` (This allows the Next.js server to submit orders).
4. Click **Deploy**.
5. You will see an authorization prompt. Click **Authorize access**, select your Google account, click **Advanced** at the bottom-left, click **Go to Untitled project (unsafe)**, and choose **Allow**.
6. Copy the **Web app URL** from the screen. It should look like:
   `https://script.google.com/macros/s/ABC_YOUR_DEPLOY_ID_XYZ/exec`

---

## Step 3: Configure environment variables

Add this URL to your environment variables.

### Local Development (`.env`)
Add the following line to your local `.env` file:
```env
GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/ABC_YOUR_DEPLOY_ID_XYZ/exec
```

### Production (Vercel)
1. Go to your **Vercel Dashboard** > **Projects** > **ersbeauty**.
2. Navigate to **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key:** `GOOGLE_SHEET_WEBAPP_URL`
   - **Value:** `https://script.google.com/macros/s/ABC_YOUR_DEPLOY_ID_XYZ/exec`
4. Click **Save** and redeploy.

---

## Column Headings Used

If you prefer to manually write the headings yourself in Row 1, use these exact names (order-sensitive):

| Column | Header Name | Description |
| :--- | :--- | :--- |
| **A** | `Order ID` | Unique ID generated for the order (e.g. `ERS-92718-4912`) |
| **B** | `Date & Time` | Bangladesh Local Time (`Asia/Dhaka`) |
| **C** | `Customer Name` | Name of the customer |
| **D** | `Customer Phone` | Customer contact number |
| **E** | `Customer Address` | Delivery destination |
| **F** | `Delivery Area` | "Inside Dhaka" or "Outside Dhaka" |
| **G** | `Items Ordered` | Comma-separated list of items and quantities |
| **H** | `Delivery Charge (৳)` | `80` or `120` depending on the area |
| **I** | `Total Amount (৳)` | Total bill including shipping |
| **J** | `Payment Method` | `Cash on Delivery` |
| **K** | `Order Status` | Initial status: `Pending` |
