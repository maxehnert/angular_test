(function () {

  var app = angular.module('HolidayList', ['ngRoute', 'restangular' //'formFor'
  ]);

  app.config( function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://tiy-atl-fe-server.herokuapp.com/collections/');

    $routeProvider.when('/', {
      templateUrl: 'templates/home-template.html',
      controller: 'GiftsController'
    })
    .when('/single/:id', {
      templateUrl: 'templates/single-template.html',
      controller: 'GiftsController'
    })
    .when('/add', {
      templateUrl: 'templates/add-template.html',
      controller: 'GiftsController'
    })
    .when('/login', {
      templateUrl: 'templates/user-template.html',
      controller: 'UserController'
    });

    //form url
    // $routeProvider.when('/form', {
    //   templateUrl: 'templates/form-template.html',
    //   controller: 'SimpleFormDemoController'
    // });

  });

  // app.directive('clickTurkey', function () {
  //   return {
  //     link: function ($scope, element, attrs) {
  //       element.bind('click', function () {
  //         console.log('my turkey directive was run');
  //       });
  //     }
  //   }
  // });

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

  $('.link').on('click', function(){
    console.log('test');
    $destroy();
  });

}());
