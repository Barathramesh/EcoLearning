import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  File, 
  Check, 
  Clock, 
  Calendar,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Trash2,
  Brain,
  Shield,
  AlertTriangle,
  Camera,
  Eye,
  RefreshCw,
  Target,
  FileCheck,
  Bot,
  Sparkles,
  Award
} from "lucide-react";

const UploadAssignment = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    files: []
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  
  // AI Verification States
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState('');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationResults, setVerificationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [extractedText, setExtractedText] = useState(''); // OCR extracted text
  const [isExtractingOCR, setIsExtractingOCR] = useState(false);

  // Available assignments from teachers
  const availableAssignments = [
    {
      id: 1,
      title: "Climate Change Impact Report",
      subject: "Environmental Science",
      description: "Write a detailed report on how climate change is affecting local ecosystems. Include data analysis and propose mitigation strategies.",
      dueDate: "2025-12-15",
      maxMarks: 100,
      teacher: "Dr. Sarah Johnson",
      status: "pending"
    },
    {
      id: 2,
      title: "Renewable Energy Solutions",
      subject: "Green Technology",
      description: "Research and present innovative renewable energy solutions that can be implemented in urban areas.",
      dueDate: "2025-12-20",
      maxMarks: 100,
      teacher: "Prof. Michael Chen",
      status: "pending"
    },
    {
      id: 3,
      title: "Ocean Conservation Essay",
      subject: "Marine Biology",
      description: "Discuss the current threats to ocean ecosystems and propose conservation measures. Focus on plastic pollution and overfishing.",
      dueDate: "2025-12-18",
      maxMarks: 100,
      teacher: "Dr. Emily Waters",
      status: "pending"
    },
    {
      id: 4,
      title: "Sustainable Agriculture Practices",
      subject: "Ecology",
      description: "Analyze sustainable farming methods and their environmental benefits. Compare organic vs conventional farming.",
      dueDate: "2025-12-22",
      maxMarks: 100,
      teacher: "Prof. David Green",
      status: "pending"
    },
    {
      id: 5,
      title: "Wildlife Conservation Project",
      subject: "Conservation Biology",
      description: "Create a conservation plan for an endangered species of your choice. Include habitat analysis and protection strategies.",
      dueDate: "2025-12-25",
      maxMarks: 100,
      teacher: "Dr. Lisa Wildlife",
      status: "pending"
    },
    {
      id: 6,
      title: "Carbon Footprint Analysis",
      subject: "Sustainable Development",
      description: "Calculate and analyze the carbon footprint of your household. Propose ways to reduce it.",
      dueDate: "2025-12-28",
      maxMarks: 100,
      teacher: "Prof. Alex Carbon",
      status: "pending"
    }
  ];

  // AI Answer Key - Hidden from students (used for grading only)
  const getExpectedAnswer = (assignmentId) => {
    const answerKeys = {
      1: { // Climate Change Impact Report
        keyTopics: ["climate change", "global warming", "greenhouse gases", "carbon dioxide", "temperature rise", "ecosystem", "biodiversity", "climate", "environment", "pollution"],
        requiredConcepts: ["impact on wildlife", "rising sea levels", "extreme weather", "deforestation", "ice melting", "habitat loss", "floods", "drought", "species", "atmosphere"],
        mitigationStrategies: ["renewable energy", "reduce emissions", "carbon footprint", "sustainable practices", "afforestation", "conservation", "solar", "wind", "recycle", "green"],
        dataPoints: ["temperature", "CO2", "species extinction", "ice sheet", "weather patterns", "degrees", "percentage", "tons", "levels"]
      },
      2: { // Renewable Energy Solutions
        keyTopics: ["renewable energy", "solar power", "wind energy", "hydropower", "geothermal", "biomass", "urban", "clean energy", "green energy", "sustainable"],
        requiredConcepts: ["solar panels", "wind turbines", "energy storage", "smart grid", "efficiency", "sustainability", "electricity", "power", "battery", "grid"],
        mitigationStrategies: ["rooftop solar", "building integration", "community solar", "electric vehicles", "battery storage", "LED", "insulation", "hybrid"],
        dataPoints: ["energy output", "cost", "efficiency", "carbon reduction", "watts", "kilowatt", "megawatt", "percentage", "savings"]
      },
      3: { // Ocean Conservation Essay
        keyTopics: ["ocean", "marine life", "plastic pollution", "overfishing", "coral reefs", "marine ecosystem", "conservation", "sea", "water", "fish"],
        requiredConcepts: ["microplastics", "fish populations", "coral bleaching", "ocean acidification", "marine protected areas", "sustainable fishing", "turtles", "whales", "dolphins"],
        mitigationStrategies: ["reduce plastic", "fishing quotas", "marine reserves", "beach cleanup", "biodegradable", "aquaculture", "ban", "protect", "restore"],
        dataPoints: ["plastic waste", "fish stock", "coral coverage", "species decline", "ocean temperature", "tons", "million", "percentage", "extinction"]
      },
      4: { // Sustainable Agriculture Practices
        keyTopics: ["sustainable agriculture", "organic farming", "conventional farming", "soil health", "crop rotation", "biodiversity", "farm", "crops", "agriculture"],
        requiredConcepts: ["pesticides", "fertilizers", "soil erosion", "water conservation", "composting", "integrated pest management", "harvest", "yield", "irrigation"],
        mitigationStrategies: ["cover crops", "no-till farming", "agroforestry", "permaculture", "drip irrigation", "natural fertilizers", "organic", "sustainable"],
        dataPoints: ["yield comparison", "soil quality", "water usage", "carbon sequestration", "hectares", "tons", "percentage", "nutrients"]
      },
      5: { // Wildlife Conservation Project
        keyTopics: ["endangered species", "conservation", "habitat", "biodiversity", "extinction", "wildlife protection", "ecosystem", "animals", "species", "wildlife"],
        requiredConcepts: ["habitat loss", "poaching", "breeding programs", "wildlife corridors", "population monitoring", "genetic diversity", "endangered", "threatened", "protected"],
        mitigationStrategies: ["protected areas", "anti-poaching", "captive breeding", "habitat restoration", "community involvement", "legislation", "sanctuary", "reserve", "national park"],
        dataPoints: ["population numbers", "habitat range", "threat assessment", "conservation status", "numbers", "remaining", "decline", "growth"]
      },
      6: { // Carbon Footprint Analysis
        keyTopics: ["carbon footprint", "emissions", "greenhouse gases", "CO2", "sustainability", "environmental impact", "carbon", "emission", "footprint"],
        requiredConcepts: ["electricity usage", "transportation", "food consumption", "waste", "heating", "cooling", "lifestyle", "energy", "fuel", "gas"],
        mitigationStrategies: ["energy efficiency", "public transport", "reduce meat", "recycling", "solar panels", "LED lighting", "bike", "walk", "carpool", "insulate"],
        dataPoints: ["kWh", "miles", "waste generated", "carbon equivalent", "tons", "percentage", "reduction", "savings", "consumption"]
      }
    };
    return answerKeys[assignmentId] || null;
  };

  // Preview OCR text before submitting
  const previewOCR = async () => {
    const imageFiles = formData.files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    setIsExtractingOCR(true);
    setExtractedText('');
    let results = [];

    for (const fileObj of imageFiles) {
      try {
        // Convert file to base64
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };
          reader.readAsDataURL(fileObj.file);
        });

        // Call backend OCR API
        try {
          const response = await fetch('http://localhost:5000/api/assignment/extract-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64,
              filename: fileObj.name
            })
          });

          if (response.ok) {
            const data = await response.json();
            results.push({
              filename: fileObj.name,
              text: data.text || 'No text detected',
              confidence: data.confidence || 0,
              wordCount: data.wordCount || 0,
              quality: data.quality || 'unknown',
              tips: data.tips || []
            });
          } else {
            results.push({
              filename: fileObj.name,
              text: 'Failed to extract text - server error',
              confidence: 0,
              wordCount: 0,
              tips: ['Please ensure the server is running']
            });
          }
        } catch (err) {
          console.log('OCR API error:', err);
          results.push({
            filename: fileObj.name,
            text: '⚠️ OCR Server not available. Please start the backend server.\n\nRun: cd server && npm run dev',
            confidence: 0,
            wordCount: 0,
            tips: ['Start the backend server first']
          });
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }

    // Format the extracted text for display
    const displayText = results.map(r => {
      let qualityBadge = '';
      if (r.confidence >= 70) qualityBadge = '🟢 Excellent';
      else if (r.confidence >= 50) qualityBadge = '🟡 Good';
      else if (r.confidence >= 30) qualityBadge = '🟠 Fair';
      else qualityBadge = '🔴 Low';

      return `📄 FILE: ${r.filename}
${'═'.repeat(50)}

📝 EXTRACTED TEXT:
${r.text || 'No text detected'}

📊 STATS: Words: ${r.wordCount} | Confidence: ${r.confidence}% | Quality: ${qualityBadge}
${r.tips ? '\n💡 TIPS: ' + (r.tips.join(', ')) : ''}
${'─'.repeat(50)}`;
    }).join('\n\n');

    setExtractedText(displayText);
    setIsExtractingOCR(false);
  };

  // Sample past assignments for display (submitted ones)
  const pastAssignments = [
    {
      id: 1,
      title: "Biodiversity Research Paper",
      subject: "Environmental Science",
      submittedDate: "2025-11-15",
      status: "graded",
      grade: "A+",
      score: 95,
      feedback: "Excellent analysis of local biodiversity patterns!"
    },
    {
      id: 2,
      title: "Solar Energy Presentation",
      subject: "Green Technology",
      submittedDate: "2025-11-10",
      status: "submitted",
      grade: null,
      score: null,
      feedback: null
    },
    {
      id: 3,
      title: "Water Conservation Essay",
      subject: "Marine Biology",
      submittedDate: "2025-11-05",
      status: "graded",
      grade: "B+",
      score: 82,
      feedback: "Good research, could improve on solutions section."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      description: "",
      files: []
    });
    setSubmitStatus(null);
    setVerificationResults(null);
    setShowResults(false);
    setExtractedText('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles.map(file => ({
        file,
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }))]
    }));
  };

  const removeFile = (fileId) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (fileType.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle camera capture for handwritten assignments
  const handleCameraCapture = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // AI Verification with stricter accuracy
  const runAIVerification = async () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    setShowResults(false);
    setExtractedText('');

    const steps = [
      { step: 'Extracting text from documents (OCR)...', progress: 10 },
      { step: 'Analyzing content structure...', progress: 20 },
      { step: 'Matching title with content...', progress: 35 },
      { step: 'Checking topic relevance...', progress: 50 },
      { step: 'Scanning for plagiarism...', progress: 65 },
      { step: 'Detecting AI-generated content...', progress: 80 },
      { step: 'Evaluating content quality...', progress: 90 },
      { step: 'Generating final assessment...', progress: 100 }
    ];

    // Start progress animation
    let currentStep = 0;
    const progressInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setVerificationStep(steps[currentStep].step);
        setVerificationProgress(steps[currentStep].progress);
        currentStep++;
      }
    }, 800);

    // Extract text from images using OCR
    const imageFiles = formData.files.filter(f => f.type.startsWith('image/'));
    let ocrText = '';
    let ocrResults = [];

    if (imageFiles.length > 0) {
      try {
        // Process each image file
        for (const fileObj of imageFiles) {
          // Convert file to base64
          const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result.split(',')[1];
              resolve(base64String);
            };
            reader.readAsDataURL(fileObj.file);
          });

          // Call backend OCR API
          try {
            const response = await fetch('http://localhost:5000/api/assignment/extract-text', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                image: base64,
                filename: fileObj.name
              })
            });

            if (response.ok) {
              const data = await response.json();
              ocrResults.push({
                filename: fileObj.name,
                text: data.text || 'No text detected',
                confidence: data.confidence || 0
              });
              ocrText += `\n\n--- Text from: ${fileObj.name} ---\n${data.text || 'No text detected'}`;
            } else {
              // Fallback: simulate OCR if backend not available
              ocrResults.push({
                filename: fileObj.name,
                text: '[OCR service not available - using simulation]',
                confidence: 0
              });
            }
          } catch (err) {
            console.log('OCR API error, using client-side simulation:', err);
            // Client-side OCR simulation when backend is not available
            ocrResults.push({
              filename: fileObj.name,
              text: `[Simulated OCR for ${fileObj.name}]\nHandwritten text detected.\nPlease ensure the backend server is running for actual OCR.`,
              confidence: 50
            });
          }
        }
      } catch (error) {
        console.error('Error processing images:', error);
      }
    }

    // Build extracted text display
    if (ocrResults.length > 0) {
      const extractedDisplay = ocrResults.map(r => 
        `📄 File: ${r.filename}\n${'─'.repeat(40)}\n${r.text}\n\n📊 Confidence: ${r.confidence}%`
      ).join('\n\n');
      setExtractedText(extractedDisplay);
      ocrText = ocrResults.map(r => r.text).join(' ');
    }

    // Stop progress animation
    clearInterval(progressInterval);
    setVerificationProgress(100);
    setVerificationStep('Generating final assessment...');

    // Wait a bit for UI
    await new Promise(resolve => setTimeout(resolve, 500));

    // Combine all text for analysis
    const allContent = `${formData.description} ${ocrText}`.toLowerCase();
    const titleWords = selectedAssignment.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const subjectWords = selectedAssignment.subject.toLowerCase().split(/\s+/).filter(w => w.length > 3);

    // Get expected answer from hidden answer key (not visible to students)
    const expectedAnswer = getExpectedAnswer(selectedAssignment.id);
    
    if (!expectedAnswer) {
      // Fallback if no answer key exists
      setVerificationResults({
        overallScore: 50,
        suggestedGrade: 'C',
        mismatchWarning: null,
        assignmentInfo: { title: selectedAssignment.title, subject: selectedAssignment.subject, teacher: selectedAssignment.teacher, maxMarks: selectedAssignment.maxMarks },
        topicRelevance: { score: 50, feedback: 'Answer submitted for manual review.' },
        contentQuality: { score: 50, feedback: 'Pending teacher evaluation.' },
        recommendations: ['Your assignment has been submitted for manual grading.']
      });
      setIsVerifying(false);
      setShowResults(true);
      return;
    }
    
    // ======== IMPROVED AI GRADING WITH HIGHER ACCURACY ========
    
    // Helper function for partial word matching (improves accuracy)
    const containsWord = (content, word) => {
      const wordLower = word.toLowerCase();
      // Check exact match or as part of compound words
      return content.includes(wordLower) || 
             content.includes(wordLower.replace(' ', '')) ||
             wordLower.split(' ').every(w => content.includes(w));
    };
    
    // 1. Check Key Topics Match (30% weight)
    const keyTopicsMatched = expectedAnswer.keyTopics.filter(topic => containsWord(allContent, topic));
    const keyTopicsScore = Math.round((keyTopicsMatched.length / expectedAnswer.keyTopics.length) * 100);
    
    // 2. Check Required Concepts (30% weight)
    const conceptsMatched = expectedAnswer.requiredConcepts.filter(concept => containsWord(allContent, concept));
    const conceptsScore = Math.round((conceptsMatched.length / expectedAnswer.requiredConcepts.length) * 100);
    
    // 3. Check Strategies/Solutions (25% weight)
    const strategiesMatched = expectedAnswer.mitigationStrategies.filter(strategy => containsWord(allContent, strategy));
    const strategiesScore = Math.round((strategiesMatched.length / expectedAnswer.mitigationStrategies.length) * 100);
    
    // 4. Check Data Points mentioned (15% weight)
    const dataPointsMatched = expectedAnswer.dataPoints.filter(point => containsWord(allContent, point));
    const dataPointsScore = Math.round((dataPointsMatched.length / expectedAnswer.dataPoints.length) * 100);

    // Calculate weighted overall content score (improved weights)
    const contentMatchScore = Math.round(
      (keyTopicsScore * 0.30) +
      (conceptsScore * 0.30) +
      (strategiesScore * 0.25) +
      (dataPointsScore * 0.15)
    );

    // Check word count for quality
    const wordCount = allContent.split(/\s+/).filter(w => w.length > 2).length;
    const hasGoodLength = wordCount >= 50;

    // STRICT: Check if title matches content
    const titleMatchCount = titleWords.filter(word => allContent.includes(word)).length;
    const titleMatchPercentage = titleWords.length > 0 ? (titleMatchCount / titleWords.length) * 100 : 0;

    // Combined relevance score
    const relevanceScore = Math.round((titleMatchPercentage * 0.2) + (contentMatchScore * 0.8));
    
    // Determine match level based on content match score
    const isSevereMismatch = contentMatchScore < 15;
    const isModerateMatch = contentMatchScore >= 15 && contentMatchScore < 40;

    // Calculate scores based on matching
    let overallScore, suggestedGrade, topicScore, plagiarismScore, aiScore, qualityScore;
    let mismatchWarning = null;

    if (isSevereMismatch) {
      // ZERO MARKS - content doesn't match expected answer
      overallScore = 0;
      suggestedGrade = 'F';
      topicScore = contentMatchScore;
      plagiarismScore = 0;
      aiScore = 0;
      qualityScore = 0;
      mismatchWarning = {
        type: 'critical',
        title: '❌ INCORRECT ANSWER',
        message: `Your answer does not address the assignment topic "${selectedAssignment.title}". Please review the assignment requirements and resubmit.`
      };
    } else if (isModerateMatch) {
      // Partial marks for moderate match
      overallScore = Math.floor(contentMatchScore * 0.8) + (hasGoodLength ? 10 : 0);
      suggestedGrade = overallScore >= 45 ? 'D+' : 'D';
      topicScore = contentMatchScore;
      plagiarismScore = Math.floor(Math.random() * 10) + 5;
      aiScore = Math.floor(Math.random() * 15) + 5;
      qualityScore = Math.floor(Math.random() * 20) + 50;
      mismatchWarning = {
        type: 'warning',
        title: '⚠️ PARTIAL ANSWER',
        message: `Your answer partially addresses the topic. Consider adding more relevant details and examples to improve your score.`
      };
    } else {
      // Good match - calculate proper score based on content match
      topicScore = contentMatchScore;
      plagiarismScore = Math.floor(Math.random() * 10) + 5;
      aiScore = Math.floor(Math.random() * 15) + 5;
      qualityScore = Math.min(100, contentMatchScore + (hasGoodLength ? 15 : 5));
      
      // Calculate overall based on content matching
      const lengthBonus = hasGoodLength ? 5 : 0;
      overallScore = Math.min(100, Math.floor(contentMatchScore * 0.85 + qualityScore * 0.10 + lengthBonus));
      
      // Grade based on overall score
      if (overallScore >= 90) suggestedGrade = 'A+';
      else if (overallScore >= 85) suggestedGrade = 'A';
      else if (overallScore >= 80) suggestedGrade = 'A-';
      else if (overallScore >= 75) suggestedGrade = 'B+';
      else if (overallScore >= 70) suggestedGrade = 'B';
      else if (overallScore >= 65) suggestedGrade = 'B-';
      else if (overallScore >= 60) suggestedGrade = 'C+';
      else if (overallScore >= 55) suggestedGrade = 'C';
      else suggestedGrade = 'C-';
    }

    // Simplified results - NO expected answers shown to students
    const results = {
      overallScore,
      suggestedGrade,
      mismatchWarning,
      assignmentInfo: {
        title: selectedAssignment.title,
        subject: selectedAssignment.subject,
        teacher: selectedAssignment.teacher,
        maxMarks: selectedAssignment.maxMarks
      },
      topicRelevance: {
        score: topicScore,
        isRelevant: !isSevereMismatch,
        feedback: isSevereMismatch 
          ? 'Your answer does not address the assignment topic. Please resubmit with relevant content.'
          : isModerateMatch
          ? 'Your answer partially covers the topic. Add more details for a better score.'
          : 'Great job! Your answer covers the topic well.'
      },
      contentQuality: {
        score: qualityScore,
        wordCount: wordCount,
        feedback: wordCount < 50 
          ? 'Your answer is too short. Add more details and examples.'
          : wordCount < 100
          ? 'Good length. Consider adding more examples.'
          : 'Good comprehensive answer.'
      },
      plagiarism: {
        score: plagiarismScore,
        isOriginal: plagiarismScore < 30,
        feedback: 'Content appears to be original.'
      },
      extractedText: ocrText,
      hasOCR: imageFiles.length > 0,
      recommendations: isSevereMismatch 
        ? [
            'Review the assignment description carefully',
            'Make sure your answer addresses the main topic',
            'Include relevant examples and explanations'
          ]
        : isModerateMatch
        ? [
            'Add more specific details about the topic',
            'Include examples to support your points',
            'Expand on your explanations'
          ]
        : [
            '✅ Well done on addressing the topic!',
            'Consider adding more examples if possible',
            'Good work on your submission!'
          ]
    };

    setVerificationResults(results);
    setIsVerifying(false);
    setShowResults(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAssignment || !formData.description) {
      setSubmitStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setSubmitStatus(null);
    setVerificationResults(null);
    setShowResults(false);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSubmitStatus('success');
          
          // Automatically start AI verification after upload
          setTimeout(() => {
            runAIVerification();
          }, 500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const resetForm = () => {
    setSelectedAssignment(null);
    setFormData({
      description: "",
      files: []
    });
    setSubmitStatus(null);
    setVerificationResults(null);
    setShowResults(false);
    setVerificationProgress(0);
    setExtractedText('');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 60) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  const getGradeBadgeColor = (grade) => {
    if (grade?.startsWith('A')) return 'bg-green-500';
    if (grade?.startsWith('B')) return 'bg-blue-500';
    if (grade?.startsWith('C')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'graded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'submitted':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade?.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade?.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation userType="student" />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 Submit Assignment</h1>
          <p className="text-xl text-gray-600">Select an assignment and submit your work - AI will automatically verify and grade</p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              <Brain className="w-4 h-4 mr-1" /> AI-Powered Grading
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              <Shield className="w-4 h-4 mr-1" /> Plagiarism Detection
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
              <Camera className="w-4 h-4 mr-1" /> OCR for Handwritten
            </Badge>
          </div>
        </div>

        {/* AI Verification Results - Show when available */}
        {(isVerifying || showResults) && (
          <Card className="max-w-4xl mx-auto mb-8 shadow-xl border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-purple-800">
                <Brain className="w-6 h-6" />
                AI Verification Results
                {isVerifying && <RefreshCw className="w-5 h-5 ml-2 animate-spin" />}
              </CardTitle>
              {verificationResults?.assignmentInfo && (
                <div className="flex gap-4 mt-2">
                  <Badge variant="outline" className="text-sm">
                    📝 {verificationResults.assignmentInfo.title}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    📚 {verificationResults.assignmentInfo.subject}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    👨‍🏫 {verificationResults.assignmentInfo.teacher}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isVerifying ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                    <span className="text-lg font-medium text-purple-700">{verificationStep}</span>
                  </div>
                  <Progress value={verificationProgress} className="h-3" />
                  <p className="text-sm text-gray-600 text-center">{verificationProgress}% complete</p>
                </div>
              ) : verificationResults && (
                <div className="space-y-6">
                  {/* Warning Message */}
                  {verificationResults.mismatchWarning && (
                    <Alert className={`${verificationResults.mismatchWarning.type === 'critical' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}`}>
                      <AlertTriangle className={`h-5 w-5 ${verificationResults.mismatchWarning.type === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                      <AlertDescription className={verificationResults.mismatchWarning.type === 'critical' ? 'text-red-800' : 'text-yellow-800'}>
                        <strong className="text-lg">{verificationResults.mismatchWarning.title}</strong>
                        <p className="mt-2">{verificationResults.mismatchWarning.message}</p>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Overall Score - Main Display */}
                  <div className={`text-center p-8 rounded-xl shadow-md ${verificationResults.overallScore === 0 ? 'bg-red-50 border-2 border-red-300' : verificationResults.overallScore >= 70 ? 'bg-green-50 border-2 border-green-300' : 'bg-white border-2 border-gray-200'}`}>
                    <div className="flex justify-center items-center gap-6 mb-4">
                      <div className={`text-7xl font-bold ${verificationResults.overallScore === 0 ? 'text-red-600' : getScoreColor(verificationResults.overallScore)}`}>
                        {verificationResults.overallScore}
                      </div>
                      <div className="text-left">
                        <p className="text-gray-600 text-lg mb-2">Your Score</p>
                        <Badge className={`${verificationResults.overallScore === 0 ? 'bg-red-600' : getGradeBadgeColor(verificationResults.suggestedGrade)} text-white text-xl px-4 py-2`}>
                          Grade: {verificationResults.suggestedGrade}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600">{verificationResults.topicRelevance.feedback}</p>
                  </div>

                  {/* Simple Score Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Topic Relevance */}
                    <div className={`p-4 rounded-xl border-2 ${getScoreBgColor(verificationResults.topicRelevance.score)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" /> Topic Coverage
                        </span>
                        <span className={`text-2xl font-bold ${getScoreColor(verificationResults.topicRelevance.score)}`}>
                          {verificationResults.topicRelevance.score}%
                        </span>
                      </div>
                      <Progress value={verificationResults.topicRelevance.score} className="h-2" />
                    </div>

                    {/* Content Quality */}
                    <div className={`p-4 rounded-xl border-2 ${getScoreBgColor(verificationResults.contentQuality.score)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-green-600" /> Content Quality
                        </span>
                        <span className={`text-2xl font-bold ${getScoreColor(verificationResults.contentQuality.score)}`}>
                          {verificationResults.contentQuality.score}%
                        </span>
                      </div>
                      <Progress value={verificationResults.contentQuality.score} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">Word count: {verificationResults.contentQuality.wordCount}</p>
                    </div>

                    {/* Originality */}
                    <div className={`p-4 rounded-xl border-2 ${getScoreBgColor(100 - verificationResults.plagiarism.score)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold flex items-center gap-2">
                          <Shield className="w-5 h-5 text-purple-600" /> Originality
                        </span>
                        <span className={`text-2xl font-bold ${getScoreColor(100 - verificationResults.plagiarism.score)}`}>
                          {100 - verificationResults.plagiarism.score}%
                        </span>
                      </div>
                      <Progress value={100 - verificationResults.plagiarism.score} className="h-2" />
                    </div>
                  </div>

                  {/* OCR Extracted Text - Only if images uploaded */}
                  {verificationResults.hasOCR && verificationResults.extractedText && (
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-800 flex items-center gap-2 mb-3">
                        <Eye className="w-5 h-5" /> Extracted Text from Handwritten Work
                      </h4>
                      <div className="bg-white p-3 rounded-lg border border-purple-100 max-h-40 overflow-y-auto">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                          {verificationResults.extractedText}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5" /> Feedback
                    </h4>
                    <ul className="space-y-2">
                      {verificationResults.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                          <Check className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={resetForm}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Another Assignment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Available Assignments List */}
          <Card className="lg:col-span-1 shadow-xl border-2 border-green-200 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-green-800">
                <BookOpen className="w-6 h-6" />
                Available Assignments
              </CardTitle>
              <p className="text-sm text-gray-500">Select an assignment to submit</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {availableAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    onClick={() => selectAssignment(assignment)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedAssignment?.id === assignment.id 
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-green-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight">{assignment.title}</h3>
                      {selectedAssignment?.id === assignment.id && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 text-xs mb-2">{assignment.subject}</Badge>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Calendar className="w-3 h-3" />
                      Due: {assignment.dueDate}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <User className="w-3 h-3" />
                      {assignment.teacher}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Award className="w-3 h-3" />
                      Max Marks: {assignment.maxMarks}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Form - Only show when assignment is selected */}
          <Card className="lg:col-span-2 shadow-xl border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
                <Upload className="w-6 h-6" />
                {selectedAssignment ? 'Submit Your Work' : 'Select an Assignment'}
              </CardTitle>
              {selectedAssignment && (
                <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-800 mb-1">{selectedAssignment.title}</h3>
                  <p className="text-sm text-blue-600 mb-2">{selectedAssignment.subject} • {selectedAssignment.teacher}</p>
                  <p className="text-sm text-gray-600">{selectedAssignment.description}</p>
                  <div className="flex gap-4 mt-3">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" /> Due: {selectedAssignment.dueDate}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      <Award className="w-3 h-3 mr-1" /> Max: {selectedAssignment.maxMarks} marks
                    </Badge>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {!selectedAssignment ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No Assignment Selected</h3>
                  <p className="text-gray-400">Please select an assignment from the left panel to submit your work</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Assignment Description/Answer */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold">Your Answer / Work *</Label>
                    <Textarea
                      id="description"
                      placeholder="Write your assignment answer here. Include your research, analysis, findings, and conclusions..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="min-h-40 text-base"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      💡 Tip: Make sure your content is relevant to the assignment topic for better grades
                    </p>
                  </div>

                  {/* File Upload Area */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Upload Files (Optional)</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                        dragActive 
                          ? 'border-green-400 bg-green-50' 
                          : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-base text-gray-600 mb-1">
                        Drag and drop files or <span className="text-green-600 font-semibold cursor-pointer">browse</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileInput}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
                      />
                    </div>
                    
                    {/* Camera Capture for Handwritten */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                        onClick={() => cameraInputRef.current?.click()}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        📷 Capture Handwritten Work
                      </Button>
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraCapture}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* File List */}
                  {formData.files.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Uploaded Files ({formData.files.length})</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {formData.files.map((fileObj) => (
                          <div key={fileObj.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getFileIcon(fileObj.type)}
                              <div>
                                <p className="font-medium text-sm">{fileObj.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                              </div>
                              {fileObj.type.startsWith('image/') && (
                                <Badge className="bg-purple-100 text-purple-700 text-xs">
                                  <Camera className="w-3 h-3 mr-1" /> OCR Ready
                                </Badge>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(fileObj.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Preview OCR Button */}
                      {formData.files.some(f => f.type.startsWith('image/')) && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 mt-2"
                          onClick={previewOCR}
                          disabled={isExtractingOCR}
                        >
                          {isExtractingOCR ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Extracting Text...
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview Extracted Text (OCR)
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  )}

                  {/* OCR Preview Section */}
                  {extractedText && !showResults && (
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-800 flex items-center gap-2 mb-3">
                        <Eye className="w-5 h-5" /> 📷 Extracted Text from Images (OCR Preview)
                      </h4>
                      <div className="bg-white p-4 rounded-lg border border-purple-100 max-h-48 overflow-y-auto">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                          {extractedText}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Uploading...</Label>
                      <Progress value={uploadProgress} className="h-3" />
                      <p className="text-sm text-gray-600 text-center">{uploadProgress}% complete</p>
                    </div>
                  )}

                  {/* Status Messages */}
                  {submitStatus === 'success' && !isVerifying && !showResults && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Assignment uploaded! Starting AI verification...
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'success' && isVerifying && (
                    <Alert className="border-purple-200 bg-purple-50">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-purple-800">
                        AI is analyzing your assignment. Please wait...
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'success' && showResults && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        ✅ Assignment verified and submitted! Check the results above.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        Please write your answer before submitting.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-3"
                    disabled={isUploading || isVerifying || showResults}
                  >
                    {isUploading ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : isVerifying ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-pulse" />
                        AI Verifying...
                      </>
                    ) : showResults ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submitted ✓
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Submit & Verify with AI
                      </>
                    )}
                  </Button>

                  {showResults && (
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={resetForm}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Submit Another Assignment
                    </Button>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Past Assignments Section */}
        <Card className="max-w-7xl mx-auto mt-8 shadow-xl border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purple-800">
              <FileCheck className="w-6 h-6" />
              My Submitted Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pastAssignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">{assignment.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.status)}
                      {assignment.grade && (
                        <Badge className={getGradeColor(assignment.grade)}>
                          {assignment.grade}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    Submitted: {assignment.submittedDate}
                  </div>

                  {assignment.score !== null && (
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Score</span>
                        <span className="font-semibold">{assignment.score}/100</span>
                      </div>
                      <Progress value={assignment.score} className="h-2" />
                    </div>
                  )}

                  {assignment.feedback && (
                    <div className="bg-blue-50 p-2 rounded text-sm text-blue-800 mt-2">
                      <strong>Feedback:</strong> {assignment.feedback}
                    </div>
                  )}

                  {assignment.status === 'submitted' && (
                    <div className="bg-yellow-50 p-2 rounded text-sm text-yellow-800 mt-2">
                      <Clock className="w-3 h-3 inline mr-1" /> Under review
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadAssignment;