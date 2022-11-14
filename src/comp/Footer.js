import React from 'react'
import  { Link } from 'react-router-dom'




const Footer = () => {


return (<>

<div className="footer">
<div className="inside-footer" >
<Link to='/About'> <p className="text-black" > Contact info </p> </Link>
 </div>

<div className="tos">

<Link to='/About'> <p className="text-black" > Terms & Conditions </p> </Link>
  </div>

<div className="fcm">
<p> FCM Delivery Suriname 2022 </p>
</div>
 </div>



</>)

}

export default Footer
