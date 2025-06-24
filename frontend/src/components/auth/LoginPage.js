import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  KeyRound, 
  Loader2,
  CheckCircle,
  Smartphone,
  AtSign
} from 'lucide-react';
import { generateMockOtp, verifyMockOtp, mockUsers } from '../../mock/mockData';
import { sendPhoneOTP, verifyPhoneOTP, sendEmailOTP, initializeRecaptcha } from '../../firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [step, setStep] = useState('method'); // method, otp, success
  const [loginType, setLoginType] = useState(''); // email or phone
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleMethodSelect = (type) => {
    setLoginType(type);
    setStep('identifier');
  };

  const handleSendOtp = async () => {
    if (!identifier.trim()) {
      toast({
        title: "Error",
        description: `Please enter your ${loginType}`,
        variant: "destructive"
      });
      return;
    }

    // Validate format
    if (loginType === 'email' && !identifier.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (loginType === 'phone' && identifier.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockOtp = generateMockOtp(identifier);
      setStep('otp');
      setLoading(false);
      setResendTimer(60);
      
      toast({
        title: "OTP Sent!",
        description: `We've sent a 6-digit code to your ${loginType}. Check console for mock OTP: ${mockOtp}`,
      });

      // Start countdown
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const isValid = verifyMockOtp(identifier, otp);
      
      if (isValid) {
        // Find user in mock data or create new user
        let user = mockUsers.members.find(u => 
          u.email === identifier || u.phone === identifier
        );

        if (!user) {
          // Create new user if not found
          user = {
            id: Date.now().toString(),
            name: 'New User',
            email: loginType === 'email' ? identifier : '',
            phone: loginType === 'phone' ? identifier : '',
            isPaid: false,
            profile: null
          };
        }

        login(user);
        setStep('success');
        
        setTimeout(() => {
          if (!user.profile) {
            navigate('/profile-setup');
          } else if (!user.isPaid) {
            navigate('/payment');
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      } else {
        toast({
          title: "Invalid OTP",
          description: "The code you entered is incorrect or expired",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    handleSendOtp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10 mb-6 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {step === 'method' && 'Welcome Back!'}
              {step === 'identifier' && `Enter Your ${loginType === 'email' ? 'Email' : 'Phone'}`}
              {step === 'otp' && 'Verify OTP'}
              {step === 'success' && 'Login Successful!'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Method Selection */}
            {step === 'method' && (
              <div className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  Choose your preferred login method
                </p>
                
                <Button
                  onClick={() => handleMethodSelect('email')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  <AtSign className="w-6 h-6 mr-3" />
                  Login with Email
                </Button>
                
                <Button
                  onClick={() => handleMethodSelect('phone')}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  <Smartphone className="w-6 h-6 mr-3" />
                  Login with Phone
                </Button>

                <div className="text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => navigate('/signup')}
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Identifier Input */}
            {step === 'identifier' && (
              <div className="space-y-4">
                <div className="relative">
                  {loginType === 'email' ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  )}
                  
                  <Input
                    type={loginType === 'email' ? 'email' : 'tel'}
                    placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                    disabled={loading}
                  />
                </div>

                <Button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-5 h-5 mr-2" />
                      Send OTP
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep('method')}
                  className="w-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  Change Login Method
                </Button>
              </div>
            )}

            {/* OTP Input */}
            {step === 'otp' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-gray-300">
                    Enter the 6-digit code sent to
                  </p>
                  <Badge className="mt-2 bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                    {identifier}
                  </Badge>
                </div>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6 text-center tracking-widest"
                    maxLength={6}
                    disabled={loading}
                  />
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verify & Login
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    {resendTimer > 0 ? (
                      `Resend in ${resendTimer}s`
                    ) : (
                      'Resend OTP'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Success */}
            {step === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-green-400 text-lg font-semibold">
                  Welcome back! Redirecting...
                </p>
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;