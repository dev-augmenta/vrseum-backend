angular
	.module('app')
	.controller('HapticController', ['$scope', '$rootScope', '$state',
		function ($scope, $rootScope, $state) {

			$scope.addStep = function() {

				console.log("we added a step " + durationSlider.slider('getValue'));
				console.log("but the scope is "+ $scope.slider.sliderValue);
				console.log($scope);
			};

			var durationSlider = $('#haptic-slider-vibration-0').slider({
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


			/*$('#haptic-slider-vibration-0').on("slide", function(slideEvt){
				$scope.slider.sliderValue = slideEvt.value;
			});*/

		}]);