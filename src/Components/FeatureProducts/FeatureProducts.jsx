import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styles from './FeatureProducts.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { CounterContext } from '../../Context/CounterContext';


export default function FeatureProducts() {
  let {addToCart , setNumOfCartItem} = useContext(CartContext);
  let{heart, setheart , wishlistDetails,addToWishlist} = useContext(CounterContext)

  const [products,setProducts]=useState([]);

  async function getProducts() 
  {
    let{data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
    setProducts(data.data);
    console.log(data.data);
  }

  useEffect(()=>{
    getProducts();
    console.log(wishlistDetails)
  },[])

  async function addProductToCart(productId){
    let response = await addToCart(productId);
    console.log(response);
    if(response.data.status == "success"){
      setNumOfCartItem(response.data.numOfCartItems)
      toast.success(response.data.message , { position: 'bottom-left', duration: 1000 , className: 'text-center border border-success' });
    } else{
      toast.error('Error Adding product');
    }
  }

  const [toggle, setToggle] = useState(true);

  async function addProductToWishlist(productId){
    let response = await addToWishlist(productId);
    // setheart(true)
    console.log(response);
    

  }
  return <>
    <h2>FeatureProducts</h2>
    <div className='row'>
    {/* {wishlistDetails?.data.map((id)=> <i className="fa-solid fa-heart fa-2x" style = {{color:"#e90707"}}>{id._id}</i> )} */}
      {products.map((product)=> 
        <div key={product._id} className='col-md-2 '>
          <div className='product cursor-pointer px-2 py-3'>
            {wishlistDetails?.data.map((id)=>{ id._id == product._id ? console.log('hello',id._id) :console.log("not")})}
            
          {wishlistDetails?.data.map((id)=>{id._id == product._id?<i className="fa-solid fa-heart fa-2x" style = {{color:"#e90707"}}></i> :
        <i onClick={()=>addProductToWishlist(product._id)} className="fa-regular fa-heart fa-2x" style = {{color:"#e90707"}}></i>})}

            {/* {heart == true ?<i className="fa-solid fa-heart fa-2x" style = {{color:"#e90707"}}></i>:""} */}

            {/* {!toggle &&(
        <i onClick={() => setToggle(!toggle)}  className="fa-regular fa-heart fa-2x" style = {{color:"#e90707"}}></i>
      )}
      
      {toggle && (
       <i onClick={() => setToggle(!toggle)} className="fa-solid fa-heart fa-2x" style = {{color:"#e90707"}}></i>
      )} */}


          <i onClick={()=>addProductToWishlist(product._id)} className="fa-regular fa-heart fa-2x" style = {{color:"#e90707"}}></i>
          {/* <i className="fa-solid fa-heart fa-2x" style = {{color:"#e90707"}}></i> */}
                      <Link to={`/ProductDetails/${product._id}`}>
            <img className='w-100' src={product.imageCover} alt="" />
            <span className='text-main fw-bold font-sm'>{product.category?.name}</span>
          <h6 className='my-4'>{product.title.split(' ').slice(0,2).join(' ')}</h6>
          <div className='d-flex justify-content-between'>
            <span className='text-muted'>{product.price} EGP</span>
            <span> <i className='fas fa-star rating-color'></i>
            {product.ratingsAverage}
            </span>

          </div>
            </Link>
          <button onClick={()=>addProductToCart(product._id)} className='btn bg-main text-white w-100'>+ Add</button>

          </div>
          </div>)}
    </div>
    </>
}
