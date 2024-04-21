import {FirebaseError, getAuth, sendPasswordResetEmail} from "firebase/auth";
import {useState} from "react";

const auth = getAuth();

export const useResetPassword = () => {
    const [passResetSuccess, setPassResetSuccess] = useState<boolean>(false);
    const [passResetError, setPassResetError] = useState<string | null>(null);
    const [passResetRequested, setPassResetRequested] = useState<boolean>(false);

    const resetPassword = async (email: string = '', resetLoginError: () => void) => {
        try {
            await sendPasswordResetEmail(auth, email);
            setPassResetSuccess(true);
            // setTimeout(() => {
            //     setPassResetSuccess(false);
            //     resetLoginError();
            // }, 5000);
        } catch (error: FirebaseError) {
            console.log(error);
            setPassResetSuccess(false);
            setPassResetError(error);
        }
    };

    return {resetPassword, passResetError, passResetSuccess, passResetRequested};
};