import React from 'react'
import IndividualProduct from './IndividualProduct'

 const Products = ({dress ,  addToCart}) => {

    // console.log(products);

    return dress.map((individualProduct)=>(
        <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
    addToCart={addToCart}
        />

    ))
}

export default Products
