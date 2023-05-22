import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDkIYtPWgvqy72aNWN9XdTKEMfXf4LoYXs",
  authDomain: "backendagustin.firebaseapp.com",
  projectId: "backendagustin",
  storageBucket: "backendagustin.appspot.com",
  messagingSenderId: "627941066470",
  appId: "1:627941066470:web:4e09b22878b801410edd27"
};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

