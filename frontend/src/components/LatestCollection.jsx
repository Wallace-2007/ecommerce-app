import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';


const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0, 10));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'ÚLTIMAS'} text2={'COLEÇÕES'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Nossas últimas coleções trazem as tendências mais atuais e exclusivas, combinando estilo e inovação para atender aos gostos mais sofisticados. Cada peça é pensada para oferecer versatilidade e elegância, garantindo um visual moderno e confortável em todas as ocasiões. Descubra as novidades e adicione um toque de frescor ao seu guarda-roupa.
            </p>
        </div>
      
        {/*Rendering Products*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item, index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection
