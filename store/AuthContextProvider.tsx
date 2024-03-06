import {createContext, FC, ReactNode, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

interface AuthContextType {
    isAuthenticated: boolean;
}


export const AuthContext = createContext<AuthContextType|undefined>({
    isAuthenticated: false,
});

interface Props{
    children: ReactNode;
}

export const AuthContextProvider: FC<Props> = ({children}) => {
    const [isAuthOK, setIsAuthOK] = useState(false);


    const onAuthStateChanged = (user:FirebaseAuthTypes.User|null) => {
        if(user){
            setIsAuthOK(true)
        }else{
            setIsAuthOK(false)
        }
    };

    useEffect(()=>{
        return auth().onAuthStateChanged(onAuthStateChanged);
    },[])

    const value = {
        isAuthenticated: isAuthOK,
        // authenticate,
        // logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}