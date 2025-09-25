import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  Eye, 
  Calendar, 
  Clock,
  Users,
  BookOpen,
  Target,
  Settings,
  Upload,
  Link,
  FileText,
  Video,
  Image,
  Mic,
  CheckSquare,
  Type,
  BarChart3,
  Star,
  Globe,
  Smartphone,
  Trash2,
  Copy,
  Edit
} from 'lucide-react';

const AssignmentCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assignmentType, setAssignmentType] = useState('traditional');
  const [showPreview, setShowPreview] = useState(false);
  
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    type: 'traditional',
    subject: 'Environmental Science',
    difficulty: 'intermediate',
    estimatedTime: 30,
    maxPoints: 100,
    dueDate: '',
    targetClasses: [],
    instructions: '',
    resources: [],
    questions: [],
    rubric: {
      criteria: [
        { name: 'Understanding', weight: 40, description: 'Demonstrates understanding of concepts' },
        { name: 'Application', weight: 30, description: 'Applies knowledge effectively' },
        { name: 'Presentation', weight: 30, description: 'Clear and organized presentation' }
      ]
    },
    arComponents: {
      required3DModels: [],
      requiredExperiences: [],
      customARContent: []
    }
  });

  const assignmentTypes = [
    {
      id: 'traditional',
      name: 'Traditional Assignment',
      description: 'Text-based assignments, essays, reports',
      icon: <FileText size={24} />,
      color: '#3b82f6'
    },
    {
      id: 'ar-experience',
      name: 'AR Experience',
      description: 'Interactive AR-based learning activities',
      icon: <Smartphone size={24} />,
      color: '#8b5cf6'
    },
    {
      id: 'project-based',
      name: 'Project-Based',
      description: 'Multi-week environmental projects',
      icon: <Target size={24} />,
      color: '#059669'
    },
    {
      id: 'quiz-assessment',
      name: 'Quiz & Assessment',
      description: 'Multiple choice, short answer quizzes',
      icon: <CheckSquare size={24} />,
      color: '#dc2626'
    },
    {
      id: 'multimedia',
      name: 'Multimedia Project',
      description: 'Video, audio, presentation projects',
      icon: <Video size={24} />,
      color: '#ea580c'
    }
  ];

  const subjects = [
    'Environmental Science',
    'Climate Change Studies',
    'Ecology & Biodiversity',
    'Sustainable Living',
    'Earth Science',
    'Biology'
  ];

  const classes = [
    { id: 1, name: 'Environmental Science 101', students: 28 },
    { id: 2, name: 'Climate Change Studies', students: 24 },
    { id: 3, name: 'Ecology & Biodiversity', students: 22 },
    { id: 4, name: 'Sustainable Living', students: 18 }
  ];

  const existingAssignments = [
    {
      id: 1,
      title: 'Carbon Footprint Calculator',
      type: 'traditional',
      subject: 'Environmental Science',
      dueDate: '2025-09-25',
      status: 'active',
      submissions: 18,
      totalStudents: 28,
      avgScore: 88
    },
    {
      id: 2,
      title: 'Solar Panel 3D Model Exploration',
      type: 'ar-experience',
      subject: 'Environmental Science',
      dueDate: '2025-09-22',
      status: 'active',
      submissions: 24,
      totalStudents: 28,
      avgScore: 92
    },
    {
      id: 3,
      title: 'Renewable Energy Research Project',
      type: 'project-based',
      subject: 'Climate Change Studies',
      dueDate: '2025-10-01',
      status: 'draft',
      submissions: 0,
      totalStudents: 24,
      avgScore: 0
    },
    {
      id: 4,
      title: 'Ecosystem Diversity Quiz',
      type: 'quiz-assessment',
      subject: 'Ecology & Biodiversity',
      dueDate: '2025-09-20',
      status: 'completed',
      submissions: 22,
      totalStudents: 22,
      avgScore: 84
    }
  ];

  const arExperiences = [
    { id: 1, name: '3D Environmental Models', description: 'Explore wind turbines, solar panels' },
    { id: 2, name: 'AR Waste Sorting Game', description: 'Interactive waste classification' },
    { id: 3, name: 'Eco-Action Demonstrations', description: 'Step-by-step environmental actions' },
    { id: 4, name: 'Forest Ecosystem Explorer', description: 'Virtual forest biodiversity tour' },
    { id: 5, name: 'Ocean Cleanup Simulation', description: 'AR ocean pollution cleanup' }
  ];

  const handleInputChange = (field, value) => {
    setAssignmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'text',
      question: '',
      options: [],
      points: 10,
      required: true
    };
    setAssignmentData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setAssignmentData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return { bg: '#dcfce7', text: '#166534' };
      case 'draft': return { bg: '#fef3c7', text: '#92400e' };
      case 'completed': return { bg: '#dbeafe', text: '#1e40af' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
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
                Assignment Creation & Management
              </h1>
              <p style={{ color: '#6b7280' }}>
                Create engaging assignments, AR experiences, and track student submissions
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setShowPreview(!showPreview)}
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
                <Eye size={16} />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
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
                <Plus size={16} />
                New Assignment
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📝</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#059669' }}>
                {existingAssignments.filter(a => a.status === 'active').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Active</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📋</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {existingAssignments.filter(a => a.status === 'draft').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Drafts</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>✅</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {existingAssignments.filter(a => a.status === 'completed').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Completed</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⭐</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#7c3aed' }}>
                {Math.round(existingAssignments.reduce((sum, a) => sum + (a.avgScore || 0), 0) / existingAssignments.length)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Avg Score</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          {/* Assignment Creation Form */}
          <div>
            {/* Assignment Type Selection */}
            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} />
                Assignment Type
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {assignmentTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => {
                      setAssignmentType(type.id);
                      handleInputChange('type', type.id);
                    }}
                    style={{
                      padding: '1rem',
                      border: `2px solid ${assignmentType === type.id ? type.color : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: assignmentType === type.id ? `${type.color}10` : 'white',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ color: type.color }}>
                        {type.icon}
                      </div>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                        {type.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} />
                Basic Information
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                    Assignment Title *
                  </label>
                  <input
                    type="text"
                    value={assignmentData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter assignment title..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                    Subject
                  </label>
                  <select
                    value={assignmentData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                  Description
                </label>
                <textarea
                  value={assignmentData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the assignment objectives and expectations..."
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                    Difficulty Level
                  </label>
                  <select
                    value={assignmentData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                    Est. Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={assignmentData.estimatedTime}
                    onChange={(e) => handleInputChange('estimatedTime', parseInt(e.target.value))}
                    min="5"
                    max="300"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                    Max Points
                  </label>
                  <input
                    type="number"
                    value={assignmentData.maxPoints}
                    onChange={(e) => handleInputChange('maxPoints', parseInt(e.target.value))}
                    min="10"
                    max="500"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* AR Components (if AR assignment type) */}
            {assignmentType === 'ar-experience' && (
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Smartphone size={20} />
                  AR Experience Components
                </h2>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                    Required AR Experiences
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                    {arExperiences.map(experience => (
                      <label
                        key={experience.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          backgroundColor: '#f9fafb'
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{ marginRight: '0.5rem' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                            {experience.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {experience.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Save as Draft
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Publish Assignment
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={20} />
                Student Preview
              </h2>
              
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {assignmentData.title || 'Assignment Title'}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                  {assignmentData.description || 'Assignment description will appear here...'}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {assignmentData.estimatedTime} min
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={14} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {assignmentData.maxPoints} points
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Target size={14} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {assignmentData.difficulty}
                    </span>
                  </div>
                </div>
                
                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Start Assignment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Existing Assignments */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
            Your Assignments
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '1.5rem'
          }}>
            {existingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
                      {assignment.title}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {assignment.subject}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: getStatusColor(assignment.status).bg,
                    color: getStatusColor(assignment.status).text
                  }}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Due Date</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                      {formatDate(assignment.dueDate)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Type</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                      {assignmentTypes.find(t => t.id === assignment.type)?.name || assignment.type}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Submissions</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                      {assignment.submissions}/{assignment.totalStudents}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Avg Score</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                      {assignment.avgScore || 0}%
                    </div>
                  </div>
                </div>

                <div style={{ 
                  width: '100%', 
                  height: '0.5rem', 
                  backgroundColor: '#e5e7eb', 
                  borderRadius: '0.25rem',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div
                    style={{
                      width: `${assignment.totalStudents > 0 ? (assignment.submissions / assignment.totalStudents) * 100 : 0}%`,
                      height: '100%',
                      backgroundColor: '#10b981',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>

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
                    View
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
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCreation;