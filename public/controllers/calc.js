(function () {
    var app = angular.module('calc-directive', []);

    app.directive('calc', function () {

        return {
            restrict: 'E',
            templateUrl: 'public/views/calc.html',
            controller: function () {

                this.baseSalary = 0.0;
                this.savings = 0.0;
                this.studentLoan = 0.0;

                this.getMonthPay = function() {
                    return this.baseSalary / 12;
                };

                var BASIC_RATE = 0.2;
                var HIGHER_RATE = 0.4;
                var ADDITIONAL_RATE = 0.45;

                var PERSONAL_ALLOWANCE = 10000.0;
                var BASIC_BAND = 31865.0 + PERSONAL_ALLOWANCE;
                var HIGHER_BAND = 150000.0;

                var PERSONAL_ALLOWANCE_MONTH = PERSONAL_ALLOWANCE / 12.0;
                var BASIC_BAND_MONTH = BASIC_BAND / 12.0;
                var HIGHER_BAND_MONTH = HIGHER_BAND / 12.0;

                this.taxToPay = function() {
                    var out = 0.0;
                    if (this.baseSalary > BASIC_BAND_MONTH) {
                        out = (BASIC_BAND_MONTH - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE;
                        out += (this.baseSalary - BASIC_BAND_MONTH) * HIGHER_RATE;
                    } else if (this.baseSalary > PERSONAL_ALLOWANCE_MONTH) {
                        out = (this.baseSalary - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
                    }
                    return out;
                };

                this.getMonthlyTax = function() {
                    return this.taxToPay() / 12;
                }
            },
            controllerAs: "calc"
        };
    });
})();
