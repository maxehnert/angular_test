
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
