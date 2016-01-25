/*var async = require('async');

module.exports = function(app) {
  // data sources
  var mongolab = app.dataSources.mongolab;
  var mysqlDs = app.dataSources.mysqlDs;

  // create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops)
  }, function(err, results) {
    if (err) throw err;

    createReviews(results.reviewers, results.coffeeShops, function(err) {
      if (err) throw err;
      console.log('> models created successfully');
    });
  });

  // create reviewers
  function createReviewers(cb) {
    mongolab.automigrate('AppUser', function(err) {
      if (err) return cb(err);

      app.models.AppUser.create([
        {email: 'foo@bar.com', password: 'foobar'},
        {email: 'john@doe.com', password: 'johndoe'},
        {email: 'jane@doe.com', password: 'janedoe'}
      ], cb);
    });
  }

  // create coffee shops
  function createCoffeeShops(cb) {
    mongolab.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err);

      app.models.CoffeeShop.create([
        {name: 'Bel Cafe', city: 'Vancouver'},
        {name: 'Three Bees Coffee House', city: 'San Mateo'},
        {name: 'Caffe Artigiano', city: 'Vancouver'}
      ], cb);
    });
  }

  // create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    mongolab.automigrate('Review', function(err) {
      if (err) return cb(err);

      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

      app.models.Review.create([
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 4),
          rating: 5,
          comments: 'A very good coffee shop.',
          publisherId: reviewers[0].id,
          coffeeShopId: coffeeShops[0].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
          rating: 5,
          comments: 'Quite pleasant.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[0].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
          rating: 4,
          comments: 'It was ok.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[1].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 4,
          comments: 'I go here everyday.',
          publisherId: reviewers[2].id,
          coffeeShopId: coffeeShops[2].id
        }
      ], cb);
    });
  }
};*/
