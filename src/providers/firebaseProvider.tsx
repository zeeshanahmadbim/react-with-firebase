import { ReactElement, createContext, useContext, useEffect, useState } from "react";
import {FirebaseApp, initializeApp} from 'firebase/app';
import { GoogleAuthProvider, UserCredential, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCA_D5Jn1tN-cEFEHbDuZ7MjiC0JJZRwSU",
    authDomain: "testing-9b403.firebaseapp.com",
    projectId: "testing-9b403",
    storageBucket: "testing-9b403.appspot.com",
    messagingSenderId: "257362910760",
    appId: "1:257362910760:web:d7aba0efdb7861d01b5f1d",
    measurementId: "G-KWSGS3YWBS"
};

type UserProps = UserCredential['user'] | null | undefined;

type GoogleAuthProps = {
    user: UserCredential['user'],
    accessToken: string | undefined,
} | undefined;

type ContextProps = {
    firebaseApp: FirebaseApp,
    googleAuth:  ()=> Promise<GoogleAuthProps>,
    currentUser: UserProps
}
  
const firebaseApp = initializeApp(firebaseConfig)
const FirebaseContext = createContext<ContextProps>({firebaseApp, googleAuth, currentUser: null});

async function googleAuth(): Promise<GoogleAuthProps>{
    try{
        const auth = getAuth();
        const authProvider = new GoogleAuthProvider()
        const result =  await signInWithPopup(auth, authProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken  = credential?.accessToken;
        const user = result.user;

        return {user, accessToken}
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

function useGoogleAuth(){
    const context =  useFirebaseContext();
    return context.googleAuth;

}

function useGetAuth(){
    return getAuth();
}

function handleSignOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("SignOut done!!!")
    }).catch((error) => {
        console.log("Something went wrong.")
    });
}


function FireBaseProvider({...props}){
    const [currentUser, setCurrentUser] = useState<UserProps>();

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth,handleAuthStateChange)

    },[])

    function handleAuthStateChange(user: UserProps){
        if(user){
            setCurrentUser(user)
        }else{
            console.log("User is logged out.")
        }
    }

    return <FirebaseContext.Provider value={{firebaseApp, googleAuth, currentUser}} {...props}></FirebaseContext.Provider>
}

export {useFirebaseContext, FireBaseProvider, useGoogleAuth, useGetAuth, handleSignOut}