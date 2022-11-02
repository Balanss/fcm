import React from 'react'
import Navbar from '../comp/Navbar'
import Products from './Products'
import Products0 from './Products0'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { orderBy } from 'firebase/firestore'
import Footer from '../comp/Footer'




 const Dress = () => {

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
      const [blouse, setBlouse]=useState([]);

      // getting products function
      const getBlouse = async ()=>{
          const blouse = await fs.collection('Blouse').orderBy('timestamp', 'desc').get()

          const blouseArray = [];
          for (var snap of blouse.docs){
              var data = snap.data();
              data.ID = snap.id;
              blouseArray.push({
                  ...data
              })
              if(blouseArray.length === blouse.docs.length){
                  setBlouse(blouseArray);
              }
          }
      }

      useEffect(()=>{
          getBlouse();
      },[])


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



      let Dress;
      const addToCart = (product)=>{
          if(uid!==null){
              // console.log(product);
              Dress=product;
              Dress['qty']=1;
              Dress['TotalProductPrice']=Dress.qty*Dress.price;
              fs.collection('Cart ' + uid).doc(product.ID).set(Dress).then(()=>{
                  console.log('successfully added to cart');
              })

          }
          else{
              //navigate('/login');
          }

      }

      return (
          <>
              <div className='homebody'>
          <div>

          <div className='allOfNav'>
              <Navbar user={user} totalProducts={totalProducts}/>
              <br></br>
            <div className=''>

              </div>
                </div>
              {blouse.length > 0 && (
                  <div className='productPage'>
                      <div className='products-box'>

  <Products blouse={blouse}  addToCart={addToCart} />

                      </div>
                  </div>
              )}
              {blouse.length < 1 && (
                  <div className='please-wait'>Please wait....</div>
              )}

</div>

<Footer />
    </div>
          </>
      )

}

export default Dress

    //  <div className='saleDivcat'>  <Products0 dress={dress}  addToCart={addToCart} /> </div> dress for sale
