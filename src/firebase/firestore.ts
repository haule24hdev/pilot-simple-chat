import { initializeApp, firestore } from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQAPavyfPFWLixaTdCFvkeXZUPHmPciEs",
  authDomain: "pilot-chat-a5351.firebaseapp.com",
  databaseURL: "https://pilot-chat-a5351.firebaseio.com",
  projectId: "pilot-chat-a5351",
  storageBucket: "pilot-chat-a5351.appspot.com",
  messagingSenderId: "405419730273",
  appId: "1:405419730273:web:8e87baa0270674ada79120",
  measurementId: "G-F83LCRK5HB",
};

initializeApp(firebaseConfig);

export default firestore();
