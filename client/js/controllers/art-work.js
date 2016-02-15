angular
	.module('app')
	.controller('EditArtWorkController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'File',
		function($scope, $rootScope, $q, $state, $stateParams, File){

			$scope.artWork = {};

			$q.all([
				File.findById({ id : $stateParams.id}).$promise
			])
				.then(function(data){
					console.log(data[0]);
					$scope.artWork = data[0];

			});

			$scope.submitForm = function()
			{
				$scope.artWork
					.$save()
					.then(function(artWork){
						$state.go('area-clienti.opere');
				});
			};

	}]);