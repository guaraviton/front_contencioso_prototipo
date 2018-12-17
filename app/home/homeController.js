'use strict';

app.controller('HomeController', ['$rootScope', '$filter', HomeController]);

function HomeController($rootScope, $filter) {       			    	               
	var ctrl = this; 

	ctrl.getSoma = function(processos) {
        var soma = 0;
        angular.forEach(processos, function(processo, index) {
            soma += processo.valorCausa;
        });
        return soma;
    };

    ctrl.formatarMonetario = function (index, options, content) {
        var data = options.data[index];
        return "<div class='morris-hover-row-label'>"+data.label+"</div><div class='morris-hover-point' style='color: #0b62a4'>Total:&nbsp;"+$filter('currency')(data.value, 'R$')+"</div>";
    }

	var processosProbabilidadeProvavel = $filter('filter')($rootScope.processos, {probabilidadePerda: 'PR'});
	var processosProbabilidadePossivel = $filter('filter')($rootScope.processos, {probabilidadePerda: 'PS'});
	var processosProbabilidadeRemota = $filter('filter')($rootScope.processos, {probabilidadePerda: 'RE'});
	var processosProbabilidadeRemotaNaoAplicavel = $filter('filter')($rootScope.processos, {probabilidadePerda: 'NA'});


	ctrl.numeroProcessosPorProbabilidade = [
		{label: "Provável", value: processosProbabilidadeProvavel.length},
		{label: "Possível", value: processosProbabilidadePossivel.length},
		{label: "Remota", value: processosProbabilidadeRemota.length},
		{label: "Não Aplicável", value: processosProbabilidadeRemotaNaoAplicavel.length}
    ];

    ctrl.totalValorCausaProvavel = ctrl.getSoma(processosProbabilidadeProvavel);
    ctrl.totalValorCausaPossivel = ctrl.getSoma(processosProbabilidadePossivel);
    ctrl.totalValorCausaRemota = ctrl.getSoma(processosProbabilidadeRemota);
    ctrl.totalValorCausaNaoAplicavel = ctrl.getSoma(processosProbabilidadeRemotaNaoAplicavel);

    ctrl.valorCausaprocessosPorProbabilidade = [
		{label: "Provável", value: ctrl.totalValorCausaProvavel },
		{label: "Possível", value: ctrl.totalValorCausaPossivel},
		{label: "Remota", value: ctrl.totalValorCausaRemota},
		{label: "Não Aplicável", value: ctrl.totalValorCausaNaoAplicavel}
    ];

    ctrl.totalValorCausa = ctrl.totalValorCausaProvavel + ctrl.totalValorCausaPossivel + ctrl.totalValorCausaRemota + ctrl.totalValorCausaNaoAplicavel;    

}
