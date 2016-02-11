module.exports = function(Museum) {

	/*Museum.on('dataSourceAttached', function(obj){

		var find = Museum.find;

		Museum.find = function(filter, cb){
			console.log('Start custom method');

			find(filter, function(error, instances){
				for( var i in instances )
				{
					console.log(i);
				}
			});



			console.log('Returning Values');
			return find.apply(this, arguments);

		};
	});*/

	Museum.observe('after save', function createMuseumDefaultLayout(ctx, next){

		if( ctx.isNewInstance )
		{
			var layout = Museum.app.models.MuseumLayout;
			layout.create({museumId : ctx.instance.id}, function(error, layoutInstance){
				if( layoutInstance && !error )
				{
					console.log("Create new layout with id: " + layoutInstance.id + " for museum with id " + ctx.instance.id );
				}
			});
		}

		next();
	});


	Museum.observe('before delete', function deleteMuseumLayout(ctx, next){

		console.log('About to delete museum with id: ' + ctx.where.id);

		Museum.findById(ctx.where.id, function(err, model) {

			model.layout.destroy(function(error){
				if( !error )
					{
						console.log('Layout for museum with id: '+ model.id + ' deleted');
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


