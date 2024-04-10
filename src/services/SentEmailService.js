import api from '../utils/api';
import { API_EMAILS_ENDPOINT } from '../utils/constants';

const SentEmailService = {
  getAllEmails: async () => {
    try {
      const response = await api.get(API_EMAILS_ENDPOINT+"/get-all");
      return response.data;
    } catch (error) {
      console.error('Error fetching foundations:', error);
      throw error;
    }
  },
  sendEmails: async (email,emails) =>{
    try {
        await api.post(API_EMAILS_ENDPOINT+"/send-emails?from="+email,emails);
    } catch (error) {
        console.error('Error sending emails from foundation', error);
      throw error;
    }
  },

  getEmailTemplate: async () =>{
    try {
        const response = await api.get(API_EMAILS_ENDPOINT+"/get-template");
        return response.data;
    } catch (error) {
        console.error('Error while getting email template', error);
    }
  },

  updateEmailTemplate: async (body) => {
    try {
      const response = await api.put(API_EMAILS_ENDPOINT+"/update-template",body);
      return response.data;
    } catch (error) {
      console.error('Error while updating email template', error);
    }
  }
};
export default SentEmailService;
