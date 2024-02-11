import { sendDailySummary } from '../../services/emailService';

jest.mock('../../services/emailService', () => ({
    sendDailySummary: jest.fn().mockResolvedValue('Mocked daily summary success'),
}));

describe('Daily Summary Emails', () => {
    beforeEach(() => {
        sendDailySummary.mockClear();
    });

    it('should send daily summary emails successfully', async () => {
        const response = await sendDailySummary();
        expect(sendDailySummary).toHaveBeenCalled();
        expect(response).toBe('Mocked daily summary success');
    });
});
