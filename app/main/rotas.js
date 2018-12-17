'use strict';

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.hashPrefix('');
	$urlRouterProvider.when("", "/");
	
	$stateProvider

	.state('/', {
		url : '/',
		redirectTo: 'home'
	})
	.state('home', {
		url : '/home',
		templateUrl: 'app/home/home.html',
		controller: "HomeController",
		controllerAs: "ctrl"
	})
	.state('login', {
		url : '/login',
		templateUrl: 'app/login/login.html',
		controller: "LoginController",
		controllerAs: "ctrl"
	})
	.state('erroLogin', {
		url : '/erroLogin',
		templateUrl: 'app/erro/login.html'
	})
	.state('logAcao', {
		url : '/logAcao',
		templateUrl: 'app/logAcao/listarLogAcao.html',
		controller: "LogAcaoController",
		controllerAs: "ctrl",
		resolve: {			
            acoes: ['AcaoResource', function(AcaoResource) {	             		   
	       		return AcaoResource.query().$promise;
	    	}]
        }
	})	
	.state('processo', {
		url : '/processo',
		templateUrl: 'app/processo/listarProcesso.html',
		controller: "ProcessoController",
		controllerAs: "ctrl",
		resolve: {			
            processo: function () {
            	return null;
            }
        }
	})	
	.state('processoEdit', {
		url : '/processo/{id}',
		templateUrl: 'app/processo/editarProcesso.html',
		controller: "ProcessoController",
		controllerAs: "ctrl",
		resolve: {			
            processo: ['$stateParams', 'ProcessoResource', function($stateParams, ProcessoResource) {	 
            	if($stateParams.id == 0){
	    			return null;
	    		}		    
	       		return ProcessoResource.get({id: $stateParams.id}).$promise;
	    	}]
        }
	})
});