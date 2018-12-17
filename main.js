'use strict';

require.config({
  paths: {
	  'jQuery' : 'components/jquery/jquery-2.2.4.min',
	  'jQueryMaskPlugin' : 'components/jQuery-Mask-Plugin/jquery.mask.min',
      'angular' : 'components/angular/angular.min',
      'angularResource' : 'components/angular/angular-resource.min',
      'angularAnimate' : 'components/angular/angular-animate.min',
      'angularUiRouter' : 'components/angular-ui-router/angular-ui-router.min',
      'angularJqueryMask' : 'components/angular-jquery-mask/angular-jquery-mask',
      'angular-sanitize' : 'components/angular/angular-sanitize.min',
      'angular-mocks' : 'components/angular/angular-mocks',
      'ngProgress': 'components/ngProgress/js/ngprogress.min',
      'domReady': 'components/domReady/domReady',
      'bootStrap' : 'components/bootstrap/js/bootstrap.min',
      'angularUiBootstrap' : 'components/angular-ui-bootstrap/js/ui-bootstrap-2.5.0.min',      
      'ngFileUpload' : 'components/ng-file-upload/ng-file-upload.min',
      'dataTables' : 'components/dataTables/js/datatables.min',
      'angularDataTables' : 'components/angular-datatables/js/angular-datatables.min',
      'toaster' : 'components/toaster/js/toaster.min',
      'ngBusy' : 'components/ng-busy/js/angular-busy.min',
      'angularBootstrapConfirm' : 'components/angular-bootstrap-confirm/angular-bootstrap-confirm.min',
      'appNgProgress' : 'components/appNgProgress/module',
      'slick' : 'components/slick/slick.min',            
      'angular-locale_pt-br' : 'components/angular/angular-locale_pt-br',
      'ng-sortable' : 'components/ng-sortable/ng-sortable.min',
      'wysiwyg.module' : 'components/angular-wysiwyg/angular-wysiwyg',
      'angular-bootstrap-colorpicker' : 'components/angular-bootstrap-colorpicker/bootstrap-colorpicker-module.min',
      'uiselect' : 'components/uiselect/js/select.min',
      'morris' : 'components/morris/morris.min',
      'angular-morris' : 'components/angular-morris/angular-morris.min',
      'raphael' : 'components/raphael/raphael.min',
  },
  shim: {
	   jQueryMaskPlugin: {
          deps: ['jQuery']
      },
      angular: {
    	  deps: ['jQuery'],
    	  exports: 'angular'
      },
      angularResource: {
          deps: ['angular']          
      },
      angularAnimate: {
          deps: ['angular']          
      },
      angularUiRouter: {
          deps: ['angular']
      },
      angularJqueryMask: {
          deps: ['angular']
      },
      'angular-sanitize': {
          deps: ['angular']
      },
      'angular-mocks': {
          deps: ['angular']
      },
      'angular-locale_pt-br': {
        deps: ['angular']                    
      },  
      ngFileUpload: {
          deps: ['angular']          
      },
      ngProgress: {
          deps: ['angular']          
      },
      domReady: {
          deps: ['angular']          
      },
      bootStrap: {
    	  deps: ['jQuery']          
      },
      angularUiBootstrap: {
    	  deps: ['angular']     
      },
      toaster: {
    	  deps: ['angular']          
      },
      ngBusy: {
    	  deps: ['angular']          
      },
      angularBootstrapConfirm: {
    	  deps: ['angular', 'bootStrap']
      },
      appNgProgress: {
    	  deps: ['ngProgress']                    
      },
      dataTables: {
    	  deps: ['jQuery']                    
      },
      angularDataTables: {
    	  deps: ['angular', 'dataTables']                    
      },
      'ng-sortable': {
        deps: ['angular']                    
      },   
      'wysiwyg.module': {
        deps: ['angular']                    
      }, 
      'angular-bootstrap-colorpicker': {
        deps: ['angular']                    
      }, 
      'uiselect': {
        deps: ['angular']                    
      },      
      'angular-morris': {
        deps: ['angular', 'morris']                    
      },  
      'morris': {
        deps: ['jquery', 'raphael'],
        exports: 'Morris',
        init: function ($, Raphael) {
            window.Raphael = Raphael;
        }
      },
      'app/main/module': {
    	  deps: ['jQueryMaskPlugin', 'angularResource', 'angularAnimate', 'angularUiRouter', 'angular-sanitize', 'angular-mocks', 'angularJqueryMask', 'angular-locale_pt-br', 'ngFileUpload', 'domReady', 'angularUiBootstrap', 'appNgProgress', 'angularDataTables', 'toaster', 'ngBusy', 'angularBootstrapConfirm', 'ng-sortable', 'wysiwyg.module', 'angular-bootstrap-colorpicker', 'uiselect', 'angular-morris']
      },
      'app/main/interceptor': {
    	  deps: ['app/main/module']          
      },
      'app/main/controllers': {
        deps: ['app/main/services', 'app/main/resources']          
      },
      'app/main/resources': {
    	  deps: ['app/main/module']          
      },
      'app/main/services': {
    	  deps: ['app/main/module']          
      },
      'app/main/rotas': {
    	  deps: ['app/main/module']          
      },
      'app/main/mock': {
        deps: ['app/main/module']          
      },
      'app/main/start': {
    	  deps: ['app/main/rotas', 'app/main/controllers', 'app/main/interceptor', 'app/main/mock']          
      }
  }
  //baseUrl: 'js',
  //,urlArgs: 'v=' +  (new Date()).getTime()
});

require(['domReady!'], function () {
	console.info('start');
	require(['app/main/start']);
});