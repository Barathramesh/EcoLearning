"use client"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const managementTypes = [
  {
    id: "air-management",
    grade: "Air Management",
    title: "Air - The Breath of Life",
    description:
      "Learn about air quality, pollution, and how to protect the air we breathe. Watch 5 educational videos!",
    emoji: "💨",
    color: "from-sky-400 to-blue-500",
    videos: 5,
    questions: 10,
  },
  {
    id: "water-management",
    grade: "Water Management",
    title: "Water - The Source of Life",
    description:
      "Discover water conservation, the water cycle, and protecting water resources. Watch 5 informative videos!",
    emoji: "💧",
    color: "from-sky-400 to-blue-500",
    videos: 5,
    questions: 10,
  },
  {
    id: "land-management",
    grade: "Land Management",
    title: "Land - Our Foundation",
    description: "Understand soil health, deforestation, and sustainable land practices. Watch 5 detailed videos!",
    emoji: "🌍",
    color: "from-sky-400 to-blue-500",
    videos: 5,
    questions: 10,
  },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="px-4 py-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="lg" className="rounded-full text-lg gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back Home
            </Button>
          </Link>
          <div className="mt-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">Environmental Management</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Choose a management type, watch videos, and test your knowledge with quizzes!
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {managementTypes.map((type) => (
            <Link key={type.id} href={`/stories/${type.id}`} className="block group">
              <div className="bg-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-border min-h-full flex flex-col">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-3xl flex items-center justify-center text-5xl mb-4 shadow-lg group-hover:scale-110 transition-transform mx-auto`}
                >
                  {type.emoji}
                </div>

                <div className="text-center">
                  <div className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold px-3 py-1 rounded-full mb-2">
                    {type.grade}
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">{type.title}</h3>
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed min-h-[4.5rem]">
                    {type.description}
                  </p>
                </div>

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <span className="text-sm font-semibold text-foreground">Videos:</span>
                    <span className="text-sm font-bold text-foreground">{type.videos}</span>
                  </div>
                  <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <span className="text-sm font-semibold text-foreground">Quiz Questions:</span>
                    <span className="text-sm font-bold text-foreground">{type.questions}</span>
                  </div>
                </div>

                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${type.color} hover:opacity-90 text-white font-bold py-6 text-lg rounded-2xl`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3xl p-8 border-4 border-amber-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 text-white font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Watch Videos</h3>
              <p className="text-gray-700 text-sm">
                Select and watch any of the 5 animated videos with voice narration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 text-white font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Take Quiz</h3>
              <p className="text-gray-700 text-sm">Answer 2 questions after each video automatically</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 text-white font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Repeat Until Correct</h3>
              <p className="text-gray-700 text-sm">Questions repeat with encouragement until you answer correctly!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
