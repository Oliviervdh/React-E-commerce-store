import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAnukIYlz-AUg5YO_Vd_L8_hT-OohFJhj8",
    authDomain: "shop-db-84301.firebaseapp.com",
    databaseURL: "https://shop-db-84301.firebaseio.com",
    projectId: "shop-db-84301",
    storageBucket: "shop-db-84301.appspot.com",
    messagingSenderId: "961144805866",
    appId: "1:961144805866:web:66497924fb83d4a0"
};


//Taking the userAuth object that comes in from the auth library and storing it into data base.
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; // If the userAuth document doesn't exist " === null" exit this function.

    const userRef = firestore.doc(`users/${userAuth.uid}`); // query into firestore for the userAuth document to see if it already exist + getting back the user reference object and...

    const snapShot = await userRef.get();// get back the snapShot "either with or without stored user object data"

    // if the snapshot data doesn't exist, we will create a new one using userRef data from "userAuth.uid" object.
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            alert('error creating user', error.message);
        }
    }

    return userRef; // return the userRef because it's needed it in other places.
};




firebase.initializeApp(config);

//  export this to anywhere you need to use anything related to authentication.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setting up the google authentication utility.

// this gives access to new google auth provider class from the authentication library. "takes custom parameter using the SetCustomParam method".
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'}); // this means to always trigger the google popup when whenever you use this google Auth provider for authentication and signing in.
export  const signInWithGoogle = () => auth.signInWithPopup(provider); // takes the provider class that I made "signInWithPopup takes many different types of popups" I use google.

export default firebase;