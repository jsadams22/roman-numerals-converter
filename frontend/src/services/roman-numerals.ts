import axios from 'axios';

/**
 * Converts a number to roman numerals by calling the backend. Intentionally does not do much input validation here;
 * that is left up to the caller.
 * @param toConvert number that should be converted to Roman numerals
 */
const convertToRomanNumerals = async (toConvert: number): Promise<string> => {
    const response = await axios.get<string>(`${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/romannumeral?query=${toConvert}`);

    return response.data
};

export { convertToRomanNumerals };