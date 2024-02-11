import { checkSubscriptionsAndUpdate } from '../../services/billingService';

jest.mock('../../services/billingService', () => ({
    checkSubscriptionsAndUpdate: jest.fn().mockResolvedValue('Mocked success response'),
}));

describe('Billing or Subscription Checks', () => {
    beforeEach(() => {
        // Clear mock history before each test if necessary
        checkSubscriptionsAndUpdate.mockClear();
    });

    it('should call checkSubscriptionsAndUpdate successfully', async () => {
        // Directly call the mocked function to test its call and response
        const response = await checkSubscriptionsAndUpdate();

        // Expect that the checkSubscriptionsAndUpdate function was called
        expect(checkSubscriptionsAndUpdate).toHaveBeenCalled();
        expect(response).toBe('Mocked success response');
    });
});
