(function () {
    var app = angular.module('calc-directive', []);

    app.directive('calc', function () {

        return {
            restrict: 'E',
            templateUrl: 'pay-calculator/public/views/calc.html',
            controller: function () {
                this.test = "test";
            },
            controllerAs: "calc"
        };
    });
})();
