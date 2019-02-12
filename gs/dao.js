
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
		
		new_row.push(is_not_undefined && field_data != null  ? "'" + field_data: '');
    }

	sheet.appendRow(new_row);

	return {id: ms_id};
}

function _bulkCreate(sheet_name, data, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	var properties = _getHeaderRow(sheet);
	var new_rows = [], new_ids = [];

	for (var i=0; i < data.length ; i++) {
		// set id as string
		var ms_id = ((new Date).getTime()+i).toString();  // - 1546344000000;  // set epoch origin at 2019-01-01 00:00
		var new_row = ["'" + ms_id];

		for (var r = 1, l = properties.length; r < l; r++) {
			var field_data = data[i][properties[r]];
			var is_not_undefined = typeof field_data != "undefined";
			
			new_row.push(is_not_undefined && field_data != null  ? "'" + field_data: '');
	    }
	    new_rows.push(new_row);
	    new_ids.push({id: ms_id});
	}

	_insertData(sheet, new_rows)
	

	return new_ids;
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
		var field_data = data[properties[r]];
		var is_not_undefined = typeof field_data != "undefined";
		
        update_row.push(is_not_undefined && field_data != null  ? "'" + field_data: record[properties[r]]);
    }

	return _updateData(sheet, data.id, update_row)
}

function _bulkUpdate(sheet_name, data, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	var properties = _getHeaderRow(sheet);
	var records = _readData(sheet);
	var updated = [];
	
	for (var i=0; i < data.length ; i++) {
		var idrecords = records.filter(function(item){
		return item.id === data[i].id;
		});
		
		if (typeof records === "undefined" || records.length === 0){
	      	updated.push(false);
	      	continue;
	    } else {
	    	var record = idrecords[0];
	    }

		// set id as string
		var update_row = [ "'" + data[i].id ];
		// set row
		for (var r = 1, l = properties.length; r < l; r++) {
			var field_data = data[i][properties[r]];
			var is_not_undefined = typeof field_data != "undefined";
			
	        update_row.push(is_not_undefined && field_data != null  ? "'" + field_data: record[properties[r]]);
	    }

		updated.push(_updateData(sheet, data[i].id, update_row));

	}

	return updated;

	
}

function _delete(sheet_name, data_id, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	return _deleteData(sheet, data_id);
}

function _deleteRows(sheet_name, data_id, rows, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	return _deleteDataRows(sheet, data_id, rows);
}

function _bulkDelete(sheet_name, data_ids, constrains) {
	var sheet = db.getSheetByName(sheet_name);
	var deleted = [];
	
	for (var i=0; i < data_ids.length ; i++) {
		deleted.push(_deleteData(sheet, data_ids[i]))
	}
	return deleted;
}

/****** Low level methods******/

function _insertData(sheet, insert_rows) {
	var rows_count = sheet.getLastRow(), columns_count = sheet.getLastColumn();
	var insert_count = insert_rows.length;
	sheet.getRange(rows_count+1, 1, insert_count, columns_count).setValues(insert_rows);
	return true;
}

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

function _deleteData(sheet, id) {

	var rows_count = sheet.getLastRow();
	for (var i = 1; i <= rows_count; i++) {
		// find row
		var id_temp = sheet.getRange(i, 1).getValue();
		if (id_temp === id) {
			// delete row
			sheet.deleteRow(i);
			return true;         
		}
	}
	return false;
}

function _deleteDataRows(sheet, id, rows) {
	
	var rows_count = sheet.getLastRow();
	for (var i = 1; i <= rows_count; i++) {
		// find row
		var id_temp = sheet.getRange(i, 1).getValue();
		if (id_temp === id) {
			// delete row
			sheet.deleteRows(i, rows);
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




