(function () {
    var app = angular.module('calc-directive', ['chart.js']);

    app.directive('calc', [function () {

        return {
            restrict: 'E',
            templateUrl: 'public/views/calc.html',
            controller: function ($scope) {

                $scope.currency = "£";

                $scope.baseSalary = 42378.96;
                $scope.savings = 0.0;
                $scope.monthlySavings = 0.0;
                $scope.studentLoan = 0.0;
                $scope.rent = 625.0;

                $scope.travelCard = true;

                const BASIC_RATE = 0.2;
                const HIGHER_RATE = 0.4;

                const PERSONAL_ALLOWANCE = 10000.0;
                const BASIC_BAND = 31785.0 + PERSONAL_ALLOWANCE;
                const HIGHER_BAND = 150000.0;

                const PERSONAL_ALLOWANCE_MONTH = PERSONAL_ALLOWANCE / 12.0;
                const BASIC_BAND_MONTH = BASIC_BAND / 12.0;
                const HIGHER_BAND_MONTH = HIGHER_BAND / 12.0;

                const NATIONAL_INSURANCE_LOWER_LIMIT = 8060.0;
                const NATIONAL_INSURANCE_UPPER_LIMIT = 42380.0;
                const NATIONAL_INSURANCE_LOWER_RATE = 0.12;
                const NATIONAL_INSURANCE_UPPER_RATE = 0.02;

                const ZONE_ONE_TO_THREE_TRAVEL_CARD = 144.8;

                $scope.getMonthlySavings = function() {
                    return $scope.monthlySavings;
                };

                $scope.getRent = function() {
                    return $scope.rent;
                };

                $scope.getTravelCardValue = function () {
                    if ($scope.travelCard) {
                        return ZONE_ONE_TO_THREE_TRAVEL_CARD;
                    } else {
                        return  0.0;
                    }
                };

                $scope.getMonthPay = function() {
                    return $scope.baseSalary / 12;
                };

                $scope.taxToPay = function() {
                    var out = 0.0;
                    if ($scope.baseSalary > 0) {
                        if ($scope.baseSalary > BASIC_BAND) {
                            out = (BASIC_BAND - PERSONAL_ALLOWANCE) * BASIC_RATE;
                            out += ($scope.baseSalary - BASIC_BAND) * HIGHER_RATE;
                        } else if ($scope.baseSalary > PERSONAL_ALLOWANCE) {
                            out = ($scope.baseSalary - PERSONAL_ALLOWANCE) * BASIC_RATE
                        }
                    }
                    return out;
                };

                $scope.getMonthlyTax = function() {
                    return $scope.taxToPay() / 12;
                };

                $scope.nationalInsuranceYearly = function() {
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

                $scope.getNationalInsuranceMonthly = function() {
                    return $scope.nationalInsuranceYearly() / 12;
                };

                $scope.payInPocket = function() {
                    return $scope.baseSalary - $scope.taxToPay() - $scope.nationalInsuranceYearly();
                };

                $scope.payInPocketMonthly = function() {
                    return pay = $scope.payInPocket() / 12;
                };

                $scope.playMoneyMonthly = function() {
                    return $scope.payInPocketMonthly() - $scope.getRent() - $scope.getMonthlySavings() - $scope.getTravelCardValue();
                };

                // pie chart
                $scope.labels = ["What's left", "Total tax", "National insurance", "Savings", "Rent", "Travel card"];
                $scope.data = [$scope.playMoneyMonthly().toFixed(2),
                    $scope.getMonthlyTax().toFixed(2),
                    $scope.getNationalInsuranceMonthly().toFixed(2),
                    $scope.getMonthlySavings().toFixed(2),
                    $scope.getRent().toFixed(2),
                    $scope.getTravelCardValue().toFixed(2)];

                $scope.newPie = function() {
                    $scope.data = [$scope.playMoneyMonthly().toFixed(2),
                        $scope.getMonthlyTax().toFixed(2),
                        $scope.getNationalInsuranceMonthly().toFixed(2),
                        $scope.getMonthlySavings().toFixed(2),
                        $scope.getRent().toFixed(2),
                        $scope.getTravelCardValue().toFixed(2)];
                }

            },
            controllerAs: "calc"
        };
    }]);
})();
