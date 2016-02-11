angular
	.module('app')
	.controller('EditArtWorkController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'File',
		function($scope, $rootScope, $q, $state, $stateParams, File){

			$scope.file = {};

			$q.all([
				File.findById({ id : $stateParams.id}).$promise
			])
				.then(function(data){
					console.log(data[0]);
					$scope.file.name = data[0].name;
					$scope.file.description = data[0].description;
			});

			$scope.submitForm = function()
			{
				$scope.file
					.$save()
					.then(function(file){
						$state.go('area-clienti.opere');
				});
			};

	}]);