import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Hardcoded for now, should be env
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createDecision = async (data) => {
    const response = await api.post('/decisions', data);
    return response.data;
};

export const getDecision = async (id) => {
    const response = await api.get(`/decisions/${id}`);
    return response.data;
};

export const updateDecision = async (id, data) => {
    const response = await api.put(`/decisions/${id}`, data);
    return response.data;
};

export const evaluateDecision = async (id) => {
    const response = await api.post(`/decisions/${id}/evaluate`);
    return response.data;
};

export default api;
