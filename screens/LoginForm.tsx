import {FC, useState} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {InputField} from "../components/InputField/InputField";
import {isEmailValid} from "../utils/isEmailValid";
import {isPasswordValid} from "../utils/isPasswordValid";
import {Credentials} from "./RegisterScreen";
import {sharedStyles} from "../styles";

interface Props {
    onAuthenticate: ({email, password}: Credentials) => void;
}

export type InputFields = 'email' | 'password'

export const LoginForm: FC<Props> = ({onAuthenticate}) => {
    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(true);

    const inputChangedHandler = (inputIdentifier: InputFields, enteredValue: string) => {
        if (inputIdentifier === 'email') {
            setEmail(enteredValue);
        }
        if (inputIdentifier === 'password') {
            setPassword(enteredValue);
        }
    };

    const submitHandler = () => {
        const emailIsValid = isEmailValid(email);
        const passwordIsValid = isPasswordValid(password);

        if (!emailIsValid || !passwordIsValid) {
            setEmailValidity(emailIsValid);
            setPasswordValidity(passwordIsValid);
            return;
        }
        setEmailValidity(emailIsValid);
        setPasswordValidity(passwordIsValid);
        onAuthenticate({email, password});
    };

    const isFormValid = emailValidity && passwordValidity;

    return (
        <View style={styles.loginForm}>
            <InputField label={"Email"} textInputConfig={{
                autoCapitalize: 'none',
                keyboardType: "email-address",
                onChangeText: (fieldValue: string) =>
                    inputChangedHandler("email", fieldValue),
                value: email,
            }} invalid={emailValidity}/>
            <InputField label={"Password"} textInputConfig={{
                autoCapitalize: 'none',
                keyboardType: "default",
                onChangeText: (fieldValue: string) =>
                    inputChangedHandler("password", fieldValue),
                value: password,
                secureTextEntry: true
            }} invalid={passwordValidity}/>
            {!isFormValid && (<Text style={sharedStyles.errorText}>Please, correct entered details.</Text>)}
            <View>
                <Button title={"Confirm"} color="seagreen" onPress={submitHandler}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginForm: {
        marginBottom: 20
    },
});