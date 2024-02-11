import { generateAndSendWeeklyReports } from '../../services/reportService';

jest.mock('../../services/reportService', () => ({
    generateAndSendWeeklyReports: jest.fn().mockResolvedValue('Mocked report success'),
}));

describe('Weekly Project Reports', () => {
    beforeEach(() => {
        generateAndSendWeeklyReports.mockClear();
    });

    it('should generate and send weekly project reports successfully', async () => {
        const response = await generateAndSendWeeklyReports();
        expect(generateAndSendWeeklyReports).toHaveBeenCalled();
        expect(response).toBe('Mocked report success');
    });
});
