import React from 'react'
import IndividualProduct from './IndividualProduct'

 const Products = ({blazer ,  addToCart}) => {

    // console.log(products);

    return blazer.map((individualProduct)=>(
        <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
    addToCart={addToCart}
        />

    ))
}

export default Products
