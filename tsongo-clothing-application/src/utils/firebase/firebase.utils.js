import {initializeApp } from "firebase/app"
import {
getAuth,
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
}from "firebase/auth";
import {
getFirestore,
doc,
getDoc,
setDoc,
}from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyA7JgVcFvYaYMjjGHZBtVVf6N9wPDz2VKM",
    authDomain: "tsongo-app-db.firebaseapp.com",
    projectId: "tsongo-app-db",
    storageBucket: "tsongo-app-db.appspot.com",
    messagingSenderId: "756588304849",
    appId: "1:756588304849:web:7e8604ba54c402c31f28f0" 
  };
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider=new GoogleAuthProvider();
  googleProvider.setCustomParameters({
  prompt:"select_account" //order anyone signing in with google to select an account
  });
  export const auth=getAuth();
  export const signInWithGooglePopup=()=>
  signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect=()=>
  signInWithRedirect(auth,googleProvider);
  export const db=getFirestore(); //nistatiate the database
  export const createUserDocumentFromAuth=async(
  userAuth,
  additionalInformation={}
  )=>{
  if(!userAuth) return;
  const userDocRef=doc(db,'users',userAuth.uid);
  const userSnapshop=await getDoc(userDocRef);
  if(!userSnapshop.exists()){
  const {displayName,email}=userAuth;
  const createdAt=new Date();
  try{
  await setDoc(userDocRef,{
  displayName,
  email,
  createdAt,
  ...additionalInformation
  });
  }catch(error){
  console.log('error creating user',error.message)
  }  
  }
  return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword=async (email,password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password); 
  }
//sign in with email and password
  export const signInAuthUserWithEmailAndPassword=async (email,password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password); 
  }

  export const signOutUser=async ()=>await signOut(auth);