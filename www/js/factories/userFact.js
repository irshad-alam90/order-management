angular.module('starter').factory('userFact', function(CONFIG, $http, $rootScope){
	var fact = {};


	fact.login = function(userObj){
		var req = {
			method: 'POST',
			url: CONFIG.URL + '/api/order_management/login',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1'
			},
			data: { user: { data: { attributes: userObj } } }
		};
		return $http(req)
	};

	fact.resetPasswordInstructions = function(email){
		var req = {
			method: 'POST',
			url: CONFIG.URL + '/api/order_management/forgot_password',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1'
			},
			data: { user: { data: { email: email } } }
		};
		return $http(req)
	};

	fact.codeConfirm = function(id, code){
		var req = {
			method: 'POST',
			url: CONFIG.URL + '/api/order_management/users/code_verification',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1'
			},
			data: { user: { data: { id: id, attributes: { code: code } } } }
		};
		return $http(req)
	};

	fact.resetPassword = function(id, password, authorization){
		var req = {
			method: 'PUT',
			url: CONFIG.URL + '/api/order_management/users/update_password',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1',
				'Authorization': authorization
			},
			data: { user: { data: { id: id, attributes: { password: password } } } }
		};
		return $http(req)
	};


	fact.getOrder = function(authorization){
		var req = {
			method: 'GET',
			url: CONFIG.URL + '/api/order_management/retrieve_filter_values',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1',
				'Authorization': authorization
			},
			data: {}
		};
		return $http(req)
	};

	fact.change = function(page,stores,order_date,statuses,type){
		var req = {
			method: 'GET',
			url: CONFIG.URL + '/api/order_management/filter_order?page=' + page + '&stores=' + stores + '&order_date=' + order_date + '&statuses=' + statuses + '&type=' + type,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1',
				'Authorization': $rootScope.user.attributes.auth_token
			},
			data: {} 
		};
		return $http(req)
	};

	fact.getOrderDetails = function(id){
    var req = {
      method: 'GET',
      url: CONFIG.URL + '/api/order_management/order/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.greenstork.v1',
        'Authorization': $rootScope.user.attributes.auth_token
      },
      data: { }
    };
    return $http(req)
  };

  fact.update = function(id,status){
		var req = {
			method: 'PATCH',
			url: CONFIG.URL + '/api/order_management/order/' + id ,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.greenstork.v1',
				'Authorization': $rootScope.user.attributes.auth_token
			},
			data: { id: id, status: status  } 
		};
		return $http(req)
	};

	return fact;
});
