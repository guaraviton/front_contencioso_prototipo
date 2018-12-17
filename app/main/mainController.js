'use strict';

app.controller('MainController', [ 'ProgressConfig', 'InfoResource', 'AuthService', MainController ]);

function MainController(ProgressConfig, InfoResource, AuthService) {
	var ctrl = this;
	
	ProgressConfig.eventListeners();
	ProgressConfig.color('#398DD5');
	ProgressConfig.height('6px');		
    
    InfoResource.get(function(result) {				
		ctrl.info = result;		
	});

	ctrl.sair = function() {
		AuthService.logout();
	}
}