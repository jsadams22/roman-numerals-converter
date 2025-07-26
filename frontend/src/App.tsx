import './App.css'
import {Button, defaultTheme, Form, NumberField, Provider, View} from "@adobe/react-spectrum";
import {useState} from "react";
import {convertToRomanNumerals} from "./services/roman-numerals.ts";

const App = () => {
    const [romanNumeral, setRomanNumeral] = useState<string>('');
    const [integerValue, setIntegerValue] = useState<number>(0);

    const onSubmit = async () => {
        try {
            const romanNumeral = await convertToRomanNumerals(integerValue);
            setRomanNumeral(romanNumeral);
        } catch (error) {
            // TODO: Add better error handling
            console.error(error);
        }
    };

    return (
        <Provider theme={defaultTheme}>
            <View>
                Roman numeral converter
                <Form maxWidth="size-4600">
                    <NumberField onChange={setIntegerValue} label="Enter a number"/>
                    <Button type="button" variant="primary" onPress={onSubmit}>Convert to roman numeral</Button>
                </Form>
                { romanNumeral !== '' &&
                    <View>
                        Roman Numeral: {romanNumeral}
                    </View>
                }
            </View>
        </Provider>
    );
};

export default App
