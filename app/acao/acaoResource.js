'use strict';

app.factory('AcaoResource', [ '$resource', AcaoResource]);

function AcaoResource($resource) {

  var urlBase = '/tbg/acao';
  var rest = $resource(
    urlBase,{
    }, 
    {
    	
    });
  return rest;
}