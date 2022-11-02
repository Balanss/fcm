import React from 'react'
import { useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import {  Button } from '@mui/material'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../Firebase';



 const IndividualProduct0 = ({individualProduct , addToCart}) => {
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
             },3000)

    }

if(individualProduct.onSale === "no"){
  return  null

} else if(individualProduct.onSale ==="yes"){
  return ( <>
    <div className="saledisplaypants"><div>
       <img tabIndex='1' className='saleImg' src={individualProduct.url} alt="product-img"/>
       </div>
       <p className='linethrough'>${individualProduct.price}</p>
       <p className='salenumber'>${individualProduct.salePrice}</p>
        <Button variant="contained" color="success"  className='btn-ATC ' onClick={handleClick}>ADD TO CART</Button>
       </div>

         <div className='product-msg'> <p className='bgcolormsg'> {successMsg}
         </p> </div>


</>  )
}

}

export default IndividualProduct0
