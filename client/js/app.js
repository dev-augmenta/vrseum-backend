angular
	.module('app', [
		'ui.router',
		'lbServices'
	])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,
			$urlRouterProvider) {
			$stateProvider
				.state('area-clienti', {
					url: '/area-clienti',
					templateUrl: 'views/area-clienti.html',
					authenticate: true
				})
				.state('area-clienti.miei-musei', {
					url: '/miei-musei',
					templateUrl: 'views/area-clienti-partials/miei-musei.html',
					authenticate: true
				})
				.state('area-clienti.crea-museo', {
					url: '/crea-museo',
					templateUrl: 'views/area-clienti-partials/crea-museo.html',
					authenticate: true
				})
				.state('area-clienti.musei', {
					url: '/musei',
					templateUrl: 'views/area-clienti-partials/musei.html',
					authenticate: true
				})
				.state('area-clienti.opere', {
					url: '/opere',
					templateUrl: 'views/area-clienti-partials/opere.html',
					authenticate: true
				})
				.state('area-clienti.carica-opera', {
					url: '/carica-opera',
					templateUrl: 'views/area-clienti-partials/carica-opera.html',
					authenticate: true
				})
				.state('area-clienti.haptic', {
					url: '/haptic',
					templateUrl: 'views/area-clienti-partials/haptic.html',
					authenticate: true
				})
				.state('area-clienti.crea-haptic', {
					url: '/crea-haptic',
					templateUrl: 'views/area-clienti-partials/crea-haptic.html',
					authenticate: true
				})
				.state('area-clienti.scarica-haptic', {
					url: '/scarica-haptic',
					templateUrl: 'views/area-clienti-partials/scarica-haptic.html',
					authenticate: true
				})
				.state('area-clienti.editor-vr', {
					url: '/editor-vr',
					templateUrl: 'views/area-clienti-partials/editor-vr.html',
					authenticate: true
				})
				.state('home', {
					url: '/home',
					templateUrl: 'views/home.html',
				})
				.state('virtual-tour', {
					url: '/virtual-tour',
					templateUrl: 'views/virtual-tour.html',
				})
				.state('notizie', {
					url: '/notizie',
					templateUrl: 'views/notizie.html',
				})
				.state('come-funziona', {
					url: '/come-funziona',
					templateUrl: 'views/come-funziona.html',
				})
				.state('add-review', {
					url: '/add-review',
					templateUrl: 'views/review-form.html',
					controller: 'AddReviewController',
					authenticate: true
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
					controller: 'AuthLoginController',
				})
				.state('logout', {
					url: '/logout',
					controller: 'AuthLogoutController',
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
			$urlRouterProvider.otherwise('home');
		}])
	.run(['$rootScope', '$state', 'LoopBackAuth', function ($rootScope, $state, LoopBackAuth) {
			$rootScope.$on('$stateChangeStart', function (event, next) {

				if( sessionStorage.getItem('$LoopBack$CurrentUser$TokenId') !== null)
				{
					$rootScope.currentUser = {};

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
