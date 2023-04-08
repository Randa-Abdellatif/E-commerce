import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';




export default function Cart() {
  let {getLoggedUserCart , updateProductCount , deleteCartItem , clearCartItem} = useContext(CartContext);

  const [cartDetails, setcartDetails] = useState(null);

  async function getCart(){
    let response = await getLoggedUserCart();
    console.log(response);
    setcartDetails(response.data)
  }
  async function deleteItem(productId){
    let response = await deleteCartItem(productId);
    console.log(response);
    setcartDetails(response.data)
  }

  async function clearItem(){
    let response = await clearCartItem();
    console.log(response);
    getCart()
    }

  async function updateCount(productId , count)
  {
    let response = await updateProductCount(productId , count);
    console.log(response);
    setcartDetails(response.data);
    toast('product count updated')
  }
  useEffect(()=>{
    getCart();
  },[])

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Shop Cart</title>
            </Helmet>
  {cartDetails? <div className='bg-main-light p-4 my-4'>
      <h5>Shop Cart</h5>
      <h6 className='text-main'>Total Price : {cartDetails.data.totalCartPrice} EGP</h6>
      <button onClick={clearItem} className='btn btn-sm'><i className='text-danger fa-regular fa-trash-can'> </i> Clear</button>
      {cartDetails.data.products.map((product,index)=><div key={index} className='row border-bottom py-2 my-2 align-items-center'>
        <div className="col-md-1">
          <img className='w-100' src={product.product.imageCover} alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div>
          <h6 className='fw-bolder'>{product.product.title} </h6>
          <h6 className='text-main'>{product.price} EGP</h6>
          <button onClick={()=>deleteItem(product.product._id)} className='btn btn-sm'><i className='text-danger fa-regular fa-trash-can'> </i> remove</button>

          </div>
          <div>
            <button onClick={()=>updateCount(product.product._id,product.count+1)} className='btn btn-sm border-main'>+</button>
            <span className='d-inline-block mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product._id,product.count-1)} className='btn btn-sm border-main'>-</button>

          </div>
          
          
        </div>
      </div>)}
    </div>:null}
    
    </>
}
