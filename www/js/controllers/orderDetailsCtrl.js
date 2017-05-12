angular.module('starter')
  .controller('orderDetailsCtrl', function($scope,$rootScope,$stateParams, userFact, $location, $ionicLoading,$ionicModal,ionicToast, $ionicHistory){
    var vm = this;
    vm.getOrderDetails = function(){
      $ionicLoading.show({
        template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
      });
      userFact.getOrderDetails($stateParams.id).success(function(data){
        vm.orderDetail = data.order.data;
        vm.status = data.order.data.attributes.status;
        vm.items = data.order.data.attributes.items;
        vm.govId = data.order.data.attributes.view_id;
        vm.docId = data.order.data.attributes.doc_id;
        vm.statuses = data.statuses;
        vm.address = data.order.data.attributes.address;
        vm.id = data.order.data.id;
      }).error(function(data){
        ionicToast.show(data.message, 'bottom', true, 1500);
      }).finally(function(data){
        $ionicLoading.hide();
      });
    }


    vm.update = function(){
      ionicToast.hide();
      $ionicLoading.show({
        template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
      });
      userFact.update(vm.id, vm.status).success(function(data){
      }).error(function(data){
        ionicToast.show(data.message, 'bottom', true, 1500);
      }).finally(function(data){
        $ionicLoading.hide();
      });
    };

      $scope.myGoBack = function(){
      $ionicHistory.goBack();
    }


  $ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    vm.modal = modal;

  });

  vm.openModal = function() {
    vm.modal.show();
  };

  vm.closeModal = function() {
    vm.modal.hide();
  };

  vm.showImage = function(index) {
    switch(index) {
      case 1:
        vm.imageSrc = vm.govId;
        break;
      case 2:
        vm.imageSrc  = vm.docId;
        break;
    }
      vm.openModal();
  }


  vm.showMap = function(addr){
    var link = ""+"http://maps.google.com/maps?q="+addr;
     if( (navigator.platform.indexOf("iPhone") != -1) 
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1))
        window.open(link, '_blank');
      else
        window.open(link, '_blank');
  }
}); 



