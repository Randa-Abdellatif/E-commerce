import axios from "axios";
import { createContext } from "react";


export let CartContext = createContext(0);


export default function createContextProvider(props){
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

    return <CartContext.Provider value={{addToCart , getLoggedUserCart , updateProductCount , deleteCartItem , clearCartItem}}>
        {props.children}
    </CartContext.Provider>
}