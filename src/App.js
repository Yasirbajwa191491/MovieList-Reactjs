import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Error from "./components/Error"
import Footer from './components/Footer'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='*' element={<Error />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App