import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LexicalEditor from './pages/LexicalEditor';
import FillBlank from './pages/FillBlank';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/lexical-editor' element={<LexicalEditor />} />
          <Route path='/fill-blank' element={<FillBlank />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
