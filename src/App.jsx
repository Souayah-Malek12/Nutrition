import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Login"
import { Registre } from "./pages/Registre"
import ImcPage from "./pages/ImcPage"
import ImgPage from "./pages/ImgPage"
import RechercheAliment from "./pages/RechercheAliment"
import Home from "./pages/home"
import React from "react";
import ImcHistoric from "./pages/ImcHistoric"
import ImgHistoric from "./pages/ImgHistoric"
import Navbar from "./components/navbar"

function App() {

  return (
    <>
    <BrowserRouter >
    <Navbar />

     <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <Auth />} />
        <Route path="/registre" element={ <Registre />} />
        <Route path="/calcImc" element={ <ImcPage />} />
        <Route path="/calcImg" element={ <ImgPage />} />
        <Route path="/recherche" element={ <RechercheAliment />} />
        <Route path="/hiImc" element={ <ImcHistoric />} />
        <Route path="/hiImg" element={ <ImgHistoric />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
