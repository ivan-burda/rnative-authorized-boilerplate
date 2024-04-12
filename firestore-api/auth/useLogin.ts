import {useState} from "react";
import {Credentials} from "../../screens/RegisterScreen";
import {FirebaseError, signInWithEmailAndPassword} from "firebase/auth";
import {loginAuth} from "./loginUser";


export enum LoginErrorCodes {
    "INVALID_CREDENTIALS" = "INVALID_CREDENTIALS"
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const loginUser = async ({email, password}: Credentials) => {
        setLoading(true);
        setPasswordError(null);

        try {
            await signInWithEmailAndPassword(loginAuth, email, password);
        } catch (e: FirebaseError) {
            if (e.code.includes("invalid-credential")) {
                console.log(e.code);
                setPasswordError("INVALID CREDENTIALS");
            }
        } finally {
            setLoading(false);
        }
    };

    return {loginUser, loading, passwordError};
};