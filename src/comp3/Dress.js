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
      const [dress, setDress]=useState([]);

      // getting products function
      const getDress = async ()=>{
          const dress = await fs.collection('Dress').orderBy('timestamp', 'desc').get()

          const dressArray = [];
          for (var snap of dress.docs){
              var data = snap.data();
              data.ID = snap.id;
              dressArray.push({
                  ...data
              })
              if(dressArray.length === dress.docs.length){
                  setDress(dressArray);
              }
          }
      }

      useEffect(()=>{
          getDress();
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
              {dress.length > 0 && (
                  <div className='productPage'>
                  <div className="bannerinfodress">
                  <div className='bannerpicdress'> </div>  </div>
                      <div className='products-box'>

  <Products dress={dress}  addToCart={addToCart} />

                      </div>
                  </div>
              )}
              {dress.length < 1 && (
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
