import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import CartProducts from './CartProducts'
import emailjs from 'emailjs-com'
import Footer from './Footer'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';









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
     // console.log(user);

     // state of cart products
     const [cartProducts, setCartProducts]=useState([]);

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
                 })
             }
             else if (!user){
                 console.log('user is not signed in to retrieve cart');
             }
         })
     },[])



// show links in text area
     const url = cartProducts.map(cartProduct=>{
           return  cartProduct.url +" price is USD " + cartProduct.price + " Stop here "
       })

       const price = cartProducts.map(cartProduct => {
return cartProduct.price

       })







       const sendEmail = (e) => {
              e.preventDefault();



              emailjs.sendForm('service_z3nnd5p', 'template_8snm4ty', e.target, 'US5aZoYMJBFp07AjS')



                .then((result) => {
                  if(result){
                    setSuccessMsg(<p className="green-success">your order has been sent. We will be in contact with you soon.</p>)
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


return(
<>

    <div className='homebody'>
<div className="cartnavbar">
<Navbar user={user} totalProducts={totalProducts} />
</div>



<div className="cart-display">
{cartProducts.length > 0 && (


  <div className="userdisplay">  <h1 className='shopping-cart' > Shopping cart </h1>
    <div className="cart-info" >


    </div>

    <div className="green-successdiv">  <p className='bgcolormsgcart'> {successMsg}
     </p> </div>

        <div className="cart-display-input" >

          <div className="cart-display-items">  <CartProducts cartProducts={cartProducts}/> </div>


            <form className='cart-form' onSubmit={sendEmail}>
               <label> * Name </label>
               <input className='cart-form-spacing' type="text" name="name" required  />
               <label>  *  Email </label>
               <input className='cart-form-spacing' type="email" name="email" required  />
                  <label>  * Contact number </label>
               <input className='cart-form-spacing' type="number" name="contact-info" required  />
               < textarea className="hide" name='message' value={url} />

               <p> Please enter your name, email and contact number </p>
               <input type="submit" value="Send"   className='btn-send' />


               </form>


        </div>
    </div>

)}

  </div>



{cartProducts.length < 1 && (
    <div className='empty' ><h1> Cart is Empty </h1>
< SentimentDissatisfiedIcon className='SentimentDissatisfiedIcon' />
    </div>
) }

<Footer />
</div>


</>
)


}

export default Cart
