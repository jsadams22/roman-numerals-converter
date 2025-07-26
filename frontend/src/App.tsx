import './App.css'
import {Button, defaultTheme, Form, Provider, TextField, View} from "@adobe/react-spectrum";

const App = () => {
    return (
        <Provider theme={defaultTheme}>
            <View>
                Roman numeral converter
                <Form maxWidth="size-4600">
                    <TextField label="Enter a number"/>
                    <Button type="submit" variant="primary">Convert to roman numeral</Button>
                </Form>
            </View>
        </Provider>
    );
};

export default App
