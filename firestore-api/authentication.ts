import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

//Init authentication
export const auth = getAuth();

// USER REGISTRATION
// ======================================================
import {UserDataInterface} from "./type";

interface RegisterUserInterface {
    email: string;
    username: string;
    password: string;
    registerUserCb: {
        onError: (error: string) => void;
        onSuccess: ({ email, displayName, photoURL }: UserDataInterface) => void;
    };
}

export const registerUser = ({
                                 email,
                                 username,
                                 password,
                                 registerUserCb,
                             }: RegisterUserInterface) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            updateUserProfile({
                displayName: username,
                photoURL: "placeholder",
                cb: registerUserCb.onSuccess,
            });
        })
        .catch((err) => {
            registerUserCb.onError(err.message);
            console.log(err.message);
        });
};

// LOGIN: UPDATE USER PROFILE
// ======================================================
interface UpdateUserProfileInterface {
    displayName: string | null;
    photoURL?: string | null;
    cb: ({ email, displayName, photoURL }: UserDataInterface) => void;
}

export const updateUserProfile = ({
                                      displayName,
                                      photoURL,
                                      cb,
                                  }: UpdateUserProfileInterface) => {
    updateProfile(auth.currentUser!, {
        displayName: displayName,
        photoURL: photoURL,
    })
        .then(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    cb({
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    });
                }
            });
            console.log("User profile updated");
        })
        .catch((err) => {
            console.log(err.message);
        });
};

// USER LOGIN
// ======================================================
interface LoginUserInterface {
    email: string;
    password: string;
    loginUserCb: {
        forwardError: (error: string) => void;
    };
}

export const useLoginUser = ({
                                 email,
                                 password,
                                 loginUserCb,
                             }: LoginUserInterface) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log("User logged in:", cred);
        })
        .catch((err) => {
            loginUserCb.forwardError(err.message);
            return err.message;
        });
};

// USER LOGOUT
// ======================================================
export const logoutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("The user has logged out");
        })
        .catch((err) => {
            console.log(err.message);
        });
};

// LOGIN: REQUEST A PASSWORD RESET
// ======================================================
interface RequestPasswordResetInterface {
    email: string;
}

export const useRequestPasswordReset = ({
                                            email,
                                        }: RequestPasswordResetInterface) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password reset email sent!");
        })
        .catch((err) => {
            console.log(err.message);
        });
};