import axios, {AxiosError} from 'axios';
import type {ConversionResult} from "../model/conversion-result.ts";

interface RomanNumeralError {
    error: string;
    message: string;
    statusCode: number;
}

/**
 * Converts a number to roman numerals by calling the backend. Handles validating the response and translating it into
 * either the roman numeral output or a nice error message if an error is received from the API.
 * @param toConvert number that should be converted to Roman numerals
 */
const convertToRomanNumerals = async (toConvert: number): Promise<string> => {
    try {
        const response = await axios.get<ConversionResult>(`${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/romannumeral?query=${toConvert}`);

        return response.data.output;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Check if this is an axios error, and if so, use the nice type that our backend returns
            const romanNumeralsError = error as AxiosError<RomanNumeralError>;
            throw new Error(romanNumeralsError.response?.data.message);
        } else {
            throw error;
        }
    }
};

export { convertToRomanNumerals };
