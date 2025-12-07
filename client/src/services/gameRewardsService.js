import api from './api';

export const completeGame = async (gameData) => {
  try {
    const response = await api.post('/game/complete', gameData);
    return response.data;
  } catch (error) {
    console.error('Complete game error:', error);
    throw error.response?.data || error;
  }
};

export const getGameHistory = async (studentId) => {
  try {
    const response = await api.get(`/game/history/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Get game history error:', error);
    throw error.response?.data || error;
  }
};

export const getStudentRewards = async (studentId) => {
  try {
    const response = await api.get(`/game/rewards/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Get student rewards error:', error);
    throw error.response?.data || error;
  }
};

export default {
  completeGame,
  getGameHistory,
  getStudentRewards,
};
