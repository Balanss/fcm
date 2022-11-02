import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { auth} from "../Firebase"
import {useAuthState} from 'react-firebase-hooks/auth';
import LoginAnon from './LoginAnon'

const Cat = ({}) => {


const [userAnon] = useAuthState(auth);


const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};
const handleClose = () => {
setAnchorEl(null);
};


return ( <>


<div className=''>


         <Button className=""
           id="basic-button"
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
         >
          <h4> Here </h4>
         </Button >





</div>
<div className='othercat'>

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




</>
 )

}

export default Cat;
