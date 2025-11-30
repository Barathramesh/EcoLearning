import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Clock,
  Star,
  Award,
  BookOpen,
  Smartphone,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  AlertTriangle,
  CheckCircle,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

const TeacherAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalStudents: 92,
      activeStudents: 78,
      avgEngagement: 84,
      completionRate: 76,
      trends: {
        students: 5,
        engagement: -2,
        completion: 8
      }
    },
    engagement: {
      weeklyActivity: [65, 72, 58, 89, 76, 84, 91],
      dailyLogins: [28, 34, 29, 31, 35, 42, 38],
      sessionDuration: [12, 15, 11, 18, 14, 16, 19], // minutes
      forumParticipation: 45
    },
    performance: {
      avgScores: [78, 82, 76, 88, 85, 91, 87],
      assignmentCompletion: [85, 78, 92, 76, 89, 84, 91],
      improvementAreas: [
        { area: 'Assignment Quality', percentage: 82, trend: 'up' },
        { area: 'Participation', percentage: 74, trend: 'down' },
        { area: 'Time Management', percentage: 79, trend: 'stable' },
        { area: 'Quiz Performance', percentage: 85, trend: 'up' }
      ]
    },
    classComparison: [
      { class: 'Environmental Science 101', students: 28, avgScore: 88, engagement: 92, completion: 85 },
      { class: 'Climate Change Studies', students: 24, avgScore: 85, engagement: 78, completion: 91 },
      { class: 'Ecology & Biodiversity', students: 22, avgScore: 82, engagement: 85, completion: 76 },
      { class: 'Sustainable Living', students: 18, avgScore: 91, engagement: 88, completion: 94 }
    ],
    topPerformers: [
      { name: 'Emma Wilson', class: 'Environmental Science 101', score: 95, improvement: 12 },
      { name: 'Alex Johnson', class: 'Environmental Science 101', score: 92, improvement: 8 },
      { name: 'David Kim', class: 'Climate Change Studies', score: 88, improvement: 15 },
      { name: 'Sofia Martinez', class: 'Ecology & Biodiversity', score: 86, improvement: 22 },
      { name: 'Ryan Chen', class: 'Sustainable Living', score: 90, improvement: 18 }
    ],
    needsAttention: [
      { name: 'Student A', class: 'Environmental Science 101', issue: 'Low assignment completion', severity: 'high' },
      { name: 'Student B', class: 'Climate Change Studies', issue: 'Low quiz scores', severity: 'medium' },
      { name: 'Student C', class: 'Ecology & Biodiversity', issue: 'Missing submissions', severity: 'high' },
      { name: 'Student D', class: 'Sustainable Living', issue: 'Declining performance', severity: 'medium' }
    ]
  };

  const timeframes = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const classes = [
    'Environmental Science 101',
    'Climate Change Studies',
    'Ecology & Biodiversity',
    'Sustainable Living'
  ];

  const metrics = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'engagement', label: 'Engagement', icon: <Activity size={16} /> },
    { id: 'performance', label: 'Performance', icon: <Target size={16} /> },
    { id: 'classes', label: 'Class Comparison', icon: <Users size={16} /> }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return <ArrowUp size={16} style={{ color: '#10b981' }} />;
    if (trend < 0) return <ArrowDown size={16} style={{ color: '#ef4444' }} />;
    return <Minus size={16} style={{ color: '#6b7280' }} />;
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return '#10b981';
    if (trend < 0) return '#ef4444';
    return '#6b7280';
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return { bg: '#fee2e2', text: '#991b1b' };
      case 'medium': return { bg: '#fef3c7', text: '#92400e' };
      case 'low': return { bg: '#dcfce7', text: '#166534' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const renderChart = (data, color = '#059669') => (
    <div style={{ display: 'flex', alignItems: 'end', gap: '0.25rem', height: '60px' }}>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: `${(value / Math.max(...data)) * 100}%`,
            backgroundColor: color,
            borderRadius: '2px',
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)' }}>
      <Navigation userType="teacher" />
      <div style={{ padding: '1rem', paddingTop: '5rem', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                Analytics Dashboard
              </h1>
              <p style={{ color: '#6b7280' }}>
                Comprehensive insights into student engagement, performance, and learning outcomes
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
                <RefreshCw size={16} />
                Refresh
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
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {timeframes.map(timeframe => (
                <button
                  key={timeframe.id}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    backgroundColor: selectedTimeframe === timeframe.id ? '#059669' : '#f3f4f6',
                    color: selectedTimeframe === timeframe.id ? 'white' : '#374151',
                    fontSize: '0.875rem'
                  }}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white',
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {metrics.map(metric => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    backgroundColor: selectedMetric === metric.id ? '#3b82f6' : '#f3f4f6',
                    color: selectedMetric === metric.id ? 'white' : '#374151',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {metric.icon}
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Metrics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Students</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {analyticsData.overview.totalStudents}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {getTrendIcon(analyticsData.overview.trends.students)}
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: getTrendColor(analyticsData.overview.trends.students),
                  fontWeight: '500'
                }}>
                  {Math.abs(analyticsData.overview.trends.students)}%
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} style={{ color: '#059669' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {analyticsData.overview.activeStudents} active this week
              </span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Avg Engagement</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {analyticsData.overview.avgEngagement}%
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {getTrendIcon(analyticsData.overview.trends.engagement)}
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: getTrendColor(analyticsData.overview.trends.engagement),
                  fontWeight: '500'
                }}>
                  {Math.abs(analyticsData.overview.trends.engagement)}%
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={16} style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Based on activity patterns
              </span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Completion Rate</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {analyticsData.overview.completionRate}%
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {getTrendIcon(analyticsData.overview.trends.completion)}
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: getTrendColor(analyticsData.overview.trends.completion),
                  fontWeight: '500'
                }}>
                  {Math.abs(analyticsData.overview.trends.completion)}%
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={16} style={{ color: '#7c3aed' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Assignments & AR experiences
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Based on Selected Metric */}
        {selectedMetric === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            {/* Weekly Activity Chart */}
            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Weekly Activity Trends
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#059669', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Engagement</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Performance</span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '200px', marginBottom: '1rem' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'end', gap: '0.25rem' }}>
                      <div
                        style={{
                          width: '20px',
                          height: `${analyticsData.engagement.weeklyActivity[index] * 2}px`,
                          backgroundColor: '#059669',
                          borderRadius: '2px 2px 0 0'
                        }}
                      />
                      <div
                        style={{
                          width: '20px',
                          height: `${analyticsData.performance.avgScores[index] * 2}px`,
                          backgroundColor: '#3b82f6',
                          borderRadius: '2px 2px 0 0'
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers & Alerts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Top Performers */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={20} style={{ color: '#f59e0b' }} />
                  Top Performers
                </h3>
                <div style={{ space: '0.75rem' }}>
                  {analyticsData.topPerformers.slice(0, 5).map((student, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                          {student.name}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {student.class}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#059669' }}>
                          {student.score}%
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#10b981' }}>
                          +{student.improvement}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Students Needing Attention */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
                  Needs Attention
                </h3>
                <div style={{ space: '0.75rem' }}>
                  {analyticsData.needsAttention.map((student, index) => (
                    <div key={index} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                          {student.name}
                        </p>
                        <span style={{
                          padding: '0.125rem 0.375rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.625rem',
                          fontWeight: '500',
                          backgroundColor: getSeverityColor(student.severity).bg,
                          color: getSeverityColor(student.severity).text
                        }}>
                          {student.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {student.issue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'classes' && (
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
              Class Performance Comparison
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                      Class Name
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                      Students
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                      Avg Score
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                      Engagement
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                      Completion
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.classComparison.map((classData, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem 0.75rem' }}>
                        <div>
                          <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                            {classData.class}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                          {classData.students}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '500',
                          color: classData.avgScore >= 85 ? '#10b981' : classData.avgScore >= 75 ? '#f59e0b' : '#ef4444'
                        }}>
                          {classData.avgScore}%
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <div style={{ 
                            width: '60px', 
                            height: '6px', 
                            backgroundColor: '#e5e7eb', 
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div
                              style={{
                                width: `${classData.engagement}%`,
                                height: '100%',
                                backgroundColor: '#3b82f6'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {classData.engagement}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <div style={{ 
                            width: '60px', 
                            height: '6px', 
                            backgroundColor: '#e5e7eb', 
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div
                              style={{
                                width: `${classData.completion}%`,
                                height: '100%',
                                backgroundColor: '#10b981'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {classData.completion}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
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
                            gap: '0.25rem',
                            margin: '0 auto'
                          }}
                        >
                          <Eye size={12} />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(selectedMetric === 'engagement' || selectedMetric === 'performance') && (
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Analytics
            </h3>
            <p style={{ color: '#6b7280' }}>
              Detailed {selectedMetric} charts and insights coming soon with advanced visualization features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAnalytics;