import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Send,
  TreePine,
  Droplets,
  Sun,
  Recycle,
  Globe,
  Zap,
  ImageIcon,
  X,
  Loader2,
  Sparkles,
  Leaf,
  Bot
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
  
  useEffect(() => {
    if (GEMINI_API_KEY) {
      genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
      model.current = genAI.current.getGenerativeModel({ model: "gemini-pro" });
    }
  }, [GEMINI_API_KEY]);
  
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: "Hello! 🌿 I'm EcoBot, your AI environmental science companion. Ask me anything about nature, climate, energy, or upload an image to explore!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    { text: "Climate Change", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { text: "Solar Energy", icon: Sun, color: "from-yellow-500 to-orange-500" },
    { text: "Rainforests", icon: TreePine, color: "from-green-500 to-emerald-500" },
    { text: "Ocean Life", icon: Droplets, color: "from-cyan-500 to-blue-500" },
    { text: "Recycling", icon: Recycle, color: "from-emerald-500 to-teal-500" },
    { text: "Green Energy", icon: Zap, color: "from-purple-500 to-pink-500" },
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
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

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('climate change') || lowerMessage.includes('global warming')) {
      return "🌍 **Climate Change** is the long-term shift in global temperatures and weather patterns.\n\n**Key Facts:**\n• Earth has warmed 1.1°C since pre-industrial times\n• Main cause: Burning fossil fuels releases CO2\n• Effects: Melting ice, rising seas, extreme weather\n\n**What You Can Do:**\n• Use renewable energy\n• Reduce, reuse, recycle\n• Plant trees & support conservation";
    }
    if (lowerMessage.includes('solar') || lowerMessage.includes('energy')) {
      return "☀️ **Solar Energy** - Clean power from sunlight!\n\n**How It Works:**\n1. Solar panels capture sunlight\n2. Photons excite electrons in silicon cells\n3. Creates electricity for homes & businesses\n\n**Benefits:** Zero emissions, renewable, saves money long-term!";
    }
    if (lowerMessage.includes('rainforest') || lowerMessage.includes('forest') || lowerMessage.includes('tree')) {
      return "🌳 **Rainforests** are Earth's lungs!\n\n**Amazing Facts:**\n• Cover 6% of Earth, host 50% of species\n• Produce 20% of world's oxygen\n• Store massive amounts of carbon\n\n**Protect Them:** Support sustainable products & conservation efforts!";
    }
    if (lowerMessage.includes('ocean') || lowerMessage.includes('sea') || lowerMessage.includes('marine')) {
      return "🌊 **Our Oceans** - Covering 71% of Earth!\n\n**Why They Matter:**\n• Regulate global climate\n• Home to millions of species\n• Provide food for billions\n\n**Threats:** Pollution, overfishing, warming waters. Every action counts!";
    }
    if (lowerMessage.includes('recycl')) {
      return "♻️ **Recycling** transforms waste into resources!\n\n**Easy Steps:**\n• Paper, plastic, glass, metal - sort & recycle\n• Compost food scraps\n• Buy products with recycled content\n\n**Impact:** Saves energy, reduces landfill, protects wildlife!";
    }
    
    return "🌱 Great question about the environment!\n\nI'm processing many requests right now. Try asking about:\n• Climate change & global warming\n• Solar & renewable energy\n• Forests & ecosystems\n• Ocean conservation\n• Recycling tips\n\nPlease try again in a moment!";
  };

  const sendToGemini = async (message, imageFile = null) => {
    try {
      setIsLoading(true);
      
      if (!model.current) return getFallbackResponse(message);
      
      if (!chatRef.current) {
        chatRef.current = model.current.startChat({
          history: [],
          generationConfig: { maxOutputTokens: 1000 },
        });
      }

      if (imageFile) {
        const base64Image = await convertToBase64(imageFile);
        const imagePart = {
          inlineData: { data: base64Image, mimeType: imageFile.type },
        };
        const textPrompt = message.trim() 
          ? `As an environmental science tutor, answer about this image: ${message}`
          : "Analyze this image from an environmental perspective. Identify plants, animals, or environmental features.";
        
        const result = await model.current.generateContent([textPrompt, imagePart]);
        return (await result.response).text();
      }
      
      const prompt = `As an environmental science tutor, answer clearly and concisely: ${message}`;
      const result = await chatRef.current.sendMessage(prompt);
      return (await result.response).text();
    } catch (error) {
      return getFallbackResponse(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() || selectedImage) {
      const userMessage = {
        type: "user",
        message: chatInput || "📷 Image uploaded",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        image: imagePreview
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      const currentInput = chatInput;
      const currentImage = selectedImage;
      setChatInput("");
      removeImage();
      
      const aiResponse = await sendToGemini(currentInput, currentImage);
      
      setChatHistory(prev => [...prev, {
        type: "ai",
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const handleQuickPrompt = (text) => {
    setChatInput(`Tell me about ${text}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <Navigation userType="student" />
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Chatbot Container */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    EcoBot
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </h1>
                  <p className="text-emerald-100 text-sm">AI Environmental Tutor • Online</p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-white/20 text-white border-0">
                    <Leaf className="w-3 h-3 mr-1" />
                    Gemini AI
                  </Badge>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <CardContent className="p-0">
              <div 
                ref={chatContainerRef}
                className="h-[450px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50"
              >
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.type === 'ai' && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs text-emerald-400 font-medium">EcoBot</span>
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl shadow-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-br-md' 
                          : 'bg-white/10 backdrop-blur text-white border border-white/10 rounded-bl-md'
                      }`}>
                        {message.image && (
                          <div className="mb-3">
                            <img 
                              src={message.image} 
                              alt="Uploaded" 
                              className="max-w-full h-auto rounded-xl border-2 border-white/20"
                              style={{ maxHeight: '200px' }}
                            />
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur text-white p-4 rounded-2xl rounded-bl-md border border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                          </div>
                          <span className="text-sm text-emerald-300">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="px-4 py-3 bg-slate-800/80 border-t border-white/10">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${prompt.color} rounded-full text-white text-xs font-medium whitespace-nowrap hover:scale-105 transition-transform shadow-lg`}
                    >
                      <prompt.icon className="w-3 h-3" />
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="px-4 py-2 bg-slate-800/80">
                  <div className="flex items-center gap-3 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                    <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm text-emerald-300 font-medium">Image ready</p>
                      <p className="text-xs text-emerald-400/70">Will be analyzed by AI</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={removeImage} className="text-red-400 hover:text-red-300 hover:bg-red-500/20">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-slate-900/90 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 rounded-full"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about the environment..."
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                      className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full py-6 px-5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || (!chatInput.trim() && !selectedImage)}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Powered by badge */}
          <div className="flex justify-center mt-4">
            <Badge className="bg-white/10 text-white/70 border-white/20">
              <Brain className="w-3 h-3 mr-1" />
              Powered by Google Gemini AI
            </Badge>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AI;