import './App.css';
import React from 'react';
import DndBoard from './components/DndBoard.tsx';
import ButtonUpload from './components/ButtonUpload';
import ButtonDraw from './components/ButtonDraw';
import InputYoutube from './components/InputYoutube.tsx';

function App() {
  return (
    <div className="App">
      <DndBoard />
      <InputYoutube />
      <ButtonUpload />
      <ButtonDraw />
    </div>
  );
}

export default App;