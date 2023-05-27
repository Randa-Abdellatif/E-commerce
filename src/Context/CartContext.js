import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


export let CartContext = createContext(0);


export default function CreateContextProvider(props){
    let userToken = localStorage.getItem('userToken');
let headers = {token:userToken}

function addToCart(productId){
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
    {productId:productId},
    {headers})
    .then((response)=> response)
    .catch((err)=> err)
}

// async function addToCart(productId){
//     let x = await axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
//     {productId:productId},
//     {headers})
//     .catch((err)=> err)
//     return x 
// }

function getLoggedUserCart(){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
    {headers})
    .then((response)=> response)
    .catch((err)=> err)
}

function updateProductCount(productId , productCount){
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
    {count:productCount},
    {headers})
    .then((response)=> response)
    .catch((err)=> err)
}

function deleteCartItem(productId){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
    {headers})
    .then((response)=> response)
    .catch((err)=> err)
}

 async function clearCartItem(productId){
    let response =await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,
    {headers})
    .catch((err)=> err);
    return response;
}

 function onlinePayment(carttId , shippingAddress ){
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${carttId}?url=http://localhost:3000`,
    {shippingAddress:shippingAddress},
    {headers})
    .then((response)=> response)
    .catch((err)=> err)
}

async function CreateCashOrder(cartId, shippingAddress){
    return await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cardId}`,
    {shippingAddress:shippingAddress},
    {headers})
    .catch((err)=>err);
}

const [cardId, setCardId] = useState(null);
const [numOfCartItem, setNumOfCartItem] = useState(0);

async function getCart(){
    let response = await getLoggedUserCart();
    if(response?.data?.status === "success"){
        setNumOfCartItem(response.data.numOfCartItems);
        setCardId(response.data.data._id);
    }
    // console.log(response);
}

useEffect(()=>{
    getCart();
} , []);

    return <CartContext.Provider value={{CreateCashOrder,headers,setNumOfCartItem, cardId , numOfCartItem , onlinePayment,addToCart , getLoggedUserCart , updateProductCount , deleteCartItem , clearCartItem}}>
        {props.children}
    </CartContext.Provider>
}