import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getFirestore, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDDKsIihRLOSFLxi5r62JGkVw21EjPmffQ",
  authDomain: "note-project-e9c7c.firebaseapp.com",
  projectId: "note-project-e9c7c",
  storageBucket: "note-project-e9c7c.firebasestorage.app",
  messagingSenderId: "46151994143",
  appId: "1:46151994143:web:8c0fca08326e585e9c3e2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export const HandleNewUser = async (email, password, firstName, lastName, check)=> {

    const request = await createUserWithEmailAndPassword(auth, email, password)
    const user = request.user;

    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: email,
      altEmail: '',
      firstName: firstName,
      lastName: lastName,
      check: check,
      userName: '',
      city: '',
      gender: '',
      dob: '',
      maritalStatus: '',
      age: '',
      country: '',
      state: '',
      address: '',
      contactNumber: '',
      url: '',
      language: {
        english: '',
        french: '',
        spanish: '',
        arabic: '',
        italian: ''
      },
      facebook: '',
      twitter: '',
      google: '',
      instagram: '',
      youtube: ''
    })
    return user

}

export const HandleSignIn = async (email, password)=> {
  const user = await signInWithEmailAndPassword(auth, email, password)
  console.log(user)
  return user;
}
export const HandleSignOut = async ()=> {
  await signOut(auth)
}