'use strict';

angular.module('app').controller('ProcessoController', [ '$state', 'toaster', 'ProcessoResource', 'LISTA_TIPOS_PROCESSO', 'LISTA_UF', 'processo', ProcessoController ]);

function ProcessoController($state, toaster, ProcessoResource, LISTA_TIPOS_PROCESSO, LISTA_UF, processo) {
    
	var ctrl = this;
    ctrl.LISTA_TIPOS_PROCESSO = LISTA_TIPOS_PROCESSO;
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

    ctrl.abrirModalInclusaoAndamento = function() {           
        $('#modalInclusaoAndamento').modal('toggle');  
    }; 

    ctrl.incluirAndamento = function() {           
        ProcessoResource.incluirAndamento({id : ctrl.processo.id}, ctrl.processo.novoAndamento, function(data) {
            toaster.pop('success', null, 'Andamento de Processo incluído com sucesso');            
            ctrl.processo.etapas = data.etapas;
            ctrl.processo.andamento = data.andamento;
            ctrl.processo.novoAndamento = null;
            $('#modalInclusaoAndamento').modal('toggle');
        });
    };

    if(processo){
        ctrl.processo = processo;
    }else{
        ctrl.processo = {};
    }
}