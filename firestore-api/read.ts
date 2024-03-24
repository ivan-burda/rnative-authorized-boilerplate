import {getDatabase, onValue, ref} from "firebase/database";

const db = getDatabase();

export const readData = (userId: string, dataPath: string) => {
    const dataRef = ref(db, userId,);
    const data = onValue(dataRef, (snapshot) => {
        return snapshot.val();
    });
    return data;
};