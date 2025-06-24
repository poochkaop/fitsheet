import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress as ProgressBar } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar,
  Trophy,
  Target,
  Flame,
  Clock,
  Activity,
  BarChart3,
  CheckCircle,
  XCircle,
  Zap,
  Award,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Progress = () => {
  const navigate = useNavigate();
  const { user, isPaid } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, year
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week, -1 = last week, etc.

  if (!isPaid) {
    navigate('/payment');
    return null;
  }

  // Mock progress data
  const progressData = {
    week: {
      workouts: [
        { day: 'Mon', completed: true, type: 'Upper Body' },
        { day: 'Tue', completed: true, type: 'Lower Body' },
        { day: 'Wed', completed: false, type: 'Cardio' },
        { day: 'Thu', completed: true, type: 'HIIT' },
        { day: 'Fri', completed: true, type: 'Full Body' },
        { day: 'Sat', completed: false, type: 'Core' },
        { day: 'Sun', completed: null, type: 'Rest' }
      ],
      stats: {
        completed: 4,
        total: 6,
        calories: 1850,
        duration: 240,
        streak: 3
      }
    },
    month: {
      weeks: [
        { week: 1, completed: 5, total: 6, percentage: 83 },
        { week: 2, completed: 6, total: 6, percentage: 100 },
        { week: 3, completed: 4, total: 6, percentage: 67 },
        { week: 4, completed: 4, total: 6, percentage: 67 }
      ],
      stats: {
        totalWorkouts: 19,
        targetWorkouts: 24,
        totalCalories: 8500,
        averageWorkout: 45,
        bestWeek: 2
      }
    }
  };

  const achievements = [
    { id: 1, title: 'First Workout', description: 'Completed your first workout', icon: '🎯', earned: true },
    { id: 2, title: '5 Day Streak', description: 'Worked out 5 days in a row', icon: '🔥', earned: true },
    { id: 3, title: 'Week Warrior', description: 'Completed all workouts in a week', icon: '👑', earned: true },
    { id: 4, title: '10 Workouts', description: 'Completed 10 total workouts', icon: '💪', earned: true },
    { id: 5, title: 'Consistency King', description: 'Worked out for 30 days', icon: '⚡', earned: false },
    { id: 6, title: 'Goal Crusher', description: 'Achieved your fitness goal', icon: '🏆', earned: false }
  ];

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' }
  ];

  const getWeekData = () => {
    // In a real app, this would fetch data for different weeks
    return progressData.week;
  };

  const weekData = getWeekData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
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
                <h1 className="text-2xl font-bold text-white">Progress Tracking</h1>
                <p className="text-gray-400">Monitor your fitness journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {periods.map((period) => (
                <Button
                  key={period.key}
                  variant={selectedPeriod === period.key ? "default" : "ghost"}
                  onClick={() => setSelectedPeriod(period.key)}
                  className={selectedPeriod === period.key 
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                  }
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round((weekData.stats.completed / weekData.stats.total) * 100)}%
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Current Streak</p>
                  <p className="text-2xl font-bold text-white">{weekData.stats.streak} days</p>
                </div>
                <div className="p-3 rounded-full bg-orange-500/20">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Calories Burned</p>
                  <p className="text-2xl font-bold text-white">{weekData.stats.calories.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-red-500/20">
                  <Flame className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Time</p>
                  <p className="text-2xl font-bold text-white">{Math.floor(weekData.stats.duration / 60)}h {weekData.stats.duration % 60}m</p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Progress Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress */}
            {selectedPeriod === 'week' && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Weekly Progress
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek - 1)}
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-gray-400 text-sm px-2">
                      {currentWeek === 0 ? 'This Week' : `${Math.abs(currentWeek)} week${Math.abs(currentWeek) > 1 ? 's' : ''} ago`}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek + 1)}
                      disabled={currentWeek >= 0}
                      className="text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weekData.workouts.map((workout, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          workout.completed === true
                            ? 'bg-green-500/20 border-green-500/30'
                            : workout.completed === false
                            ? 'bg-red-500/20 border-red-500/30'
                            : 'bg-blue-500/20 border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              workout.completed === true
                                ? 'bg-green-500'
                                : workout.completed === false
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                            }`}>
                              {workout.completed === true ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : workout.completed === false ? (
                                <XCircle className="w-5 h-5 text-white" />
                              ) : (
                                <Star className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{workout.day}</h4>
                              <p className="text-sm text-gray-400">{workout.type}</p>
                            </div>
                          </div>
                          
                          <Badge className={
                            workout.completed === true
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : workout.completed === false
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }>
                            {workout.completed === true ? 'Completed' : workout.completed === false ? 'Missed' : 'Rest Day'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Weekly Goal Progress</span>
                      <span className="text-white font-bold">{weekData.stats.completed}/{weekData.stats.total}</span>
                    </div>
                    <ProgressBar value={(weekData.stats.completed / weekData.stats.total) * 100} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Monthly Progress */}
            {selectedPeriod === 'month' && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Monthly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressData.month.weeks.map((week, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Week {week.week}</span>
                          <span className="text-gray-400">{week.completed}/{week.total} workouts</span>
                        </div>
                        <ProgressBar value={week.percentage} className="h-3" />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>{week.percentage}% completion</span>
                          {week.percentage === 100 && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              Perfect Week!
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      achievement.earned
                        ? 'bg-yellow-500/20 border-yellow-500/30'
                        : 'bg-white/5 border-white/10 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">{achievement.title}</h4>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Personal Bests */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Personal Bests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Longest Streak</span>
                  <span className="text-white font-bold">12 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Week</span>
                  <span className="text-white font-bold">6/6 workouts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Workouts</span>
                  <span className="text-white font-bold">38</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Calories/Week</span>
                  <span className="text-white font-bold">2,150</span>
                </div>
              </CardContent>
            </Card>

            {/* Motivation */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Keep Pushing!</h3>
                <p className="text-purple-200 text-sm">
                  You're {Math.round((weekData.stats.completed / weekData.stats.total) * 100)}% towards your weekly goal. 
                  Don't give up now!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;