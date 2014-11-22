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


(function () {

  angular.module('HolidayList')
    .controller('GiftsController',
      ['giftsFactory', '$scope', '$location', '$scope',
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

angular.module('HolidayList').controller('SimpleFormDemoController', ['formFactory', '$scope', '$location', '$rootScope',
  function(FormForConfiguration,formFactory, $scope,  flashr, $location, $rootScope) {
    FormForConfiguration.enableAutoLabels();

    $scope.formData = {};

    $scope.validationFailed = function() {
      flashr.now.error('Your form is invalid');
    };

    $scope.validationRules = {
      iAgreeToTheTermsOfService: {
        required: {
          rule: true,
          message: 'You must accept the TOS'
        }
      },
      email: {
        required: true,
        pattern: /\w+@\w+\.\w+/
      },
      password: {
        required: true,
        pattern: {
          rule: /[0-9]/,
          message: 'Your password must contain at least 1 number'
        }
      }
    };

    $scope.submit = function(data) {
      formFactory.addForm(data);
      $rootScope.$on('submit:data', function(){
        $location.path('/');
      });
      flashr.now.info('Your form has been submitted');
    };
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
    addUser: addUser
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

(function(){
  angular.module('HolidayList').factory('userFactory', ['$rootScope', 'Restangular', function($rootScope, Restangular){
    //server end-point
    var userBase = Restangular.all('max-holiday');

    function submit(data){
      userBase.post(id).then( function (){
        $rootScope.$broadcast('submit:data');
      });
    }

    return {
    submit: submit
    };

  }]);

}());
