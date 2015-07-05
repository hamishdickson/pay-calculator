(function () {
    var app = angular.module('CalcApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap',
                                         'main-controller', 'calc-directive']);

    app.config(['$locationProvider', '$routeProvider', '$scope', function ($locationProvider, $routeProvider, $scope) {
        $locationProvider.html5Mode(true);
        
        $routeProvider
            .when('/pay-calculator', {
                templateUrl: 'pay-calculator/public/views/home.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
