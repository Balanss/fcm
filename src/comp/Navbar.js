import React from 'react'
import {useNavigate} from 'react-router-dom'
import { auth} from "../Firebase"
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginAnon from './LoginAnon'
import {useAuthState} from 'react-firebase-hooks/auth';
import home from "../Image/home.png";
import { Link } from 'react-router-dom'


const Navbar = ({user , totalProducts}) => {



  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() =>{
      navigate('/')
    })
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

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




<div className='cat'>



         <Button className="otherlinks"
           id="basic-button"
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
         >
          <h4> Categories </h4>
         </Button >


<div className='cart-guest' >
         {!userAnon&&<>
         <LoginAnon />

           </>}
           <Link  to="/cart">
           <IconButton color="primary" aria-label="add to shopping cart">

      <AddShoppingCartIcon fontSize="medium" />
      </IconButton>

           </Link>
              <div className=''>{totalProducts} </div>
           </div>

         </div>


     <Menu
       id="basic-menu"
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}
       MenuListProps={{
         'aria-labelledby': 'basic-button',
       }}
     >


<Link className='linkcss' to="/blazer">
       <MenuItem onClick={handleClose}>
        <p>Blazer</p>
         </MenuItem>
          </Link>

          <Link className='linkcss' to="/blouse">
              <MenuItem onClick={handleClose}>
           <p>Blouses </p>
                </MenuItem>
                </Link>


<Link className='linkcss' to="/dress">
         <MenuItem onClick={handleClose}>
      <p> Dresses  </p>
           </MenuItem>
           </Link>


   <Link className='linkcss' to="/pants">
                      <MenuItem onClick={handleClose}>
              <p> Pants </p>
                        </MenuItem>
                        </Link>

    <Link className='linkcss' to="/underwear">
       <MenuItem  onClick={handleClose}>
   <p>Underpants</p>
         </MenuItem>
         </Link>


  <Link to="/about">
    <MenuItem onClick={handleClose}>
    <p>  About Us </p>
            </MenuItem>
            </Link>

     </Menu>




   </div>




    </> )

}

export default Navbar
