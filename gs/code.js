var db = SpreadsheetApp.openById("1pR_AL1wyirZ60qW0SGW38EC9OeJUr25h-ipfPQefq7Y");



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