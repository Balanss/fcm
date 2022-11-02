import React from 'react'
import Navbar from '../comp/Navbar'
import ProductsForPants from './ProductsForPants'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { orderBy } from 'firebase/firestore'
import Footer from '../comp/Footer'




 const PantsPage = () => {

const navigate = useNavigate()
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

      const uid = GetUserUid();

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

      // state of products
      const [pants, setPants]=useState([]);

      // getting products function
      const getPants = async ()=>{
          const pants = await fs.collection('Pants').orderBy('timestamp', 'desc').get();
          const pantsArray = [];
          for (var snap of pants.docs){
              var data = snap.data();
              data.ID = snap.id;
              pantsArray.push({
                  ...data
              })
              if(pantsArray.length === pants.docs.length){
                  setPants(pantsArray);
              }
          }
      }

      useEffect(()=>{
          getPants();
      },[])


      const [totalProducts, setTotalProducts]=useState(null);
      // getting cart products
      useEffect(()=>{
          auth.onAuthStateChanged(user=>{
              if(user){
                  fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                      const qty = snapshot.docs.length;
                      if(qty === 0){
                        setTotalProducts()

                      }
                      else {
                        setTotalProducts(<div className="totalProducts"> {qty}  </div> )

                      }

                  })
              }
          })
      },[])


      let Pants;
      const addToCart = (product)=>{
          if(uid!==null){
              // console.log(product);
              Pants=product;
              Pants['qty']=1;
              Pants['TotalProductPrice']=Pants.qty*Pants.price;
              fs.collection('Cart ' + uid).doc(product.ID).set(Pants).then(()=>{
                  console.log('successfully added to cart');
              })

          }
          else{
              navigate('/login');
          }

      }

      return (
          <>
              <div className='homebody'>
          <div className="">
          <div className='allOfNav'>
              <Navbar user={user} totalProducts={totalProducts}/>
              <br></br>
            <div className=''>

              </div>
                </div>
              {pants.length > 0 && (
                  <div className='productPage'>
                      <div className='products-box'>

  <ProductsForPants pants={pants}  addToCart={addToCart} />

                      </div>
                  </div>
              )}
              {pants.length < 1 && (
                  <div className='please-wait'>Please wait....</div>
              )}


</div>
  <Footer />
  </div>

          </>
      )

}

export default PantsPage

// <div className='saleDivcat'>
// <Products pants={pants}  addToCart={addToCart} /> </div>  new things
