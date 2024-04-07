import {FC, useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {LoginForm} from "./LoginForm";
import {sharedStyles} from "../styles";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Credentials} from "./RegisterScreen";
import {Colors} from "../constants/colors";
import {useLogin} from "../firestore-api/auth/useLogin";
import {loginUser} from "../firestore-api/auth/loginUser";


export const LoginScreen: FC = () => {
    const {loginUser, loading, error} = useLogin();
    const [isAuthenticating, setIsAuthenticating] = useState(false);


    const loginHandler = ({email, password}: Credentials) => {
        loginUser({email, password});
    };

    if (isAuthenticating) {
        return <LoadingOverlay message={"Logging you in ..."}/>;
    }

    return (<View style={styles.landingScreen}>
        <Text style={sharedStyles.header1}>Feelings</Text>
        <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
        <LoginForm onAuthenticate={loginHandler}/>
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
    }
});