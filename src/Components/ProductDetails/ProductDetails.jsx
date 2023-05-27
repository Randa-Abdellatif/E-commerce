import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';



export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let params = useParams();
  let {addToCart ,setNumOfCartItem} = useContext(CartContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getProductDetails(id)
  {
    setisLoading(true);
    let{data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
    setProductDetails(data.data);
    setisLoading(false)
  }
   
  async function addProductToCart(){
    let response = await addToCart(params.id);
    console.log(response);
    if(response.data.status == "success"){
      setNumOfCartItem(response.data.numOfCartItems);
      toast.success(response.data.message , { position: 'bottom-left', duration: 1000 , className: 'text-center border border-success' });
    } else{
      toast.error('Error Adding product');
    }
  }

  useEffect(()=>{
    getProductDetails(params.id)
  } , [])
  return <>
  <div className='row justify-content-center align-items-center py-3'>
    {isLoading?
    <div className='text-center'> <i className='fas fa-3x fa-spinner fa-spin text-main  '></i></div>:
    <>
    <div className="col-md-4">
    <Slider {...settings}>
     {productDetails?.images.map((img,index)=> <img key={index} src={img}/>)}
    </Slider>
    </div>
    <div className="col-md-8">
      <h3>{productDetails?.title}</h3>
      <p className='text-muted p-2'>{productDetails?.description}</p>
      <div className='d-flex justify-content-between'>
            <span className='text-muted'>{productDetails?.price} EGP</span>
            <span> <i className='fas fa-star rating-color'></i>
            {productDetails?.ratingsAverage}
            </span>

          </div>
          <button onClick={addProductToCart} className='btn bg-main text-white w-100'>+ Add</button>
    </div>
    </>}
    
  </div>
    </>
}
