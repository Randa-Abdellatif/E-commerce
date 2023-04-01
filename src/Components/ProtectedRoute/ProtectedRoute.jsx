import React from 'react'
import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {

  // console.log(props.children);
  if(localStorage.getItem('userToken') == null)
  {
    return <Navigate to={'/login'} />
  }
  else{
    return props.children;
  }
  return <>
    <h2>ProtectedRoute</h2>
    </>
}
