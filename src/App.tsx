import { Layout, TodoList } from './features';
import { FireBaseProvider } from './providers/firebaseProvider';

import './App.css';


function App() {

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
