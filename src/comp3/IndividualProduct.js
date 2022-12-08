import React from 'react'
import { useState , useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import {  Button } from '@mui/material'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth , db} from '../Firebase';
import { Link } from 'react-router-dom'
import { getFirestore, doc, deleteDoc ,updateDoc} from "firebase/firestore";




 const IndividualProduct = ({individualProduct , addToCart}) => {
const [successMsg,setSuccessMsg] = useState('')
  const [userAnon] = useAuthState(auth);
const [ id, setId] = useState('')
const [ onSale,setOnSale] = useState('no')
  const [price,setPrice] = useState('')
  const [salePrice,setSalePrice] = useState('')




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


    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();


const handleDelete = () => {
setId(individualProduct.ID)
console.log(id)
  const db = getFirestore()
const docRef = doc(db, 'Dress',id)
deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})

}

const handleUpdate = () => {
  setId(individualProduct.ID)
    const db = getFirestore()
    const docRef = doc(db, "Blazers", id);
const sale = {
  onSale: onSale,
  price:Number(price),
  salePrice: Number(salePrice),
}

updateDoc(docRef, sale)
.then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
.catch(error => {
    console.log(error);
})

}


const master = process.env.REACT_APP_MY_API_KEY

if (uid === master ) {
  return ( <>

      <div className='admin'>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <div className='admin-dress'>
           <img tabIndex='1' className='admin-dress' src={individualProduct.url} alt="product-img"/>
          </div>
          <div className='product-text description'><h2> Size:{individualProduct.description}</h2></div>
          <div className='product-text price'>  <h2>$ {individualProduct.price}</h2></div>
          <Button variant="contained" color="success"  className='btn-ATC ' onClick={handleClick}>ADD TO CART</Button>
          <br />
                        <form onClick={handleUpdate}>
                        <input type="text"  placeholder="product on sale ?" value={onSale}  onChange={(e) => setOnSale(e.target.value)} />
                        <input type="number"  placeholder="product price" value={price}  onChange={(e) => setPrice(e.target.value)}/>
                        <input type="number"  placeholder="product sale price" value={salePrice}  onChange={(e) => setSalePrice(e.target.value)}/>
                          <Button variant="contained" color="success" >Update</Button>
                          </form>

      </div>

      <div className='product-msg'> <p className='bgcolormsg'> {successMsg}
      </p> </div>
  </>  )




 } else {




  return ( <>





      <div className='dress-product'>

          <div className='product-img-dress'>
           <img tabIndex='1' className='images-dress' loading="lazy" src={individualProduct.url} alt="product-img"/>
          </div>
          <div className='game'>
        <h4> Size:{individualProduct.description}</h4>
        <h4>$ {individualProduct.price}</h4>
          <Button variant="contained" color="success"  className='btn-ATC ' onClick={handleClick}>ADD TO CART</Button>
          </div>

      </div>

      <div className='product-msg'> <p className='bgcolormsg'> {successMsg}
      </p> </div>
 </>  )
}







}

export default IndividualProduct
