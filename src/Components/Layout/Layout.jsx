import React from 'react'
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";

export default function Layout({userData , setUserData}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')
  }

  return <>
  <div className='pt-5'>
  <Navbar logOut={logOut} userData={userData}/>
  <Outlet></Outlet>
  <div className='network'>
    {/* <Online>Only shown when you're online</Online> */}
    <Offline>Only shown offline (surprise!) <i className='fas fa-wifi'></i></Offline>
  </div>
  <Footer/>
  </div>
  
    </>
}
