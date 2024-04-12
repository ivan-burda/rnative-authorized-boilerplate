import {FC, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {LoginForm} from "./LoginForm";
import {sharedStyles} from "../styles";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Credentials} from "./RegisterScreen";
import {Colors} from "../constants/colors";
import {useLogin} from "../firestore-api/auth/useLogin";
import {ButtonVariant, ColoredButton} from "../components/ColoredButton";


export const LoginScreen: FC = () => {
    const {loginUser, loading, passwordError} = useLogin();

    const loginHandler = ({email, password}: Credentials) => {
        loginUser({email, password});
    };

    if (loading) {
        return <LoadingOverlay message={"Logging you in ..."}/>;
    }

    return (<View style={styles.landingScreen}>
        <Text style={sharedStyles.header1}>Feelings</Text>
        <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
        <LoginForm onAuthenticate={loginHandler}/>
        {passwordError && <ColoredButton variant="DANGER" title="Reset Password" onPress={() => console.log("Hey!")}/>}
    </View>);
};

const styles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    landingScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bgPrimary

    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 7.5,
        borderColor: 'seagreen',
    },
    buttonContainer: {
        width: "80%",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10
    },
    errorButton: {
        backgroundColor: 'tomato'
    }
});