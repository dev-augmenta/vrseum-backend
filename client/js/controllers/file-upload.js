angular
	.module('app')

	.controller('FilesUploaderController', ['$scope', '$rootScope', 'FileUploader',
		function ($scope, $rootScope, FileUploader) {

			var uploader = $scope.uploader = new FileUploader({
				scope: $scope, // to automatically update the html. Default: $rootScope
				//url: '/api/containers/'+$scope.currentUser.folder+'/upload',
				url: '/api/files/upload?options=' + $scope.currentUser.folder,
				//url: '/api/files/upload',
				removeAfterUpload: true,
				data: {
					elPerro: 'laFormica'
				}


			});

			// ADDING FILTERS
			/*uploader.filters.push({
			 name: 'filterName',
			 fn: function (item, options) { // second user filter
			 console.info('filter2');
			 return true;
			 }
			 });*/


			uploader.filters.push({
				name: 'imageFilter',
				fn: function (item /*{File|FileLikeObject}*/, options) {
					var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
					return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
				}
			});

			// REGISTER HANDLERS
			// --------------------
			uploader.onAfterAddingFile = function (item) {
				console.info('After adding a file', item);

				item.formData.push({folder: $scope.currentUser.folder});
			};
			// --------------------
			uploader.onAfterAddingAll = function (items) {
				console.info('After adding all files', items);
			};
			// --------------------
			uploader.onWhenAddingFileFailed = function (item, filter, options) {
				console.info('When adding a file failed', item);
			};
			// --------------------
			uploader.onBeforeUploadItem = function (item) {
				console.info('Before upload', item);
				item.formData.push({laPutaCarpeta: $scope.currentUser.folder});
			};
			// --------------------
			uploader.onProgressItem = function (item, progress) {
				console.info('Progress: ' + progress, item);
			};
			// --------------------
			uploader.onProgressAll = function (progress) {
				console.info('Total progress: ' + progress);
			};
			// --------------------
			uploader.onSuccessItem = function (item, response, status, headers) {
				console.info('Success', response, status, headers);
				$scope.$broadcast('uploadCompleted', item);
			};
			// --------------------
			uploader.onErrorItem = function (item, response, status, headers) {
				console.info('Error', response, status, headers);
			};
			// --------------------
			uploader.onCancelItem = function (item, response, status, headers) {
				console.info('Cancel', response, status);
			};
			// --------------------
			uploader.onCompleteItem = function (item, response, status, headers) {
				console.info('Complete', response, status, headers);
			};
			// --------------------
			uploader.onCompleteAll = function () {
				console.info('Complete all');
				// remove uploaded file from queue
			};
			// --------------------
		}])
	.controller('FilesController', ['$scope', '$http', function ($scope, $http) {

			$scope.load = function () {
				$http.get('/api/containers/' + $scope.currentUser.folder + '/files').success(function (data) {
					// console.log(data);
					$scope.files = data;
				});
			};

			$scope.delete = function (index, id) {
				$http.delete('/api/containers/' + $scope.currentUser.folder + '/files/' + encodeURIComponent(id)).success(function (data, status, headers) {
					$scope.files.splice(index, 1);
				});
			};

			$scope.$on('uploadCompleted', function (event) {
				console.log('uploadCompleted event received');
				$scope.load(); //refresh the file list

			});
		}])
	.directive('ngThumb', ['$window', function ($window) {
			console.log("inside ngthumb directive");
			var helper = {
				support: !!($window.FileReader && $window.CanvasRenderingContext2D),
				isFile: function (item) {
					return angular.isObject(item) && item instanceof $window.File;
				},
				isImage: function (file) {
					var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
					return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
				}
			};

			return {
				restrict: 'A',
				template: '<canvas/>',
				link: function (scope, element, attributes) {
					if (!helper.support)
						return;

					//console.log(params.files);
					var params = scope.$eval(attributes.ngThumb);

					//if (!helper.isFile(params.file))
					//	return;
					//if (!helper.isImage(params.file))
					//	return;

					var canvas = element.find('canvas');
					var reader = new FileReader();

					reader.onload = onLoadFile;
					reader.readAsDataURL(params.file);

					function onLoadFile(event) {
						var img = new Image();
						img.onload = onLoadImage;
						img.src = event.target.result;
					}

					function onLoadImage() {
						var width = params.width || this.width / this.height * params.height;
						var height = params.height || this.height / this.width * params.width;
						canvas.attr({width: width, height: height});
						canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
					}
				}
			};
		}]);
