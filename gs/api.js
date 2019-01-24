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


  