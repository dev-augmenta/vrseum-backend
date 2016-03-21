var path = require('path');
var _ = require('underscore');

module.exports = function(AppUser) {

	// GET ALL FILES OF THIS USER
	AppUser.files = function( id, cb ){
		AppUser.findById( id, function(error, instance){
			var response = instance.folder;

			var ds = AppUser.app.dataSources.storage;
			var container = ds.createModel('container');
			container.getFiles(instance.folder, null, function(error, data){
				var response = data;
				cb(null, response);
			});
		});
	};

	AppUser.remoteMethod(
		'files',
		{
			description : 'Queries files of AppUser',
			accepts :[ { arg: 'id', description: 'Model id', type: 'string', required : true}],
			http : { path : '/:id/files', verb : 'get'},
			returns : { arg: 'data', type : 'string'}
		}
	);

	// GET ALL RESOURCE TO SHOW IN UNITY
	AppUser.guidata = function( id, cb ){
		// Read user info
		AppUser.findById( id, function(error, instance){
			var baseUrl = "https://vrseum-backend.herokuapp.com/api/containers/" +

				instance.folder +
				"/download/";

			var response = {
				name : "Resources for user with id " + id,
				BaseUrl : baseUrl,
				listAssets : [],
				listHaptics : []
			};

				AppUser.files( id, function(error, data){

					// Add to response the assets list
					_.each(data, function(element, index, list){

						// check file extension and type
						var fileName = path.parse(element.name).name;
						var fileExtension = path.parse(element.name).ext;

						if( fileExtension === ".png" ||
							fileExtension === ".jpg" ||
							fileExtension === ".jpeg" )
						{
							var imgTbnImg = encodeURI(element.name);
							var imgPicture = encodeURI(element.name);
							var objUrl = "";
							var objName = "";


							response.listAssets.push({
							ID_obj : "obj_" + index,
							Name : fileName,
							Description : fileName,
							imgTbnImg : imgTbnImg,
							imgPicture : imgPicture,
							OBJ_URL : "",
							OBJ_Name : ""

							});
						}
						else if ( fileExtension === ".obj")
						{
							var imgTbnImg = encodeURI(element.name);
							var imgPicture = fileName + ".jpg";
							var objUrl = "";
							var objName = element.name;


							response.listAssets.push({
							ID_obj : "obj_" + index,
							Name : fileName,
							Description : fileName,
							imgTbnImg : fileName + '.jpg',
							imgPicture : "",
							OBJ_URL : "",
							OBJ_Name : objName
						});
						}
						else
						{
							// do not process file
						}
					}); // ...end of _.each



						instance.haptics(null , function(error, haptics ){

							response.listHaptics = haptics;
							cb(null, response);
						});

				});

			});
	};

	AppUser.remoteMethod(
		'guidata',
		{
			description : 'Queries resource to build the museum with in unity',
			accepts :[ { arg: 'id', description: 'Model (AppUser) id', type: 'string', required : true}],
			http : { path : '/:id/guidata', verb : 'get'},
			returns : { type : 'object' , root: true}
		}
	);

	/* OPERATION HOOKS */
	// AFTER SAVE
	// Hook executed after user creation
	// Create a user container (bucket) for his museum files
	// TODO: link instances
	AppUser.observe('after save', function createUserContainer(ctx, next){

		if( ctx.isNewInstance )
		{
			//Replace spaces with '_' undersores to avoid name problems
			var uName = ctx.instance.username.split(" ").join("-").toLowerCase();
			var containerName = 'vrseum-'+uName+'-'+ctx.instance.id.toString();
			console.log('Container Name will be '+ uName);
			console.log('New AppUser created  ' + JSON.stringify(ctx, null, 2));

			// Create new datasource for user file container
			var ds = ctx.Model.app.dataSources.storage;
			var container = ds.createModel('container');
			container.createContainer({name : containerName}, function(error, folder){

				if( !error )
				{
					AppUser.findById( ctx.instance.id, function(error, dbInstance){
							if( dbInstance && !error)
							{
								dbInstance.updateAttributes({ folder : containerName }, function(err, inst){
								if( err ) return done(err);
							});
						}
					});

					console.log('New user container created with name ' + containerName);
				}
				else
				{
					console.log(error);
				}

			});
		}

		next();
	});

	// AFTER DELETE
	// Hook executed after user deletion
	// Remove the user container (bucket) and all his files
	// TODO: delete museum instances and containers
	AppUser.observe('before delete', function deleteUserContainer(ctx, next){


			console.log('About to delete user with id: ' + ctx.where.id);

			AppUser.findById(ctx.where.id, function(err, model) {

				var ds = ctx.Model.app.dataSources.storage;
				var container = ds.createModel('container');

				// TODO : Also delete every museum, museumlayout of this user

				console.log('Container that will be deleted ' + model.folder);


				container.destroyContainer(model.folder, function(error, userContainer){

					if( !error )
					{
						console.log('Container deleted');
					}
					else
					{
						console.log(error);
					}

					next();
				});
			});
		});

};
