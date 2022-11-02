import React from 'react'
import Products0 from './Products0'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'


// NOT ACTIVE
// NOT ACTIVE
// NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE
// NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE // NOT ACTIVE 



 const DressOnSale = () => {


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

      const user = GetCurrentUser(); //ignore error in terminal
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
          <div>
          <div className=''>
                </div>
              {dress.length > 0 && (
                  <div >
                          <Products0 dress={dress}  addToCart={addToCart} />
                  </div>
              )}
              {dress.length < 1 && (
                  <div className='please-wait'>Please wait....</div>
              )}

</div>
          </>
      )

}

export default DressOnSale
