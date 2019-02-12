function test_dao(){
  //var sheet = db.getSheetByName("test");
  //var properties = _getHeaderRow(sheet);
  
  //var filter1 = keyValueFilter('key1', 'bla');

  //var rows =[["'1548368686841", "meh", "mah", "jes@mail.c"], ["'1548368686841", "meh", "mah", "jes@mail.c"]];
  var multidata = [{key1: "foo" }, {key2: "bar" }, {key1: "meh" }, {key2: "mah" }];
  
  // var sheet = db.getSheetByName(sheetName);
  //var records = _readData(sheet);
  //records = records.filter(filter1);
  //var bulkinsert = _bulkCreate("test", multidata);
  // var bulkinsert = bulkCreate("test", multidata);
  

  //var inserted = _insertData(sheet, rows);
  var data = _read("test");
  //var new_row = _create("test", {key1: "foo" });
  //var old_row = _update("test", {id: '3105417721', key2: "meh332" });
  //var new_data = _read("test", [filter1]);
  var tmp = data;
  
}


function test_controllers(){
  //var sheet = db.getSheetByName("sheet1");
  //var properties = _getHeaderRow(sheet);
  
  var filter1 = keyValueFilter('key1', 'bla');
  
  // var sheet = db.getSheetByName(sheetName);
  //var records = _readData(sheet);
  //records = records.filter(filter1);
  var is_deleted = deleteId("test", "1549503416315")
  var data = read("test");
  var data_id = readId("test", "1548439381010");
  //var new_row = _create("test", {key1: "foo" });
  //var old_row = _update("test", {id: '3105417721', key2: "meh332" });
  //var new_data = _read("test", [filter1]);
  var tmp = data;
  
}