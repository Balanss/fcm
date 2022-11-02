
// {products.length > 0 && (
//     <div className='productPageHome'>
//
//         <div className='saleDiv'>
//           <div> <span className='blink'> <h1 className='text-center saleblink'>On sale Today!  </h1> </span> </div>
//
//          <div className='displaysale1'>   <BlazerSaleHomePage/> </div>
//           <div className='displaysale1'>  <DressOnSale />   </div>
//
//         </div>
// <div className='saleDiv  salediv2' >
// <div className='divfornewh1'>
// <h1 className='newh1 '> New in our shop! </h1> </div>
//         <Pants />
//
//         </div>
//
//     </div>
// )}
// {products.length < 1 && (
//     <div className='please-wait'>  <Box>
//   <CircularProgress />
//   </Box> </div>
// )}

import React from 'react'
import Navbar from './Navbar'
//import BlazerSaleHomePage from '../Blazers/BlazerSaleHomePage'
//import DressOnSale from '../comp3/DressOnSale'
import {useState, useEffect} from 'react'
import { auth, fs} from '../Firebase'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import Cat from './Cat'







 const Home = () => {


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






      return (
          <>
      
          <div className='homebody'>
          <div className='allOfNav'>
              <Navbar user={user} totalProducts={totalProducts}/>
              <br></br>
                </div>

<div className='aboutfcmhome' >
 <h2 className='fcmptext'> What is FCM? </h2>
<p className='fcmptext'> FCM Delivery Services is an all round company which provides Food ,
 Clothing and Insurance  delivery services. </p>
 <p className='fcmptext'> For more information click <Link to='/about'> HERE </Link> </p>


 </div>
 <div className='thumbnail'>
 <Link className='dresspic' to='/dress'> <span>   <p className="pcenter"> Dresses</p>    </span> </Link>
<Link  className='thumbnailpic0' to='/underwear'>  <span>   <p className="pcenter"> Underpants</p> </span> </Link>
 <Link className='thumbnailpic' to='/blazer'> <span >  <p className="pcenter"> Blazers</p>   </span> </Link>

 </div>

 <div className='spotlight'> <p className='pspotlight'> For more clothing we have in store click <Cat />



  </p> </div>

<Footer />
</div>


          </>
      )

}

export default Home
