import firebase from 'firebase/app';
import 'firebase/auth';

export const CONFIG = {
    apiKey: "AIzaSyANZ8VnnYYLpbLxFuxj4obYP96iLcUVr_Q",
    authDomain: "tamago-flashcards.firebaseapp.com",
    databaseURL: "https://tamago-flashcards.firebaseio.com",
    projectId: "tamago-flashcards",
    storageBucket: "",
    messagingSenderId: "961864468773"
}

if (!firebase.apps.length){ 
	firebase.initializeApp(CONFIG);
}

const auth = firebase.auth();
export { auth, };