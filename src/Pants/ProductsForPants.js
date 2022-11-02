import React from 'react'
import IndividualProductNotNew from './IndividualProductNotNew'

 const ProductsForPants = ({pants ,  addToCart}) => {

    // console.log(products);

    return pants.map((individualProduct)=>(
        <IndividualProductNotNew key = {individualProduct.ID} individualProduct={individualProduct}
    addToCart={addToCart}
        />

    ))
}

export default ProductsForPants
