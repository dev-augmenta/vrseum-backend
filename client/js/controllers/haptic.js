angular
	.module('app')
	.controller('HapticController', ['$scope', '$rootScope', '$state',
		function ($scope, $rootScope, $state) {

			$scope.labels = ["0ms", "125ms", "250ms", "375ms", "500ms"];
			$scope.data = [ [65, 59, 80, 81, 56, 55, 40],
							[28, 48, 40, 19, 86, 27, 90]  ];



			$('#haptic-slider-vibration-0').slider({
				formatter: function (value) {
					return value + " ms";
				},
				reversed: true,
				tooltip_position: 'left',
				tooltip : 'always'


			});

			$('#haptic-slider-intensity-0').slider({
				formatter: function (value) {
					return value;
				},
				reversed: true,
				tooltip_position: 'left',
				tooltip : 'always'


			});

			$('#haptic-slider-pause-0').slider({
				formatter: function (value) {
					return value + ' ms';
				},
				reversed: true,
				tooltip_position: 'left',
				tooltip : 'always'


			});


			//$('#create-haptic-slider').on("slide", function(slideEvt){
			//	$('#slider-0-value').text(slideEvt.value);
			//});





		}]);