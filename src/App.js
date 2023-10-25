import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage';
import StateList from './components/StateList';
import StateDetails from './components/StateDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <>
              <HomePage />
              <StateList />
            </>
          )}
        />
        <Route path="/state/:id" element={<StateDetails />} />
      </Routes>
    </div>
  );
}

export default App;
