/**
 * Contains the results of the Roman numeral conversion for usage by the API in responses.
 *
 * This is a copy of the similarly named object specified in the Backend's repo. In a perfect world, we would have these API objects
 * described in a separate location that is common between the two; perhaps an NPM package that stores the DTO objects,
 * or perhaps another package with its own description language that could be used to provide DTO objects in many
 * languages (e.g. protobuf) to facilitate us transferring the data across various services and or mediums (e.g. perhaps
 * also a messaging queue).
 *
 * For this case, however, there's only one object and two services. For now, the tradeoff for making something more
 * complicated is simply not worth it. Please keep these in sync manually.
 */
export interface ConversionResult {
    // Stringified integer that was provided as input
    input: string;

    // Roman numeral conversion result
    output: string;
}
