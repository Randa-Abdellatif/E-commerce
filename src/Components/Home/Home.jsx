import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import styles from './Home.module.css';
import CategorySlider from '../CategorySlider/CategorySlider';
export default function Home() {
  return <>
    <h2>Home</h2>
    <CategorySlider/>
    <FeatureProducts/>
    </>
}
