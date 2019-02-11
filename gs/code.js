var db = SpreadsheetApp.openById("1GewcwSZYivWqa6H8sqGkLwGtawCbuqzM0T6PPoFys2s");



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