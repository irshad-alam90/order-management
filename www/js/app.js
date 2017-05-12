angular.module('starter', ['ionic','ionic-toast','ngCookies','ng-sweet-alert'])

.run(function($ionicPlatform, $rootScope, storeFact, $state, ionicToast) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.user = storeFact.getObject('user');
  /*$rootScope.$on("$stateChangeStart", function(event, toState ,toParams, fromState, fromParams, options){
  	ionicToast.hide();
  	var user = storeFact.getObject('user')
  	if(user && (toState.name == 'login')){
  		event.preventDefault();
  		$state.go('order')
  	}
  	if(user = undefined ){
  		event.preventDefault();
  		$state.go('login');
  	}
  });*/

})


.constant('CONFIG', {
		'URL': 'https://dispensary.greenstork.com'
		//'URL': 'http://localhost:3000'
	});

