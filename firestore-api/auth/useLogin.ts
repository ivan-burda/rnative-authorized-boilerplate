import {useState} from "react";
import {Credentials} from "../../screens/RegisterScreen";
import {signInWithEmailAndPassword} from "firebase/auth";
import {loginAuth} from "./loginUser";

export const useLogin = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loginUser = async ({email, password}: Credentials) => {
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(loginAuth, email, password);
        } catch (error) {
            console.error("Error logging user", error);
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {loginUser, loading, error};
};