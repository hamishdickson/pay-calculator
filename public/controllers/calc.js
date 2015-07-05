(function () {
    var app = angular.module('calc-directive', []);

    app.directive('calc', function () {

        return {
            restrict: 'E',
            templateUrl: 'public/views/calc.html',
            controller: function () {

                this.test = "test";
                this.baseSalary = 0.0;

            },
            controllerAs: "calc"
        };
    });
})();
