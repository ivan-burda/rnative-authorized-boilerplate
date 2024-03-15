import {createContext, FC, ReactNode, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "../firebaseConfig";

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
    const auth = getAuth(app);

    const onAuthStateChangedHandler = (user:unknown) => {
        if(user){
            setIsAuthOK(true)
        }else{
            setIsAuthOK(false)
        }
    };

    useEffect(()=>{
        return onAuthStateChanged(auth, onAuthStateChangedHandler);
    },[])

    const value = {
        isAuthenticated: isAuthOK,
        // authenticate,
        // logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}