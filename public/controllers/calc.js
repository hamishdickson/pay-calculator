(function () {
    var app = angular.module('calc-directive', []);

    app.directive('calc', function () {

        return {
            restrict: 'E',
            templateUrl: 'public/views/calc.html',
            controller: function () {

            },
            controllerAs: "calc"
        };
    });
})();
