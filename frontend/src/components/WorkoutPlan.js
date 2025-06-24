import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { 
  ArrowLeft, 
  Play, 
  Pause,
  SkipForward,
  CheckCircle,
  Clock,
  Dumbbell,
  Target,
  Calendar,
  Trophy,
  Timer,
  Activity,
  Zap,
  RotateCcw
} from 'lucide-react';
import { mockWorkoutPlans } from '../mock/mockData';

const WorkoutPlan = () => {
  const navigate = useNavigate();
  const { user, isPaid } = useAuth();
  const { toast } = useToast();
  
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  useEffect(() => {
    if (!isPaid) {
      navigate('/payment');
      return;
    }
  }, [isPaid, navigate]);

  useEffect(() => {
    let interval;
    if (isWorkoutActive && !isPaused) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, isPaused]);

  const days = [
    { key: 'monday', label: 'Mon', full: 'Monday' },
    { key: 'tuesday', label: 'Tue', full: 'Tuesday' },
    { key: 'wednesday', label: 'Wed', full: 'Wednesday' },
    { key: 'thursday', label: 'Thu', full: 'Thursday' },
    { key: 'friday', label: 'Fri', full: 'Friday' },
    { key: 'saturday', label: 'Sat', full: 'Saturday' },
    { key: 'sunday', label: 'Sun', full: 'Sunday' }
  ];

  const planKey = user?.profile ? `${user.profile.activityLevel}_${user.profile.goal}` : null;
  const workoutPlan = planKey ? mockWorkoutPlans[planKey] : null;
  const todayWorkout = workoutPlan?.schedule[selectedDay];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setWorkoutStarted(true);
    setTimer(0);
    setCurrentExercise(0);
    setCompletedExercises(new Set());
  };

  const pauseWorkout = () => {
    setIsPaused(!isPaused);
  };

  const completeExercise = () => {
    const newCompleted = new Set(completedExercises);
    newCompleted.add(currentExercise);
    setCompletedExercises(newCompleted);
    
    toast({
      title: "Exercise Completed!",
      description: `Great job! You completed ${todayWorkout.exercises[currentExercise].name}`,
    });

    if (currentExercise < todayWorkout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Workout completed
      setIsWorkoutActive(false);
      setWorkoutStarted(false);
      toast({
        title: "Workout Completed! 🎉",
        description: `Awesome! You finished your ${todayWorkout.type} workout in ${formatTime(timer)}`,
      });
    }
  };

  const skipExercise = () => {
    if (currentExercise < todayWorkout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const resetWorkout = () => {
    setIsWorkoutActive(false);
    setWorkoutStarted(false);
    setTimer(0);
    setCurrentExercise(0);
    setCompletedExercises(new Set());
    setIsPaused(false);
  };

  if (!isPaid) {
    return null; // Will redirect in useEffect
  }

  if (!workoutPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-white">No workout plan found. Please complete your profile setup.</p>
            <Button onClick={() => navigate('/profile-setup')} className="mt-4">
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
                <h1 className="text-2xl font-bold text-white">Workout Plan</h1>
                <p className="text-gray-400">{workoutPlan.name}</p>
              </div>
            </div>
            
            {workoutStarted && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{formatTime(timer)}</div>
                  <div className="text-gray-400 text-sm">Workout Time</div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                  {isWorkoutActive ? 'Active' : 'Paused'}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Week Calendar */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {days.map((day) => {
                const dayWorkout = workoutPlan.schedule[day.key];
                const isToday = day.key === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                const isSelected = day.key === selectedDay;
                
                return (
                  <Button
                    key={day.key}
                    variant={isSelected ? "default" : "ghost"}
                    onClick={() => setSelectedDay(day.key)}
                    className={`w-full justify-start p-4 h-auto ${
                      isSelected 
                        ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="text-left">
                        <div className="flex items-center">
                          <span className="font-medium">{day.label}</span>
                          {isToday && (
                            <Badge className="ml-2 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-xs">
                              Today
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm opacity-70">
                          {dayWorkout ? dayWorkout.type : 'Rest Day'}
                        </div>
                      </div>
                      {dayWorkout && dayWorkout.duration > 0 ? (
                        <div className="text-right">
                          <div className="text-sm font-medium">{dayWorkout.duration}min</div>
                          <div className="text-xs opacity-70">{dayWorkout.exercises.length} exercises</div>
                        </div>
                      ) : (
                        <Trophy className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Main Workout Area */}
          <div className="lg:col-span-3 space-y-6">
            {todayWorkout ? (
              <>
                {/* Workout Header */}
                <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{todayWorkout.type}</h2>
                        <p className="text-gray-400">{todayWorkout.day}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-400">{todayWorkout.duration}</div>
                        <div className="text-gray-400 text-sm">minutes</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2" />
                        {todayWorkout.exercises.length} Exercises
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        {user.profile.activityLevel.charAt(0).toUpperCase() + user.profile.activityLevel.slice(1)} Level
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Exercise (if workout is active) */}
                {workoutStarted && (
                  <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Current Exercise</h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {currentExercise + 1} / {todayWorkout.exercises.length}
                        </Badge>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {todayWorkout.exercises[currentExercise].name}
                        </h4>
                        {todayWorkout.exercises[currentExercise].reps && (
                          <p className="text-gray-300">
                            {todayWorkout.exercises[currentExercise].reps}
                          </p>
                        )}
                        {todayWorkout.exercises[currentExercise].duration && (
                          <p className="text-gray-300">
                            {todayWorkout.exercises[currentExercise].duration} minutes
                          </p>
                        )}
                      </div>

                      <Progress 
                        value={((currentExercise + 1) / todayWorkout.exercises.length) * 100} 
                        className="mb-6"
                      />

                      <div className="flex space-x-3">
                        <Button
                          onClick={completeExercise}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Complete Exercise
                        </Button>
                        <Button
                          onClick={pauseWorkout}
                          variant="outline"
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                        </Button>
                        <Button
                          onClick={skipExercise}
                          variant="outline"
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                          <SkipForward className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Exercise List */}
                <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Exercise List</CardTitle>
                    {!workoutStarted ? (
                      <Button 
                        onClick={startWorkout}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Workout
                      </Button>
                    ) : (
                      <Button 
                        onClick={resetWorkout}
                        variant="outline"
                        className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reset
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todayWorkout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          completedExercises.has(index)
                            ? 'bg-green-500/20 border-green-500/30'
                            : index === currentExercise && workoutStarted
                            ? 'bg-purple-500/20 border-purple-500/30'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              completedExercises.has(index)
                                ? 'bg-green-500 text-white'
                                : index === currentExercise && workoutStarted
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/10 text-gray-400'
                            }`}>
                              {completedExercises.has(index) ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : index === currentExercise && workoutStarted ? (
                                <Play className="w-4 h-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{exercise.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                {exercise.reps && (
                                  <span className="flex items-center">
                                    <Target className="w-4 h-4 mr-1" />
                                    {exercise.reps}
                                  </span>
                                )}
                                {exercise.duration && (
                                  <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {exercise.duration} min
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {completedExercises.has(index) && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              // Rest Day
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Rest Day</h2>
                  <p className="text-gray-400 text-lg mb-6">
                    Today is your rest day. Recovery is just as important as training!
                  </p>
                  <div className="space-y-2 text-gray-300">
                    <p>💤 Get 7-8 hours of quality sleep</p>
                    <p>💧 Stay hydrated throughout the day</p>
                    <p>🧘 Consider light stretching or meditation</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;