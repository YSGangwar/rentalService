import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Navbar } from './components/NavbarComp/Navbar'
import { ProtectedRoutes } from './components/ProtectedRoute/ProtectedRoutes'
function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route element={<ProtectedRoutes/>}>
      <Route path="/dashboard" element={ <Dashboard/> }/>
      </Route>
      <Route path="/" element={<Home/> } />
      <Route path="/login" element={ <Login/>} />
      <Route path="/signup" element={ <Signup/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
