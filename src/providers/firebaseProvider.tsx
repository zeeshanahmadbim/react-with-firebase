import { createContext, useContext, useEffect, useState } from 'react'
import { type FirebaseApp } from 'firebase/app'
import { GoogleAuthProvider, type UserCredential, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProps, getFirebaseApp } from '../helpers/firebase';


type UserProps = UserCredential['user'] | null | undefined


type ContextProps = {
  firebaseApp: FirebaseApp
  googleAuth: () => Promise<GoogleAuthProps>
  currentUser: UserProps
}

const firebaseApp = getFirebaseApp();
const FirebaseContext = createContext<ContextProps>({ firebaseApp, googleAuth, currentUser: null })

async function googleAuth (): Promise<GoogleAuthProps> {
  try {
    const auth = getAuth()
    const authProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, authProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const accessToken = credential?.accessToken
    const user = result.user

    return { user, accessToken }
  } catch (error) {
    console.error(`${error}`)
  }
}

function useFirebaseContext () {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw Error('UseFirebaseContext must be used within firebaeProvider')
  }
  return context
}

function useGoogleAuth () {
  const context = useFirebaseContext()
  return context.googleAuth
}

function useGetAuth () {
  return getAuth()
}

function FireBaseProvider ({ ...props }) {
  const [currentUser, setCurrentUser] = useState<UserProps>()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, handleAuthStateChange)
  }, [])

  function handleAuthStateChange (user: UserProps) {
    setCurrentUser(user)
  }

  return <FirebaseContext.Provider value={{ firebaseApp, googleAuth, currentUser }} {...props}/>
}

export { useFirebaseContext, FireBaseProvider, useGoogleAuth, useGetAuth }
