import {FirebaseError, getAuth, sendPasswordResetEmail} from "firebase/auth";
import {useState} from "react";

const auth = getAuth();

export const useResetPassword = () => {
    const [passResetSuccess, setPassResetSuccess] = useState<boolean>(false);
    const [passResetError, setPassResetError] = useState<string | null>(null);
    const [passResetRequested, setPassResetRequested] = useState<boolean>(false);

    const hideMessage = () => {
        setTimeout(() => {
            setPassResetSuccess(false);
            setPassResetError(null)
        }, 3000)
    }

    const resetPassword = async (email: string = '') => {
        try {
            await sendPasswordResetEmail(auth, email);
            setPassResetSuccess(true);
            hideMessage()

        } catch (error: FirebaseError) {
            setPassResetSuccess(false);
            setPassResetError(error);
            hideMessage()
        }
    };

    return {resetPassword, passResetError, passResetSuccess, passResetRequested};
};