import React from 'react'
import styles from './Register.module.css';
import { Formik , useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState('')

  async function sendRegisterDataToApi(values){
    setisLoading(true);
    let{data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).catch((err)=>{
      setisLoading(false);
      seterrMessage(err.response.data.errors.msg);
      console.log(err.response.data.errors.msg);
    });
    if(data.message === 'success'){
      setisLoading(false);
      navigate('/login')
    }
    console.log(data)
  }

  // function validate(values)
  // {
  //   let errors = {};
  //   if(!values.name)
  //   {
  //     errors.name = 'Name id Required';
  //   }
  //   else if(values.name.length < 3)
  //   {
  //     errors.name = 'Name minlength is 3';
  //   }

  //   if(!values.email)
  //   {
  //     errors.email = 'Email id Required';
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if(!values.password)
  //   {
  //     errors.password = 'Password id Required';
  //   }
  //   else if (!/^[A-Z][a-z0-9]{6,10}$/i.test(values.password)) {
  //     errors.password = 'Password must start with uppercase';
  //   }

  //   if(!values.rePassword)
  //   {
  //     errors.rePassword = 'rePassword id Required';
  //   }
  //   else if (values.rePassword !== values.password) {
  //     errors.rePassword = 'password and rePassword dont match';
  //   }

  //   if(!values.phone)
  //   {
  //     errors.phone = 'Phone id Required';
  //   }
  //   else if (!/^01[1205][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = 'Must be valid egyptian phone';
  //   }

  //   return errors;
  // }

  let myValidation = Yup.object({
    name:Yup.string().required('Name is required').min(3, 'Name minlength is 3').max(10 , 'Name maxlength is 10'),
    email:Yup.string().required('Email is required').email('Email invalid'),
    password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must start with upper case'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')] , 'rePaword dont matched'),
    phone:Yup.string().required('Phone is required').matches(/^01[1205][0-9]{8}$/ ,'phone invalid')

  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema:myValidation,
    // validate,
    onSubmit:sendRegisterDataToApi
  });
  return <>
<div className='w-75 mx-auto py-3'>
  <h2>Register Now</h2>
  {errMessage?<div className='alert alert-danger'>{errMessage}</div>:null}
  <form onSubmit={formik.handleSubmit}>

    <label htmlFor="name">Name :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className='mb-2 form-control' name='name' id='name' />
    {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:null}
    

    <label htmlFor="email">Email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='mb-2 form-control' name='email' id='email' />
    {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}

    <label htmlFor="password">Password :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='mb-2 form-control' name='password' id='password' />
    {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}

    <label htmlFor="rePassword">rePassword :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" className='mb-2 form-control' name='rePassword' id='rePassword' />
    {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}

    <label htmlFor="phone">Phone :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className='mb-2 form-control' name='phone' id='phone' />
    {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}

    {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
     :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white border-0' type='submit'>Regiser</button>}
  </form>
  </div>    
</>
}
