'use strict';

app.factory('AuthResource', [ '$resource', AuthResource]);

function AuthResource($resource) {
	var urlBase = '/auth/tbg';
	var rest = $resource(urlBase, {
	}, {
		login : {
			method : 'POST'
		},
		logout : {
			method : 'DELETE'
		},
		refresh : {
			url : urlBase + '/refresh'
		}
	});
	return rest;
}