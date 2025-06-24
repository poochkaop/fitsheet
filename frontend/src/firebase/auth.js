import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut
} from 'firebase/auth';
import { auth } from './config';

// Initialize reCAPTCHA verifier
let recaptchaVerifier = null;

export const initializeRecaptcha = (elementId = 'recaptcha-container') => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
  }
  return recaptchaVerifier;
};

// Phone OTP Functions
export const sendPhoneOTP = async (phoneNumber) => {
  try {
    if (!recaptchaVerifier) {
      initializeRecaptcha();
    }
    
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return { success: true, confirmationResult };
  } catch (error) {
    console.error('Error sending phone OTP:', error);
    return { success: false, error: error.message };
  }
};

export const verifyPhoneOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error verifying phone OTP:', error);
    return { success: false, error: error.message };
  }
};

// Email OTP Functions
export const sendEmailOTP = async (email) => {
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/verify-email`,
      handleCodeInApp: true,
    };
    
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending email OTP:', error);
    return { success: false, error: error.message };
  }
};

export const verifyEmailOTP = async (email, emailLink) => {
  try {
    if (isSignInWithEmailLink(auth, emailLink)) {
      const result = await signInWithEmailLink(auth, email, emailLink);
      localStorage.removeItem('emailForSignIn');
      return { success: true, user: result.user };
    } else {
      return { success: false, error: 'Invalid email link' };
    }
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    return { success: false, error: error.message };
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error.message };
  }
};

// Check if user is signed in
export const getCurrentUser = () => {
  return auth.currentUser;
};