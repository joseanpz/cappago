function test_dao(){
  //var sheet = db.getSheetByName("sheet1");
  //var properties = _getHeaderRow(sheet);
  
  var filter1 = keyValueFilter('key1', 'bla');
  
  // var sheet = db.getSheetByName(sheetName);
  //var records = _readData(sheet);
  //records = records.filter(filter1);
  var data = _read("test");
  var new_row = _create("test", {key1: "foo" });
  var old_row = _update("test", {id: '3105417721', key2: "meh332" });
  var new_data = _read("test", [filter1]);
  var tmp = data;
  
}


function test_controllers(){
  //var sheet = db.getSheetByName("sheet1");
  //var properties = _getHeaderRow(sheet);
  
  var filter1 = keyValueFilter('key1', 'bla');
  
  // var sheet = db.getSheetByName(sheetName);
  //var records = _readData(sheet);
  //records = records.filter(filter1);
  var data = read("test");
  //var new_row = _create("test", {key1: "foo" });
  //var old_row = _update("test", {id: '3105417721', key2: "meh332" });
  //var new_data = _read("test", [filter1]);
  var tmp = data;
  
}