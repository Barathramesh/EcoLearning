import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  File, 
  Check, 
  X, 
  Clock, 
  Calendar,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Star,
  Trash2
} from "lucide-react";

const UploadAssignment = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    files: []
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Sample subjects for the dropdown
  const subjects = [
    "Environmental Science",
    "Climate Change",
    "Renewable Energy",
    "Ecology",
    "Conservation Biology",
    "Sustainable Development",
    "Marine Biology",
    "Forestry",
    "Environmental Chemistry",
    "Green Technology"
  ];

  // Sample past assignments for display
  const pastAssignments = [
    {
      id: 1,
      title: "Climate Change Impact Report",
      subject: "Environmental Science",
      submittedDate: "2025-09-15",
      status: "graded",
      grade: "A+",
      feedback: "Excellent analysis of local climate patterns!"
    },
    {
      id: 2,
      title: "Renewable Energy Presentation",
      subject: "Green Technology",
      submittedDate: "2025-09-10",
      status: "submitted",
      grade: null,
      feedback: null
    },
    {
      id: 3,
      title: "Ocean Conservation Essay",
      subject: "Marine Biology",
      submittedDate: "2025-09-05",
      status: "graded",
      grade: "B+",
      feedback: "Good research, could improve on solutions section."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subject || !formData.description) {
      setSubmitStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSubmitStatus('success');
          
          // Reset form after successful submission
          setTimeout(() => {
            setFormData({
              title: "",
              subject: "",
              description: "",
              dueDate: "",
              files: []
            });
            setSubmitStatus(null);
          }, 3000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 Upload Assignment</h1>
          <p className="text-xl text-gray-600">Submit your environmental science assignments and track your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Form */}
          <Card className="shadow-xl border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-green-800">
                <Upload className="w-6 h-6" />
                New Assignment Submission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Assignment Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold">Assignment Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter assignment title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-lg"
                    required
                  />
                </div>

                {/* Subject Selection */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-lg font-semibold">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Select a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-lg font-semibold">Due Date (Optional)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-semibold">Assignment Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your assignment, methodology, findings, and conclusions..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-32 text-lg"
                    required
                  />
                </div>

                {/* File Upload Area */}
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Upload Files (Optional)</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
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
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-2">
                      Drag and drop files here or <span className="text-green-600 font-semibold cursor-pointer">browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4, etc. (Max 10MB per file)
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

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Uploading Assignment...</Label>
                    <Progress value={uploadProgress} className="h-3" />
                    <p className="text-sm text-gray-600 text-center">{uploadProgress}% complete</p>
                  </div>
                )}

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Assignment submitted successfully! Your teacher will review it soon.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Please fill in all required fields before submitting.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Assignment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Past Assignments */}
          <Card className="shadow-xl border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
                <BookOpen className="w-6 h-6" />
                Past Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
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
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Submitted: {assignment.submittedDate}
                      </div>
                    </div>

                    {assignment.feedback && (
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                        <p className="text-sm text-blue-800">
                          <strong>Teacher Feedback:</strong> {assignment.feedback}
                        </p>
                      </div>
                    )}

                    {assignment.status === 'submitted' && (
                      <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                        <p className="text-sm text-yellow-800">
                          <strong>Status:</strong> Under review by your teacher
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {pastAssignments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No past assignments yet. Submit your first assignment above!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card className="max-w-4xl mx-auto mt-8 shadow-lg border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purple-800">
              <Star className="w-6 h-6" />
              Assignment Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📝</div>
                  <div>
                    <h4 className="font-semibold text-purple-700">Clear Structure</h4>
                    <p className="text-sm text-gray-600">Organize your work with clear sections: introduction, methodology, findings, and conclusion.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔍</div>
                  <div>
                    <h4 className="font-semibold text-purple-700">Research Quality</h4>
                    <p className="text-sm text-gray-600">Use reliable sources and cite them properly. Include recent environmental studies and data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className="font-semibold text-purple-700">Visual Elements</h4>
                    <p className="text-sm text-gray-600">Include charts, graphs, or images to support your findings and make your work engaging.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🌱</div>
                  <div>
                    <h4 className="font-semibold text-purple-700">Environmental Focus</h4>
                    <p className="text-sm text-gray-600">Connect your topic to real-world environmental issues and propose actionable solutions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h4 className="font-semibold text-purple-700">Time Management</h4>
                    <p className="text-sm text-gray-600">Start early and break your work into manageable chunks. Don't wait until the last minute!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✨</div>
                  <div>
                    <h4 className="font-semibold text-purple-700">Original Thinking</h4>
                    <p className="text-sm text-gray-600">Show your unique perspective and critical thinking about environmental challenges.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadAssignment;