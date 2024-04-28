import {FC, useState} from 'react';
import {isPasswordValid} from "../../utils/isPasswordValid";
import {View} from "react-native";
import {useLogin} from "../../firestore-api/auth/useLogin";
import {PasswordInputField} from "./PasswordInputField";
import {ColoredButton} from "../../components/ColoredButton";
import {Message} from "../../components/Message/Message";
import {getCurrentUserEmail} from "../../firestore-api/auth/getCurrentUserId";
import {useDeleteAccount} from "../../firestore-api/auth/useDeleteAccount";
import {FirebaseError} from "firebase/auth";


export const ConfirmDeletion: FC = () => {
    const {deleteAccount} = useDeleteAccount();
    const {loginUser, email, passwordError, passwordErrorText} = useLogin();
    const currentEmail = getCurrentUserEmail();
    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(false);

    const inputChangedHandler = (enteredValue: string) => {
        setPassword(enteredValue);
        if (isPasswordValid(enteredValue)) {
            setPasswordValidity(true);
        } else {
            setPasswordValidity(false);
        }
    };

    const submitHandler = async () => {
        if (!passwordValidity || !currentEmail) {
            return;
        }

        try {
            await loginUser({email: currentEmail, password});
            await deleteAccount();

        } catch (e: FirebaseError) {
            console.log(e);
        }
    };
    return (
        <View>
            <PasswordInputField textInputConfig={{
                autoCapitalize: 'none',
                keyboardType: "default",
                onChangeText: (fieldValue: string) =>
                    inputChangedHandler(fieldValue),
                value: password,
                secureTextEntry: false
            }} invalid={false}/>
            {passwordError && <Message messageType={"DANGER"} text={passwordErrorText}/>}
            <ColoredButton disabled={!passwordValidity} variant={passwordValidity ? "DANGER" : "DISABLED"}
                           title="Delete Account"
                           onPress={submitHandler}/>
        </View>
    );
};