'use strict';

app.controller('LogAcaoController', ['DTColumnDefBuilder', 'DTOptionsBuilder', 'LogAcaoResource', 'UsuarioTBGResource', 'acoes', LogAcaoController]);

function LogAcaoController(DTColumnDefBuilder, DTOptionsBuilder, LogAcaoResource, UsuarioTBGResource, acoes, leiloes, carregadores, pontosZonas) {
    var ctrl = this;
    ctrl.acoes = acoes;
    
    ctrl.dtColumnDefs = [  
        DTColumnDefBuilder.newColumnDef(0).withOption('type', 'datetime')
        //DTColumnDefBuilder.newColumnDef(1).notSortable()
    ];

    ctrl.dtOptions  = DTOptionsBuilder.newOptions().withOption('order', []);

    ctrl.consultar = function() {   
        LogAcaoResource.query({
            idAcao : ctrl.acao ? ctrl.acao.id : null,
            loginUsuario: ctrl.usuario ? ctrl.usuario.login : null,
            idLeilao: ctrl.leilao ? ctrl.leilao.id : null,
            idCarregador: ctrl.carregador ? ctrl.carregador.id : null,
            idPontoZona: ctrl.pontoZona ? ctrl.pontoZona.id : null
        },
            function(result) {             
                ctrl.logAcoes = result;
            }
        );
    };

    ctrl.buscarUsuarios = function(chaveUsuarioLike) {
        UsuarioTBGResource.query({
            chaveUsuarioLike: encodeURIComponent(chaveUsuarioLike)
        }, function(data) {
            ctrl.usuarios = data;
        });
    };
}