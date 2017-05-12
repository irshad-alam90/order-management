angular.module('starter')
.controller('loginCtrl', function($scope,$rootScope, $stateParams , SweetAlert, $ionicModal, $state, $ionicLoading,  ionicToast, validation, userFact, storeFact){
	var vm = this;
	vm.userLoginInfo = {};
	vm.showResetPassword = 1;
	vm.forgotPassword = {};
		
	$ionicModal.fromTemplateUrl('forgot-password.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		vm.modal = modal;

	});
	vm.openModal = function() {
		vm.modal.show();
		
	};
	vm.closeModal = function() {
		vm.showResetPassword = 1;
		vm.forgotPassword = {};
		vm.modal.hide();
	};

	vm.login = function(){
		var valid = true;
		ionicToast.hide();
		if(validation.blank(vm.userLoginInfo.email) || validation.blank(vm.userLoginInfo.password)){
			valid = false;
			ionicToast.show('Please enter Email and Password.', 'bottom', true, 1500);
		} else if(!validation.email(vm.userLoginInfo.email)){
			valid = false;
			ionicToast.show('Please enter valid Email.', 'bottom', true, 1500);
		} else if(!validation.sizeLimit(vm.userLoginInfo.password, 6, 64)){
			valid = false;
			ionicToast.show('Password should have 6 to 64 characters.', 'bottom', true, 1500);
			
		}
		if(valid){
			$ionicLoading.show({
				template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
			});
			userFact.login(vm.userLoginInfo).success(function(data){
				//SweetAlert.success("Successful Login!");
				vm.user = data.user.data;
				
				storeFact.putObject('user', vm.user);
				vm.token = data.user.data.attributes.auth_token;
				console.log(vm.token);
				$rootScope.user = vm.user;
				$state.go('order');
			}).error(function(data){
				ionicToast.show(data.message, 'bottom', true, 1500);
				console.log('Error' + data);
			}).finally(function(data){
				$ionicLoading.hide();
			});

			
		}
		
	};


	//Reset Password
	vm.resetPasswordInstructions = function(){
		var valid = true;
		ionicToast.hide();
		if(validation.blank(vm.forgotPassword.email)){
			valid = false;
			ionicToast.show('Please enter Email.', 'bottom', true, 1500);
		} else if(!validation.email(vm.forgotPassword.email)){
			valid = false;
			ionicToast.show('Please enter valid Email.', 'bottom', true, 1500);
		}
		if(valid) {
			$ionicLoading.show({
				template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
			});
			userFact.resetPasswordInstructions(vm.forgotPassword.email).success(function(data){
				vm.showResetPassword = 2;
				vm.forgotPassword.id = data.user.data.id;

			}).error(function(data){
				ionicToast.show(data.message, 'bottom', true, 1500);
			}).finally(function(data){
				$ionicLoading.hide();
			});
		}
	};

	vm.codeConfirm = function(){
		var valid = true;
		ionicToast.hide();
		if(validation.blank(vm.forgotPassword.code)){
			valid = false;
			ionicToast.show('Please enter Code.', 'bottom', true, 1500);
		}
		if(valid) {
			$ionicLoading.show({
				template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
			});
			userFact.codeConfirm(vm.forgotPassword.id, vm.forgotPassword.code).success(function(data){
				vm.showResetPassword = 3;
				vm.user = data.user;
			}).error(function(data){
				ionicToast.show(data.message, 'bottom', true, 1500);
			}).finally(function(data){
				$ionicLoading.hide();
			});
		}
	};

	vm.resetPassword = function(){
		var valid = true;
		ionicToast.hide();
		if(validation.blank(vm.forgotPassword.password)){
			valid = false;
			ionicToast.show('Please enter Password.', 'bottom', true, 1500);
		} else if(vm.forgotPassword.passwordConfirmation != vm.forgotPassword.password){
			valid = false;
			ionicToast.show('Password doesn\'t match confirmation.', 'bottom', true, 1500);
		}
		if(valid) {
			$ionicLoading.show({
				template: '<ion-spinner icon class="spinner spinner-ios"></ion-spinner>'
			});
			userFact.resetPassword(vm.forgotPassword.id, vm.forgotPassword.password, vm.user.data.attributes.auth_token).success(function(data){
				vm.showResetPassword = 1;
				vm.closeModal();
				SweetAlert.success("Password has been reset. Please Login!");
			}).error(function(data){
				ionicToast.show(data.message, 'bottom', true, 1500);
			}).finally(function(){
				$ionicLoading.hide();
			});
		}
	};



	


	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		if(vm.modal)
			vm.modal.remove();
	});


})