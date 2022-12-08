import React from 'react'
import NavbarHome from './NavbarHome'
import {useState, useEffect} from 'react'
import { auth, fs} from '../Firebase'
import Footer from './Footer'
import home from '../Image/home.png'
import certified from '../Image/certified.png'
import McDelivery from '../Image/McDelivery.png'
import julia from '../Image/julia.jpg'
import abbas from '../Image/abbas.jpg'

const ContactUs = () => {

  // getting current user uid
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

     const uid = GetUserUid(); // ignore errror


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
      //console.log(user);



      // state of products
      const [products, setProducts]=useState([]);

      // getting products function
      const getProducts = async ()=>{
          const products = await fs.collection('Blazers').get();
          const productsArray = [];
          for (var snap of products.docs){
              var data = snap.data();
              data.ID = snap.id;
              productsArray.push({
                  ...data
              })
              if(productsArray.length === products.docs.length){
                  setProducts(productsArray);
              }
          }
      }


      // state of totalProducts
      const [totalProducts, setTotalProducts]=useState(null);
      // getting cart products
      useEffect(()=>{
          auth.onAuthStateChanged(user=>{
              if(user){
                  fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                      const qty = snapshot.docs.length;
                      if(qty === 0){
                        setTotalProducts( <div className="clear">  </div>)

                      }
                      else {
                        setTotalProducts(<div className="totalProducts"> {qty}  </div> )

                      }

                  })
              }
          })
      },[])


      useEffect(()=>{
          getProducts();
      },[])





return (<>

<div className="homebody">
  <div className='allOfNav'>
      <NavbarHome user={user}/>
        </div>

        <div id="contact" className='aboutfcmhome' >
         <h2 className='contactinfotext'>Contact info </h2>
        <div className='contact-info'>
        <p > lilgil99@gmail.com </p>
        <p> 597 890-3150 / 597 887-5959 </p>

        <img className='toslogo' src={home} />
        </div>
         </div>







        <Footer />

        </div>

  </> )

}

export default ContactUs
