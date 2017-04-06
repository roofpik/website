app.controller('listingCtrl', function($scope, $rootScope, $timeout, $stateParams, $http, $state, $location, $window, Project, Firebase) {
  $('html,body').scrollTop(0);
  $('.button-collapse1').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });



  $scope.initialize_data = function() {


    getLocations(function() {
      getLocalities(function() {
        getBuilders(function() {
          $scope.data = {
            loc: '',
            micro: '',
            ptype: '',
            bhk: '',
            rmin: '',
            rmax: '',
            builder: '',
            category: ''
          };
          $scope.selected = {};
          for (key in $location.search()) {
            if ($location.search()[key]) {
              if (key == 'rmin' || key == 'rmax') {
                $scope.data[key] = parseInt($location.search()[key]);
              } else {
                $scope.data[key] = $location.search()[key];
              }

            }
          }

          for (key in $scope.data) {
            if ($scope.data[key]) {
              l = $scope.data[key].toString().split(',')
              $scope.selected[key] = {}
              for (i in l) {
                $scope.selected[key][l[i]] = true;
                if (key === 'loc') {
                  $scope.selectedLocations = $scope.locations.filter($scope.idFilter.bind(null, l[i]));
                  if ($scope.selectedLocations && $scope.selectedLocations.length > 0) {
                    $scope.selectedLocations[0].selected = true;
                    $scope.sort($scope.locations, function() {
                      $scope.selectedLocations = jQuery.extend(true, [], $scope.locations.filter($scope.selectedFilter.bind(null, true)));
                      if ($scope.selectedLocations.length > $scope.limit) {
                        $scope.listLimitLoc = $scope.selectedLocations.length;
                      } else {
                        $scope.listLimitLoc = $scope.limit;
                      }
                    });
                  }
                } else if (key === 'builder') {
                  $scope.selectedBuilders = $scope.builders.filter($scope.idFilter.bind(null, l[i]));
                  if ($scope.selectedBuilders && $scope.selectedBuilders.length > 0) {
                    $scope.selectedBuilders[0].selected = true;
                    $scope.sort($scope.builders, function() {
                      $scope.selectedBuilders = jQuery.extend(true, [], $scope.builders.filter($scope.selectedFilter.bind(null, true)));
                      if ($scope.selectedBuilders.length > $scope.limit) {
                        $scope.listLimitBuilder = $scope.selectedBuilders.length;
                      } else {
                        $scope.listLimitBuilder = $scope.limit;
                      }
                    });
                  }
                } else if (key === 'micro') {
                  $scope.selectedMicros = $scope.micromarkets.filter($scope.idFilter.bind(null, l[i]));
                  if ($scope.selectedMicros && $scope.selectedMicros.length > 0) {
                    $scope.selectedMicros[0].selected = true;
                    $scope.sort($scope.micromarkets, function() {
                      $scope.selectedMicros = jQuery.extend(true, [], $scope.micromarkets.filter($scope.selectedFilter.bind(null, true)));
                      if ($scope.selectedMicros.length > $scope.limit) {
                        $scope.listLimitMicro = $scope.selectedMicros.length;
                      } else {
                        $scope.listLimitMicro = $scope.limit;
                      }
                    });
                  }
                }
              }
            }
          }
          $scope.closeFilter();
          getProjects();

        });
      });
    });

    function getLocations(callback) {
      Firebase.once('locations/country/-K_43TEI8cBodNbwlKqJ/locality/city/-KYJONgh0P98xoyPPYm9/micromarket', function(snapshot) {
        $timeout(function() {
          for (key in snapshot.val()) {
            for (key1 in snapshot.val()[key].places) {
              $scope.locations.push(snapshot.val()[key].places[key1]);
            }
          }
          if (callback)
            callback();
        }, 0)
      })
    }

    function getLocalities(callback) {
      Firebase.once('locations/country/-K_43TEI8cBodNbwlKqJ/micromarket/city/-KYJONgh0P98xoyPPYm9/places', function(snapshot) {
        $timeout(function() {
          for (key in snapshot.val()) {
            $scope.micromarkets.push(snapshot.val()[key]);
          }
          if (callback)
            callback();
        }, 0)
      })
    }

    function getBuilders(callback) {
      Firebase.once('builder', function(snapshot) {
        $timeout(function() {
          for (key in snapshot.val()) {
            $scope.builders.push(snapshot.val()[key]);
          }
          if (callback)
            callback();
        }, 0);
      })
    }


  }
  $timeout(function() {

    var slider = document.getElementById('price');
    var slider2 = document.getElementById('price2');

    if ($location.search().rmin) {
      rstart = $location.search().rmin
    } else {
      rstart = 0
    }
    if ($location.search().rmax) {
      rend = $location.search().rmax
    } else {
      rend = 200000
    }

    noUiSlider.create(slider, {
      start: [rstart, rend],
      tooltips: true,
      connect: true,
      step: 5000,
      range: {
        'min': 5000,
        'max': 200000
      }
    });

    slider.noUiSlider.on('change', function() {
      val = slider.noUiSlider.get();

      var inputMin = $('#minP');
      inputMin.val(parseFloat(val[0], 10));
      inputMin.trigger('input');

      var inputMax = $('#maxP');
      inputMax.val(parseFloat(val[1], 10));
      inputMax.trigger('input');

    });


    noUiSlider.create(slider2, {
      start: [rstart, rend],
      tooltips: true,
      connect: true,
      step: 5000,
      range: {
        'min': 5000,
        'max': 200000
      }
    });

    slider2.noUiSlider.on('change', function() {
      val = slider2.noUiSlider.get();

      var inputMin = $('#minP');
      inputMin.val(parseFloat(val[0], 10));
      inputMin.trigger('input');

      var inputMax = $('#maxP');
      inputMax.val(parseFloat(val[1], 10));
      inputMax.trigger('input');

    });

    $('.modal').modal();

  }, 500)





  $scope.moreFilters = function(type) {
    $scope.modelType = type;
    $scope.moreFiltersObj = {};
    $scope.moreFiltersObj[type] = true;
    $('#additional_filters').modal('open');
  }

  $scope.sort = function(data, callback) {
    if (data) {
      data.sort(function(a, b) {
        if (!a.selected) {
          a.selected = false;
        }
        if (!b.selected) {
          b.selected = false;
        }
        return (a.selected === b.selected) ? 0 : a.selected ? -1 : 1;
      });
      if (callback) {
        callback();
      }
    }
  }
  $scope.closeFilter = function() {
    $scope.moreFiltersObj = {};
    if ($scope.modelType === 'loc') {
      $scope.sort($scope.locations, function() {
        $scope.selectedLocations = jQuery.extend(true, [], $scope.locations.filter($scope.selectedFilter.bind(null, true)));
        if ($scope.selectedLocations.length > $scope.limit) {
          $scope.listLimitLoc = $scope.selectedLocations.length;
        } else {
          $scope.listLimitLoc = $scope.limit;
        }
      });
    } else if ($scope.modelType === 'builder') {
      $scope.sort($scope.builders, function() {
        $scope.selectedBuilders = jQuery.extend(true, [], $scope.builders.filter($scope.selectedFilter.bind(null, true)));
        if ($scope.selectedBuilders.length > $scope.limit) {
          $scope.listLimitBuilder = $scope.selectedBuilders.length;
        } else {
          $scope.listLimitBuilder = $scope.limit;
        }
      });
    } else if ($scope.modelType === 'micro') {
      $scope.sort($scope.micromarkets, function() {
        $scope.selectedMicros = jQuery.extend(true, [], $scope.micromarkets.filter($scope.selectedFilter.bind(null, true)));
        if ($scope.selectedMicros.length > $scope.limit) {
          $scope.listLimitMicro = $scope.selectedMicros.length;
        } else {
          $scope.listLimitMicro = $scope.limit;
        }
      });
    }
    $('#additional_filters').modal('close');
  }

  $scope.minChange = function() {
    consFilter();
    // getProjects();
  }
  $scope.maxChange = function() {
    var f = consFilter();
    // getProjects();
  }



  function consFilter() {
    $('.fd-load').addClass('blur');

    // $scope.loading = true;
    fil = ''
    for (key in $scope.data) {
      if ($scope.data[key]) {
        if (fil == '') {
          fil = '?' + key + '=' + $scope.data[key];
        } else {
          fil = fil + '&' + key + '=' + $scope.data[key];
        }
        if ($scope.selected[key]) {
          $scope.selected[key][$scope.data[key]] = true;
        } else {
          $scope.selected[key] = {}
          $scope.selected[key][$scope.data[key]] = true;
        }
      }
    }

    if (history.pushState) {
      var newurl = window.location.href.split('?')[0] + fil;

      window.history.pushState({ path: newurl }, '', newurl);
    }

    getProjects();

  }



  function getProjects() {

    Project.projectFilter($scope.data).then(function mySucces(response) {
      // $scope.loading = false;
      $('.fd-load').removeClass('blur');
      $scope.projects = response.data.items;
      $timeout(function() {
        // $('input#date').characterCounter();
      }, 1000)

    })

  }

  $scope.visit = {};
  $scope.listLimitLoc = 6;
  $scope.listLimitBuilder = 6;
  $scope.listLimitMicro = 6;
  $scope.limit = 6;
  $scope.visitDate = function() {
    console.log($scope.visit.date);
  }




  $scope.addFilter = function(id, type, model) {
    var count = 0;
    if (!$scope.data[type]) {
      $scope.data[type] = id.toString();

    } else {
      filter = $scope.data[type].split(',');
      for (index in filter) {
        if (filter[index] == id) {
          count = count + 1
          filter.splice(index, 1);
        }
      }
      if (count == 0) {
        filter.push(id.toString())
      }
      $scope.data[type] = filter.join();
    }
    if (type === 'loc') {
      var location = $scope.locations.filter($scope.idFilter.bind(null, id));
      if (location && location.length > 0) {
        location[0].selected = $scope.selected.loc[id];
      }
      if (!model) {
        $scope.sort($scope.locations, function() {
          $scope.selectedLocations = jQuery.extend(true, [], $scope.locations.filter($scope.selectedFilter.bind(null, true)));
          if ($scope.selectedLocations.length > $scope.limit) {
            $scope.listLimitLoc = $scope.selectedLocations.length;
          } else {
            $scope.listLimitLoc = $scope.limit;
          }
        });
      }
    } else if (type === 'builder') {
      var builder = $scope.builders.filter($scope.idFilter.bind(null, id));
      if (builder && builder.length > 0) {
        builder[0].selected = $scope.selected.builder[id];
      }
      if (!model) {
        $scope.sort($scope.builders, function() {
          $scope.selectedBuilders = jQuery.extend(true, [], $scope.builders.filter($scope.selectedFilter.bind(null, true)));
          if ($scope.selectedBuilders.length > $scope.limit) {
            $scope.listLimitBuilder = $scope.selectedBuilders.length;
          } else {
            $scope.listLimitBuilder = $scope.limit;
          }
        });
      }
    } else if (type === 'micro') {
      var micro = $scope.micromarkets.filter($scope.idFilter.bind(null, id));
      if (micro && micro.length > 0) {
        micro[0].selected = $scope.selected.micro[id];
      }
      if (!model) {
        $scope.sort($scope.micromarkets, function() {
          $scope.selectedMicros = jQuery.extend(true, [], $scope.micromarkets.filter($scope.selectedFilter.bind(null, true)));
          if ($scope.selectedMicros.length > $scope.limit) {
            $scope.listLimitMicro = $scope.selectedMicros.length;
          } else {
            $scope.listLimitMicro = $scope.limit;
          }
        });
      }
    }
    consFilter();
  }

  $scope.idFilter = function(id, value, index, array) {
    return value.key == id;
  }
  $scope.selectedFilter = function(selected, value, index, array) {
    return value.selected == selected;
  }

  $scope.categories = [
    { name: 'Best Amenities', id: 'bestAmenities' },
    { name: 'Luxury', id: 'luxury' },
    { name: 'Affordable', id: 'affordable' },
    { name: 'Ultra Luxury', id: 'ultraLuxury' },
    { name: 'Pet Friendly', id: 'petFriendly' },
    { name: 'Downtown', id: 'downtown' },
    { name: 'Bachelors', id: 'bachelors' },
    { name: 'Senior Living', id: 'seniorLiving' }
  ];


  $scope.propertyTypes = [
    { name: 'Apartments', id: 'apartment' },
    { name: 'Villas', id: 'villa' },
    { name: 'Penthouse', id: 'penthouse' },
    { name: 'Row House', id: 'rowhouse' }
  ];


  $scope.micromarkets = [];
  $scope.locations = [];
  $scope.builders = [];


  $scope.scheduleVisit = function(proj) {
    $scope.visit.project = {};
    $scope.visit.project.key = proj.key;
    $scope.visit.project.location = proj.location;
    $scope.visit.project.location = proj.location;
    $scope.visit.project.name = proj.name;
  }

  $scope.submitQuery = function() {
    updates = {}
    var newPostKey = firebase.database().ref().child('openQuery').push().key;
    $scope.visit.created = new Date().getTime();
    $scope.visit.status = 'submitted';

    updates['/openQuery/country/-K_43TEI8cBodNbwlKqJ/city/-KYJONgh0P98xoyPPYm9/query/' + newPostKey] = $scope.visit;
    Firebase.update(updates).then(function() {
      Materialize.toast('You have successfully submit details!', 3000, 'rounded');
    })
  }

  $scope.writeReview = function(proj) {
    $state.go('write-review', { 'key': proj.key, 'name': proj.name, 'type': 'residential' })
  }



  function tspaces(val) {
    return val.replace(/\s+/g, '-').toLowerCase()

  }

  $scope.showProjDetails = function(item) {
    $window.location.href = '#/rent/property/2017/gurgaon/residential/' + tspaces(item.location.microname) + '/' + tspaces(item.location.locname) + '/' +
      tspaces(item.builder) + '/' + tspaces(item.name) +
      '-project?l=' + item.location.lockey + '&m=' + item.location.microkey + '&p=' + item.key;
    // sohna-road/sector-47/builder-unitech/unitech-uniworld-gardens-1-projectmb?l=-KfRBpXGseQp9wlIZ97e&m=-KfM5tQ-UKt6DtrWtzeE&p=-KYMv8uRJQMpqBa-I-hn"
  }

})
