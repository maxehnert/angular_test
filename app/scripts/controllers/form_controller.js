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
