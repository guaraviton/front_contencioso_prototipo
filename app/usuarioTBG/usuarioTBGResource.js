'use strict';

app.factory('UsuarioTBGResource', [ '$resource', UsuarioTBGResource]);

function UsuarioTBGResource($resource) {

  var urlBase = '/tbg/usuario';
  var rest = $resource(
    urlBase,{
    }, 
    {
    	
    });
  return rest;
}