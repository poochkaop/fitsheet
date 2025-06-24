import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Calendar, 
  Trophy, 
  Target, 
  Clock,
  Dumbbell,
  Apple,
  TrendingUp,
  Settings,
  LogOut,
  Lock,
  Play,
  CheckCircle,
  Flame,
  Zap,
  Star,
  Bell,
  BarChart3
} from 'lucide-react';
import { mockWorkoutPlans, mockDietPlans } from '../mock/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isPaid } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayWorkout, setTodayWorkout] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get today's workout
    if (user?.profile && isPaid) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const planKey = `${user.profile.activityLevel}_${user.profile.goal}`;
      const workoutPlan = mockWorkoutPlans[planKey];
      
      if (workoutPlan && workoutPlan.schedule[today]) {
        setTodayWorkout(workoutPlan.schedule[today]);
      }
    }

    return () => clearInterval(timer);
  }, [user, isPaid]);

  const handleStartWorkout = () => {
    if (!isPaid) {
      navigate('/payment');
      return;
    }
    navigate('/workout');
  };

  const handleViewDiet = () => {
    if (!isPaid) {
      navigate('/payment');
      return;
    }
    navigate('/diet');
  };

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock progress data
  const weeklyProgress = {
    completed: 5,
    total: 6,
    streak: 3
  };

  const stats = [
    { 
      icon: <Trophy className="w-6 h-6 text-yellow-400" />, 
      label: 'Current Streak', 
      value: `${weeklyProgress.streak} days`,
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      icon: <Target className="w-6 h-6 text-blue-400" />, 
      label: 'Weekly Goal', 
      value: `${weeklyProgress.completed}/${weeklyProgress.total}`,
      color: 'from-blue-400 to-purple-500'
    },
    { 
      icon: <Flame className="w-6 h-6 text-red-400" />, 
      label: 'Calories Burned', 
      value: isPaid ? '2,400' : '---',
      color: 'from-red-400 to-pink-500'
    },
    { 
      icon: <Clock className="w-6 h-6 text-green-400" />, 
      label: 'Total Time', 
      value: isPaid ? '12h 30m' : '---',
      color: 'from-green-400 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {greeting()}, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-400">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isPaid && (
                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 animate-pulse">
                  <Lock className="w-4 h-4 mr-1" />
                  Premium Required
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Workout */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Dumbbell className="w-6 h-6 mr-3 text-purple-400" />
                  Today's Workout
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPaid && todayWorkout ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{todayWorkout.type}</h3>
                        <p className="text-gray-400">
                          {todayWorkout.duration} minutes • {todayWorkout.exercises?.length || 0} exercises
                        </p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {todayWorkout.day}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {todayWorkout.exercises?.slice(0, 3).map((exercise, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                          <span>{exercise.name}</span>
                          {exercise.reps && (
                            <Badge variant="outline" className="ml-auto text-xs">
                              {exercise.reps}
                            </Badge>
                          )}
                        </div>
                      ))}
                      {todayWorkout.exercises?.length > 3 && (
                        <p className="text-gray-400 text-sm">
                          +{todayWorkout.exercises.length - 3} more exercises
                        </p>
                      )}
                    </div>

                    <Button 
                      onClick={handleStartWorkout}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Workout
                    </Button>
                  </div>
                ) : todayWorkout?.day === 'sunday' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Rest Day</h3>
                    <p className="text-gray-400">
                      Today is your rest day. Recovery is just as important as training!
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Premium Required</h3>
                    <p className="text-gray-400 mb-4">
                      Unlock personalized workout plans with premium access
                    </p>
                    <Button 
                      onClick={() => navigate('/payment')}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Workouts Completed</span>
                    <span className="text-white font-bold">{weeklyProgress.completed}/{weeklyProgress.total}</span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.completed / weeklyProgress.total) * 100} 
                    className="h-3"
                  />
                  <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div
                        key={index}
                        className={`h-8 rounded flex items-center justify-center text-sm font-medium ${
                          index < weeklyProgress.completed
                            ? 'bg-green-500 text-white'
                            : index === 6
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleStartWorkout}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Start Workout
                </Button>
                <Button 
                  onClick={handleViewDiet}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  View Diet Plan
                </Button>
                <Button 
                  onClick={() => navigate('/progress')}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Track Progress
                </Button>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            {user?.profile && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Goal</span>
                    <span className="text-white font-medium">
                      {user.profile.goal?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level</span>
                    <span className="text-white font-medium">
                      {user.profile.activityLevel?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target</span>
                    <span className="text-white font-medium">
                      {user.profile.targetMonths} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Workout Time</span>
                    <span className="text-white font-medium">
                      {user.profile.workoutTime?.toUpperCase()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Motivation */}
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Keep Going!</h3>
                <p className="text-yellow-200 text-sm">
                  You're doing great! Consistency is the key to success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;