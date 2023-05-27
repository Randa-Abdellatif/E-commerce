import React, { useState } from 'react'
import styles from './ForgetPassword.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState('');
  const [code, setcode] = useState(null);
  let nav =useNavigate();

  let formik = useFormik({
    initialValues:{
      email:'',
    },
    onSubmit:forgotPassword
  });

async function forgotPassword(values){
    let x = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values)
.catch((err)=> err);
console.log(x);
if(x.data.statusMsg == 'success'){setcode(x.data.statusMsg)}
return x 
}

let formikReset = useFormik({
  initialValues:{
    resetCode:'',
  },
  onSubmit:verifyResetCode
});

async function verifyResetCode(values){
  let x = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values)
.catch((err)=> err);
console.log(x);
if(x.data.status == "Success"){
  nav('/ResetPassword')
}
}

  return <>
    <h2>ForgetPassword</h2>
    <div className='w-75 mx-auto py-3'>
  <h2>Enter your email</h2>
  {errMessage?<div className='alert alert-danger'>{errMessage}</div>:null}
  <form onSubmit={formik.handleSubmit}>
    

    <label htmlFor="email">Email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='mb-2 form-control' name='email' id='email' />
    {/* {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null} */}

    {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
     :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white border-0' type='submit'>Send new password</button>}
  </form>

  {/* <h2>Verify Reset Code</h2> */}
  {code?<form className='mt-5' onSubmit={formikReset.handleSubmit}>
    

    <label htmlFor="resetCode">Verify Reset Code :</label>
      <input onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} value={formikReset.values.resetCode} type="password" className='mb-2 form-control' name='resetCode' id='resetCode' />
      {/* {formikReset.errors.email && formikReset.touched.email?<div className="alert alert-danger">{formikReset.errors.email}</div>:null} */}
  
      {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
       :<button disabled={!(formikReset.isValid && formikReset.dirty)} className='btn bg-main text-white border-0' type='submit'>Send</button>}
    </form>:null}
  
  </div>  
    </>
}
