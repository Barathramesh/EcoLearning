import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Search,
  Send,
  BookOpen,
  TreePine,
  Droplets,
  Sun,
  Recycle,
  Wind,
  Globe,
  Zap,
  Star,
  ThumbsUp,
  Clock,
  ImageIcon,
  Upload,
  X,
  Loader2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AI = () => {
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatRef = useRef(null);
  
  // Initialize Gemini AI
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = useRef(null);
  const model = useRef(null);
  
  // Initialize on component mount
  useEffect(() => {
    if (GEMINI_API_KEY) {
      genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
      model.current = genAI.current.getGenerativeModel({ model: "gemini-pro" });
      console.log('Gemini AI initialized with gemini-pro model');
    } else {
      console.error('Gemini API key is missing!');
    }
  }, [GEMINI_API_KEY]);
  
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: "Hi! I'm EcoBot, your AI environmental science tutor powered by Google Gemini. Ask me anything about climate change, ecosystems, renewable energy, or upload an image for analysis!",
      timestamp: "Just now"
    }
  ]);

  const quickQuestions = [
    { question: "What causes climate change?", category: "Climate", icon: Globe },
    { question: "How do solar panels work?", category: "Energy", icon: Sun },
    { question: "Why are rainforests important?", category: "Ecosystems", icon: TreePine },
    { question: "What is ocean acidification?", category: "Marine", icon: Droplets },
    { question: "How can I reduce my carbon footprint?", category: "Action", icon: Recycle },
    { question: "Analyze my nature photo", category: "AI Vision", icon: ImageIcon }
  ];

  const aiFeatures = [
    {
      title: "Personalized Learning",
      description: "AI adapts to your learning style and pace",
      icon: Brain,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Image Analysis",
      description: "Upload photos for AI-powered environmental analysis",
      icon: ImageIcon,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Smart Recommendations",
      description: "Discover new topics based on your interests",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Real-time Answers",
      description: "Get instant responses powered by Google Gemini",
      icon: Zap,
      color: "bg-green-100 text-green-600"
    }
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const recentTopics = [
    { topic: "Carbon Cycle", interactions: 45, rating: 4.8 },
    { topic: "Renewable Energy", interactions: 67, rating: 4.9 },
    { topic: "Ocean Conservation", interactions: 33, rating: 4.7 },
    { topic: "Sustainable Agriculture", interactions: 28, rating: 4.6 }
  ];

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // Remove data:image/... prefix
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Fallback responses for common environmental topics when API is unavailable
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('climate change') || lowerMessage.includes('global warming')) {
      return "🌍 **Climate Change** is the long-term alteration of temperature and weather patterns. Human activities, particularly burning fossil fuels, have been the main driver since the 1800s.\n\n**Key Points:**\n• Global temperatures have risen about 1.1°C since pre-industrial times\n• Main causes: CO2 emissions, deforestation, industrial processes\n• Effects: Rising sea levels, extreme weather, ecosystem disruption\n• Solutions: Renewable energy, reforestation, sustainable practices\n\n*Note: I'm currently using offline mode. For more detailed answers, please try again later.*";
    }
    if (lowerMessage.includes('solar') || lowerMessage.includes('renewable energy')) {
      return "☀️ **Solar Energy** converts sunlight into electricity using photovoltaic cells.\n\n**How it works:**\n1. Sunlight hits solar panels containing silicon cells\n2. Photons knock electrons loose, creating electrical current\n3. Inverters convert DC to AC power for home use\n\n**Benefits:**\n• Clean, renewable energy source\n• Reduces electricity bills\n• Low maintenance costs\n• 25+ year lifespan\n\n*Note: I'm currently using offline mode. For more detailed answers, please try again later.*";
    }
    if (lowerMessage.includes('rainforest') || lowerMessage.includes('forest') || lowerMessage.includes('deforestation')) {
      return "🌳 **Rainforests** are vital ecosystems covering only 6% of Earth but hosting 50% of all species!\n\n**Why they matter:**\n• Produce 20% of world's oxygen\n• Absorb massive amounts of CO2\n• Home to millions of species\n• Provide medicines and resources\n\n**Threats:**\n• Deforestation for agriculture\n• Logging and mining\n• Climate change\n\n*Note: I'm currently using offline mode. For more detailed answers, please try again later.*";
    }
    if (lowerMessage.includes('ocean') || lowerMessage.includes('marine') || lowerMessage.includes('sea')) {
      return "🌊 **Ocean Conservation** is crucial as oceans cover 71% of Earth and regulate our climate.\n\n**Key Issues:**\n• Ocean acidification from CO2 absorption\n• Plastic pollution (8 million tons yearly)\n• Overfishing depleting fish stocks\n• Coral bleaching from warming waters\n\n**Solutions:**\n• Reduce plastic use\n• Support sustainable fishing\n• Marine protected areas\n• Carbon emission reduction\n\n*Note: I'm currently using offline mode. For more detailed answers, please try again later.*";
    }
    if (lowerMessage.includes('carbon footprint') || lowerMessage.includes('reduce')) {
      return "👣 **Reducing Your Carbon Footprint** - Practical steps:\n\n**Transportation:**\n• Walk, bike, or use public transit\n• Consider electric vehicles\n• Combine trips\n\n**Home:**\n• Switch to LED bulbs\n• Use renewable energy\n• Improve insulation\n\n**Lifestyle:**\n• Eat less meat\n• Buy local products\n• Reduce, reuse, recycle\n• Avoid single-use plastics\n\n*Note: I'm currently using offline mode. For more detailed answers, please try again later.*";
    }
    if (lowerMessage.includes('greenhouse') || lowerMessage.includes('co2') || lowerMessage.includes('carbon dioxide')) {
      return "🏭 **The Greenhouse Effect** is a natural process that warms Earth's surface.\n\n**How it works:**\n1. Sun's energy reaches Earth\n2. Earth absorbs and re-emits heat\n3. Greenhouse gases trap some heat\n4. This keeps Earth warm enough for life\n\n**Main Greenhouse Gases:**\n• Carbon Dioxide (CO2) - 76%\n• Methane (CH4) - 16%\n• Nitrous Oxide (N2O) - 6%\n\n**The Problem:** Human activities have increased these gases, causing enhanced warming.\n\n*Note: I'm currently using offline mode. For more detailed answers, please try again later.*";
    }
    
    return "🌱 Thank you for your environmental science question!\n\nI'm currently experiencing high demand and cannot process your request right now.\n\n**Please try again in a few minutes**, or ask about these topics:\n• Climate change & global warming\n• Renewable energy & solar power\n• Rainforests & deforestation\n• Ocean conservation\n• Reducing carbon footprint\n• Greenhouse effect\n\n*Tip: The API quota resets every minute, so please wait and try again!*";
  };

  // Send message to Gemini using SDK
  const sendToGemini = async (message, imageFile = null) => {
    try {
      setIsLoading(true);
      
      // Check if model is initialized
      if (!model.current) {
        console.error('Gemini model not initialized!');
        return getFallbackResponse(message);
      }
      
      // Start or continue chat
      if (!chatRef.current) {
        chatRef.current = model.current.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 1000,
          },
        });
      }

      let prompt = "";
      
      // Handle image if provided
      if (imageFile) {
        // For images, we need to use generateContent directly with the image
        const base64Image = await convertToBase64(imageFile);
        const imagePart = {
          inlineData: {
            data: base64Image,
            mimeType: imageFile.type,
          },
        };
        
        const textPrompt = message.trim() 
          ? `As an environmental science tutor, please answer this question about the image: ${message}`
          : "Please analyze this image from an environmental science perspective. Identify any plants, animals, ecosystems, or environmental features you can see, and provide educational information about them.";
        
        // Use generateContent for image analysis
        const result = await model.current.generateContent([textPrompt, imagePart]);
        const response = await result.response;
        return response.text();
      }
      
      // For text-only messages, use chat
      prompt = `As an environmental science tutor, please answer this question in a clear, educational way: ${message}`;
      
      console.log('Sending message to Gemini...');
      const result = await chatRef.current.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini response received');
      return text;
    } catch (error) {
      console.error('Error calling Gemini:', error);
      
      // Check if it's a quota error (429)
      if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RATE_LIMIT')) {
        return getFallbackResponse(message);
      }
      
      return getFallbackResponse(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() || selectedImage) {
      // Add user message to chat
      const userMessage = {
        type: "user",
        message: chatInput || (selectedImage ? "🖼️ Image uploaded for analysis" : ""),
        timestamp: "Just now",
        image: imagePreview
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      // Get AI response
      const aiResponse = await sendToGemini(chatInput, selectedImage);
      
      // Add AI response to chat
      const aiMessage = {
        type: "ai",
        message: aiResponse,
        timestamp: "Just now"
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      
      // Clear input and image
      setChatInput("");
      removeImage();
    }
  };

  const handleQuickQuestion = (question) => {
    if (question === "Analyze my nature photo") {
      // Trigger image upload for photo analysis
      fileInputRef.current?.click();
    } else {
      setChatInput(question);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation userType="student" />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">EcoBot AI Tutor</h1>
                <p className="text-gray-600">Powered by Google Gemini - Your intelligent environmental science learning companion</p>
              </div>
            </div>

            {/* AI Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {aiFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Chat with EcoBot
                  </CardTitle>
                </CardHeader>
                
                {/* Chat Messages */}
                <CardContent className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2" style={{ maxHeight: 'calc(100% - 120px)' }} ref={chatContainerRef}>
                    {chatHistory.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg break-words ${
                          message.type === 'user' 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.image && (
                            <div className="mb-2">
                              <img 
                                src={message.image} 
                                alt="Uploaded" 
                                className="max-w-full h-auto rounded-lg border"
                                style={{ maxHeight: '150px', maxWidth: '200px' }}
                              />
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">EcoBot is thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-emerald-50 to-cyan-50 border-2 border-emerald-200 rounded-xl shadow-sm max-w-full">
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md"
                          />
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <p className="text-xs font-semibold text-emerald-800 truncate">Image ready for analysis</p>
                          </div>
                          <p className="text-xs text-emerald-600 leading-relaxed">AI will analyze this image</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={removeImage}
                          className="h-6 w-6 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Chat Input */}
                  <div className="flex-shrink-0 space-y-2">
                    <div className="flex gap-2 p-2 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl shadow-sm">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything about environmental science..."
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                        className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400 text-sm"
                        disabled={isLoading}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors flex-shrink-0"
                      >
                        <ImageIcon className="w-4 h-4 text-emerald-600" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSendMessage} 
                        className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0"
                        disabled={isLoading || (!chatInput.trim() && !selectedImage)}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-xs text-gray-500 flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm">
                        <ImageIcon className="w-3 h-3 text-emerald-500" />
                        <span className="hidden sm:inline">Upload images for AI analysis</span>
                        <span className="sm:hidden">Upload images</span>
                        <Brain className="w-3 h-3 text-cyan-500" />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Questions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Quick Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickQuestions.map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="group h-auto p-4 text-left justify-start bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:from-emerald-50 hover:to-cyan-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
                        onClick={() => handleQuickQuestion(item.question)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-cyan-100 group-hover:from-emerald-200 group-hover:to-cyan-200 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                            <item.icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-800 group-hover:text-emerald-800 transition-colors mb-1">{item.question}</p>
                            <Badge variant="outline" className="text-xs bg-gray-100 border-gray-200 text-gray-600 group-hover:bg-emerald-100 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-colors">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Popular Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Popular Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTopics.map((topic, index) => (
                      <div key={index} className="group relative overflow-hidden p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:from-emerald-50 hover:to-cyan-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">{topic.topic}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MessageCircle className="w-3 h-3" />
                                <span>{topic.interactions} interactions</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-yellow-700">{topic.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    AI Learning Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="group relative p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <ThumbsUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                            Learning Strength
                            <Badge className="bg-emerald-200 text-emerald-800 text-xs">Strong</Badge>
                          </h4>
                          <p className="text-sm text-emerald-700 leading-relaxed">You excel at understanding ecosystem relationships!</p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                            Recommended Topic
                            <Badge className="bg-yellow-200 text-yellow-800 text-xs">New</Badge>
                          </h4>
                          <p className="text-sm text-yellow-700 leading-relaxed">Try learning about climate adaptation strategies.</p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                            Study Tip
                            <Badge className="bg-blue-200 text-blue-800 text-xs">Tip</Badge>
                          </h4>
                          <p className="text-sm text-blue-700 leading-relaxed">Connect new concepts to real-world examples for better retention.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Your AI Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Questions Asked</span>
                      <span className="font-bold text-gray-800">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Topics Explored</span>
                      <span className="font-bold text-gray-800">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Learning Streak</span>
                      <span className="font-bold text-gray-800">12 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">AI Accuracy</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold text-gray-800">96%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AI;