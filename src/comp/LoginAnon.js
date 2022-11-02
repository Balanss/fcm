import React from 'react'
import {auth}  from '../Firebase'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';

//<PersonIcon />

const LoginAnon = () => {

const signin = () => {

  auth.signInAnonymously().catch(alert)

};


return (

    <div className="anonlogdiv">  <button className="anonlog"
                  onClick={signin} >Continue as guest  </button>
           </div>

  )


}

export default LoginAnon;
