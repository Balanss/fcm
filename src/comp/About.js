import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import { auth, fs} from '../Firebase'
import Footer from './Footer'
import home from '../Image/home.png'



const About = () => {

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
      <Navbar user={user} totalProducts={totalProducts}/>
        </div>

        <div id="contact" className='aboutfcmhome' >
         <h2 className='contactinfotext'>Contact info </h2>
        <div className='contact-info'>
        <p > lilgil99@gmail.com </p>
        <p> 597 890-3150 / 597 887-5959 </p>

        <img className='toslogo' src={home} />
        </div>
         </div>




                 <div className='allofabout'>
         <div className=' insidefcm food' >
          <h2 className='abttext titleabout'> Food Delivery Services</h2>
          <ul className='tosul'>
          <li  className='tosli'> <p> Provides delivery services of food items by restaurants   </p> </li>
            <li className='tosli'> <p> Signed contractual agreements by  both parties  </p> </li>
              <li className='tosli'> <p> FCM monthly commission fee is USD 100,00 </p> </li>
              <li className='tosli'> <p> Delivery fees depends on the location of the restaurant which can range between SRD 50,00  and SRD 65,00 and should be no more than 8 km from the restaurant. </p> </li>
                <li className='tosli'> <p> The delivery driver collects the amount of the delivery and delivery fees and gives it to the restaurant in full when returns to the restaurant. </p> </li>
                  <li className='tosli'> <p> By the end of the day the restaurant gives the delivery driver the delivery fees together with a sheet of adresses of the delivered orders.The total of the orders on the sheet should always match the amount of the delivery fees. </p> </li>
                    <li className='tosli'> <p> The restaurant is responsible for the correct address given to the FCM driver. If not the restaurant will have to pay the delivery fees to the driver.</p> </li>


           </ul>
          </div>

          <div className=' insidefcm fashion' >
           <h2 className='abttext titleabout'> Clothing Delivery Services</h2>
            <ul className='tosul'>
            <li className='tosli'> <p> Provides delivery of clothing items when purchased through the FCM clothing link.</p> </li>
              <li className='tosli'> <p> After the order is placed an invoice will be mailed to FCM email address.</p> </li>
                <li className='tosli'> <p> After we received the invoice we will send you the total cost via email.</p> </li>
                <li className='tosli'> <p> Payment methods : via internet banking,COD (cash on delivery)</p> </li>
                  <li className='tosli'> <p> No return policy of items kept for more than 2 days.</p> </li>
                    <li className='tosli'> <p> Delivery fees North SRD 60.</p> </li>
                  <li className='tosli' >  <p> Delivery fees South SRD 45.</p> </li>
            </ul>
           </div>

           <div className='insidefcm insurance' >
            <h2 className='abttext titleabout'> And More</h2>
            <ul className='tosul'>
            <li  className='tosli'> <p> Provides delivery services of non food companies  </p> </li>
              <li className='tosli'> <p> Signed contractual agreements by  both parties  </p> </li>
                <li className='tosli'> <p> FCM monthly commission fee is USD 100,00 </p> </li>
                <li className='tosli'> <p> Delivery fees depends on the location  which can range between SRD 50,00  and SRD 65,00 and should be no more than 8 km. </p> </li>
                  <li className='tosli'> <p> The delivery driver collects the amount of the delivery and delivery fees and gives it to the company in full when returns to the company. </p> </li>
                    <li className='tosli'> <p> By the end of the day the company gives the delivery driver the delivery fees together with a sheet of adresses of the delivered orders.The total of the orders on the sheet should always match the amount of the delivery fees. </p> </li>
                      <li className='tosli'> <p> The company is responsible for the correct address given to the FCM driver. If not the restaurant will have to pay the delivery fees to the driver.</p> </li>


             </ul>

            </div>

            </div>



        <Footer />

        </div>

  </> )

}

export default About