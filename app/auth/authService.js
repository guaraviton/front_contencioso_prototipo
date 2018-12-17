'use strict';

angular.module('app').factory('AuthService', ['$rootScope', '$state', '$timeout', 'AuthResource', '$interval', 'APP_CONFIG', 'toaster', '$filter', AuthService]);

function AuthService($rootScope, $state, $timeout, AuthResource, $interval, APP_CONFIG, toaster, $filter) {
	var service = {
		login : function(destino) {
			AuthResource.login(
				function(result) {
					service.setToken(result);
					service.setUsuarioRootScope(result.usuario);
					service.configTokenRefresh();
					$rootScope.appLoaded = true;
					$state.go(destino.name, destino.params);	
				},									
				function(result) {
					$rootScope.appLoaded = true;
				}
			);
		},
		tokenRefresh : function() {
			if($rootScope.auth){
				console.log('Init Token Refresh');
				AuthResource.refresh(function(result) {
					console.log('Token Refresh');
					service.setToken(result);				
				});	
			}
		},
		configTokenRefresh : function() {
			if(!$rootScope.tokenRefresh){
				$rootScope.tokenRefresh = true;
				service.tokenRefresh = $interval(service.tokenRefresh, APP_CONFIG.TOKEN_TIME_REFRESH);
			}
		},
		isValid : function() {
			if($rootScope.token){
				return true;
			}
			return false;
		},
		setToken : function(result) {
			sessionStorage.setItem('token_tbg', result.token);
    		$rootScope.token = result.token;
		},
		setUsuarioRootScope : function(result) {
    		$rootScope.auth = result;
    		if(result.perfisString){
    			$rootScope.auth.isAdmin = result.perfisString.indexOf("admin") >= 0 || result.perfisString.indexOf("ADMIN") >= 0;
    			$rootScope.auth.perfis = result.perfis;
    		}    		
		},
		homeRedirect : function() {												
			$timeout(function(){
			   $state.go('/');	
			})
		},
		logout : function() {
			service.resetAndRedirect();	
		},
		reset : function() {
			sessionStorage.removeItem('token_tbg');
			$rootScope.token = null;
			$rootScope.auth = null;
		},
		resetAndRedirect : function() {
			service.reset();
		}
	}
	return service;
}