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



};


