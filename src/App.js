import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu_wwdW2kqkyZOcXi5ApZ8k1uVDRc105c",
  authDomain: "plant-mamas.firebaseapp.com",
  projectId: "plant-mamas",
  storageBucket: "plant-mamas.appspot.com",
  messagingSenderId: "271153249047",
  appId: "1:271153249047:web:94c296227594b4d8c39552",
  measurementId: "G-GB5CSESFR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
const provider = new GoogleAuthProvider();
// const auth = getAuth();

function App() {

  const [user, setUser] = useState();

  function signIn(){
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
      } else {
        signIn()
      }
    });
  },[])
  return (
    <div className="App">
      <h1> Welcome {user.displayName}!</h1>
      <span>{user.email}</span>
    </div>
  );
}

export default App;
