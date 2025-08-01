import './scss/app.scss'
import logo from '../src/assets/logo.png'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
// import Formulario from './components/formulario'
// import { useState } from 'react'z
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterDay from './components/RegisterDay'


function App() {
  return (
    <div className='contenedor'>        
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/registerDay' element={<RegisterDay />}/>
        </Routes>
      </Router> 
    </div>
  )
}

export default App
