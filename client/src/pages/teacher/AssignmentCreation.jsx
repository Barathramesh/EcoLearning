import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { 
  FileText,
  ArrowLeft,
  Send,
  Sparkles,
  Plus,
  X,
  HelpCircle,
  Wand2,
  Loader2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AssignmentCreation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [showAISettings, setShowAISettings] = useState(true);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  
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
    dueDate: '',
    // AI Grading fields
    expectedAnswer: '',
    keyPoints: [''],
    enableAIGrading: true,
    gradingCriteria: {
      uniqueness: 25,
      contentAccuracy: 40,
      relevance: 20,
      quality: 15
    }
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

  // Key Points handlers
  const addKeyPoint = () => {
    setAssignmentData(prev => ({
      ...prev,
      keyPoints: [...prev.keyPoints, '']
    }));
  };

  const removeKeyPoint = (index) => {
    setAssignmentData(prev => ({
      ...prev,
      keyPoints: prev.keyPoints.filter((_, i) => i !== index)
    }));
  };

  const updateKeyPoint = (index, value) => {
    setAssignmentData(prev => ({
      ...prev,
      keyPoints: prev.keyPoints.map((kp, i) => i === index ? value : kp)
    }));
  };

  const handleCriteriaChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setAssignmentData(prev => ({
      ...prev,
      gradingCriteria: {
        ...prev.gradingCriteria,
        [field]: numValue
      }
    }));
  };

  // Generate Expected Answer with AI
  const generateExpectedAnswerWithAI = async () => {
    if (!assignmentData.title.trim()) {
      alert('Please enter the Assignment Title first so AI can generate a relevant answer.');
      return;
    }
    if (!assignmentData.subject) {
      alert('Please select a Subject first.');
      return;
    }

    setGeneratingAnswer(true);
    try {
      const response = await fetch(`${API_BASE_URL}/assignment/generate-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: assignmentData.title,
          description: assignmentData.description,
          subject: assignmentData.subject,
          maxPoints: assignmentData.maxPoints
        })
      });

      const data = await response.json();

      if (data.success) {
        setAssignmentData(prev => ({
          ...prev,
          expectedAnswer: data.expectedAnswer,
          keyPoints: data.keyPoints && data.keyPoints.length > 0 ? data.keyPoints : prev.keyPoints
        }));
        alert('✨ Expected answer generated successfully! You can edit it if needed.');
      } else {
        alert(data.message || 'Failed to generate expected answer. Please try again.');
      }
    } catch (error) {
      console.error('Error generating expected answer:', error);
      alert('Error generating expected answer. Please check your connection and try again.');
    } finally {
      setGeneratingAnswer(false);
    }
  };

  const handlePublish = async () => {
    // Validate required fields
    if (!assignmentData.title || !assignmentData.classId || !assignmentData.subject || !assignmentData.dueDate) {
      alert('Please fill in all required fields: Title, Class, Subject, and Due Date');
      return;
    }

    // Validate AI grading fields if enabled
    if (assignmentData.enableAIGrading && !assignmentData.expectedAnswer.trim()) {
      alert('Please provide an Expected Answer for AI grading, or disable AI grading.');
      return;
    }

    setLoading(true);
    try {
      const { teacherId, teacherName } = getTeacherInfo();
      
      // Filter out empty key points
      const filteredKeyPoints = assignmentData.keyPoints.filter(kp => kp.trim() !== '');
      
      const response = await fetch(`${API_BASE_URL}/assignment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assignmentData,
          keyPoints: filteredKeyPoints,
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
              ?  `Creating assignment for Grade ${classFilter.grade} - Section ${classFilter.section}`
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

          {/* AI Grading Section */}
          <div style={{
            backgroundColor: '#f5f3ff',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #c4b5fd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#5b21b6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={24} />
                AI Auto-Grading Settings
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={assignmentData.enableAIGrading}
                  onChange={(e) => setAssignmentData(prev => ({ ...prev, enableAIGrading: e.target.checked }))}
                  style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: '500', color: '#374151' }}>Enable AI Grading</span>
              </label>
            </div>

            {assignmentData.enableAIGrading && (
              <>
                {/* Expected Answer */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                      Expected Answer / Model Answer <span style={{ color: '#ef4444' }}>*</span>
                      <HelpCircle size={16} style={{ color: '#9ca3af' }} title="The AI will compare student answers against this model answer" />
                    </label>
                    <button
                      type="button"
                      onClick={generateExpectedAnswerWithAI}
                      disabled={generatingAnswer}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: generatingAnswer ? '#c4b5fd' : '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: generatingAnswer ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {generatingAnswer ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 size={16} />
                          Generate with AI
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    name="expectedAnswer"
                    value={assignmentData.expectedAnswer}
                    onChange={handleInputChange}
                    placeholder="Enter the ideal/model answer or click 'Generate with AI' to auto-generate based on the assignment title and subject..."
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    💡 Click "Generate with AI" to auto-generate an expected answer, or write your own. The AI will use this to grade student submissions.
                  </p>
                </div>

                {/* Key Points */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                    Key Points to Cover
                    <HelpCircle size={16} style={{ color: '#9ca3af' }} title="Specific concepts students should mention in their answer" />
                  </label>
                  {assignmentData.keyPoints.map((point, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateKeyPoint(index, e.target.value)}
                        placeholder={`Key point ${index + 1}...`}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.95rem'
                        }}
                      />
                      {assignmentData.keyPoints.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKeyPoint(index)}
                          style={{
                            padding: '0.5rem',
                            backgroundColor: '#fee2e2',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            color: '#dc2626'
                          }}
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addKeyPoint}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#ddd6fe',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      color: '#5b21b6',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    <Plus size={16} />
                    Add Key Point
                  </button>
                </div>

                {/* Grading Criteria Weights */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '500', color: '#374151' }}>
                    Grading Criteria Weights
                    <HelpCircle size={16} style={{ color: '#9ca3af' }} title="Adjust how much each criterion affects the final grade (must total 100)" />
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Content Accuracy
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={assignmentData.gradingCriteria.contentAccuracy}
                          onChange={(e) => handleCriteriaChange('contentAccuracy', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <span style={{ fontWeight: '600', color: '#5b21b6', minWidth: '3rem' }}>{assignmentData.gradingCriteria.contentAccuracy}%</span>
                      </div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Originality / Uniqueness
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={assignmentData.gradingCriteria.uniqueness}
                          onChange={(e) => handleCriteriaChange('uniqueness', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <span style={{ fontWeight: '600', color: '#5b21b6', minWidth: '3rem' }}>{assignmentData.gradingCriteria.uniqueness}%</span>
                      </div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Topic Relevance
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={assignmentData.gradingCriteria.relevance}
                          onChange={(e) => handleCriteriaChange('relevance', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <span style={{ fontWeight: '600', color: '#5b21b6', minWidth: '3rem' }}>{assignmentData.gradingCriteria.relevance}%</span>
                      </div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Writing Quality
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={assignmentData.gradingCriteria.quality}
                          onChange={(e) => handleCriteriaChange('quality', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <span style={{ fontWeight: '600', color: '#5b21b6', minWidth: '3rem' }}>{assignmentData.gradingCriteria.quality}%</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', textAlign: 'center' }}>
                    Total Weight: <strong style={{ color: 
                      (assignmentData.gradingCriteria.contentAccuracy + 
                       assignmentData.gradingCriteria.uniqueness + 
                       assignmentData.gradingCriteria.relevance + 
                       assignmentData.gradingCriteria.quality) === 100 ? '#059669' : '#dc2626'
                    }}>
                      {assignmentData.gradingCriteria.contentAccuracy + 
                       assignmentData.gradingCriteria.uniqueness + 
                       assignmentData.gradingCriteria.relevance + 
                       assignmentData.gradingCriteria.quality}%
                    </strong>
                    {(assignmentData.gradingCriteria.contentAccuracy + 
                      assignmentData.gradingCriteria.uniqueness + 
                      assignmentData.gradingCriteria.relevance + 
                      assignmentData.gradingCriteria.quality) !== 100 && 
                      <span style={{ color: '#dc2626' }}> (should be 100%)</span>
                    }
                  </p>
                </div>
              </>
            )}
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