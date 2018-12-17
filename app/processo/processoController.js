'use strict';

angular.module('app').controller('ProcessoController', [ '$state', 'toaster', 'ProcessoResource', 'LISTA_UF', 'processo', ProcessoController ]);

function ProcessoController($state, toaster, ProcessoResource, LISTA_UF, processo) {
    
	var ctrl = this;
    ctrl.LISTA_UF = LISTA_UF;

	ctrl.consultar = function() {   
        ProcessoResource.query({numero: ctrl.processo.numero}, function(result) {             
            ctrl.processos = result;
        });
    };

	ctrl.incluir = function() {               
    	$state.go('processoEdit', {'id':0});
    };

	ctrl.editar = function(processo) {               
    	$state.go('processoEdit', {'id': processo.id});
    };

    ctrl.voltar = function() {               
    	$state.go('processo');
    };  

    ctrl.salvar = function() {           
        ProcessoResource.save(ctrl.processo, function(data) {
            toaster.pop('success', null, 'Processo salvo com sucesso');
            ctrl.processo.id = data.id;
            ctrl.processo.etapas = data.etapas;
        });
    };  

    if(processo){
        ctrl.processo = processo;
    }else{
        ctrl.processo = {};
    }
}