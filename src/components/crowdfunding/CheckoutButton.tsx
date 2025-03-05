"use client";
import { useState } from "react";

interface CheckoutButtonProps {
  buttonText: string;
  className?: string;
}

export default function CheckoutButton({ buttonText, className = "" }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Call our API endpoint to create a checkout
      const response = await fetch('/api/crowdfunding/checkout', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout');
      }
      
      const { checkoutUrl } = await response.json();
      
      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Sorry, there was an error processing your reservation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={isLoading}
      className={`bg-[rgb(37,211,156)] py-3 px-6 rounded-lg font-bold text-white w-full hover:bg-[rgb(30,180,130)] transition-colors ${className}`}
    >
      {isLoading ? 'Processing...' : buttonText}
    </button>
  );
} 