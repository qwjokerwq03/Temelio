import api from '../utils/api';
import { API_NONPROFITS_ENDPOINT } from '../utils/constants';

const NonprofitService = {
  getAllNonprofits: async () => {
    try {
      const response = await api.get(API_NONPROFITS_ENDPOINT+"/nonprofits");
      return response.data;
    } catch (error) {
      console.error('Error fetching nonprofits:', error);
      throw error;
    }
  },

  createNonprofit: async (nonprofitData) => {
    try {
      const response = await api.post(API_NONPROFITS_ENDPOINT+"/create", nonprofitData);
      return response.data;
    } catch (error) {
      console.error('Error creating nonprofit:', error);
      throw error;
    }
  },
  deleteNonprofit: async (email) =>{
    try {
      const response = await api.delete(API_NONPROFITS_ENDPOINT+"/delete?email="+email);
      return response.data;
    } catch (error) {
      console.error('Error deleting nonprofit:', error);
      throw error;
    }
  }

  // Add methods for updating and deleting nonprofits as needed
};

export default NonprofitService;
