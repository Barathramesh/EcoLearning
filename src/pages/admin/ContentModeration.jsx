import React, { useState } from 'react';
import { 
  Shield,
  AlertTriangle,
  Flag,
  Eye,
  EyeOff,
  MessageSquare,
  Image,
  Video,
  FileText,
  Users,
  Filter,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  Ban,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User,
  School,
  Activity,
  Trash2,
  RotateCcw
} from 'lucide-react';

const ContentModeration = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);

  const categories = [
    { id: 'all', label: 'All Content', count: 156 },
    { id: 'assignments', label: 'Assignments', count: 45 },
    { id: 'discussions', label: 'Discussions', count: 78 },
    { id: 'uploads', label: 'File Uploads', count: 23 },
    { id: 'comments', label: 'Comments', count: 10 }
  ];

  const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'pending', label: 'Pending Review' },
    { id: 'approved', label: 'Approved' },
    { id: 'flagged', label: 'Flagged' },
    { id: 'rejected', label: 'Rejected' }
  ];

  // Mock content data for moderation
  const contentItems = [
    {
      id: 1,
      type: 'assignment',
      title: 'Climate Change Impact Research',
      author: 'Emma Wilson',
      authorType: 'student',
      institution: 'Green Valley High School',
      submittedAt: '2025-09-21T14:30:00',
      status: 'pending',
      priority: 'medium',
      description: 'A comprehensive research project on the impacts of climate change on local ecosystems.',
      flaggedBy: null,
      flagReason: null,
      fileCount: 3,
      hasImages: true,
      hasVideo: false,
      reportCount: 0,
      viewCount: 12,
      category: 'assignments'
    },
    {
      id: 2,
      type: 'discussion',
      title: 'Inappropriate language in discussion forum',
      author: 'Anonymous User',
      authorType: 'student',
      institution: 'EcoTech Institute',
      submittedAt: '2025-09-21T12:15:00',
      status: 'flagged',
      priority: 'high',
      description: 'User posted inappropriate language in the environmental discussion forum.',
      flaggedBy: 'Michael Chen',
      flagReason: 'Inappropriate language',
      fileCount: 0,
      hasImages: false,
      hasVideo: false,
      reportCount: 3,
      viewCount: 45,
      category: 'discussions'
    },
    {
      id: 3,
      type: 'upload',
      title: 'Ocean Pollution Images',
      author: 'Sarah Miller',
      authorType: 'teacher',
      institution: 'Green Valley High School',
      submittedAt: '2025-09-21T10:45:00',
      status: 'approved',
      priority: 'low',
      description: 'Educational images showing the effects of ocean pollution for classroom use.',
      flaggedBy: null,
      flagReason: null,
      fileCount: 8,
      hasImages: true,
      hasVideo: false,
      reportCount: 0,
      viewCount: 89,
      category: 'uploads'
    },
    {
      id: 4,
      type: 'comment',
      title: 'Spam comments on sustainability article',
      author: 'David Kim',
      authorType: 'student',
      institution: 'Nature Academy',
      submittedAt: '2025-09-21T09:20:00',
      status: 'rejected',
      priority: 'medium',
      description: 'Multiple spam comments promoting unrelated commercial products.',
      flaggedBy: 'Admin System',
      flagReason: 'Spam content',
      fileCount: 0,
      hasImages: false,
      hasVideo: false,
      reportCount: 5,
      viewCount: 23,
      category: 'comments'
    },
    {
      id: 5,
      type: 'assignment',
      title: 'Renewable Energy Solutions Project',
      author: 'Alex Johnson',
      authorType: 'student',
      institution: 'Sustainability College',
      submittedAt: '2025-09-21T08:15:00',
      status: 'pending',
      priority: 'medium',
      description: 'Student project exploring innovative renewable energy solutions for urban areas.',
      flaggedBy: null,
      flagReason: null,
      fileCount: 5,
      hasImages: true,
      hasVideo: true,
      reportCount: 0,
      viewCount: 8,
      category: 'assignments'
    },
    {
      id: 6,
      type: 'discussion',
      title: 'Misinformation about climate data',
      author: 'John Doe',
      authorType: 'student',
      institution: 'EcoTech Institute',
      submittedAt: '2025-09-20T16:30:00',
      status: 'flagged',
      priority: 'high',
      description: 'User sharing false information about climate change statistics.',
      flaggedBy: 'Prof. Michael Chen',
      flagReason: 'Misinformation',
      fileCount: 2,
      hasImages: true,
      hasVideo: false,
      reportCount: 7,
      viewCount: 156,
      category: 'discussions'
    }
  ];

  const moderationStats = [
    {
      title: 'Pending Review',
      value: '23',
      change: '+5',
      icon: Clock,
      color: '#f59e0b',
      description: 'Items awaiting moderation'
    },
    {
      title: 'Flagged Content',
      value: '8',
      change: '+2',
      icon: Flag,
      color: '#ef4444',
      description: 'Content flagged by users'
    },
    {
      title: 'Auto-Detected',
      value: '12',
      change: '+3',
      icon: Shield,
      color: '#8b5cf6',
      description: 'Issues detected by AI'
    },
    {
      title: 'Resolved Today',
      value: '34',
      change: '+12',
      icon: CheckCircle,
      color: '#10b981',
      description: 'Items moderated today'
    }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return { bg: '#fef3c7', text: '#92400e', icon: Clock };
      case 'approved': return { bg: '#dcfce7', text: '#166534', icon: CheckCircle };
      case 'flagged': return { bg: '#fee2e2', text: '#991b1b', icon: Flag };
      case 'rejected': return { bg: '#fecaca', text: '#991b1b', icon: XCircle };
      default: return { bg: '#f3f4f6', text: '#374151', icon: Clock };
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return { bg: '#fee2e2', text: '#991b1b' };
      case 'medium': return { bg: '#fef3c7', text: '#92400e' };
      case 'low': return { bg: '#dcfce7', text: '#166534' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const getContentTypeIcon = (type) => {
    switch(type) {
      case 'assignment': return <FileText size={16} style={{ color: '#3b82f6' }} />;
      case 'discussion': return <MessageSquare size={16} style={{ color: '#10b981' }} />;
      case 'upload': return <Image size={16} style={{ color: '#f59e0b' }} />;
      case 'comment': return <MessageSquare size={16} style={{ color: '#8b5cf6' }} />;
      default: return <FileText size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleAction = (action, contentId) => {
    console.log(`Action: ${action} on content ${contentId}`);
    // Here you would implement the actual moderation actions
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)', padding: '1rem' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                Content Moderation
              </h1>
              <p style={{ color: '#6b7280' }}>
                Review and moderate user-generated content across the platform
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
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertTriangle size={16} />
                Bulk Action
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {moderationStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #f3f4f6'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: `${stat.color}20`,
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500',
                      color: '#10b981',
                      backgroundColor: '#dcfce7',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>
                      {stat.change}
                    </span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {stat.title}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: selectedCategory === category.id ? '#059669' : '#f3f4f6',
                    color: selectedCategory === category.id ? 'white' : '#374151',
                    fontWeight: selectedCategory === category.id ? '500' : 'normal'
                  }}
                >
                  {category.label}
                  <span style={{
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                    backgroundColor: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                    color: selectedCategory === category.id ? 'white' : '#6b7280'
                  }}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Status Filter */}
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
                placeholder="Search content..."
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content List */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Content
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Author
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Status
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Priority
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Submitted
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Reports
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContent.map((item) => {
                  const statusColor = getStatusColor(item.status);
                  const priorityColor = getPriorityColor(item.priority);
                  const StatusIcon = statusColor.icon;
                  
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          {getContentTypeIcon(item.type)}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                              {item.description.substring(0, 80)}...
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              {item.hasImages && (
                                <span style={{ 
                                  fontSize: '0.75rem',
                                  padding: '0.125rem 0.375rem',
                                  backgroundColor: '#dbeafe',
                                  color: '#1e40af',
                                  borderRadius: '0.25rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem'
                                }}>
                                  <Image size={12} />
                                  Images
                                </span>
                              )}
                              {item.hasVideo && (
                                <span style={{ 
                                  fontSize: '0.75rem',
                                  padding: '0.125rem 0.375rem',
                                  backgroundColor: '#fef3c7',
                                  color: '#92400e',
                                  borderRadius: '0.25rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem'
                                }}>
                                  <Video size={12} />
                                  Video
                                </span>
                              )}
                              {item.fileCount > 0 && (
                                <span style={{ 
                                  fontSize: '0.75rem',
                                  padding: '0.125rem 0.375rem',
                                  backgroundColor: '#f3f4f6',
                                  color: '#6b7280',
                                  borderRadius: '0.25rem'
                                }}>
                                  {item.fileCount} files
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                            {item.author}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'capitalize' }}>
                            {item.authorType}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {item.institution}
                          </div>
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
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: priorityColor.bg,
                          color: priorityColor.text
                        }}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </span>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {formatDate(item.submittedAt)}
                        </span>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                          {item.reportCount > 0 && (
                            <Flag size={14} style={{ color: '#ef4444' }} />
                          )}
                          <span style={{ 
                            fontSize: '0.875rem', 
                            color: item.reportCount > 0 ? '#ef4444' : '#6b7280',
                            fontWeight: item.reportCount > 0 ? '500' : 'normal'
                          }}>
                            {item.reportCount}
                          </span>
                        </div>
                      </td>
                      
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => setSelectedContent(item)}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleAction('approve', item.id)}
                                style={{
                                  padding: '0.25rem',
                                  backgroundColor: '#dcfce7',
                                  color: '#166534',
                                  border: 'none',
                                  borderRadius: '0.25rem',
                                  cursor: 'pointer'
                                }}
                                title="Approve"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                onClick={() => handleAction('reject', item.id)}
                                style={{
                                  padding: '0.25rem',
                                  backgroundColor: '#fee2e2',
                                  color: '#991b1b',
                                  border: 'none',
                                  borderRadius: '0.25rem',
                                  cursor: 'pointer'
                                }}
                                title="Reject"
                              >
                                <XCircle size={14} />
                              </button>
                            </>
                          )}
                          <button
                            style={{
                              padding: '0.25rem',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                            title="More Options"
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

        {/* Pagination */}
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

      {/* Content Detail Modal */}
      {selectedContent && (
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
            maxWidth: '700px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Content Review
              </h2>
              <button
                onClick={() => setSelectedContent(null)}
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
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {selectedContent.title}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                {selectedContent.description}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                    Author
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    {selectedContent.author} ({selectedContent.authorType})
                  </p>
                </div>
                
                <div>
                  <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                    Institution
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    {selectedContent.institution}
                  </p>
                </div>
                
                <div>
                  <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                    Status
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    {selectedContent.status}
                  </p>
                </div>
                
                <div>
                  <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>
                    Reports
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    {selectedContent.reportCount} reports
                  </p>
                </div>
              </div>
              
              {selectedContent.flaggedBy && (
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: '#fee2e2', 
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#991b1b', marginBottom: '0.25rem' }}>
                    Flagged by: {selectedContent.flaggedBy}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#991b1b' }}>
                    Reason: {selectedContent.flagReason}
                  </p>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedContent(null)}
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
              {selectedContent.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleAction('approve', selectedContent.id);
                      setSelectedContent(null);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleAction('reject', selectedContent.id);
                      setSelectedContent(null);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;