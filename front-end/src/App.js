import './App.css';
import React from 'react';
import DndBoard from './components/DndBoard.tsx';
import ButtonUpload from './components/ButtonUpload';

function App() {
  return (
    <div className="App">
      <DndBoard/>
      <ButtonUpload/>
    </div>
  );
}

export default App;