const ENV = process.env;

const firebaseConfig =  {
    apiKey: ENV.REACT_APP_FIREBASE_API_KEY || '',
    authDomain: ENV.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: ENV.REACT_APP_FIREBASE_APP_ID || '',
    measurementId: ENV.REACT_APP_FIREBASE_MEASUREMENT_ID || ''
};

export { firebaseConfig }