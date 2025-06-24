import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

class NotificationService {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.initialized = false;
  }

  async initialize() {
    if (!this.isNative || this.initialized) return;

    try {
      // Request permissions
      const permission = await LocalNotifications.requestPermissions();
      
      if (permission.display === 'granted') {
        // Set up push notifications
        await this.setupPushNotifications();
        this.initialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  async setupPushNotifications() {
    if (!this.isNative) return;

    try {
      // Register for push notifications
      await PushNotifications.register();

      // Add listeners
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
        // Send token to your backend
        this.sendTokenToBackend(token.value);
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Push registration error: ', error);
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received: ', notification);
        // Handle received push notification
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push action performed: ', notification);
        // Handle notification tap
      });

    } catch (error) {
      console.error('Push notification setup failed:', error);
    }
  }

  async scheduleWorkoutReminder(userProfile) {
    if (!this.isNative || !userProfile.preferredTime) return;

    try {
      // Cancel existing workout reminders
      await LocalNotifications.cancel({
        notifications: [{ id: 'workout-reminder' }]
      });

      // Schedule new workout reminder
      const [hours, minutes] = userProfile.preferredTime.split(':');
      
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Fitsheet Workout Reminder 💪',
            body: `Time for your ${userProfile.workoutTime} workout! Let's crush those goals!`,
            id: 'workout-reminder',
            schedule: {
              on: {
                hour: parseInt(hours),
                minute: parseInt(minutes)
              },
              repeats: true
            },
            actionTypeId: 'WORKOUT_REMINDER',
            extra: {
              type: 'workout-reminder'
            }
          }
        ]
      });

      console.log('Workout reminder scheduled for', userProfile.preferredTime);
    } catch (error) {
      console.error('Failed to schedule workout reminder:', error);
    }
  }

  async scheduleRestDayReminder() {
    if (!this.isNative) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Fitsheet Rest Day 🧘‍♂️',
            body: 'Today is your rest day. Focus on recovery and stay hydrated!',
            id: 'rest-day-reminder',
            schedule: {
              on: {
                hour: 10,
                minute: 0
              },
              repeats: true,
              every: 'week',
              on: { weekday: 1 } // Sunday
            },
            extra: {
              type: 'rest-day'
            }
          }
        ]
      });
    } catch (error) {
      console.error('Failed to schedule rest day reminder:', error);
    }
  }

  async scheduleProgressReminder() {
    if (!this.isNative) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Fitsheet Progress Check 📊',
            body: 'Check your weekly progress and celebrate your achievements!',
            id: 'progress-reminder',
            schedule: {
              on: {
                hour: 19,
                minute: 0
              },
              repeats: true,
              every: 'week',
              on: { weekday: 7 } // Saturday
            },
            extra: {
              type: 'progress-check'
            }
          }
        ]
      });
    } catch (error) {
      console.error('Failed to schedule progress reminder:', error);
    }
  }

  async sendTokenToBackend(token) {
    try {
      // Send the push token to your backend
      const response = await fetch('/api/users/push-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        console.log('Push token sent to backend successfully');
      }
    } catch (error) {
      console.error('Failed to send push token to backend:', error);
    }
  }

  async cancelAllNotifications() {
    if (!this.isNative) return;

    try {
      await LocalNotifications.cancel({
        notifications: [
          { id: 'workout-reminder' },
          { id: 'rest-day-reminder' },
          { id: 'progress-reminder' }
        ]
      });
    } catch (error) {
      console.error('Failed to cancel notifications:', error);
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();