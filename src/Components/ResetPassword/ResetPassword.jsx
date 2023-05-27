import React, { useState } from 'react'
import styles from './ResetPassword.module.css';
import axios from 'axios';
import { useFormik } from 'formik';

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState('')

  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    onSubmit:resetPassword
  });

async function resetPassword(values){
    let x = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values)
.catch((err)=> err);
console.log(x);
return x 
}

  return <>
    <h2>ForgetPassword</h2>
    <div className='w-75 mx-auto py-3'>
  <h2>Reset Password Now</h2>
  {errMessage?<div className='alert alert-danger'>{errMessage}</div>:null}
  <form onSubmit={formik.handleSubmit}>
    

    <label htmlFor="email">Email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='mb-2 form-control' name='email' id='email' />
    {/* {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null} */}

    <label htmlFor="newPassword">new Password :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" className='mb-2 form-control' name='newPassword' id='newPassword' />
    {/* {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null} */}

    {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
     :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white border-0' type='submit'>Reset Password</button>}
  </form>
  </div>  
    </>
}
