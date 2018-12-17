app.run(['$httpBackend', '$rootScope', '$filter', function($httpBackend, $rootScope, $filter) {

  	var info = {
		  buildNumber: 'contencioso-mocker'      
    };
     
  	$httpBackend.whenGET('/info').respond(info);
    	
  	var usuario = {
  		login: 'contencioso-mocker',
  		nome: 'Usuario Contencioso',
  		departamento: 'GJUR',
  		perfis: 'admin',
      ultimoAcesso: new Date()
    };

    var token = 'eyJhbGciOiJIUzUxMiJ9';

    var auth = {
    	usuario: usuario,
    	token: token
    }

    $httpBackend.whenGET('/auth/tbg/refresh').respond(auth);

  	$httpBackend.whenPOST('/auth/tbg').respond(function(method, url, data) {
		  var newContact = angular.fromJson(data);		
		  return [200, auth, {}];
  	});


    var acoes = [
      {
        descricao: 'Criação de Processo'
      }
    ];

    $httpBackend.whenGET('/tbg/acao').respond(acoes);


    var usuariosTBG = [
      {
        login: 'Usuário TBG',
        nome: 'Usuário TBG'
      }
    ];

    $httpBackend.whenGET(/.*?tbg\/usuario?.*/g).respond(usuariosTBG);

    var logsAcao = [
      {
        dataInclusao: new Date(),
        usuarioTBG: 'Usuário TBG',
        ip: '127.0.0.1',
        acao: {descricao: 'Criação de Processo'},
        complemento: 'teste'
      }
    ];

    $httpBackend.whenGET(/tbg\/logAcao?.*/).respond(logsAcao);    

    $httpBackend.whenGET(/tbg\/processo\/.*/).respond(function(method, url, data) {    
      var processo = $filter('filter')($rootScope.processos, {id: url.split('/')[3]})[0];
      return [200, processo, {}];
    });

    $httpBackend.whenGET(/tbg\/processo?.*/).respond(function(method, url, data) {
      return [200, $rootScope.processos, {}];
    });

    $httpBackend.whenPOST('/tbg/processo').respond(function(method, url, data) {
      var processoRef = angular.fromJson(data);
      if(!processoRef.id){        
        processoRef.id = new Date().getTime();
        processoRef.etapas = [{
          descricaoEvento: 'Criação',
          data: new Date(),
          usuario: 'Usuário Contencioso'
        }];

        $rootScope.processos.push(processoRef);         
      }else{
        var index = $rootScope.processos.indexOf($filter('filter')($rootScope.processos, {id: processoRef.id})[0]);
        $rootScope.processos[index] = processoRef;
        processoRef.etapas.push({
          descricaoEvento: 'Alteração',
          data: new Date(),
          usuario: 'Usuário Contencioso'
        });      
      }
      return [200, processoRef, {}];
    });    

  	$httpBackend.whenGET(/app\/./).passThrough();
  	
}]);