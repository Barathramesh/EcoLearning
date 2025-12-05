import Game from '../models/Game.js';

// Default games to seed
const defaultGames = [
  {
    title: "EcoQuest Adventure",
    description: "Explore different ecosystems and learn about biodiversity",
    difficulty: "Easy",
    duration: "15 min",
    points: 50,
    icon: "Leaf",
    category: "Ecosystems",
    route: "/student/ecoquest-adventure",
    allowedClasses: [],
    order: 1
  },
  {
    title: "Ocean Cleanup Hero",
    description: "Clean up the ocean and save marine life",
    difficulty: "Medium",
    duration: "20 min",
    points: 75,
    icon: "Droplets",
    category: "Ocean Conservation",
    route: "/student/ocean-cleanup-hero",
    allowedClasses: [],
    order: 2
  },
  {
    title: "Solar Power Master",
    description: "Build and manage renewable energy systems",
    difficulty: "Hard",
    duration: "30 min",
    points: 100,
    icon: "Sun",
    category: "Energy",
    route: "/student/solar-power-master",
    allowedClasses: [],
    order: 3
  },
  {
    title: "Recycling Wizard",
    description: "Sort waste and learn about proper recycling",
    difficulty: "Easy",
    duration: "10 min",
    points: 40,
    icon: "Recycle",
    category: "Waste Management",
    route: "/student/recycling-wizard",
    allowedClasses: [],
    order: 4
  },
  {
    title: "Save the Trees",
    description: "Plant and manage your own forest while learning about conservation",
    difficulty: "Medium",
    duration: "25 min",
    points: 80,
    icon: "TreePine",
    category: "Forest Conservation",
    route: "/student/save-the-trees",
    allowedClasses: [],
    order: 5
  },
  {
    title: "Wind Farm Engineer",
    description: "Design and build efficient wind energy farms",
    difficulty: "Hard",
    duration: "35 min",
    points: 120,
    icon: "Wind",
    category: "Renewable Energy",
    route: "/student/wind-farm-engineer",
    allowedClasses: [],
    order: 6
  },
  {
    title: "Mountain Ranger",
    description: "Protect mountain ecosystems and wildlife habitats",
    difficulty: "Medium",
    duration: "22 min",
    points: 85,
    icon: "Mountain",
    category: "Wildlife Protection",
    route: "/student/mountain-ranger",
    allowedClasses: [],
    order: 7
  },
  {
    title: "Aquatic Life Guardian",
    description: "Restore coral reefs and protect marine biodiversity",
    difficulty: "Hard",
    duration: "28 min",
    points: 110,
    icon: "Fish",
    category: "Marine Biology",
    route: "/student/aquatic-life-guardian",
    allowedClasses: [],
    order: 8
  },
  {
    title: "Arctic Rescue Mission",
    description: "Save polar animals and understand climate change impacts",
    difficulty: "Medium",
    duration: "18 min",
    points: 70,
    icon: "Snowflake",
    category: "Climate Change",
    route: "/student/arctic-rescue-mission",
    allowedClasses: [],
    order: 9
  },
  {
    title: "Electric Vehicle City",
    description: "Build sustainable transportation systems",
    difficulty: "Hard",
    duration: "40 min",
    points: 130,
    icon: "Zap",
    category: "Sustainable Transport",
    route: "/student/electric-vehicle-city",
    allowedClasses: [],
    order: 10
  },
  {
    title: "Global Weather Detective",
    description: "Track weather patterns and predict climate changes",
    difficulty: "Medium",
    duration: "24 min",
    points: 90,
    icon: "Globe",
    category: "Climate Science",
    route: "/student/global-weather-detective",
    allowedClasses: [],
    order: 11
  },
  {
    title: "Pollinator Paradise",
    description: "Create gardens to save bees and butterflies",
    difficulty: "Easy",
    duration: "12 min",
    points: 55,
    icon: "Flower2",
    category: "Biodiversity",
    route: "/student/pollinator-paradise",
    allowedClasses: [],
    order: 12
  },
  {
    title: "Ecosystem Food Web",
    description: "Balance predator and prey relationships in nature",
    difficulty: "Hard",
    duration: "32 min",
    points: 115,
    icon: "Bug",
    category: "Ecology",
    route: "/student/ecosystem-food-web",
    allowedClasses: [],
    order: 13
  },
  {
    title: "Carbon Footprint Hunter",
    description: "Track and reduce carbon emissions in daily life",
    difficulty: "Medium",
    duration: "20 min",
    points: 75,
    icon: "Leaf",
    category: "Carbon Management",
    route: "/student/carbon-footprint-hunter",
    allowedClasses: [],
    order: 14
  },
  {
    title: "Green Chemistry Lab",
    description: "Create eco-friendly products using safe chemicals",
    difficulty: "Hard",
    duration: "45 min",
    points: 140,
    icon: "Droplets",
    category: "Green Chemistry",
    route: "/student/green-chemistry-lab",
    allowedClasses: [],
    order: 15
  }
];

// Get all games (admin)
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ order: 1, title: 1 });
    res.status(200).json({
      success: true,
      games
    });
  } catch (error) {
    console.error('Get all games error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games'
    });
  }
};

// Get games for a specific class (student)
export const getGamesForClass = async (req, res) => {
  try {
    const { studentClass } = req.params;
    
    if (!studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Student class is required'
      });
    }

    const games = await Game.getGamesForClass(studentClass);
    
    res.status(200).json({
      success: true,
      games
    });
  } catch (error) {
    console.error('Get games for class error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games'
    });
  }
};

// Create a new game (admin)
export const createGame = async (req, res) => {
  try {
    const gameData = req.body;
    
    // Check if game with same route exists
    const existingGame = await Game.findOne({ route: gameData.route });
    if (existingGame) {
      return res.status(400).json({
        success: false,
        message: 'A game with this route already exists'
      });
    }

    const game = await Game.create(gameData);
    
    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      game
    });
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create game'
    });
  }
};

// Update a game (admin)
export const updateGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const updateData = req.body;
    
    const game = await Game.findByIdAndUpdate(
      gameId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Game updated successfully',
      game
    });
  } catch (error) {
    console.error('Update game error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update game'
    });
  }
};

// Delete a game (admin)
export const deleteGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    
    const game = await Game.findByIdAndDelete(gameId);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Game deleted successfully'
    });
  } catch (error) {
    console.error('Delete game error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete game'
    });
  }
};

// Update allowed classes for a game (admin)
export const updateGameClasses = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { allowedClasses } = req.body;
    
    const game = await Game.findByIdAndUpdate(
      gameId,
      { allowedClasses, updatedAt: new Date() },
      { new: true }
    );
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Game classes updated successfully',
      game
    });
  } catch (error) {
    console.error('Update game classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update game classes'
    });
  }
};

// Bulk update classes for multiple games
export const bulkUpdateGameClasses = async (req, res) => {
  try {
    const { updates } = req.body; // Array of { gameId, allowedClasses }
    
    const results = await Promise.all(
      updates.map(async ({ gameId, allowedClasses }) => {
        return Game.findByIdAndUpdate(
          gameId,
          { allowedClasses, updatedAt: new Date() },
          { new: true }
        );
      })
    );
    
    res.status(200).json({
      success: true,
      message: 'Games updated successfully',
      games: results.filter(g => g !== null)
    });
  } catch (error) {
    console.error('Bulk update game classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update games'
    });
  }
};

// Seed default games (admin)
export const seedGames = async (req, res) => {
  try {
    // Check if games already exist
    const existingCount = await Game.countDocuments();
    
    if (existingCount > 0) {
      return res.status(400).json({
        success: false,
        message: `${existingCount} games already exist. Delete them first to reseed.`
      });
    }

    const games = await Game.insertMany(defaultGames);
    
    res.status(201).json({
      success: true,
      message: `${games.length} games seeded successfully`,
      games
    });
  } catch (error) {
    console.error('Seed games error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed games'
    });
  }
};

// Get available classes (for admin dropdown)
export const getAvailableClasses = async (req, res) => {
  try {
    // Common class formats
    const classes = [
      '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'
    ];
    
    res.status(200).json({
      success: true,
      classes
    });
  } catch (error) {
    console.error('Get available classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch classes'
    });
  }
};

// Toggle game active status
export const toggleGameStatus = async (req, res) => {
  try {
    const { gameId } = req.params;
    
    const game = await Game.findById(gameId);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    game.isActive = !game.isActive;
    game.updatedAt = new Date();
    await game.save();
    
    res.status(200).json({
      success: true,
      message: `Game ${game.isActive ? 'activated' : 'deactivated'} successfully`,
      game
    });
  } catch (error) {
    console.error('Toggle game status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle game status'
    });
  }
};
