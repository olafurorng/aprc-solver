# APRC Solver
*Licence: GNU GENERAL PUBLIC LICENSE (see `LICENCE` document) - No liability of usage*
*Author: Olafur Orn Gudmundsson*

APRC solver solves APRC out of the APRC formula (i.e. the X variable)

![APRC formula](aprc_full_formula.png?raw=true "APRC formula")

by using binary search. This solver assumes that
all the loan is paid out in the beginning of the
loan time so the formula can be simplified into:

![APRC simplified formula](aprc_simplified_formula.png?raw=true "APRC simplified formula")


## Usage
### Example of usage
```
import { calcAprc } from 'aprc-solver'

const monthlyPayments = [110, 107, 105, 102];
const s = 380; // user gets 380 money into his pocket

const aprc = calcAprc(monthlyPayments, s)
```

### Details
We use trial and error with binary search
to find APRC, similar to the Goal Seek
function in Excel. See formula for APRC:
https://www.handbook.fca.org.uk/handbook/MCOB/10A/2.html?date=2016-06-30
The formula assumes that there is monthly
payments and the first payment is 1 month
after loan is taken. It also assumes that
every month in the year has equal length.

ATTRIBUTES:
@param payments: List of all the repayments
                 back to loan provider.
@param s: The s variable in the APRC formula.
          The money which the person gets
          in his pocket when taking the loan

@return value between 0 and 1 (the APRC)
        rounded to the fourth decimal place



## Inspiration
An APRC solver was needed for the [consumer loans comparison on Aurbjörg.is](https://aurbjorg.is/)
and it wasn't possible to find open source NPM
package to calculate APRC from the APRC formula.

This package is published to increase transparency
for the calculation on [Aurbjörg.is](https://aurbjorg.is/) and for other
to use as open source code to solve APRC is lacking.
