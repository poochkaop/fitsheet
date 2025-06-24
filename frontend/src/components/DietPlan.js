import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  Apple, 
  Coffee,
  Sun,
  Moon,
  Utensils,
  Target,
  Flame,
  Droplets,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';
import { mockDietPlans } from '../mock/mockData';

const DietPlan = () => {
  const navigate = useNavigate();
  const { user, isPaid } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [consumedCalories, setConsumedCalories] = useState(850); // Mock data
  const [waterIntake, setWaterIntake] = useState(6); // glasses

  if (!isPaid) {
    navigate('/payment');
    return null;
  }

  const planKey = user?.profile?.goal || 'weight_loss';
  const dietPlan = mockDietPlans[planKey];

  const mealIcons = {
    breakfast: <Coffee className="w-5 h-5" />,
    lunch: <Sun className="w-5 h-5" />,
    dinner: <Moon className="w-5 h-5" />,
    snacks: <Apple className="w-5 h-5" />
  };

  const mealColors = {
    breakfast: 'from-orange-400 to-amber-500',
    lunch: 'from-yellow-400 to-orange-500',
    dinner: 'from-purple-500 to-indigo-600',
    snacks: 'from-green-400 to-emerald-500'
  };

  const calculateTotalNutrients = (meals) => {
    return meals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const macroColors = {
    protein: 'text-red-400',
    carbs: 'text-blue-400',
    fat: 'text-yellow-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Diet Plan</h1>
                <p className="text-gray-400">{dietPlan.name}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{dietPlan.dailyCalories}</div>
              <div className="text-gray-400 text-sm">Daily Calories</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Daily Overview */}
          <div className="space-y-6">
            {/* Daily Progress */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Calories</span>
                    <span className="text-white">{consumedCalories} / {dietPlan.dailyCalories}</span>
                  </div>
                  <Progress value={(consumedCalories / dietPlan.dailyCalories) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-red-400 font-bold">45g</div>
                    <div className="text-gray-400 text-xs">Protein</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-blue-400 font-bold">120g</div>
                    <div className="text-gray-400 text-xs">Carbs</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-yellow-400 font-bold">35g</div>
                    <div className="text-gray-400 text-xs">Fat</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Water Intake */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-400" />
                  Water Intake
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Glasses</span>
                  <span className="text-white">{waterIntake} / 8</span>
                </div>
                <Progress value={(waterIntake / 8) * 100} className="h-2 mb-4" />
                <div className="grid grid-cols-4 gap-1">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-8 rounded flex items-center justify-center cursor-pointer transition-all ${
                        index < waterIntake
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}
                      onClick={() => setWaterIntake(Math.max(0, index < waterIntake ? index : index + 1))}
                    >
                      <Droplets className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meal Navigation */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Meal Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.keys(dietPlan.meals).map((meal) => (
                  <Button
                    key={meal}
                    variant={selectedMeal === meal ? "default" : "ghost"}
                    onClick={() => setSelectedMeal(meal)}
                    className={`w-full justify-start p-4 h-auto ${
                      selectedMeal === meal
                        ? `bg-gradient-to-r ${mealColors[meal]} text-white`
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {mealIcons[meal]}
                        <span className="ml-3 font-medium capitalize">{meal}</span>
                      </div>
                      <div className="text-sm opacity-70">
                        {dietPlan.meals[meal].length} options
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Meal Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Meal Header */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${mealColors[selectedMeal]}`}>
                      {mealIcons[selectedMeal]}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white capitalize">{selectedMeal}</h2>
                      <p className="text-gray-400">
                        {selectedMeal === 'breakfast' && 'Start your day right'}
                        {selectedMeal === 'lunch' && 'Power through your afternoon'}
                        {selectedMeal === 'dinner' && 'End your day with nutrition'}
                        {selectedMeal === 'snacks' && 'Healthy bites between meals'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {dietPlan.meals[selectedMeal].length}
                    </div>
                    <div className="text-gray-400 text-sm">Options</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meal Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietPlan.meals[selectedMeal].map((meal, index) => {
                const nutrients = calculateTotalNutrients([meal]);
                
                return (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{meal.name}</h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={`bg-gradient-to-r ${mealColors[selectedMeal]} text-white`}>
                              {meal.calories} cal
                            </Badge>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              15-20 min
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Macros */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400">Protein</span>
                          <span className="text-white">{meal.protein}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-400">Carbs</span>
                          <span className="text-white">{meal.carbs}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-400">Fat</span>
                          <span className="text-white">{meal.fat}g</span>
                        </div>
                      </div>

                      {/* Macro Bars */}
                      <div className="space-y-2">
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-red-400 h-2 rounded-full" 
                            style={{ width: `${(meal.protein / 50) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full" 
                            style={{ width: `${(meal.carbs / 100) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${(meal.fat / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tips Section */}
            <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-emerald-400" />
                  Nutrition Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">Eat protein with every meal</span>
                    </div>
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">Stay hydrated throughout the day</span>
                    </div>
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">Include colorful vegetables</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">Practice portion control</span>
                    </div>
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">Eat slowly and mindfully</span>
                    </div>
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">Plan your meals ahead</span>
                    </div>
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

export default DietPlan;