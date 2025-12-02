import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  BookOpen,
  Star,
  File,
  Image,
  Video,
  Trash2,
  Send,
  Award,
  Timer,
  User,
  MessageSquare,
  AlertTriangle,
  Loader2
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const UploadAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  
  // Submission dialog state
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [submissionContent, setSubmissionContent] = useState("");
  const [submissionFiles, setSubmissionFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Get student data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setStudentData(parsedData);
      fetchAssignments(parsedData);
    }
  }, []);

  const fetchAssignments = async (student) => {
    try {
      setLoading(true);
      // Parse class like "10-A" into grade and section
      const classValue = student.class || "";
      const [grade, section] = classValue.split("-");
      
      if (!grade || !section) {
        setError("Invalid class format. Please contact your administrator.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/submission/student/${student.id}/class/${grade}/${section}`
      );
      
      setAssignments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Failed to fetch assignments. Please try again.");
      setLoading(false);
    }
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
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setSubmissionFiles(prev => [
      ...prev,
      ...validFiles.map(file => ({
        file,
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type
      }))
    ]);
  };

  const removeFile = (fileId) => {
    setSubmissionFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // ==================== OCR FUNCTIONS ====================
  
  // Start camera for capturing handwritten documents
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
      setOcrError(null);
    } catch (err) {
      console.error('Camera error:', err);
      setOcrError('Unable to access camera. Please check permissions or use file upload instead.');
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // Capture image from camera
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImages(prev => [...prev, {
      id: Date.now(),
      data: imageData,
      processed: false,
      text: ''
    }]);
  };

  // Handle OCR image upload
  const handleOcrImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setCapturedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            data: event.target.result,
            processed: false,
            text: '',
            fileName: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  };

  // Remove captured image
  const removeCapturedImage = (imageId) => {
    setCapturedImages(prev => prev.filter(img => img.id !== imageId));
    setOcrResults(prev => prev.filter(r => r.imageId !== imageId));
  };

  // Process single image with OCR
  const processImageWithOcr = async (image) => {
    try {
      // Extract base64 data (remove data:image/jpeg;base64, prefix)
      const base64Data = image.data.split(',')[1] || image.data;
      
      const response = await axios.post(`${API_URL}/assignment/extract-text`, {
        image: base64Data,
        filename: image.fileName || `capture_${image.id}.jpg`
      });
      
      return {
        imageId: image.id,
        success: response.data.success,
        text: response.data.text || '',
        confidence: response.data.confidence || 0,
        quality: response.data.quality || 'unknown',
        wordCount: response.data.wordCount || 0,
        tips: response.data.tips || []
      };
    } catch (err) {
      console.error('OCR Error:', err);
      return {
        imageId: image.id,
        success: false,
        text: '',
        confidence: 0,
        error: err.response?.data?.message || 'Failed to extract text'
      };
    }
  };

  // Process all captured images with OCR
  const processAllImagesWithOcr = async () => {
    if (capturedImages.length === 0) {
      setOcrError('Please capture or upload at least one image first.');
      return;
    }
    
    setIsProcessingOcr(true);
    setOcrError(null);
    const results = [];
    
    for (let i = 0; i < capturedImages.length; i++) {
      setCurrentImageIndex(i);
      const image = capturedImages[i];
      
      if (!image.processed) {
        const result = await processImageWithOcr(image);
        results.push(result);
        
        // Update image as processed
        setCapturedImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, processed: true, text: result.text } : img
        ));
      }
    }
    
    setOcrResults(results);
    setIsProcessingOcr(false);
    
    // Combine all extracted text
    const combinedText = results
      .filter(r => r.success && r.text)
      .map(r => r.text)
      .join('\n\n--- Page Break ---\n\n');
    
    if (combinedText) {
      setSubmissionContent(prev => prev ? `${prev}\n\n${combinedText}` : combinedText);
    }
  };

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 70) return 'text-green-600 bg-green-100';
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (fileType?.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (fileType?.includes('pdf') || fileType?.includes('document')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const openSubmitDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionContent("");
    setSubmissionFiles([]);
    setIsSubmitDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!submissionContent.trim() && submissionFiles.length === 0) {
      alert("Please add some content or upload files to submit.");
      return;
    }

    setIsSubmitting(true);
    setSubmitProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    try {
      // Prepare file data (in real app, you'd upload to storage and get URLs)
      const filesData = submissionFiles.map(f => ({
        fileName: f.name,
        fileUrl: `uploads/${f.name}`, // Placeholder URL
        fileType: f.type,
        fileSize: f.size
      }));

      await axios.post(`${API_URL}/submission/submit`, {
        assignmentId: selectedAssignment._id,
        studentId: studentData.id,
        studentName: studentData.name,
        studentRollNumber: studentData.rollNumber,
        content: submissionContent,
        files: filesData
      });

      clearInterval(progressInterval);
      setSubmitProgress(100);

      // Refresh assignments
      await fetchAssignments(studentData);

      setTimeout(() => {
        setIsSubmitDialogOpen(false);
        setIsSubmitting(false);
        setSubmitProgress(0);
      }, 500);

    } catch (err) {
      clearInterval(progressInterval);
      console.error("Error submitting assignment:", err);
      alert(err.response?.data?.message || "Failed to submit assignment. Please try again.");
      setIsSubmitting(false);
      setSubmitProgress(0);
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'project-based': return 'bg-purple-100 text-purple-800';
      case 'quiz-assessment': return 'bg-blue-100 text-blue-800';
      case 'multimedia': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade?.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade?.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Filter assignments
  const pendingAssignments = assignments.filter(a => !a.hasSubmitted && !a.isPastDue);
  const overdueAssignments = assignments.filter(a => !a.hasSubmitted && a.isPastDue);
  const submittedAssignments = assignments.filter(a => a.hasSubmitted);
  const gradedAssignments = submittedAssignments.filter(a => a.submission?.status === 'graded');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <Navigation userType="student" />
        <div className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            <span className="ml-3 text-lg text-gray-600">Loading assignments...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation userType="student" />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 My Assignments</h1>
          <p className="text-xl text-gray-600">View and submit your class assignments</p>
          {studentData && (
            <p className="text-md text-green-600 mt-2">
              Class: <span className="font-semibold">{studentData.class}</span>
            </p>
          )}
        </div>

        {error && (
          <Alert className="max-w-4xl mx-auto mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-none">
            <CardContent className="p-4 text-center">
              <Timer className="w-8 h-8 mx-auto mb-2 text-yellow-700" />
              <p className="text-2xl font-bold text-yellow-800">{pendingAssignments.length}</p>
              <p className="text-sm text-yellow-700">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-100 to-red-200 border-none">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-700" />
              <p className="text-2xl font-bold text-red-800">{overdueAssignments.length}</p>
              <p className="text-sm text-red-700">Overdue</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-none">
            <CardContent className="p-4 text-center">
              <Send className="w-8 h-8 mx-auto mb-2 text-blue-700" />
              <p className="text-2xl font-bold text-blue-800">{submittedAssignments.length}</p>
              <p className="text-sm text-blue-700">Submitted</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-none">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-green-700" />
              <p className="text-2xl font-bold text-green-800">{gradedAssignments.length}</p>
              <p className="text-sm text-green-700">Graded</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending" className="text-lg">
              <Clock className="w-4 h-4 mr-2" />
              Pending ({pendingAssignments.length + overdueAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted" className="text-lg">
              <Send className="w-4 h-4 mr-2" />
              Submitted ({submittedAssignments.filter(a => a.submission?.status !== 'graded').length})
            </TabsTrigger>
            <TabsTrigger value="graded" className="text-lg">
              <Award className="w-4 h-4 mr-2" />
              Graded ({gradedAssignments.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Assignments Tab */}
          <TabsContent value="pending">
            <div className="space-y-4">
              {overdueAssignments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Overdue Assignments
                  </h3>
                  {overdueAssignments.map((assignment) => (
                    <AssignmentCard 
                      key={assignment._id} 
                      assignment={assignment} 
                      isOverdue={true}
                      onSubmit={() => openSubmitDialog(assignment)}
                      getTypeColor={getTypeColor}
                      getDaysRemaining={getDaysRemaining}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}

              {pendingAssignments.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Pending Assignments
                  </h3>
                  {pendingAssignments.map((assignment) => (
                    <AssignmentCard 
                      key={assignment._id} 
                      assignment={assignment} 
                      isOverdue={false}
                      onSubmit={() => openSubmitDialog(assignment)}
                      getTypeColor={getTypeColor}
                      getDaysRemaining={getDaysRemaining}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              ) : pendingAssignments.length === 0 && overdueAssignments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <p className="text-xl">All caught up! No pending assignments.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Submitted Assignments Tab */}
          <TabsContent value="submitted">
            <div className="space-y-4">
              {submittedAssignments.filter(a => a.submission?.status !== 'graded').length > 0 ? (
                submittedAssignments
                  .filter(a => a.submission?.status !== 'graded')
                  .map((assignment) => (
                    <SubmittedCard 
                      key={assignment._id} 
                      assignment={assignment}
                      getTypeColor={getTypeColor}
                      formatDate={formatDate}
                    />
                  ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Send className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-xl">No submitted assignments awaiting review.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Graded Assignments Tab */}
          <TabsContent value="graded">
            <div className="space-y-4">
              {gradedAssignments.length > 0 ? (
                gradedAssignments.map((assignment) => (
                  <GradedCard 
                    key={assignment._id} 
                    assignment={assignment}
                    getTypeColor={getTypeColor}
                    getGradeColor={getGradeColor}
                    formatDate={formatDate}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-xl">No graded assignments yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Submit Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Submit Assignment</DialogTitle>
          </DialogHeader>
          
          {selectedAssignment && (
            <div className="space-y-4">
              {/* Assignment Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800">{selectedAssignment.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedAssignment.subject}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {formatDate(selectedAssignment.dueDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {selectedAssignment.maxPoints} points
                  </span>
                </div>
                {selectedAssignment.description && (
                  <p className="text-sm text-gray-600 mt-3 border-t pt-3">
                    {selectedAssignment.description}
                  </p>
                )}
              </div>

              {/* Content Input */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold">Your Answer / Notes</Label>
                <Textarea
                  placeholder="Write your assignment answer, notes, or description here..."
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  className="min-h-32"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold">Upload Files (Optional)</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
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
                  <p className="text-gray-600 mb-1">
                    Drag and drop files or <span className="text-green-600 font-semibold">browse</span>
                  </p>
                  <p className="text-sm text-gray-500">Max 10MB per file</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                  />
                </div>
              </div>

              {/* File List */}
              {submissionFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Files ({submissionFiles.length})</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {submissionFiles.map((fileObj) => (
                      <div key={fileObj.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          {getFileIcon(fileObj.type)}
                          <div>
                            <p className="text-sm font-medium">{fileObj.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                          </div>
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
                </div>
              )}

              {/* Progress */}
              {isSubmitting && (
                <div className="space-y-2">
                  <Progress value={submitProgress} className="h-2" />
                  <p className="text-sm text-center text-gray-600">Submitting... {submitProgress}%</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Assignment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Assignment Card Component for Pending assignments
const AssignmentCard = ({ assignment, isOverdue, onSubmit, getTypeColor, getDaysRemaining, formatDate }) => {
  const daysRemaining = getDaysRemaining(assignment.dueDate);

  return (
    <Card className={`mb-4 shadow-lg border-2 ${isOverdue ? 'border-red-300' : 'border-yellow-200'} hover:shadow-xl transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <BookOpen className={`w-6 h-6 mt-1 ${isOverdue ? 'text-red-500' : 'text-yellow-600'}`} />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{assignment.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">{assignment.subject}</Badge>
                  <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                </div>
              </div>
            </div>
            
            {assignment.description && (
              <p className="text-gray-600 text-sm mt-3 ml-9">{assignment.description}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mt-4 ml-9 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {assignment.teacherName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {formatDate(assignment.dueDate)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {assignment.maxPoints} points
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${
              isOverdue ? 'bg-red-100 text-red-700' : 
              daysRemaining <= 1 ? 'bg-orange-100 text-orange-700' :
              daysRemaining <= 3 ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {isOverdue ? 'Overdue' : 
               daysRemaining === 0 ? 'Due Today' :
               daysRemaining === 1 ? 'Due Tomorrow' :
               `${daysRemaining} days left`}
            </div>
            <Button 
              onClick={onSubmit}
              className={`${isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              <Send className="w-4 h-4 mr-2" />
              {isOverdue ? 'Submit Late' : 'Submit'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Submitted Card Component
const SubmittedCard = ({ assignment, getTypeColor, formatDate }) => {
  return (
    <Card className="mb-4 shadow-lg border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <Send className="w-6 h-6 mt-1 text-blue-500" />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{assignment.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">{assignment.subject}</Badge>
                  <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                  <Badge className={assignment.submission?.status === 'late' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
                    {assignment.submission?.status === 'late' ? 'Submitted Late' : 'Submitted'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 ml-9 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Submitted: {formatDate(assignment.submission?.submittedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {assignment.maxPoints} points
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Awaiting Review
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Graded Card Component
const GradedCard = ({ assignment, getTypeColor, getGradeColor, formatDate }) => {
  return (
    <Card className="mb-4 shadow-lg border-2 border-green-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <CheckCircle className="w-6 h-6 mt-1 text-green-500" />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{assignment.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">{assignment.subject}</Badge>
                  <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                  <Badge className="bg-green-100 text-green-800">Graded</Badge>
                </div>
              </div>
            </div>
            
            {assignment.submission?.feedback && (
              <div className="mt-4 ml-9 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800 mb-1">Teacher Feedback:</p>
                    <p className="text-green-700">{assignment.submission.feedback}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mt-4 ml-9 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Submitted: {formatDate(assignment.submission?.submittedAt)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="text-center">
              {assignment.submission?.grade && (
                <div className={`px-6 py-3 rounded-lg text-2xl font-bold ${getGradeColor(assignment.submission.grade)}`}>
                  {assignment.submission.grade}
                </div>
              )}
              {assignment.submission?.score !== null && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-bold text-lg text-gray-800">{assignment.submission.score}</span>/{assignment.maxPoints} points
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadAssignment;
