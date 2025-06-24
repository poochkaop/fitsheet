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
  User,
  Smartphone,
  AtSign,
  UserPlus
} from 'lucide-react';
import { generateMockOtp, verifyMockOtp } from '../../mock/mockData';

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [step, setStep] = useState('details'); // details, method, otp, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loginType: '' // email or phone for OTP
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleDetailsSubmit = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setStep('method');
  };

  const handleMethodSelect = (type) => {
    setFormData(prev => ({ ...prev, loginType: type }));
    handleSendOtp(type);
  };

  const handleSendOtp = async (type) => {
    setLoading(true);
    
    const identifier = type === 'email' ? formData.email : formData.phone;
    
    // Simulate API call
    setTimeout(() => {
      const mockOtp = generateMockOtp(identifier);
      setStep('otp');
      setLoading(false);
      setResendTimer(60);
      
      toast({
        title: "OTP Sent!",
        description: `We've sent a 6-digit code to your ${type}. Check console for mock OTP: ${mockOtp}`,
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

    const identifier = formData.loginType === 'email' ? formData.email : formData.phone;

    // Simulate API call
    setTimeout(() => {
      const isValid = verifyMockOtp(identifier, otp);
      
      if (isValid) {
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          isPaid: false,
          profile: null
        };

        login(newUser);
        setStep('success');
        
        setTimeout(() => {
          navigate('/profile-setup');
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
    handleSendOtp(formData.loginType);
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
              {step === 'details' && 'Create Your Account'}
              {step === 'method' && 'Choose Verification Method'}
              {step === 'otp' && 'Verify Your Account'}
              {step === 'success' && 'Account Created!'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Details Form */}
            {step === 'details' && (
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                  />
                </div>

                <Button
                  onClick={handleDetailsSubmit}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Continue
                </Button>

                <div className="text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Method Selection */}
            {step === 'method' && (
              <div className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  How would you like to verify your account?
                </p>
                
                <Button
                  onClick={() => handleMethodSelect('email')}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  {loading && formData.loginType === 'email' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Sending to Email...
                    </>
                  ) : (
                    <>
                      <AtSign className="w-6 h-6 mr-3" />
                      Verify via Email
                      <Badge className="ml-2 bg-white/20 text-white text-xs">
                        {formData.email}
                      </Badge>
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => handleMethodSelect('phone')}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-6 transition-all duration-300 transform hover:scale-105"
                >
                  {loading && formData.loginType === 'phone' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Sending to Phone...
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-6 h-6 mr-3" />
                      Verify via SMS
                      <Badge className="ml-2 bg-white/20 text-white text-xs">
                        {formData.phone}
                      </Badge>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep('details')}
                  className="w-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  Edit Details
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
                    {formData.loginType === 'email' ? formData.email : formData.phone}
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verify & Create Account
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
                  Account created successfully!
                </p>
                <p className="text-gray-300">
                  Setting up your profile...
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

export default SignupPage;