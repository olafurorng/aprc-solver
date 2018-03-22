const MAX_ITERATIONS = 50;

/* Calculates APRC.
 * We use trial and error with binary search
 * to find APRC, similar to the Goal Seek
 * function in Excel. See formula for APRC:
 * https://www.handbook.fca.org.uk/handbook/MCOB/10A/2.html?date=2016-06-30
 * The formula assumes that there is monthly
 * payments and the first payment is 1 month
 * after loan is taken. It also assumes that
 * every month in the year has equal length.
 *
 * ATTRIBUTES:
 * @param payments: List of all the repayments
 *                  back to loan provider.
 * @param s: The s variable in the aprc formula.
 *           The money which the person gets
 *           in his pocket when taking the loan
 *
 * @return value between 0 and 1 (the APRC)
 *         rounded to the fourth decimal place
 */
exports.calcAprc = function(payments, s) {
  return calcAprcWithBinarySearch(payments, s, 0.0, 1.0, 0)
}

/*
 * minValue = minimum possible aprc
 * maxValue = maximum possible aprc
*/
calcAprcWithBinarySearch = function(payments, s, minValue, maxValue, iterationLvl) {
  // check if the interval is zero or less than certain decimal places
  if ((maxValue - minValue) < 0.0001) { // rounded to the fourth decimal place
    return minValue;
  }

  // guessing APRC with binary search
  const aprc = (maxValue - minValue) / 2 + minValue;

  // check if we have maximized the iterations
  if (iterationLvl > MAX_ITERATIONS) {
    return aprc;
  }

  const leftSideOfTheEquation = s;
  var rightSideOfTheEquation = 0.0;
  for (var i = 0; i < payments.length; i++) {
    const Ak = payments[i];
    rightSideOfTheEquation += Ak * Math.pow(1+ aprc, -(i+1.0) / 12.0);;
  }

  // check if the aprc is correct guessed
  if (leftSideOfTheEquation == rightSideOfTheEquation) {
    return aprc;
  } else if (leftSideOfTheEquation < rightSideOfTheEquation) {
    return calcAprcWithBinarySearch(payments, s, aprc, maxValue, ++iterationLvl);
  } else { // leftSideOfTheEquation > rightSideOfTheEquation
    return calcAprcWithBinarySearch(payments, s, minValue, aprc, ++iterationLvl);
  }
}
