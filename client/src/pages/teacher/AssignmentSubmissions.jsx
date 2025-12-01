import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import {
    ArrowLeft,
    FileText,
    Users,
    CheckCircle,
    Clock,
    XCircle,
    Download,
    Search,
    Filter
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AssignmentSubmissions = () => {
    const navigate = useNavigate();
    const { assignmentId } = useParams();
    const [searchParams] = useSearchParams();
    const [assignment, setAssignment] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const classFilter = {
        classId: searchParams.get('classId'),
        grade: searchParams.get('grade'),
        section: searchParams.get('section')
    };

    // Fetch assignment details
    const fetchAssignment = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/assignment/${assignmentId}`);
            const data = await response.json();
            if (data._id) {
                setAssignment(data);
            }
        } catch (error) {
            console.error('Error fetching assignment:', error);
        }
    };

    // Fetch students for this class
    const fetchStudents = async () => {
        try {
            if (!classFilter.classId) return;
            
            const response = await fetch(`${API_BASE_URL}/class/${classFilter.classId}/students`);
            const data = await response.json();
            
            if (data.success && data.data.students) {
                // Add mock submission status for each student
                // In real app, you would fetch actual submission data
                const studentsWithStatus = data.data.students.map(student => ({
                    ...student,
                    submissionStatus: Math.random() > 0.3 ? 'submitted' : 'pending',
                    submittedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
                    score: Math.random() > 0.3 ? Math.floor(Math.random() * 40) + 60 : null
                }));
                setStudents(studentsWithStatus);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignment();
        fetchStudents();
    }, [assignmentId]);

    // Filter students based on search and status
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || student.submissionStatus === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const submittedCount = students.filter(s => s.submissionStatus === 'submitted').length;
    const pendingCount = students.filter(s => s.submissionStatus === 'pending').length;

    const typeLabels = {
        'traditional': 'Traditional Assignment',
        'project-based': 'Project-Based',
        'quiz-assessment': 'Quiz & Assessment',
        'multimedia': 'Multimedia Project'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)' }}>
            <Navigation userType="teacher" />
            <div style={{ padding: '1rem', paddingTop: '5rem', maxWidth: '1200px', margin: '0 auto' }}>
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
                    Back to Class
                </button>

                {/* Assignment Header */}
                {assignment && (
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <FileText size={28} style={{ color: '#8b5cf6' }} />
                                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                                        {assignment.title}
                                    </h1>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: new Date(assignment.dueDate) >= new Date() ? '#16a34a' : '#dc2626',
                                        backgroundColor: new Date(assignment.dueDate) >= new Date() ? '#dcfce7' : '#fee2e2',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontWeight: '500'
                                    }}>
                                        {new Date(assignment.dueDate) >= new Date() ? 'Active' : 'Past Due'}
                                    </span>
                                </div>
                                <p style={{ color: '#16a34a', marginBottom: '0.25rem' }}>{assignment.subject}</p>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    {typeLabels[assignment.type]} • Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {assignment.maxPoints} points
                                </p>
                            </div>
                            
                            {/* Stats Cards */}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{
                                    backgroundColor: '#dcfce7',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{submittedCount}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#15803d' }}>Submitted</p>
                                </div>
                                <div style={{
                                    backgroundColor: '#fef3c7',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>{pendingCount}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#b45309' }}>Pending</p>
                                </div>
                                <div style={{
                                    backgroundColor: '#dbeafe',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                                        {submittedCount > 0 ? Math.round(students.filter(s => s.score).reduce((acc, s) => acc + s.score, 0) / submittedCount) : 0}%
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>Avg Score</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>
                    
                    {/* Status Filter */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['all', 'submitted', 'pending'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: filterStatus === status ? '#8b5cf6' : 'white',
                                    color: filterStatus === status ? 'white' : '#374151',
                                    border: filterStatus === status ? 'none' : '1px solid #d1d5db',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '0.875rem',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {status === 'all' ? 'All Students' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Students List */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                        gap: '1rem',
                        padding: '1rem 1.5rem',
                        backgroundColor: '#f9fafb',
                        borderBottom: '1px solid #e5e7eb',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        color: '#374151'
                    }}>
                        <div>Student</div>
                        <div>Roll Number</div>
                        <div>Status</div>
                        <div>Submitted At</div>
                        <div>Score</div>
                    </div>

                    {/* Student Rows */}
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                            Loading students...
                        </div>
                    ) : filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                            <div
                                key={student._id || index}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                                    gap: '1rem',
                                    padding: '1rem 1.5rem',
                                    borderBottom: index < filteredStudents.length - 1 ? '1px solid #e5e7eb' : 'none',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        backgroundColor: '#e0e7ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '600',
                                        color: '#4f46e5',
                                        fontSize: '0.875rem'
                                    }}>
                                        {student.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span style={{ fontWeight: '500', color: '#1f2937' }}>{student.name}</span>
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    {student.rollNumber}
                                </div>
                                <div>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        backgroundColor: student.submissionStatus === 'submitted' ? '#dcfce7' : '#fef3c7',
                                        color: student.submissionStatus === 'submitted' ? '#16a34a' : '#d97706'
                                    }}>
                                        {student.submissionStatus === 'submitted' ? (
                                            <><CheckCircle size={12} /> Submitted</>
                                        ) : (
                                            <><Clock size={12} /> Pending</>
                                        )}
                                    </span>
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    {student.submittedAt 
                                        ? new Date(student.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                        : '-'
                                    }
                                </div>
                                <div style={{ fontWeight: '500', color: student.score ? '#1f2937' : '#9ca3af' }}>
                                    {student.score ? `${student.score}%` : '-'}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                            <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <p>No students found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentSubmissions;
