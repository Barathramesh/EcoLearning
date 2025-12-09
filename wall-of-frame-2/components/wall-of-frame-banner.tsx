"use client"

import { useState, useEffect } from "react"
import {
  Trophy,
  Star,
  Zap,
  TrendingUp,
  Award,
  Leaf,
  TreePine,
  Sprout,
  Crown,
  Sparkles,
  Medal,
  Target,
  Flame,
  Users,
  Calendar,
  Share2,
  ChevronRight,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WallOfFrameBanner() {
  const [students] = useState(
    Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: `Student Name ${i + 1}`,
      ecoPoints: Math.floor(Math.random() * 5000) + 1000,
      playerLevel: Math.floor(Math.random() * 50) + 1,
      avatar: `/placeholder.svg?height=80&width=80&query=student avatar ${i + 1}`,
      streak: Math.floor(Math.random() * 30) + 1,
      rank: i + 1,
    })),
  )

  const [displayedPoints, setDisplayedPoints] = useState(0)
  const [displayedLevel, setDisplayedLevel] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const sortedStudents = [...students].sort((a, b) => b.ecoPoints - a.ecoPoints)
  const topStudent = sortedStudents[0]
  const runnersUp = sortedStudents.slice(1, 4)

  useEffect(() => {
    setIsVisible(true)
    const duration = 2000
    const steps = 60
    const pointIncrement = topStudent.ecoPoints / steps
    const levelIncrement = topStudent.playerLevel / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setDisplayedPoints(Math.min(Math.round(pointIncrement * step), topStudent.ecoPoints))
      setDisplayedLevel(Math.min(Math.round(levelIncrement * step), topStudent.playerLevel))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [topStudent.ecoPoints, topStudent.playerLevel])

  const achievements = [
    { icon: Flame, label: "30 Day Streak", color: "from-orange-400 to-red-500" },
    { icon: Target, label: "Goal Crusher", color: "from-emerald-400 to-green-500" },
    { icon: Users, label: "Team Leader", color: "from-teal-400 to-cyan-500" },
  ]

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0">
        {/* Layered gradient orbs for depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-950/50 via-transparent to-emerald-950/30" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-green-500/25 to-teal-500/15 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-emerald-600/10 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />

        {/* Floating eco particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-emerald-400/40 animate-float"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          >
            {i % 4 === 0 ? (
              <Leaf className="w-4 h-4" />
            ) : i % 4 === 1 ? (
              <Sprout className="w-3 h-3" />
            ) : i % 4 === 2 ? (
              <TreePine className="w-5 h-5" />
            ) : (
              <Star className="w-3 h-3" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 py-8 px-4 md:px-8 flex flex-col items-center justify-start min-h-screen">
        <div
          className={`mb-8 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-full mb-4 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">Live Rankings</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tight">
            <span className="inline-block bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300 bg-clip-text text-transparent bg-[size:200%_auto] animate-shimmer">
              Wall of Frame
            </span>
          </h1>

          <p className="text-base md:text-lg text-emerald-100/70 max-w-xl mx-auto mb-4">
            Celebrating our environmental champions making real impact
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-400/50" />
            <TreePine className="w-5 h-5 text-emerald-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-400/50" />
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {/* Champion Section */}
          <div
            className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Trophy Display */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative animate-trophy-float">
                <div className="absolute inset-0 bg-emerald-400/40 rounded-full blur-2xl scale-[2.5] animate-glow-ring" />
                <div
                  className="absolute inset-0 bg-green-500/30 rounded-full blur-xl scale-[1.8] animate-glow-ring"
                  style={{ animationDelay: "0.5s" }}
                />

                <div className="relative bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-300/60">
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                </div>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Crown className="w-7 h-7 text-yellow-400 fill-yellow-400 drop-shadow-lg animate-sparkle" />
                </div>

                <Sparkles
                  className="absolute -right-2 top-0 w-4 h-4 text-yellow-300 animate-sparkle"
                  style={{ animationDelay: "0.3s" }}
                />
                <Sparkles
                  className="absolute -left-2 top-2 w-3 h-3 text-emerald-300 animate-sparkle"
                  style={{ animationDelay: "0.6s" }}
                />
              </div>

              <div className="mt-3 px-5 py-1.5 bg-gradient-to-r from-emerald-500/20 via-green-500/30 to-emerald-500/20 border border-emerald-400/40 rounded-full backdrop-blur-sm animate-border-glow">
                <span className="text-sm font-bold text-emerald-300 tracking-wider">#1 ECO CHAMPION</span>
              </div>
            </div>

            {/* Main Champion Card */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 rounded-2xl blur opacity-60 animate-pulse-glow" />

              <div className="relative bg-card/95 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-5 md:p-6">
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-emerald-400/50 rounded-tl-xl" />
                <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-emerald-400/50 rounded-tr-xl" />
                <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-xl" />
                <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-emerald-400/50 rounded-br-xl" />

                <div className="flex flex-col md:flex-row items-center gap-5">
                  {/* Avatar Section */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-lg opacity-40" />
                    <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 rounded-full border-4 border-emerald-300/50 flex items-center justify-center shadow-xl">
                      <Award className="w-14 h-14 md:w-16 md:h-16 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-emerald-300/80 uppercase tracking-wider font-semibold">
                        Top Performer
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">{topStudent.name}</h2>

                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${achievement.color} bg-opacity-20 border border-white/10`}
                          title={achievement.label}
                        >
                          <achievement.icon className="w-3 h-3 text-white" />
                          <span className="text-xs text-white/90 font-medium hidden sm:inline">
                            {achievement.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-secondary/50 rounded-xl p-3 border border-emerald-400/20">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Zap className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xl md:text-2xl font-black text-emerald-300">
                          {displayedPoints.toLocaleString()}
                        </p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">Points</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 border border-emerald-400/20">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xl md:text-2xl font-black text-emerald-300">{displayedLevel}</p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">Level</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 border border-emerald-400/20">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <p className="text-xl md:text-2xl font-black text-orange-300">{topStudent.streak}</p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">Streak</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mt-5 pt-4 border-t border-emerald-400/20">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-emerald-200/70 flex items-center gap-2">
                      <Sprout className="w-4 h-4" />
                      Progress to Next Level
                    </span>
                    <span className="text-emerald-300 font-bold">
                      {Math.min((topStudent.ecoPoints / 5000) * 100, 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-3 bg-secondary/60 rounded-full overflow-hidden border border-emerald-400/20">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 rounded-full transition-all duration-1000 relative overflow-hidden"
                      style={{ width: `${Math.min((topStudent.ecoPoints / 5000) * 100, 100)}%` }}
                    >
                      <div className="absolute inset-0 animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mb-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Medal className="w-5 h-5 text-emerald-400" />
                Rising Stars
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {runnersUp.map((student, index) => (
                <div
                  key={student.id}
                  className="relative group bg-card/60 backdrop-blur border border-emerald-400/20 rounded-xl p-4 hover:border-emerald-400/40 transition-all duration-300 hover:bg-card/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0
                            ? "bg-gradient-to-br from-gray-300 to-gray-400"
                            : index === 1
                              ? "bg-gradient-to-br from-amber-600 to-amber-700"
                              : "bg-gradient-to-br from-emerald-500 to-green-600"
                        }`}
                      >
                        #{index + 2}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{student.name}</p>
                      <p className="text-sm text-emerald-300">{student.ecoPoints.toLocaleString()} pts</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Level</p>
                      <p className="font-bold text-emerald-400">{student.playerLevel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-emerald-500/25">
              <Leaf className="w-4 h-4 mr-2" />
              Join the Challenge
            </Button>
            <Button
              variant="outline"
              className="border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10 rounded-full px-6 bg-transparent"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>

        {/* Footer Info */}
        <div
          className={`mt-8 text-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-card/50 backdrop-blur border border-emerald-400/20 rounded-full">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-200/70">Updated daily</span>
            </div>
            <div className="w-px h-4 bg-emerald-400/30" />
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-200/70">60 participants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
