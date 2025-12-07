import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import "@/styles/animations.css";
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
  Award,
  FlaskConical,
  Sparkles,
  Target,
  Flame,
  Crown,
  Gift,
  ChevronRight,
  Play,
  Rocket,
  Heart,
  Brain,
  Leaf,
  Globe,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const start = 0;
    const end = value;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * easeOut));

      if (progress === 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

// Floating Particle Component
const FloatingParticle = ({ delay, size, left, duration }) => (
  <div
    className="absolute rounded-full opacity-60"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      background: `linear-gradient(135deg, ${
        Math.random() > 0.5 ? "#10b981" : "#06b6d4"
      }, ${Math.random() > 0.5 ? "#8b5cf6" : "#f59e0b"})`,
      animationName: "float",
      animationDuration: `${duration}s`,
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      animationDelay: `${delay}s`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-emerald-500 transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="url(#gradient)"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch stats from backend - use 'id' or '_id'
      const studentId = parsedUser.id || parsedUser._id;
      if (studentId) {
        fetchStudentStats(studentId);
      }
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const fetchStudentStats = async (studentId) => {
    try {
      const response = await api.get(`/student/stats/${studentId}`);
      if (response.data.success) {
        setStats(response.data.data);
        console.log("Student stats:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching student stats:", error);
    }
  };

  // Get real user data from stats API or localStorage fallback
  const studentData = {
    name: stats?.name || user?.name || "Student",
    institution: user?.school || "Your School",
    totalPoints: stats?.points || user?.points || 0,
    todayPoints: stats?.todayPoints || user?.todayPoints || 0,
    coursesCompleted: user?.coursesCompleted || 0,
    totalCourses: user?.totalCourses || 0,
    gamesFinished: user?.gamesFinished || 0,
    totalGames: user?.totalGames || 0,
    institutionPosition: user?.institutionPosition || "-",
    globalPosition: user?.globalPosition || "-",
    level: stats?.level || user?.level || 1,
    currentXP: stats?.currentXP || user?.currentXP || 0,
    nextLevelXP: stats?.nextLevelXP || user?.nextLevelXP || 100,
    streak: stats?.streak || user?.streak || 0,
    badges: Array.isArray(stats?.badges) ? stats.badges.length : Array.isArray(user?.badges) ? user.badges.length : 0,
    hoursLearned: stats?.hoursLearned || user?.hoursLearned || 0,
    watchedVideosCount: stats?.watchedVideosCount || 0,
  };

  const xpProgress = (studentData.currentXP / studentData.nextLevelXP) * 100;
  const courseProgress =
    (studentData.coursesCompleted / studentData.totalCourses) * 100;

  const quickStats = [
    {
      label: "Total Points",
      value: studentData.totalPoints,
      icon: Trophy,
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      label: "Day Streak",
      value: studentData.streak,
      icon: Flame,
      gradient: "from-red-400 to-pink-500",
      bgGradient: "from-red-500/20 to-pink-500/20",
      suffix: " 🔥",
    },
    {
      label: "Badges Earned",
      value: studentData.badges,
      icon: Award,
      gradient: "from-purple-400 to-indigo-500",
      bgGradient: "from-purple-500/20 to-indigo-500/20",
    },
    {
      label: "Hours Learned",
      value: studentData.hoursLearned,
      icon: BookOpen,
      gradient: "from-emerald-400 to-cyan-500",
      bgGradient: "from-emerald-500/20 to-cyan-500/20",
      suffix: "h",
    },
  ];

  // Leaderboard data - would be fetched from backend
  const leaderboard = [];

  // Achievements - start with 0 progress
  const achievements = [
    {
      title: "Forest Guardian",
      description: "Plant 100 virtual trees",
      icon: "🌳",
      progress: 0,
      points: 100,
      color: "emerald",
    },
    {
      title: "Ocean Protector",
      description: "Complete marine missions",
      icon: "🌊",
      progress: 0,
      points: 150,
      color: "cyan",
    },
    {
      title: "Energy Master",
      description: "Build 10 solar farms",
      icon: "⚡",
      progress: 0,
      points: 200,
      color: "amber",
    },
  ];

  // Daily challenges - from API or defaults
  const dailyChallenges =
    stats?.dailyChallenges?.length > 0
      ? stats.dailyChallenges.map((challenge) => ({
          title: challenge.title || challenge.type || "Challenge",
          reward: challenge.xpReward || challenge.reward || 50,
          icon:
            challenge.type === "watch-video"
              ? BookOpen
              : challenge.type === "complete-quiz"
              ? Brain
              : Gamepad2,
          completed: challenge.completed || false,
        }))
      : [
          {
            title: "Watch a Video",
            reward: 50,
            icon: BookOpen,
            completed: false,
          },
          {
            title: "Complete a Quiz",
            reward: 75,
            icon: Brain,
            completed: false,
          },
          {
            title: "Play a Game",
            reward: 50,
            icon: Gamepad2,
            completed: false,
          },
        ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-cyan-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() * 20 + 5}
            left={Math.random() * 100}
            duration={Math.random() * 3 + 4}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Navigation />

      <main className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* User Info */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center animate-pulse-glow">
                    <span className="text-5xl">🦸</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-4 border-slate-900">
                    {studentData.level}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                      Welcome back, {studentData.name}!
                    </h1>
                    <span className="text-3xl animate-wave">👋</span>
                  </div>
                  <p className="text-emerald-300 text-lg">
                    {studentData.institution}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 px-4 py-1">
                      <Crown className="w-4 h-4 mr-1" /> Level{" "}
                      {studentData.level}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-1">
                      <Flame className="w-4 h-4 mr-1" /> {studentData.streak}{" "}
                      Day Streak
                    </Badge>
                  </div>
                </div>
              </div>

              {/* XP Progress */}
              <div className="flex items-center gap-6">
                <ProgressRing progress={xpProgress} size={100}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(xpProgress)}%
                    </div>
                    <div className="text-xs text-emerald-300">
                      to Lv.{studentData.level + 1}
                    </div>
                  </div>
                </ProgressRing>
                <div>
                  <p className="text-emerald-300 text-sm mb-1">
                    Experience Points
                  </p>
                  <p className="text-white text-2xl font-bold">
                    <AnimatedCounter value={studentData.currentXP} /> /{" "}
                    {studentData.nextLevelXP}
                  </p>
                  <p className="text-cyan-300 text-sm mt-1">
                    {studentData.nextLevelXP - studentData.currentXP} XP to next
                    level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className={`glass border-0 hover-lift cursor-pointer group overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                if (stat.label === "Badges Earned") {
                  navigate("/student/badges");
                }
              }}
            >
              <CardContent className="p-6 relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">
                    <AnimatedCounter
                      value={stat.value}
                      duration={1500 + index * 200}
                    />
                    {stat.suffix}
                  </p>
                  {stat.label === "Badges Earned" && (
                    <p className="text-xs text-purple-400 mt-2">Click to view →</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Challenges */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    Daily Challenges
                    <Badge className="ml-auto bg-amber-500/20 text-amber-300 border-amber-500/30">
                      <Gift className="w-3 h-3 mr-1" /> +
                      {dailyChallenges
                        .filter((c) => !c.completed)
                        .reduce((sum, c) => sum + c.reward, 0)}{" "}
                      XP Available
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyChallenges.map((challenge, index) => {
                    // Determine navigation path based on challenge type
                    const getChallengePath = () => {
                      const title = challenge.title || "";
                      if (title.toLowerCase().includes("video"))
                        return "/student/lessons";
                      if (title.toLowerCase().includes("quiz"))
                        return "/student/lessons";
                      if (title.toLowerCase().includes("game")) return "/games";
                      return null;
                    };

                    const challengePath = getChallengePath();

                    return (
                      <div
                        key={index}
                        onClick={() =>
                          !challenge.completed &&
                          challengePath &&
                          navigate(challengePath)
                        }
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          challenge.completed
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            challenge.completed
                              ? "bg-emerald-500"
                              : "bg-gradient-to-br from-slate-700 to-slate-600"
                          }`}
                        >
                          {challenge.completed ? (
                            <span className="text-2xl">✓</span>
                          ) : (
                            <challenge.icon className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-semibold ${
                              challenge.completed
                                ? "text-emerald-300 line-through"
                                : "text-white"
                            }`}
                          >
                            {challenge.title || "Challenge"}
                          </p>
                          {!challenge.completed && challengePath && (
                            <p className="text-xs text-gray-400 mt-1">
                              Click to start →
                            </p>
                          )}
                          {challenge.progress !== undefined &&
                            !challenge.completed && (
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${
                                        (challenge.progress / challenge.total) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400">
                                  {challenge.progress}/{challenge.total}
                                </span>
                              </div>
                            )}
                        </div>
                        <Badge
                          className={
                            challenge.completed
                              ? "bg-emerald-500/30 text-emerald-300"
                              : "bg-amber-500/20 text-amber-300"
                          }
                        >
                          +{challenge.reward} XP
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Achievement Progress */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    Achievement Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-white">
                              {achievement.title}
                            </h4>
                            <Badge className="bg-white/10 text-white border-0">
                              +{achievement.points} pts
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-18 relative">
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                              achievement.color === "emerald"
                                ? "from-emerald-400 to-emerald-500"
                                : achievement.color === "cyan"
                                ? "from-cyan-400 to-cyan-500"
                                : "from-amber-400 to-amber-500"
                            }`}
                            style={{
                              width: `${achievement.progress}%`,
                              animationDelay: `${index * 200}ms`,
                            }}
                          />
                        </div>
                        <span className="absolute right-0 -top-6 text-sm text-gray-400">
                          {achievement.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {[
                {
                  title: "Continue Learning",
                  icon: BookOpen,
                  color: "from-emerald-400 to-emerald-600",
                  path: "/student/lessons",
                },
                {
                  title: "Play Games",
                  icon: Gamepad2,
                  color: "from-cyan-400 to-cyan-600",
                  path: "/student/games",
                },
                {
                  title: "My Badges",
                  icon: Trophy,
                  color: "from-yellow-400 to-orange-600",
                  path: "/student/badges",
                },
                {
                  title: "AI Tutor",
                  icon: Brain,
                  color: "from-pink-400 to-pink-600",
                  path: "/student/ai",
                },
              ].map((action, index) => (
                <Button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`h-auto py-6 flex flex-col items-center gap-3 bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-300 border-0 shadow-lg hover:shadow-xl`}
                >
                  <action.icon className="w-8 h-8" />
                  <span className="text-sm font-medium">{action.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((student, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          student.isCurrentUser
                            ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 scale-105"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            student.rank === 1
                              ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white"
                              : student.rank === 2
                              ? "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800"
                              : student.rank === 3
                              ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          {student.badge || student.rank}
                        </div>
                        <span className="text-2xl">{student.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium truncate ${
                              student.isCurrentUser
                                ? "text-emerald-300"
                                : "text-white"
                            }`}
                          >
                            {student.name}{" "}
                            {student.isCurrentUser && (
                              <span className="text-cyan-300">(You)</span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">
                            {student.points.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">points</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 font-medium">
                        No Rankings Yet
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Start learning to appear on the leaderboard!
                      </p>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                    onClick={() => navigate("/student/leaderboard")}
                  >
                    View Full Leaderboard{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">
                      No Events Scheduled
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Check back later for upcoming activities!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Motivational Card */}
            <div
              className={`transition-all duration-700 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="border-0 bg-gradient-to-br from-emerald-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>
                <CardContent className="p-6 relative">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl animate-float">🌱</div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">
                        Start Your Journey!
                      </h3>
                      <p className="text-emerald-100 text-sm">
                        Begin learning today and help build a greener, more
                        sustainable future!
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-white/80" />
                    <span className="text-sm text-white/80">
                      Every lesson counts towards a better planet!
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for glass effect if not in animations.css */}
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
