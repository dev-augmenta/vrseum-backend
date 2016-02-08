angular
	.module('app')
	.controller('HapticController', ['$scope', '$rootScope', '$state',
		function ($scope, $rootScope, $state) {

			$('#create-haptic-slider').slider({
				formatter: function (value) {
					return 'Tempo Vibrazione (ms): ' + value;
				},
				reversed: true,
				tooltip_position: 'left'
			});



		}]);