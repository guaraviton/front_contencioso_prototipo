'use strict';

app.controller('QuadroProcessosController', ['$rootScope', '$filter', '$state', QuadroProcessosController]);

function QuadroProcessosController($rootScope, $filter, $state) {
	
	var ctrl = this;

	ctrl.processosFase1grau = $filter('filter')($rootScope.processos, {faseAtual: '1grau'});
	ctrl.processosFaseRecursal = $filter('filter')($rootScope.processos, {faseAtual: 'recursal'});
	ctrl.processosFaseSuspenso = $filter('filter')($rootScope.processos, {faseAtual: 'suspenso'});

	ctrl.abrirProcesso = function(processo){
        $state.go('processoEdit', {'id': processo.id});
    };
}