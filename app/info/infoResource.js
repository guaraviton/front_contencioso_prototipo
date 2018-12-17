'use strict';

app.factory('InfoResource', [ '$resource', InfoResource]);

function InfoResource($resource) {
	var urlBase = '/info';
  	var rest = $resource(urlBase, {
    }, {
	});
  	return rest;
}