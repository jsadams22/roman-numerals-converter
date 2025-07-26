import axios from 'axios';

// TODO: Make these configurable
const SERVER_ADDRESS = 'http://localhost';
const SERVER_PORT = 3000;

/**
 * Converts a number to roman numerals by calling the backend. Intentionally does not do much input validation here;
 * that is left up to the caller.
 * @param toConvert number that should be converted to Roman numerals
 */
const convertToRomanNumerals = async (toConvert: number): Promise<string> => {
    const response = await axios.get<string>(`${SERVER_ADDRESS}:${SERVER_PORT}/romannumeral?query=${toConvert}`);

    return response.data
};

export { convertToRomanNumerals };