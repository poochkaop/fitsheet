import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  ArrowRight,
  User, 
  Calendar,
  Weight,
  Ruler,
  Target,
  Clock,
  Activity,
  CheckCircle,
  Loader2
} from 'lucide-react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    targetMonths: '',
    workoutTime: '',
    preferredTime: ''
  });

  const genders = [
    { value: 'male', label: 'Male', icon: '👨' },
    { value: 'female', label: 'Female', icon: '👩' },
    { value: 'other', label: 'Other', icon: '👤' }
  ];

  const activityLevels = [
    { value: 'beginner', label: 'Beginner', desc: 'New to fitness' },
    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
    { value: 'advanced', label: 'Advanced', desc: 'Very experienced' }
  ];

  const goals = [
    { value: 'weight_loss', label: 'Weight Loss', icon: '🔥' },
    { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { value: 'maintenance', label: 'Stay Fit', icon: '⚖️' },
    { value: 'endurance', label: 'Build Endurance', icon: '🏃' }
  ];

  const workoutTimes = [
    { value: 'morning', label: 'Morning', icon: '🌅', desc: '6 AM - 10 AM' },
    { value: 'afternoon', label: 'Afternoon', icon: '☀️', desc: '12 PM - 4 PM' },
    { value: 'evening', label: 'Evening', icon: '🌆', desc: '5 PM - 9 PM' },
    { value: 'night', label: 'Night', icon: '🌙', desc: '9 PM - 11 PM' }
  ];

  const handleNext = () => {
    // Validation for each step
    if (step === 1) {
      if (!formData.gender || !formData.age) {
        toast({
          title: "Required Fields",
          description: "Please select your gender and enter your age",
          variant: "destructive"
        });
        return;
      }
      if (formData.age < 16 || formData.age > 80) {
        toast({
          title: "Invalid Age",
          description: "Age must be between 16 and 80",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === 2) {
      if (!formData.weight || !formData.height) {
        toast({
          title: "Required Fields",
          description: "Please enter your weight and height",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === 3) {
      if (!formData.activityLevel || !formData.goal) {
        toast({
          title: "Required Fields",
          description: "Please select your activity level and goal",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === 4) {
      if (!formData.targetMonths) {
        toast({
          title: "Required Field",
          description: "Please enter your target timeline",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === 5) {
      if (!formData.workoutTime || !formData.preferredTime) {
        toast({
          title: "Required Fields",
          description: "Please select your workout time and preferred time",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        profile: formData
      };
      
      updateUser(updatedUser);
      
      toast({
        title: "Profile Created!",
        description: "Your personalized fitness profile has been set up successfully",
      });
      
      setLoading(false);
      navigate('/payment');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10 mb-6 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      num < step
                        ? 'bg-green-500 text-white'
                        : num === step
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/20 text-gray-400'
                    }`}
                  >
                    {num < step ? <CheckCircle className="w-4 h-4" /> : num}
                  </div>
                ))}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Physical Stats'}
              {step === 3 && 'Fitness Level & Goals'}
              {step === 4 && 'Target Timeline'}
              {step === 5 && 'Workout Schedule'}
            </CardTitle>
            <p className="text-gray-300">
              Step {step} of 5
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <User className="w-5 h-5 inline mr-2" />
                    Gender
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    {genders.map((gender) => (
                      <Button
                        key={gender.value}
                        variant={formData.gender === gender.value ? "default" : "outline"}
                        onClick={() => setFormData(prev => ({ ...prev, gender: gender.value }))}
                        className={`p-4 h-auto ${
                          formData.gender === gender.value
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{gender.icon}</div>
                          <div className="text-sm font-medium">{gender.label}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Age
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                    min="16"
                    max="80"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Physical Stats */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Weight className="w-5 h-5 inline mr-2" />
                    Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter your weight in kg"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                    min="30"
                    max="200"
                  />
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Ruler className="w-5 h-5 inline mr-2" />
                    Height (cm)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter your height in cm"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                    min="120"
                    max="220"
                  />
                </div>

                {formData.weight && formData.height && (
                  <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 text-center">
                      <strong>BMI:</strong> {(formData.weight / ((formData.height / 100) ** 2)).toFixed(1)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Activity Level & Goals */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Activity className="w-5 h-5 inline mr-2" />
                    Activity Level
                  </Label>
                  <div className="space-y-3">
                    {activityLevels.map((level) => (
                      <Button
                        key={level.value}
                        variant={formData.activityLevel === level.value ? "default" : "outline"}
                        onClick={() => setFormData(prev => ({ ...prev, activityLevel: level.value }))}
                        className={`w-full p-4 h-auto justify-start ${
                          formData.activityLevel === level.value
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm opacity-70">{level.desc}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Target className="w-5 h-5 inline mr-2" />
                    Fitness Goal
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {goals.map((goal) => (
                      <Button
                        key={goal.value}
                        variant={formData.goal === goal.value ? "default" : "outline"}
                        onClick={() => setFormData(prev => ({ ...prev, goal: goal.value }))}
                        className={`p-4 h-auto ${
                          formData.goal === goal.value
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{goal.icon}</div>
                          <div className="text-sm font-medium">{goal.label}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Timeline */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Target Timeline
                  </Label>
                  <p className="text-gray-300 text-sm mb-4">
                    In how many months do you want to achieve your goal?
                  </p>
                  <Input
                    type="number"
                    placeholder="Enter number of months"
                    value={formData.targetMonths}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetMonths: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                    min="1"
                    max="24"
                  />
                  
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[3, 6, 9, 12].map((months) => (
                      <Button
                        key={months}
                        variant="outline"
                        onClick={() => setFormData(prev => ({ ...prev, targetMonths: months.toString() }))}
                        className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        {months}m
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Workout Schedule */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">
                    <Clock className="w-5 h-5 inline mr-2" />
                    Preferred Workout Time
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {workoutTimes.map((time) => (
                      <Button
                        key={time.value}
                        variant={formData.workoutTime === time.value ? "default" : "outline"}
                        onClick={() => setFormData(prev => ({ ...prev, workoutTime: time.value }))}
                        className={`p-4 h-auto ${
                          formData.workoutTime === time.value
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{time.icon}</div>
                          <div className="text-sm font-medium">{time.label}</div>
                          <div className="text-xs opacity-70">{time.desc}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">
                    Specific Time
                  </Label>
                  <Input
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg py-6"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-white/20">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1 || loading}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={loading}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Profile...
                  </>
                ) : step === 5 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Setup
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;