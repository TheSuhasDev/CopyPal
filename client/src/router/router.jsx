import React from 'react'
import { Routes, Route } from 'react-router'
import Login from '../pages/login'
import DisplayNotes from  '../pages/displayNotes'
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/displayNotes/:id' element={<DisplayNotes/>}/>
      </Routes>
    </div>
  )
}

export default Router