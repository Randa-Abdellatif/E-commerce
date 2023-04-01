/*https://documenter.getpostman.com/view/5709532/2s93JqTRWN */
/*part 7 rev */
/*part 8 Formik */
/*part 9 custom validation */
/*part 10 validation with yup*/
/*part 11 send register data to api */
/*part 12 login */
/* week 3
part 10 user token //npm i jwt-decode
part 11 show hide navbar links
part 12 logout,handle user reload
part 13,14 ProtectedRoute //npx generate-react-cli component ProtectedRoute
part 15 p1
part 15 p2
part 15 featured product
part 16 productdetails
part 17 productdetails slider
part 18 CategorySlider
part 20 loading spinner
*/

import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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


  // function logOut(){
  //   localStorage.removeItem('userToken');
  //   setUserData(null);
  //   return <Navigate to={'/login'}/>
  // }

let routers=createBrowserRouter([
  {path:'',element:<Layout setUserData={setUserData} userData={userData}/>, children:[
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"Gallery",element:<ProtectedRoute><Gallery/></ProtectedRoute>},
    {path:"ProductDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute> },
    {path:"Register",element:<Register/>},
    {path:"Login",element:<Login saveUserData={saveUserData}/>},
    {path:"*",element:<Home/>}

  ]}
])

  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
