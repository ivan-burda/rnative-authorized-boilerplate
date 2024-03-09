import {FC, useState} from 'react';
import {Alert, StyleSheet, Text, View} from "react-native";
import {RegisterForm} from "./RegisterForm";
import {sharedStyles} from "../styles";
import {LoadingOverlay} from "../components/LoadingOverlay";
import {Colors} from "../constants/colors";
import auth from "@react-native-firebase/auth";
import {createProfile} from "../firestore-api/registration";

export interface Credentials {
 email:string;
 password: string;
}

export interface RegisterCredentials {
    email:string;
    password: string;
    username: string;
}

export const RegisterScreen: FC = () => {
 const [isAuthenticating, setIsAuthenticating] = useState(false);

 const signupHandler = async({email, password, username}:RegisterCredentials) => {
   setIsAuthenticating(true);
     if(email && password){
         try{
             const response = await auth().createUserWithEmailAndPassword(email, password)
             if(response.user){
                 await createProfile(response, username);
             }
         }
         catch(e){
             Alert.alert("User creation failed","Cannot create a new user. Please check entered data and try again.")
             setIsAuthenticating(false)
         }

     }

 };

 if(isAuthenticating){
  return <LoadingOverlay message={"Creating a user..."}/>
 }

 return(<View style={styles.RegisterScreen}>
  <Text style={sharedStyles.header1}>Register yourself</Text>
  <RegisterForm onSubmit={signupHandler}/>
 </View>)
};

const styles = StyleSheet.create({
     RegisterScreen:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:Colors.bgPrimary
     },
    buttonContainer:{
        width: "80%",
        borderRadius: 10,
        overflow:"hidden",
        marginBottom: 10
    }
})