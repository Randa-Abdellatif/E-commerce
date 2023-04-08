import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import styles from './Home.module.css';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {
  return <>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProducts/>
    <h2>Home</h2>

    </>
}
