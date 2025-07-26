import {vi, test, describe, expect, beforeEach} from 'vitest';
import axios from 'axios';
import {convertToRomanNumerals} from "./roman-numerals.ts";

describe('Convert to roman numerals', () => {
    const getSpy = vi.spyOn(axios, 'get');

    beforeEach(async () => {
        getSpy.mockImplementation(() => Promise.resolve({data: 'XVI'}));
    });

    test('calls backend for roman numerals', async () => {
        const response = await convertToRomanNumerals(123);
        expect(response).toEqual('XVI');
        expect(getSpy).toHaveBeenCalled();
    });

    test('throws when error is returned', async () => {
        getSpy.mockImplementation(() => Promise.reject(new Error('error')));

        await expect(convertToRomanNumerals(123)).rejects.toThrow('error');
    });

    test('passes query to backend', async () => {
        const fakeQuery = 123456;
        const response = await convertToRomanNumerals(fakeQuery);

        expect(response).toEqual('XVI');
        expect(getSpy).toHaveBeenCalledWith(expect.stringContaining(`query=${fakeQuery}`));
    });

    test('uses configuration for backend address/port', async () => {
        const fakeAddress = 'http://fake_location.com';
        const fakePort = 1234;
        vi.stubEnv('VITE_SERVER_ADDRESS', fakeAddress)
        vi.stubEnv('VITE_SERVER_PORT', fakePort.toString());

        const expectedFakeUrl = `${fakeAddress}:${fakePort}/romannumeral`;

        const response = await convertToRomanNumerals(123);

        expect(response).toEqual('XVI');
        expect(getSpy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`^${expectedFakeUrl}`)));

        vi.unstubAllEnvs();
    });
});
