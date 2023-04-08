import React, { useContext } from 'react'
import styles from './Products.module.css';
import { CounterContext } from '../../Context/CounterContext';
export default function Products() {
  let{changeCounter} = useContext(CounterContext);

  return <>
    <h2>Products</h2>
    <button onClick={changeCounter} className='btn btn-info'>change</button>
    </>
}
