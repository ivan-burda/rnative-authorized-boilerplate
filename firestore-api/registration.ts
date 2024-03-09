import auth from '@react-native-firebase/auth';
import db from "@react-native-firebase/database";

export const createProfile = async(response:any, username:string) => {
    db().ref(`/users/${response.user.uid}`).set({username})
};

export const logout = async() => {
    await auth().signOut()
};