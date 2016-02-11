angular
	.module('app')
	.controller('AddMuseumController', ['$scope', '$rootScope', 'AppUser', 'Museum', '$state', 'FileUploader',
		function ($scope, $rootScope, AppUser, Museum, $state, FileUploader) {

			$scope.museum = {};

			var uploader = $scope.uploader = new FileUploader({
				queueLimit : 1,
				scope : $scope,
				removeAfterUpload : true,
				url : '/api/files/upload?options='+ $scope.currentUser.folder
			});

			/*uploader.filters.push({
				name : 'customQueueLimit',
				fn : function (item, options){
					return this.queue.length < 1;
				}
			});*/

			// REGISTER HANDLERS
			// --------------------
			uploader.onAfterAddingFile = function (item) {
				console.info('After adding a file', item);
				$('#thumbFileDropper').removeClass('error');
				$scope.museum.thumbnail = uploader.queue[0].file.name;
			};
			uploader.onCancelItem = function (item, response, status, headers) {
				console.info('Cancel', response, status);
			};
			uploader.onCompleteItem = function (item, response, status, headers) {
				console.info('Complete', response, status, headers);
			};


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

			// When file uploaded, we can create the museum
			uploader.onCompleteItem = function (item, response, status, headers) {
				console.log(item);

				if ($scope.museum.isOpen === null)
				{
					$scope.museum.isOpen = false;
				}

				Museum.create({
					name: $scope.museum.name,
					description: $scope.museum.description,
					thumbnail: '/api/containers/' + $scope.currentUser.folder + '/download/' + item.file.name,
					isOpen: $scope.museum.isOpen,
					ownerId: $rootScope.currentUser.id
				})
					.$promise
					.then(function () {
						$state.go('area-clienti.miei-musei');
					});


			};

			$scope.checkUploadQueueLength = function(){
				if( uploader.queue.length > 0 ) return false;
				return true;
			};

			$scope.create = function () {
				// check if upload queue is empty
				if( uploader.queue.length === 0)
				{
					$('#thumbFileDropper').addClass('error');
					console.log("create failed");
					return;
				}

				// Start uploading file
				// Use promises...?
				uploader.uploadItem(0);


				// Verify why if not checked is null instead of false
				/*if ($scope.museum.isOpen === null)
				{
					$scope.museum.isOpen = false;
				}
				if ($scope.museum.thumbnail === null)
				{
					$scope.museum.thumbnail = 'img/museums/thumbs/museo-00.png';
				}
				Museum.create({
					name: $scope.museum.name,
					description: $scope.museum.description,
					//thumbnail : $scope.museum.thumbnail,
					thumbnail: 'img/museums/thumbs/museo-00.png',
					isOpen: $scope.museum.isOpen,
					ownerId: $rootScope.currentUser.id
				})
					.$promise
					.then(function () {
						$state.go('area-clienti.miei-musei');
					});*/
			};
		}])
	.controller('MyMuseumsController', ['$scope', '$rootScope', 'AppUser',
		function ($scope, $rootScope, AppUser) {

			$scope.museums = AppUser.museums({
				accessToken: $rootScope.currentUser.tokenId,
				id: $rootScope.currentUser.id

			});

		}])
		.controller('DeleteMuseumController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'AppUser', 'Museum',
	function( $scope, $rootScope, $q, $state, $stateParams, AppUser, Museum){

		Museum.deleteById({ id : $stateParams.id })
			.$promise
			.then(function(){
				$state.go('area-clienti.miei-musei');
		});

	}])
	.controller('AllMuseumsController', ['$scope', 'Museum',
		function ($scope, Museum) {
			var filter = {
				where: {isOpen: true},
				include: ['owner'] // we want to add username as author
			};
			Museum.find({filter: filter}).$promise.then(function (data) {

				for (var i = 0; i < data.length; i++)
				{
					if (data[i].owner && data[i].owner.username)
					{
						data[i].author = data[i].owner.username;
						// eliminate sensibles data
						data[i].owner = null;
					} else
					{
						// remove museums wihtout an owner
						data[i] = null;
					}
				}
				// return values
				$scope.museums = data;
			});
		}])
	.controller('EditMuseumController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'Museum',
		function ($scope, $rootScope, $q, $state, $stateParams, Museum) {

			$scope.museum = {};

			$q.all([
				Museum.findById({ id: $stateParams.id}).$promise
			])
				.then(function(data){

					console.log(data[0]);
					$scope.museum = data[0];

			});

			$scope.submitForm = function()
			{
				$scope.museum
					.$save()
					.then(function(museum){
						$state.go('area-clienti.miei-musei');
				});
			};

		}]);
