import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const FirebaseConfig = {
    apiKey: "AIzaSyB7TgXtFi2TzsfNHz2w_AeGq1qhxfV7PrM",
    authDomain: "newbees-66cfb.firebaseapp.com",
    projectId: "newbees-66cfb",
    storageBucket: "newbees-66cfb.appspot.com",
    messagingSenderId: "400066439830",
    appId: "1:400066439830:web:37a5ebe4bc98c0aaa970b7",
  };

//Intialize Firebase
const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);
export default app;




