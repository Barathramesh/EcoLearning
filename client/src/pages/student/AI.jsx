import Navigation from "@/components/Navigation";
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Send,
  ImageIcon,
  X,
  Loader2,
  Trash2,
  Bot,
  Leaf,
  Sun,
  Waves,
  TreePine,
  Bird,
  Recycle,
  Sparkles,
  MessageSquare,
  Zap,
  Globe,
  Heart
  Globe,
  Zap,
  Star,
  ThumbsUp,
  ImageIcon,
  X,
  Loader2,
  Trash2,
  RefreshCw
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AI = () => {
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [aiStats, setAiStats] = useState({
    questionsAsked: 0,
    topicsExplored: [],
    learningStreak: 0,
    totalInteractions: 0
  });
  const [popularTopics, setPopularTopics] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Gemini API configuration
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Quick suggestion chips
  const quickSuggestions = [
    { text: "Climate change", icon: Sun },
    { text: "Rainforests", icon: TreePine },
    { text: "Solar energy", icon: Sparkles },
    { text: "Ocean life", icon: Waves },
    { text: "Recycling", icon: Recycle },
    { text: "Wildlife", icon: Bird },
  ];

  // Environmental science topics for validation
  const environmentalKeywords = [
    'climate', 'weather', 'temperature', 'global warming', 'greenhouse', 'carbon', 'co2',
    'ecosystem', 'biodiversity', 'species', 'habitat', 'wildlife', 'animal', 'plant', 'tree', 'forest',
    'ocean', 'sea', 'water', 'river', 'lake', 'marine', 'coral', 'fish', 'pollution',
    'renewable', 'solar', 'wind', 'energy', 'electricity', 'power', 'sustainable',
    'recycle', 'waste', 'plastic', 'environment', 'nature', 'conservation', 'ecology',
    'air quality', 'ozone', 'atmosphere', 'deforestation', 'rainforest', 'earth', 'planet',
    'agriculture', 'farming', 'organic', 'soil', 'erosion', 'drought', 'flood',
    'endangered', 'extinct', 'protect', 'preserve', 'green', 'eco', 'natural',
    'photosynthesis', 'oxygen', 'nitrogen', 'cycle', 'food chain', 'food web',
    'biome', 'tundra', 'desert', 'grassland', 'wetland', 'mangrove', 'glacier', 'ice',
    'hurricane', 'tornado', 'earthquake', 'volcano', 'disaster', 'tsunami'
  // Environmental science topics for validation
  const environmentalKeywords = [
    'climate', 'weather', 'temperature', 'global warming', 'greenhouse', 'carbon', 'co2',
    'ecosystem', 'biodiversity', 'species', 'habitat', 'wildlife', 'animal', 'plant', 'tree', 'forest',
    'ocean', 'sea', 'water', 'river', 'lake', 'marine', 'coral', 'fish', 'pollution',
    'renewable', 'solar', 'wind', 'energy', 'electricity', 'power', 'sustainable',
    'recycle', 'waste', 'plastic', 'environment', 'nature', 'conservation', 'ecology',
    'air quality', 'ozone', 'atmosphere', 'deforestation', 'rainforest', 'earth', 'planet',
    'agriculture', 'farming', 'organic', 'soil', 'erosion', 'drought', 'flood',
    'endangered', 'extinct', 'protect', 'preserve', 'green', 'eco', 'natural',
    'photosynthesis', 'oxygen', 'nitrogen', 'cycle', 'food chain', 'food web',
    'biome', 'tundra', 'desert', 'grassland', 'wetland', 'mangrove', 'glacier', 'ice',
    'hurricane', 'tornado', 'earthquake', 'volcano', 'disaster', 'tsunami'
  ];

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
      title: "Environmental Focus",
      description: "Specialized in environmental science topics only",
      icon: Globe,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Student-Friendly",
      description: "Simple explanations suitable for all ages",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Image Analysis",
      description: "Upload nature photos for AI analysis",
      icon: ImageIcon,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Chat History",
      description: "Your conversations are saved for reference",
      icon: MessageCircle,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  // Load student data and chat history on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setStudentData(parsedData);
      loadChatHistory(parsedData.id);
    } else {
      setIsLoadingHistory(false);
      setChatHistory([{
        type: "ai",
        message: "👋 Hi! I'm EcoBot, your environmental science tutor. Ask me anything about nature, climate, animals, or the environment!",
      loadAIStats(parsedData.id);
      loadPopularTopics();
    } else {
      setIsLoadingHistory(false);
      // Add welcome message for non-logged in users
      setChatHistory([{
        type: "ai",
        message: "👋 Hi! I'm EcoBot, your environmental science tutor. Please log in to save your chat history and track your learning progress!",
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const loadChatHistory = async (studentId) => {
    try {
      setIsLoadingHistory(true);
      const response = await axios.get(`${API_URL}/ai-chat/history/${studentId}`);
      
      if (response.data.length === 0) {
        const welcomeMessage = {
          type: "ai",
          message: "🌿 Hi! I'm EcoBot, your friendly environmental science tutor!\n\nI can help you learn about climate, plants, animals, oceans, renewable energy, and more!\n\n📸 You can also upload nature photos for me to analyze!\n\nWhat would you like to learn about? 🌍",
          timestamp: new Date().toISOString()
        };
        setChatHistory([welcomeMessage]);
        // Add welcome message for new users
        const welcomeMessage = {
          type: "ai",
          message: "🌿 Hi! I'm EcoBot, your friendly environmental science tutor!\n\n🎯 I can help you learn about:\n• Climate change & global warming\n• Plants, animals & ecosystems\n• Renewable energy (solar, wind)\n• Ocean & marine life\n• Recycling & sustainability\n• And much more!\n\n📸 You can also upload nature photos for me to analyze!\n\nAsk me anything about the environment! 🌍",
          timestamp: new Date().toISOString()
        };
        setChatHistory([welcomeMessage]);
        // Save welcome message
        await saveChatMessage(studentId, 'ai', welcomeMessage.message, 'welcome');
      } else {
        setChatHistory(response.data);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setChatHistory([{
        type: "ai",
        message: "🌿 Hi! I'm EcoBot. Ask me anything about the environment!",
        message: "🌿 Hi! I'm EcoBot, your environmental science tutor. Ask me anything about nature, climate, animals, plants, or the environment!",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const loadAIStats = async (studentId) => {
    try {
      const response = await axios.get(`${API_URL}/ai-chat/stats/${studentId}`);
      setAiStats(response.data);
    } catch (error) {
      console.error('Error loading AI stats:', error);
    }
  };

  const loadPopularTopics = async () => {
    try {
      const response = await axios.get(`${API_URL}/ai-chat/popular-topics`);
      setPopularTopics(response.data);
    } catch (error) {
      console.error('Error loading popular topics:', error);
      setPopularTopics([
        { topic: 'Climate Change', interactions: 0, rating: '4.8' },
        { topic: 'Renewable Energy', interactions: 0, rating: '4.9' },
        { topic: 'Ocean Conservation', interactions: 0, rating: '4.7' },
        { topic: 'Ecosystems', interactions: 0, rating: '4.6' }
      ]);
    }
  };

  const saveChatMessage = async (studentId, type, message, category = 'general', hasImage = false) => {
    try {
      await axios.post(`${API_URL}/ai-chat/message`, {
        studentId,
        type,
        message,
        category,
        hasImage
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const clearChatHistory = async () => {
    if (!studentData) return;
    
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      try {
        await axios.delete(`${API_URL}/ai-chat/history/${studentData.id}`);
        const welcomeMessage = {
          type: "ai",
          message: "🌿 Chat history cleared! I'm EcoBot, ready to help you learn about environmental science. What would you like to know?",
          timestamp: new Date().toISOString()
        };
        setChatHistory([welcomeMessage]);
        await saveChatMessage(studentData.id, 'ai', welcomeMessage.message, 'welcome');
      } catch (error) {
        console.error('Error clearing chat history:', error);
      }
    }
  };

  // Check if query is related to environmental science
  const isEnvironmentalQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    return environmentalKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  // Detect category from query
  const detectCategory = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('climate') || lowerQuery.includes('warming') || lowerQuery.includes('temperature') || lowerQuery.includes('weather')) {
      return 'Climate';
    }
    if (lowerQuery.includes('solar') || lowerQuery.includes('wind') || lowerQuery.includes('renewable') || lowerQuery.includes('energy')) {
      return 'Energy';
    }
    if (lowerQuery.includes('ocean') || lowerQuery.includes('sea') || lowerQuery.includes('marine') || lowerQuery.includes('coral') || lowerQuery.includes('fish')) {
      return 'Marine';
    }
    if (lowerQuery.includes('forest') || lowerQuery.includes('tree') || lowerQuery.includes('plant') || lowerQuery.includes('ecosystem') || lowerQuery.includes('rainforest')) {
      return 'Ecosystems';
    }
    if (lowerQuery.includes('animal') || lowerQuery.includes('species') || lowerQuery.includes('wildlife') || lowerQuery.includes('bird')) {
      return 'Wildlife';
    }
    if (lowerQuery.includes('recycle') || lowerQuery.includes('waste') || lowerQuery.includes('plastic') || lowerQuery.includes('pollution')) {
      return 'Sustainability';
    }
    return 'Environment';
  };

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Format AI message
  const formatAIMessage = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-2" />;
      
      // Headers
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        return <h3 key={index} className="font-semibold text-green-600 mt-2 mb-1">{trimmedLine.slice(2, -2)}</h3>;
      }
      
      // Bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        return (
          <div key={index} className="flex items-start gap-2 ml-2 my-1">
            <span className="text-green-500 mt-0.5">•</span>
            <span className="text-gray-600">{formatInlineText(trimmedLine.slice(1).trim())}</span>
          </div>
        );
      }
      
      // Numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={index} className="flex items-start gap-2 ml-2 my-1">
            <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">{numberedMatch[1]}</span>
            <span className="text-gray-600">{formatInlineText(numberedMatch[2])}</span>
          </div>
        );
      }
      
      // Emoji lines
      const emojiMatch = trimmedLine.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
      if (emojiMatch) {
        return <div key={index} className="my-1 text-gray-700">{trimmedLine}</div>;
      }
      
      return <p key={index} className="text-gray-600 my-1">{formatInlineText(trimmedLine)}</p>;
    });
  };

  const formatInlineText = (text) => {
    if (!text) return text;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-medium text-green-600">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format AI message with attractive styling
  const formatAIMessage = (text) => {
    if (!text) return null;
    
    // Split by lines and process
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Empty line - add spacing
      if (!trimmedLine) {
        return <div key={index} className="h-2" />;
      }
      
      // Headers with ** or ##
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const headerText = trimmedLine.slice(2, -2);
        return (
          <h3 key={index} className="font-bold text-emerald-700 mt-3 mb-2 text-base flex items-center gap-2">
            {headerText}
          </h3>
        );
      }
      
      // Bullet points with •, -, or *
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        const bulletText = trimmedLine.slice(1).trim();
        return (
          <div key={index} className="flex items-start gap-2 ml-2 my-1">
            <span className="text-emerald-500 mt-0.5">●</span>
            <span className="text-gray-700">{formatInlineText(bulletText)}</span>
          </div>
        );
      }
      
      // Numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={index} className="flex items-start gap-2 ml-2 my-1">
            <span className="bg-emerald-100 text-emerald-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {numberedMatch[1]}
            </span>
            <span className="text-gray-700">{formatInlineText(numberedMatch[2])}</span>
          </div>
        );
      }
      
      // Lines with emojis at start (topic headers)
      const emojiMatch = trimmedLine.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
      if (emojiMatch) {
        return (
          <div key={index} className="flex items-start gap-2 my-2 bg-gradient-to-r from-emerald-50 to-transparent p-2 rounded-lg">
            <span className="text-lg">{emojiMatch[0]}</span>
            <span className="text-gray-800 font-medium">{formatInlineText(trimmedLine.slice(emojiMatch[0].length).trim())}</span>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 my-1 leading-relaxed">
          {formatInlineText(trimmedLine)}
        </p>
      );
    });
  };

  // Format inline text (bold, italic, etc.)
  const formatInlineText = (text) => {
    if (!text) return text;
    
    // Handle **bold** text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-emerald-700">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  // Send message to Gemini API
  const sendToGemini = async (message, imageFile = null) => {
    try {
      setIsLoading(true);
      
      // Check if it's an environmental query (skip check for image analysis)
      if (!imageFile && message.trim() && !isEnvironmentalQuery(message)) {
        return "🌿 I'm EcoBot, specialized in environmental science! I can only help with topics like:\n\n🌍 Climate change & global warming\n🌳 Plants, trees & forests\n🐾 Animals & wildlife\n🌊 Oceans & marine life\n☀️ Solar, wind & renewable energy\n♻️ Recycling & sustainability\n🌱 Ecosystems & biodiversity\n\nPlease ask me something about the environment, nature, or ecology! 🌿";
      }
      
      let requestBody = {
        contents: [{
          parts: []
        }]
      };

      // Create student-friendly prompt
      const studentFriendlyPrompt = `You are EcoBot, a friendly environmental science tutor for students. 
      
IMPORTANT RULES:
1. ONLY answer questions about environmental science, nature, ecology, climate, animals, plants, oceans, renewable energy, and sustainability.
2. If the question is NOT about environmental topics, politely redirect the student to ask about environmental science.
3. Use simple, easy-to-understand language suitable for students.
4. Include fun facts with emojis to make learning engaging.
5. Break down complex topics into simple explanations.
6. Use bullet points and short paragraphs for readability.
7. Encourage curiosity and further learning.

Student's question: ${message}

Please provide a helpful, educational, and engaging response about environmental science:`;

      // Add text part
      if (message.trim()) {
        requestBody.contents[0].parts.push({
          text: studentFriendlyPrompt
        });
      }

      if (imageFile) {
        const base64Image = await convertToBase64(imageFile);
        requestBody.contents[0].parts.push({
          inline_data: { mime_type: imageFile.type, data: base64Image }
        });
        
        if (!message.trim()) {
          requestBody.contents[0].parts.push({
            text: `You are EcoBot, a friendly environmental science tutor. Analyze this image from an environmental science perspective.

Please:
1. Identify any plants, animals, ecosystems, or environmental features
2. Provide fun educational facts about what you see
3. Use simple language that students can understand
4. Include emojis to make it engaging
5. If it's not a nature/environment image, politely explain that you can only analyze nature and environmental images

Provide an engaging and educational analysis:`
          });
        }
      }

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't process your request. Please try asking about environmental science topics!";
      
      return aiResponse;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "🌿 I'm having trouble connecting right now. Please check your internet connection and try again. In the meantime, feel free to explore the quick questions below!";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() || selectedImage) {
      const messageText = chatInput || (selectedImage ? "🖼️ Please analyze this image" : "");
      const category = selectedImage ? 'AI Vision' : detectCategory(messageText);
      const hasImage = !!selectedImage;
      
      // Add user message to chat
      const userMessage = {
        type: "user",
        message: messageText,
        timestamp: new Date().toISOString(),
        image: imagePreview,
        category
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      // Save user message to database
      if (studentData) {
        await saveChatMessage(studentData.id, 'user', messageText, category, hasImage);
      }
      
      // Clear input immediately
      const currentInput = chatInput;
      const currentImage = selectedImage;
      setChatInput("");
      removeImage();
      
      // Get AI response
      const aiResponse = await sendToGemini(currentInput, currentImage);
      
      const aiMessage = {
        type: "ai",
        message: aiResponse,
        timestamp: new Date().toISOString(),
        category
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      
      // Save AI message to database
      if (studentData) {
        await saveChatMessage(studentData.id, 'ai', aiResponse, category);
        // Reload stats
        loadAIStats(studentData.id);
        loadPopularTopics();
      }
    }
  };

  const handleQuickQuestion = (question) => {
    if (question === "Analyze my nature photo") {
      fileInputRef.current?.click();
    } else {
      setChatInput(question);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-gray-600">Your friendly environmental science learning companion 🌿</p>
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
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Chat with EcoBot
                    </CardTitle>
                    {studentData && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearChatHistory}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                {/* Chat Messages */}
                <CardContent className="flex-1 flex flex-col min-h-0">
                  {isLoadingHistory ? (
                    <div className="flex-1 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                      <span className="ml-2 text-gray-600">Loading chat history...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2" style={{ maxHeight: 'calc(100% - 120px)' }} ref={chatContainerRef}>
                        {chatHistory.map((message, index) => (
                          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.type === 'ai' && (
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl break-words shadow-sm ${
                              message.type === 'user' 
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-3' 
                                : 'bg-white border border-gray-100 p-4'
                            }`}>
                              {message.image && (
                                <div className="mb-3">
                                  <img 
                                    src={message.image} 
                                    alt="Uploaded" 
                                    className="max-w-full h-auto rounded-xl border-2 border-white shadow-md"
                                    style={{ maxHeight: '150px', maxWidth: '200px' }}
                                  />
                                </div>
                              )}
                              {message.type === 'ai' ? (
                                <div className="text-sm">
                                  {formatAIMessage(message.message)}
                                </div>
                              ) : (
                                <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                              )}
                              <p className={`text-xs mt-2 ${
                                message.type === 'user' ? 'text-emerald-100' : 'text-gray-400'
                              }`}>
                                {formatTimestamp(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white border border-gray-100 text-gray-800 p-4 rounded-2xl shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-sm text-gray-600">EcoBot is thinking...</span>
                              </div>
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
                              <p className="text-xs text-emerald-600 leading-relaxed">EcoBot will analyze this nature photo</p>
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
                            placeholder="Ask about climate, animals, plants, oceans..."
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
                            <Globe className="w-3 h-3 text-emerald-500" />
                            <span>Environmental Science Only</span>
                            <TreePine className="w-3 h-3 text-green-500" />
                          </p>
                        </div>
                      </div>
                    </>
                  )}
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
                    {popularTopics.map((topic, index) => (
                      <div 
                        key={index} 
                        className="group relative overflow-hidden p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:from-emerald-50 hover:to-cyan-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                        onClick={() => setChatInput(`Tell me about ${topic.topic}`)}
                      >
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

              {/* Learning Insights */}
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
                          <p className="text-sm text-emerald-700 leading-relaxed">
                            {aiStats.topicsExplored.length > 0 
                              ? `You've explored ${aiStats.topicsExplored.length} different topics!`
                              : "Start asking questions to discover your strengths!"}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          <span className="text-sm text-gray-500">Typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Suggestions */}
            {chatHistory.length <= 2 && !isLoading && (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Try asking about:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-full text-sm text-gray-600 transition-colors"
                    >
                      <suggestion.icon className="w-3.5 h-3.5" />
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">Image ready</p>
                    <p className="text-xs text-gray-400">Will be analyzed</p>
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
                      <span className="font-bold text-gray-800">{aiStats.questionsAsked}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Topics Explored</span>
                      <span className="font-bold text-gray-800">{aiStats.topicsExplored.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Learning Streak</span>
                      <span className="font-bold text-gray-800">{aiStats.learningStreak} day{aiStats.learningStreak !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Interactions</span>
                      <span className="font-bold text-gray-800">{aiStats.totalInteractions}</span>
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
