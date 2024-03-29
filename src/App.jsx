import React from "react"
import MovieData from "./Components/MovieData"
import Navbar from "./Components/Navbar"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import WatchList from "./Components/WatchList"
import Home from "./Components/Home"
import Search from "./Components/Search"
import ViewMovie from "./Components/ViewMovie"
import ScrollToTop from "./Components/ScrollToTop"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AllReads from "./Components/AllReads"
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
 
  const {user} = useAuthContext()

  return (
    <>
    
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        
        <Routes>
          <Route
            path="/"
            element ={<Home />}
          />
          <Route
            path="/mywatchlist"
            element ={<WatchList />}
            />

          <Route
            path="/allreads"
            element ={<AllReads />}
            />

          <Route
           path="/search"
           element = {<Search />}
           />

          <Route
           path="/viewmovie"
           element = {<ViewMovie />}
           />

          <Route
           path="/login"
           element = {!user ? <Login /> : <Navigate to="/" /> }
           />

          <Route
           path="/signup"
           element = {!user ? <Signup /> : <Navigate to="/" />}
           />

        </Routes>
       

    </BrowserRouter>
   
    </>
  )
}

export default App
