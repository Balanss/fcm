
import 'firebase/compat/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 import { Timestamp } from 'firebase/firestore';
 import { getFirestore} from "@firebase/firestore";





 const firebaseConfig = {

   apiKey: process.env.REACT_APP_MY_API_KEY_BASE,

   authDomain: process.env.REACT_APP_MY_API_KEY_DOMAIN ,

   databaseURL: process.env.REACT_APP_MY_API_KEY_URL,

   projectId:process.env.REACT_APP_MY_API_KEY_PID ,

   storageBucket: process.env.REACT_APP_MY_API_KEY_BUCKET  ,

   messagingSenderId: process.env.REACT_APP_MY_API_KEY_SENDER ,

   appId: process.env.REACT_APP_MY_API_KEY_ID,

   measurementId: process.env.REACT_APP_MY_API_KEY_MID 

 };


const app = firebase.initializeApp(firebaseConfig)

 //const app = initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const storage = firebase.storage()
 const fs = firebase.firestore()
const timestamp = firebase.firestore()
const db = getFirestore(app)





export  { auth,fs,storage,timestamp, db}
