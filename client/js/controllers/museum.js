angular
	.module('app')
	.controller('AddMuseumController', ['$scope', 'Museum', '$state',
		function ($scope, Museum, $state) {
			$scope.create = function () {
				Museum.create($scope.museum.name, $scope.museum.description, $scope.museum.isOpen)
					.then(function () {
						$state.go('area-clienti.miei-musei');
					});
			};
		}]);


