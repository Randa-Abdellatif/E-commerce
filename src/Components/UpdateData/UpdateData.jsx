import React, { useContext, useState } from 'react'
import styles from './UpdateData.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
export default function UpdateData() {

  const [isLoading, setisLoading] = useState(false);
  const [errMessage, seterrMessage] = useState('');
  const [Message, setMessage] = useState('');

  let{headers}=useContext(CartContext);

  let formik = useFormik({
    initialValues:{
      name: "",
      email: "",
      phone: ""
    },
    onSubmit:UpdateData
  });

  async function UpdateData(values){
    setisLoading(true)
console.log(values)
    let x = await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/updateMe/`,
    values,
    {headers}
    )
.catch((err)=> {
  console.log(err.response.data.message);//
  seterrMessage(err.response.data.errors.msg); 
  setMessage(null);
  setisLoading(false);
});

console.log(x);
setMessage(x.data.message);
seterrMessage(null);
setisLoading(false)

}

  return <>
    <h2>UpdateData</h2>
    <div className='w-75 mx-auto py-3'>
    {errMessage?<div className='alert alert-danger'>{errMessage}</div>:null}
    {Message?<div className='alert alert-info'>{Message}</div>:null}

  <form onSubmit={formik.handleSubmit}>

    <label htmlFor="name">name :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className='mb-2 form-control' name='name' id='name' />
    {/* {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null} */}

    <label htmlFor="email">email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='mb-2 form-control' name='email' id='email' />
    
    <label htmlFor="phone">phone :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className='mb-2 form-control' name='phone' id='phone' />

    {isLoading? <button className='btn bg-main text-white border-0' type='button'><i className='fas fa-spinner fa-spin'></i></button>
     :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white border-0' type='submit'>update data</button>}
  </form>
  
  </div>  
    </>
}
