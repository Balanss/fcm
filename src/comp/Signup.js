import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import home from "../Image/home.png";
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';


const Signup = () => {

const [fullName,setFullName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState('')

const [ errorMsg,setErrorMsg ] = useState('')
const [successMsg,setSuccessMsg] = useState('')
const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault()
  auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
console.log(credentials);
fs.collection("users").doc(credentials.user.uid).set({
  FullName:fullName,
  Email:email,
  Password:password,
}).then(() => {
  setSuccessMsg("signup successful ")
  setFullName("");
  setEmail("")
  setPassword("")
  setErrorMsg("")
  setTimeout(() => {
    setSuccessMsg("");
    navigate("/")
  },3000)
}).catch((error) =>setErrorMsg(error.message))
  }).catch((error) => {
    setErrorMsg(error.message)
  })

}

return (
  <div className='signupdivall'>
  <div>


  <div className="form-navbar" >
    <Link className='homeIcon'  to='/'> <img className='homeimgsl' src={home} alt="" /> </Link>
</div>
  <form className='form-signup' onSubmit={handleSubmit}>
    <div className='divsignup' >
      <h3 className='signup-text'>Please sign up for a account </h3>
    <input type='email' placeholder='Email' className="input-signup" onChange={(e) => setEmail(e.target.value)} value={email} required />
  <div>  <input type='text' placeholder='Full Name' className="input-signup" onChange={(e) => setFullName(e.target.value)}  value={fullName} maxlength="12" required /> </div>
      <input type='text' placeholder='Password' className="input-signup" onChange={(e) => setPassword(e.target.value)} value={password} required />
  <div className="btnsetsignup">  <button className="btn-signup" variant="contained" color="success"> signup</button>
<div  className='signup-logIn'>  <Link className='notextdec'  to='/login'> log in </Link> </div>
   </div>


      </div>
      <div className='signupmsg'>
      {errorMsg&& <>
      <div className='errorsignmsg'> Email already exists
      </div> </>}

      {successMsg&& <>
      <div className='successsignmsg'> {successMsg} <InsertEmoticonRoundedIcon />
      </div> </>}

      </div>


      </form>

  </div>

  </div>

)

}

export default Signup
