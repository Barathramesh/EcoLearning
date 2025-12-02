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

// Teacher Registration
export const teacherRegister = async (Name, email, phone, teacherId, password) => {
  try {
    const response = await api.post('/teacher/register', {
      Name,
      email,
      phone,
      teacherId,
      password,
    });
    
    // Store user data in localStorage
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;

  } catch (error) {
    throw error.response?.data || { success: false, message: 'Registration failed' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
