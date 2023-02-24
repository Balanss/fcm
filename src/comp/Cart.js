import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect} from 'react'
import { auth, fs,db } from '../Firebase'
import emailjs from 'emailjs-com'
import Footer from './Footer'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import {deleteDoc,doc} from "firebase/firestore"
import Button from '@mui/material/Button';









const Cart = ({cartProduct}) => {

const [successMsg,setSuccessMsg] = useState('')
  // getting current user function
     function GetCurrentUser(){
         const [user, setUser]=useState(null);
         useEffect(()=>{
             auth.onAuthStateChanged(user=>{
                 if(user){
                     fs.collection('users').doc(user.uid).get().then(snapshot=>{
                         setUser(snapshot.data().FullName);

                     })
                 }
                 else{
                     setUser(null);
                 }
             })
         },[])
         return user;
     }

     const user = GetCurrentUser();
    

     // state of cart products
     const [cartProducts, setCartProducts]=useState([]);
     const[uidCart, setUidCart]=useState("")
   const [ delCart, setDelCart]=useState();

     // getting cart products from firestore collection and updating the state
     useEffect(()=>{
         auth.onAuthStateChanged(user=>{
             if(user){
                 fs.collection('Cart ' + user.uid ).onSnapshot(snapshot=>{
                     const newCartProduct = snapshot.docs.map((doc)=>({
                         ID: doc.id,
                         ...doc.data(),
                     }));
                     setCartProducts(newCartProduct);
                    setUidCart('Cart ' + user.uid)

                 })
             }
             else if (!user){
                 console.log('user is not signed in to retrieve cart');
             }
         })
     },[])




     const abc = cartProducts.map(cartProduct=>  {
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
       })


       const LngResult = () =>cartProducts.map((cartProducts,i) =>
   setDelCart(cartProducts.ID)
      )



// show links in text area
     const url = cartProducts.map(cartProduct=>{
           return  cartProduct.url +" price is USD " + cartProduct.price + " Stop here "
       })

       const price = cartProducts.map(cartProduct => {
return cartProduct.price

       })

       const id = cartProducts.map(cartProduct => {
return cartProduct.ID

       })









// const update =  cartProducts.forEach(element => console.log(element))

// for now made deletedoc is a bandaid fix need to make it max 10 orders
       const sendEmail = (e) => {
              e.preventDefault();
              emailjs.sendForm('service_z3nnd5p', 'template_8snm4ty', e.target, 'US5aZoYMJBFp07AjS')
                .then((result) => {
                  if(result){
                    setSuccessMsg(<p className="green-success">your order has been sent. We will be in contact with you soon.</p>);
                     deleteDoc(doc(db,uidCart,id[1]))
                          deleteDoc(doc(db,uidCart,id[0]))
                               deleteDoc(doc(db,uidCart,id[2]))
                                    deleteDoc(doc(db,uidCart,id[3]))
                                         deleteDoc(doc(db,uidCart,id[4]))
                                              deleteDoc(doc(db,uidCart,id[5]))
                                                   deleteDoc(doc(db,uidCart,id[6]))
                                                        deleteDoc(doc(db,uidCart,id[7]))
                                                             deleteDoc(doc(db,uidCart,id[8]))
                                                                  deleteDoc(doc(db,uidCart,id[9]))

                  }
                }, (error) => {
                    console.log(error.text);
                });

                e.target.reset()
                setTimeout(() => {
                  setSuccessMsg("");
                },3000)
            };


            // state of totalProducts
            const [totalProducts, setTotalProducts]=useState(0);
            // getting cart products
            useEffect(()=>{
                auth.onAuthStateChanged(user=>{
                    if(user){
                        fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                            const qty = snapshot.docs.length;
                            if(qty === 0){
                      setTotalProducts( <div className="clear">  </div>)

                            }
                            else {  setTotalProducts(<div className="totalProducts"> {qty}  </div> )

                            }
                        })
                    }
                })
            },[])




if(cartProducts.length < 1){
  return (
    <div className="homebody">
    <div className="cartnavbar">
<Navbar user={user} totalProducts={totalProducts} />
</div>

    <div className='empty' ><h1> Cart is Empty </h1>
< SentimentDissatisfiedIcon className='SentimentDissatisfiedIcon' />

  </div></div>
)
} else if (cartProducts.length <= 10 ){
  return (
    <div className="homebody">
    <div className="cartnavbar">
<Navbar user={user} totalProducts={totalProducts} />
</div>
    <div className="cart-display">
    <div className="userdisplay">  <h1 className='shopping-cart' > Shopping cart  </h1>


     <div className="green-successdiv">  <p className='bgcolormsgcart'> {successMsg}
      </p> </div>

         <div className="cart-display-input" >

           <div className="cart-display-items">     {abc} </div>


             <form className='cart-form' onSubmit={sendEmail}>

                <label> * Name </label>
                <input className='cart-form-spacing' type="text" name="name"  required  />
                <label>  *  Email </label>
                <input className='cart-form-spacing' type="email" name="email"  required  />
                   <label>  * Contact number </label>
                <input className='cart-form-spacing' type="number" name="contact-info" required   />
                < textarea className="hide" name='message' value={url} />

                <p> Please enter your name, email and contact number </p>
                <input type="submit" value="Send"   className='btn-send'  />


                </form>


         </div>
     </div>
   </div>
   </div>
  )

} else if (cartProducts.length <= 11) {
  return (<>
    <div className="homebody">
    <div className="cartnavbar">
<Navbar user={user} totalProducts={totalProducts} />
</div>
    <div className="cart-display">
    <div className="shopping-cart-max">  <h1 className='' > Shopping cart maximum number of items is 10 </h1>  </div>
     <div className="cart-display-items">     {abc}  </div>
     </div>
     </div>
</>  )
}


}

export default Cart
