import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentProgressTracking = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classAssignments, setClassAssignments] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalAssignments, setTotalAssignments] = useState(0);

  // Get teacher ID from localStorage
  const getTeacherId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.teacherId || user.id;
  };

  // Fetch students from database
  const fetchStudents = async () => {
    try {
      const teacherId = getTeacherId();
      if (!teacherId) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/teacher/students/${teacherId}`);
      const data = await response.json();

      if (data.success && data.data) {
        // Transform students with initial values
        const transformedStudents = data.data.map(student => ({
          id: student._id,
          name: student.name,
          email: student.email || '',
          class: student.class || student.studentClass || 'Unassigned',
          rollNumber: student.rollNumber,
          level: 1, // Initial level
          totalPoints: 0, // Initial points
          weeklyPoints: 0,
          completedAssignments: 0,
          totalAssignments: 0,
          avgScore: 0,
          lastActive: student.updatedAt || student.createdAt || new Date().toISOString(),
          status: 'new',
          achievements: [],
          weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
          strengths: [],
          needsImprovement: [],
          recentActivities: []
        }));
        setStudents(transformedStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch classes from database
  const fetchClasses = async () => {
    try {
      const teacherId = getTeacherId();
      if (!teacherId) return;

      const response = await fetch(`${API_BASE_URL}/class/teacher/${teacherId}`);
      const data = await response.json();

      if (data.success && data.data) {
        const classNames = data.data.map(cls => `${cls.grade}-${cls.section}`);
        setClasses(classNames);
        
        // Calculate assignments per class and total
        let total = 0;
        const assignmentsByClass = {};
        
        for (const cls of data.data) {
          try {
            const assignmentRes = await fetch(`${API_BASE_URL}/assignment/class/${cls._id}`);
            const assignmentData = await assignmentRes.json();
            const count = Array.isArray(assignmentData) ? assignmentData.length : 0;
            assignmentsByClass[`${cls.grade}-${cls.section}`] = count;
            total += count;
          } catch (err) {
            console.error('Error fetching assignments for class:', err);
            assignmentsByClass[`${cls.grade}-${cls.section}`] = 0;
          }
        }
        setClassAssignments(assignmentsByClass);
        setTotalAssignments(total);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  // Add class assignment counts to students
  const studentsWithAssignments = students.map(student => ({
    ...student,
    totalAssignments: classAssignments[student.class] || 0
  }));

  const filteredStudents = studentsWithAssignments.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Helper function to calculate percentage safely
  const getProgressPercentage = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return { bg: '#dcfce7', text: '#166534' };
      case 'good': return { bg: '#dbeafe', text: '#1e40af' };
      case 'needs-attention': return { bg: '#fee2e2', text: '#991b1b' };
      case 'new': return { bg: '#fef3c7', text: '#92400e' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const getPerformanceIcon = (status) => {
    switch(status) {
      case 'excellent': return <TrendingUp size={16} style={{ color: '#059669' }} />;
      case 'good': return <Target size={16} style={{ color: '#2563eb' }} />;
      case 'needs-attention': return <AlertCircle size={16} style={{ color: '#dc2626' }} />;
      case 'new': return <Star size={16} style={{ color: '#d97706' }} />;
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)' }}>
        <Navigation userType="teacher" />
        <div style={{ padding: '1rem', paddingTop: '5rem', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '50vh' 
          }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              border: '4px solid #e5e7eb', 
              borderTop: '4px solid #059669', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} />
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading students...</p>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)' }}>
      <Navigation userType="teacher" />
      <div style={{ padding: '1rem', paddingTop: '5rem', maxWidth: '1400px', margin: '0 auto' }}>
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
                  {filteredStudents.length > 0 ? Math.round(filteredStudents.reduce((sum, s) => sum + s.avgScore, 0) / filteredStudents.length) : 0}%
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
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}>
                  {filteredStudents.filter(s => s.status === 'excellent' || s.status === 'good').length}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>On Track</div>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.5rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {totalAssignments}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Assignments</div>
              </div>
            </div>

            {/* Student List */}
            {filteredStudents.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <Users size={48} style={{ color: '#d1d5db', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                  No students found
                </h3>
                <p style={{ color: '#6b7280' }}>
                  {searchTerm || selectedClass !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'Students will appear here once they are added to your classes'}
                </p>
              </div>
            ) : (
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
                        {student.completedAssignments}/{student.totalAssignments} ({getProgressPercentage(student.completedAssignments, student.totalAssignments)}%)
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
                        {getProgressPercentage(student.completedAssignments, student.totalAssignments)}%
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
                          width: `${getProgressPercentage(student.completedAssignments, student.totalAssignments)}%`,
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
            )}
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