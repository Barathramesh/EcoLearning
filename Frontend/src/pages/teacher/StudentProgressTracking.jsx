import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  Target, 
  BookOpen, 
  Clock,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const StudentProgressTracking = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock data for student progress
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@student.edu",
      class: "Environmental Science 101",
      level: 12,
      totalPoints: 2847,
      weeklyPoints: 245,
      completedAssignments: 18,
      totalAssignments: 20,
      arExperiences: 8,
      totalArExperiences: 10,
      avgScore: 88,
      lastActive: "2025-09-19T14:30:00",
      status: "excellent",
      achievements: ["Eco Warrior", "AR Explorer", "Green Leader"],
      weeklyActivity: [120, 180, 95, 210, 165, 245, 180],
      strengths: ["3D Models", "Waste Sorting", "Eco Actions"],
      needsImprovement: ["Climate Data Analysis"],
      recentActivities: [
        { type: "assignment", name: "Carbon Footprint Calculator", score: 92, date: "2025-09-19" },
        { type: "ar", name: "Solar Panel 3D Model", completed: true, date: "2025-09-18" },
        { type: "quiz", name: "Renewable Energy Quiz", score: 85, date: "2025-09-17" }
      ]
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma.wilson@student.edu",
      class: "Environmental Science 101",
      level: 11,
      totalPoints: 2634,
      weeklyPoints: 198,
      completedAssignments: 17,
      totalAssignments: 20,
      arExperiences: 7,
      totalArExperiences: 10,
      avgScore: 91,
      lastActive: "2025-09-19T16:45:00",
      status: "excellent",
      achievements: ["Sustainability Expert", "Quiz Master"],
      weeklyActivity: [95, 145, 120, 198, 175, 210, 165],
      strengths: ["Climate Studies", "Data Analysis"],
      needsImprovement: ["AR Interactions", "Team Projects"],
      recentActivities: [
        { type: "assignment", name: "Ecosystem Analysis", score: 95, date: "2025-09-19" },
        { type: "ar", name: "Wind Turbine Model", completed: true, date: "2025-09-18" },
        { type: "discussion", name: "Climate Solutions Forum", participated: true, date: "2025-09-17" }
      ]
    },
    {
      id: 3,
      name: "David Kim",
      email: "david.kim@student.edu",
      class: "Climate Change Studies",
      level: 10,
      totalPoints: 2489,
      weeklyPoints: 156,
      completedAssignments: 15,
      totalAssignments: 18,
      arExperiences: 9,
      totalArExperiences: 10,
      avgScore: 84,
      lastActive: "2025-09-19T12:15:00",
      status: "good",
      achievements: ["AR Pioneer", "Collaboration Champion"],
      weeklyActivity: [78, 120, 156, 134, 145, 167, 189],
      strengths: ["AR Experiences", "Hands-on Activities"],
      needsImprovement: ["Written Assignments", "Time Management"],
      recentActivities: [
        { type: "ar", name: "Waste Sorting Game", score: 88, date: "2025-09-19" },
        { type: "assignment", name: "Renewable Energy Report", score: 78, date: "2025-09-18" },
        { type: "ar", name: "Eco-Action Demo", completed: true, date: "2025-09-17" }
      ]
    },
    {
      id: 4,
      name: "Sofia Martinez",
      email: "sofia.martinez@student.edu",
      class: "Environmental Science 101",
      level: 9,
      totalPoints: 2156,
      weeklyPoints: 87,
      completedAssignments: 14,
      totalAssignments: 20,
      arExperiences: 5,
      totalArExperiences: 10,
      avgScore: 76,
      lastActive: "2025-09-17T10:20:00",
      status: "needs-attention",
      achievements: ["Green Beginner"],
      weeklyActivity: [45, 67, 89, 78, 56, 87, 43],
      strengths: ["Environmental Awareness"],
      needsImprovement: ["AR Engagement", "Assignment Completion", "Consistency"],
      recentActivities: [
        { type: "assignment", name: "Water Conservation Essay", score: 72, date: "2025-09-17" },
        { type: "quiz", name: "Pollution Types Quiz", score: 68, date: "2025-09-16" },
        { type: "ar", name: "Ocean Cleanup Model", completed: false, date: "2025-09-15" }
      ]
    },
    {
      id: 5,
      name: "Ryan Chen",
      email: "ryan.chen@student.edu",
      class: "Ecology & Biodiversity",
      level: 8,
      totalPoints: 1934,
      weeklyPoints: 134,
      completedAssignments: 13,
      totalAssignments: 17,
      arExperiences: 6,
      totalArExperiences: 9,
      avgScore: 82,
      lastActive: "2025-09-19T09:45:00",
      status: "good",
      achievements: ["Biodiversity Explorer", "Lab Expert"],
      weeklyActivity: [89, 112, 134, 145, 98, 156, 167],
      strengths: ["Laboratory Work", "Species Identification"],
      needsImprovement: ["Digital Literacy", "Presentation Skills"],
      recentActivities: [
        { type: "lab", name: "Microscopy Session", score: 90, date: "2025-09-19" },
        { type: "assignment", name: "Species Classification", score: 85, date: "2025-09-18" },
        { type: "ar", name: "Forest Ecosystem AR", completed: true, date: "2025-09-17" }
      ]
    }
  ];

  const classes = [
    "Environmental Science 101",
    "Climate Change Studies", 
    "Ecology & Biodiversity",
    "Sustainable Living"
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return { bg: '#dcfce7', text: '#166534' };
      case 'good': return { bg: '#dbeafe', text: '#1e40af' };
      case 'needs-attention': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const getPerformanceIcon = (status) => {
    switch(status) {
      case 'excellent': return <TrendingUp size={16} style={{ color: '#059669' }} />;
      case 'good': return <Target size={16} style={{ color: '#2563eb' }} />;
      case 'needs-attention': return <AlertCircle size={16} style={{ color: '#dc2626' }} />;
      default: return <Activity size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)', padding: '1rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                Student Progress Tracking
              </h1>
              <p style={{ color: '#6b7280' }}>
                Monitor student performance, engagement, and learning outcomes
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Download size={16} />
                Export Report
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <BarChart3 size={16} />
                View Analytics
              </button>
            </div>
          </div>

          {/* View Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {[
              { id: 'overview', label: 'Overview', icon: <Users size={16} /> },
              { id: 'individual', label: 'Individual Progress', icon: <Target size={16} /> },
              { id: 'assignments', label: 'Assignment Tracking', icon: <BookOpen size={16} /> },
              { id: 'ar-activities', label: 'AR Activities', icon: <Star size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                style={{
                  padding: '0.75rem 1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: selectedView === tab.id ? '#059669' : '#f3f4f6',
                  color: selectedView === tab.id ? 'white' : '#374151',
                  fontWeight: selectedView === tab.id ? '500' : 'normal'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filter Bar */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#6b7280' 
                }} 
              />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                minWidth: '200px'
              }}
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Overview View */}
        {selectedView === 'overview' && (
          <>
            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.5rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{filteredStudents.length}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Students</div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.5rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                  {Math.round(filteredStudents.reduce((sum, s) => sum + s.avgScore, 0) / filteredStudents.length)}%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Score</div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.5rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {Math.round(filteredStudents.reduce((sum, s) => sum + (s.arExperiences/s.totalArExperiences), 0) / filteredStudents.length * 100)}%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>AR Completion</div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.5rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}>
                  {filteredStudents.filter(s => s.status === 'excellent' || s.status === 'good').length}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>On Track</div>
              </div>
            </div>

            {/* Student List */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
              gap: '1.5rem'
            }}>
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => setSelectedStudent(student)}
                >
                  {/* Student Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: '#6366f1',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
                          {student.name}
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          {student.class}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getPerformanceIcon(student.status)}
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: getStatusColor(student.status).bg,
                        color: getStatusColor(student.status).text
                      }}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Progress Metrics */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Trophy size={14} style={{ color: '#f59e0b' }} />
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Level & Points</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                        Level {student.level} • {student.totalPoints.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <BookOpen size={14} style={{ color: '#3b82f6' }} />
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Assignments</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                        {student.completedAssignments}/{student.totalAssignments} ({Math.round(student.completedAssignments/student.totalAssignments*100)}%)
                      </p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Star size={14} style={{ color: '#7c3aed' }} />
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>AR Experiences</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                        {student.arExperiences}/{student.totalArExperiences} ({Math.round(student.arExperiences/student.totalArExperiences*100)}%)
                      </p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Target size={14} style={{ color: '#059669' }} />
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Average Score</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                        {student.avgScore}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Overall Progress</span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {Math.round((student.completedAssignments/student.totalAssignments + student.arExperiences/student.totalArExperiences) / 2 * 100)}%
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '0.5rem', 
                      backgroundColor: '#e5e7eb', 
                      borderRadius: '0.25rem',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          width: `${Math.round((student.completedAssignments/student.totalAssignments + student.arExperiences/student.totalArExperiences) / 2 * 100)}%`,
                          height: '100%',
                          backgroundColor: student.status === 'excellent' ? '#10b981' : student.status === 'good' ? '#3b82f6' : '#f59e0b',
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Award size={14} style={{ color: '#f59e0b' }} />
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Achievements</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {student.achievements.slice(0, 3).map((achievement, index) => (
                        <span
                          key={index}
                          style={{
                            padding: '0.125rem 0.375rem',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            borderRadius: '0.25rem',
                            fontSize: '0.625rem',
                            fontWeight: '500'
                          }}
                        >
                          {achievement}
                        </span>
                      ))}
                      {student.achievements.length > 3 && (
                        <span style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                          +{student.achievements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Last Active */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={14} style={{ color: '#6b7280' }} />
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Last active: {formatLastActive(student.lastActive)}
                      </span>
                    </div>
                    <button
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Eye size={12} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Other views can be implemented similarly */}
        {selectedView !== 'overview' && (
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              {selectedView.charAt(0).toUpperCase() + selectedView.slice(1).replace('-', ' ')} View
            </h3>
            <p style={{ color: '#6b7280' }}>
              This view is under development. Coming soon with detailed {selectedView.replace('-', ' ')} tracking features.
            </p>
          </div>
        )}
      </div>

      {/* Student Detail Modal (placeholder) */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {selectedStudent.name} - Detailed Progress
              </h2>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ×
              </button>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Detailed progress tracking for {selectedStudent.name} including activity history, strengths, and areas for improvement.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgressTracking;