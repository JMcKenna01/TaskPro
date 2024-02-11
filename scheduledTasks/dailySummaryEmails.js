// Importing the required module
import cron from 'node-cron';
import { sendDailySummary } from './services/emailService.js';


// Schedule a task to run every day at 6:00 pm
cron.schedule('0 18 * * *', async () => {
  console.log('Sending daily summary emails...');
  try {
    // Attempt to send daily summary emails
    await sendDailySummary();
    console.log('Daily summary emails sent successfully.');
  } catch (error) {
    console.error('Failed to send daily summary emails:', error);
  }
});
