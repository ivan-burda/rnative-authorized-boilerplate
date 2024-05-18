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
import {useResetPassword} from "../../firestore-api/auth/useResetPassword";


export const ConfirmDeletion: FC = () => {
    const {deleteAccount, error} = useDeleteAccount();
    const {loginUser, email, passwordError, passwordErrorText} = useLogin();
    const currentEmail = getCurrentUserEmail();
    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(false);
    const {resetPassword, passResetError, passResetSuccess, passResetRequested} = useResetPassword();
    const inputChangedHandler = (enteredValue: string) => {
        setPassword(enteredValue);
        if (isPasswordValid(enteredValue)) {
            setPasswordValidity(true);
        } else {
            setPasswordValidity(false);
        }
    };

    const submitHandler = async () => {
        if (!currentEmail) {
            return;
        }

        try {
            await loginUser({email: currentEmail, password, deleteRequest: true});
            deleteAccount();
        } catch (e: FirebaseError) {
            console.log(e);
        }
    };
    return (
        <View>
            {error && <PasswordInputField textInputConfig={{
                autoCapitalize: 'none',
                keyboardType: "default",
                onChangeText: (fieldValue: string) =>
                    inputChangedHandler(fieldValue),
                value: password,
                secureTextEntry: true
            }} invalid={false}/>}
            {passwordError && <Message messageType={"DANGER"} text={passwordErrorText}/>}
            {passResetSuccess && <Message messageType={"SUCCESS"} text="Check mailbox for more instructions."/>}
            {passwordError &&
                <ColoredButton variant="DANGER" title="Reset password"
                               onPress={() => resetPassword(email)}/>}
            <ColoredButton variant={"DANGER"}
                           title="Delete Account"
                           onPress={submitHandler}/>
        </View>
    );
};