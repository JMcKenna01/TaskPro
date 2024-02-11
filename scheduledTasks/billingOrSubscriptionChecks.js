import cron from 'node-cron';
import { checkSubscriptionsAndUpdate } from './services/billingService.js';

cron.schedule('0 12 * * *', async () => {
  console.log('Checking subscription statuses...');
  try {
    await checkSubscriptionsAndUpdate();
    console.log('Subscription statuses checked successfully.');
  } catch (error) {
    console.error('Failed to check subscription statuses:', error);
  }
});
