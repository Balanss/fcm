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
import {Link} from 'react-router-dom'

//             <div className='business-insultant' >    <h2 className='titleabout business-insultant-h2'>
// We provide certified  styling services to people on how to dress appropriately on the work floor as well at social events such as</h2>
// <ul className='tosul'>
// <li className='tosli'><p> On -call stylist for hotels, event planners, wedding planners  </p> </li>
// <li className='tosli'><p> Stylist for politicians </p> </li>
// <li className='tosli'><p> Visual merchandising for pop-up stores  </p> </li>
// <li className='tosli'> <p> Styling for retail stores </p> </li>
// <li className='tosli'> <p> Casting models for events  </p> </li>
// </ul>
// <h2 className='titleabout  business-insultant-h2'> This consultation could be scheduled by appointment. The private consultation consists of </h2>
// <ul className='tosul'>
// <li className='tosli'><p>  Client interview/Body shape analysis </p> </li>
// <li className='tosli'><p> Client needs Analysis   </p></li>
// <li className='tosli'><p> Agreed Budget to spend </p> </li>
// <li className='tosli'><p> Preference of shopping with the stylist/trying out some outfits </p> </li>
// <li className='tosli'><p> Delivery options available of try outs after online consultation  </p></li>
// <img className='certified' src={certified} />
//
// </ul>
//             </div>

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
      <NavbarHome user={user} />
        </div>

        <div id="contact" className='aboutfcmhome' >
         <h2 className='contactinfotext'>About us </h2>
         <div className='contact-info'>
         <h2 className='contactinfotext '>  <Link className='colorwhite' to='/Contact'> Contact Us  </Link> </h2>
         <img className='toslogo' src={home} />
         </div>

         </div>




                 <div className='allofabout'>
         <div className=' insidefcm food  insideabout' >
          <h2 className='abttext titleabout'> Food Delivery Services</h2>
          <ul className='tosul'>
          <li  className='tosli'> <p> Provides delivery services of food items by restaurants. </p> </li>
            <li className='tosli'> <p> Signed contractual agreements by  both parties. </p> </li>
              <li className='tosli'> <p> Delivery fees  will be agreed upon. </p> </li>
                <li className='tosli'> <p> The delivery driver collects the amount of the delivery and delivery fees and gives it to the restaurant in full when returns to the restaurant. </p> </li>
                  <li className='tosli'> <p> By the end of the day the restaurant gives the delivery driver the delivery fees together with a sheet of adresses of the delivered orders.The total of the orders on the sheet should always match the amount of the delivery fees. </p> </li>
                    <li className='tosli'> <p> The restaurant is responsible for the correct address given to the FCM driver. If not the restaurant will have to pay the delivery fees to the driver.</p> </li>

           </ul>
          </div>

          <div className=' insidefcm fashion insideabout' >
           <h2 className='abttext titleabout'> Clothing Delivery Services</h2>
            <ul className='tosul'>
            <li className='tosli'> <p> Provides delivery of clothing items when purchased through the FCM clothing link.</p> </li>
              <li className='tosli'> <p> After the order is placed an invoice will be mailed to FCM email address.</p> </li>
                <li className='tosli'> <p> After we received the invoice we will send you the total cost via email.</p> </li>
                <li className='tosli'> <p> Payment methods : via internet banking,COD (cash on delivery)</p> </li>
                  <li className='tosli'> <p> No return policy of items kept for more than 2 days.</p> </li>

            </ul>
           </div>

           <div className='insidefcm insurance insideabout' >
            <h2 className='abttext titleabout'> And More</h2>
            <ul className='tosul'>
            <li  className='tosli'> <p> Provides delivery services of non food companies.  </p> </li>
              <li  className='tosli'> <p> Airport service to and from  Johan Adolf Pengel Int Airport . </p> </li>
                <li  className='tosli'> <p> For the delivery of vehicle, medical and personal Assuria insurance cards.  </p> </li>
                 <li className='tosli'> <p> For business inquiries click <Link to="/contact"> HERE </Link>  </p> </li>
             </ul>

            </div>

            </div>





        <Footer />

        </div>

  </> )

}

export default About
