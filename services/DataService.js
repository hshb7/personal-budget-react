import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export const DataService = {
    getBudgetData: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/budget`);
            return response.data;
        } catch (error) {
            console.error('Error fetching budget data:', error);
            throw error;
        }
    }
};