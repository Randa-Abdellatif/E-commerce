import React, { useContext } from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/freshcart-logo.svg'
import { CounterContext } from '../../Context/CounterContext';
import { CartContext } from '../../Context/CartContext';


export default function Navbar({userData , logOut}) {
  let { numOfCartItem} = useContext(CartContext);

  return <>
    <nav className="navbar navbar-expand-lg bg-body fixed-top">
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
          <Link className="nav-link" to="Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Categories">Categories</Link>
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
      <>
      <li className="nav-item position-relative">
      <Link className="nav-link px-2 " to="Cart">
        <i className='fas fa-shopping-cart fa-lg'></i>
      <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfCartItem}</span>
       </Link>
    </li>
      <li className="nav-item position-relative">
      <Link className="nav-link px-2 " to="Wishlist">
      <i className="fa-solid fa-heart fa-lg" style = {{color:"#e90707"}}></i> 
      {/* <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfCartItem}</span> */}
       </Link>
    </li>
    <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            update
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="UpdatePassword">update password</Link></li>
            <li><Link className="dropdown-item" to="UpdateData">update data</Link></li>
          </ul>
        </li>
    <li className="nav-item">
       <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
     </li>
    
    </>
       }
       

      </ul>
      
    </div>
  </div>
</nav>
    </>
}
