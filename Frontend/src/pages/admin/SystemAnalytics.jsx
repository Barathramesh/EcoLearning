import React, { useState } from 'react';
import { 
  TrendingUp,
  Users,
  School,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Eye,
  UserCheck,
  Clock,
  Target,
  Award,
  BookOpen,
  Play,
  CheckCircle,
  AlertTriangle,
  TrendingDown
} from 'lucide-react';

const SystemAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const timeframes = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const metrics = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Analytics', icon: Users },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'institutions', label: 'Institutions', icon: School },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: TrendingUp }
  ];

  // Mock analytics data
  const overviewStats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: '#3b82f6',
      description: 'Active users across all institutions'
    },
    {
      title: 'Active Sessions',
      value: '3,241',
      change: '+8.2%',
      trend: 'up',
      icon: Activity,
      color: '#10b981',
      description: 'Current active learning sessions'
    },
    {
      title: 'Institutions',
      value: '89',
      change: '+5.1%',
      trend: 'up',
      icon: School,
      color: '#f59e0b',
      description: 'Educational institutions registered'
    },
    {
      title: 'Completion Rate',
      value: '87.3%',
      change: '+2.4%',
      trend: 'up',
      icon: Target,
      color: '#8b5cf6',
      description: 'Average assignment completion rate'
    }
  ];

  const engagementData = [
    { metric: 'Daily Active Users', value: '8,234', change: '+15.2%', trend: 'up' },
    { metric: 'Session Duration', value: '24.6 min', change: '+5.8%', trend: 'up' },
    { metric: 'Pages per Session', value: '12.4', change: '+3.2%', trend: 'up' },
    { metric: 'Return Rate', value: '73.8%', change: '-1.2%', trend: 'down' },
    { metric: 'AR Features Used', value: '6,521', change: '+22.1%', trend: 'up' },
    { metric: 'Assignments Started', value: '4,892', change: '+18.7%', trend: 'up' }
  ];

  const institutionStats = [
    { name: 'Green Valley High School', users: 156, engagement: 94.2, status: 'excellent' },
    { name: 'EcoTech Institute', users: 234, engagement: 91.8, status: 'excellent' },
    { name: 'Nature Academy', users: 89, engagement: 88.4, status: 'good' },
    { name: 'Sustainability College', users: 312, engagement: 85.7, status: 'good' },
    { name: 'Climate Science University', users: 178, engagement: 79.3, status: 'average' },
    { name: 'Earth Studies Institute', users: 67, engagement: 82.1, status: 'good' }
  ];

  const contentMetrics = [
    { category: 'AR Experiences', total: 45, active: 42, completion: 89.2 },
    { category: 'Interactive Modules', total: 128, active: 125, completion: 91.7 },
    { category: 'Assignments', total: 234, active: 228, completion: 87.3 },
    { category: 'Quizzes', total: 156, active: 152, completion: 94.1 },
    { category: 'Videos', total: 89, active: 87, completion: 76.8 },
    { category: 'Documents', total: 312, active: 298, completion: 68.4 }
  ];

  const performanceMetrics = [
    { metric: 'Page Load Time', value: '1.2s', target: '< 2s', status: 'good' },
    { metric: 'API Response Time', value: '234ms', target: '< 500ms', status: 'excellent' },
    { metric: 'Uptime', value: '99.97%', target: '> 99.9%', status: 'excellent' },
    { metric: 'Error Rate', value: '0.12%', target: '< 1%', status: 'excellent' },
    { metric: 'CDN Performance', value: '45ms', target: '< 100ms', status: 'excellent' },
    { metric: 'Database Queries', value: '12ms', target: '< 50ms', status: 'excellent' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return { bg: '#dcfce7', text: '#166534' };
      case 'good': return { bg: '#fef3c7', text: '#92400e' };
      case 'average': return { bg: '#fed7aa', text: '#9a3412' };
      case 'poor': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <ArrowUp size={16} style={{ color: '#10b981' }} /> : 
           trend === 'down' ? <ArrowDown size={16} style={{ color: '#ef4444' }} /> : 
           <ArrowUp size={16} style={{ color: '#6b7280' }} />;
  };

  const renderOverviewContent = () => (
    <div>
      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {overviewStats.map((stat, index) => {
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {getTrendIcon(stat.trend)}
                  <span style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500',
                    color: stat.trend === 'up' ? '#10b981' : '#ef4444'
                  }}>
                    {stat.change}
                  </span>
                </div>
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

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* User Growth Chart */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LineChart size={20} style={{ color: '#3b82f6' }} />
            User Growth Trend
          </h3>
          <div style={{ 
            height: '200px', 
            backgroundColor: '#f8fafc', 
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            📈 User growth chart visualization
          </div>
        </div>

        {/* Engagement Distribution */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieChart size={20} style={{ color: '#10b981' }} />
            User Type Distribution
          </h3>
          <div style={{ 
            height: '200px', 
            backgroundColor: '#f8fafc', 
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            🥧 Pie chart showing user distribution
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} style={{ color: '#8b5cf6' }} />
          Recent System Activity
        </h3>
        <div style={{ space: '1rem' }}>
          {[
            { time: '2 minutes ago', action: 'New user registration', details: 'Sarah Johnson joined Nature Academy' },
            { time: '5 minutes ago', action: 'AR session completed', details: 'Climate Change module completed by 15 students' },
            { time: '12 minutes ago', action: 'Assignment submitted', details: '89 assignments submitted in the last hour' },
            { time: '18 minutes ago', action: 'Institution added', details: 'Ocean Conservation Institute joined the platform' },
            { time: '25 minutes ago', action: 'System update', details: 'Platform performance improvements deployed' }
          ].map((activity, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: index < 4 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                  {activity.action}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {activity.details}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEngagementContent = () => (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {engagementData.map((item, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.metric}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {getTrendIcon(item.trend)}
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: item.trend === 'up' ? '#10b981' : '#ef4444'
                }}>
                  {item.change}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Chart */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Daily Engagement Trends
        </h3>
        <div style={{ 
          height: '300px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280'
        }}>
          📊 Engagement trends chart visualization
        </div>
      </div>
    </div>
  );

  const renderInstitutionsContent = () => (
    <div>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Institution Performance</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                  Institution
                </th>
                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                  Users
                </th>
                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                  Engagement Rate
                </th>
                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {institutionStats.map((institution, index) => {
                const statusColor = getStatusColor(institution.status);
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          backgroundColor: '#3b82f6',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          {institution.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                          {institution.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {institution.users}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {institution.engagement}%
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: statusColor.bg,
                        color: statusColor.text
                      }}>
                        {institution.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContentContent = () => (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem'
      }}>
        {contentMetrics.map((content, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
                {content.category}
              </h4>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {content.active} of {content.total} active
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completion Rate</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{content.completion}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '0.5rem', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '0.25rem',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${content.completion}%`, 
                  height: '100%', 
                  backgroundColor: content.completion > 90 ? '#10b981' : 
                                 content.completion > 80 ? '#f59e0b' : '#ef4444',
                  borderRadius: '0.25rem'
                }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '0.25rem'
              }}>
                {content.total} Total
              </span>
              <span style={{ 
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '0.25rem'
              }}>
                {content.active} Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformanceContent = () => (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem'
      }}>
        {performanceMetrics.map((metric, index) => {
          const statusColor = getStatusColor(metric.status);
          return (
            <div 
              key={index}
              style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {metric.metric}
                </h4>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Target: {metric.target}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {metric.value}
                </span>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: statusColor.bg,
                  color: statusColor.text
                }}>
                  {metric.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(selectedMetric) {
      case 'overview': return renderOverviewContent();
      case 'users': return renderOverviewContent(); // Could have dedicated user analytics
      case 'engagement': return renderEngagementContent();
      case 'institutions': return renderInstitutionsContent();
      case 'content': return renderContentContent();
      case 'performance': return renderPerformanceContent();
      default: return renderOverviewContent();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f9ff, #f0fdf4)', padding: '1rem' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                System Analytics
              </h1>
              <p style={{ color: '#6b7280' }}>
                Comprehensive insights into platform performance and user engagement
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
                <Filter size={16} />
                Filter
              </button>
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
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
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
                  fontWeight: selectedTimeframe === timeframe.id ? '500' : 'normal'
                }}
              >
                {timeframe.label}
              </button>
            ))}
          </div>

          {/* Metric Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {metrics.map(metric => {
              const Icon = metric.icon;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: selectedMetric === metric.id ? '#059669' : '#f3f4f6',
                    color: selectedMetric === metric.id ? 'white' : '#374151',
                    fontWeight: selectedMetric === metric.id ? '500' : 'normal',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={16} />
                  {metric.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SystemAnalytics;