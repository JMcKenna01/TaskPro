// import express from 'express';
// const router = express.Router();

// // Import the functions
// import { sendDailySummaryEmails } from '../scheduledTasks/dailySummaryEmails.js';
// import { generateAndSendWeeklyReports } from '../scheduledTasks/weeklyProjectReports.js';
// import { sendPendingTaskReminders } from '../scheduledTasks/reminderForPendingTasks.js';
// import { checkSubscriptionsAndUpdate } from '../scheduledTasks/billingOrSubscriptionChecks.js';

// // Endpoint to trigger daily summary emails
// router.post('/trigger-daily-summaries', async (req, res) => {
//   try {
//     await sendDailySummaryEmails();
//     res.json({ message: "Daily summary emails sent successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send daily summary emails." });
//   }
// });

// // Endpoint to trigger weekly project reports
// router.post('/trigger-weekly-reports', async (req, res) => {
//   try {
//     await generateAndSendWeeklyReports();
//     res.json({ message: "Weekly project reports generated and sent successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to generate and send weekly project reports." });
//   }
// });

// // Endpoint to trigger reminders for pending tasks
// router.post('/trigger-pending-task-reminders', async (req, res) => {
//   try {
//     await sendPendingTaskReminders();
//     res.json({ message: "Reminders for pending tasks sent successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send reminders for pending tasks." });
//   }
// });

// // Endpoint to trigger subscription checks
// router.post('/trigger-subscription-checks', async (req, res) => {
//   try {
//     await checkSubscriptionsAndUpdate();
//     res.json({ message: "Subscription statuses checked and updated successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to check subscription statuses." });
//   }
// });

// export default router;
