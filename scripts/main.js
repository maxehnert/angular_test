
(function () {


  var app = angular.module('HolidayList', ['ngRoute', 'restangular']);

  app.config( function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://tiy-atl-fe-server.herokuapp.com/collections/');

    $routeProvider.when('/', {
      templateUrl: 'templates/home-template.html',
      controller: 'GiftsController'
    });

    $routeProvider.when('/single/:id', {
      templateUrl: 'templates/single-template.html',
      controller: 'GiftsController'
    });

    $routeProvider.when('/add', {
      templateUrl: 'templates/add-template.html',
      controller: 'GiftsController'
    });

    //adding in the user login url
    $routeProvider.when('/login', {
      templateUrl: 'templates/user-template.html',
      controller: 'UserController'
    });

  });

  app.directive('clickTurkey', function () {
    return {
      link: function ($scope, element, attrs) {
        element.bind('click', function () {
          console.log('my turkey directive was run');
        });
      }
    }
  });

  app.directive('zip', function(){
    return {
      restrictive: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      template:'<br/><div><h3 ng-click="toggleContent()">{{title}}</h3><div ng-show="isContentVisible" ng-transclude></div></div>',

      link: function(scope){
        scope.isContentVisible = false;
        scope.toggleContent = function (){
          scope.isContentVisible = !scope.isContentVisible;
        }
      }
    }
  });

}());


(function () {

  angular.module('HolidayList')
    .controller('GiftsController',
      ['giftsFactory', '$scope', '$location', '$rootScope',
        function (giftsFactory, $scope, $location, $rootScope) {

        giftsFactory.getGifts().then( function (results) {
          $scope.gifts = results;
        });

        $scope.addGift = function (gift) {
          giftsFactory.addGift(gift);

          $rootScope.$on('gift:added', function () {
            $location.path('/');
          });

        }

    }]);
}());

(function(){
  angular.module('HolidayList').controller('UserController', ['userFactory', '$scope', '$location', '$rootScope', function(userFactory, $scope, $location, $rootScope){
    userFactory.getUser().then(function(results){
      $scope.id = results;
    });
    $scope.addUser = function(id){
      userFactory.addUser(id);

      $rootScope.$on('user:added', function(){
        $location.path('/');
      });
    }
  }]);

}());

(function(){
  angular.module('HolidayList').factory('userFactory', ['$rootScope', 'Restangular', function($rootScope, Restangular){
    //server end-point
    var userBase = Restangular.all('max-holiday');

    function getUser(){
      return userBase.getList();
    }
    function addUser(id){
      userBase.post(id).then( function (){
        $rootScope.$broadcast('user:added');
      });
    }

    return {
    getUser: getUser,
    addUSer: addUser
    };

  }]);
}());

(function () {

  angular.module('HolidayList')
    .factory('giftsFactory', ['$rootScope', 'Restangular', function ($rootScope, Restangular) {

      //server end-point
      var giftsBase = Restangular.all('max-holiday');

      function getGifts () {
        // return $http.get(url);
        return giftsBase.getList();
      }

      function getGift (id) {
        //return $http.get(url + id);
        return giftsBase.get(id);
      }

      function addGift (gift) {
        // $http.post(url, gift).success( function () {
        //   $rootScope.$broadcast('gift:added');
        // });
        giftsBase.post(gift).then( function () {
          $rootScope.$broadcast('gift:added');
        });
      }

      return {

        getGifts: getGifts,
        getGift: getGift,
        addGift: addGift

      };

    }]);

}());
