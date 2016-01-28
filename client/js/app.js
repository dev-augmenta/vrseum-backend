angular
	.module('app', [
		'ui.router',
		'lbServices'
	])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,
			$urlRouterProvider) {
			$stateProvider
				.state('dashboard', {
					url: '/dashboard',
					templateUrl: 'views/dashboard.html',
					authenticate: true
				}).state('dashboard.overview', {
				url: 'overview',
				templateUrl: 'views/dashboard-partials/overview.html'
				}).state('dashboard.reports', {
				url: 'reports',
				templateUrl: 'views/dashboard-partials/reports.html'
				})
				.state('add-review', {
					url: '/add-review',
					templateUrl: 'views/review-form.html',
					controller: 'AddReviewController',
					authenticate: true
				})
				.state('all-reviews', {
					url: '/all-reviews',
					templateUrl: 'views/all-reviews.html',
					controller: 'AllReviewsController'
				})
				.state('edit-review', {
					url: '/edit-review/:id',
					templateUrl: 'views/review-form.html',
					controller: 'EditReviewController',
					authenticate: true
				})
				.state('delete-review', {
					url: '/delete-review/:id',
					controller: 'DeleteReviewController',
					authenticate: true
				})
				.state('forbidden', {
					url: '/forbidden',
					templateUrl: 'views/forbidden.html',
				})
				.state('login', {
					url: '/login',
					templateUrl: 'views/login.html',
					controller: 'AuthLoginController'
				})
				.state('logout', {
					url: '/logout',
					controller: 'AuthLogoutController'
				})
				.state('my-reviews', {
					url: '/my-reviews',
					templateUrl: 'views/my-reviews.html',
					controller: 'MyReviewsController',
					authenticate: true
				})
				.state('sign-up', {
					url: '/sign-up',
					templateUrl: 'views/sign-up-form.html',
					controller: 'SignUpController',
				})
				.state('sign-up-success', {
					url: '/sign-up/success',
					templateUrl: 'views/sign-up-success.html'
				});
			$urlRouterProvider.otherwise('all-reviews');
		}])
	.run(['$rootScope', '$state', 'LoopBackAuth', function ($rootScope, $state, LoopBackAuth) {
			$rootScope.$on('$stateChangeStart', function (event, next) {

				// check if currentUser is still valid in $rootScope
				if($rootScope.currentUser !== null && $rootScope.currentUser.tokenId !== null)
				{

				}

				if( sessionStorage.getItem('$LoopBack$CurrentUser$TokenId') !== null)
				{

					$rootScope.currentUser.username = sessionStorage.getItem('$LoopBack$CurrentUser$Username');
					$rootScope.currentUser.email = sessionStorage.getItem('$LoopBack$CurrentUser$Email');
					$rootScope.currentUser.id = sessionStorage.getItem('$LoopBack$CurrentUser$Id');
					$rootScope.currentUser.folder = sessionStorage.getItem('$LoopBack$CurrentUser$Folder');
					$rootScope.currentUser.tokenId = sessionStorage.getItem('$LoopBack$CurrentUser$TokenId');
				}
				else
				{
					$rootScope.currentUser = null;
				}

				if (next.authenticate && !$rootScope.currentUser) {
					event.preventDefault(); //prevent current page from loading
					$state.go('forbidden');
				}
			});
		}]);
