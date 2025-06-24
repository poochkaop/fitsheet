// Razorpay Configuration for Fitsheet
export const RAZORPAY_CONFIG = {
  MERCHANT_ID: "QgN1zfrdGMSwLT",
  KEY_ID: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_6Cf7GhzoDgqM6Q",
  CURRENCY: "INR",
  AMOUNT: 19900, // ₹199 in paise (₹199 * 100)
  COMPANY_NAME: "Fitsheet",
  DESCRIPTION: "Fitsheet Premium - Lifetime Access to Personalized Workout & Diet Plans",
  IMAGE: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
  THEME_COLOR: "#9333ea"
};

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Payment success/failure URLs
export const getPaymentUrls = () => {
  const baseUrl = window.location.origin;
  return {
    success_url: `${baseUrl}/payment-success`,
    cancel_url: `${baseUrl}/payment-failed`
  };
};

// Create Razorpay order
export const createRazorpayOrder = async (userDetails, onSuccess, onFailure) => {
  try {
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    const options = {
      key: RAZORPAY_CONFIG.KEY_ID,
      amount: RAZORPAY_CONFIG.AMOUNT,
      currency: RAZORPAY_CONFIG.CURRENCY,
      name: RAZORPAY_CONFIG.COMPANY_NAME,
      description: RAZORPAY_CONFIG.DESCRIPTION,
      image: RAZORPAY_CONFIG.IMAGE,
      prefill: {
        name: userDetails.name || '',
        email: userDetails.email || '',
        contact: userDetails.phone || ''
      },
      theme: {
        color: RAZORPAY_CONFIG.THEME_COLOR
      },
      handler: function (response) {
        // Payment successful
        console.log('Payment successful:', response);
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          amount: RAZORPAY_CONFIG.AMOUNT,
          currency: RAZORPAY_CONFIG.CURRENCY
        });
      },
      modal: {
        ondismiss: function() {
          // Payment cancelled
          onFailure('Payment cancelled by user');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Razorpay payment error:', error);
    onFailure(error.message || 'Payment failed');
  }
};