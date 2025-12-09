"use client"

import { useState } from "react"

export default function HallOfFameBanner() {
  // Placeholder for 60 student records - replace with actual data
  const [students] = useState(
    Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: `Student Name ${i + 1}`,
      ecoPoints: Math.floor(Math.random() * 5000) + 1000,
      playerLevel: Math.floor(Math.random() * 50) + 1,
    })),
  )

  const topStudent = students.reduce((prev, current) => (current.ecoPoints > prev.ecoPoints ? current : prev))

  return (
    <section className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background py-20 px-4 md:px-8 flex items-center justify-center">
      {/* Main Winner Card */}
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">Hall of Fame</h1>
          <p className="text-xl text-muted-foreground mb-2 text-balance">Top Eco-Warrior Champion</p>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Winner Showcase Card */}
        <div className="relative bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent rounded-2xl p-12 text-center shadow-2xl">
          {/* Crown Badge */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-accent text-primary-foreground text-5xl w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-background">
              👑
            </div>
          </div>

          {/* Content */}
          <div className="mt-10">
            <div className="mb-8 px-6 py-4 bg-accent/10 rounded-lg border border-accent/30">
              <p className="text-2xl md:text-3xl font-semibold text-accent mb-2">🎉 Congratulations! 🎉</p>
              <p className="text-lg text-foreground">
                You're the top Eco-Warrior with the highest eco-points among all 60 students!
              </p>
            </div>

            {/* Avatar Placeholder */}
            <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-8 shadow-lg border-4 border-accent/20"></div>

            {/* Winner Name */}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">{topStudent.name}</h2>

            {/* Stats Section */}
            <div className="space-y-8">
              {/* Eco Points */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-2 uppercase tracking-wide">Eco Points</p>
                <p className="text-5xl font-bold text-accent">{topStudent.ecoPoints.toLocaleString()}</p>
              </div>

              {/* Player Level */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-2 uppercase tracking-wide">Player Level</p>
                <p className="text-5xl font-bold text-accent">{topStudent.playerLevel}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-10 space-y-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Progress to Level {topStudent.playerLevel + 1}</span>
                <span>{Math.min((topStudent.ecoPoints / 5000) * 100, 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((topStudent.ecoPoints / 5000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">🌱 Ranked #1 among 60 students. Rankings updated monthly.</p>
        </div>
      </div>
    </section>
  )
}
