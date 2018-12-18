'use strict';

app.factory('ProcessoResource', [ '$resource', ProcessoResource]);

function ProcessoResource($resource) {

  var urlBase = '/tbg/processo/:id';
  var rest = $resource(
    urlBase,{
      'id': ''
    }, 
    {
    	incluirAndamento: {method: 'PUT', url: urlBase + '/andamento', params: {id: '@id'}},
    });
  return rest;
}