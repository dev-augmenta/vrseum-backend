angular
	.module('app')
	.controller('AddMuseumController', ['$scope', '$rootScope', 'AppUser', 'Museum', '$state',
		function ($scope, $rootScope, AppUser, Museum, $state) {

			$scope.create = function () {

				// Verify why if not checked is null instead of false
				if ($scope.museum.isOpen === null)
				{
					$scope.museum.isOpen = false;
				}
				if ($scope.museum.thumbnail === null)
				{
					$scope.museum.thumbnail = 'img/museums/thumbs/museo-00.png';
				}
				Museum.create({
					name: $scope.museum.name,
					description: $scope.museum.description,
					//thumbnail : $scope.museum.thumbnail,
					thumbnail: 'img/museums/thumbs/museo-00.png',
					isOpen: $scope.museum.isOpen,
					ownerId: $rootScope.currentUser.id
				})
					.$promise
					.then(function () {
						$state.go('area-clienti.miei-musei');
					});
			};
		}])
	.controller('MyMuseumsController', ['$scope', '$rootScope', 'AppUser',
		function ($scope, $rootScope, AppUser) {

			$scope.museums = AppUser.museums({
				accessToken: $rootScope.currentUser.tokenId,
				id: $rootScope.currentUser.id

			});
		}])
	.controller('AllMuseumsController', ['$scope', 'Museum',
		function ($scope, Museum) {
			var filter = {
				where: {isOpen: true},
				include: ['owner'] // we want to add username as author
			};
			Museum.find({filter: filter}).$promise.then(function (data) {

				for (var i = 0; i < data.length; i++)
				{
					if (data[i].owner && data[i].owner.username)
					{
						data[i].author = data[i].owner.username;
						// eliminate sensibles data
						data[i].owner = null;
					} else
					{
						// remove museums wihtout an owner
						data[i] = null;
					}
				}
				// return values
				$scope.museums = data;
			});
		}])
	.controller('EditMuseumController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'Museum',
		function ($scope, $rootScope, $q, $state, $stateParams, Museum) {

			$scope.museum = {};

			$q.all([
				Museum.findById({ id: $stateParams.id}).$promise
			])
				.then(function(data){

					console.log(data[0]);
					$scope.museum = data[0];

			});

			$scope.submitForm = function()
			{
				$scope.museum
					.$save()
					.then(function(museum){
						$state.go('area-clienti.miei-musei');
				});
			};

		}]);
