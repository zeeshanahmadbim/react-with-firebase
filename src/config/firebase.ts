
const ENV = process.env;

const firebaseConfig_NeedToLookInto =  {
    apiKey: ENV.REACT_APP_FIREBASE_API_KEY || '',
    authDomain: ENV.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: ENV.REACT_APP_FIREBASE_APP_ID || '',
    measurementId: ENV.REACT_APP_FIREBASE_MEASUREMENT_ID || ''
};

const firebaseConfig = {
    apiKey: 'AIzaSyCA_D5Jn1tN-cEFEHbDuZ7MjiC0JJZRwSU',
    authDomain: 'testing-9b403.firebaseapp.com',
    projectId: 'testing-9b403',
    storageBucket: 'testing-9b403.appspot.com',
    messagingSenderId: '257362910760',
    appId: '1:257362910760:web:d7aba0efdb7861d01b5f1d',
    measurementId: 'G-KWSGS3YWBS'
  }

export { firebaseConfig }