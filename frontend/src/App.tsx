import './App.css'
import {
    Button,
    defaultTheme,
    Form,
    NumberField,
    Provider,
    View,
    Text,
    Flex,
    Heading
} from "@adobe/react-spectrum";
import {useState} from "react";
import {convertToRomanNumerals} from "./services/roman-numerals.ts";
import styled from "styled-components";

const App = () => {
    const [romanNumeral, setRomanNumeral] = useState<string>('');
    const [integerValue, setIntegerValue] = useState<number>(0);
    const [error, setError] = useState<string>('');

    const onSubmit = async () => {
        try {
            const romanNumeral = await convertToRomanNumerals(integerValue);
            setError('');
            setRomanNumeral(romanNumeral);
        } catch (error) {
            setRomanNumeral('');
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Unknown error');
            }
        }
    };

    return (
        <Provider theme={defaultTheme}>
            <View padding="size-700" width="size-4600" height="size-3400">
                <Flex direction="column" gap="size-300" alignItems="start">
                    <Heading level={2}>Roman numeral converter</Heading>
                    <Form width="100%">
                        <NumberField onChange={setIntegerValue} minValue={1} maxValue={3999} label="Enter a number (1-3,999)" hideStepper />
                        <Button type="button" maxWidth="size-3000" variant="primary" marginTop="size-200" onPress={onSubmit}>Convert to roman numeral</Button>
                    </Form>
                    { romanNumeral !== '' &&
                        <OutputWrapper>
                            <Text>
                                Roman numeral: {romanNumeral}
                            </Text>
                        </OutputWrapper>
                    }
                    { error !== '' &&
                        <ErrorWrapper>
                            <Text>
                                Something went wrong:<br />
                                {error}
                            </Text>
                        </ErrorWrapper>
                    }
                </Flex>
            </View>
        </Provider>
    );
};

const OutputWrapper = styled.div`
    font-weight: bold;
    font-size: 110%;
`;

const ErrorWrapper = styled.div`
    color: red;
    padding: 10px;
    text-align: left;
    font-size: 110%;
    font-weight: bold;
`;

export default App;
