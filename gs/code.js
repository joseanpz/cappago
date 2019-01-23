var db = SpreadsheetApp.openById("1w0R-bF1VL-NtgCzSnCrkHRp61r_mdAMbB_U_raSv4b0");




/* Route
 * All Request with Method Get will be proces here
 */
function doGet(req) {
  
  var user = new User(Session.getActiveUser());
  
  //TODO: Validations 
  if(user.is_authorized()) {
    var template = HtmlService.createTemplateFromFile('index');
    template.user_email = user.getEmail(); 
    return template.evaluate();
  }
  else {
    return HtmlService.createHtmlOutputFromFile('noacceso');
  }        
}