import Link from "next/link"
import { BookOpen, Leaf, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100">
      <header className="px-4 py-6 md:px-8 border-b border-green-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoQuest Adventures
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Learn About Our Planet Through Stories!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch animated stories and test your knowledge with interactive quizzes
          </p>

          <div className="flex justify-center gap-4 md:gap-8 mt-8">
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl">🎬</div>
              <div className="text-2xl font-bold text-blue-600">Animated</div>
              <span className="text-sm text-gray-600">Story Videos</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl">❓</div>
              <div className="text-2xl font-bold text-amber-600">Quizzes</div>
              <span className="text-sm text-gray-600">Test Knowledge</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Link href="/stories" className="block group">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 border-4 border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">
                    Start Learning
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Animated Stories</h3>
                  <p className="text-white/90 text-lg">
                    Watch engaging stories about Environment, Ecosystem, and Climate Change - then take quizzes!
                  </p>
                </div>
                <div className="text-6xl animate-bounce">📖</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-200 max-w-4xl mx-auto">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-4xl mb-2">💨</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Air Management</h4>
                <p className="text-gray-600 text-sm">Air quality, pollution control, and protecting the atmosphere</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💧</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Water Management</h4>
                <p className="text-gray-600 text-sm">
                  Water conservation, the water cycle, and preserving water resources
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Land Management</h4>
                <p className="text-gray-600 text-sm">Soil health, deforestation prevention, and sustainable land use</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
