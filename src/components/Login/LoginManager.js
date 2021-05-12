import firebase from "firebase/app";
import "firebase/auth";
import React from 'react';
import '../Cart/FirebaseConfig';
import firebaseConfig from "../Cart/FirebaseConfig";

export const FirebaseConfigure = ()=>firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    //google handle
    export const signIn = () => {
        return firebase.auth().signInWithPopup(googleProvider)
        .then((res)=>{
            const {displayName, photoURL, email} = res.user;
            const newUser = {
                name: displayName,
                email,
                photoURL,
                password: '',
                isSignedIn: true,
                error:'',
            }
            return newUser;
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    export const signOut = () => {
        return firebase.auth().signOut()
        .then((res)=>{
            const newUser = {
                name: '',
                email: '',
                photoURL: '',
                password: '',
                isSignedIn: false,
                error:'',
                success: false
            }
            return newUser;
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    // fb handle
    export const fbSignIn = () =>{
        return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var user = result.user;
            return user;
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    export const createUserWithEmailAndPassword = (name, email, password) =>{
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in 
            const newUserInfo = res;
            newUserInfo.success = true;
            newUserInfo.error = '';
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
    }

    export const signUserWithEmailAndPassword = (email, password) =>{
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res;
            newUserInfo.success = true;
            newUserInfo.error = '';
            return newUserInfo;
        })
        .catch((error) => {
            var errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
    }
    const updateUserName = (name) =>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function() {
            console.log("Updated user info: " + name);
        }).catch(function(error) {
            console.log(error);
        });
    }
const LoginManager = () => {
    
    return (
        <div>
            
        </div>
    );
};

export default LoginManager;