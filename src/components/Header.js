import React, { useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContent } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";



const Header = () => {
  // const[check]
  const { user } = useContext(UserContent);
  // const { setUser } = useContext(UserContent);
  // <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //     </Routes>
  const navigate = useNavigate();
  function login() {
    navigate('/login');
  }
  function signUp() {
    navigate('/register');
  }
  function logout() {
    navigate('/:id');
  }
  return (

    <div>
      <header className="heading">
        <nav id="navbar">
          <ul className="menu">
            <li id="logo" title="Made by Johnny Stiwerson">
              <p>PHIM HAY</p>
            </li>
            <li
              id="trigram"
              tabindex="-1"
              title="CLICK ME!&#10I WORK WITHOUT JS :)"
            >
              <div>&#9776</div>
            </li>
            <span id="responsive-menu">
              <ul className="menu">
                <li className="menu-option">
                  <p><Link to="/" style={{ color: "white", textDecoration: "none" }}>Trang chủ</Link></p>
                </li>
                <li id="sign-in">
                  {
                    user?.role != null ? <button style={{ border: 'none' }}>user:{user?.role}: {user?.name}</button> : <button onClick={login} style={{ alignItem: "center", border: 'none', justifyContent: "center", backgroundColor: "#CBBFE6", fontWeight: "Bold", color: "#5A5566" }}>Đăng Nhập</button>
                  }

                </li>
                <li id="sign-up">
                  {
                    user?.role != null ? <button onClick={logout} style={{ alignItem: "center", border: 'none', justifyContent: "center", backgroundColor: "#CBBFE6", fontWeight: "Bold", color: "#5A5566" }}>Đăng Xuất</button> : <button onClick={signUp} style={{ alignItem: "center", border: 'none', justifyContent: "center", backgroundColor: "#CBBFE6", fontWeight: "Bold", color: "#5A5566" }}>Đăng Ký</button>
                  }


                </li>
              </ul>
            </span>
          </ul>
        </nav>
      </header>

    </div>

  );
};

export default Header;
