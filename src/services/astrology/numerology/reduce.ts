const MASTER_NUMBERS = new Set([11, 22, 33]);

/** Repeatedly sums digits down to a single digit, except master numbers 11/22/33 stay unreduced. */
export function reduceToDigitOrMasterNumber(value: number): number {
  let n = value;
  while (n > 9 && !MASTER_NUMBERS.has(n)) {
    n = String(n)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}
