/**
 * Separates the digits in `input` into an array of the form [ones, tens, hundreds, thousands, ...]
 * @param input Number to separate into component digits
 */
export const getDigits = (input: number): number[] => {
    const digits: number[] = [];

    let choppedInput = input;

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
