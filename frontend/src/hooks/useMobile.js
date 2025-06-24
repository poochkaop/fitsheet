import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useMobile = () => {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState('web');

  useEffect(() => {
    // Check if running on native platform
    const native = Capacitor.isNativePlatform();
    const currentPlatform = Capacitor.getPlatform();
    
    setIsNative(native);
    setPlatform(currentPlatform);

    if (native) {
      // Configure status bar for mobile
      StatusBar.setStyle({ style: Style.Dark });
      
      // Hide splash screen after app loads
      SplashScreen.hide();
    }
  }, []);

  // Haptic feedback functions
  const hapticImpact = (style = ImpactStyle.Light) => {
    if (isNative) {
      Haptics.impact({ style });
    }
  };

  const hapticSelection = () => {
    if (isNative) {
      Haptics.selectionStart();
    }
  };

  const hapticNotification = (type = 'SUCCESS') => {
    if (isNative) {
      Haptics.notification({ type });
    }
  };

  return {
    isNative,
    platform,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isWeb: platform === 'web',
    hapticImpact,
    hapticSelection,
    hapticNotification
  };
};

// Mobile-specific utilities
export const mobileUtils = {
  // Safe area helpers for mobile devices
  getSafeAreaInsets: () => {
    if (typeof window !== 'undefined') {
      return {
        top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'),
        right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0'),
        bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0'),
        left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0')
      };
    }
    return { top: 0, right: 0, bottom: 0, left: 0 };
  },

  // Check if device has notch
  hasNotch: () => {
    if (typeof window !== 'undefined') {
      return window.screen.height / window.screen.width > 2 || 
             (window.CSS && window.CSS.supports && window.CSS.supports('padding-top', 'env(safe-area-inset-top)'));
    }
    return false;
  }
};