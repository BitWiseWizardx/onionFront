// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBGajvSBtmiVzckkV-bbXhMELbHpKJAAR0",
	authDomain: "onion-bec91.firebaseapp.com",
	projectId: "onion-bec91",
	storageBucket: "onion-bec91.appspot.com",
	messagingSenderId: "610333537989",
	appId: "1:610333537989:web:697761253e5174db6f22ac",
	measurementId: "G-H2E8LW2C5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
