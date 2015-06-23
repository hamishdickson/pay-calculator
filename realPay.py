import matplotlib.pyplot as plt

BASE_SALARY = float(raw_input('Base....: '))
BASE_SALARY_MONTH = BASE_SALARY / 12.0

BONUS_RATE = float(raw_input('Typical bonus rate....: '))

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

# months to consider
MONTHS = 12 * 1

# savings - I actually save a bit more than this, but it's an easy approx for the future
SAVINGS_RATE = 0.25
INITIAL_SAVINGS = float(raw_input("Initial savings....: "))

ISA_INTEREST_RATE = 1.01

__savings = [INITIAL_SAVINGS]
__savings_total = []
__base = []
__total_tax = []


def tax_to_pay(salary):
    out = 0.0
    if salary > BASIC_BAND_MONTH:
        out = (BASIC_BAND_MONTH - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
        out += (salary - BASIC_BAND_MONTH) * HIGHER_RATE
    elif salary > PERSONAL_ALLOWANCE_MONTH:
        out = (salary - PERSONAL_ALLOWANCE_MONTH) * BASIC_RATE
    return out


def national_insurance(salary):
    out = 0.0
    if salary > NATIONAL_INSURANCE_UPPER_LIMIT:
        out = (NATIONAL_INSURANCE_UPPER_LIMIT - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE
        out += (salary - NATIONAL_INSURANCE_UPPER_LIMIT) * NATIONAL_INSURANCE_UPPER_RATE
    else:
        out = (salary - NATIONAL_INSURANCE_LOWER_LIMIT) * NATIONAL_INSURANCE_LOWER_RATE
    return out


def student_loan(salary):
    out = 0.0
    if salary > STUDENT_LOAN_BAND_MONTH:
        out = (salary - STUDENT_LOAN_BAND_MONTH) * STUDENT_LOAN_RATE
    return out


def pension(salary):
    return salary * 0.05


def total_tax_stuff(salary):
    pay_for_tax = salary - pension(salary)
    return pension(salary) + tax_to_pay(pay_for_tax) + national_insurance(pay_for_tax) + student_loan(pay_for_tax)


def savings(salary):
    return salary * SAVINGS_RATE


def create_savings_graph(salary):
    __base.append(salary)
    __savings.append(savings(salary))
    __savings_total.append(sum(__savings) * ISA_INTEREST_RATE)
    __total_tax.append(total_tax_stuff(salary))


print "Base: " + str(BASE_SALARY)

print "Initial savings: " + str(INITIAL_SAVINGS)

__pay_for_tax = BASE_SALARY_MONTH - pension(BASE_SALARY_MONTH)

print "Tax free pay: " + str(BASE_SALARY_MONTH)

print "Pension: " + str(pension(BASE_SALARY_MONTH))

print "Tax paid: " + str(tax_to_pay(__pay_for_tax))

print "National insurance: " + str(national_insurance(__pay_for_tax))

print "Student loan: " + str(student_loan(__pay_for_tax))

print "--------------------------------------------------------"

outgoings = total_tax_stuff(BASE_SALARY_MONTH)

print "Total tax etc: " + str(outgoings)

print "Total going into account (ish): " + str(BASE_SALARY_MONTH - outgoings)

for x in range(MONTHS):
    if x % 12 == 0:
        # assume 50% of full bonus... just in case
        print "bonus (min, pre-tax): " + str(BASE_SALARY * BONUS_RATE * 0.5)
        # assume a pay rise over 2% every year
        BASE_SALARY_MONTH *= 1.02
        print "woooo more money! New base: " + str(BASE_SALARY_MONTH)

    create_savings_graph(BASE_SALARY_MONTH)

print "--------------------------------------------------------"
print "Total savings (after " + str(MONTHS) + " months): " + str(__savings_total[MONTHS - 1])

plt.plot(__savings, label="savings")
plt.plot(__savings_total, label="savings total")
plt.plot(__base, label="base")
plt.plot(__total_tax, label="total tax")
plt.legend(bbox_to_anchor=(0., 1.02, 1., .102), loc=3,
           ncol=2, mode="expand", borderaxespad=0.)
plt.show()
