import {vi, test, describe, afterEach, expect} from 'vitest';
import axios from 'axios';
import {convertToRomanNumerals} from "./roman-numerals.ts";

describe('Convert to roman numerals', () => {
    const getSpy = vi.spyOn(axios, 'get');
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('calls backend for roman numerals', async () => {
        getSpy.mockImplementation(() => Promise.resolve({data: 'XVI'}));

        const response = await convertToRomanNumerals(123);
        expect(response).toEqual('XVI');
        expect(getSpy).toHaveBeenCalled();
    });

    test('throws when error is returned', async () => {
        getSpy.mockImplementation(() => Promise.reject(new Error('error')));

        await expect(convertToRomanNumerals(123)).rejects.toThrow('error');
    });
});
