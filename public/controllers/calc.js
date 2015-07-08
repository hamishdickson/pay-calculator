(function () {
    var app = angular.module('calc-directive', ['chart.js']);

    app.directive('calc', [function () {

        return {
            restrict: 'E',
            templateUrl: 'public/views/calc.html',
            controller: function ($scope) {

                $scope.baseSalary = 55000.0;
                $scope.savings = 0.0;
                $scope.studentLoan = 0.0;



                $scope.getMonthPay = function() {
                    return $scope.baseSalary / 12;
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

                var NATIONAL_INSURANCE_LOWER_LIMIT = 663.0;
                var NATIONAL_INSURANCE_UPPER_LIMIT = 3488.33;
                var NATIONAL_INSURANCE_LOWER_RATE = 0.12;
                var NATIONAL_INSURANCE_UPPER_RATE = 0.02;

                $scope.taxToPay = function() {
                    var out = 0.0;
                    if ($scope.baseSalary > 0) {
                        if ($scope.baseSalary > BASIC_BAND_MONTH) {
                            out = (BASIC_BAND_MONTH - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE;
                            out += ($scope.baseSalary - BASIC_BAND_MONTH) * HIGHER_RATE;
                        } else if ($scope.baseSalary > PERSONAL_ALLOWANCE_MONTH) {
                            out = ($scope.baseSalary - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
                        }
                    }
                    return out;
                };

                $scope.getMonthlyTax = function() {
                    return $scope.taxToPay() / 12;
                };

                $scope.nationalInsurance = function() {
                    var out = 0.0;
                    if ($scope.baseSalary > 0) {
                        if ($scope.baseSalary > NATIONAL_INSURANCE_UPPER_LIMIT) {
                            out = (NATIONAL_INSURANCE_UPPER_LIMIT - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE;
                            out += ($scope.baseSalary - NATIONAL_INSURANCE_UPPER_LIMIT) * NATIONAL_INSURANCE_UPPER_RATE;
                        } else {
                            out = ($scope.baseSalary - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE
                        }
                    }
                    return out;
                };

                $scope.payInPocket = function() {
                    var pay = $scope.baseSalary - $scope.taxToPay() - $scope.nationalInsurance();
                    return pay;
                };


                $scope.payInPocketMonthly = function() {
                    var pay = $scope.payInPocket() / 12;
                    return pay;
                };


                // pie chart
                $scope.labels = ["Take home", "Total tax", "Pension", "Savings", "Rent"];
                $scope.data = [$scope.payInPocketMonthly(), $scope.getMonthlyTax(), 100, 700, 500];

                $scope.newPie = function() {
                    $scope.data = [$scope.payInPocketMonthly(), $scope.getMonthlyTax(), 100, 700, 500];
                }

            },
            controllerAs: "calc"
        };
    }]);
})();
