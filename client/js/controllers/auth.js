angular
	.module('app')
	.controller('AuthLoginController', ['$scope', 'AuthService', '$state',
		function ($scope, AuthService, $state) {
			$scope.user = {
				username: 'foo',
				email: 'foo@bar.com',
				password: 'foobar'
			};

			$scope.login = function () {
				AuthService.login($scope.user.username, $scope.user.email, $scope.user.password)
					.then(function () {
						$state.go('add-review');
					});
			};
		}])
	.controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
		function ($scope, AuthService, $state) {
			AuthService.logout()
				.then(function () {
					$state.go('all-reviews');
				});
		}])
	.controller('SignUpController', ['$scope', 'AuthService', '$state',
		function ($scope, AuthService, $state) {
			$scope.user = {
				username: 'baz',
				email: 'baz@qux.com',
				password: 'bazqux'
			};

			$scope.register = function () {
				AuthService.register($scope.user.username, $scope.user.email, $scope.user.password)
					.then(function () {
						$state.transitionTo('sign-up-success');
					});
			};
		}]);
