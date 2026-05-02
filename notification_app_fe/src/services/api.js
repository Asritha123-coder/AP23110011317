import axios from 'axios';
import { Log, TOKEN } from '../../../logging_middleware/logger';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.response.use(
  response => response,
  error => {
    Log('frontend', 'ERROR', 'api', `API Error: ${error.message}`.substring(0,48));
    return Promise.reject(error);
  }
);

const normalizeNotifications = (data) => {
  if (!data) return data;
  let arr = [];
  if (Array.isArray(data)) arr = data;
  else if (data.notifications) arr = data.notifications;
  else if (data.data && Array.isArray(data.data)) arr = data.data;
  
  const normalized = arr.map(item => ({
    id: item.ID || item.id,
    type: item.Type || item.type,
    message: item.Message || item.message,
    timestamp: item.Timestamp || item.timestamp,
    ...item
  }));

  if (Array.isArray(data)) return normalized;
  if (data.notifications) return { ...data, notifications: normalized };
  if (data.data) return { ...data, data: normalized };
  return normalized;
};

export const getNotifications = async (page = 1, limit = 10, type = '') => {
  try {
    Log('frontend', 'INFO', 'api', `Fetch notifs p=${page} l=${limit} t=${type}`);
    const params = { page, limit };
    if (type && type !== 'All') {
      params.type = type;
    }
    const response = await api.get('/notifications', { params });
    return normalizeNotifications(response.data);
  } catch (error) {
    throw error;
  }
};

export const getPriorityNotifications = async () => {
  try {
    Log('frontend', 'INFO', 'api', 'Fetching priority notifs');
    // Fetch a large number or all notifications to compute priority
    const response = await api.get('/notifications', { params: { page: 1, limit: 10 } });
    return normalizeNotifications(response.data);
  } catch (error) {
    throw error;
  }
};