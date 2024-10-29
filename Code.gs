 
function onOpen() {
  SpreadsheetApp.getUi() // Mendapatkan antarmuka pengguna untuk Spreadsheet.
    .createMenu('Upload Litmas') // Membuat menu baru dengan nama 'Upload Litmas'.
    .addItem('Attachment', 'openAttachmentDialog') // Menambahkan item menu yang akan membuka dialog lampiran.
    .addToUi(); // Menambahkan menu yang telah dibuat ke antarmuka pengguna.
}

function openAttachmentDialog() {
  var html = HtmlService.createHtmlOutputFromFile('UploadFile'); // Membuat output HTML dari file 'UploadFile'.
  SpreadsheetApp.getUi() // Mendapatkan antarmuka pengguna untuk Spreadsheet.
    .showModalDialog(html, 'Upload File'); // Menampilkan dialog modal dengan output HTML dan judul 'Upload File'.
}

function saveFile(obj) {
  var blob = Utilities.newBlob(Utilities.base64Decode(obj.data), obj.mimeType, obj.fileName); // Membuat blob dari data yang didekodekan.
  var file = DriveApp.getFolderById("1_HFwzrksuhBUoEqeghjVO_HduXDCPkdA").createFile(blob); // Membuat file baru di folder yang ditentukan dengan blob.
  var cellFormula = 'hyperlink("' + file.getUrl() + '";"' + file.getName() + '")'; // Membuat formula hyperlink untuk file yang baru dibuat.
  
  var activeSheet = SpreadsheetApp.getActiveSheet(); // Mendapatkan lembar aktif saat ini.
  var selection = activeSheet.getSelection(); // Mendapatkan pilihan sel saat ini.
  var cell = selection.getCurrentCell(); // Mendapatkan sel yang saat ini dipilih.
  cell.setFormula(cellFormula); // Mengatur formula sel dengan formula hyperlink yang telah dibuat.
  
  return file.getId(); // Mengembalikan ID file yang baru dibuat.
}
