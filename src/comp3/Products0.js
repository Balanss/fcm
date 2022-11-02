import React from 'react'
import IndividualProduct0 from './IndividualProduct0'

 const Products0 = ({dress,  addToCart}) => {

    // console.log(products);

    return dress.map((individualProduct)=>(
        <IndividualProduct0 key = {individualProduct.ID} individualProduct={individualProduct}
    addToCart={addToCart}
        />

    ))
}

export default Products0
