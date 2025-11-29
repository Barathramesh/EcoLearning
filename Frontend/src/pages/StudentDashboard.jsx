import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Trophy, 
  Zap, 
  BookOpen, 
  Gamepad2, 
  Users, 
  Star,
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";

const StudentDashboard = () => {
  // Mock student data
  const studentData = {
    name: "Alex Johnson",
    institution: "Green Valley High School",
    totalPoints: 2847,
    todayPoints: 85,
    coursesCompleted: 8,
    gamesFinished: 15,
    institutionPosition: 3,
    globalPosition: 247,
    level: 12,
    nextLevelPoints: 153
  };

  const institutionLeaderboard = [
    { rank: 1, name: "Sarah Chen", points: 3245, avatar: "👩" },
    { rank: 2, name: "Mike Rodriguez", points: 2956, avatar: "👨" },
    { rank: 3, name: "Alex Johnson", points: 2847, avatar: "🧑", isCurrentUser: true },
    { rank: 4, name: "Emma Wilson", points: 2634, avatar: "👩" },
    { rank: 5, name: "David Kim", points: 2489, avatar: "👨" }
  ];

  const recentAchievements = [
    { title: "Tree Planter", description: "Completed Forest Conservation module", icon: "🌳", points: 50 },
    { title: "Ocean Guardian", description: "Finished Marine Biology course", icon: "🌊", points: 75 },
    { title: "Energy Saver", description: "Scored 100% in Renewable Energy quiz", icon: "⚡", points: 25 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {studentData.name}!</h1>
                <p className="text-gray-600">{studentData.institution}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                Level {studentData.level}
              </Badge>
              <Badge variant="outline">
                {studentData.nextLevelPoints} points to next level
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100">Total Points</p>
                    <p className="text-3xl font-bold">{studentData.totalPoints.toLocaleString()}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-emerald-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100">Today's Points</p>
                    <p className="text-3xl font-bold">+{studentData.todayPoints}</p>
                  </div>
                  <Zap className="w-8 h-8 text-cyan-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Courses Completed</p>
                    <p className="text-3xl font-bold text-gray-800">{studentData.coursesCompleted}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Games Finished</p>
                    <p className="text-3xl font-bold text-gray-800">{studentData.gamesFinished}</p>
                  </div>
                  <Gamepad2 className="w-8 h-8 text-cyan-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rankings */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Institution Ranking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-emerald-600">#{studentData.institutionPosition}</div>
                      <p className="text-gray-600">in {studentData.institution}</p>
                    </div>
                    <Progress value={75} className="mb-2" />
                    <p className="text-sm text-gray-500">Top 10% of your school</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Global Ranking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-cyan-600">#{studentData.globalPosition}</div>
                      <p className="text-gray-600">worldwide</p>
                    </div>
                    <Progress value={45} className="mb-2" />
                    <p className="text-sm text-gray-500">Top 25% globally</p>
                  </CardContent>
                </Card>
              </div>

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
                    {institutionLeaderboard.map((student) => (
                      <div 
                        key={student.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          student.isCurrentUser ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            student.rank === 1 ? 'bg-yellow-500' :
                            student.rank === 2 ? 'bg-gray-400' :
                            student.rank === 3 ? 'bg-orange-500' :
                            'bg-gray-300'
                          }`}>
                            {student.rank}
                          </div>
                          <div className="text-2xl">{student.avatar}</div>
                          <div>
                            <p className={`font-semibold ${student.isCurrentUser ? 'text-emerald-700' : 'text-gray-800'}`}>
                              {student.name} {student.isCurrentUser && '(You)'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{student.points.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <Badge variant="secondary" className="mt-1">
                            +{achievement.points} points
                          </Badge>
                        </div>
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
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Play Eco Games
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
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

export default StudentDashboard;