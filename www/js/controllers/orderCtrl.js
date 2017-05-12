angular.module('starter')
.controller('orderCtrl', function($state,$scope,$rootScope,$ionicHistory,$ionicLoading,userFact,storeFact, ionicToast){
	var vm = this;
	vm.orderDet = function(id){
		$state.go('orderDetails',{id: id})
	}
	vm.logout = function(){
      $ionicHistory.clearCache().then(function() {
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $state.go('login');
      })
    };


    vm.getOrder = function(){
    	$rootScope.user = storeFact.getObject('user');
		userFact.getOrder($rootScope.user.attributes.auth_token).success(function(data){
			vm.orders = data.orders.data;
			vm.stores = data.stores;
			//vm.id = data.stores[2].id;
			vm.selectedstore = data.stores[0].id;
      setTimeout(function(){
        document.getElementById('store-select').removeChild(document.getElementById('store-select').getElementsByTagName('option')[0]);
      });

			vm.order_date=data.order_date;
			vm.selectedODate = vm.order_date[1];

			vm.statuses=data.statuses;
			vm.selectedstatus = vm.statuses[0];

			vm.type=data.type;
			vm.selectedtype = vm.type[2];


		}).error(function(data){
			ionicToast.show(data.message, 'bottom', true, 1500);
		}).finally(function(data){
			$ionicLoading.hide();
		});

	};

	vm.change = function(){
		ionicToast.hide();
		vm.pageOrder=1;
		vm.loadOrderIncomplete = true;
		$ionicLoading.show({
			template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
		});
		userFact.change(vm.pageOrder, vm.selectedstore, vm.selectedODate, vm.selectedstatus, vm.selectedtype).success(function(data){
			vm.orders = data.orders.data;
			vm.id = data.orders.data.id;
			if(vm.orders.length<20){
				vm.loadOrderIncomplete = false;
			}
		}).error(function(data){
			ionicToast.show(data.message, 'bottom', true, 1500);
		}).finally(function(data){
			$ionicLoading.hide();
		});
	};


	vm.loadMoreOrders = function(){
		vm.pageOrder += 1;
		userFact.change(vm.pageOrder,vm.selectedstore, vm.selectedODate, vm.selectedstatus, vm.selectedtype).success(function (data) {
			if(vm.orders.length < 20){
				vm.loadOrderIncomplete = false;
			}
			vm.orders = vm.orders.concat(data.orders.data);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data){
			ionicToast.show(data.message, 'bottom', true, 1500);
		}).finally(function(data){
			$ionicLoading.hide();
		});
	};
})

.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
