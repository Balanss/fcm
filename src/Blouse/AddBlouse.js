import React from 'react'
import { useState} from 'react'
import { storage, fs } from '../Firebase'
import { updateDoc, serverTimestamp } from "firebase/firestore";



const AddBlouse = () => {

const [description,setDescription] = useState('')
const [price,setPrice] = useState('')
const [salePrice,setSalePrice] = useState('')
const [ onSale,setOnSale] = useState('')
const [image,setImage] = useState(null)
const [ successMsg, setSuccessMsg] = useState('')
const [uploadError, setUploadError] = useState('')
const [imageError, setImageError] = useState('')


const types =['image/jpg','image/jpeg','image/png','image/PNG'];
   const handleProductImg=(e)=>{
       let selectedFile = e.target.files[0];
       if(selectedFile){
           if(selectedFile&&types.includes(selectedFile.type)){
               setImage(selectedFile);
               setImageError('');
           }
           else{
               setImage(null);
               setImageError('please select a valid image file type (png or jpg)')
           }
       }
       else{
           console.log('please select your file');
       }
   }





   const handleSubmit=(e)=>{



       e.preventDefault();
       // console.log(title, description, price);
       // console.log(image);
       const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
       uploadTask.on('state_changed',snapshot=>{
           const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
           console.log(progress);
       },error=>setUploadError(error.message),()=>{
           storage.ref('product-images').child(image.name).getDownloadURL().then( url =>{
               fs.collection('Blouse').add({

                   description,
                   price: Number(price),
                   salePrice: Number(salePrice),
                   onSale,
                  timestamp:serverTimestamp(),
                   url


               }).then(()=>{
                   setSuccessMsg('Product added successfully');

                   setDescription('');
                   setPrice('');
                   onSale('');
                   salePrice('')
                   document.getElementById('file').value='';
                   setImageError('');
                   setUploadError('');
                   setTimeout(()=>{
                       setSuccessMsg('');
                   },3000)
               }).catch(error=>setUploadError(error.message));
           })

       })
   }






return( <>

<div>
<h1> Add Blouse</h1>
</div>
{successMsg&&<>
  <div> {successMsg} </div> </>}
<form onSubmit={handleSubmit}>
<input type="text" required placeholder="product description" value={description}  onChange={(e) => setDescription(e.target.value)} />
<input type="text" required placeholder="product on sale ?" value={onSale}  onChange={(e) => setOnSale(e.target.value)} />
<input type="number" required placeholder="product price" value={price}  onChange={(e) => setPrice(e.target.value)}/>
<input type="number" required placeholder="product sale price" value={salePrice}  onChange={(e) => setSalePrice(e.target.value)}/>
<input type="file" id='file' required placeholder="product image front"   onChange={handleProductImg} />

<button> submit </button>

</form>

{imageError&&<>
  <div> {imageError} </div> </>}
{uploadError&&<>
  <div> {uploadError} </div> </>}


  </>)


}

export default AddBlouse
