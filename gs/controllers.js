const _authRead = userAuth(_read);

function read(sheet_name) {

		var filter = keyValueFilter('user_name', user.getEmail()); 
		return _authRead(sheet_name, [filter]);

}
