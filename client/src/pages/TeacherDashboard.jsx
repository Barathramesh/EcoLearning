import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trophy,
  GraduationCap,
  BookOpen,
  Star,
  Plus,
  TrendingUp,
  Calendar,
  BarChart
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TeacherDashboard = () => {
  // Get logged-in user from localStorage
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get teacher ID from localStorage
  const getTeacherId = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return storedUser.teacherId || storedUser.id;
  };

  // Fetch students from database
  const fetchStudents = async () => {
    try {
      const teacherId = getTeacherId();
      if (!teacherId) {
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchStudents();
  }, []);

  // Teacher data with user info from localStorage
  const teacherData = {
    name: user?.Name || user?.name || "Teacher",
    institution: "Green Valley High School",
    studentsCount: students.length,
    classesCount: 5,
    institutionRank: 2
  };

  // Map students from database to display format
  const myStudents = students.slice(0, 5).map(student => ({
    name: student.name,
    rollNumber: student.rollNumber,
    email: student.email,
    school: student.school || 'N/A',
    class: student.class || 'N/A',
    points: student.points || 0,
    level: student.level || 1,
    progress: student.progress || 0,
    status: student.credentialsGenerated ? 'active' : 'pending'
  }));

  const institutionLeaderboard = [
    { rank: 1, school: "Eco Academy", avgPoints: 3245, students: 150 },
    { rank: 2, school: "Green Valley High School", avgPoints: 2956, students: 200, isCurrentSchool: true },
    { rank: 3, school: "Nature's Way School", avgPoints: 2847, students: 175 },
    { rank: 4, school: "Earth Science Institute", avgPoints: 2634, students: 190 },
    { rank: 5, school: "Sustainable Learning Center", avgPoints: 2489, students: 140 }
  ];

  const topGlobalStudents = [
    { rank: 1, name: "Maya Patel", school: "Eco Academy", points: 4567 },
    { rank: 2, name: "James Liu", school: "Nature's Way School", points: 4234 },
    { rank: 3, name: "Zara Ahmed", school: "Earth Science Institute", points: 3987 },
    { rank: 4, name: "Carlos Rodriguez", school: "Sustainable Learning", points: 3845 },
    { rank: 5, name: "Alex Johnson", school: "Green Valley High", points: 3678, isMyStudent: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {teacherData.name}</h1>
                <p className="text-gray-600">{teacherData.institution}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Teacher Dashboard
              </Badge>
              <Badge variant="outline">
                {teacherData.studentsCount} Students
              </Badge>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Students</p>
                    <p className="text-3xl font-bold">{teacherData.studentsCount}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100">Active Classes</p>
                    <p className="text-3xl font-bold">{teacherData.classesCount}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-cyan-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Institution Rank</p>
                    <p className="text-3xl font-bold text-gray-800">#{teacherData.institutionRank}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Students */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    My Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading students...</div>
                  ) : myStudents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No students found.</p>
                      <p className="text-sm mt-2">Add students from the Student Management page.</p>
                    </div>
                  ) : (
                  <div className="space-y-3">
                    {myStudents.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{student.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {student.rollNumber}
                              </Badge>
                              <Badge
                                variant={student.status === 'pending' ? 'destructive' : 'outline'}
                                className="text-xs"
                              >
                                {student.status === 'pending' ? 'Pending' : 'Active'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{student.school}</p>
                          <p className="text-sm text-gray-500">{student.class}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                  <Button variant="outline" className="w-full mt-4">
                    View All Students
                  </Button>
                </CardContent>
              </Card>

              {/* Institution Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Institution Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {institutionLeaderboard.map((school) => (
                      <div
                        key={school.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${school.isCurrentSchool ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${school.rank === 1 ? 'bg-yellow-500' :
                              school.rank === 2 ? 'bg-gray-400' :
                                school.rank === 3 ? 'bg-orange-500' :
                                  'bg-gray-300'
                            }`}>
                            {school.rank}
                          </div>
                          <div>
                            <p className={`font-semibold ${school.isCurrentSchool ? 'text-blue-700' : 'text-gray-800'}`}>
                              {school.school} {school.isCurrentSchool && '(Your School)'}
                            </p>
                            <p className="text-sm text-gray-500">{school.students} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{school.avgPoints.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">avg points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Global Student Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Top Global Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topGlobalStudents.map((student) => (
                      <div
                        key={student.rank}
                        className={`flex items-center justify-between p-2 rounded-lg ${student.isMyStudent ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${student.rank === 1 ? 'bg-yellow-500' :
                              student.rank === 2 ? 'bg-gray-400' :
                                student.rank === 3 ? 'bg-orange-500' :
                                  'bg-gray-300'
                            }`}>
                            {student.rank}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${student.isMyStudent ? 'text-green-700' : 'text-gray-800'}`}>
                              {student.name} {student.isMyStudent && '⭐'}
                            </p>
                            <p className="text-xs text-gray-500">{student.school}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-800">{student.points.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Class
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;