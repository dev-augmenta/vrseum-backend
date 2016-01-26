angular
	.module('app')
	.factory('AuthService', ['AppUser', '$q', '$rootScope', function (User, $q,
			$rootScope) {
			function login(username, email, password) {
				return User
					.login({username: username, email: email, password: password})
					.$promise
					.then(function (response) {
						$rootScope.currentUser = {
							id: response.user.id,
							tokenId: response.id,
							email: email,
							username: username
						};
						//var accessToken = response.data;
						//LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
						//LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
						//LoopBackAuth.save();

						//console.log(JSON.stringify(LoopBackAuth));
					});
			}

			function logout() {
				return User
					.logout()
					.$promise
					.then(function () {
						$rootScope.currentUser = null;
						localStorage.clear();
					});
			}

			function register(username, email, password) {
				return User
					.create({
						username: username,
						email: email,
						password: password
					})
					.$promise;
			}

			return {
				login: login,
				logout: logout,
				register: register
			};
		}]);
