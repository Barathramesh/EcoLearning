import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { 
  FileText,
  ArrowLeft,
  Send
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AssignmentCreation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  
  // Get class info from URL params
  const classFilter = {
    classId: searchParams.get('classId'),
    grade: searchParams.get('grade'),
    section: searchParams.get('section')
  };

  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    subject: 'Environmental Science',
    classId: classFilter.classId || '',
    className: classFilter.grade && classFilter.section ? `Grade ${classFilter.grade} - Section ${classFilter.section}` : '',
    maxPoints: 100,
    type: 'traditional',
    dueDate: ''
  });

  const subjects = [
    'Environmental Science',
    'Climate Change Studies',
    'Ecology & Biodiversity',
    'Sustainable Living',
    'Earth Science',
    'Biology',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const assignmentTypes = [
    { id: 'traditional', name: 'Traditional Assignment' },
    { id: 'project-based', name: 'Project-Based' },
    { id: 'quiz-assessment', name: 'Quiz & Assessment' },
    { id: 'multimedia', name: 'Multimedia Project' }
  ];

  // Get teacher info from localStorage
  const getTeacherInfo = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      teacherId: storedUser.teacherId || storedUser.id || storedUser._id,
      teacherName: storedUser.Name || storedUser.name || 'Teacher'
    };
  };

  // Fetch classes for dropdown
  const fetchClasses = async () => {
    try {
      const { teacherId } = getTeacherInfo();
      if (!teacherId) return;

      const response = await fetch(`${API_BASE_URL}/class/teacher/${teacherId}`);
      const data = await response.json();

      if (data.success) {
        setClasses(data.data);
        // If classId is in URL, set the className
        if (classFilter.classId) {
          const selectedClass = data.data.find(c => c._id === classFilter.classId);
          if (selectedClass) {
            setAssignmentData(prev => ({
              ...prev,
              classId: selectedClass._id,
              className: `Grade ${selectedClass.grade} - Section ${selectedClass.section}`
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find(c => c._id === classId);
    setAssignmentData(prev => ({
      ...prev,
      classId: classId,
      className: selectedClass ? `Grade ${selectedClass.grade} - Section ${selectedClass.section}` : ''
    }));
  };

  const handlePublish = async () => {
    // Validate required fields
    if (!assignmentData.title || !assignmentData.classId || !assignmentData.subject || !assignmentData.dueDate) {
      alert('Please fill in all required fields: Title, Class, Subject, and Due Date');
      return;
    }

    setLoading(true);
    try {
      const { teacherId, teacherName } = getTeacherInfo();
      
      const response = await fetch(`${API_BASE_URL}/assignment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assignmentData,
          teacherId,
          teacherName,
          status: 'published'
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Assignment published successfully!');
        // Navigate back to student management with class filter
        if (classFilter.classId) {
          navigate(`/teacher/student-management?classId=${classFilter.classId}&grade=${classFilter.grade}&section=${classFilter.section}`);
        } else {
          navigate('/teacher/classes');
        }
      } else {
        alert(data.message || 'Failed to publish assignment');
      }
    } catch (error) {
      console.error('Error publishing assignment:', error);
      alert('Failed to publish assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)' }}>
      <Navigation userType="teacher" />
      <div style={{ padding: '1rem', paddingTop: '5rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => {
            if (classFilter.classId) {
              navigate(`/teacher/student-management?classId=${classFilter.classId}&grade=${classFilter.grade}&section=${classFilter.section}`);
            } else {
              navigate('/teacher/classes');
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginBottom: '1rem',
            color: '#374151'
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={28} />
            Create Assignment
          </h1>
          <p style={{ color: '#6b7280' }}>
            {classFilter.grade && classFilter.section 
              ? `Creating assignment for Grade ${classFilter.grade} - Section ${classFilter.section}`
              : 'Fill in the details to create a new assignment'
            }
          </p>
        </div>

        {/* Assignment Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Assignment Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Assignment Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={assignmentData.title}
              onChange={handleInputChange}
              placeholder="Enter assignment title"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Subject Dropdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Subject <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              name="subject"
              value={assignmentData.subject}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Description
            </label>
            <textarea
              name="description"
              value={assignmentData.description}
              onChange={handleInputChange}
              placeholder="Enter assignment description and instructions..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Class Dropdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Class <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              name="classId"
              value={assignmentData.classId}
              onChange={handleClassChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select a class</option>
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>
                  Grade {cls.grade} - Section {cls.section} ({cls.subject})
                </option>
              ))}
            </select>
          </div>

          {/* Max Points */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Max Points
            </label>
            <input
              type="number"
              name="maxPoints"
              value={assignmentData.maxPoints}
              onChange={handleInputChange}
              min="1"
              max="1000"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Assignment Type Dropdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Assignment Type
            </label>
            <select
              name="type"
              value={assignmentData.type}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              {assignmentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Due Date <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={assignmentData.dueDate}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#9ca3af' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Send size={20} />
            {loading ? 'Publishing...' : 'Publish Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCreation;
