import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import { useState } from 'react'



function App() {
 const [searchQuery,setSearchQuery] = useState('');

  return ( 
    <div className='w-full '>   
      <BrowserRouter>
      <Navbar setSearchQuery={setSearchQuery}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery}/>} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
