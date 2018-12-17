'use strict';

app.factory('LogAcaoResource', [ '$resource', LogAcaoResource]);

function LogAcaoResource($resource) {

  	var urlBase = '/tbg/logAcao/:id';
  	var rest = $resource(urlBase,{
		'id': ''
    }, {
    });
  	return rest;
}