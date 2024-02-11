import { sendPendingTaskReminders } from '../../services/taskService';

jest.mock('../../services/taskService', () => ({
    sendPendingTaskReminders: jest.fn().mockResolvedValue('Mocked reminder success'),
}));

describe('Reminder for Pending Tasks', () => {
    beforeEach(() => {
        sendPendingTaskReminders.mockClear();
    });

    it('should send reminders for pending tasks successfully', async () => {
        const response = await sendPendingTaskReminders();
        expect(sendPendingTaskReminders).toHaveBeenCalled();
        expect(response).toBe('Mocked reminder success');
    });
});
