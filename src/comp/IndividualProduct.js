import React from 'react'
import {  Button } from '@mui/material'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../Firebase';
import { useState} from 'react'


 const IndividualProduct = ({individualProduct , addToCart}) => {

const [successMsg,setSuccessMsg] = useState('')
  const [userAnon] = useAuthState(auth);

   const handleClick = () => {
     addToCart(individualProduct)
     if(!userAnon) {
     setSuccessMsg(<p className="red-warning"> Please sign in as guest user or sign up for a account!</p>)
     } else if (userAnon) {
       setSuccessMsg(<p className="green-warning">Item Added To Cart</p>)
     }

            setTimeout(() => {
              setSuccessMsg("");
            },300000)

   }



if(individualProduct.title==="saleDress"){
  return (<> <div className="saledisplaydress">   <div className='product-img '>
  <img tabIndex='1' className='saleImg' src={individualProduct.url} alt="product-img"/>

  </div>
  <p className='linethrough'>${individualProduct.price}</p>
  <p className='salenumber'>${individualProduct.sale}</p>
   <Button variant="contained" color="success"  className='btn-ATC ' onClick={handleClick}>ADD TO CART</Button>

  </div>
<div className='product-msg'> <p className='bgcolormsg'> {successMsg} </p> </div> </> )
}

}

export default IndividualProduct
