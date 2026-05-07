import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAv1h9YJu5UPz1F8vC5Ymf0goDJ3Dpjstk",
  authDomain: "oz-character-quiz.firebaseapp.com",
  projectId: "oz-character-quiz",
  storageBucket: "oz-character-quiz.firebasestorage.app",
  messagingSenderId: "819772603897",
  appId: "1:819772603897:web:d8b0bfbc7e4b80ab6e5128",
  measurementId: "G-BY8WPMT50G",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});

export default app;
