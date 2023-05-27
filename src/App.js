/*https://documenter.getpostman.com/view/5709532/2s93JqTRWN */
/*
need to do loading in home
part 1 Context
part 2 context
part 3 addToCart
part 4 reac-hot-toast
part 5 getLoggedUserCart
part 6 display Cart
part 7 display Cart items
part 8 update product count
part 9 remove cart item 
part 10 react-detect-offline
part 11 react-helmet
part 12 Project Deployment
part 13 Project Deployment
 */
/*week 4 /
part 6 updateCartQuantity
part 7 online Payment //https://stripe.com/docs/testing
part 8 get cart id , update cart items number
*/

import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, HashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Cart from './Components/Cart/Cart'
import Gallery from './Components/Gallery/Gallery'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import MainSlider from './Components/MainSlider/MainSlider'
import NotFound from './Components/NotFound/NotFound'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate , Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CounterContextProvider from './Context/CounterContext';
import Categories from './Components/Categories/Categories';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import UpdateData from './Components/UpdateData/UpdateData';
import Wishlist from './Components/Wishlist/Wishlist';
import CheckoutCash from './Components/CheckoutCash/CheckoutCash';





function App() {

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  } , [])

  const [userData, setUserData] = useState(null);

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodeToken = jwtDecode(encodedToken);
    setUserData(decodeToken);
  }

  

let routers=createBrowserRouter([
  {path:'',element:<Layout setUserData={setUserData} userData={userData}/>, children:[
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"Wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:"Gallery",element:<ProtectedRoute><Gallery/></ProtectedRoute>},
    {path:"checkout",element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:"checkoutCash",element:<ProtectedRoute><CheckoutCash/></ProtectedRoute>},
    {path:"Categories/:id",element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"ProductDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute> },
    {path:"UpdatePassword",element:<ProtectedRoute><UpdatePassword/></ProtectedRoute> },
    {path:"UpdateData",element:<ProtectedRoute><UpdateData/></ProtectedRoute> },
    {path:'allorders',element:<Products/>},
    {path:"Register",element:<Register/>},
    {path:"Login",element:<Login saveUserData={saveUserData}/>},
    {path:"ForgetPassword",element:<ForgetPassword/>},
    {path:"ResetPassword",element:<ResetPassword/>},
    {path:"*",element:<Login saveUserData={saveUserData}/>}

  ]}
])

  return<CartContextProvider>
<CounterContextProvider>
  <Toaster/>
  <RouterProvider router={routers}></RouterProvider>
  </CounterContextProvider>
  </CartContextProvider>
   
}

export default App;
