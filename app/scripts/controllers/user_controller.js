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
