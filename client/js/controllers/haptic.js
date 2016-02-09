angular
	.module('app')
	.config(['ChartJsProvider', function(ChartJsProvider){
			//Configure all charts
			ChartJsProvider.setOptions({
				colours: ['#428bca', '#149bdf'],
				responsive: true
			});
}])
	.controller('HapticController', ['$scope', '$rootScope', '$state', 'Haptic',
		function ($scope, $rootScope, $state, Haptic) {

			// Init scope variables
			$scope.slider = {
				duration : 0,
				intensity: 0,
				pause: 0,
				loop : 0
			};

			// Object saved in database (haptic model)
			//{	"name": "BOMB",
			//	"pattern": [ 1000, 100, 500, 50, 125, 50 ],
			//	"intensity": [ 1, 0, 0.5, 0, 0.125, 0 ],
			//	"loop": 1
			//}
			$scope.haptic = {
				name : '',
				pattern : [],
				intensity : [],
				loop : 0
			};


			//$scope.undoSteps = []; // we will create undo later

			// Data for the graph
			$scope.chart_labels = ["0ms"];
			$scope.chart_series = ['Pattern'];
			$scope.chart_data = [new Array()];
			$scope.chart_data[0] = [0];
			$scope.isFirstStep = true;
			$scope.totalDuration = 0;


			$scope.saveHaptic = function ()
			{
				$scope.haptic.loop = $scope.slider.loop;

				console.log($scope.haptic);


				Haptic.create({

					name : $scope.haptic.name,
					pattern: $scope.haptic.pattern,
					intensity: $scope.haptic.intensity,
					loop: $scope.haptic.loop,
					ownerId: $rootScope.currentUser.id
				}).$promise
					.then(function(){
						// clean
						$scope.resetStep();
						$scope.haptic = {};

						$state.go('area-clienti.haptic');
				});
			};


			$scope.addStep = function() {

				if( $scope.isFirstStep )
				{
					$scope.chart_data[0] = new Array();
					$scope.isFirstStep = false;
				}

				// Add duration to pattern
				$scope.haptic.pattern.push($scope.slider.duration);
				$scope.haptic.pattern.push($scope.slider.pause);
				$scope.haptic.intensity.push($scope.slider.intensity);
				$scope.haptic.intensity.push(0); //for pause we use intensity 0

				// How many times we add a step to the graph
				var iter = $scope.slider.duration / 125;

				for( var i = 0; i < iter; i++ )
				{
					$scope.totalDuration += 125;
					$scope.chart_data[0].push($scope.slider.intensity);
					$scope.chart_labels.push($scope.totalDuration +'ms');
				}

				var iter = $scope.slider.pause / 125;

				for( var i = 0; i < iter; i++ )
				{
					$scope.totalDuration += 125;
					$scope.chart_data[0].push(0.0);
					$scope.chart_labels.push($scope.totalDuration +'ms');
				}

				// store each step in an array  for undo
			};

			$scope.removeStep = function()
			{

			};

			$scope.resetStep = function()
			{
				// Reset all values
				$scope.slider.duration = 0;
				$scope.slider.intensity = 0;
				$scope.slider.pause = 0;
				$scope.slider.loop = 0;

				$scope.chart_labels = ["0ms"];
				$scope.chart_series = ['Pattern'];
				$scope.chart_data = [new Array()];
				$scope.chart_data[0] = [0.0];
				$scope.isFirstStep = true;
				$scope.totalDuration = 0;

				durationSlider.slider('setValue', 0);
				intensitySlider.slider('setValue', 0);
				pauseSlider.slider('setValue', 0);
			};

			var durationSlider = $('#haptic-slider-vibration-0').slider({
				id : 'haptic-slider-vibration-0',
				min : 0,
				max : 1000,
				step : 125,
				value : 0,
				orientation: 'vertical',
				formatter: function (value) {
					return value + " ms";
				},
				reversed: true,
				tooltip_position: 'left',
				tooltip : 'always'
			});

			var intensitySlider = $('#haptic-slider-intensity-0').slider({
				id : 'haptic-slider-intensity-0',
				min : 0,
				max : 1.0,
				step : 0.125,
				value : 0,
				orientation: 'vertical',
				formatter: function (value) {
					return value;
				},
				reversed: true,
				tooltip_position: 'left',
				tooltip : 'always'
			});

			var pauseSlider = $('#haptic-slider-pause-0').slider({
				id : 'haptic-slider-pause-0',
				min : 0,
				max : 1000,
				step : 125,
				value : 0,
				orientation: 'vertical',
				formatter: function (value) {
					return value + ' ms';
				},
				reversed: true,
				tooltip_position: 'left',
				tooltip : 'always'
			});

			var loopSlider = $('#haptic-slider-loop-0').slider({
				id : 'haptic-slider-loop-0',
				min : -1,
				max : 5,
				step : 1,
				value : 0,
				orientation: 'horizontal',
				formatter: function (value) {
					if( value === -1)
					{
						return 'infinito';
					}
					else if ( value === 0)
					{
						return 'no';
					}
					else
					{
						return value + ' volte';
					}
				},
				tooltip_position: 'bottom',
				tooltip : 'always'
			});

			// Attaching events callback
			durationSlider.on("slide", function(slideEvt){
				$scope.slider.duration = slideEvt.value;
			});

			intensitySlider.on("slide", function(slideEvt){
				$scope.slider.intensity = slideEvt.value;
			});

			pauseSlider.on("slide", function(slideEvt){
				$scope.slider.pause = slideEvt.value;
			});

			loopSlider.on("slide", function(slideEvt){
				$scope.slider.loop = slideEvt.value;
			});

		}])
	.controller('AllHapticsController', ['$scope', '$rootScope', 'AppUser', 'Haptic',
		function($scope, $rootScope, AppUser, Haptic){


			AppUser.haptics({ id : $rootScope.currentUser.id} ).$promise.then(function(data){
				$scope.haptics = data;
			});


			var filter = {
				where : { ownerId : {neq : $rootScope.currentUser.id } },
				include : {
					"relation" : "owner" , "scope" : {  "fields" : [ "username"]  } }// we want to add username as author
			};

			Haptic.find({filter : filter}).$promise.then(function(data){
				$scope.pubHaptics = data;
			});

}]);