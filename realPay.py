BASE_SALARY = 1.0
BASE_SALARY_MONTH = BASE_SALARY / 12.0

# tax fun
BASIC_RATE = 0.2
HIGHER_RATE = 0.4
ADDITIONAL_RATE = 0.45

PERSONAL_ALLOWANCE = 10000.0
BASIC_BAND = 31865.0 + PERSONAL_ALLOWANCE
HIGHER_BAND = 150000.0

PERSONAL_ALLOWANCE_MONTH = PERSONAL_ALLOWANCE / 12.0
BASIC_BAND_MONTH = BASIC_BAND / 12.0
HIGHER_BAND_MONTH = HIGHER_BAND / 12.0

# student loan
STUDENT_LOAN_INTEREST_RATE = 0.015
STUDENT_LOAN_RATE = 0.09
STUDENT_LOAN_BAND = 16910.0
STUDENT_LOAN_BAND_MONTH = STUDENT_LOAN_BAND / 12.0

# national insurance
NATIONAL_INSURANCE_LOWER_LIMIT = 663.0
NATIONAL_INSURANCE_UPPER_LIMIT = 3488.33
NATIONAL_INSURANCE_LOWER_RATE = 0.12
NATIONAL_INSURANCE_UPPER_RATE = 0.02

# pension
PENSION_RATE = 0.05
PENSION_VALUE_MONTH = 0.0

# outgoings
RENT_MONTH = 624.0

def taxToPay(salary):
    out = 0.0
    if (salary > BASIC_BAND_MONTH):
      out = (BASIC_BAND_MONTH - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
      out += (salary - BASIC_BAND_MONTH) * HIGHER_RATE
    elif (salary > PERSONAL_ALLOWANCE_MONTH):
      out = (salary - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
    return out

def nationalInsurance(salary):
    out = 0.0
    if (salary > NATIONAL_INSURANCE_UPPER_LIMIT):
      out = (NATIONAL_INSURANCE_UPPER_LIMIT - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE
      out += (salary - NATIONAL_INSURANCE_UPPER_LIMIT) * NATIONAL_INSURANCE_UPPER_RATE
    else:
      out = (salary - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE
    return out

def studentLoan(salary):
    out = 0.0
    if (salary > STUDENT_LOAN_BAND_MONTH):
        out = (salary - STUDENT_LOAN_BAND_MONTH) * STUDENT_LOAN_RATE
    return out

def pension(salary):
    return salary * 0.05

payForTax = BASE_SALARY_MONTH - pension(BASE_SALARY_MONTH)

print "Tax free pay: " + str(BASE_SALARY_MONTH)
print "Pension: " + str(pension(BASE_SALARY_MONTH))

print "Tax paid: " + str(taxToPay(payForTax))
print "National insurance: " + str(nationalInsurance(payForTax))
print "Student loan: " + str(studentLoan(payForTax))
