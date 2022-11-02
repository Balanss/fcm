import React from 'react'
import IndividualProduct1 from './IndividualProduct1'

 const Products1 = ({blazer ,  addToCart}) => {

    // console.log(products);

    return blazer.map((individualProduct)=>(
        <IndividualProduct1 key = {individualProduct.ID} individualProduct={individualProduct}
    addToCart={addToCart}
        />

    ))
}

export default Products1
