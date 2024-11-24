import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdFavorite } from 'react-icons/md'; 
import './Navbar.css'; 
import { useContext, useEffect, useState } from 'react';
import { FaFilm } from 'react-icons/fa'; // Import an icon

import { langContext } from '../../context/lang';
import { EN } from "../../Lang/En";
import { AR } from "../../Lang/Ar";


export default function Navbarr() {
  
  const counter = useSelector((state) => state.fave.counter); 
  const { lang, setLang } = useContext(langContext);
// console.log(lang);

//  const translation={en:EN,ar:AR};
const [translate, setTranslate] = useState({});

useEffect(() => {

  setTranslate(lang == "En" ? EN : AR);

}, [lang]);


  // console.log(translate);
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark" sticky="top">
      <Container>
        <div className="d-flex align-items-center">
          <span className="lang-info">{translate.changeLanguage}</span>
          <button 
            onClick={() => setLang(lang === "En" ? "ar" : "En")} 
            className="lang-toggle-btn"
          > 
            {lang === "En" ? "Arabic" : "English"}
          </button>
        </div>

        <Navbar.Brand className="navbar-brand d-flex  align-items-center">
          <FaFilm className="me-2" />
          {translate.aboda_movies}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/Home" className="nav-link text-light fs-5">
              {translate.movies}
            </NavLink>
            <NavLink to="/series" className="nav-link text-light fs-5">
              {translate.series}
            </NavLink>
            <NavLink to="/Favourite" className="nav-link text-light fs-5 d-flex align-items-center">
              <MdFavorite className="me-2" />
              {translate.favourite}
              {counter > 0 && (
                <span className="badge bg-warning text-dark ms-2">{counter}</span>
              )}
            </NavLink>
            <NavLink to="/login" className="nav-link text-light fs-5">
              {translate.login}
            </NavLink>
            <NavLink to="/Register" className="nav-link text-light fs-5">
              {translate.register}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}