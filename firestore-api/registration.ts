import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import db from "@react-native-firebase/database"
import {useEffect} from "react";

const createProfile = async(response:any, username:string) => {
    db().ref(`/users/${response.user.uid}`).set({username})
};

const register = async(email:string, password:string, username:string) => {
    if(email && password){
        try{
            const response = await auth().createUserWithEmailAndPassword(email, password)
            if(response.user){
                await createProfile(response, username);
            }
        }
        catch(e){
            console.log("Oops, registration has failed");
        }

    }
};

const login = async(email:string, password:string) => {
    if(email && password){
        try{
            const response = await auth().signInWithEmailAndPassword(email,password);
            if(response.user){
                console.log('Login successful');
            }
        }
        catch(e){
            console.log('Login failed');
        }
    }
};

const onAuthStateChanged = (user:FirebaseAuthTypes.User|null) => {
    if(user){
        console.log("Logged in already");
    }else{
        console.log("You have to login");
    }
};

// Place this to the loading screen
useEffect(()=>{
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
},[])