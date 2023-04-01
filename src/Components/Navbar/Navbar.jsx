import React from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/freshcart-logo.svg'

export default function Navbar({userData , logOut}) {
  // console.log(userData)
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#"><img width={120} src={logo} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brand">Brands</Link>
        </li>

      </ul>:null}
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
        <i className='fab mx-2 fa-facebook'></i>
        <i className='fab mx-2 fa-twitter'></i>
        <i className='fab mx-2 fa-instagram'></i>
        <i className='fab mx-2 fa-tiktok'></i>
        <i className='fab mx-2 fa-linkedin'></i>
        <i className='fab mx-2 fa-youtube'></i>


        </li>
        {userData === null ?<>  <li className="nav-item">
        <Link className="nav-link" to="Login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="Register">Register</Link>
      </li></>:
       <li className="nav-item">
       <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
     </li>}
       

      </ul>
      
    </div>
  </div>
</nav>
    </>
}
