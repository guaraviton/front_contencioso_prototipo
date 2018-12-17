'use strict';

app.factory('ProcessoResource', [ '$resource', ProcessoResource]);

function ProcessoResource($resource) {

  var urlBase = '/tbg/processo/:id';
  var rest = $resource(
    urlBase,{
      'id': ''
    }, 
    {
    	inativar: {method: 'DELETE'}
    });
  return rest;
}