import {useState} from "react";
import {Credentials} from "../../screens/RegisterScreen";
import {FirebaseError, signInWithEmailAndPassword} from "firebase/auth";
import {loginAuth} from "./loginAuth";
import {ColoredButton} from "../../components/ColoredButton";


export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const resetLoginError = () => {
        setPasswordError(null);
    };

    const loginUser = async ({email, password}: Credentials) => {
        setLoading(true);
        setPasswordError(null);

        try {
            await signInWithEmailAndPassword(loginAuth, email, password);
        } catch (e: FirebaseError) {
            console.log(e);
            if (e.code.includes("too-many-requests")) {
                setPasswordError("TOO-MANY-REQUESTS");
                setPasswordErrorText("Visit mailbox to finish password reset, and then re-try.");
            }
            if (e.code.includes("invalid-credential")) {
                setPasswordError("INVALID CREDENTIALS");
                setPasswordErrorText(`Wrong credentials. If the ${email} exists try resetting password.`);
                setEmail(email);
            }
        } finally {
            setLoading(false);
        }
    };

    return {loginUser, loading, passwordError, passwordErrorText, email, resetLoginError};
};