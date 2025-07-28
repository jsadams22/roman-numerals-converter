/**
 * Separates the digits in `input` into an array of the form [ones, tens, hundreds, thousands, ...]
 * Negative numbers are not explicitly represented, and instead will be converted to positive numbers.
 * Floats are likewise not represented and will be floored first, then have their digits processed.
 * @param input Number to separate into component digits
 */
export const getDigits = (input: number): number[] => {
    const digits: number[] = [];

    let choppedInput = input;

    if (choppedInput < 0) {
        choppedInput *= -1;
    }

    if (!Number.isInteger(choppedInput)) {
        choppedInput = Math.floor(choppedInput);
    }

    // Run through our input, chopping it down, until we're out of digits
    while (choppedInput > 0) {
        // Get the digit in the current ones spot
        const currentDigit = choppedInput % 10;
        digits.push(currentDigit);
        // Lop off the digit in the current ones spot and do the next one
        choppedInput = Math.floor(choppedInput / 10);
    }

    return digits;
};
