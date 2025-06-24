import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Dumbbell, 
  Heart, 
  Target, 
  Trophy, 
  Users, 
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Smartphone
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Plans",
      description: "Custom workout and diet plans based on your goals, fitness level, and preferences"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Timing",
      description: "Choose your preferred workout time and get smart reminders to stay consistent"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Track every workout, monitor your streak, and visualize your fitness journey"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Nutrition Guidance",
      description: "Complete meal plans with calorie tracking to fuel your transformation"
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Members" },
    { number: "95%", label: "Success Rate" },
    { number: "50k+", label: "Workouts Completed" },
    { number: "4.9⭐", label: "User Rating" }
  ];

  const pricing = {
    amount: "₹199",
    features: [
      "Personalized Workout Plans",
      "Custom Diet Plans",
      "Progress Tracking",
      "Workout Reminders",
      "24/7 Access",
      "Lifetime Access"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Fitsheet
            </h1>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-white hover:bg-white/10 transition-all duration-300"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-lg px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Transform at Home
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Personal
            </span>
            <br />
            Fitness Coach
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get personalized workout plans, nutrition guidance, and track your progress 
            with minimal equipment - all from the comfort of your home.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 text-xl px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/25"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <div className="flex items-center text-gray-300">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              <span>One-time payment • Lifetime access</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-500/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-500/20 rounded-full animate-ping" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Fitsheet?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to achieve your fitness goals, designed for busy people who want results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:rotate-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 text-yellow-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            One payment, lifetime access. No subscriptions, no hidden fees.
          </p>

          <Card className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-yellow-400/30 backdrop-blur-sm max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Badge className="bg-yellow-400 text-black text-sm px-3 py-1 mb-4">
                  LIFETIME ACCESS
                </Badge>
                <div className="text-5xl font-black text-white mb-2">
                  {pricing.amount}
                </div>
                <div className="text-gray-400">One-time payment</div>
              </div>

              <div className="space-y-4 mb-8">
                {pricing.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                onClick={() => navigate('/signup')}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 text-lg py-3 transition-all duration-300 transform hover:scale-105"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Body?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of people who have already started their fitness journey at home.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 text-xl px-8 py-4 transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/admin')}
              className="border-white/30 text-white hover:bg-white/10 text-xl px-8 py-4 transition-all duration-300"
            >
              Admin Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold">Fitsheet</span>
          </div>
          <p className="text-gray-400">
            Transform your body, transform your life - all from home.
          </p>
        </div>
      </footer>

      {/* reCAPTCHA container (invisible) */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LandingPage;