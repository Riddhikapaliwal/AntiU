import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router";
import './App.css'
import Login from './pages/auth/login.jsx';
import Signup from './pages/auth/signup.jsx';
import ProfileSetup from './pages/profileSetup.jsx';
import Home from './pages/home.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="login" element={<Login />} />    
        <Route path="signup" element={<Signup />} />


        <Route path="/profileSetup" element={
          // <ProtectedRoute>
          <ProfileSetup />
          // </ProtectedRoute>
        }/>  

        <Route path="/home" element={
          <ProtectedRoute>
          <Home/>
          </ProtectedRoute>} /> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
