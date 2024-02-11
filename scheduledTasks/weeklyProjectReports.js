// Importing the required module
import cron from 'node-cron';
import { generateAndSendWeeklyReports } from './services/reportService.js';

// Schedule a task to run every Monday at 7:00 am
cron.schedule('0 7 * * 1', async () => {
  console.log('Generating and sending weekly project reports...');
  try {
    // Attempt to generate and send weekly project reports
    await generateAndSendWeeklyReports();
    console.log('Weekly project reports sent successfully.');
  } catch (error) {
    console.error('Failed to send weekly project reports:', error);
  }
});
