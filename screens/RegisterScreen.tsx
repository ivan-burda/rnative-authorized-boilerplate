import {FC} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Colors} from "../constants/colors";

import {useRegisterUser} from "../firestore-api/auth/useRegisterUser";
import {sharedStyles} from "../styles";
import {RegisterForm} from "./RegisterForm";
import {Message} from "../components/Message/Message";


export interface Credentials {
    email: string;
    password: string;
    deleteRequest?: boolean
}

export interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
}


export const RegisterScreen: FC = () => {
    const {registerUser, isLoading, registrationError, registrationErrorText} = useRegisterUser();

    if (isLoading) {
        return (<LoadingOverlay message={"Creating a user..."}/>)

    }

    return (<View style={styles.RegisterScreen}>
        <Text style={[sharedStyles.header1]}>Register</Text>
        <RegisterForm onSubmit={registerUser}/>
        <View style={styles.registerScreenBottom}>
            {registrationError && <Message messageType={"DANGER"} text={registrationErrorText}/>}
        </View>
    </View>)
}


const styles = StyleSheet.create({
    RegisterScreen: {
        paddingTop: 15,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.bgPrimary,
        color: Colors.primaryText,
    },
    buttonContainer: {
        width: "80%",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10
    },
    registerScreenBottom: {
        width: "80%",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "left"
    },
})

