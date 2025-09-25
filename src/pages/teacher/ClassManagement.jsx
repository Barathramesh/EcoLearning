import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Settings, 
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const ClassManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCreateClass, setShowCreateClass] = useState(false);

  // Mock data for classes
  const classes = [
    {
      id: 1,
      name: "Environmental Science 101",
      subject: "Environmental Science",
      grade: "9th Grade",
      students: 28,
      maxStudents: 30,
      schedule: "Mon, Wed, Fri - 10:00 AM",
      room: "Science Lab A",
      status: "active",
      nextClass: "2025-09-20T10:00:00",
      assignments: 12,
      completionRate: 85,
      avgScore: 88
    },
    {
      id: 2,
      name: "Climate Change Studies",
      subject: "Earth Science",
      grade: "11th Grade", 
      students: 24,
      maxStudents: 25,
      schedule: "Tue, Thu - 2:00 PM",
      room: "Room 205",
      status: "active",
      nextClass: "2025-09-21T14:00:00",
      assignments: 8,
      completionRate: 92,
      avgScore: 91
    },
    {
      id: 3,
      name: "Ecology & Biodiversity",
      subject: "Biology",
      grade: "10th Grade",
      students: 22,
      maxStudents: 30,
      schedule: "Mon, Wed - 1:00 PM",
      room: "Bio Lab",
      status: "active",
      nextClass: "2025-09-22T13:00:00",
      assignments: 15,
      completionRate: 78,
      avgScore: 84
    },
    {
      id: 4,
      name: "Sustainable Living",
      subject: "Life Skills",
      grade: "12th Grade",
      students: 18,
      maxStudents: 20,
      schedule: "Fri - 3:00 PM",
      room: "Multi-purpose Hall",
      status: "archived",
      nextClass: null,
      assignments: 20,
      completionRate: 95,
      avgScore: 93
    }
  ];

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No upcoming class';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)', padding: '1rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                Class Management
              </h1>
              <p style={{ color: '#6b7280' }}>
                Manage your classes, students, and schedules
              </p>
            </div>
            <button
              onClick={() => setShowCreateClass(true)}
              style={{
                backgroundColor: '#059669',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Plus size={20} />
              Create New Class
            </button>
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
                placeholder="Search classes..."
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
            <button
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Filter size={20} />
              Filter
            </button>
          </div>
        </div>

        {/* Classes Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
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
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
              onClick={() => setSelectedClass(cls)}
            >
              {/* Class Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {cls.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {cls.subject} • {cls.grade}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    ...getStatusColor(cls.status).split(' ').reduce((acc, cls) => {
                      if (cls.startsWith('bg-')) acc.backgroundColor = cls.replace('bg-', '#');
                      if (cls.startsWith('text-')) acc.color = cls.replace('text-', '#');
                      return acc;
                    }, {})
                  }}>
                    {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                  </span>
                  <button
                    style={{
                      padding: '0.25rem',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      borderRadius: '0.25rem'
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Class Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {cls.students}/{cls.maxStudents} students
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {cls.assignments} assignments
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {cls.schedule}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {cls.room}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Class Progress</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {cls.completionRate}% • Avg: {cls.avgScore}%
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
                      width: `${cls.completionRate}%`,
                      height: '100%',
                      backgroundColor: cls.completionRate >= 80 ? '#10b981' : cls.completionRate >= 60 ? '#f59e0b' : '#ef4444',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>

              {/* Next Class */}
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '0.75rem', 
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                    Next Class:
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {formatDate(cls.nextClass)}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Eye size={16} />
                  View Details
                </button>
                <button
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  <UserPlus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{classes.filter(c => c.status === 'active').length}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Classes</div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
              {classes.reduce((total, cls) => total + cls.students, 0)}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Students</div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
              {classes.reduce((total, cls) => total + cls.assignments, 0)}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Assignments</div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c' }}>
              {Math.round(classes.reduce((total, cls) => total + cls.avgScore, 0) / classes.length)}%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Score</div>
          </div>
        </div>
      </div>

      {/* Create Class Modal (placeholder) */}
      {showCreateClass && (
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
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Create New Class
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Set up a new class for your students. You can add students and assignments after creation.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateClass(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
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
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;