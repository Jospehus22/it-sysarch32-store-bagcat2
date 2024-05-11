import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PF6O706YJucnFzwPbkNRQvYYCw9JTYjGEG17cEzQyPGygqFtUgR1QM4r2gafnqkysw3aKE0WKGaT4Rao8gokg9d00CeDGxfrE'); // Replace with your publishable key


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'product', id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleClick = async (productName, price) => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

  const handleCheckout = () => {
    // Show prompt when checkout button is clicked
    alert('Proceed to checkout');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <div>
        {product.product_img && (
          <img src={product.product_img} alt="Product Image" style={{ maxWidth: '200px' }} />
        )}
        <p>{product.product_name}</p>
        <p>Description: {product.product_description}</p>
        <p>Price: ${product.product_price}</p>
        <p>Quantity: {product.product_quantity}</p>
        {/* Checkout button with onClick event */}
        <button onClick={()=>handleClick(product.product_name, product.product_price*100)}>Checkout</button>
      </div>
    </div>
  );
}

export default ProductDetail;
