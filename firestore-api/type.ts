export interface UserDataInterface {
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface AppContextInterface {
    userLoggedIn: boolean;
    loggedInUserEmail: string | null;
    loggedInUserDisplayName: string | null;
    loggedInUserUserId: string;
    loggedInUserPhotoURL: string | null;
    setUserData: ({ email, displayName, photoURL }: UserDataInterface) => void;
}