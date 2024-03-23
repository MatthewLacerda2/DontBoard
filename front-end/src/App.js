import './App.css';
import React from 'react';
import DndBoard from './Pages/DndBoard'
import ButtonUpload from './components/ButtonUpload';
import ButtonDraw from './components/ButtonDraw';

function App() {
  return (
    <div className="App">
      <DndBoard/>
      <ButtonUpload />
      <ButtonDraw />
    </div>
  );
}

export default App;