import React, { useContext, useState } from 'react'
import styles from './UpdatePassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';

export default function UpdatePassword() {
  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState('');

  let{headers}=useContext(CartContext);

  let formik = useFormik({
    initialValues:{
      currentPassword:"",
    password:"",
    rePassword:""
    },
    onSubmit:UpdatePassword
  });

  async function UpdatePassword(values){
console.log(values)
    let x = await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword`,
    values,
    {headers}
    )
.catch((err)=> err);
console.log(x);

}

  return <>
    <h2>UpdatePassword</h2>
    <div className='w-75 mx-auto py-3'>
    {errMessage?<div className='alert alert-danger'>{errMessage}</div>:null}

  <form onSubmit={formik.handleSubmit}>

    <label htmlFor="currentPassword">currentPassword :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currentPassword} type="password" className='mb-2 form-control' name='currentPassword' id='currentPassword' />
    {/* {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null} */}

    <label htmlFor="password">password :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='mb-2 form-control' name='password' id='password' />
    
    <label htmlFor="rePassword">rePassword :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" className='mb-2 form-control' name='rePassword' id='rePassword' />

    {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
     :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white border-0' type='submit'>update password</button>}
  </form>
  
  </div>  
    </>
}
