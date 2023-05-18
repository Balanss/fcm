import React from 'react'
import Navbar from '../comp/Navbar'
import Products from './Products'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { orderBy } from 'firebase/firestore'
import Footer from '../comp/Footer'




 const Home2 = () => {

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
      const [underpants, setUnderpants]=useState([]);

      // getting products function
      const getUnderpants = async ()=>{
          const underpants = await fs.collection('Underpants').orderBy('timestamp', 'desc').get();
          const underpantsArray = [];
          for (var snap of underpants.docs){
              var data = snap.data();
              data.ID = snap.id;
              underpantsArray.push({
                  ...data
              })
              if(underpantsArray.length === underpants.docs.length){
                  setUnderpants(underpantsArray);
              }
          }
      }

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
          getUnderpants();
      },[])

      let Underpants;
      const addToCart = (product)=>{
          if(uid!==null){
              // console.log(product);
              Underpants=product;
              Underpants['qty']=1;
              Underpants['TotalProductPrice']=Underpants.qty*Underpants.price;
              fs.collection('Cart ' + uid).doc(product.ID).set(Underpants).then(()=>{
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
                </div>
              {underpants.length > 0 && (
                  <div className='productPage'>
                        <div className="bannerinfo">
                        <div className='bannerpic'> </div>


                         </div>
                      <div className='products-box'>

  <Products underpants={underpants}  addToCart={addToCart} />

                      </div>
                  </div>
              )}
              {underpants.length < 1 && (
                  <div className='please-wait'>Out Of Stock</div>
              )}

</div>
<Footer />
</div>
          </>
      )

}

export default Home2
