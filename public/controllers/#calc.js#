(function () {
    var app = angular.module('calc-directive', []);

    app.directive('calc', function () {

        return {
            restrict: 'E',
            templateUrl: 'pay-calculator/public/views/calc.html',
            controller: function () {
                BASE_SALARY = 0.0;
                BASE_SALARY_MONTH = BASE_SALARY / 12.0;

                BONUS_RATE = 0.0;

                // tax fun
                BASIC_RATE = 0.2;
                HIGHER_RATE = 0.4;
                ADDITIONAL_RATE = 0.45;

                PERSONAL_ALLOWANCE = 10000.0;
                BASIC_BAND = 31865.0 + PERSONAL_ALLOWANCE;
                HIGHER_BAND = 150000.0;

                PERSONAL_ALLOWANCE_MONTH = PERSONAL_ALLOWANCE / 12.0;
                BASIC_BAND_MONTH = BASIC_BAND / 12.0;
                HIGHER_BAND_MONTH = HIGHER_BAND / 12.0;

                // student loan
                STUDENT_LOAN_INTEREST_RATE = 0.015;
                STUDENT_LOAN_RATE = 0.09;
                STUDENT_LOAN_BAND = 16910.0;
                STUDENT_LOAN_BAND_MONTH = STUDENT_LOAN_BAND / 12.0;
                INITIAL_STUDENT_LOAN_LEFT = 0.0;

                _student_loan_paid = 0.0

                // national insurance
                NATIONAL_INSURANCE_LOWER_LIMIT = 663.0;
                NATIONAL_INSURANCE_UPPER_LIMIT = 3488.33;
                NATIONAL_INSURANCE_LOWER_RATE = 0.12;
                NATIONAL_INSURANCE_UPPER_RATE = 0.02;

                // pension
                PENSION_RATE = 0.05;
                PENSION_VALUE_MONTH = 0.0;

                // outgoings
                RENT_MONTH = 624.0;

                // months to consider
                MONTHS = 12 * 1;

                // savings - I actually save a bit more than this, but it's an easy approx for the future
                SAVINGS_RATE = 0.25;
                TYPICAL_SAVINGS = 0.0;
                INITIAL_SAVINGS = 0.0;

                ISA_INTEREST_RATE = 1.01;

                __savings = [INITIAL_SAVINGS];
                __savings_total = [];
                __base = [];
                __total_tax = [];



                this.test = "test";




            },
            controllerAs: "calc"
        };
    });
})();
