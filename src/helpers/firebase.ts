import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup, signOut } from "firebase/auth"
import { config } from "../config";
import { FirebaseApp, initializeApp } from "firebase/app";
import {  DocumentData, DocumentSnapshot, FirestoreDataConverter, SnapshotOptions, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc } from "firebase/firestore";

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

function getCollectionRef(collectionName: string){
  return collection(getDbRef(), collectionName);
}

function getDocRef(collectionName: string, id: string){
  return doc(getDbRef(), collectionName, id);
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

async function upsertDocument(collectionName: string, data: any){
  const action = data.id ? updateDocument : newDocument;
  return await action(collectionName, data);
}

async function updateDocument(collectionName: string, data: any){
  const docRef = getDocRef(collectionName, data.id);
  return await updateDoc(docRef, data)
}

async function newDocument(collectionName: string, data: any){
  delete data['id']
  try {
    return await addDoc(getCollectionRef(collectionName), data);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function removeDoc(collectionName: string, id: string){
  await deleteDoc(getDocRef(collectionName,id))
}

export type { GoogleAuthProps }
export { googleAuth, getFirebaseApp, handleSignOut, getDbRef, dataConvertor, getDocumentByRef, getDocumentList, removeDoc, upsertDocument }
  