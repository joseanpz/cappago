
function _read(sheetName, filters) {
	var data = {};
  	var sheet = db.getSheetByName(sheetName);
  	data.records = _readData(sheet);
  	for (var r = 0, l = filters.length; r < l; r++) {
  		data.records = data.records.filter(filters[r]);
  	}  	
  	return data; 	
}



