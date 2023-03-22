import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './containers/home/home';
import { Register } from './containers/register/register';
import { Start } from './containers/start/start';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
