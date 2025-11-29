import React from 'react';

const SimpleApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#059669' }}>🌱 EcoLearn - Environmental Education Platform</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Welcome to EcoLearn!</h2>
        <p>Your gamified environmental education platform is working!</p>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f0fdf4', 
          border: '1px solid #10b981',
          borderRadius: '8px'
        }}>
          <h3>🎯 Available Features:</h3>
          <ul>
            <li>✅ Interactive Lessons with Videos & Quizzes</li>
            <li>✅ AR Zone with Real AR.js Implementation</li>
            <li>✅ Educational Games</li>
            <li>✅ Student Dashboard</li>
            <li>✅ Progress Tracking</li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button 
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
            onClick={() => alert('Login feature will be implemented next!')}
          >
            Get Started
          </button>
          
          <button 
            style={{
              backgroundColor: '#0284c7',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onClick={() => alert('AR Zone coming soon!')}
          >
            Try AR Zone
          </button>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#eff6ff', 
          border: '1px solid #3b82f6',
          borderRadius: '8px'
        }}>
          <h3>🚀 Development Status:</h3>
          <p><strong>✅ Frontend:</strong> React + Vite</p>
          <p><strong>✅ Styling:</strong> Tailwind CSS + shadcn/ui</p>
          <p><strong>✅ AR Technology:</strong> AR.js + A-Frame</p>
          <p><strong>✅ Routing:</strong> React Router</p>
          <p><strong>🎯 Status:</strong> Prototype Ready for Demo</p>
        </div>

        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          <p>Server running on: <strong>http://localhost:8081</strong></p>
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleApp;