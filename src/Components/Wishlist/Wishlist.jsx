import React, { useContext, useEffect, useState } from 'react'
import styles from './Wishlist.module.css';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';

export default function Wishlist() {
  let{wishlistDetails, setwishlistDetails,removeProductFromWishlist,getLoggedUserWishlist}=useContext(CounterContext);
 

  async function getWishlist(){
        let response = await getLoggedUserWishlist();
        console.log(response.data);
        if(response.data.status == "success"){
          setwishlistDetails(response.data);
          console.log(wishlistDetails);
        }
        
    }

    async function deleteFav(productId){
      let responese = await removeProductFromWishlist(productId);
      console.log(responese);
      getWishlist();
    }

    useEffect(()=>{
      getWishlist();
     
  } , []);
  const [toggle, setToggle] = useState(true)

  return <>
  <button 
            onClick={() => setToggle(!toggle)} 
            className="btn btn-primary mb-5">
          Toggle State
      </button>
      {!toggle &&(
        <i onClick={() => setToggle(!toggle)}  className="fa-regular fa-heart fa-2x" style = {{color:"#e90707"}}></i>
      )}
      
      {toggle && (
       <i onClick={() => setToggle(!toggle)} className="fa-solid fa-heart fa-2x" style = {{color:"#e90707"}}></i>
      )}
  <div className='bg-main-light p-4 my-4'>
  <h2>Wishlist</h2>
  {wishlistDetails?.data.map((product,index)=><div key={index} className='row border-bottom py-2 my-2 align-items-center'>
  <div className="col-md-1">
          <img className='w-100' src={product.imageCover} alt="" />
        </div>

        <div className="col-md-11 d-flex justify-content-between">
          <div>
          <h6 className='fw-bolder'>{product.title} </h6>
          <h6 className='text-main'>{product.price} EGP  </h6>
          <p><i className="fa-solid fa-star text-main"></i> {product.ratingsAverage}</p>
          <button onClick={()=>deleteFav(product._id)}   className='btn btn-sm'><i className='text-danger fa-regular fa-trash-can'> </i> remove</button>

          </div>
          
          
        </div>
  </div>)}
  </div>
    
    </>
}
