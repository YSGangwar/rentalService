import './App.css'
import React from 'react'
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { AddCar } from './components/AddCar/AddCar' 
import { Navbar } from './components/NavbarComp/Navbar'
import { ProtectedRoutes } from './components/ProtectedRoute/ProtectedRoutes'
import { MyCars } from './components/MyCars/MyCars'
import { Explore } from './pages/Explore'
import { Unauthorized } from './pages/notAuth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
type Type = {
  userType:string,
}
function App() {
  const userType = useSelector((state:Type)=>state.userType);
  const queryClient = new QueryClient();
  console.log(userType);
  return (
    <>
    <QueryClientProvider client ={queryClient}>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      
      <Route element={<ProtectedRoutes/>}>

      <>
      {
      userType==="seller"  ?
      <>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addCar" element={ <AddCar/> } />
      <Route path="/mycars" element={ <MyCars/> } />
      <Route path="*" element={ <Unauthorized/>} />
      </>
      :
      <>
      <Route path="/explore" element={ <Explore />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Unauthorized/>} />
      {/* <Route path="*" element={<Unauthorized/> } /> */}
      </>

      }
      </>  
      </Route>
      <Route path="/notAuth" element={<Unauthorized/>}/>
      <Route path="/" element={<Home/> } />
      <Route path="/login" element={ <Login/>} />
      <Route path="/signup" element={ <Signup/>} />
     </Routes>
     </BrowserRouter>
     <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
    </>
  )
}

export default App;
