angular
	.module('app')
	.controller('EditArtWorkController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'File',
		function($scope, $rootScope, $q, $state, $stateParams, File){

			$scope.artwork = {};

			var filter = {
				where : {id : $stateParams.id}
			};

			File.find({filter : filter})
			.$promise
				.then(function(data){
					console.log(data[0]);
					$scope.artwork = data[0];
			});

			/*File.findById({ id : $stateParams.id})
			.$promise
				.then(function(data){
					console.log(data);
					$scope.artwork = data[0];
			});*/


			/*$q.all([
				File.findById({ id : $stateParams.id}).$promise
			])
				.then(function(data){
					console.log(data[0]);
					$scope.artWork = data[0];

			});*/

			$scope.submitForm = function()
			{
				$scope.artwork
					.$save(
					function(){ // on success
						$state.go('area-clienti.opere');},
					function(){ // on error
						$state.go('area-clienti.opere');}


				);
			};

	}]);