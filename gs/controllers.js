var _authRead = userAuth(_read);
var _authCreate = userAuth(_create);
var _authUpdate = userAuth(_update);
var _authDelete = userAuth(_delete);


function read(sheet_name, filters) {
	var user = new User(Session.getActiveUser());
	var user_filter = keyValueFilter('user_name', user.getEmail());

	if (Array.isArray(filters)) {
		filters = filters.unshift(user_filter);
	} else {
		filters = [user_filter];		
	}
	 
	return _authRead(sheet_name, filters);

}

function readId(sheet_name, id) {
	var user = new User(Session.getActiveUser());
	var user_filter = keyValueFilter('user_name', user.getEmail());
	var id_filter = keyValueFilter('id', id);

	var data = _authRead(sheet_name, [user_filter, id_filter]);
	if (data.records.length > 0) {
		return data.records[0]
	} else {
		return {status: 404, message: "Data not found"}
	}
}

function readFKRelation(sheet_name, fk_field, fk) {
	var user = new User(Session.getActiveUser());
	var user_filter = keyValueFilter('user_name', user.getEmail());
	var fk_filter = keyValueFilter(fk_field, fk);

	var data = _authRead(sheet_name, [user_filter, id_filter]);
	if (data.records.length > 0) {
		return data.records[0]
	} else {
		return {status: 404, message: "Data not found"}
	}
}

function readCatalog(sheet_name) {
	 
	return _authRead(sheet_name);

}

/*
 * Data wtiting
 *
 */

function create(sheet_name, data, constrains) {
	return _authCreate(sheet_name, data, constrains);
}

function update(sheet_name, data, constrains) {
	return _authUpdate(sheet_name, data, constrains);
}


