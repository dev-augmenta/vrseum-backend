var CONTAINERS_URL = '/api/containers/';
module.exports = function (File) {

	File.upload = function (ctx, options, cb) {

		//ctx.req.params.container = options;
		if(!options) options = {};
		ctx.req.params.container = options;
		File.app.models.container.upload(ctx.req, ctx.result, options, function (err, fileObj) {
			if (err) {
				cb(err);
			} else {
				var fileInfo = fileObj.files.file[0];
				File.create({
					name: fileInfo.name,
					description : fileInfo.name,
					type: fileInfo.type,
					container: fileInfo.container,
					url: CONTAINERS_URL + fileInfo.container + '/download/' + fileInfo.name
				}, function (err, obj) {
					if (err !== null) {
						cb(err);
					} else {
						console.log("file obj creato " + JSON.stringify(obj));
						cb(null, obj);
					}
				});
			}
		});
	};

	File.remoteMethod(
		'upload',
		{
			description: 'Uploads a file',
			accepts: [
				{arg: 'ctx', type: 'object', http: {source: 'context'}},
				{arg: 'options', type: 'string', http: {source: 'query'}}
			],
			returns: {
				arg: 'fileObject', type: 'object', root: true
			},
			http: {verb: 'post'}
		}
		);

	};