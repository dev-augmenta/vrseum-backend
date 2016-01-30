angular
	.module('app')
	.controller('AddMuseumController', ['$scope','$rootScope', 'Museum', '$state',
		function ($scope, $rootScope, Museum, $state) {

			$scope.create = function () {
				Museum.create({
						name: $scope.museum.name,
						description: $scope.museum.description,
						isOpen:$scope.museum.isOpen,
						ownerId : $rootScope.currentUser.id
				})
				.$promise
				.then(function () {
					$state.go('area-clienti.miei-musei');
				});
			};
		}])
	.controller('MyMuseumsController', ['$scope', '$rootScope', 'AppUser',
		function($scope, $rootScope, AppUser){

			$scope.museums = AppUser.museums({
				filter : {
					id: $rootScope.currentUser.id
				}
			});
		}]);
