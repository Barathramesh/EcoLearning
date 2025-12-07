import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const games = [
  {
    id: "nature-shape-jumper",
    title: "Nature Shape Jumper",
    ageRange: "Ages 1-3",
    description: "Jump on colorful nature shapes! Find the sun, tree, and water. Learn shapes while having fun!",
    icon: "⭐",
    color: "from-yellow-300 to-orange-400",
    learning: "Learn basic shapes and nature association through play",
  },
  {
    id: "my-eco-home",
    title: "My Eco-Home",
    ageRange: "Ages 1-3",
    description:
      "Explore different homes! Learn about your house, animal homes, and plant homes. Everyone has a special place!",
    icon: "🏡",
    color: "from-pink-300 to-rose-400",
    learning: "Understand that homes are part of a bigger community ecosystem",
  },
  {
    id: "eco-curiosity",
    title: "Eco Curiosity Questions",
    ageRange: "Ages 1-3",
    description:
      "Wonder about nature! Why is the sky blue? What do trees do? Explore fun questions about our amazing world!",
    icon: "🤔",
    color: "from-purple-300 to-indigo-400",
    learning: "Encourage environmental thinking and natural curiosity about the world",
  },
  {
    id: "sorting-nature-waste",
    title: "Sorting Nature & Waste",
    ageRange: "Ages 1-3",
    description:
      "Sort items into the right bins! Learn to organize toys, sort colors, and put things where they belong!",
    icon: "🎯",
    color: "from-green-300 to-teal-400",
    learning: "Build early awareness of organizing, categorizing, and responsible waste handling",
  },
  {
    id: "nature-feelings",
    title: "How Does Nature Feel?",
    ageRange: "Ages 1-3",
    description:
      "Look at nature scenes and guess how they feel! Is the tree happy? Is the bird scared? Learn about emotions!",
    icon: "😊",
    color: "from-amber-300 to-yellow-400",
    learning: "Identify emotions through environmental scenes and animal behavior",
  },
  {
    id: "eco-weather-tracker",
    title: "Eco Weather Tracker",
    ageRange: "Age 4",
    description: "Track the weather every day! Learn how sun, rain, wind, and clouds help plants and animals grow!",
    icon: "🌤️",
    color: "from-blue-300 to-cyan-400",
    learning: "Learn how weather affects plants, animals, and water in nature",
  },
  {
    id: "habitat-hunt",
    title: "Habitat Hunt",
    ageRange: "Age 4",
    description:
      "Explore different habitat layers! Find animals in the ground, shrubs, trees, and sky. Big or small? High or low?",
    icon: "🔭",
    color: "from-lime-300 to-green-400",
    learning: "Observe different ecosystem layers from ground to sky",
  },
  {
    id: "eco-storytime",
    title: "Eco Storytime",
    ageRange: "Age 4",
    description:
      "Tell stories about nature! Watch a tree grow, help a bird find food, and follow a raindrop on its journey!",
    icon: "📖",
    color: "from-violet-300 to-purple-400",
    learning: "Encourage imagination about natural cycles and ecosystem stories",
  },
  {
    id: "i-spy-nature",
    title: "I Spy in Nature",
    ageRange: "Age 4",
    description:
      "Play I Spy with nature clues! Find green things that help us breathe, brown things animals live in, and more!",
    icon: "👀",
    color: "from-teal-300 to-cyan-400",
    learning: "Use observation skills and phonics to identify nature elements",
  },
  {
    id: "animal-movement",
    title: "Animal Movement Play",
    ageRange: "Age 4",
    description: "Move like animals! Stretch like a tree, jump like a frog, flap like a bird, and wiggle like a worm!",
    icon: "🐸",
    color: "from-orange-300 to-red-400",
    learning: "Develop motor skills and connect with animal behavior through movement",
  },
  {
    id: "nature-color-hunt",
    title: "Nature Color Hunt",
    ageRange: "Age 5",
    description:
      "Find nature objects by color! Search for green leaves, brown sticks, blue water, and more! A scavenger hunt adventure!",
    icon: "🎨",
    color: "from-red-300 to-pink-400",
    learning: "Teaches observation skills, color recognition, and nature's diversity through scavenger hunt activities",
  },
  {
    id: "eco-simon-says",
    title: "Eco Simon Says",
    ageRange: "Age 5",
    description:
      "Follow eco-friendly commands! Plant seeds, recycle trash, fly like butterflies, and save the planet! Will you listen carefully?",
    icon: "👂",
    color: "from-indigo-300 to-purple-400",
    learning: "Teaches listening skills, environmental habits, and decision-making through interactive play commands",
  },
  {
    id: "climate-freeze-dance",
    title: "Climate Freeze Dance",
    ageRange: "Age 5",
    description:
      "Dance to the music! When it stops, freeze in special poses! Be a tree in the wind, a melting ice block, or a falling raindrop!",
    icon: "💃",
    color: "from-blue-300 to-indigo-400",
    learning: "Teaches climate and weather concepts through movement, body awareness, and creative freeze poses",
  },
  {
    id: "eco-store-game",
    title: "Eco Store Game",
    ageRange: "Age 5",
    description:
      "Run your eco store! Buy and sell fruits, reusable bags, water bottles, and seeds. Make sustainable choices!",
    icon: "🛒",
    color: "from-green-300 to-lime-400",
    learning: "Learn about sustainable choices, where items come from, and the importance of eco-friendly shopping",
  },
  {
    id: "nature-rhythm-beats",
    title: "Nature Rhythm Beats",
    ageRange: "Age 5",
    description:
      "Create rhythm patterns inspired by nature! Clap like thunder, tap like woodpeckers, and drum like rain. Listen and repeat!",
    icon: "🥁",
    color: "from-amber-300 to-orange-400",
    learning:
      "Develop listening skills, rhythm recognition, and understanding of natural sounds through interactive patterns",
  },
  {
    id: "carbon-footprint",
    title: "Carbon Footprint Challenge",
    ageRange: "Grades 6-9",
    description: "Calculate your daily carbon footprint and learn how to reduce it through lifestyle choices",
    icon: "👣",
    color: "from-green-400 to-emerald-500",
    learning: "Understand personal carbon emissions from transport, food, energy use, and shopping",
  },
  {
    id: "ecosystem-builder",
    title: "Ecosystem Builder",
    ageRange: "Grades 6-9",
    description: "Build a balanced ecosystem by adding plants, herbivores, and carnivores in the right proportions",
    icon: "🌲",
    color: "from-emerald-400 to-teal-500",
    learning: "Learn about food chains, predator-prey relationships, and ecosystem balance",
  },
  {
    id: "ocean-rescue",
    title: "Ocean Rescue Mission",
    ageRange: "Grades 6-9",
    description: "Clean up ocean pollution while managing time, resources, and marine life protection",
    icon: "🐋",
    color: "from-blue-400 to-cyan-500",
    learning: "Discover ocean pollution sources, marine ecosystems, and conservation strategies",
  },
  {
    id: "renewable-power",
    title: "Renewable Power Plant",
    ageRange: "Grades 6-9",
    description: "Design a city's power grid using solar, wind, and hydro energy to meet demand sustainably",
    icon: "⚡",
    color: "from-yellow-400 to-amber-500",
    learning: "Compare renewable energy sources, efficiency, costs, and environmental benefits",
  },
  {
    id: "recycling-master",
    title: "Recycling Master",
    ageRange: "Grades 6-9",
    description: "Sort waste correctly and learn what happens to recycled materials in the recycling process",
    icon: "♻️",
    color: "from-lime-400 to-green-500",
    learning: "Master waste sorting, recycling processes, and reducing landfill waste",
  },
  {
    id: "climate-detective",
    title: "Climate Detective",
    ageRange: "Grades 6-9",
    description: "Analyze weather data, temperature trends, and evidence to solve climate change mysteries",
    icon: "🔍",
    color: "from-indigo-400 to-purple-500",
    learning: "Read graphs, interpret climate data, and understand global warming evidence",
  },
  {
    id: "water-cycle",
    title: "Water Cycle Adventure",
    ageRange: "Grades 6-9",
    description: "Follow a water drop's journey through evaporation, condensation, and precipitation cycles",
    icon: "💧",
    color: "from-cyan-400 to-blue-500",
    learning: "Understand the water cycle, freshwater scarcity, and water conservation importance",
  },
  {
    id: "endangered-species",
    title: "Endangered Species Rescue",
    ageRange: "Grades 6-9",
    description: "Protect endangered animals by managing habitats, fighting poaching, and restoring populations",
    icon: "🐼",
    color: "from-pink-400 to-rose-500",
    learning: "Learn about biodiversity, habitat loss, conservation efforts, and species protection",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100">
      <header className="px-4 py-6 md:px-8 border-b border-green-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="lg" className="rounded-xl text-lg gap-2 text-gray-700 hover:bg-green-100">
              <ArrowLeft className="w-5 h-5" />
              Back Home
            </Button>
          </Link>
          <div className="mt-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Eco Games
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Play games, learn about our planet, and become an environmental hero!
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`} className="block group">
              <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-green-200 hover:border-green-400 h-full">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {game.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h3>
                <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {game.ageRange}
                </div>
                <p className="text-gray-600 mb-3 leading-relaxed">{game.description}</p>
                <p className="text-sm text-green-600 font-medium">📚 {game.learning}</p>
                <div className="mt-4">
                  <Button className="w-full rounded-xl text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg">
                    Play Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
