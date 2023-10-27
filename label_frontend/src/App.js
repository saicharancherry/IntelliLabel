import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from './components/HomePage';
import DropImages from './components/DropImages';
import NewProject from './components/NewProject';
import ImageViewer from './components/ObjectAnnotation';
import ObjectAnnotation from './components/ObjectAnnotation';
import GalleryPage from './components/Gallery';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/get-started' element={<DropImages/>}/>
          <Route path='/new-project' element={<NewProject/>}/>
          {/* <Route path='/object-annotation' element={<ImageViewer/>}/> */}
          <Route path='/object-annotation/:imageIndex' element={<ObjectAnnotation/>}/>
          <Route path='/gallery-page' element={<GalleryPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;