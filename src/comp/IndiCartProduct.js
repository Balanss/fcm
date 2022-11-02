import React from 'react'

import { auth, fs } from '../Firebase'
import Button from '@mui/material/Button';


const IndiCartProduct = ({cartProduct}) => {






const handleDel = () =>{

  auth.onAuthStateChanged(user =>{
    if(user){
      fs.collection('Cart ' + user.uid ).doc(cartProduct.ID).delete().then(()=>{

      })

    }

  })
}

return (<>

  <div className='product  cart-css'>

             <div >
                 <img className='product-img-cart' src={cartProduct.url} alt="product-img"/>

             </div>
             <div className='product-items'>
             <div className='product-text-description item-same'>  <h2> Size: {cartProduct.description}</h2> </div>
             <div className='product-text-price item-same '> <h2>$ {cartProduct.price}</h2> </div>
             <div className='cart-delete' onClick={handleDel}> <Button  variant="outlined" color="error" className="btn-del-cart">  Remove from cart </Button >
              </div>

                        </div>



         </div>


</>)
}

export default IndiCartProduct
 //not used atm
    // <div className='product-text cart-price'>$ {cartProduct.TotalProductPrice}</div>
