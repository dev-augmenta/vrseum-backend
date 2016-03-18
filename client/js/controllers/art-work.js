angular
	.module('app')
	.controller('EditArtWorkController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'File',
		function($scope, $rootScope, $q, $state, $stateParams, File){

			$scope.artWork = {};

			var filter = {
				where : {id : $stateParams.id}
			};

			File.find({filter : filter})
			.$promise
				.then(function(data){
					console.log(data);
					$scope.artWork = data[0];
			});

			//File.findById({ id : $stateParams.id})


			/*$q.all([
				File.findById({ id : $stateParams.id}).$promise
			])
				.then(function(data){
					console.log(data[0]);
					$scope.artWork = data[0];

			});*/

			$scope.submitForm = function()
			{
				$scope.artWork
					.$save()
					.then(function(artWork){
						$state.go('area-clienti.opere');
				});
			};

	}]);