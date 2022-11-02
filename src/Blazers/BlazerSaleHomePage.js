import React from 'react'
import Products1 from './Products1'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import { orderBy } from 'firebase/firestore'


//not active

 const BlazerSaleHomePage = () => {

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


      // getting cart products




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
          <div>
              {blazer.length > 0 && (
                  <div className=''>
                      <Products1 blazer={blazer}  addToCart={addToCart} />
                  </div>
              )}
              {blazer.length < 1 && (
                  <div className='please-wait'>Please wait....</div>
              )}

</div>
          </>
      )

}

export default BlazerSaleHomePage
