import api from './api';

// Student Authentication
export const studentLogin = async (username, password) => {
  try {
    const response = await api.post('/auth/student/login', {
      username,
      password,
    });
    
    // if (response.data.success) {
    //   // Store token and user data
    //   localStorage.setItem('token', response.data.data.token);
    //   localStorage.setItem('user', JSON.stringify(response.data.data.user));
    // }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

// Teacher Authentication
export const teacherLogin = async (username, password) => {
  try {
    const response = await api.post('/auth/teacher/login', {
      username,
      password,
    });
    
    // if (response.data.success) {
    //   // Store token and user data
    //   localStorage.setItem('token', response.data.data.token);
    //   localStorage.setItem('user', JSON.stringify(response.data.data.user));
    // }
    
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

// // Get current user
// export const getCurrentUser = () => {
//   const userStr = localStorage.getItem('user');
//   return userStr ? JSON.parse(userStr) : null;
// };

// // Check if user is authenticated
// export const isAuthenticated = () => {
//   return !!localStorage.getItem('token');
// };
