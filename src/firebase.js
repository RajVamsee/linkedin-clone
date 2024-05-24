import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBUj8rm5336M7UtWm5NSbMBcLpUSYv19so",
    authDomain: "linkedin-clone-5c210.firebaseapp.com",
    projectId: "linkedin-clone-5c210",
    storageBucket: "linkedin-clone-5c210.appspot.com",
    messagingSenderId: "984687710391",
    appId: "1:984687710391:web:bf5452f9071f649dc27d32"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };










