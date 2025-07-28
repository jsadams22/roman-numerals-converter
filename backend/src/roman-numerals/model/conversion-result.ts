/**
 * Contains the results of the Roman numeral conversion for usage by the API in responses.
 */
export interface ConversionResult {
    // Stringified integer that was provided as input
    input: string;

    // Roman numeral conversion result
    output: string;
}
