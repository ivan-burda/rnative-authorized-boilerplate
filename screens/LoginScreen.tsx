import {FC, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {LoginForm} from "./LoginForm";
import {sharedStyles} from "../styles";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Credentials} from "./RegisterScreen";
import {Colors} from "../constants/colors";
import {getAuth, signInWithEmailAndPassword,  initializeAuth,getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {app} from "../firebaseConfig";
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const LoginScreen: FC = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const loginHandler = async({email, password}:Credentials) => {
        setIsAuthenticating(true);
        if(email && password){
            try{
                const response = await signInWithEmailAndPassword(auth,email,password);
                if(response.user){
                    console.log('Login successful');
                }
            }
            catch(e){
                Alert.alert("Authentication failed", "Cannot login. Please check credentials")
            }
        }

        setIsAuthenticating(false);

    };

    if(isAuthenticating){
        return <LoadingOverlay message={"Logging you in ..."}/>
    }

    return(<View style={styles.landingScreen}>
            <Text style={sharedStyles.header1}>Feelings</Text>
            <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
        <LoginForm onAuthenticate={loginHandler} />
    </View>)
};

const styles = StyleSheet.create({
    LoginScreen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    landingScreen:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.bgPrimary

    },
    logo:{
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 7.5,
        borderColor: 'seagreen',
    },
    buttonContainer:{
        width: "80%",
        borderRadius: 10,
        overflow:"hidden",
        marginBottom: 10
    }
})