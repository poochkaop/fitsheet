import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { createRazorpayOrder } from '../config/razorpay';
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  CheckCircle,
  Loader2,
  Star,
  Zap,
  Trophy,
  Heart,
  Clock,
  Target,
  Users,
  Lock,
  Smartphone
} from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState('info'); // info, processing, success

  const features = [
    { icon: <Target className="w-5 h-5" />, text: "Personalized Workout Plans" },
    { icon: <Heart className="w-5 h-5" />, text: "Custom Diet Plans" },
    { icon: <Trophy className="w-5 h-5" />, text: "Progress Tracking" },
    { icon: <Clock className="w-5 h-5" />, text: "Workout Reminders" },
    { icon: <Users className="w-5 h-5" />, text: "24/7 Support" },
    { icon: <Zap className="w-5 h-5" />, text: "Lifetime Access" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Lost 12kg in 4 months! The personalized plan made all the difference.",
      rating: 5
    },
    {
      name: "Rahul Patel",
      text: "Gained muscle and confidence. Best investment I've made!",
      rating: 5
    },
    {
      name: "Anjali Singh",
      text: "Home workouts that actually work. Highly recommended!",
      rating: 5
    }
  ];

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStep('processing');
    
    try {
      await createRazorpayOrder(
        {
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        // Success callback
        (paymentData) => {
          console.log('Payment Success:', paymentData);
          
          // Update user with payment info
          const updatedUser = {
            ...user,
            isPaid: true,
            paymentDate: new Date().toISOString(),
            subscriptionStatus: 'active',
            paymentDetails: paymentData
          };
          
          updateUser(updatedUser);
          setPaymentStep('success');
          
          toast({
            title: "Payment Successful! 🎉",
            description: "Welcome to Fitsheet Premium! Your journey begins now.",
          });
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
          
          setLoading(false);
        },
        // Failure callback
        (error) => {
          console.error('Payment Failed:', error);
          
          setPaymentStep('info');
          setLoading(false);
          
          toast({
            title: "Payment Failed",
            description: error || "Something went wrong. Please try again.",
            variant: "destructive"
          });
        }
      );
    } catch (error) {
      console.error('Payment Error:', error);
      
      setPaymentStep('info');
      setLoading(false);
      
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSkip = () => {
    toast({
      title: "Access Limited",
      description: "You can explore the app but won't have access to workout and diet plans",
      variant: "destructive"
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10 mb-6 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Info */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                {paymentStep === 'info' && 'Unlock Your Fitness Journey'}
                {paymentStep === 'processing' && 'Processing Payment...'}
                {paymentStep === 'success' && 'Welcome to Fitsheet Premium!'}
              </CardTitle>
              {paymentStep === 'info' && (
                <p className="text-gray-300 text-lg">
                  Get instant access to personalized workout and diet plans
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {paymentStep === 'info' && (
                <>
                  {/* Pricing */}
                  <div className="text-center p-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30">
                    <div className="text-5xl font-black text-white mb-2">₹199</div>
                    <Badge className="bg-emerald-400 text-black text-sm px-3 py-1 mb-2">
                      ONE-TIME PAYMENT
                    </Badge>
                    <p className="text-gray-300">Lifetime access • No recurring charges</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white mb-4">What's Included:</h3>
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center text-white">
                        <div className="text-emerald-400 mr-3">
                          {feature.icon}
                        </div>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-black hover:from-emerald-500 hover:to-cyan-600 text-xl py-6 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <Lock className="w-6 h-6 mr-3" />
                    Pay ₹199 & Start Now
                  </Button>

                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">
                      Secure payment powered by Razorpay
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="w-full text-gray-400 hover:text-white hover:bg-white/10 mt-4"
                  >
                    Continue with Limited Access
                  </Button>
                </>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <div>
                    <p className="text-white text-lg mb-2">Processing your payment...</p>
                    <p className="text-gray-300">Please wait while we set up your account</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-gray-400 text-sm">Almost there...</p>
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <p className="text-green-400 text-xl font-bold mb-2">Payment Successful!</p>
                    <p className="text-gray-300">Your personalized plans are being prepared...</p>
                  </div>
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 text-sm">
                      <strong>Welcome to Fitsheet Premium!</strong><br />
                      Redirecting to your dashboard...
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Testimonials & Info */}
          <div className="space-y-6">
            {/* User Profile Preview */}
            {user?.profile && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Your Profile</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Goal:</span> {user.profile.goal?.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Level:</span> {user.profile.activityLevel?.toUpperCase()}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Age:</span> {user.profile.age} years
                    </div>
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Target:</span> {user.profile.targetMonths} months
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonials */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Success Stories</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-white font-medium ml-2">{testimonial.name}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{testimonial.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Join the Community</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">1000+</div>
                    <div className="text-gray-300 text-sm">Active Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400 mb-1">50k+</div>
                    <div className="text-gray-300 text-sm">Workouts Done</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">95%</div>
                    <div className="text-gray-300 text-sm">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-400 mb-1">4.9⭐</div>
                    <div className="text-gray-300 text-sm">User Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Secure Payment</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Razorpay Secure</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>No Hidden Charges</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;