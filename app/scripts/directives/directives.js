app.directive('loading', function() {
  return {
    restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
    replace: false, // This is one of the cool things :). Will be explained in post.
    templateUrl: "resources/general/views/loading.html"
  }
});

app.directive('header', function() {
  return {
    restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
    replace: false, // This is one of the cool things :). Will be explained in post.
    templateUrl: "resources/general/views/header.html",
    controller: 'headerCtrl'
  }
});

app.directive('footer', function() {
  return {
    restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
    replace: false,
    scope: { user: '=?' }, // This is one of the cool things :). Will be explained in post
    templateUrl: "resources/general/views/footer.html"
      // controller: 'footerCtrl'
  }
});

app.directive('login', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: "resources/general/views/login.html",
    controller: 'loginCtrl'
  }
});


app.directive('reviewRatings', reviewRatings);

function reviewRatings() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div class="text-center review_ratings">' +
      '<span ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-if="rating < 1" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
      '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-if="rating > 0" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
      '<span ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-if="rating < 2" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
      '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-if="rating > 1" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
      '<span ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-if="rating < 3" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
      '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-if="rating > 2" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
      '<span ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-if="rating < 4" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
      '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-if="rating > 3" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
      '<span ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-if="rating < 5" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
      '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-if="rating > 4" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
      '</div>',
    scope: {
      ratingsObj: '=ratingsobj',
      index: '=index'
    },
    link: function(scope, element, attrs) {

      //Setting the default values, if they are not passed
      scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(43, 187, 173)';
      scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(140, 140, 140)';
      scope.rating = scope.ratingsObj.rating || 0;
      scope.minRating = scope.ratingsObj.minRating || 0;
      scope.readOnly = scope.ratingsObj.readOnly || false;
      scope.index = scope.index || 0;

      //Setting the color for the icon, when it is active
      scope.iconOnColor = {
        color: scope.iconOnColor
      };

      //Setting the color for the icon, when it is not active
      scope.iconOffColor = {
        color: scope.iconOffColor
      };

      //Setting the rating
      scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

      //Setting the previously selected rating
      scope.prevRating = 0;

      scope.$watch('ratingsObj.rating', function(newValue, oldValue) {
        setRating(newValue);
      });

      function setRating(val, uiEvent) {
        if (scope.minRating !== 0 && val < scope.minRating) {
          scope.rating = scope.minRating;
        } else {
          scope.rating = val;
        }
        scope.prevRating = val;
        if (uiEvent) scope.ratingsObj.callback(scope.rating, scope.index);
      }


      //Called when he user clicks on the rating
      scope.ratingsClicked = function(val) {
        setRating(val, true);
      };

      scope.ratingsUnClicked = function(val) {
        if (scope.minRating !== 0 && val < scope.minRating) {
          scope.rating = scope.minRating;
        } else {
          scope.rating = val;
        }
        if (scope.prevRating == val) {
          if (scope.minRating !== 0) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = 0;
          }
        }
        scope.prevRating = val;
        scope.ratingsObj.callback(scope.rating, scope.index);
      };
    }
  };
}

app.directive('averageStarRating', averageStarRating);

function averageStarRating() {
  return {
    restrict: "EA",
    template: "<span ng-repeat='star in stars'>" +
      "      <i ng-if='star.full==true' class='material-icons green-text'>star</i>" + //&#9733
      "      <i ng-if='star.half==true' class='material-icons green-text'>star_half</i>" + //&#9733
      "      <i ng-if='star.empty==true' class='material-icons grey-text'>star_border</i>" + //&#9733
      "</span>",
    scope: {
      averageRatingValue: "=ngModel",
      max: "=?", //optional: default is 5
    },
    link: function(scope, elem, attrs) {
      if (scope.max == undefined) { scope.max = 5; }

      function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
      }

      function updateStars() {
        // console.log(scope.averageRatingValue);
        if (scope.averageRatingValue > scope.max) {
          scope.averageRatingValue = scope.max;
        }
        scope.isHalf = isFloat(scope.averageRatingValue);
        scope.value = Math.floor(scope.averageRatingValue);
        scope.stars = [];
        for (var i = 0; i < scope.value; i++) {
          scope.stars.push({ full: true, empty: false, half: false });
        }
        if (scope.isHalf) {
          scope.stars.push({ full: false, empty: false, half: true });
        }
        if (scope.isHalf) {
          for (var i = scope.stars.length; i < scope.max; i++) {
            scope.stars.push({ full: false, empty: true, half: false });
          }
        }
        for (var i = scope.stars.length; i < scope.max; i++) {
          scope.stars.push({ full: false, empty: true, half: false });

        }
      };
      scope.$watch("averageRatingValue", function(oldVal, newVal) {
        // if (newVal) {
        updateStars();
        // console.log(oldVal + ' ' + newVal);

        // }
      });
    }
  };
};

function deleteLocalStorage(name) {
  localStorage.removeItem(name);
}

function checkLocalStorage(name) {
  if (localStorage.getItem(name) === null) {
    return false;
  } else {
    return true;
  }
}

function camelCaseToTitleCase(camelCase) {
  if (camelCase == null || camelCase == "") {
    return camelCase;
  }

  camelCase = camelCase.trim();
  var newText = "";
  for (var i = 0; i < camelCase.length; i++) {
    if (/[A-Z]/.test(camelCase[i]) && i != 0 && /[a-z]/.test(camelCase[i - 1])) {
      newText += " ";
    }
    if (i == 0 && /[a-z]/.test(camelCase[i])) {
      newText += camelCase[i].toUpperCase();
    } else {
      newText += camelCase[i];
    }
  }

  return newText;
}
