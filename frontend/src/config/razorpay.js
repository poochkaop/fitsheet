// Razorpay Configuration for Fitsheet
export const RAZORPAY_CONFIG = {
  MERCHANT_ID: "QgN1zfrdGMSwLT",
  // Add these keys from your Razorpay Dashboard
  KEY_ID: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_demo", // Get from Dashboard → API Keys
  CURRENCY: "INR",
  AMOUNT: 19900, // ₹199 in paise (₹199 * 100)
  COMPANY_NAME: "Fitsheet",
  DESCRIPTION: "Fitsheet Premium - Lifetime Access",
  IMAGE: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
  THEME_COLOR: "#9333ea"
};

// Payment success/failure URLs
export const getPaymentUrls = () => {
  const baseUrl = window.location.origin;
  return {
    success_url: `${baseUrl}/payment-success`,
    cancel_url: `${baseUrl}/payment-failed`
  };
};

// Instructions to get missing keys:
// 1. Go to https://dashboard.razorpay.com
// 2. Navigate to Settings → API Keys
// 3. Generate API Keys if not already done
// 4. Copy RAZORPAY_KEY_ID (starts with rzp_test_)
// 5. Copy RAZORPAY_KEY_SECRET (keep this private!)
// 6. Add to environment variables