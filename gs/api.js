
function _read(sheet_name, filters) {
	var data = {};
  	var sheet = db.getSheetByName(sheet_name);
  	data.records = _readData(sheet);
  	if (typeof filters != "undefined"){
    	for (var r = 0, l = filters.length; r < l; r++) {
  			data.records = data.records.filter(filters[r]);
  		}
    }
  	  	
  	return data; 	
}

function _create(sheet_name, data, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	var properties = _getHeaderRow(sheet);
	// set id as string
	var ms_id = "'" + (new Date).getTime();  // - 1546344000000;  // set epoch origin at 2019-01-01 00:00
	var new_row = [ms_id];

	for (var p in properties.shift()) {
         new_row.push((typeof data[properties[p]] != "undefined") ? data[properties[p]]: '');
    }

	var rowData = sheet.appendRow(new_row);

	return rowData;
}

function _update(sheet_name, data, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	var properties = _getHeaderRow(sheet);
	var records = _readData(sheet).filter(function(item){
		return item.id === data.id;
	});
	
	if (typeof records === "undefined" || records.length === 0){
      	return false;
    } else {
    	record = records[0];
    }

	// set id as string
	var update_row = [ "'" + data.id ];
	// set row
	for (var r = 1, l = properties.length; r < l; r++) {
         update_row.push((typeof data[properties[r]] != "undefined") ? data[properties[r]]: record[properties[r]]);
    }

	var Row = sheet.getLastRow();
	for (var i = 1; i <= Row; i++) {
		// find row
		var id_temp = sheet.getRange(i, 1).getValue();
		if (id_temp === data.id) {
			// write row, this is commited after function is finished
			sheet.getRange(i, 1, 1, sheet.getLastColumn()).setValues([update_row])
			return true;         
		}
	}
	return false;
}

function _delete(sheet_name, data_id, constrains) {
	return false;
}



