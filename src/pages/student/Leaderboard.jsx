import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star,
  TrendingUp,
  Users,
  Globe,
  School,
  Award,
  Target,
  Zap,
  Calendar
} from "lucide-react";

const Leaderboard = () => {
  const globalLeaderboard = [
    { rank: 1, name: "Emma Chen", institution: "Green Valley High", country: "USA", points: 4852, avatar: "👩", streak: 28, level: 18 },
    { rank: 2, name: "Kai Nakamura", institution: "Sakura Academy", country: "Japan", points: 4731, avatar: "👨", streak: 25, level: 17 },
    { rank: 3, name: "Alex Johnson", institution: "Green Valley High", country: "USA", points: 4567, avatar: "🧑", streak: 22, level: 16, isCurrentUser: true },
    { rank: 4, name: "Sofia Rodriguez", institution: "Barcelona Eco School", country: "Spain", points: 4445, avatar: "👩", streak: 30, level: 16 },
    { rank: 5, name: "Marcus Thompson", institution: "London Green Academy", country: "UK", points: 4298, avatar: "👨", streak: 18, level: 15 },
    { rank: 6, name: "Priya Patel", institution: "Mumbai Environmental Institute", country: "India", points: 4156, avatar: "👩", streak: 26, level: 15 },
    { rank: 7, name: "Lucas Silva", institution: "São Paulo Eco Campus", country: "Brazil", points: 4089, avatar: "👨", streak: 21, level: 14 },
    { rank: 8, name: "Aisha Omar", institution: "Cairo Green School", country: "Egypt", points: 3987, avatar: "👩", streak: 19, level: 14 },
    { rank: 9, name: "Oliver Hansen", institution: "Copenhagen Climate Academy", country: "Denmark", points: 3876, avatar: "👨", streak: 23, level: 14 },
    { rank: 10, name: "Zara Kim", institution: "Seoul Environmental High", country: "South Korea", points: 3734, avatar: "👩", streak: 17, level: 13 }
  ];

  const institutionLeaderboard = [
    { rank: 1, name: "Sarah Chen", points: 3245, avatar: "👩", level: 15, streak: 24 },
    { rank: 2, name: "Mike Rodriguez", points: 2956, avatar: "👨", level: 14, streak: 18 },
    { rank: 3, name: "Alex Johnson", points: 2847, avatar: "🧑", level: 13, streak: 22, isCurrentUser: true },
    { rank: 4, name: "Emma Wilson", points: 2634, avatar: "👩", level: 12, streak: 15 },
    { rank: 5, name: "David Kim", points: 2489, avatar: "👨", level: 12, streak: 19 }
  ];

  const weeklyTopPerformers = [
    { name: "Climate Warriors", type: "Team", points: 850, members: 4, avatar: "🌍" },
    { name: "Eco Champions", type: "Team", points: 742, members: 3, avatar: "🌱" },
    { name: "Green Guardians", type: "Team", points: 698, members: 5, avatar: "🛡️" }
  ];

  const achievements = [
    { title: "Top 5% Globally", description: "Ranked in top 5% worldwide", icon: Crown, color: "text-yellow-500", unlocked: true },
    { title: "Streak Master", description: "20+ day learning streak", icon: Zap, color: "text-orange-500", unlocked: true },
    { title: "Knowledge Seeker", description: "Completed 50+ lessons", icon: Star, color: "text-blue-500", unlocked: true },
    { title: "Institution Leader", description: "Top 3 in your school", icon: School, color: "text-purple-500", unlocked: true },
    { title: "Global Elite", description: "Top 1% worldwide", icon: Trophy, color: "text-gold-500", unlocked: false },
    { title: "Perfect Score", description: "100% on 10 assessments", icon: Target, color: "text-green-500", unlocked: false }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-500" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  const getRankBg = (rank, isCurrentUser = false) => {
    if (isCurrentUser) return "bg-emerald-50 border border-emerald-200";
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-50 to-yellow-100";
      case 2: return "bg-gradient-to-r from-gray-50 to-gray-100";
      case 3: return "bg-gradient-to-r from-orange-50 to-orange-100";
      default: return "bg-white hover:bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation userType="student" />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
                <p className="text-gray-600">See how you rank among environmental champions worldwide</p>
              </div>
            </div>

            {/* Current User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">#3</div>
                  <p className="text-emerald-100">Global Rank</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
                <CardContent className="p-6 text-center">
                  <School className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">#3</div>
                  <p className="text-cyan-100">School Rank</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">4,567</div>
                  <p className="text-gray-600">Total Points</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">22</div>
                  <p className="text-gray-600">Day Streak</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Leaderboards */}
            <div className="lg:col-span-2 space-y-8">
              {/* Global Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {globalLeaderboard.map((student) => (
                      <div 
                        key={student.rank}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${getRankBg(student.rank, student.isCurrentUser)}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getRankIcon(student.rank)}
                          </div>
                          <div className="text-3xl">{student.avatar}</div>
                          <div>
                            <p className={`font-semibold ${student.isCurrentUser ? 'text-emerald-700' : 'text-gray-800'}`}>
                              {student.name} {student.isCurrentUser && '(You)'}
                            </p>
                            <p className="text-sm text-gray-600">{student.institution}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{student.country}</Badge>
                              <Badge variant="secondary" className="text-xs">Level {student.level}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">{student.points.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">points</p>
                          <div className="flex items-center gap-1 text-xs text-orange-500 mt-1">
                            <Zap className="w-3 h-3" />
                            {student.streak}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Institution Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5" />
                    Green Valley High School
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {institutionLeaderboard.map((student) => (
                      <div 
                        key={student.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${getRankBg(student.rank, student.isCurrentUser)}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6">
                            {getRankIcon(student.rank)}
                          </div>
                          <div className="text-2xl">{student.avatar}</div>
                          <div>
                            <p className={`font-semibold ${student.isCurrentUser ? 'text-emerald-700' : 'text-gray-800'}`}>
                              {student.name} {student.isCurrentUser && '(You)'}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">Level {student.level}</Badge>
                              <div className="flex items-center gap-1 text-xs text-orange-500">
                                <Zap className="w-3 h-3" />
                                {student.streak}
                              </div>
                            </div>
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weekly Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    This Week's Top Teams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklyTopPerformers.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{team.avatar}</div>
                          <div>
                            <p className="font-semibold text-gray-800">{team.name}</p>
                            <p className="text-xs text-gray-600">{team.members} members</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{team.points}</p>
                          <p className="text-xs text-gray-500">pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          achievement.unlocked ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 opacity-60'
                        }`}
                      >
                        <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? achievement.color : 'text-gray-400'}`} />
                        <div>
                          <p className={`font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                          <div className="ml-auto">
                            <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                              Unlocked
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress to Next Rank */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progress to Rank #2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">164 points</div>
                      <p className="text-sm text-gray-600">needed to reach #2</p>
                    </div>
                    <Progress value={73} className="h-3" />
                    <div className="text-center">
                      <p className="text-sm text-gray-600">You're 73% of the way there!</p>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Star className="w-4 h-4 mr-2" />
                      Earn More Points
                    </Button>
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

export default Leaderboard;