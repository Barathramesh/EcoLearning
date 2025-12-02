import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { 
  BookOpen, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  Tag,
  Star,
  X
} from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Environmental Science Basics',
      description: 'Introduction to environmental science and ecology',
      instructor: 'Dr. Sarah Johnson',
      students: 145,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'Environmental Science',
      rating: 4.8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Climate Change & Sustainability',
      description: 'Understanding climate change and sustainable practices',
      instructor: 'Prof. Michael Chen',
      students: 98,
      duration: '6 weeks',
      level: 'Intermediate',
      category: 'Sustainability',
      rating: 4.6,
      status: 'active'
    },
    {
      id: 3,
      title: 'Renewable Energy Technologies',
      description: 'Exploring solar, wind, and other renewable energy sources',
      instructor: 'Dr. Emily Parker',
      students: 67,
      duration: '10 weeks',
      level: 'Advanced',
      category: 'Energy',
      rating: 4.9,
      status: 'active'
    },
    {
      id: 4,
      title: 'Wildlife Conservation',
      description: 'Learn about biodiversity and conservation efforts',
      instructor: 'Dr. James Wilson',
      students: 82,
      duration: '5 weeks',
      level: 'Beginner',
      category: 'Conservation',
      rating: 4.7,
      status: 'draft'
    }
  ]);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCourse = (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    setCourses(courses.filter(c => c.id !== id));
    setSuccessMessage('Course deleted successfully!');
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return { bg: '#dcfce7', text: '#22c55e' };
      case 'Intermediate': return { bg: '#fef3c7', text: '#f59e0b' };
      case 'Advanced': return { bg: '#fee2e2', text: '#ef4444' };
      default: return { bg: '#e5e7eb', text: '#6b7280' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <AdminNavbar />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Courses
            </h1>
            <p style={{ color: '#6b7280' }}>Manage educational courses and curriculum</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>

        {/* Messages */}
        {successMessage && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#dcfce7', 
            color: '#166534', 
            borderRadius: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            {successMessage}
            <button onClick={() => setSuccessMessage('')} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
          </div>
        )}

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { label: 'Total Courses', value: courses.length, color: '#3b82f6' },
            { label: 'Active Courses', value: courses.filter(c => c.status === 'active').length, color: '#22c55e' },
            { label: 'Total Students', value: courses.reduce((acc, c) => acc + c.students, 0), color: '#8b5cf6' },
            { label: 'Avg. Rating', value: (courses.reduce((acc, c) => acc + c.rating, 0) / courses.length).toFixed(1), color: '#f59e0b' }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{stat.label}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '1rem', 
          padding: '1.5rem', 
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredCourses.map((course) => {
            const levelColors = getLevelColor(course.level);
            return (
              <div key={course.id} style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{
                  height: '120px',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <BookOpen size={48} color="#22c55e" />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: course.status === 'active' ? '#22c55e' : '#f59e0b',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize'
                  }}>
                    {course.status}
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      backgroundColor: levelColors.bg,
                      color: levelColors.text,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {course.level}
                    </span>
                    <span style={{
                      backgroundColor: '#dbeafe',
                      color: '#3b82f6',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem'
                    }}>
                      {course.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    {course.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {course.description}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    by {course.instructor}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.875rem' }}>
                      <Users size={16} />
                      {course.students}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.875rem' }}>
                      <Clock size={16} />
                      {course.duration}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.875rem' }}>
                      <Star size={16} fill="#f59e0b" />
                      {course.rating}
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                      <button style={{
                        padding: '0.5rem',
                        backgroundColor: '#dbeafe',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer'
                      }}>
                        <Edit size={16} color="#3b82f6" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: '#fee2e2',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Course Modal */}
        {showCreateModal && (
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
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Create New Course</h3>
                <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Course Title" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                <textarea placeholder="Description" rows={3} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', resize: 'vertical' }} />
                <input type="text" placeholder="Instructor Name" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                  <option value="">Select Category</option>
                  <option value="environmental">Environmental Science</option>
                  <option value="sustainability">Sustainability</option>
                  <option value="energy">Energy</option>
                  <option value="conservation">Conservation</option>
                </select>
                <input type="text" placeholder="Duration (e.g., 6 weeks)" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setShowCreateModal(false)}
                  style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  style={{ flex: 1, padding: '0.75rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
