import { Layout, TodoList } from './features';
import './App.css';
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { FireBaseProvider } from './providers/firebaseProvider';


function App() {

  async function authWithFirebase(){
    
    

  }

  return (
    <div className="App">
      <FireBaseProvider>
        <Layout>
          <TodoList/>
        </Layout>
      </FireBaseProvider>
    </div>
  );
}

export default App;
