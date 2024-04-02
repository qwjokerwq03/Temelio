import api from '../utils/api';
import { API_FOUNDATIONS_ENDPOINT } from '../utils/constants';

const FoundationService = {
  getAllFoundations: async () => {
    try {
      const response = await api.get(API_FOUNDATIONS_ENDPOINT+"/get-all");
      return response.data;
    } catch (error) {
      console.error('Error fetching foundations:', error);
      throw error;
    }
  },

  createFoundation: async (foundationData) => {
    try {
      const response = await api.post(API_FOUNDATIONS_ENDPOINT+"/create", foundationData);
      return response.data;
    } catch (error) {
      console.error('Error creating foundation:', error);
      throw error;
    }
  },

  // Add methods for updating and deleting foundations as needed
  deleteFoundationByEmail: async (email) =>{
    try {
        const response = await api.delete(API_FOUNDATIONS_ENDPOINT+"/delete?email="+email);
        return response.data;
    } catch (error) {
        console.error('Error creating foundation:', error);
      throw error;
    }
  }
};

export default FoundationService;
