import React, { useContext, useEffect, useState } from 'react'
import styles from './Categories.module.css';
import { CounterContext } from '../../Context/CounterContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Categories() {

  const [category, setCategory] = useState(null)
  const [specific, setspecific] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let params = useParams();

  async function getSpecificCategory(id){
    setisLoading(true);
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`);
    setspecific(data.data);
    // console.log(data.data.name);
    setisLoading(false)
  
   }

 async function getAllSubCategoriesOnCategory(id){
  setisLoading(true);
  let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`);
  setCategory(data);
  setisLoading(false)

 }

 useEffect(()=>{
  // console.log(params.id);
  getSpecificCategory(params.id);
  getAllSubCategoriesOnCategory(params.id);
} , [])
  return <>
    <h2>Categories</h2>
    <div className="container">
    <div className='row justify-content-center align-items-center py-3'>
    {isLoading?
    <div className='text-center'> <i className='fas fa-3x fa-spinner fa-spin text-main  '></i></div>:
    <>
    <div className='col-md-6'>
      <h3>{specific?.name}</h3>
      <img className='img-fluid' src={specific?.image} alt="" />
    </div>
    <div className="col-md-6">
     {category?.data.map((sub,index)=> <p key={index}>{sub.name}</p>)}
   
    </div>
   
    </>}
    
  </div>
    </div>
    
    </>
}
