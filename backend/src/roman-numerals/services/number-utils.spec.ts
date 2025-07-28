import { getDigits } from './number-utils';

describe('NumberUtils', () => {
    it('should pull off digits in the right order', () => {
        expect(getDigits(9)).toEqual([9]);
        expect(getDigits(10)).toEqual([0, 1]);
        expect(getDigits(12)).toEqual([2, 1]);
        expect(getDigits(123)).toEqual([3, 2, 1]);
        expect(getDigits(1234)).toEqual([4, 3, 2, 1]);
    });

    it('converts negative numbers to positive', () => {
        expect(getDigits(-10)).toEqual([0, 1]);
    });

    it('handles floats by rounding down', () => {
        expect(getDigits(5.5)).toEqual([5]);
        expect(getDigits(52.0)).toEqual([2, 5]);
    });
});
