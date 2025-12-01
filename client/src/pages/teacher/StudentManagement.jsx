import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../../components/Navigation';
import { 
  Users, 
  Plus, 
  Search,
  Upload,
  Download,
  Key,
  Trash2,
  Edit,
  X,
  Check,
  FileSpreadsheet,
  Eye,
  EyeOff,
  Copy,
  CheckCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [generatedCredentials, setGeneratedCredentials] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const fileInputRef = useRef(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    studentClass: '',
    email: '',
    phone: '',
    address: '',
    school: '',
    joiningDate: ''
  });

  const [importData, setImportData] = useState([]);

  // Get teacher ID from localStorage (the teacherId used for login, e.g., "Ajay123")
  const getTeacherId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.teacherId; // Use teacherId (login ID) instead of MongoDB _id
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const teacherId = getTeacherId();
      if (!teacherId) {
        console.error('No teacher ID found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/teacher/students/${teacherId}`);
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Create student manually
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const teacherId = getTeacherId();
      const response = await fetch(`${API_BASE_URL}/teacher/students/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newStudent, teacherId })
      });

      const data = await response.json();
      
      if (data.success) {
        setStudents([...students, data.data]);
        setShowAddModal(false);
        setNewStudent({
          name: '',
          rollNumber: '',
          studentClass: '',
          email: '',
          phone: '',
          address: '',
          school: '',
          joiningDate: ''
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student');
    }
  };

  // Import students from CSV/Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const parsedData = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length >= 4) { // At least name, rollNumber, email, phone
          const student = {
            name: values[headers.indexOf('name')] || values[0],
            rollNumber: values[headers.indexOf('rollnumber')] || values[headers.indexOf('roll number')] || values[1],
            studentClass: values[headers.indexOf('class')] || values[headers.indexOf('studentclass')] || values[2] || '',
            email: values[headers.indexOf('email')] || values[3],
            phone: values[headers.indexOf('phone')] || values[headers.indexOf('phone number')] || values[4],
            address: values[headers.indexOf('address')] || values[5] || '',
            school: values[headers.indexOf('school')] || values[6] || '',
            joiningDate: values[headers.indexOf('joiningdate')] || values[headers.indexOf('joining date')] || values[7] || ''
          };
          parsedData.push(student);
        }
      }
      
      setImportData(parsedData);
      setShowImportModal(true);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  const handleImportStudents = async () => {
    try {
      const teacherId = getTeacherId();
      const response = await fetch(`${API_BASE_URL}/teacher/students/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students: importData, teacherId })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(data.message);
        fetchStudents();
        setShowImportModal(false);
        setImportData([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error importing students:', error);
      alert('Failed to import students');
    }
  };

  // Generate credentials
  const handleGenerateCredentials = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select students to generate credentials');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/teacher/students/generate-credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentIds: selectedStudents })
      });

      const data = await response.json();
      
      if (data.success) {
        setGeneratedCredentials(data.data);
        setShowCredentialsModal(true);
        fetchStudents();
        setSelectedStudents([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error generating credentials:', error);
      alert('Failed to generate credentials');
    }
  };

  // Delete student
  const handleDeleteStudent = async (studentId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/teacher/students/${studentId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        setStudents(students.filter(s => s._id !== studentId));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  // Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent)
      });

      const data = await response.json();
      
      if (data.success) {
        setStudents(students.map(s => s._id === editingStudent._id ? data.data : s));
        setEditingStudent(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student');
    }
  };

  // Toggle student selection
  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Select all students
  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s._id));
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download credentials as CSV
  const downloadCredentials = () => {
    const csvContent = `Name,RollNumber,Username,Password,Email\n` +
      generatedCredentials.map(c => 
        `${c.name},${c.rollNumber},${c.username},${c.password},${c.email}`
      ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_credentials.csv';
    a.click();
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)' }}>
      <Navigation userType="teacher" />
      <div style={{ padding: '1rem', paddingTop: '5rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                Student Management
              </h1>
              <p style={{ color: '#6b7280' }}>
                Add, import, and manage student credentials
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Plus size={18} />
                Add Student
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv,.txt"
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Upload size={18} />
                Import CSV
              </button>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
              <input
                type="text"
                placeholder="Search students by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            {selectedStudents.length > 0 && (
              <button
                onClick={handleGenerateCredentials}
                style={{
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Key size={18} />
                Generate Credentials ({selectedStudents.length})
              </button>
            )}
          </div>
        </div>

        {/* Students Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
              Loading students...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
              <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No students found. Add students manually or import from CSV.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>
                      <input
                        type="checkbox"
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onChange={toggleSelectAll}
                        style={{ cursor: 'pointer' }}
                      />
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Roll Number</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Class</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Phone</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>School</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem' }}>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => toggleStudentSelection(student._id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{student.name}</td>
                      <td style={{ padding: '1rem', color: '#6b7280' }}>{student.rollNumber}</td>
                      <td style={{ padding: '1rem', color: '#6b7280' }}>{student.class || '-'}</td>
                      <td style={{ padding: '1rem', color: '#6b7280' }}>{student.email}</td>
                      <td style={{ padding: '1rem', color: '#6b7280' }}>{student.phone}</td>
                      <td style={{ padding: '1rem', color: '#6b7280' }}>{student.school || '-'}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: student.credentialsGenerated ? '#d1fae5' : '#fef3c7',
                          color: student.credentialsGenerated ? '#065f46' : '#92400e'
                        }}>
                          {student.credentialsGenerated ? 'Credentials Generated' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => setEditingStudent(student)}
                            style={{
                              padding: '0.5rem',
                              backgroundColor: '#eff6ff',
                              border: 'none',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              color: '#3b82f6'
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student._id)}
                            style={{
                              padding: '0.5rem',
                              backgroundColor: '#fef2f2',
                              border: 'none',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              color: '#ef4444'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add New Student</h2>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleCreateStudent}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Name *</label>
                    <input
                      type="text"
                      required
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Roll Number *</label>
                    <input
                      type="text"
                      required
                      value={newStudent.rollNumber}
                      onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Class *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 10th Grade, Class A"
                      value={newStudent.studentClass}
                      onChange={(e) => setNewStudent({ ...newStudent, studentClass: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Phone *</label>
                    <input
                      type="tel"
                      required
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Address</label>
                    <input
                      type="text"
                      value={newStudent.address}
                      onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>School</label>
                    <input
                      type="text"
                      value={newStudent.school}
                      onChange={(e) => setNewStudent({ ...newStudent, school: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Joining Date</label>
                    <input
                      type="date"
                      value={newStudent.joiningDate}
                      onChange={(e) => setNewStudent({ ...newStudent, joiningDate: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Student Modal */}
        {editingStudent && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Edit Student</h2>
                <button onClick={() => setEditingStudent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleUpdateStudent}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Name *</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Roll Number</label>
                    <input
                      type="text"
                      value={editingStudent.rollNumber}
                      disabled
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f3f4f6' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={editingStudent.email}
                      onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Phone *</label>
                    <input
                      type="tel"
                      required
                      value={editingStudent.phone}
                      onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>Address</label>
                    <input
                      type="text"
                      value={editingStudent.address || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.875rem' }}>School</label>
                    <input
                      type="text"
                      value={editingStudent.school || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, school: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Import Preview Modal */}
        {showImportModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  <FileSpreadsheet style={{ display: 'inline', marginRight: '0.5rem' }} size={24} />
                  Import Preview ({importData.length} students)
                </h2>
                <button onClick={() => { setShowImportModal(false); setImportData([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Roll Number</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Class</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Phone</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>School</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importData.map((student, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem' }}>{student.name}</td>
                        <td style={{ padding: '0.75rem' }}>{student.rollNumber}</td>
                        <td style={{ padding: '0.75rem' }}>{student.studentClass || '-'}</td>
                        <td style={{ padding: '0.75rem' }}>{student.email}</td>
                        <td style={{ padding: '0.75rem' }}>{student.phone}</td>
                        <td style={{ padding: '0.75rem' }}>{student.school || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => { setShowImportModal(false); setImportData([]); }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportStudents}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    backgroundColor: '#059669',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  <Check style={{ display: 'inline', marginRight: '0.5rem' }} size={18} />
                  Import {importData.length} Students
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generated Credentials Modal */}
        {showCredentialsModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '700px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#059669' }}>
                  <CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} size={24} />
                  Credentials Generated!
                </h2>
                <button onClick={() => { setShowCredentialsModal(false); setGeneratedCredentials([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
                Save these credentials securely. Passwords will be hidden after the student's first login.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0fdf4' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Username</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Password</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedCredentials.map((cred) => (
                      <tr key={cred._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem' }}>{cred.name}</td>
                        <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>{cred.username}</td>
                        <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>
                          {showPasswords[cred._id] ? cred.password : '••••••••'}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => setShowPasswords(prev => ({ ...prev, [cred._id]: !prev[cred._id] }))}
                              style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                              title={showPasswords[cred._id] ? 'Hide password' : 'Show password'}
                            >
                              {showPasswords[cred._id] ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                              onClick={() => copyToClipboard(`Username: ${cred.username}\nPassword: ${cred.password}`, cred._id)}
                              style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: copiedId === cred._id ? '#059669' : '#6b7280' }}
                              title="Copy credentials"
                            >
                              {copiedId === cred._id ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={downloadCredentials}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #059669',
                    borderRadius: '0.5rem',
                    backgroundColor: 'white',
                    color: '#059669',
                    cursor: 'pointer',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Download size={18} />
                  Download CSV
                </button>
                <button
                  onClick={() => { setShowCredentialsModal(false); setGeneratedCredentials([]); }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    backgroundColor: '#059669',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
