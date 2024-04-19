import React from 'react';
import MainComponent from './MainComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <>
      <header>
        <h1>react-flask-mysql App Template</h1>
      </header>
      <div className="main-container">
        <main>
          <MainComponent/>
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </footer>
      </div>
      </>
    );
}

export default App;