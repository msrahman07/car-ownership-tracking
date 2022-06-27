import React from 'react';
import './App.css';
import NewPerson from './components/persons/NewPerson';
import Persons from './components/persons/Persons';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NewCar from './components/cars/NewCar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <header className="heading"><h6>Car Ownership Tracker</h6></header>
      <br />
      <div className="container">
        <div className="sec">
          <div className="row">
            <div className="col">
              <NewPerson />
            </div>
            <div className="col">
              <NewCar />
            </div>
          </div>
        </div>
        <Persons />

      </div>
    </Provider>

  );
}

export default App;
