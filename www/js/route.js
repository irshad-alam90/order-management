angular.module('starter').config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: 'templates/login.html',
			controller: 'loginCtrl',
			controllerAs: 'loginCtrl'
		})

		.state('order', {
			url: '/order',
			templateUrl: 'templates/order.html',
			controller: 'orderCtrl',
			controllerAs: 'orderCtrl'
		})

		.state('orderDetails', {
			url: '/orderDetails/:id',
			templateUrl: 'templates/orderDetails.html',
			controller: 'orderDetailsCtrl',
			controllerAs: 'orderDCtrl'
		})

	});
