import React from 'react'
import Navbar from '../comp/Navbar'
import Products from './Products'
import Products1 from './Products1'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import Footer from '../comp/Footer'
import { orderBy } from 'firebase/firestore'
//import SaleBlazer from './SaleBlazer'



 const Blazer = () => {

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
      const [blazer, setBlazer]=useState([]);

      // getting products function
      const getBlazer = async ()=>{
          const blazer = await fs.collection('Blazers').orderBy('timestamp', 'desc').get();
          const blazerArray = [];
          for (var snap of blazer.docs){
              var data = snap.data();
              data.ID = snap.id;
              blazerArray.push({
                  ...data
              })
              if(blazerArray.length === blazer.docs.length){
                  setBlazer(blazerArray);
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
          getBlazer();
      },[])



      let Blazer;
      const addToCart = (product)=>{
          if(uid!==null){
              // console.log(product);
              Blazer=product;
              Blazer['qty']=1;
              Blazer['TotalProductPrice']=Blazer.qty*Blazer.price;
              fs.collection('Cart ' + uid).doc(product.ID).set(Blazer).then(()=>{
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
              {blazer.length > 0 && (
                  <div className='productPage'>
                      <div className='products-box'>
  <Products blazer={blazer}  addToCart={addToCart} />

                      </div>
                  </div>
              )}
              {blazer.length < 1 && (
                  <div className='please-wait'>Please wait....</div>
              )}

</div>
<Footer />
</div>

          </>
      )

}

export default Blazer


//  <div className='saleDivcat'>  <Products1 blazer={blazer}  addToCart={addToCart} /> </div>  sale of blazer
