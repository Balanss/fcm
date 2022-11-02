import React from 'react';

// all the name value must match inside emailjs {{}} thing

 const Contact = ({cartProduct}) => {

  return (
<>
      <h1 name="message">  {cartProduct.title} </h1>
      <div  className='product-img'>
          <img src={cartProduct.url} alt="product-img"/>
          <div  className='product-text-title'>{cartProduct.title}</div>
          <div className='product-text-description'>{cartProduct.description}</div>
          <div className='product-text-price'>$ {cartProduct.price}</div>
      </div>

</>
  );
};
