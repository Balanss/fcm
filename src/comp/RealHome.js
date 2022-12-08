import React from 'react'
import NavbarHome from './NavbarHome'
import {useState, useEffect} from 'react'
import { auth, fs} from '../Firebase'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import './RealHome.css'
import McDelivery from '../Image/McDelivery.png'
import julia from '../Image/julia.jpg'
import abbas from '../Image/abbas.jpg'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import foodemoji from '../Image/foodemoji.png'
import clothingemoji from '../Image/clothingemoji.png'
import moreemoji from '../Image/moreemoji.png'
import danny from '../Image/danny.jpg'
import banner from '../Image/banner.png'


const RealHome = () => {

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


      return (
        <>

        <div className='homebody'>
        <div className='allOfNav'>
            <NavbarHome user={user}/>
            <br></br>
              </div>

              <div className ='homepagefcm'> <h1 className="homepagesame">FCM Delivery Services</h1>
              </div>
              <div className ='homepagemotto'>
              <h2>Service with 2 smiles </h2>
                <EmojiEmotionsIcon className='smileicon' /> <EmojiEmotionsIcon className='smileicon' />
               </div>
               <div className ='homepageservice'>
              <div className=' insidefcm food  homepagefood' >
               <h2 className='abttext titleabout'> Food Delivery Services</h2>
               <ul className='tosul'>
               <li  className='tosli'> <p> Provides delivery services of food items by restaurants   </p> </li>
                 <li className='tosli'> <p> Signed contractual agreements by  both parties  </p> </li>
                      <li className='tosli'> <p> For business inquiries click <Link  to="/about"> HERE </Link>  </p> </li>
     <h2 className='abttext titleabout titlebusiness'> Our business partners</h2>
         <div className='div-business'>

           <li className='tosli removemarker'> <a href="https://www.facebook.com/McDonalds-Suriname-113874132643211/">  <img className='McDelivery macky' src={McDelivery} alt={McDelivery} /> <p> Hermitage Mall</p> </a> </li>
           <li className='tosli removemarker'> <a href="https://www.facebook.com/juliasfoodsu/">  <img className='McDelivery' src={julia} alt={julia} /> <p className='juliainfo'> Verlengde Gemenelandsweg 125, Paramaribo tel :896-8740</p> </a> </li>
           <li className='tosli removemarker'> <a href="https://www.facebook.com/slagerij.abbas.sr/"> <img className='McDelivery' src={abbas} alt={abbas} /> <p> Goudenregen St, Paramaribo tel:432-233</p> </a> </li>
           <li className='tosli removemarker'> <a href="https://www.facebook.com/people/Hotel-de-Luifel/100068379541560/"> <img className='McDelivery' src={danny} alt={danny} /> <p>  Gonda St, Paramaribo tel:39-933</p> </a> </li>
         </div>
                </ul>
               </div>
                   <div className='foodemoji'> <img loading="lazy" className='emoji' src={foodemoji} alt={foodemoji} /> </div>
               <div className=' insidefcm fashion homepagefood' >
                <h2 className='abttext titleabout'> Clothing Delivery Services</h2>
                 <ul className='tosul'>
                 <li className='tosli'> <p> Provides delivery of clothing items when purchased through the FCM clothing link. <Link to='/clothing'> Here</Link> </p> </li>
                   <li className='tosli'> <p> After the order is placed an invoice will be mailed to FCM email address.</p> </li>
                     <li className='tosli'> <p> After we received the invoice we will send you the total cost via email.</p> </li>
                     <li className='tosli'> <p> Payment methods : via internet banking,COD (cash on delivery)</p> </li>
                       <li className='tosli'> <p> No return policy of items kept for more than 2 days.</p> </li>

                 </ul>
                </div>
                 <div className='foodemoji'> <img className='emoji' loading="lazy" src={clothingemoji} alt={clothingemoji} /> </div>
                <div className='insidefcm insurance homepagefood homepagemore' >
                 <h2 className='abttext titleabout'> And More</h2>
                 <ul className='tosul'>
                 <li  className='tosli'> <p> Provides delivery services of non food companies  </p> </li>
                   <li className='tosli'> <p> Signed contractual agreements by  both parties  </p> </li>
                   <li className='tosli'> <p> For business inquiries click <Link to="/about"> HERE </Link>  </p> </li>
                  </ul>

                 </div>
                 </div>
                 <div className='foodemojipink'>

                     <img className='emojipink bigscreen' src={banner} alt={moreemoji} />
               <img className='emojipink smallscreen' src={moreemoji} alt={banner} />  </div>


<Footer />
</div>
      </> )
}

export default RealHome;
