import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup, signOut } from "firebase/auth"
import { config } from "../config";
import { FirebaseApp, initializeApp } from "firebase/app";
import { DocumentData, DocumentSnapshot, FirestoreDataConverter, SnapshotOptions, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import { Task } from "../data-mappers";

type GoogleAuthProps = {
    user: UserCredential['user']
    accessToken: string | undefined
} | undefined;

let firebaseApp: FirebaseApp;

function getFirebaseApp(){
    if(firebaseApp) return firebaseApp;

    const {firebaseConfig} = config;
    firebaseApp = initializeApp(firebaseConfig)

    return firebaseApp;
}

function getDbRef(){
  const app = getFirebaseApp();
  const db  = getFirestore(app);
  return db;
}

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

function handleSignOut () {
  const auth = getAuth()
  signOut(auth).then(() => {
    // Event listener is being managed in /providers/firebaseProvider.tsx
    console.log('SignOut done!!!')
  }).catch((error) => {
    console.log('Something went wrong.')
  })
}

function dataConvertor<T>(): FirestoreDataConverter<T>{
  function toFirestore(data: T): DocumentData{
    return data as DocumentData;
  }

  function fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions){
    const data = snapshot.data();
    return {id: snapshot.id, ...data} as T
  }

  return {toFirestore, fromFirestore}
}

async function getDocumentByRef<T>(collection: string, docRef: string):Promise<T | undefined>{
  const dbRef = getDbRef();
  const docSnap = await getDoc(doc(dbRef, collection, docRef).withConverter(dataConvertor<T>()));
  if(docSnap.exists()){
    return docSnap.data();
  }
  throw new Error("No Data found.");
}

async function getDocumentList<T>(collectionName: string):Promise<T[]>{
  const collectionRef = collection(getDbRef(), collectionName);
  const queryRef = query(collectionRef).withConverter(dataConvertor<T>());
  const docsRef = await getDocs(queryRef)
  const data: Array<T> = [];
  docsRef.forEach((doc)=>{
    data.push(doc.data())
  });

  return data;
}

async function updateDocumentByRef(collectionName: string, id: string, data: any){
  const docRef = doc(getDbRef(), collectionName, id);
  return await updateDoc(docRef, data)
}

export type { GoogleAuthProps }
export { googleAuth, getFirebaseApp, handleSignOut, getDbRef, dataConvertor, getDocumentByRef, getDocumentList, updateDocumentByRef }
  