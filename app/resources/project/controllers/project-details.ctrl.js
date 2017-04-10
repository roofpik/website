app.controller('projectDetailsCtrl', function($scope, $timeout, $q, imageUrl, $stateParams, $location, Config, Project, Firebase) {



  $scope.countryId = '-K_43TEI8cBodNbwlKqJ';
  $scope.cityId = '-KYJONgh0P98xoyPPYm9';
  $scope.micromarketId = $location.search().m;
  $scope.localityId = $location.search().l;
  $scope.projectId = $location.search().p;
  $scope.pros = [];
  $scope.cons = [];
  $scope.specifications = {};
  $scope.shortspecifications = {};
  $scope.allAmenities = amenities;
  $scope.amenitiesType = amenitiesType;
  $scope.reviews = [];
  $scope.reviewFilters = { userType: '', ratings: '', pagination: 1 };
  $scope.loadMoreShow = true;
  $scope.averageRating = 8.5;
  $scope.query = {};
  $scope.reviewsummary1 = {
    abcd: {
      rating: 8.5
    }
  };
  $scope.projectsummary = {};

  $scope.getReviews = function() {

    var queryString = "";
    queryString += "pkey=" + $scope.projectId;
    queryString += "&userType=" + $scope.reviewFilters.userType;
    queryString += "&ratings=" + $scope.reviewFilters.ratings;
    queryString += "&pagination=" + $scope.reviewFilters.pagination;
    Project.reviewSearch(queryString).then(function mySucces(response) {
      // $scope.loading = false;
      var items = response.data.items;
      if (items) {
        if (items.length < 10) {
          $scope.loadMoreShow = false;
        }
        $scope.reviews = $scope.reviews.concat(items);
      }
    })
  }


  function getProjects(callback) {

    Project.projectSearchKey({ 'key': $scope.projectId }).then(function mySucces(response) {
      // $scope.loading = false;
      $scope.projectsummary = response.data.items[0].data;
    })

    $scope.getReviews();
    if (callback) {
      callback();
    }
  }

  getProjects(function() {
    reviewSummary()
  });

  $scope.getDate = function(date) {
    var newDate = new Date();
    newDate.setTime(date * 1000);
    dateString = newDate.toUTCString();
    return dateString;
  }
  $scope.getNumber = function(num) {
      return new Array(num);
    }
    // getReviewSummary();

  Firebase.once('project/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/micromarket/' + $scope.micromarketId + '/locality/' + $scope.localityId + '/projects/' + $scope.projectId, function(snapshot) {
    $scope.project = snapshot.val();
    $scope.images = {};
    for (img in $scope.project.images) {
      Firebase.once('images/' + img, function(data) {
        item = data.val()
        $scope.images[item['key']] = { 'url': Config.cdn + '/image/' + item['path'] + item['imgName'] + '-m.jpg' };
        if (item['imgCat'] == 'cover') {
          // $('#cover-m').hide();
          // $('#cover-l').hide();
          // $scope.xscover = Config.cdn+'/image/' + item['path'] + item['imgName'] + '-xs.jpg';
          $scope.cover = Config.cdn + '/image/' + item['path'] + item['imgName'] + '-xs.jpg';

          $scope.coverl = Config.cdn + '/image/' + item['path'] + item['imgName'] + '-xl.jpg';

          $('#cover-l').on('load', function() {
            $('#cover-xs').addClass('hidden');
            $('#cover-l').removeClass('hidden');

          });

          $('#zoomIn').on('load', function() {
            $('#zoomIn').removeClass('hidden');
          });

        }

        $('.gallery').each(function() { // the containers for all your galleries
          $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
              enabled: true
            }
          });
        });
      });


    }


    $scope.showSpecifications = function() {

        $('#more_specifications').modal();
        $('#more_specifications').modal('open');

      }
      // Images needs to binded

    if ($scope.project.amenities) {
      generateAmenitiesList($scope.project.amenities);
    }
    if ($scope.project.units) {
      generateConfigurations($scope.project.units);
    }

    counts = 0;
    for (key in $scope.project.specifications) {

      if (counts < 2) {
        var x = camelCaseToTitleCase(key);
        $scope.specifications[x] = {};
        $scope.shortspecifications[x] = {};
        for (key1 in $scope.project.specifications[key]) {
          var y = camelCaseToTitleCase(key1);

          $scope.shortspecifications[x][y] = $scope.project.specifications[key][key1];
          $scope.specifications[x][y] = $scope.project.specifications[key][key1];

          // $scope.specifications[x][y] = $scope.project.specifications[key][key1];
        }

        counts = counts + 1;

        // console.log(key, $scope.project.specifications[key]);
      } else {
        var x = camelCaseToTitleCase(key);
        $scope.specifications[x] = {};
        for (key1 in $scope.project.specifications[key]) {
          var y = camelCaseToTitleCase(key1);

          $scope.specifications[x][y] = $scope.project.specifications[key][key1];
          // $scope.specifications[x][y] = $scope.project.specifications[key][key1];
        }

        counts = counts + 1;


      }
    }



    // console.log($scope.project.specifications);
    if ($scope.project.highlights) {
      if ($scope.project.highlights.pros) {
        $scope.pros = $scope.project.highlights.pros.split("*");
      }
      if ($scope.project.highlights.cons) {
        $scope.cons = $scope.project.highlights.cons.split("*");
      }


    }
    if ($scope.project.general.about) {
      // console.log($scope.project.general.about.length);
      if ($scope.project.general.about.length > 500) {
        $scope.project.general.about1 = $scope.project.general.about.substring(0, 500);
        $scope.project.general.about2 = $scope.project.general.about.substring(501, $scope.project.general.about.length);
      } else {
        $scope.project.general.about1 = $scope.project.general.about;
      }
    }

  })

  $scope.configurations = {};

  function generateConfigurations(config) {
    for (key in config) {

      if ($scope.configurations[config[key].bhk]) {
        if (config[key].type == $scope.configurations[config[key].bhk].type) {
          config[key].hrefLink = '#area' + config[key].area;
          $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
        } else {
          $scope.configurations[config[key].bhk + 'a'] = {
            bhk: config[key].bhk,
            type: config[key].type,
            hrefLink: '#bhk' + config[key].bhk + 'a',
            units: {}
          }
          config[key].hrefLink = '#area' + config[key].area;
          $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
        }
      } else {
        $scope.configurations[config[key].bhk] = {
          bhk: config[key].bhk,
          type: config[key].type,
          hrefLink: '#bhk' + config[key].bhk,
          units: {}
        }
        config[key].hrefLink = '#area' + config[key].area;
        $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
      }
    }
    // console.log($scope.configurations);
    var start = 0;
    var unitStart = 0;
    for (key in $scope.configurations) {
      if (start == 0) {
        $scope.configurations[key].selected = true;
        for (key1 in $scope.configurations[key].units) {
          if (unitStart == 0) {
            $scope.configurations[key].units[key1].selected = true;
            unitStart = 1;
          } else {
            $scope.configurations[key].units[key1].selected = false;
          }
        }
        start = 1;
      } else {
        $scope.configurations[key].selected = false;
        for (key1 in $scope.configurations[key].units) {
          if (unitStart == 0) {
            $scope.configurations[key].units[key1].selected = true;
            unitStart = 1;
          } else {
            $scope.configurations[key].units[key1].selected = false;
          }
        }
      }
    }
    var fconf = $scope.configurations[Object.keys($scope.configurations)[0]];
    $scope.currentconfig = fconf.bhk + fconf.type;
  }

  $scope.showConfig = function(config) {
    $scope.currentconfig = config.bhk + config.type;
  }

  $scope.currentconfig = '3apartment';

  $scope.selectConfig = function(config) {
    unitStart = 0;
    for (key in $scope.configurations) {
      if (config.hrefLink == $scope.configurations[key].hrefLink) {
        $scope.configurations[key].selected = true;
        for (key1 in $scope.configurations[key].units) {
          if (unitStart == 0) {
            $scope.configurations[key].units[key1].selected = true;
            unitStart = 1;
          } else {
            $scope.configurations[key].units[key1].selected = false;
          }
        }
      } else {
        $scope.configurations[key].selected = false;
        for (key1 in $scope.configurations[key].units) {
          $scope.configurations[key].units[key1].selected = false;
        }
      }
    }

    c

    $timeout(function() {

      $('ul.tabs').tabs();
    }, 500);
  }

  $scope.selectUnit = function(config, unit) {

    for (key in $scope.configurations) {
      if (config.hrefLink == $scope.configurations[key].hrefLink) {
        for (key1 in $scope.configurations[key].units) {
          if (unit.hrefLink == $scope.configurations[key].units[key1].hrefLink) {
            $scope.configurations[key].units[key1].selected = true;
          } else {
            $scope.configurations[key].units[key1].selected = false;
          }
        }
      }
    }
  }

  function generateAmenitiesList(amenities) {
    for (key in amenities) {
      for (key1 in amenities[key]) {
        if (amenities[key][key1] != 'NA' || amenities[key][key1] != 'No') {
          try {
            $scope.amenitiesType[key].present = true;
          } catch (err) {
            // console.log(key, key1) ;
          }
        }
      }
    }

    for (key in $scope.amenitiesType) {
      if ($scope.amenitiesType[key].present) {
        $scope.showAmenities = true;
      }
    }
    $timeout(function() {
      $('.tabam').tabs();
      $scope.displayAmenities = true;
      $('.tabam').tabs('select_tab', 'basic');
    }, 500);
  }



  $scope.submitQuery = function() {
    console.log($scope.query);
    $scope.query.projectId = $scope.projectId;
    $scope.query.projectName = $scope.project.name;
    $scope.query.cityId = $scope.cityId;
    $scope.query.micromarketId = $scope.micromarketId;
    $scope.query.localityId = $scope.localityId;
    Firebase.push('query', $scope.query).then(function() {
      swal('Query Submitted', 'Our executives will call you back', 'success');
    })
  }

  $scope.reviewFilterChange = function(mode, value) {
    var count = 0;
    if (!$scope.reviewFilters[mode]) {
      $scope.reviewFilters[mode] = value.toString();

    } else {
      filter = $scope.reviewFilters[mode].split(',');
      for (index in filter) {
        if (filter[index] == value) {
          count = count + 1
          filter.splice(index, 1);
        }
      }
      if (count == 0) {
        filter.push(value.toString())
      }
      $scope.reviewFilters[mode] = filter.join();
    }

    $scope.getReviews();
  }
  $scope.loadMore = function() {
    $scope.reviewFilters.pagination = $scope.reviewFilters.pagination + 1;
    $scope.getReviews();
  }

  function reviewSummary() {
    $scope.reviewsummaryratings = {};
    Project.ProjKeyRatings({ 'pkey': $scope.projectId }).then(function mySucces(response) {
      console.log(response.data.items[0])
      $scope.reviewsummary = response.data.items[0];
      $scope.stars = {};
      $scope.stars.full = Math.floor($scope.reviewsummary.star_rating.avg_star);

      halfstar = Math.round($scope.reviewsummary.star_rating.avg_star - $scope.stars.full);
      if (halfstar == 1) {
        $scope.stars.half = true;
      }
      $scope.stars.none = 5 - Math.floor($scope.reviewsummary.star_rating.avg_star) - halfstar;
      orsum = 0
      for (key in $scope.reviewsummary.type) {
        orsum = orsum + $scope.reviewsummary.type[key];
      }
      for (key in $scope.reviewsummary.ratings) {
        if ($scope.reviewsummary.ratings[key]) {
          $scope.reviewsummaryratings[key] = parseFloat($scope.reviewsummary.ratings[key]);
        }
      }
      oratings = [1, 2, 3, 4, 5]
      for (index in oratings) {
        if ($scope.reviewsummary.star_rating[oratings[index] + '_star']) {
          $('#prog' + oratings[index]).css('width', $scope.reviewsummary.star_rating[oratings[index] + '_star'] / orsum * 100 + '%');
        }
      }

      $scope.projectsummary.review.count = orsum
        // console.log(response.data.items[0]);

    })
  }
})
