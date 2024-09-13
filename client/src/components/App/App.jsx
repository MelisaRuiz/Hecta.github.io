import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import '../App/App.css';
import Registro from '../Registro/Registro';

function App() {
  return (
    <div class="App">
      <Sidebar />
      <Registro class="Registro"/>
    </div>
  );
}

export default App;