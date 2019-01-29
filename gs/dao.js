
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
	var ms_id = (new Date).getTime().toString();  // - 1546344000000;  // set epoch origin at 2019-01-01 00:00
	var new_row = ["'" + ms_id];

	for (var r = 1, l = properties.length; r < l; r++) {
		var field_data = data[properties[r]];
		var is_not_undefined = typeof field_data != "undefined";
		
		new_row.push(is_not_undefined && field_data != null  ? "'" + data[properties[r]]: '');
    }

	sheet.appendRow(new_row);

	return {id: ms_id};
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
         update_row.push((typeof data[properties[r]] != "undefined") ? "'" + data[properties[r]]: record[properties[r]]);
    }

	return _updateData(sheet, data.id, update_row)
}

function _delete(sheet_name, data_id, constrains) {
	return false;
}



/****** Low level methods******/

/**
  * @desc reads all rows of a sheet and arranges trem as a list of objects
  * @param googleSheetObject $sheet - the google sheet object to be read
  * @return obj - the data object with a subobject named records
  *
*/
function _readData(sheet, properties) {

   if (typeof properties == "undefined") {
      properties = _getHeaderRow(sheet);
      properties = properties.map(function (p) {
         return p.replace(/\s+/g, '_');
      });
   }
  // return properties;

   var rows = _getDataRows(sheet),
      data = [];
  //return rows;

   for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r],
          record = {};

      for (var p in properties) {
         record[properties[p]] = row[p];
      }

      data.push(record);
   }
   
   return data;
}

function _updateData(sheet, id, update_row) {

	var rows_count = sheet.getLastRow(), columns_count = sheet.getLastColumn();
	for (var i = 1; i <= rows_count; i++) {
		// find row
		var id_temp = sheet.getRange(i, 1).getValue();
		if (id_temp === id) {
			// write row, this is commited after function is finished
			sheet.getRange(i, 1, 1, columns_count).setValues([update_row])
			return true;         
		}
	}
	return false;

}

function _getHeaderRow(sheet) {
	var columns_count = sheet.getLastColumn();
	
	// getRange(from_row, from_column, rows_count ,columns_count)
	return sheet.getRange(1, 1, 1, columns_count).getValues()[0];
}

function _getDataRows(sheet) {
	var rows_count = sheet.getLastRow() -1, columns_count = sheet.getLastColumn();

	if (rows_count === 0) {return [];}

	// getRange(from_row, from_column, rows_count ,columns_count)
	var rows = sheet.getRange(2, 1, rows_count, columns_count).getDisplayValues();

	return rows;
}




