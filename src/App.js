import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
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
              <Navigation />
              <HomePage />
              <StateList />
            </>
          )}
        />
        <Route
          path="/state/:id"
          element={(
            <>
              {' '}
              <Navigation />
              <StateDetails />
            </>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
