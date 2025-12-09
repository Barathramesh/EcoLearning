"use client"

interface Student {
  id: number
  name: string
  ecoPoints: number
  playerLevel: number
}

interface StudentCardProps {
  student: Student
}

export default function StudentCard({ student }: StudentCardProps) {
  const getRankMedal = (id: number) => {
    if (id === 1) return "🥇"
    if (id === 2) return "🥈"
    if (id === 3) return "🥉"
    return "✨"
  }

  return (
    <div className="group relative bg-card border border-border rounded-lg p-4 hover:border-accent hover:shadow-lg transition-all duration-300">
      {/* Rank Badge */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-lg">
        {getRankMedal(student.id)}
      </div>

      {/* Rank Number */}
      <div className="absolute top-2 left-2">
        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">#{student.id}</span>
      </div>

      {/* Content */}
      <div className="mt-6">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-3"></div>

        {/* Student Name */}
        <h3 className="text-center font-bold text-foreground text-sm truncate mb-4">{student.name}</h3>

        {/* Stats */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Eco Points:</span>
            <span className="font-bold text-accent">{student.ecoPoints.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Level:</span>
            <span className="font-bold text-accent">{student.playerLevel}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${Math.min((student.ecoPoints / 5000) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}
