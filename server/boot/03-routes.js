module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });

  app.get('/datosgui', function(req, res){

	  var fakeData =  {"name":"Example User Data",
		  "BaseUrl":"https://s3.eu-central-1.amazonaws.com/vrseum-erik-56a7aa734cb5d3b2647ae2a8/",
		  "listAssets":[
						{"ID_obj":"obj_0","Name":"Picasso","Description":"Picasso vede la bellezza nelle donne spigolose","imgTbnImg":"picasso_thumb.jpg","imgPicture":"picasso.jpg","OBJ_URL":"","OBJ_Name":""},
						{"ID_obj":"obj_1","Name":"Giocatori di Carte","Description":"Famoso quadro di una partita infinita","imgTbnImg":"giocatori_di_carte_thumb.jpg","imgPicture":"giocatori_di_carte.jpg","OBJ_URL":"","OBJ_Name":""},
						{"ID_obj":"obj_2","Name":"Skull","Description":"Il teschio di shakespeare","imgTbnImg":"skull_thumb.jpg","imgPicture":"skull.jpg","OBJ_URL":"","OBJ_Name":"skull.obj"}

					]
	  };

	  res.send(fakeData);

  });



};
