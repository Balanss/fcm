import React from 'react'
import  IndiCartProduct from './IndiCartProduct'





const CartProducts = ({cartProducts}) => {

  return  (
<>
<div className="display-flex">
        {cartProducts.map((cartProduct)=>(
                <IndiCartProduct key={cartProduct.ID} cartProduct={cartProduct}   />  ))}

        </div>
  </>
  )






}



export default CartProducts
