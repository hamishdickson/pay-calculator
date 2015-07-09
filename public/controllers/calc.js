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
                $scope.monthlySavings = 500.0;
                $scope.studentLoan = 6770.0;
                $scope.rent = 625.0;

                $scope.travelCard = true;
                $scope.pensionContrib = true;

                const BASIC_RATE = 0.2;
                const HIGHER_RATE = 0.4;

                const PERSONAL_ALLOWANCE = 10000.0;
                const BASIC_BAND = 31785.0 + PERSONAL_ALLOWANCE;
                const HIGHER_BAND = 150000.0;

                const NATIONAL_INSURANCE_LOWER_LIMIT = 8060.0;
                const NATIONAL_INSURANCE_UPPER_LIMIT = 42380.0;
                const NATIONAL_INSURANCE_LOWER_RATE = 0.12;
                const NATIONAL_INSURANCE_UPPER_RATE = 0.02;

                const STUDENT_LOAN_INTEREST_RATE = 0.015;
                const STUDENT_LOAN_RATE = 0.09;
                const STUDENT_LOAN_BAND = 16910.0;

                const ZONE_ONE_TO_THREE_TRAVEL_CARD = 144.8;

                $scope.studentLoanPay = function() {
                    var out = 0.0;
                    if ($scope.baseSalary > STUDENT_LOAN_BAND) {
                        out = ($scope.baseSalary - STUDENT_LOAN_BAND) * STUDENT_LOAN_RATE
                    }
                    return out;
                };

                $scope.studentLoanMonthly = function() {
                    return $scope.studentLoanPay() / 12;
                };

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

                $scope.getPensionRate = function () {
                    if ($scope.pensionContrib) {
                        return 0.05;
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
                    return $scope.baseSalary - $scope.taxToPay() - $scope.nationalInsuranceYearly() - $scope.pension() - $scope.studentLoanPay();
                };

                $scope.payInPocketMonthly = function() {
                    return $scope.payInPocket() / 12;
                };

                $scope.playMoneyMonthly = function() {
                    return $scope.payInPocketMonthly() - $scope.getRent() - $scope.getMonthlySavings() - $scope.getTravelCardValue();
                };

                // note: pension comes out before tax etc
                $scope.pension = function() {
                    return $scope.baseSalary * $scope.getPensionRate();
                };

                $scope.pensionMonthly = function() {
                    return $scope.pension() / 12;
                };


                // pie chart
                $scope.summaryLabels = ["What's left", "Total tax", "National insurance", "Pension", "Student loan", "Savings", "Rent", "Travel card"];
                $scope.summaryData = [$scope.playMoneyMonthly().toFixed(2),
                    $scope.getMonthlyTax().toFixed(2),
                    $scope.getNationalInsuranceMonthly().toFixed(2),
                    $scope.pensionMonthly().toFixed(2),
                    $scope.studentLoanMonthly().toFixed(2),
                    $scope.getMonthlySavings().toFixed(2),
                    $scope.getRent().toFixed(2),
                    $scope.getTravelCardValue().toFixed(2)];

                $scope.newPie = function() {
                    $scope.summaryData = [$scope.playMoneyMonthly().toFixed(2),
                        $scope.getMonthlyTax().toFixed(2),
                        $scope.getNationalInsuranceMonthly().toFixed(2),
                        $scope.pensionMonthly().toFixed(2),
                        $scope.studentLoanMonthly().toFixed(2),
                        $scope.getMonthlySavings().toFixed(2),
                        $scope.getRent().toFixed(2),
                        $scope.getTravelCardValue().toFixed(2)];
                };


                $scope.getRemainingStudentLoan = function(period) {
                    var out = $scope.studentLoan - period * $scope.studentLoanMonthly();
                    if (out > 0) {
                        return out;
                    }
                    return 0.0;
                };

                $scope.studentLoanLabels = ["Now", "6 months", "12 months", "18 months", "24 months", "30 months", "36 months", "42 months"];
                $scope.studentLoanSeries = ["Remaining loan"];
                $scope.studentLoanData = [
                    [$scope.studentLoan,
                        $scope.getRemainingStudentLoan(6.0),
                        $scope.getRemainingStudentLoan(12.0),
                        $scope.getRemainingStudentLoan(18.0),
                        $scope.getRemainingStudentLoan(24.0),
                        $scope.getRemainingStudentLoan(30.0),
                        $scope.getRemainingStudentLoan(36.0),
                        $scope.getRemainingStudentLoan(42.0)]
                ];
            },
            controllerAs: "calc"
        };
    }]);
})();
