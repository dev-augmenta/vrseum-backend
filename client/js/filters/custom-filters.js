angular.module('customFilters', ['ngSanitize'])
	.filter('boolconverter', function(){
		return function(input){
			return input ? '<i class="fa fa-check fa-pull-right green"></i>' :  '<i class="fa fa-ban fa-pull-right red"></i>';
		};
});
