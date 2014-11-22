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
