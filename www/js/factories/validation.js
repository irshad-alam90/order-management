angular.module('starter').factory('validation', function(){
	var fact = {};
	fact.blank = function(value){
		return (value == undefined || value == '')
	};

	fact.email = function(value){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(value);
	};

	fact.sizeLimit = function(value, min, max){
		var l = value.length
		if(max === 0){
			return (l >= min)
		} else if(min === 0) {
			return (l <= max)
		} else {
			return (l >= min && l <= max)
		}
	};

	return fact;
});