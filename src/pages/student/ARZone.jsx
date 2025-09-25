import React, { useState } from 'react';
import { 
  Camera, 
  Zap,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Eye,
  Clock,
  MapPin,
  TreePine,
  Fish,
  Bug,
  Scan,
  Target,
  Layers,
  Brain
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import Navigation from '../../components/Navigation';

const ARZone = () => {
  // AR Experience data
  const arExperiences = [
    {
      id: 1,
      title: "Forest Ecosystem",
      description: "Explore the intricate relationships within a forest ecosystem",
      category: "Ecosystems",
      difficulty: "Beginner",
      duration: "10-15 min",
      icon: TreePine,
      objects: [
        { type: "fauna", name: "Red Squirrel", info: "Active during day, stores nuts for winter" },
        { type: "flora", name: "Oak Tree", info: "Can live over 500 years, supports 500+ species" },
        { type: "fauna", name: "Woodpecker", info: "Creates holes that other animals use for nesting" },
        { type: "flora", name: "Fern", info: "Ancient plants that reproduce using spores" }
      ]
    },
    {
      id: 2,
      title: "Ocean Life",
      description: "Dive into marine biodiversity and underwater ecosystems",
      category: "Marine Biology", 
      difficulty: "Intermediate",
      duration: "8-12 min",
      icon: Fish,
      objects: [
        { type: "fauna", name: "Clownfish", info: "Lives symbiotically with sea anemones" },
        { type: "flora", name: "Kelp Forest", info: "Underwater forests that grow up to 60cm per day" },
        { type: "fauna", name: "Sea Turtle", info: "Migrates thousands of miles across oceans" },
        { type: "fauna", name: "Dolphin", info: "Highly intelligent marine mammals that use echolocation" }
      ]
    },
    {
      id: 3,
      title: "Pollinator Garden",
      description: "Learn about the vital role of pollinators in our ecosystem",
      category: "Botany",
      difficulty: "Beginner", 
      duration: "6-10 min",
      icon: Bug,
      objects: [
        { type: "fauna", name: "Honeybee", info: "One bee visits 2 million flowers to make 1 pound of honey" },
        { type: "flora", name: "Sunflower", info: "Follows the sun's movement across the sky" },
        { type: "fauna", name: "Butterfly", info: "Monarch butterflies migrate up to 3000 miles" },
        { type: "flora", name: "Lavender", info: "Attracts bees and has natural calming properties" }
      ]
    }
  ];

  // State management
  const [activeARExperience, setActiveARExperience] = useState(null);
  const [arPhase, setArPhase] = useState('scanning'); // scanning, tracking, interactive
  const [arProgress, setArProgress] = useState(0);
  const [arObjects, setArObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Start AR Experience
  const startARExperience = (experience) => {
    setActiveARExperience(experience);
    setArPhase('scanning');
    setArProgress(0);
    
    // Simulate AR scanning process
    const scanInterval = setInterval(() => {
      setArProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setArPhase('tracking');
          
          // After tracking, move to interactive
          setTimeout(() => {
            setArPhase('interactive');
            // Generate AR objects
            const objects = experience.objects.map((obj, index) => ({
              ...obj,
              id: index,
              x: Math.random() * 0.8 + 0.1, // Random position between 0.1 and 0.9
              y: Math.random() * 0.8 + 0.1,
              discovered: false
            }));
            setArObjects(objects);
          }, 2000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Discover AR Object
  const discoverARObject = (objectId) => {
    const updatedObjects = arObjects.map(obj => 
      obj.id === objectId ? { ...obj, discovered: true } : obj
    );
    setArObjects(updatedObjects);
    
    const discoveredObject = arObjects.find(obj => obj.id === objectId);
    setSelectedObject(discoveredObject);
  };

  // Close AR Experience
  const closeARExperience = () => {
    setActiveARExperience(null);
    setArPhase('scanning');
    setArProgress(0);
    setArObjects([]);
    setSelectedObject(null);
    setIsFullscreen(false);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation userType="student" />
      
      {/* AR Experience Modal */}
      {activeARExperience && (
        <div className={`fixed inset-0 bg-black z-50 ${isFullscreen ? 'p-0' : 'p-4'}`}>
          <div className={`relative w-full h-full ${isFullscreen ? '' : 'rounded-lg overflow-hidden'}`}>
            {/* Simulated Camera View */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="w-16 h-16 mx-auto mb-4" />
                <p>Camera view would appear here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Point your camera at your surroundings to discover AR objects
                </p>
              </div>
            </div>

            {/* AR UI Overlay */}
            <div className="absolute inset-0 flex flex-col">
              {/* Top Bar */}
              <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
                <div className="flex items-center gap-3">
                  <activeARExperience.icon className="w-6 h-6 text-white" />
                  <div>
                    <h3 className="text-white font-semibold">{activeARExperience.title}</h3>
                    <p className="text-gray-300 text-sm">{activeARExperience.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeARExperience}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* AR Phase Content */}
              <div className="flex-1 flex flex-col justify-center items-center p-4">
                {arPhase === 'scanning' && (
                  <div className="text-center text-white">
                    <div className="w-32 h-32 border-4 border-emerald-400 rounded-lg mb-4 mx-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-400 opacity-20 animate-pulse"></div>
                      <div className="absolute inset-2 border-2 border-dashed border-emerald-400 rounded animate-spin"></div>
                      <Scan className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Scanning Environment</h3>
                    <p className="text-gray-300 mb-4">Point your camera at a flat surface and move slowly</p>
                    <div className="w-64 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${arProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{arProgress}% Complete</p>
                  </div>
                )}

                {arPhase === 'tracking' && (
                  <div className="text-center text-white">
                    <div className="w-24 h-24 border-4 border-cyan-400 rounded-full mb-4 mx-auto flex items-center justify-center animate-pulse">
                      <Target className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Tracking Surface</h3>
                    <p className="text-gray-300">Hold steady while AR objects are placed...</p>
                  </div>
                )}

                {arPhase === 'interactive' && (
                  <>
                    {/* AR Objects */}
                    <div className="absolute inset-0 pointer-events-none">
                      {arObjects.map((obj) => (
                        <div
                          key={obj.id}
                          className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            left: `${obj.x * 100}%`,
                            top: `${obj.y * 100}%`,
                          }}
                          onClick={() => discoverARObject(obj.id)}
                        >
                          <div className={`relative ${obj.discovered ? 'scale-110' : 'animate-bounce'}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              obj.discovered 
                                ? 'bg-green-500 border-4 border-green-300' 
                                : 'bg-emerald-500 border-4 border-emerald-300 animate-pulse'
                            }`}>
                              {obj.type === 'fauna' ? (
                                <Bug className="w-8 h-8 text-white" />
                              ) : (
                                <TreePine className="w-8 h-8 text-white" />
                              )}
                            </div>
                            {!obj.discovered && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                            )}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                            <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {obj.discovered ? '✓ ' : ''}
                              {obj.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Discovery Instructions */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
                        <p className="text-sm">
                          Tap the glowing objects to discover them!
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          {arObjects.filter(obj => obj.discovered).length} / {arObjects.length} discovered
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Controls */}
              {arPhase === 'interactive' && (
                <div className="flex justify-center p-4">
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30"
                    >
                      <Scan className="w-4 h-4 mr-2" />
                      Recalibrate
                    </Button>
                    <Button
                      variant="secondary" 
                      className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Hints
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Object Info Modal */}
            {selectedObject && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{selectedObject.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedObject(null)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedObject.info}</p>
                  <div className="flex justify-between items-center">
                    <Badge className={selectedObject.type === 'fauna' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                      {selectedObject.type === 'fauna' ? 'Animal' : 'Plant'}
                    </Badge>
                    <Button
                      onClick={() => setSelectedObject(null)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Continue Exploring
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-emerald-600" />
              <h1 className="text-4xl font-bold text-gray-900">AR Zone</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience nature through Augmented Reality! Discover virtual plants and animals
              in your real environment using cutting-edge AR technology.
            </p>
          </div>

          {/* AR Experiences Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arExperiences.map((experience) => (
              <Card key={experience.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                      <experience.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <Badge className="bg-gray-100 text-gray-700 text-xs">
                        {experience.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{experience.title}</h3>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>Difficulty: {experience.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.objects.length} objects to discover</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => startARExperience(experience)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Start AR Experience
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Advanced AR tracking technology that responds to your movements in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3D Interactive Models</h3>
              <p className="text-gray-600">
                Highly detailed 3D models that you can interact with and learn from.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Educational Content</h3>
              <p className="text-gray-600">
                Rich educational information about each species and ecosystem.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ARZone;