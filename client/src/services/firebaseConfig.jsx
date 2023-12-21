import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpNs2-KfmPn9JOp44x-hFaH5iuKLEV6rE",
    authDomain: "react-proyecto-final-360f7.firebaseapp.com",
    projectId: "react-proyecto-final-360f7",
    storageBucket: "react-proyecto-final-360f7.appspot.com",
    messagingSenderId: "918670059361",
    appId: "1:918670059361:web:14e6cfad56188084c14720"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

export { db, storage }