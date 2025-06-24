// Mock data for the fitness app
export const mockUsers = {
  members: [
    {
      id: '1',
      name: 'Arjun Sharma',
      email: 'arjun@example.com',
      phone: '+91-9876543210',
      isPaid: true,
      profile: {
        gender: 'male',
        age: 28,
        weight: 75,
        height: 175,
        activityLevel: 'intermediate',
        goal: 'muscle_gain',
        targetMonths: 6,
        workoutTime: 'morning',
        preferredTime: '07:00'
      },
      progress: {
        totalWorkouts: 45,
        completedWorkouts: 38,
        missedWorkouts: 7,
        currentStreak: 5,
        longestStreak: 12,
        weeklyStats: [6, 5, 7, 6, 4, 6, 5] // Last 7 weeks
      }
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91-9876543211',
      isPaid: false,
      profile: {
        gender: 'female',
        age: 25,
        weight: 58,
        height: 162,
        activityLevel: 'beginner',
        goal: 'weight_loss',
        targetMonths: 4,
        workoutTime: 'evening',
        preferredTime: '18:30'
      }
    }
  ],
  admin: {
    email: 'admin@fitapp.com',
    password: 'admin123'
  }
};

export const mockWorkoutPlans = {
  beginner_weight_loss: {
    name: 'Weight Loss Starter',
    description: 'Perfect for beginners looking to shed pounds safely',
    weeks: 4,
    schedule: {
      monday: {
        day: 'Monday',
        type: 'Cardio & Core',
        duration: 30,
        exercises: [
          { name: 'Warm-up Walk', duration: 5, reps: null },
          { name: 'Jumping Jacks', duration: 2, reps: '3 sets' },
          { name: 'Push-ups (Modified)', duration: null, reps: '2 sets of 8' },
          { name: 'Plank', duration: 1, reps: '3 sets' },
          { name: 'Mountain Climbers', duration: 2, reps: '3 sets' },
          { name: 'Cool-down Stretch', duration: 5, reps: null }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        type: 'Strength Training',
        duration: 35,
        exercises: [
          { name: 'Warm-up', duration: 5, reps: null },
          { name: 'Bodyweight Squats', duration: null, reps: '3 sets of 12' },
          { name: 'Wall Push-ups', duration: null, reps: '3 sets of 10' },
          { name: 'Lunges', duration: null, reps: '2 sets of 8 each leg' },
          { name: 'Dead Bug', duration: null, reps: '2 sets of 10 each side' },
          { name: 'Stretching', duration: 8, reps: null }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        type: 'Active Recovery',
        duration: 25,
        exercises: [
          { name: 'Light Walking', duration: 15, reps: null },
          { name: 'Yoga Flow', duration: 10, reps: null }
        ]
      },
      thursday: {
        day: 'Thursday',
        type: 'HIIT Cardio',
        duration: 30,
        exercises: [
          { name: 'Warm-up', duration: 5, reps: null },
          { name: 'High Knees', duration: 1, reps: '4 sets' },
          { name: 'Burpees (Modified)', duration: null, reps: '3 sets of 5' },
          { name: 'Jump Squats', duration: null, reps: '3 sets of 8' },
          { name: 'Rest & Repeat', duration: 10, reps: null },
          { name: 'Cool-down', duration: 5, reps: null }
        ]
      },
      friday: {
        day: 'Friday',
        type: 'Full Body Strength',
        duration: 40,
        exercises: [
          { name: 'Dynamic Warm-up', duration: 5, reps: null },
          { name: 'Push-ups', duration: null, reps: '3 sets of 6-10' },
          { name: 'Squats', duration: null, reps: '3 sets of 15' },
          { name: 'Pike Push-ups', duration: null, reps: '2 sets of 6' },
          { name: 'Glute Bridges', duration: null, reps: '3 sets of 12' },
          { name: 'Russian Twists', duration: null, reps: '3 sets of 20' },
          { name: 'Stretching', duration: 8, reps: null }
        ]
      },
      saturday: {
        day: 'Saturday',
        type: 'Cardio Fun',
        duration: 35,
        exercises: [
          { name: 'Dance Workout', duration: 20, reps: null },
          { name: 'Walking/Jogging', duration: 10, reps: null },
          { name: 'Stretching', duration: 5, reps: null }
        ]
      },
      sunday: {
        day: 'Sunday',
        type: 'Rest Day',
        duration: 0,
        exercises: [
          { name: 'Complete Rest', duration: null, reps: 'Enjoy your day off!' }
        ]
      }
    }
  },
  intermediate_muscle_gain: {
    name: 'Muscle Building',
    description: 'Intermediate level muscle building program',
    weeks: 8,
    schedule: {
      monday: {
        day: 'Monday',
        type: 'Upper Body Push',
        duration: 45,
        exercises: [
          { name: 'Warm-up', duration: 5, reps: null },
          { name: 'Push-ups', duration: null, reps: '4 sets of 12-15' },
          { name: 'Pike Push-ups', duration: null, reps: '3 sets of 8-10' },
          { name: 'Diamond Push-ups', duration: null, reps: '3 sets of 6-8' },
          { name: 'Tricep Dips', duration: null, reps: '3 sets of 10-12' },
          { name: 'Plank to Push-up', duration: null, reps: '3 sets of 8' },
          { name: 'Cool-down', duration: 7, reps: null }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        type: 'Lower Body Power',
        duration: 50,
        exercises: [
          { name: 'Dynamic Warm-up', duration: 7, reps: null },
          { name: 'Jump Squats', duration: null, reps: '4 sets of 12' },
          { name: 'Lunges', duration: null, reps: '4 sets of 10 each leg' },
          { name: 'Single-leg Deadlifts', duration: null, reps: '3 sets of 8 each leg' },
          { name: 'Calf Raises', duration: null, reps: '4 sets of 15' },
          { name: 'Wall Sit', duration: 2, reps: '3 sets' },
          { name: 'Stretching', duration: 8, reps: null }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        type: 'Upper Body Pull',
        duration: 45,
        exercises: [
          { name: 'Warm-up', duration: 5, reps: null },
          { name: 'Pull-ups/Assisted', duration: null, reps: '4 sets of 5-8' },
          { name: 'Inverted Rows', duration: null, reps: '4 sets of 8-10' },
          { name: 'Reverse Flyes', duration: null, reps: '3 sets of 12' },
          { name: 'Face Pulls', duration: null, reps: '3 sets of 15' },
          { name: 'Bicep Curls', duration: null, reps: '3 sets of 12' },
          { name: 'Cool-down', duration: 7, reps: null }
        ]
      },
      thursday: {
        day: 'Thursday',
        type: 'HIIT Conditioning',
        duration: 35,
        exercises: [
          { name: 'Warm-up', duration: 5, reps: null },
          { name: 'Burpees', duration: null, reps: '4 sets of 8' },
          { name: 'Mountain Climbers', duration: 1, reps: '4 sets' },
          { name: 'Jump Lunges', duration: null, reps: '4 sets of 12' },
          { name: 'Plank Jacks', duration: 1, reps: '4 sets' },
          { name: 'Rest Between Sets', duration: 15, reps: null },
          { name: 'Cool-down', duration: 5, reps: null }
        ]
      },
      friday: {
        day: 'Friday',
        type: 'Full Body Circuit',
        duration: 55,
        exercises: [
          { name: 'Dynamic Warm-up', duration: 8, reps: null },
          { name: 'Push-up to T', duration: null, reps: '3 sets of 8 each side' },
          { name: 'Squat to Press', duration: null, reps: '4 sets of 12' },
          { name: 'Renegade Rows', duration: null, reps: '3 sets of 6 each side' },
          { name: 'Turkish Get-ups', duration: null, reps: '2 sets of 4 each side' },
          { name: 'Bear Crawl', duration: 1, reps: '3 sets' },
          { name: 'Stretching', duration: 10, reps: null }
        ]
      },
      saturday: {
        day: 'Saturday',
        type: 'Core & Flexibility',
        duration: 40,
        exercises: [
          { name: 'Warm-up', duration: 5, reps: null },
          { name: 'Plank Variations', duration: 3, reps: '4 sets' },
          { name: 'Russian Twists', duration: null, reps: '4 sets of 25' },
          { name: 'Dead Bug', duration: null, reps: '3 sets of 10 each side' },
          { name: 'Bird Dog', duration: null, reps: '3 sets of 8 each side' },
          { name: 'Yoga Flow', duration: 15, reps: null }
        ]
      },
      sunday: {
        day: 'Sunday',
        type: 'Rest Day',
        duration: 0,
        exercises: [
          { name: 'Complete Rest', duration: null, reps: 'Recovery is crucial for muscle growth!' }
        ]
      }
    }
  }
};

export const mockDietPlans = {
  weight_loss: {
    name: 'Weight Loss Nutrition Plan',
    description: 'Balanced diet for healthy weight loss',
    dailyCalories: 1500,
    meals: {
      breakfast: [
        { name: 'Oatmeal with Berries', calories: 300, protein: 8, carbs: 54, fat: 6 },
        { name: 'Greek Yogurt with Nuts', calories: 250, protein: 15, carbs: 20, fat: 12 },
        { name: 'Vegetable Omelet', calories: 280, protein: 18, carbs: 8, fat: 20 }
      ],
      lunch: [
        { name: 'Grilled Chicken Salad', calories: 400, protein: 35, carbs: 20, fat: 18 },
        { name: 'Quinoa Bowl with Vegetables', calories: 350, protein: 12, carbs: 55, fat: 10 },
        { name: 'Dal with Brown Rice', calories: 380, protein: 18, carbs: 65, fat: 5 }
      ],
      dinner: [
        { name: 'Grilled Fish with Vegetables', calories: 350, protein: 30, carbs: 25, fat: 15 },
        { name: 'Chicken Stir-fry', calories: 320, protein: 28, carbs: 30, fat: 12 },
        { name: 'Vegetable Curry with Roti', calories: 340, protein: 15, carbs: 50, fat: 12 }
      ],
      snacks: [
        { name: 'Apple with Almonds', calories: 200, protein: 6, carbs: 25, fat: 12 },
        { name: 'Protein Smoothie', calories: 180, protein: 20, carbs: 15, fat: 4 },
        { name: 'Carrot Sticks with Hummus', calories: 150, protein: 6, carbs: 20, fat: 8 }
      ]
    }
  },
  muscle_gain: {
    name: 'Muscle Building Nutrition Plan',
    description: 'High-protein diet for muscle growth',
    dailyCalories: 2200,
    meals: {
      breakfast: [
        { name: 'Protein Pancakes with Banana', calories: 450, protein: 20, carbs: 60, fat: 15 },
        { name: 'Scrambled Eggs with Toast', calories: 400, protein: 25, carbs: 35, fat: 20 },
        { name: 'Protein Smoothie Bowl', calories: 380, protein: 22, carbs: 45, fat: 12 }
      ],
      lunch: [
        { name: 'Chicken Breast with Rice', calories: 500, protein: 40, carbs: 55, fat: 12 },
        { name: 'Salmon with Quinoa', calories: 480, protein: 35, carbs: 45, fat: 18 },
        { name: 'Paneer Curry with Naan', calories: 520, protein: 25, carbs: 60, fat: 20 }
      ],
      dinner: [
        { name: 'Lean Beef with Sweet Potato', calories: 450, protein: 35, carbs: 40, fat: 16 },
        { name: 'Grilled Chicken with Pasta', calories: 480, protein: 38, carbs: 50, fat: 14 },
        { name: 'Fish Curry with Brown Rice', calories: 420, protein: 32, carbs: 45, fat: 15 }
      ],
      snacks: [
        { name: 'Protein Bar', calories: 250, protein: 20, carbs: 25, fat: 8 },
        { name: 'Greek Yogurt with Granola', calories: 300, protein: 15, carbs: 35, fat: 12 },
        { name: 'Nuts and Dried Fruits', calories: 280, protein: 8, carbs: 30, fat: 18 }
      ]
    }
  }
};

export const mockPayments = [
  {
    id: 'pay_1',
    userId: '1',
    userName: 'Arjun Sharma',
    amount: 199,
    status: 'completed',
    date: '2024-01-15',
    razorpayId: 'pay_mock_123'
  },
  {
    id: 'pay_2',
    userId: '3',
    userName: 'Rohit Kumar',
    amount: 199,
    status: 'completed',
    date: '2024-01-12',
    razorpayId: 'pay_mock_124'
  }
];

// Simulate OTP storage
export let mockOtpStorage = {};

export const generateMockOtp = (identifier) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  mockOtpStorage[identifier] = {
    otp,
    timestamp: Date.now(),
    verified: false
  };
  console.log(`🔐 Mock OTP for ${identifier}: ${otp}`);
  return otp;
};

export const verifyMockOtp = (identifier, otp) => {
  const stored = mockOtpStorage[identifier];
  if (!stored) return false;
  
  const isExpired = Date.now() - stored.timestamp > 300000; // 5 minutes
  if (isExpired) {
    delete mockOtpStorage[identifier];
    return false;
  }
  
  if (stored.otp === otp) {
    stored.verified = true;
    return true;
  }
  
  return false;
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};