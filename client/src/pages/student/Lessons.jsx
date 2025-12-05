import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import "@/styles/animations.css";
import { getAllSyllabi } from "../../services/syllabusService";
import { 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle, 
  Star,
  Video,
  TreePine,
  Droplets,
  Sun,
  PauseCircle,
  Volume2,
  Maximize,
  Award,
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Lock,
  Sparkles,
  Trophy,
  Target,
  Flame,
  GraduationCap,
  Loader
} from "lucide-react";

const Lessons = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  // Syllabus videos from backend
  const [syllabusVideos, setSyllabusVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [user, setUser] = useState(null);

  // Lesson completion state - in a real app, this would come from a database or context
  const [lessonCompletionStatus, setLessonCompletionStatus] = useState({
    1: { completed: false, progress: 0, score: 0 },
    2: { completed: false, progress: 0, score: 0 },
    3: { completed: false, progress: 0, score: 0 },
    4: { completed: false, progress: 0, score: 0 },
    5: { completed: false, progress: 0, score: 0 },
    6: { completed: false, progress: 0, score: 0 }
  });

  // Empty lessons array - videos come from backend now
  const lessons = [];

  // Fetch user and syllabus videos on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchSyllabusVideos(userData.class);
    } else {
      setLoadingVideos(false);
    }
  }, []);

  // Fetch syllabus videos for student's class
  const fetchSyllabusVideos = async (studentClass) => {
    try {
      setLoadingVideos(true);
      
      // Try to get videos for specific grade first
      let gradeFormat = null;
      if (studentClass) {
        // Handle different class formats: "10", "Grade 10", "10th", etc.
        const classNum = studentClass.toString().replace(/[^0-9]/g, '');
        if (classNum) {
          gradeFormat = `Grade ${classNum}`;
        }
      }
      
      // Fetch all syllabi and filter on frontend for more flexibility
      const response = await getAllSyllabi({});
      if (response.success) {
        // Filter only completed videos
        let videosWithContent = response.data.filter(
          s => s.videoGenerationStatus === 'completed' && s.videoUrl
        );
        
        // If student has a class, prioritize videos for their grade
        // but also show all videos if grade-specific ones are limited
        if (gradeFormat && videosWithContent.length > 0) {
          const gradeVideos = videosWithContent.filter(
            s => s.grade === gradeFormat || s.grade === studentClass
          );
          // If there are grade-specific videos, show those first, then others
          if (gradeVideos.length > 0) {
            const otherVideos = videosWithContent.filter(
              s => s.grade !== gradeFormat && s.grade !== studentClass
            );
            videosWithContent = [...gradeVideos, ...otherVideos];
          }
        }
        
        setSyllabusVideos(videosWithContent);
      }
    } catch (error) {
      console.error('Error fetching syllabus videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  // Check if a lesson is unlocked
  const isLessonUnlocked = (lesson) => {
    if (!lesson.prerequisite) return true; // First lesson is always unlocked
    return lessonCompletionStatus[lesson.prerequisite]?.completed || false;
  };

  // Get lesson status from state
  const getLessonStatus = (lessonId) => {
    return lessonCompletionStatus[lessonId] || { completed: false, progress: 0, score: 0 };
  };

  // Mark lesson as completed and unlock next lesson
  const markLessonCompleted = (lessonId, score) => {
    setLessonCompletionStatus(prev => ({
      ...prev,
      [lessonId]: {
        completed: score >= 70, // Pass requirement is 70%
        progress: 100,
        score: score
      }
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Stats based on syllabus videos from backend
  const totalLessons = syllabusVideos.length;
  const completedLessons = 0; // Will be tracked from backend in future
  const totalProgress = 0; // Will be tracked from backend in future
  const totalPoints = 0; // Will be tracked from backend in future

  const handleWatchLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const handleVideoComplete = () => {
    setIsVideoPlaying(false);
    setVideoProgress(100);
    setTimeout(() => {
      setShowQuiz(true);
    }, 1000);
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedLesson.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const correctAnswers = selectedLesson.quiz.questions.filter((question, index) => 
        selectedAnswers[index] === question.correctAnswer
      ).length;
      const score = Math.round((correctAnswers / selectedLesson.quiz.questions.length) * 100);
      setQuizScore(score);
      setQuizCompleted(true);
      
      // Mark lesson as completed if passed
      markLessonCompleted(selectedLesson.id, score);
    }
  };

  const handleCloseLesson = () => {
    setSelectedLesson(null);
  };

  const simulateVideoProgress = () => {
    if (isVideoPlaying && videoProgress < 100) {
      setVideoProgress(prev => Math.min(prev + 2, 100));
      if (videoProgress >= 98) {
        handleVideoComplete();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(simulateVideoProgress, 200);
    return () => clearInterval(interval);
  }, [isVideoPlaying, videoProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">📚</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🎓</div>
        <div className="absolute bottom-40 left-1/4 text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌱</div>
      </div>
      
      <Navigation userType="student" />
      <main className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Video Player Modal */}
          {selectedLesson && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
                  <Button variant="ghost" size="icon" onClick={handleCloseLesson}>
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                
                {!showQuiz ? (
                  <div className="p-6">
                    <div className="relative bg-black rounded-lg overflow-hidden mb-6">
                      <div className="aspect-video bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                        <div className="text-center text-white">
                          <selectedLesson.icon className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-2">{selectedLesson.title}</h3>
                          <p className="text-emerald-100 mb-6">{selectedLesson.description}</p>
                          
                          {!isVideoPlaying && videoProgress === 0 && (
                            <Button 
                              size="lg"
                              className="bg-white text-emerald-600 hover:bg-gray-100"
                              onClick={() => setIsVideoPlaying(true)}
                            >
                              <Play className="w-6 h-6 mr-2" />
                              Start Animated Video
                            </Button>
                          )}
                          
                          {isVideoPlaying && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-center space-x-4">
                                <Button 
                                  variant="secondary"
                                  onClick={() => setIsVideoPlaying(false)}
                                >
                                  <PauseCircle className="w-6 h-6" />
                                </Button>
                                <Button variant="secondary">
                                  <Volume2 className="w-6 h-6" />
                                </Button>
                                <Button variant="secondary">
                                  <Maximize className="w-6 h-6" />
                                </Button>
                              </div>
                              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                                <div 
                                  className="bg-white h-2 rounded-full transition-all duration-200"
                                  style={{ width: `${videoProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-sm">Video Progress: {Math.round(videoProgress)}%</p>
                            </div>
                          )}
                          
                          {videoProgress === 100 && !showQuiz && (
                            <div className="space-y-4">
                              <CheckCircle className="w-16 h-16 mx-auto text-white" />
                              <p className="text-lg">Video completed! Ready for quiz?</p>
                              <Button 
                                size="lg"
                                className="bg-white text-emerald-600 hover:bg-gray-100"
                                onClick={() => setShowQuiz(true)}
                              >
                                <HelpCircle className="w-6 h-6 mr-2" />
                                Take Quiz
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span>{selectedLesson.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span>{selectedLesson.points} points</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(selectedLesson.difficulty)}>
                          {selectedLesson.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    {!quizCompleted ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold">Quiz Time!</h3>
                          <Badge variant="outline">
                            Question {currentQuestionIndex + 1} of {selectedLesson.quiz.questions.length}
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold">
                            {selectedLesson.quiz.questions[currentQuestionIndex].question}
                          </h4>
                          
                          <div className="grid gap-3">
                            {selectedLesson.quiz.questions[currentQuestionIndex].options.map((option, index) => (
                              <Button
                                key={index}
                                variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                                className="justify-start text-left h-auto p-4"
                                onClick={() => handleQuizAnswer(currentQuestionIndex, index)}
                              >
                                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                                  {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                              </Button>
                            ))}
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              variant="outline"
                              disabled={currentQuestionIndex === 0}
                              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            >
                              <ChevronLeft className="w-4 h-4 mr-2" />
                              Previous
                            </Button>
                            
                            <Button 
                              disabled={selectedAnswers[currentQuestionIndex] === undefined}
                              onClick={handleNextQuestion}
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              {currentQuestionIndex === selectedLesson.quiz.questions.length - 1 ? (
                                <>
                                  Finish Quiz
                                  <Award className="w-4 h-4 ml-2" />
                                </>
                              ) : (
                                <>
                                  Next
                                  <ChevronRight className="w-4 h-4 ml-2" />
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="space-y-4">
                          <Award className="w-20 h-20 mx-auto text-yellow-500" />
                          <h3 className="text-3xl font-bold">Quiz Completed!</h3>
                          <div className="text-6xl font-bold text-emerald-600">{quizScore}%</div>
                          <p className="text-lg text-gray-600">
                            You scored {Object.keys(selectedAnswers).filter(key => 
                              selectedAnswers[key] === selectedLesson.quiz.questions[key].correctAnswer
                            ).length} out of {selectedLesson.quiz.questions.length} correct!
                          </p>
                          
                          {quizScore >= 70 ? (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-green-800 font-semibold mb-2">
                                🎉 Congratulations! You passed the quiz and earned {selectedLesson.points} points!
                              </p>
                              {/* Check if next lesson is unlocked */}
                              {(() => {
                                const nextLesson = lessons.find(l => l.prerequisite === selectedLesson.id);
                                if (nextLesson && quizScore >= 70) {
                                  return (
                                    <p className="text-green-700 text-sm">
                                      🔓 Level {nextLesson.level} "{nextLesson.title}" is now unlocked!
                                    </p>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          ) : (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-yellow-800 font-semibold">
                                📚 You need 70% to pass. Review the video and try again!
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-center space-x-4">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setShowQuiz(false);
                                setVideoProgress(0);
                                setCurrentQuestionIndex(0);
                                setSelectedAnswers({});
                                setQuizCompleted(false);
                              }}
                            >
                              Watch Again
                            </Button>
                            <Button 
                              className="bg-emerald-600 hover:bg-emerald-700"
                              onClick={handleCloseLesson}
                            >
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Video Lessons</h1>
                <p className="text-gray-400">Watch educational videos created by your teachers {user?.class && `for ${user.class}`}</p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="glass border-0 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{totalLessons}</div>
                  <p className="text-gray-400">Available Videos</p>
                </CardContent>
              </Card>
              <Card className="glass border-0 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{completedLessons}</div>
                  <p className="text-gray-400">Completed</p>
                </CardContent>
              </Card>
              <Card className="glass border-0 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/30">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">AI</div>
                  <p className="text-gray-400">Generated Content</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Class Videos from Admin */}
          <div>
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  Your Video Lessons {user?.class && `- ${user.class}`}
                  <Badge className="ml-auto bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Generated
                  </Badge>
                </CardTitle>
                <p className="text-gray-400">Educational videos created by your teachers</p>
              </CardHeader>
              <CardContent>
                {loadingVideos ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 text-purple-400 animate-spin mr-3" />
                    <span className="text-gray-400">Loading class videos...</span>
                  </div>
                ) : syllabusVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {syllabusVideos.map((syllabus, index) => (
                      <div 
                        key={syllabus._id}
                        className="group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Video Thumbnail */}
                        <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                          {syllabus.thumbnailUrl ? (
                            <img 
                              src={syllabus.thumbnailUrl} 
                              alt={syllabus.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="w-16 h-16 text-purple-400/50" />
                            </div>
                          )}
                          {/* Play overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                              href={syllabus.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
                            >
                              <Play className="w-8 h-8 text-purple-600 ml-1" />
                            </a>
                          </div>
                          {/* Duration badge */}
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-md text-xs text-white">
                            5 min
                          </div>
                        </div>
                        
                        {/* Video Info */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                              {syllabus.subject}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">
                              {syllabus.grade}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {syllabus.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                            {syllabus.description || syllabus.content?.substring(0, 100) + '...'}
                          </p>
                          
                          {/* Topics */}
                          {syllabus.topics && syllabus.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {syllabus.topics.slice(0, 3).map((topic, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full">
                                  {topic.topicName}
                                </span>
                              ))}
                              {syllabus.topics.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-400 rounded-full">
                                  +{syllabus.topics.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                          
                          <a
                            href={syllabus.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30">
                              <Play className="w-4 h-4 mr-2" />
                              Watch Video
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium text-lg">No Class Videos Yet</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Your teachers haven't uploaded any videos for {user?.class || 'your class'} yet.
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Check back later or complete the learning modules above!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="mt-12">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  How Video Lessons Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Each lesson features an engaging animated video followed by a quiz to reinforce your learning:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-white">Watch Animation</h4>
                        <p className="text-sm text-gray-400">Engaging animated videos with clear explanations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-white">Take Quiz</h4>
                        <p className="text-sm text-gray-400">Multiple choice questions to test understanding</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-amber-500/20 rounded-xl border border-amber-500/30">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-white">Earn Rewards</h4>
                        <p className="text-sm text-gray-400">Get points and track your progress</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Custom Styles */}
        <style>{`
          .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>
    </div>
  );
};

export default Lessons;