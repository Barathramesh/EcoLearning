import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import "@/styles/animations.css";
import { useState, useEffect } from "react";
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
  Calendar,
  Sparkles,
  Flame
} from "lucide-react";

const Leaderboard = () => {
  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState({
    globalRank: "-",
    schoolRank: "-",
    totalPoints: 0,
    streak: 0
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      // In a real app, you'd fetch actual stats from the backend
      setUserStats({
        globalRank: "-",
        schoolRank: "-",
        totalPoints: user.points || 0,
        streak: user.streak || 0
      });
    }
  }, []);

  // Empty leaderboard data - would be fetched from backend
  const globalLeaderboard = [];
  const institutionLeaderboard = [];
  const weeklyTopPerformers = [];

  const achievements = [
    { title: "Top 5% Globally", description: "Ranked in top 5% worldwide", icon: Crown, color: "text-yellow-400", gradient: "from-yellow-400 to-amber-600", unlocked: false },
    { title: "Streak Master", description: "20+ day learning streak", icon: Zap, color: "text-orange-400", gradient: "from-orange-400 to-red-600", unlocked: false },
    { title: "Knowledge Seeker", description: "Completed 50+ lessons", icon: Star, color: "text-blue-400", gradient: "from-blue-400 to-cyan-600", unlocked: false },
    { title: "Institution Leader", description: "Top 3 in your school", icon: School, color: "text-purple-400", gradient: "from-purple-400 to-pink-600", unlocked: false },
    { title: "Global Elite", description: "Top 1% worldwide", icon: Trophy, color: "text-gold-400", gradient: "from-gray-400 to-gray-600", unlocked: false },
    { title: "Perfect Score", description: "100% on 10 assessments", icon: Target, color: "text-green-400", gradient: "from-gray-400 to-gray-600", unlocked: false }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-400">{rank}</span>;
    }
  };

  const getRankStyle = (rank, isCurrentUser = false) => {
    if (isCurrentUser) return "bg-emerald-500/20 border border-emerald-500/40";
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30";
      case 2: return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30";
      case 3: return "bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30";
      default: return "glass border-0";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/30 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        {/* Sparkle particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <Navigation userType="student" />
      <main className="pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-yellow-500/30 animate-float">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                  Leaderboard
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                </h1>
                <p className="text-gray-400">See how you rank among environmental champions worldwide</p>
              </div>
            </div>

            {/* Current User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass border-0 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{userStats.globalRank}</div>
                  <p className="text-gray-400">Global Rank</p>
                </CardContent>
              </Card>
              <Card className="glass border-0 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/30">
                    <School className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{userStats.schoolRank}</div>
                  <p className="text-gray-400">School Rank</p>
                </CardContent>
              </Card>
              <Card className="glass border-0 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-yellow-500/30">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{userStats.totalPoints.toLocaleString()}</div>
                  <p className="text-gray-400">Total Points</p>
                </CardContent>
              </Card>
              <Card className="glass border-0 hover-lift overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/30 animate-pulse">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{userStats.streak}</div>
                  <p className="text-gray-400">Day Streak</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Leaderboards */}
            <div className="lg:col-span-2 space-y-8">
              {/* Global Leaderboard */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {globalLeaderboard.length > 0 ? (
                      globalLeaderboard.map((student, index) => (
                        <div 
                          key={student.rank}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${getRankStyle(student.rank, student.isCurrentUser)}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800/50">
                              {getRankIcon(student.rank)}
                            </div>
                            <div className="text-3xl">{student.avatar}</div>
                            <div>
                              <p className={`font-semibold ${student.isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                                {student.name} {student.isCurrentUser && <span className="text-emerald-400">(You)</span>}
                              </p>
                              <p className="text-sm text-gray-400">{student.institution}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">{student.country}</Badge>
                                <Badge className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">Lvl {student.level}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl text-white">{student.points.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">points</p>
                            <div className="flex items-center gap-1 text-xs text-orange-400 mt-1">
                              <Flame className="w-3 h-3" />
                              {student.streak} days
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg font-medium">No Leaderboard Data Yet</p>
                        <p className="text-gray-500 text-sm mt-1">Start learning to appear on the leaderboard!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Institution Leaderboard */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <School className="w-5 h-5 text-white" />
                    </div>
                    {userData?.school || "Your School"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {institutionLeaderboard.length > 0 ? (
                      institutionLeaderboard.map((student, index) => (
                        <div 
                          key={student.rank}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${getRankStyle(student.rank, student.isCurrentUser)}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50">
                              {getRankIcon(student.rank)}
                            </div>
                            <div className="text-2xl">{student.avatar}</div>
                            <div>
                              <p className={`font-semibold ${student.isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                                {student.name} {student.isCurrentUser && <span className="text-emerald-400">(You)</span>}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">Lvl {student.level}</Badge>
                                <div className="flex items-center gap-1 text-xs text-orange-400">
                                  <Flame className="w-3 h-3" />
                                  {student.streak}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-white">{student.points.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">points</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <School className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg font-medium">No School Data Yet</p>
                        <p className="text-gray-500 text-sm mt-1">Be the first to appear on your school's leaderboard!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weekly Top Performers */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    This Week's Top Teams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weeklyTopPerformers.length > 0 ? (
                    <div className="space-y-3">
                      {weeklyTopPerformers.map((team, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{team.avatar}</div>
                            <div>
                              <p className="font-semibold text-white">{team.name}</p>
                              <p className="text-xs text-gray-400">{team.members} members</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-white">{team.points}</p>
                            <p className="text-xs text-gray-500">pts</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 font-medium">No Team Data Yet</p>
                      <p className="text-gray-500 text-sm mt-1">Join a team to compete!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30' 
                            : 'bg-gray-800/30 border border-gray-700/50 opacity-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          achievement.unlocked 
                            ? `bg-gradient-to-br ${achievement.gradient} shadow-lg` 
                            : 'bg-gray-700'
                        }`}>
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-400">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ✓
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress to Next Rank */}
              <Card className="glass border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    Progress to Next Rank
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{userData?.points || 0} points</div>
                      <p className="text-sm text-gray-400">Start earning points to climb the ranks!</p>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((userData?.points || 0) / 10, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Complete lessons and quizzes to earn points!</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 transition-all duration-300">
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

      {/* Custom Styles */}
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;