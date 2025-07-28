import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getDigits } from './number-utils';

const DIGIT_POSITIONS = ['ones', 'tens', 'hundreds', 'thousands'] as const;
// Create a type out of the possible digit types in the above array
type DigitPosition = (typeof DIGIT_POSITIONS)[number];

@Injectable()
export class RomanNumeralsConverterService {
    // Lookup table for our roman numerals; there's possibly a more compact way to compute these on the fly, but
    // there just aren't that many of them, so a lookup table is plenty fast. Easier to audit, too.
    private readonly romanNumerals: Record<DigitPosition, string[]> = {
        ones: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        tens: ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        hundreds: ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        thousands: ['M', 'MM', 'MMM'],
    };

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    /**
     * Converts an integer between 1 and 3999 to a roman numeral. Uses the definition of roman numerals as provided
     * by https://www.britannica.com/topic/Roman-numeral and https://en.wikipedia.org/wiki/Roman_numerals
     * @param input integer to be converted. Expected to be between 1 and 3999.
     */
    public convertToRoman(input: number): string {
        // Roll through the number and peel off each digit into an array
        const digits = getDigits(input);

        // This shouldn't ever happen, since we're doing validation at the higher level and making sure that the
        // number doesn't have more than 4 digits, but it's good to be robust
        if (digits.length > 4) {
            this.logger.error(`Input ${input} has more than 4 digits`);
            throw new RangeError('Input must be 4 digits or less');
        }

        this.logger.debug(`Got ${input} as ${JSON.stringify(digits)}`);

        let i = 0;
        let result = '';
        // Run through ones, tens, etc converting them until we've put them all together
        for (const digitPosition of DIGIT_POSITIONS) {
            // Make sure we don't run past the number of digits we actually got back from splitting the number
            if (digits.length <= i) {
                break;
            }

            // Roman numerals proceed from most significant digit to least significant digit (left to right), so
            // prepend the one we are operating on, since it is more significant
            result = `${this.convertDigit(digits[i], digitPosition)}${result}`;

            i++;
        }

        return result;
    }

    private convertDigit(digit: number, digitType: DigitPosition): string {
        if (digit === 0) {
            return '';
        }

        return this.romanNumerals[digitType][digit - 1];
    }
}
