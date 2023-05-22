import { ReactElement, createContext, useContext } from "react";
import {initializeApp} from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCA_D5Jn1tN-cEFEHbDuZ7MjiC0JJZRwSU",
    authDomain: "testing-9b403.firebaseapp.com",
    projectId: "testing-9b403",
    storageBucket: "testing-9b403.appspot.com",
    messagingSenderId: "257362910760",
    appId: "1:257362910760:web:d7aba0efdb7861d01b5f1d",
    measurementId: "G-KWSGS3YWBS"
};
  
const firebaseApp = initializeApp(firebaseConfig)
const FirebaseContext = createContext(firebaseApp);

async function googleAuth(){
    try{
        const auth = getAuth();
        const authProvider = new GoogleAuthProvider()
        const result =  await signInWithPopup(auth, authProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token  = credential?.accessToken;
        const user = result.user;
  
      }catch(error){
        console.error(`${error}`)
      }
}

function useFirebaseContext(){
    const context = useContext(FirebaseContext);
    if(!context){
        throw Error(`UseFirebaseContext must be used within firebaeProvider`)
    }
    return context;
}

function FireBaseProvider({...props}){
    return <FirebaseContext.Provider value={firebaseApp} {...props}></FirebaseContext.Provider>
}

export {useFirebaseContext, FireBaseProvider}