import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css';
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function CategorySlider() {
  const [Categories,setCategories]=useState([]);


  async function getCategories() 
  {
    let{data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
    setCategories(data.data);
  }

  useEffect(()=>{
    getCategories();
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  return <>
  
      <Slider {...settings}>
      
        {Categories.map((category)=> <div key={category._id}>
        <Link to={`/Categories/${category._id}`}>
        <img className='w-100' height={200} src={category.image} alt="" />
          <h2 className='h6 pt-2'>{category.name}</h2>
        </Link>
          
        </div>)}
      </Slider>
    </>
}
