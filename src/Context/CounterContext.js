/*part 1 Context */

import axios from "axios";
import { useFormik } from "formik";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";



export let CounterContext = createContext();

export default function CounterContextProvider(props){

    const [counter, setCounter] = useState(0);
    const [userName, setuserName] = useState("ahmed");
    function changeCounter(){
        setCounter(Math.random())
    }
let{headers} = useContext(CartContext);

const [wishlistDetails, setwishlistDetails] = useState(null);
const [heart, setheart] = useState(null)

   async function addToWishlist(productId){
    let x = await axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,
    {productId:productId},
    {headers})
    .catch((err)=> err)
    return x 
}

async function getLoggedUserWishlist(){
    return await axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`
    ,{headers})
    .catch((err)=>err)
}

async function removeProductFromWishlist(productId){
    return await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`
    ,{headers})
    .catch((err)=>err);
}

// const [numWishlistId, setnumWishlistId] = useState(null)
async function getWishlist(){
    let response = await getLoggedUserWishlist();
    console.log(response.data.count);
    if(response.data.status == "success"){
        setwishlistDetails(response.data)
    }
}

useEffect(()=>{
    getWishlist()
console.log(wishlistDetails)
} , []);


    return <CounterContext.Provider value={{heart, setheart,wishlistDetails, setwishlistDetails,removeProductFromWishlist,getLoggedUserWishlist,addToWishlist,counter,userName,changeCounter}}>
        {props.children}
    </CounterContext.Provider>
}