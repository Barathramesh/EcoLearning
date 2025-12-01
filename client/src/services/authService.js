import api from './api';

// Student Authentication
export const studentLogin = async (rollNumber, password) => {
  try {
    const response = await api.post('/student/login', {
      rollNumber,
      password,
    });
    
    // Store user data in localStorage
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;

  } catch (error) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

// Teacher Authentication
export const teacherLogin = async (teacherId, password) => {
  try {
    const response = await api.post('/teacher/login', {
      teacherId,
      password,
    });
    
    // Store user data in localStorage
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
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
