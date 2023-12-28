// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCELh3X0lYqfSyZtscv7wGUWUk0HepWv9Q",
  authDomain: "socio-mern-stack.firebaseapp.com",
  projectId: "socio-mern-stack",
  storageBucket: "socio-mern-stack.appspot.com",
  messagingSenderId: "126301492678",
  appId: "1:126301492678:web:87d2fcfd72490b4c730ec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;