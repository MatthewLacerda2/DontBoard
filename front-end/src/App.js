import './App.css';
import React from 'react';
import DndBoard from './components/DndBoard.tsx';
import ButtonUpload from './components/ButtonUpload';
import ButtonDraw from './components/ButtonDraw';

function App() {
  return (
    <div className="App">
      <DndBoard />
      <ButtonUpload />
      <ButtonDraw />
    </div>
  );
}

export default App;