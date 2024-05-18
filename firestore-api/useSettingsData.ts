import {useEffect, useState} from 'react';
import {getDatabase, onValue, ref} from 'firebase/database';
import {UserDetails} from "../screens/Settings/Settings";

interface HookResult {
    userData: UserDetails | null;
    loading: boolean;
    error: string | null;
}

export const useSettingsData = (currentUserId: string | null): HookResult => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!currentUserId) {
            return;
        }
        const db = getDatabase();
        const userRef = ref(db, `users/${currentUserId}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val());
                setLoading(false);
            } else {
                setError("No data available for the user");
                setLoading(false);
            }
        }, (error) => {
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe(); // Unsubscribe from the listener when component unmounts

    }, [currentUserId]);

    return {userData, loading, error};
};
