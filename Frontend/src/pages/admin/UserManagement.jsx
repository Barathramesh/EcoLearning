import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Phone,
  Calendar,
  School,
  GraduationCap,
  UserCheck,
  UserX,
  MoreVertical,
  Download,
  Upload,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

const UserManagement = () => {
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Dr. Sarah Miller",
      email: "sarah.miller@greenvalleys.edu",
      type: "teacher",
      institution: "Green Valley High School",
      status: "active",
      lastLogin: "2025-09-21T08:30:00",
      joinDate: "2024-01-15",
      studentsCount: 120,
      classesCount: 5,
      phone: "+1-555-0123",
      department: "Environmental Science",
      verified: true,
      permissions: ["create_assignments", "manage_students", "view_analytics"]
    },
    {
      id: 2,
      name: "Alex Johnson",
      email: "alex.johnson@student.greenvalleys.edu",
      type: "student",
      institution: "Green Valley High School",
      status: "active",
      lastLogin: "2025-09-21T14:15:00",
      joinDate: "2024-08-25",
      level: 12,
      totalPoints: 2847,
      grade: "11th Grade",
      phone: "+1-555-0124",
      teacher: "Dr. Sarah Miller",
      verified: true,
      permissions: ["access_ar", "submit_assignments", "view_progress"]
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@student.greenvalleys.edu",
      type: "student",
      institution: "Green Valley High School",
      status: "active",
      lastLogin: "2025-09-21T16:45:00",
      joinDate: "2024-08-25",
      level: 11,
      totalPoints: 2634,
      grade: "11th Grade",
      phone: "+1-555-0125",
      teacher: "Dr. Sarah Miller",
      verified: true,
      permissions: ["access_ar", "submit_assignments", "view_progress"]
    },
    {
      id: 4,
      name: "Prof. Michael Chen",
      email: "michael.chen@ecotech.edu",
      type: "teacher",
      institution: "EcoTech Institute",
      status: "active",
      lastLogin: "2025-09-20T10:20:00",
      joinDate: "2023-09-01",
      studentsCount: 85,
      classesCount: 3,
      phone: "+1-555-0126",
      department: "Climate Science",
      verified: true,
      permissions: ["create_assignments", "manage_students", "view_analytics", "admin_access"]
    },
    {
      id: 5,
      name: "David Kim",
      email: "david.kim@student.ecotech.edu",
      type: "student",
      institution: "EcoTech Institute",
      status: "suspended",
      lastLogin: "2025-09-15T12:00:00",
      joinDate: "2024-01-10",
      level: 8,
      totalPoints: 1234,
      grade: "10th Grade",
      phone: "+1-555-0127",
      teacher: "Prof. Michael Chen",
      verified: false,
      permissions: ["limited_access"]
    },
    {
      id: 6,
      name: "Admin John Roberts",
      email: "john.roberts@ecolearn.admin",
      type: "admin",
      institution: "EcoLearn Platform",
      status: "active",
      lastLogin: "2025-09-21T07:00:00",
      joinDate: "2023-01-01",
      phone: "+1-555-0128",
      department: "Platform Administration",
      verified: true,
      permissions: ["full_access", "user_management", "system_settings", "content_moderation"]
    }
  ];

  const institutions = [
    { id: 1, name: "Green Valley High School", userCount: 156, type: "High School" },
    { id: 2, name: "EcoTech Institute", userCount: 234, type: "University" },
    { id: 3, name: "Nature Academy", userCount: 89, type: "Middle School" },
    { id: 4, name: "Sustainability College", userCount: 312, type: "College" }
  ];

  const userTypes = [
    { id: 'all', label: 'All Users', count: users.length },
    { id: 'student', label: 'Students', count: users.filter(u => u.type === 'student').length },
    { id: 'teacher', label: 'Teachers', count: users.filter(u => u.type === 'teacher').length },
    { id: 'admin', label: 'Admins', count: users.filter(u => u.type === 'admin').length }
  ];

  const filteredUsers = users.filter(user => {
    const matchesType = selectedUserType === 'all' || user.type === selectedUserType;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.institution.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return { bg: '#dcfce7', text: '#166534', icon: CheckCircle };
      case 'suspended': return { bg: '#fee2e2', text: '#991b1b', icon: AlertTriangle };
      case 'pending': return { bg: '#fef3c7', text: '#92400e', icon: Clock };
      default: return { bg: '#f3f4f6', text: '#374151', icon: Activity };
    }
  };

  const getUserTypeIcon = (type) => {
    switch(type) {
      case 'student': return <GraduationCap size={16} style={{ color: '#3b82f6' }} />;
      case 'teacher': return <Users size={16} style={{ color: '#059669' }} />;
      case 'admin': return <Shield size={16} style={{ color: '#7c3aed' }} />;
      default: return <Users size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)', padding: '1rem' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                User Management
              </h1>
              <p style={{ color: '#6b7280' }}>
                Manage students, teachers, and administrators across all institutions
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
                Export Users
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Upload size={16} />
                Bulk Import
              </button>
              <button
                onClick={() => setShowCreateUser(true)}
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
                <UserPlus size={16} />
                Add User
              </button>
            </div>
          </div>

          {/* User Type Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {userTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedUserType(type.id)}
                style={{
                  padding: '0.75rem 1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: selectedUserType === type.id ? '#059669' : '#f3f4f6',
                  color: selectedUserType === type.id ? 'white' : '#374151',
                  fontWeight: selectedUserType === type.id ? '500' : 'normal'
                }}
              >
                {type.label}
                <span style={{
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                  backgroundColor: selectedUserType === type.id ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                  color: selectedUserType === type.id ? 'white' : '#6b7280'
                }}>
                  {type.count}
                </span>
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
                placeholder="Search users..."
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
              Filters
            </button>
          </div>

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
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{users.length}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Users</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏫</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{institutions.length}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Institutions</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                {users.filter(u => u.status === 'active').length}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Users</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
                {Math.round(users.filter(u => u.status === 'active').length / users.length * 100)}%
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Rate</div>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    User
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Type & Institution
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Status
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Last Login
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Join Date
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Details
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const statusColor = getStatusColor(user.status);
                  const StatusIcon = statusColor.icon;
                  
                  return (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            backgroundColor: user.type === 'admin' ? '#7c3aed' : user.type === 'teacher' ? '#059669' : '#3b82f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.875rem'
                          }}>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                              {user.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          {getUserTypeIcon(user.type)}
                          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', textTransform: 'capitalize' }}>
                            {user.type}
                          </span>
                          {user.verified && (
                            <ShieldCheck size={14} style={{ color: '#10b981' }} />
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {user.institution}
                        </div>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: statusColor.bg,
                          color: statusColor.text
                        }}>
                          <StatusIcon size={12} />
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                          {formatLastLogin(user.lastLogin)}
                        </span>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {formatJoinDate(user.joinDate)}
                        </span>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {user.type === 'teacher' && (
                            <>
                              {user.studentsCount} students
                              <br />
                              {user.classesCount} classes
                            </>
                          )}
                          {user.type === 'student' && (
                            <>
                              Level {user.level}
                              <br />
                              {user.totalPoints} points
                            </>
                          )}
                          {user.type === 'admin' && (
                            <>
                              {user.permissions.length} permissions
                              <br />
                              {user.department}
                            </>
                          )}
                        </div>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => setSelectedUser(user)}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (placeholder) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              Previous
            </button>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              1
            </button>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              2
            </button>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
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
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                User Details - {selectedUser.name}
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                  Email
                </label>
                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginBottom: '1rem' }}>
                  {selectedUser.email}
                </p>
              </div>
              
              <div>
                <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                  Phone
                </label>
                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginBottom: '1rem' }}>
                  {selectedUser.phone}
                </p>
              </div>
              
              <div>
                <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                  Institution
                </label>
                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginBottom: '1rem' }}>
                  {selectedUser.institution}
                </p>
              </div>
              
              <div>
                <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                  Status
                </label>
                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginBottom: '1rem' }}>
                  {selectedUser.status}
                </p>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
                Permissions
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedUser.permissions.map((permission, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                onClick={() => setSelectedUser(null)}
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
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUser && (
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
              Create New User
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Add a new user to the EcoLearn platform.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateUser(false)}
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
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;