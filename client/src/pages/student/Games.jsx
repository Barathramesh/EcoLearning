import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Gamepad2, 
  Play, 
  Star, 
  Clock, 
  Trophy, 
  Target,
  Leaf,
  Droplets,
  Sun,
  Recycle,
  TreePine,
  Wind,
  Mountain,
  Fish,
  Snowflake,
  Zap,
  Globe,
  Flower2,
  Bug,
  Search
} from "lucide-react";

const Games = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const games = [
    {
      id: 1,
      title: "EcoQuest Adventure",
      description: "Explore different ecosystems and learn about biodiversity",
      difficulty: "Easy",
      duration: "15 min",
      points: 50,
      completed: false,
      progress: 0,
      icon: Leaf,
      category: "Ecosystems",
      route: "/student/ecoquest-adventure"
    },
    {
      id: 2,
      title: "Ocean Cleanup Hero",
      description: "Clean up the ocean and save marine life",
      difficulty: "Medium",
      duration: "20 min",
      points: 75,
      completed: false,
      progress: 0,
      icon: Droplets,
      category: "Ocean Conservation",
      route: "/student/ocean-cleanup-hero"
    },
    {
      id: 3,
      title: "Solar Power Master",
      description: "Build and manage renewable energy systems",
      difficulty: "Hard",
      duration: "30 min",
      points: 100,
      completed: false,
      progress: 0,
      icon: Sun,
      category: "Energy",
      route: "/student/solar-power-master"
    },
    {
      id: 4,
      title: "Recycling Wizard",
      description: "Sort waste and learn about proper recycling",
      difficulty: "Easy",
      duration: "10 min",
      points: 40,
      completed: false,
      progress: 0,
      icon: Recycle,
      category: "Waste Management",
      route: "/student/recycling-wizard"
    },
    {
      id: 5,
      title: "Save the Trees",
      description: "Plant and manage your own forest while learning about conservation",
      difficulty: "Medium",
      duration: "25 min",
      points: 80,
      completed: false,
      progress: 0,
      icon: TreePine,
      category: "Forest Conservation",
      route: "/student/save-the-trees"
    },
    {
      id: 6,
      title: "Wind Farm Engineer",
      description: "Design and build efficient wind energy farms",
      difficulty: "Hard",
      duration: "35 min",
      points: 120,
      completed: false,
      progress: 0,
      icon: Wind,
      category: "Renewable Energy",
      route: "/student/wind-farm-engineer"
    },
    {
      id: 7,
      title: "Mountain Ranger",
      description: "Protect mountain ecosystems and wildlife habitats",
      difficulty: "Medium",
      duration: "22 min",
      points: 85,
      completed: false,
      progress: 0,
      icon: Mountain,
      category: "Wildlife Protection",
      route: "/student/mountain-ranger"
    },
    {
      id: 8,
      title: "Aquatic Life Guardian",
      description: "Restore coral reefs and protect marine biodiversity",
      difficulty: "Hard",
      duration: "28 min",
      points: 110,
      completed: false,
      progress: 0,
      icon: Fish,
      category: "Marine Biology",
      route: "/student/aquatic-life-guardian"
    },
    {
      id: 9,
      title: "Arctic Rescue Mission",
      description: "Save polar animals and understand climate change impacts",
      difficulty: "Medium",
      duration: "18 min",
      points: 70,
      completed: false,
      progress: 0,
      icon: Snowflake,
      category: "Climate Change",
      route: "/student/arctic-rescue-mission"
    },
    {
      id: 10,
      title: "Electric Vehicle City",
      description: "Build sustainable transportation systems",
      difficulty: "Hard",
      duration: "40 min",
      points: 130,
      completed: false,
      progress: 0,
      icon: Zap,
      category: "Sustainable Transport",
      route: "/student/electric-vehicle-city"
    },
    {
      id: 11,
      title: "Global Weather Detective",
      description: "Track weather patterns and predict climate changes",
      difficulty: "Medium",
      duration: "24 min",
      points: 90,
      completed: false,
      progress: 0,
      icon: Globe,
      category: "Climate Science",
      route: "/student/global-weather-detective"
    },
    {
      id: 12,
      title: "Pollinator Paradise",
      description: "Create gardens to save bees and butterflies",
      difficulty: "Easy",
      duration: "12 min",
      points: 55,
      completed: false,
      progress: 0,
      icon: Flower2,
      category: "Biodiversity",
      route: "/student/pollinator-paradise"
    },
    {
      id: 13,
      title: "Ecosystem Food Web",
      description: "Balance predator and prey relationships in nature",
      difficulty: "Hard",
      duration: "32 min",
      points: 115,
      completed: false,
      progress: 0,
      icon: Bug,
      category: "Ecology",
      route: "/student/ecosystem-food-web"
    },
    {
      id: 14,
      title: "Carbon Footprint Hunter",
      description: "Track and reduce carbon emissions in daily life",
      difficulty: "Medium",
      duration: "20 min",
      points: 75,
      completed: false,
      progress: 0,
      icon: Leaf,
      category: "Carbon Management",
      route: "/student/carbon-footprint-hunter"
    },
    {
      id: 15,
      title: "Green Chemistry Lab",
      description: "Create eco-friendly products using safe chemicals",
      difficulty: "Hard",
      duration: "45 min",
      points: 140,
      completed: false,
      progress: 0,
      icon: Droplets,
      category: "Green Chemistry",
      route: "/student/green-chemistry-lab"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Get all unique categories for filtering
  const categories = ["All", ...new Set(games.map(game => game.category))];
  
  // Filter games based on selected category and search term
  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalGames = games.length;
  const completedGames = games.filter(game => game.completed).length;
  const totalPoints = games.filter(game => game.completed).reduce((sum, game) => sum + game.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-300 rounded-full opacity-60 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-cyan-300 rounded-full opacity-50 animate-float-medium"></div>
        <div className="absolute top-60 left-1/4 w-3 h-3 bg-blue-300 rounded-full opacity-70 animate-float-fast"></div>
        <div className="absolute bottom-40 right-1/4 w-5 h-5 bg-emerald-400 rounded-full opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-60 left-20 w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-float-medium"></div>
        
        {/* Animated Icons */}
        <div className="absolute top-32 right-10 text-4xl opacity-20 animate-bounce-slow">🌱</div>
        <div className="absolute top-1/2 left-5 text-5xl opacity-15 animate-sway">🌊</div>
        <div className="absolute bottom-32 right-1/3 text-4xl opacity-20 animate-pulse-slow">☀️</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-25 animate-spin-slow">♻️</div>
        <div className="absolute bottom-20 left-1/3 text-4xl opacity-20 animate-bounce-slow">🌳</div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(8px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(-8px); }
          66% { transform: translateY(-12px) translateX(6px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>

      <Navigation userType="student" />
      <main className="pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6 group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Gamepad2 className="w-10 h-10 text-white group-hover:animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  🎮 Eco Games Hub
                </h1>
                <p className="text-lg text-gray-600 font-medium">Learn environmental science through fun and interactive adventures</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-700">{completedGames}/{totalGames}</div>
                  <p className="text-orange-600 font-semibold">Games Completed</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">{totalPoints}</div>
                  <p className="text-emerald-600 font-semibold">Points Earned</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-spin">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-700">
                    {Math.round((completedGames / totalGames) * 100)}%
                  </div>
                  <p className="text-cyan-600 font-semibold">Completion Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-600" />
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg"
                      : "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  {category}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 text-xs"
                  >
                    {category === "All" ? games.length : games.filter(game => game.category === category).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Search and Results Info */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">
                  Showing {filteredGames.length} of {totalGames} games
                </span>
                {selectedCategory !== "All" && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    📂 {selectedCategory}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <Card key={game.id} className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-2 hover:border-emerald-300 relative overflow-hidden">
                  {/* Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-cyan-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 via-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <game.icon className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700" />
                      </div>
                      <Badge className={`${getDifficultyColor(game.difficulty)} font-semibold shadow-md`} variant="secondary">
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">{game.title}</CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed">{game.description}</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">{game.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{game.points} pts</span>
                        </div>
                      </div>

                      <Badge variant="outline" className="w-fit bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                        📚 {game.category}
                      </Badge>

                      {game.completed ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center bg-green-50 rounded-lg p-3">
                            <span className="text-sm font-semibold text-green-700 flex items-center gap-2">
                              <Trophy className="w-4 h-4" />
                              Completed
                            </span>
                            <span className="text-sm text-green-600 font-medium">Score: {game.score}%</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                              onClick={() => navigate(game.route)}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Play Again
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {game.progress > 0 ? (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-emerald-700">Progress</span>
                                <span className="text-sm text-gray-600 font-medium">{game.progress}%</span>
                              </div>
                              <Progress value={game.progress} className="h-3 bg-gray-200" />
                              <Button 
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                                onClick={() => navigate(game.route)}
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Continue Adventure
                              </Button>
                            </>
                          ) : (
                            <Button 
                              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 font-semibold"
                              onClick={() => navigate(game.route)}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Start Adventure
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No games found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? `No games match "${searchTerm}"` : `No games in ${selectedCategory} category`}
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                >
                  Show All Games
                </Button>
              </div>
            )}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
              🚀 Coming Soon - More Adventures Await!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Climate Change Challenge", desc: "Battle extreme weather events", emoji: "🌪️" },
                { title: "Biodiversity Explorer", desc: "Discover hidden species", emoji: "🦋" },
                { title: "Green City Builder", desc: "Design sustainable cities", emoji: "🏙️" },
                { title: "Space Earth Monitor", desc: "Monitor Earth from space", emoji: "🛰️" },
                { title: "Underwater Volcano", desc: "Explore deep sea mysteries", emoji: "🌋" },
                { title: "Desert Oasis Creator", desc: "Transform deserts into life", emoji: "🏜️" },
                { title: "Rainforest Protector", desc: "Save the Amazon", emoji: "🦜" },
                { title: "Plastic Ocean Cleaner", desc: "Remove microplastics", emoji: "🌊" }
              ].map((game, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {game.emoji}
                    </div>
                    <h3 className="font-bold text-sm text-purple-700 mb-2">{game.title}</h3>
                    <p className="text-xs text-purple-600 mb-3">{game.desc}</p>
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 text-xs">
                      🔜 Soon
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;