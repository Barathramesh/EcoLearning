import Link from "next/link"
import { TrendingUp, Leaf, Gamepad2, BookOpen, Beaker, GraduationCap } from "lucide-react"

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
            Explore Our Planet, Save the Future!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Interactive games and challenges about ecosystems, climate change, and environmental protection
          </p>

          <div className="flex justify-center gap-4 md:gap-8 mt-8">
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl">🌍</div>
              <div className="text-2xl font-bold text-green-600">20+ Games</div>
              <span className="text-sm text-gray-600">Fun Challenges</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl">🎮</div>
              <div className="text-2xl font-bold text-blue-600">Interactive</div>
              <span className="text-sm text-gray-600">Learn by Doing</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl">🏆</div>
              <div className="text-2xl font-bold text-amber-600">Earn Points</div>
              <span className="text-sm text-gray-600">Track Progress</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <Link href="/class-games" className="block group">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 border-4 border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">
                    NEW: Class-Based Learning
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Class 1-12 Environmental Quest</h3>
                  <p className="text-white/90 text-lg max-w-2xl">
                    12 unique games with increasing complexity - from waste sorting to climate crisis management!
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">Drag & Drop</span>
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">Simulations</span>
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">Strategy</span>
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">Puzzles</span>
                  </div>
                </div>
                <div className="text-6xl animate-bounce">🎓</div>
              </div>
            </div>
          </Link>
        </div>
        {/* End of Class 1-12 section */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <Link href="/games" className="block group">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-green-200 hover:border-green-400">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Games</h3>
              <p className="text-center text-gray-600 leading-relaxed">Play interactive eco-challenges</p>
            </div>
          </Link>

          <Link href="/stories" className="block group">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-blue-200 hover:border-blue-400">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Stories</h3>
              <p className="text-center text-gray-600 leading-relaxed">Watch animated eco-adventures</p>
            </div>
          </Link>

          <Link href="/learning" className="block group">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-purple-200 hover:border-purple-400">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Learning</h3>
              <p className="text-center text-gray-600 leading-relaxed">Discover environmental facts</p>
            </div>
          </Link>

          <Link href="/activities" className="block group">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-amber-200 hover:border-amber-400">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                <Beaker className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Activities</h3>
              <p className="text-center text-gray-600 leading-relaxed">Hands-on eco-projects</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
