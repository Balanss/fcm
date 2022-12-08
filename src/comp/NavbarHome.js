import React from 'react'
import {useNavigate} from 'react-router-dom'
import { auth} from "../Firebase"
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LoginAnon from './LoginAnon'
import {useAuthState} from 'react-firebase-hooks/auth';
import home from "../Image/home.png";
import { Link } from 'react-router-dom'


const NavbarHome = ({user}) => {



  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() =>{
      navigate('/')
    })
  }



  const [userAnon] = useAuthState(auth);


  return (<>
         <div className='navbar navbar-css'>
             <div className='leftside'>
                   <div className="insideLeft"><Link  className='navlink-home' to="/"> <img className='homeimg' src={home} alt="" /> </Link>

                   </div>


             </div>

             <div className='rightside'>

                 {!user&&<>
                     <div><Link className='navlink navlink-signup' to="/Signup">SIGN UP</Link></div>
                     <div><Link className='navlink' to="/Login">LOGIN</Link></div>


                 </>}




     <div className='navbar-loggedin'>
                 {user&&<>

                     <div><Link className='navlink' to="/">{user}</Link></div>
                     <div className=''>
                     </div>
                     <div className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</div>
                 </>}



                 </div>

             </div>

         </div>


         <div>




<div className='cat homepagecat'>
<Button className="otherlinks" >
 <h4> <Link to='/Contact'> Contact  </Link> </h4>
</Button >

<Button className="otherlinks" >
 <h4> <Link to='/clothing'> clothing  section</Link> </h4>
</Button >

         <Button className="otherlinks" >
          <h4> <Link to='/about'> about us </Link> </h4>
         </Button >

         </div>




   </div>




    </> )

}

export default NavbarHome
