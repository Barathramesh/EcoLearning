import api from './api';

// Student Authentication
export const studentLogin = async (rollNumber, password) => {
  try {
    const response = await api.post('/api/student/login', {
      rollNumber,
      password,
    });
    
    return response.data;

  } catch (error) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

// Teacher Authentication
export const teacherLogin = async (teacherId, password) => {
  try {
    const response = await api.post('/api/teacher/login', {
      teacherId,
      password,
    });
    
    return response.data;

  } catch (error) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
