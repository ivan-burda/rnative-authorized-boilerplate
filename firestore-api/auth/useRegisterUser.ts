import {useState} from "react";
import {createUserWithEmailAndPassword, FirebaseError, getAuth} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import {app} from "../../firebaseConfig";

interface RegisterUser {
    email: string;
    password: string;
    username: string;
}

const auth = getAuth(app);
const db = getDatabase(app);

export const useRegisterUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | undefined>(undefined);
    const [registrationErrorText, setRegistrationErrorText] = useState("");

    const registerUser = async ({email, password, username}: RegisterUser) => {
        setIsLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                set(ref(db, 'users/' + userCredential?.user.uid), {
                    email: email,
                    username: username,
                    avatar: 'avatar1'
                })
            })
        } catch (e: FirebaseError) {
            if (e.code.includes("email-already-in-use")) {
                setRegistrationError("EMAIL_ALREADY_IN_USE");
                setRegistrationErrorText(`This e-mail address cannot be used. Try another one.`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {registerUser, isLoading, registrationError, registrationErrorText}
}