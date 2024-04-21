import {FC, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {RegisterForm} from "./RegisterForm";
import {sharedStyles} from "../styles";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Colors} from "../constants/colors";
import {registerUser} from "../firestore-api/auth/registerUser";


export interface Credentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
}

export const RegisterScreen: FC = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const signupHandler = async ({email, password, username}: RegisterCredentials) => {
        setIsAuthenticating(true);
        if (email && password && username) {
            registerUser({email, password, username, isAuthenticatingCb: setIsAuthenticating})
                .then(() => console.log('Profile created'))
                .catch(() => console.log('Profile creation failed'));
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message={"Creating a user..."}/>;
    }

    return (<View style={styles.RegisterScreen}>
        <Text style={sharedStyles.header1}>Register yourself</Text>
        <RegisterForm onSubmit={signupHandler}/>
    </View>);
};

const styles = StyleSheet.create({
    RegisterScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bgPrimary,
        color: Colors.primaryText
    },
    buttonContainer: {
        width: "80%",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10
    }
});