'use strict';

app.config(['$provide', '$httpProvider', function($provide, $httpProvider) {

        $provide.factory('interceptor',

            ['$q', '$rootScope', 'toaster', 'APP_CONFIG', '$state', '$timeout',

                function($q, $rootScope, toaster, APP_CONFIG, $state, $timeout) {

                    function popErrorMessage(rejection) {
                        if (rejection.data && rejection.data.fieldErrors) {
                            for (var i = 0; i < rejection.data.fieldErrors.length; i++) {
                                var error = rejection.data.fieldErrors[i];
                                toaster.pop('error', null, error.message);
                            }
                        } else {
                            toaster.pop('error', 'Erro ao realizar a sua requisição', 'Favor contactar o administrador do sistema.');
                        }
                    }

                    return {                        
                        request: function(config) {   
                            if($rootScope.token){
                                config.headers[APP_CONFIG.TOKEN_HEADER_NAME] = $rootScope.token;
                            }  
                            return config || $q.when(config);
                        },
                        requestError: function(rejection) {     
                            return $q.reject(rejection);
                        },
                        response: function(response) {                                   
                            if (response.data.mensagemRetorno){
                                toaster.pop(response.data.mensagemRetorno.tipo, response.data.mensagemRetorno.titulo,response.data.mensagemRetorno.mensagem);   
                            }                            
                            return response || $q.when(response);
                        },
                        responseError: function(rejection) {         
                            switch (rejection.status) {
                                case 401:                                    
                                    $timeout(function(){
                                        $state.go('erroLogin'); 
                                    });
                                    break;
                                case 403:
                                    popErrorMessage(rejection);
                                    break;
                                case 400:
                                    popErrorMessage(rejection);
                                    break;
                                case 500:
                                    popErrorMessage(rejection);
                                    break;
                                case 503:
                                    popErrorMessage(rejection);
                                    break;
                                case 404:
                                    popErrorMessage(rejection);
                                    break;
                                default:
                                    popErrorMessage(rejection);
                            }
                            return $q.reject(rejection);
                        }
                    };
                }
            ]);

        $httpProvider.interceptors.push('interceptor');
    }]);