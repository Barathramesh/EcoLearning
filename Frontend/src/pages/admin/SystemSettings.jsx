import React, { useState } from 'react';
import { 
  Settings,
  Database,
  Shield,
  Bell,
  Mail,
  Globe,
  Server,
  Key,
  Users,
  Activity,
  Lock,
  Unlock,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Monitor,
  Smartphone,
  Cloud,
  HardDrive,
  Network,
  Cpu,
  MemoryStick,
  Zap,
  Eye,
  EyeOff,
  Download,
  Upload,
  Clock,
  Calendar,
  BarChart3
} from 'lucide-react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'backups', label: 'Backups', icon: HardDrive }
  ];

  const systemStatus = {
    status: 'healthy',
    uptime: '45 days, 12 hours',
    version: '2.1.4',
    lastUpdate: '2025-09-15',
    totalUsers: 12847,
    activeInstitutions: 89,
    systemLoad: 67,
    memoryUsage: 42,
    diskSpace: 78,
    responseTime: '234ms'
  };

  const notifications = [
    { type: 'info', message: 'System maintenance scheduled for Sunday 3:00 AM UTC', timestamp: '2 hours ago' },
    { type: 'warning', message: 'High memory usage detected on server cluster', timestamp: '6 hours ago' },
    { type: 'success', message: 'Database backup completed successfully', timestamp: '1 day ago' },
    { type: 'error', message: 'Failed login attempt detected from suspicious IP', timestamp: '2 days ago' }
  ];

  const renderGeneralSettings = () => (
    <div style={{ space: '2rem' }}>
      {/* System Overview */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Monitor size={20} />
          System Overview
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: systemStatus.status === 'healthy' ? '#10b981' : '#ef4444' }}>
              {systemStatus.status === 'healthy' ? '✅' : '❌'}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>System Status</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '500' }}>{systemStatus.status}</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {systemStatus.uptime}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Uptime</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
              v{systemStatus.version}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Version</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {systemStatus.totalUsers.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Users</div>
          </div>
        </div>

        {/* System Resources */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>System Resources</h4>
          <div style={{ space: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>CPU Load</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{systemStatus.systemLoad}%</span>
              </div>
              <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${systemStatus.systemLoad}%`, 
                  height: '100%', 
                  backgroundColor: systemStatus.systemLoad > 80 ? '#ef4444' : systemStatus.systemLoad > 60 ? '#f59e0b' : '#10b981',
                  borderRadius: '0.25rem'
                }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Memory Usage</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{systemStatus.memoryUsage}%</span>
              </div>
              <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${systemStatus.memoryUsage}%`, 
                  height: '100%', 
                  backgroundColor: systemStatus.memoryUsage > 80 ? '#ef4444' : systemStatus.memoryUsage > 60 ? '#f59e0b' : '#10b981',
                  borderRadius: '0.25rem'
                }} />
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Disk Space</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{systemStatus.diskSpace}%</span>
              </div>
              <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${systemStatus.diskSpace}%`, 
                  height: '100%', 
                  backgroundColor: systemStatus.diskSpace > 80 ? '#ef4444' : systemStatus.diskSpace > 60 ? '#f59e0b' : '#10b981',
                  borderRadius: '0.25rem'
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Recent System Notifications</h4>
          <div style={{ space: '0.75rem' }}>
            {notifications.slice(0, 3).map((notification, index) => {
              const getNotificationColor = (type) => {
                switch(type) {
                  case 'error': return { bg: '#fee2e2', text: '#991b1b', icon: AlertTriangle };
                  case 'warning': return { bg: '#fef3c7', text: '#92400e', icon: AlertTriangle };
                  case 'success': return { bg: '#dcfce7', text: '#166534', icon: CheckCircle };
                  case 'info': return { bg: '#dbeafe', text: '#1e40af', icon: Info };
                  default: return { bg: '#f3f4f6', text: '#374151', icon: Info };
                }
              };
              
              const notificationColor = getNotificationColor(notification.type);
              const Icon = notificationColor.icon;
              
              return (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: notificationColor.bg,
                  borderRadius: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <Icon size={16} style={{ color: notificationColor.text, marginTop: '0.125rem' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', color: notificationColor.text, marginBottom: '0.25rem' }}>
                      {notification.message}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {notification.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Platform Configuration */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Platform Configuration
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Platform Name
            </label>
            <input
              type="text"
              defaultValue="EcoLearn"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Support Email
            </label>
            <input
              type="email"
              defaultValue="support@ecolearn.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Default Language
            </label>
            <select
              defaultValue="en"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                backgroundColor: 'white'
              }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Time Zone
            </label>
            <select
              defaultValue="UTC"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                backgroundColor: 'white'
              }}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="CET">Central European Time</option>
            </select>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <button
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div style={{ space: '1.5rem' }}>
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Database Status
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              Online
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
              12ms
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Query Time</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              2.4TB
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Size</div>
          </div>
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
            Refresh Status
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
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Database Configuration
        </h3>
        
        <div style={{ space: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Connection Pool Size
            </label>
            <input
              type="number"
              defaultValue="50"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Query Timeout (seconds)
            </label>
            <input
              type="number"
              defaultValue="30"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="checkbox" defaultChecked />
            <label style={{ fontSize: '0.875rem', color: '#374151' }}>
              Enable query logging
            </label>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" defaultChecked />
            <label style={{ fontSize: '0.875rem', color: '#374151' }}>
              Enable automatic backups
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ space: '1.5rem' }}>
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Authentication & Security
        </h3>
        
        <div style={{ space: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              defaultValue="60"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
              Password Policy
            </label>
            <div style={{ space: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="checkbox" defaultChecked />
                <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Minimum 8 characters
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="checkbox" defaultChecked />
                <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Require uppercase letters
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="checkbox" defaultChecked />
                <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Require numbers
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" />
                <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Require special characters
                </label>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                Enable two-factor authentication
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                Log failed login attempts
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                Block suspicious IP addresses
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          API Security
        </h3>
        
        <div>
          <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
            API Key
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type={showApiKey ? "text" : "password"}
              defaultValue="sk-1234567890abcdef..."
              readOnly
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                backgroundColor: '#f9fafb'
              }}
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button
              style={{
                padding: '0.75rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={16} />
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" defaultChecked />
            <label style={{ fontSize: '0.875rem', color: '#374151' }}>
              Enable API rate limiting
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Notification Preferences
      </h3>
      
      <div style={{ space: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Email Notifications</h4>
          <div style={{ space: '0.75rem' }}>
            {[
              'System maintenance alerts',
              'Security incidents',
              'Performance warnings',
              'User registration notifications',
              'Daily usage reports',
              'Weekly analytics summaries'
            ].map((notification, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input type="checkbox" defaultChecked={index < 3} />
                <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                  {notification}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Push Notifications</h4>
          <div style={{ space: '0.75rem' }}>
            {[
              'Critical system alerts',
              'Failed backup notifications',
              'High resource usage warnings'
            ].map((notification, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input type="checkbox" defaultChecked />
                <label style={{ fontSize: '0.875rem', color: '#374151' }}>
                  {notification}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
            Alert Recipients
          </label>
          <textarea
            defaultValue="admin@ecolearn.com&#10;support@ecolearn.com&#10;devops@ecolearn.com"
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontFamily: 'inherit'
            }}
            placeholder="Enter email addresses, one per line"
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'general': return renderGeneralSettings();
      case 'database': return renderDatabaseSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'integrations': return (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Third-party Integrations</h3>
          <p style={{ color: '#6b7280' }}>Configure external service integrations and APIs.</p>
        </div>
      );
      case 'performance': return (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Performance Settings</h3>
          <p style={{ color: '#6b7280' }}>Optimize system performance and resource allocation.</p>
        </div>
      );
      case 'backups': return (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Backup Configuration</h3>
          <p style={{ color: '#6b7280' }}>Configure automated backups and disaster recovery.</p>
        </div>
      );
      default: return renderGeneralSettings();
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
                System Settings
              </h1>
              <p style={{ color: '#6b7280' }}>
                Configure platform settings, security, and system preferences
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
                Export Config
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
                <Save size={16} />
                Save All Changes
              </button>
            </div>
          </div>

          {/* Settings Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1rem' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: activeTab === tab.id ? '#059669' : '#f3f4f6',
                    color: activeTab === tab.id ? 'white' : '#374151',
                    fontWeight: activeTab === tab.id ? '500' : 'normal',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
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

export default SystemSettings;