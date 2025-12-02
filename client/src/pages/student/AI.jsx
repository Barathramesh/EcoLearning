import Navigation from "@/components/Navigation";
import { 
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
        await saveChatMessage(studentId, 'ai', welcomeMessage.message, 'welcome');
      } else {
        setChatHistory(response.data);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setChatHistory([{
        type: "ai",
        message: "🌿 Hi! I'm EcoBot. Ask me anything about the environment!",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoadingHistory(false);
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
    
    if (window.confirm('Clear all chat history?')) {
      try {
        await axios.delete(`${API_URL}/ai-chat/history/${studentData.id}`);
        const welcomeMessage = {
          type: "ai",
          message: "🌿 Chat cleared! What would you like to learn about?",
          timestamp: new Date().toISOString()
        };
        setChatHistory([welcomeMessage]);
        await saveChatMessage(studentData.id, 'ai', welcomeMessage.message, 'welcome');
      } catch (error) {
        console.error('Error clearing chat history:', error);
      }
    }
  };

  const isEnvironmentalQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    return environmentalKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const detectCategory = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('climate') || lowerQuery.includes('warming')) return 'Climate';
    if (lowerQuery.includes('solar') || lowerQuery.includes('energy')) return 'Energy';
    if (lowerQuery.includes('ocean') || lowerQuery.includes('marine')) return 'Marine';
    if (lowerQuery.includes('forest') || lowerQuery.includes('tree')) return 'Ecosystems';
    if (lowerQuery.includes('animal') || lowerQuery.includes('wildlife')) return 'Wildlife';
    if (lowerQuery.includes('recycle') || lowerQuery.includes('waste')) return 'Sustainability';
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

  // Format AI message with enhanced styling
  const formatAIMessage = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-3" />;
      
      // Bold headers like **Header**
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && !trimmedLine.includes('** ')) {
        return (
          <h3 key={index} className="font-semibold text-gray-800 mt-3 mb-2 text-base">
            {trimmedLine.slice(2, -2)}
          </h3>
        );
      }
      
      // Bullet points with potential bold header like "• **Title:** content" or "* **Title:** content"
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        const bulletContent = trimmedLine.slice(1).trim();
        
        // Check for bold header pattern like "**Title:** content" or "**Title** content"
        const boldHeaderMatch = bulletContent.match(/^\*\*([^*]+)\*\*:?\s*(.*)/);
        
        if (boldHeaderMatch) {
          const [, header, rest] = boldHeaderMatch;
          return (
            <div key={index} className="flex items-start gap-2 my-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div className="flex-1">
                <span className="font-semibold text-green-600">{header}:</span>
                {rest && <span className="text-gray-700"> {formatInlineText(rest)}</span>}
              </div>
            </div>
          );
        }
        
        return (
          <div key={index} className="flex items-start gap-2 my-1.5">
            <span className="text-green-500 mt-1 flex-shrink-0">•</span>
            <span className="text-gray-700">{formatInlineText(bulletContent)}</span>
          </div>
        );
      }
      
      // Numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        const content = numberedMatch[2];
        const boldHeaderMatch = content.match(/^\*\*([^*]+)\*\*:?\s*(.*)/);
        
        if (boldHeaderMatch) {
          const [, header, rest] = boldHeaderMatch;
          return (
            <div key={index} className="flex items-start gap-3 my-2">
              <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                {numberedMatch[1]}
              </span>
              <div className="flex-1">
                <span className="font-semibold text-green-600">{header}:</span>
                {rest && <span className="text-gray-700"> {formatInlineText(rest)}</span>}
              </div>
            </div>
          );
        }
        
        return (
          <div key={index} className="flex items-start gap-3 my-1.5">
            <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
              {numberedMatch[1]}
            </span>
            <span className="text-gray-700">{formatInlineText(content)}</span>
          </div>
        );
      }
      
      return <p key={index} className="text-gray-700 my-1.5 leading-relaxed">{formatInlineText(trimmedLine)}</p>;
    });
  };

  const formatInlineText = (text) => {
    if (!text) return text;
    
    // Split by bold markers **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-green-600">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Send message to Gemini API
  const sendToGemini = async (message, imageFile = null) => {
    try {
      setIsLoading(true);
      
      if (!imageFile && message.trim() && !isEnvironmentalQuery(message)) {
        return "🌿 I'm EcoBot, specialized in environmental science!\n\nI can help with topics like:\n• Climate change & weather\n• Plants, animals & ecosystems\n• Oceans & marine life\n• Renewable energy\n• Recycling & sustainability\n\nPlease ask something about the environment! 🌍";
      }
      
      let requestBody = { contents: [{ parts: [] }] };

      const studentFriendlyPrompt = `You are EcoBot, a friendly environmental science tutor for students.

RULES:
1. ONLY answer about environmental science, nature, ecology, climate, animals, plants, oceans, renewable energy, sustainability.
2. If NOT about environment, politely redirect.
3. Use simple language for students.
4. Include fun facts with emojis.
5. Use bullet points and short paragraphs.

Student's question: ${message}

Provide a helpful, educational response:`;

      if (message.trim()) {
        requestBody.contents[0].parts.push({ text: studentFriendlyPrompt });
      }

      if (imageFile) {
        const base64Image = await convertToBase64(imageFile);
        requestBody.contents[0].parts.push({
          inline_data: { mime_type: imageFile.type, data: base64Image }
        });
        
        if (!message.trim()) {
          requestBody.contents[0].parts.push({
            text: `You are EcoBot. Analyze this image from an environmental perspective.
Identify plants, animals, ecosystems, or environmental features.
Provide fun educational facts with emojis.
Use simple student-friendly language.`
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
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again!";
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "🌿 Connection issue. Please check your internet and try again!";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() || selectedImage) {
      const messageText = chatInput || (selectedImage ? "🖼 Analyze this image" : "");
      const category = selectedImage ? 'AI Vision' : detectCategory(messageText);
      const hasImage = !!selectedImage;
      
      const userMessage = {
        type: "user",
        message: messageText,
        timestamp: new Date().toISOString(),
        image: imagePreview,
        category
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      if (studentData) {
        await saveChatMessage(studentData.id, 'user', messageText, category, hasImage);
      }
      
      const currentInput = chatInput;
      const currentImage = selectedImage;
      setChatInput("");
      removeImage();
      
      const aiResponse = await sendToGemini(currentInput, currentImage);
      
      const aiMessage = {
        type: "ai",
        message: aiResponse,
        timestamp: new Date().toISOString(),
        category
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      
      if (studentData) {
        await saveChatMessage(studentData.id, 'ai', aiResponse, category);
      }
    }
  };

  const handleSuggestionClick = (text) => {
    setChatInput(`Tell me about ${text}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="student" />
      
      <main className="pt-16 h-screen flex flex-col">
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-4">
          
          {/* Single Container with Header + Chat */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            
            {/* Header inside container */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#22C55E' }}>
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      EcoBot
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }}></span>
                    </h1>
                    <p className="text-gray-500 text-xs">Environmental Science Tutor</p>
                  </div>
                </div>
                
                {studentData && (
                  <button
                    onClick={clearChatHistory}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Clear chat"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {isLoadingHistory ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading chat...</span>
                  </div>
                </div>
              ) : (
                <>
                  {chatHistory.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'ai' && (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-sm" style={{ backgroundColor: '#22C55E' }}>
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[85%] ${
                        message.type === 'user' 
                          ? 'text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm' 
                          : 'bg-white border border-gray-100 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm'
                      }`} style={message.type === 'user' ? { backgroundColor: '#22C55E' } : {}}>
                        {message.image && (
                          <div className="mb-3">
                            <img 
                              src={message.image} 
                              alt="Uploaded" 
                              className="max-w-full h-auto rounded-xl"
                              style={{ maxHeight: '180px' }}
                            />
                          </div>
                        )}
                        
                        {message.type === 'ai' ? (
                          <div className="text-sm leading-relaxed">{formatAIMessage(message.message)}</div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
                        )}
                        
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-green-100' : 'text-gray-400'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-3 flex-shrink-0 shadow-sm" style={{ backgroundColor: '#22C55E' }}>
                          <span className="text-sm font-semibold text-white">
                            {studentData?.name?.charAt(0).toUpperCase() || 'A'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#22C55E' }}>
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms', backgroundColor: '#22C55E' }}></div>
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '150ms', backgroundColor: '#22C55E' }}></div>
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '300ms', backgroundColor: '#22C55E' }}></div>
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
                  <button
                    onClick={removeImage}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="p-2 text-gray-400 hover:text-green-500 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder="Ask about climate, animals, plants..."
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                  disabled={isLoading}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!chatInput.trim() && !selectedImage)}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-2">
                Environmental topics only
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AI;