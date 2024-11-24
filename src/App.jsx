import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Login from './components/LOgin/Login'
import Navbarr from './components/Navbar/Navbar'
import Register from './components/register/register'
import Home from './components/Home/Home'
import Details from './components/Details/Details'
import Favourite from './components/Favourite/Favourite'
// import {Provider} from './react-redux'
import { Provider } from 'react-redux';
import { store } from './components/Store/Store'
import { LangProvider } from './context/lang'
import { useState } from 'react'
// import { EN } from "./Lang/En";
// import { AR } from "../../Lang/AR";
import Series from './components/Series/Series';
import SeriesDetails from './components/Series/SeriesDetails';

function App() {






  const [lang ,setLang]=useState("En")
  // const translation={en:En};

  return (
    <>



   
     <Provider store={store}>
      
    <LangProvider value={{lang,setLang}}> 
    

      <BrowserRouter>
      <Navbarr/>
<div className='m-5'>
      <Routes>

      <Route path='/' element={<Home />}/>
      <Route path='/Home' element={<Home />}/>
      <Route path='/series' element={<Series />}/>
      <Route path='/series/:id' element={<SeriesDetails />}/>
      <Route path='/Favourite' element={<Favourite />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Register' element={<Register />}/>
      <Route path='/Details/:id' element={<Details />}/>

      </Routes>
      </div>
      
      <Footer/>


      </BrowserRouter>
      </LangProvider>
      </Provider>
       
    </>
  )
}

export default App
