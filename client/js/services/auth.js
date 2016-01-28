angular
	.module('app')
	.factory('AuthService', ['AppUser', '$q', '$rootScope','LoopBackAuth', function (User, $q,
			$rootScope, LoopBackAuth) {
			function login(username, email, password) {
				return User
					.login({username: username, email: email, password: password})
					.$promise
					.then(function (response) {
							/*$rootScope.currentUser = {
							id: response.user.id,
							tokenId: response.id,
							email: email,
							username: username,
							folder: LoopBackAuth.currentUserData.folder
						};*/

						sessionStorage.setItem('$LoopBack$CurrentUser$Username', LoopBackAuth.currentUserData.username);
						sessionStorage.setItem('$LoopBack$CurrentUser$Email', LoopBackAuth.currentUserData.email);
						sessionStorage.setItem('$LoopBack$CurrentUser$Id', LoopBackAuth.currentUserData.id);
						sessionStorage.setItem('$LoopBack$CurrentUser$Folder', LoopBackAuth.currentUserData.folder);
						sessionStorage.setItem('$LoopBack$CurrentUser$TokenId', LoopBackAuth.accessTokenId);

					});
			}

			function logout() {
				return User
					.logout()
					.$promise
					.then(function () {
						$rootScope.currentUser = null;
						sessionStorage.clear();
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
