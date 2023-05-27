import React, { useContext } from 'react'
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';


export default function Checkout() {
  let{CreateCashOrder,onlinePayment , cardId} = useContext(CartContext);

  async function handleSubmit(values){
    let response = await onlinePayment(cardId,values);
    if(response?.data?.status === 'success' ){
      
      console.log(response.data.session.url);
      window.location.href = response.data.session.url;
    }
    console.log(response);
  }

  async function CreateCashOrderSubmit(values){
    let response = await CreateCashOrder(cardId,values);

  }

  let formik = useFormik({
    initialValues:{
      details :'',
        phone: "",
        city: ""
    },
    onSubmit:handleSubmit
  })

  return <>
    <div className='w-50 py-5 mx-auto'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">details :</label>
        <input type="text" className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} name='details' id='details'/>

        <label htmlFor="phone">phone :</label>
        <input type="tel" className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone'/>

        <label htmlFor="city">city :</label>
        <input type="text" className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} name='city' id='city'/>

        <button type='submit' className='btn border-main w-100'>Pay</button>
      </form>
    </div>
    </>
}
