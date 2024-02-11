// Importing the required module
import cron from 'node-cron';
import { sendPendingTaskReminders } from './services/taskService.js';

// Schedule a task to run every day at 9:00 am
cron.schedule('0 9 * * *', async () => {
  console.log('Sending reminders for pending tasks...');
  try {
    // Attempt to send reminders for pending tasks
    await sendPendingTaskReminders();
    console.log('Reminders for pending tasks sent successfully.');
  } catch (error) {
    console.error('Failed to send reminders for pending tasks:', error);
  }
});
