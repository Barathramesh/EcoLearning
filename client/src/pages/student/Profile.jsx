import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Camera,
  Edit3,
  Save,
  X,
  Award,
  Calendar,
  Mail,
  Phone,
  MapPin,
  School,
  Trophy,
  Target,
  BookOpen,
  Zap,
  Leaf,
  Globe,
  Star,
  Badge as BadgeIcon,
  Upload
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import Navigation from '../../components/Navigation';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    school: "",
    class: "",
    rollNumber: "",
    joinDate: "",
    bio: "Passionate about environmental science and sustainability. Love learning about ecosystems and climate solutions!",
    avatar: "/placeholder.svg"
  });

  const [editData, setEditData] = useState({ ...profileData });

  // Load user data from localStorage (comes from backend on login)
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const formattedDate = user.joiningDate 
            ? new Date(user.joiningDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'N/A';
          
          setProfileData({
            name: user.name || 'Student',
            email: user.email || 'N/A',
            phone: user.phone || 'N/A',
            address: user.address || 'N/A',
            school: user.school || 'N/A',
            class: user.class || 'N/A',
            rollNumber: user.rollNumber || 'N/A',
            joinDate: formattedDate,
            bio: user.bio || "Passionate about environmental science and sustainability. Love learning about ecosystems and climate solutions!",
            avatar: user.avatar || "/placeholder.svg"
          });
          setEditData({
            name: user.name || 'Student',
            email: user.email || 'N/A',
            phone: user.phone || 'N/A',
            address: user.address || 'N/A',
            school: user.school || 'N/A',
            class: user.class || 'N/A',
            rollNumber: user.rollNumber || 'N/A',
            joinDate: formattedDate,
            bio: user.bio || "Passionate about environmental science and sustainability. Love learning about ecosystems and climate solutions!",
            avatar: user.avatar || "/placeholder.svg"
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const achievements = [
    {
      id: 1,
      title: "Eco Warrior",
      description: "Completed 50 environmental lessons",
      icon: Leaf,
      color: "bg-green-100 text-green-700",
      earned: true,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Asked 200 questions to AI tutor",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
      earned: true,
      date: "2 weeks ago"
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Perfect score on 10 quizzes",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-700",
      earned: false,
      progress: 7
    },
    {
      id: 4,
      title: "Learning Streak",
      description: "30 consecutive days of learning",
      icon: Zap,
      color: "bg-orange-100 text-orange-700",
      earned: false,
      progress: 12
    },
    {
      id: 5,
      title: "Sustainability Champion",
      description: "Complete all climate change modules",
      icon: Star,
      color: "bg-emerald-100 text-emerald-700",
      earned: false,
      progress: 4
    }
  ];

  const stats = [
    { label: "Lessons Completed", value: "87", icon: BookOpen, color: "text-blue-600" },
    { label: "Quiz Score Average", value: "94%", icon: Target, color: "text-green-600" },
    { label: "Learning Streak", value: "12 days", icon: Zap, color: "text-orange-600" },
    { label: "AI Questions Asked", value: "247", icon: BadgeIcon, color: "text-purple-600" }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed lesson",
      subject: "Ocean Acidification",
      time: "2 hours ago",
      icon: BookOpen
    },
    {
      id: 2,
      action: "Earned achievement",
      subject: "Eco Warrior Badge",
      time: "2 days ago",
      icon: Award
    },
    {
      id: 3,
      action: "Perfect quiz score",
      subject: "Climate Change Quiz",
      time: "3 days ago",
      icon: Trophy
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
        <Navigation userType="student" />
        <main className="pt-20 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation userType="student" />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                  <p className="text-gray-600">Manage your account and track your learning progress</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <Button 
                        size="icon" 
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700"
                        title="Upload profile picture"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{profileData.name}</h2>
                      <p className="text-gray-600">{profileData.class}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{profileData.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{profileData.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{profileData.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <School className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{profileData.school}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Class: {profileData.class}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <BadgeIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Roll No: {profileData.rollNumber}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Joined {profileData.joinDate}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{profileData.bio}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                          <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Activity & Achievements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
                          achievement.earned
                            ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 shadow-md'
                            : 'border-gray-200 bg-gray-50 opacity-75'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.color}`}>
                            <achievement.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                              {achievement.title}
                            </h3>
                            <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <Badge className="bg-emerald-100 text-emerald-700">
                                Earned {achievement.date}
                              </Badge>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Progress</span>
                                  <span>{achievement.progress}/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(achievement.progress / 10) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {achievement.earned && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Trophy className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <activity.icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {activity.action} <span className="text-emerald-600">{activity.subject}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;