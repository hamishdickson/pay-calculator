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

                var NATIONAL_INSURANCE_LOWER_LIMIT = 663.0;
                var NATIONAL_INSURANCE_UPPER_LIMIT = 3488.33;
                var NATIONAL_INSURANCE_LOWER_RATE = 0.12;
                var NATIONAL_INSURANCE_UPPER_RATE = 0.02;

                this.taxToPay = function() {
                    var out = 0.0;
                    if (this.baseSalary > 0) {
                        if (this.baseSalary > BASIC_BAND_MONTH) {
                            out = (BASIC_BAND_MONTH - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE;
                            out += (this.baseSalary - BASIC_BAND_MONTH) * HIGHER_RATE;
                        } else if (this.baseSalary > PERSONAL_ALLOWANCE_MONTH) {
                            out = (this.baseSalary - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
                        }
                    }
                    return out;
                };

                this.getMonthlyTax = function() {
                    return this.taxToPay() / 12;
                };

                this.nationalInsurance = function() {
                    var out = 0.0;
                    if (this.baseSalary > 0) {
                        if (this.baseSalary > NATIONAL_INSURANCE_UPPER_LIMIT) {
                            out = (NATIONAL_INSURANCE_UPPER_LIMIT - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE;
                            out += (this.baseSalary - NATIONAL_INSURANCE_UPPER_LIMIT) * NATIONAL_INSURANCE_UPPER_RATE;
                        } else {
                            out = (this.baseSalary - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE
                        }
                    }
                    return out;
                };

                this.payInPocket = function() {
                    return this.baseSalary - this.taxToPay() - this.nationalInsurance();
                };


                this.payInPocketMonthly = function() {
                    return this.payInPocket() / 12;
                };



                // pie chart
                var ctx = document.getElementById("myChart").getContext("2d");

                var data = [
                    {
                        value: 100,
                        color:"#F7464A",
                        highlight: "#FF5A5E",
                        label: "Red"
                    },
                    {
                        value: 55,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Green"
                    },
                    {
                        value: 100,
                        color: "#FDB45C",
                        highlight: "#FFC870",
                        label: "Yellow"
                    }
                ];

                new Chart(ctx).Doughnut(data, {
                    animateScale: true
                });
            },
            controllerAs: "calc"
        };
    });
})();
