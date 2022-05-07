import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import ToDo from '../pages/ToDo'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/todolist' element={<ToDo/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter