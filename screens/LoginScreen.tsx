import {FC} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {LoginForm} from "./LoginForm";
import {sharedStyles} from "../styles";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Colors} from "../constants/colors";
import {useLogin} from "../firestore-api/auth/useLogin";
import {ColoredButton} from "../components/ColoredButton";
import {useResetPassword} from "../firestore-api/auth/useResetPassword";
import {Message} from "../components/Message/Message";


export const LoginScreen: FC = () => {
    const {loginUser, loading, passwordError, passwordErrorText, email, resetLoginError} = useLogin();
    const {resetPassword, passResetSuccess} = useResetPassword();


    if (loading) {
        return <LoadingOverlay message={"Logging you in ..."}/>;
    }

    return (<View style={styles.landingScreen}>
        <View style={styles.landingScreenTop}>
            <Text style={sharedStyles.header1}>AppName</Text>
            <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
            <LoginForm onAuthenticate={({email, password}) => loginUser({email, password})}/>
        </View>
        <View style={styles.landingScreenBottom}>
            {passwordError && <Message messageType={"DANGER"} text={passwordErrorText}/>}
            {passResetSuccess && <Message messageType={"SUCCESS"} text="Instructions e-mailed if account exists."/>}
            {passwordError &&
                <ColoredButton disabled={passResetSuccess} variant={passResetSuccess ? "DISABLED" : "DANGER"}
                               title="Reset password"
                               onPress={() => {
                                   resetPassword(email);
                                   resetLoginError()
                               }}/>}
        </View>
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
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.bgPrimary,
        paddingTop: 15,
    },
    landingScreenTop: {
        justifyContent: "center",
        alignItems: "center"
    },
    landingScreenBottom: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 7.5,
        borderColor: 'seagreen',
    }
});