angular.module('starter').factory('storeFact', function($cookies){
	var fact = {};

	fact.putObject = function(key, value){
		$cookies.putObject(key, value);
	};

	fact.getObject = function(key){
		return $cookies.getObject(key);
	};

	return fact;
});