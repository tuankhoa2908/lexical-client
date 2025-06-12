import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';

import DragDropImage from './pages/Drag_Drop_Image';
import PreviewQuestion from './pages/PreviewQuestion/index.jsx';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />

          <Route path='/drag-drop-image' element={<DragDropImage />} />
          <Route path='/preview-question' element={<PreviewQuestion />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
