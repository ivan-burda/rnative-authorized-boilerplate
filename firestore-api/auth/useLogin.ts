import {useState} from "react";
import {Credentials} from "../../screens/RegisterScreen";
import {FirebaseError, signInWithEmailAndPassword} from "firebase/auth";
import {loginAuth} from "./loginAuth";


export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const resetLoginError = () => {
        setPasswordError(null);
    };

    const loginUser = async ({email, password, deleteRequest}: Credentials) => {
        setLoading(true);
        setPasswordError(null);

        try {
            await signInWithEmailAndPassword(loginAuth, email, password);
        } catch (e: FirebaseError) {
            if (e.code.includes("too-many-requests")) {
                setPasswordError("TOO-MANY-REQUESTS");
                setPasswordErrorText("Visit mailbox to finish password reset, and then try again.");
            }

            if (e.code.includes("invalid-credential") && deleteRequest) {
                setPasswordError("INVALID PASSWORD");
                setPasswordErrorText(`The password is incorrect`);
                return;
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