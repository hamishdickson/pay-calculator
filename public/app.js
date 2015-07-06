(function () {
    var app = angular.module('CalcApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap',
                                         'main-calc-controller', 'calc-directive', 'chart.js']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        
        $routeProvider
            .when('/pay-calculator', {
                templateUrl: 'public/views/home.html',
                controller: 'MainCalcController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
