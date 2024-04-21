import {deleteUser, FirebaseError} from "firebase/auth";
import {auth} from "./logout";
import {useState} from "react";


export const useDeleteAccount = () => {
    const user = auth.currentUser;
    const [error, setError] = useState<string | null>(null);
    if (!user) {
        setError("NO_USER_AVAILABLE");
        return {
            deleteAccount: () => {
            }, error
        };
    }


    const deleteAccount = async () => {
        try {
            await deleteUser(user);
        } catch (error: FirebaseError) {
            console.log(error);
            setError(error.code);
        }
    };

    return {deleteAccount, error};

};