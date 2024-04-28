import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBLMQIgjrDNCGmXjtfNhH57GkIzc73ECKQ",
    authDomain: "accounting-erp-1f024.firebaseapp.com",
    projectId: "accounting-erp-1f024",
    storageBucket: "accounting-erp-1f024.appspot.com",
    messagingSenderId: "372452321306",
    appId: "1:372452321306:web:ca44f20d30a9b7536049a3",
    measurementId: "G-RYGBYPZGZD"
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
// const analytics = getAnalytics(app);

