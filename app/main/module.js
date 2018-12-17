'use strict';

var app = angular.module('app', ['ngResource', 'ui.router', 'ui.select', 'ngAnimate', 'as.sortable', 'fend.progressbar.loading', 'ngSanitize', 'ngFileUpload', 'datatables', 'ui.bootstrap', 'angular-jquery-mask', 'toaster', 'ngBusy', 'mwl.confirm', 'wysiwyg.module', 'colorpicker.module', 'ngMockE2E', 'angular.morris']);

app.run(['DTDefaultOptions',function(DTDefaultOptions) {
    DTDefaultOptions.setLanguageSource('components/angular-datatables/Portuguese-Brasil.json');
    DTDefaultOptions.setDisplayLength(10);
    DTDefaultOptions.setOption('info', true);
    DTDefaultOptions.setOption('lengthChange',true);
}]);

app.run(['uibDatepickerPopupConfig', function(datepickerPopupConfig) {
    datepickerPopupConfig.appendToBody = true;
    datepickerPopupConfig.closeText = "Fechar";
    datepickerPopupConfig.currentText = "Hoje";
    datepickerPopupConfig.clearText = "Limpar"; 
    datepickerPopupConfig.showButtonBar = false;
}]);

app.run(['uibDatepickerConfig', function(uibDatepickerConfig) {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerConfig.startingDay = 0;
}]);

app.run(['$transitions', '$document', 'AuthService', function ($transitions, $document, AuthService) {
    /*$transitions.onStart({}, function($transition){...});

    $transitions.onExit({exiting: "stateName"}, function($transition){...});

    $transitions.onRetain({}, function($transition){...});

    $transitions.onEnter({entering: "stateName"}, function($transition){...});

    $transitions.onFinish({}, function($transition){...});

    $transitions.onSuccess({}, function($transition){...});*/

    $transitions.onStart({}, function($transition){
        if ($transition.$to().name != 'erroLogin' && !AuthService.isValid()) {
            var destino = {name: $transition.$to().name, params: $transition._targetState._params};
            AuthService.login(destino);
            return false;
        }
    });
}]);

app.constant('APP_CONFIG', {
        'TOKEN_TIME_REFRESH': (10 * 60 * 1000),
        'TOKEN_HEADER_NAME': 'Authorization-site'
    }
);

app.constant('SITUACAO_CARREGADOR', {
        'INSCRITO': 1,   
        'HABILITADO_MANIFESTACAO_INTERESSE': 2,   
        'GARANTIA_FINANCEIRA_ENTREGUE': 3,   
        'HABILITADO_PROPOSTA_GARANTIDA': 4,   
        'INABILITADO_MANIFESTACAO_INTERESSE': 5,   
        'INABILITADO_PROPOSTA_GARANTIDA': 6,   
        'INABILITADO_RODADA': 7,   
        'CAPACIDADE_DESEJADA_ENVIADA': 8
    }
);

app.constant('LISTA_UF',
    [
        { codigo: "AC", nome: "Acre" },
        { codigo: "AL", nome: "Alagoas" },
        { codigo: "AP", nome: "Amapá" },
        { codigo: "AM", nome: "Amazonas" },
        { codigo: "BA", nome: "Bahia" },
        { codigo: "CE", nome: "Ceará" },
        { codigo: "DF", nome: "Distrito Federal" },
        { codigo: "ES", nome: "Espírito Santo" },
        { codigo: "GO", nome: "Goiás" },
        { codigo: "MA", nome: "Maranhão" },
        { codigo: "MT", nome: "Mato Grosso" },
        { codigo: "MS", nome: "Mato Grosso do Sul" },
        { codigo: "MG", nome: "Minas Gerais" },
        { codigo: "PA", nome: "Pará" },
        { codigo: "PB", nome: "Paraíba" },
        { codigo: "PR", nome: "Paraná" },
        { codigo: "PE", nome: "Pernambuco" },
        { codigo: "PI", nome: "Piauí" },
        { codigo: "RJ", nome: "Rio de Janeiro" },
        { codigo: "RN", nome: "Rio Grande do Norte" },
        { codigo: "RS", nome: "Rio Grande do Sul" },
        { codigo: "RO", nome: "Rondônia" },
        { codigo: "RR", nome: "Roraima" },
        { codigo: "SC", nome: "Santa Catarina" },
        { codigo: "SP", nome: "São Paulo" },
        { codigo: "SE", nome: "Sergipe" },
        { codigo: "TO", nome: "Tocantins" }
    ]
)


app.run(['$rootScope', function($rootScope) {

    $rootScope.processos = [  
        {
            autor: "Teste 1",
            cargo: "1",
            comarca: "12",
            depositoJudicial: "S",
            id: 1545070945281,
            numero: "1",
            numeroProcesso: "12",
            objeto: "12",
            probabilidadePerda: "PR",
            descricaoProbabilidadePerda: 'Provável',
            reu: "12",
            tipo: "PSP",
            uf: {codigo: "AC", nome: "Acre"},
            valorCausa: 452124.01,
            valorDepositoJudicial: "12",
            vara: "12",
            etapas: [
                {
                    descricaoEvento: 'Criação',
                    data: new Date(),
                    usuario: 'Usuário Contencioso'
                }
            ]
        },
        {
            autor: "Teste 2",
            cargo: "2",
            comarca: "12",
            depositoJudicial: "S",
            id: 1545070945282,
            numero: "2",
            numeroProcesso: "12",
            objeto: "12",
            probabilidadePerda: "PS",
            descricaoProbabilidadePerda: 'Possível',
            reu: "12",
            tipo: "CVL",
            uf: {codigo: "AC", nome: "Acre"},
            valorCausa: 902612.01,
            valorDepositoJudicial: "12",
            vara: "12",
            etapas: [
                {
                    descricaoEvento: 'Criação',
                    data: new Date(),
                    usuario: 'Usuário Contencioso'
                }
            ]
        },
        {
            autor: "Teste 3",
            cargo: "3",
            comarca: "12",
            depositoJudicial: "S",
            id: 1545070945283,
            numero: "3",
            numeroProcesso: "12",
            objeto: "12",
            probabilidadePerda: "RE",
            descricaoProbabilidadePerda: 'Remota',
            reu: "12",
            tipo: "AMB",
            uf: {codigo: "AC", nome: "Acre"},
            valorCausa: 1211212.01,
            valorDepositoJudicial: "12",
            vara: "12",
            etapas: [
                {
                    descricaoEvento: 'Criação',
                    data: new Date(),
                    usuario: 'Usuário Contencioso'
                }
            ]
        },
        {
            autor: "Teste 4",
            cargo: "4",
            comarca: "12",
            depositoJudicial: "S",
            id: 1545070945284,
            numero: "4",
            numeroProcesso: "12",
            objeto: "12",
            probabilidadePerda: "NA",
            descricaoProbabilidadePerda: 'Não Aplicável',
            reu: "12",
            tipo: "AMB",
            uf: {codigo: "AC", nome: "Acre"},
            valorCausa: 1211212.01,
            valorDepositoJudicial: "12",
            vara: "12",
            etapas: [
                {
                    descricaoEvento: 'Criação',
                    data: new Date(),
                    usuario: 'Usuário Contencioso'
                }
            ]
        },
        {
            autor: "Teste 5",
            cargo: "4",
            comarca: "12",
            depositoJudicial: "S",
            id: 1545070945284,
            numero: "5",
            numeroProcesso: "12",
            objeto: "12",
            probabilidadePerda: "NA",
            descricaoProbabilidadePerda: 'Não Aplicável',
            reu: "12",
            tipo: "AMB",
            uf: {codigo: "AC", nome: "Acre"},
            valorCausa: 123123.01,
            valorDepositoJudicial: "12",
            vara: "12",
            etapas: [
                {
                    descricaoEvento: 'Criação',
                    data: new Date(),
                    usuario: 'Usuário Contencioso'
                }
            ]
        },
        {
            autor: "Teste 3",
            cargo: "3",
            comarca: "12",
            depositoJudicial: "S",
            id: 1545070945288,
            numero: "6",
            numeroProcesso: "12",
            objeto: "12",
            probabilidadePerda: "RE",
            descricaoProbabilidadePerda: 'Remota',
            reu: "12",
            tipo: "AMB",
            uf: {codigo: "AC", nome: "Acre"},
            valorCausa: 12343.24,
            valorDepositoJudicial: "12",
            vara: "12",
            etapas: [
                {
                    descricaoEvento: 'Criação',
                    data: new Date(),
                    usuario: 'Usuário Contencioso'
                }
            ]
        }
    ];  
}]);