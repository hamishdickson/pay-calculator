(function () {
    var app = angular.module('main-calc-controller', []);

    app.controller('MainCalcController', ['$scope', function ($scope) {
        this.test = "test";

        $scope.test_string = "test";
        $scope.BASE_SALARY = 0.0;
        $scope.BASE_SALARY_MONTH = BASE_SALARY / 12.0;
        $scope.BONUS_RATE = 0.0;

        // tax fun
        $scope.BASIC_RATE = 0.2;
        $scope.HIGHER_RATE = 0.4;
        $scope.ADDITIONAL_RATE = 0.45;

        $scope.PERSONAL_ALLOWANCE = 10000.0;
        $scope.BASIC_BAND = 31865.0 + PERSONAL_ALLOWANCE;
        $scope.HIGHER_BAND = 150000.0;

        $scope.PERSONAL_ALLOWANCE_MONTH = PERSONAL_ALLOWANCE / 12.0;
        $scope.BASIC_BAND_MONTH = BASIC_BAND / 12.0;
        $scope.HIGHER_BAND_MONTH = HIGHER_BAND / 12.0;

        // student loan
        $scope.STUDENT_LOAN_INTEREST_RATE = 0.015;
        $scope.STUDENT_LOAN_RATE = 0.09;
        $scope.STUDENT_LOAN_BAND = 16910.0;
        $scope.STUDENT_LOAN_BAND_MONTH = STUDENT_LOAN_BAND / 12.0;
        $scope.INITIAL_STUDENT_LOAN_LEFT = 0.0;

        $scope._student_loan_paid = 0.0;

        // national insurance
        $scope.NATIONAL_INSURANCE_LOWER_LIMIT = 663.0;
        $scope.NATIONAL_INSURANCE_UPPER_LIMIT = 3488.33;
        $scope.NATIONAL_INSURANCE_LOWER_RATE = 0.12;
        this.NATIONAL_INSURANCE_UPPER_RATE = 0.02;

        // pension
        this.PENSION_RATE = 0.05;
        this.PENSION_VALUE_MONTH = 0.0;

        // outgoings
        this.RENT_MONTH = 624.0;

        // months to consider
        this.MONTHS = 12;

        // savings - I actually save a bit more than this, but it's an easy approx for the future
        this.SAVINGS_RATE = 0.25;
        this.TYPICAL_SAVINGS = 0.0;
        this.INITIAL_SAVINGS = 0.0;

        this.ISA_INTEREST_RATE = 1.01;

        this.__savings = [INITIAL_SAVINGS];
        this.__savings_total = [];
        this.__base = [];
        this.__total_tax = [];
    }]);
})();
