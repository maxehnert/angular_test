
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
