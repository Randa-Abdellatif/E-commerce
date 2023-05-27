import React from 'react'
import styles from './Login.module.css';
import { Formik , useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login({saveUserData}) {

  // console.log(props.saveUserData)

  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState('')

  async function sendLoginDataToApi(values){
    setisLoading(true);
    let{data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin` , values).catch((err)=>{
      setisLoading(false);
      console.log(err.response.data.message);
      seterrMessage(err.response.data.message);
    });
    if(data.message === 'success'){
      localStorage.setItem('userToken' , data.token);
      saveUserData();
      setisLoading(false);
      navigate('/')
    }
    // console.log(data)
  }

  
  let validationSchema = Yup.object({
    email:Yup.string().required('Email is required').email('Email invalid'),
    // password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must start with upper case'),

  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit:sendLoginDataToApi
  });
  
  return <>
<div className='w-75 mx-auto py-3'>
  <h2>Login Now</h2>
  {errMessage?<div className='alert alert-danger'>{errMessage}</div>:null}
  <form onSubmit={formik.handleSubmit}>
    

    <label htmlFor="email">Email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='mb-2 form-control' name='email' id='email' />
    {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}

    <label htmlFor="password">Password :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='mb-2 form-control' name='password' id='password' />
    {/* {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null} */}

    {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
     :<>
     <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white border-0' type='submit'>Login</button>
     <Link to="ForgetPassword" className='btn bg-main text-white border-0'>Forget password</Link>
     </>}
  </form>
  </div>    
</>
}
