function userAuth(fn) {
	return function(a1, a2, a3) {
		var user = new User(Session.getActiveUser());

		//TODO: Validations 
		if(user.is_authorized()) {
			// var filter = keyValueFilter('user_name', user.getEmail()); 
			return fn(a1, a2, a3);
		}
		else {
			return {status: 401, message: 'Not authorized'};
		}
	}	
}
