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
