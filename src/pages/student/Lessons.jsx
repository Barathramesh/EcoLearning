import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
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
  Lock
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

  // Lesson completion state - in a real app, this would come from a database or context
  const [lessonCompletionStatus, setLessonCompletionStatus] = useState({
    1: { completed: false, progress: 0, score: 0 },
    2: { completed: false, progress: 0, score: 0 },
    3: { completed: false, progress: 0, score: 0 },
    4: { completed: false, progress: 0, score: 0 },
    5: { completed: false, progress: 0, score: 0 },
    6: { completed: false, progress: 0, score: 0 }
  });

  const lessons = [
    {
      id: 1,
      level: 1,
      title: "Introduction to Ecosystems",
      description: "Learn about different types of ecosystems through animated videos",
      duration: "8 min",
      type: "video",
      difficulty: "Beginner",
      points: 50,
      icon: TreePine,
      category: "Ecosystems",
      prerequisite: null, // First lesson has no prerequisite
      quiz: {
        questions: [
          {
            question: "What is an ecosystem?",
            options: [
              "A community of living organisms interacting with their environment",
              "Only the plants in a particular area",
              "The weather patterns in a region",
              "A type of animal habitat"
            ],
            correctAnswer: 0
          },
          {
            question: "Which of these is a producer in an ecosystem?",
            options: ["Lion", "Grass", "Eagle", "Snake"],
            correctAnswer: 1
          },
          {
            question: "What is the role of decomposers?",
            options: [
              "To hunt other animals",
              "To produce oxygen",
              "To break down dead organic matter",
              "To pollinate flowers"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      id: 2,
      level: 2,
      title: "Water Conservation Strategies",
      description: "Discover effective ways to conserve water through engaging animations",
      duration: "6 min",
      type: "video",
      difficulty: "Beginner",
      points: 40,
      icon: Droplets,
      category: "Water Conservation",
      prerequisite: 1, // Requires lesson 1 to be completed
      quiz: {
        questions: [
          {
            question: "How much of Earth's water is freshwater?",
            options: ["50%", "25%", "10%", "3%"],
            correctAnswer: 3
          },
          {
            question: "Which uses the most water in a typical home?",
            options: ["Toilet", "Shower", "Washing machine", "Kitchen sink"],
            correctAnswer: 1
          },
          {
            question: "What percentage of water can be saved by fixing leaky faucets?",
            options: ["5%", "10%", "15%", "20%"],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 3,
      level: 3,
      title: "Renewable Energy Sources",
      description: "Explore solar, wind, and other renewable energy through visual storytelling",
      duration: "10 min",
      type: "video",
      difficulty: "Intermediate",
      points: 75,
      icon: Sun,
      category: "Energy",
      prerequisite: 2, // Requires lesson 2 to be completed
      quiz: {
        questions: [
          {
            question: "Which renewable energy source is most widely used?",
            options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
            correctAnswer: 2
          },
          {
            question: "Solar panels convert sunlight into:",
            options: ["Heat", "Electricity", "Both heat and electricity", "Mechanical energy"],
            correctAnswer: 1
          },
          {
            question: "What is the main advantage of wind energy?",
            options: ["Works 24/7", "No emissions during operation", "Cheapest option", "Most efficient"],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 4,
      level: 4,
      title: "Waste Management & Recycling",
      description: "Learn about proper waste disposal and recycling processes",
      duration: "7 min",
      type: "video",
      difficulty: "Intermediate",
      points: 60,
      icon: TreePine, // Using TreePine as a placeholder - you can change to Recycle icon
      category: "Waste Management",
      prerequisite: 3, // Requires lesson 3 to be completed
      quiz: {
        questions: [
          {
            question: "What are the 3 R's of waste management?",
            options: [
              "Reduce, Reuse, Recycle",
              "Remove, Replace, Restore",
              "Reduce, Replace, Recycle",
              "Reuse, Replace, Remove"
            ],
            correctAnswer: 0
          },
          {
            question: "How long does plastic take to decompose?",
            options: ["10 years", "50 years", "100 years", "450+ years"],
            correctAnswer: 3
          }
        ]
      }
    },
    {
      id: 5,
      level: 5,
      title: "Climate Change Impact",
      description: "Understanding climate change causes and effects on our planet",
      duration: "12 min",
      type: "video",
      difficulty: "Advanced",
      points: 100,
      icon: Sun, // Using Sun as placeholder - you can change to Globe icon
      category: "Climate Science",
      prerequisite: 4, // Requires lesson 4 to be completed
      quiz: {
        questions: [
          {
            question: "What is the main cause of recent climate change?",
            options: [
              "Natural climate cycles",
              "Solar radiation changes",
              "Human activities",
              "Volcanic eruptions"
            ],
            correctAnswer: 2
          },
          {
            question: "Which gas contributes most to the greenhouse effect?",
            options: ["Carbon dioxide", "Methane", "Water vapor", "Nitrous oxide"],
            correctAnswer: 2
          },
          {
            question: "What is the Paris Agreement target for global temperature rise?",
            options: ["1.5°C", "2°C", "2.5°C", "3°C"],
            correctAnswer: 0
          }
        ]
      }
    },
    {
      id: 6,
      level: 6,
      title: "Sustainable Living Practices",
      description: "Practical steps for living a more sustainable lifestyle",
      duration: "9 min",
      type: "video",
      difficulty: "Advanced",
      points: 80,
      icon: TreePine,
      category: "Sustainability",
      prerequisite: 5, // Requires lesson 5 to be completed
      quiz: {
        questions: [
          {
            question: "Which transportation method has the lowest carbon footprint?",
            options: ["Electric car", "Public transport", "Bicycle", "Walking"],
            correctAnswer: 3
          },
          {
            question: "What is the most effective way to reduce household energy consumption?",
            options: ["Better insulation", "LED bulbs", "Energy-efficient appliances", "All of the above"],
            correctAnswer: 3
          }
        ]
      }
    }
  ];

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

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(lesson => getLessonStatus(lesson.id).completed).length;
  const totalProgress = Math.round(
    lessons.reduce((sum, lesson) => sum + getLessonStatus(lesson.id).progress, 0) / totalLessons
  );
  const totalPoints = lessons
    .filter(lesson => getLessonStatus(lesson.id).completed)
    .reduce((sum, lesson) => sum + lesson.points, 0);

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation userType="student" />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-3xl font-bold text-gray-800">Level-Based Video Lessons</h1>
                <p className="text-gray-600">Progress through levels by completing animated videos and quizzes</p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{completedLessons}/{totalLessons}</div>
                  <p className="text-gray-600">Lessons Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{totalProgress}%</div>
                  <p className="text-gray-600">Overall Progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{totalPoints}</div>
                  <p className="text-gray-600">Points Earned</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <HelpCircle className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{lessons.reduce((sum, lesson) => sum + lesson.quiz.questions.length, 0)}</div>
                  <p className="text-gray-600">Quiz Questions</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Learning Progress Path */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Path Progress
                </CardTitle>
                <p className="text-gray-600">Complete lessons in order to unlock the next level</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between overflow-x-auto pb-4">
                  {lessons.map((lesson, index) => {
                    const lessonStatus = getLessonStatus(lesson.id);
                    const isUnlocked = isLessonUnlocked(lesson);
                    
                    return (
                      <div key={lesson.id} className="flex items-center">
                        <div className="flex flex-col items-center min-w-[120px]">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            lessonStatus.completed 
                              ? 'bg-green-500 text-white' 
                              : isUnlocked 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-gray-300 text-gray-500'
                          }`}>
                            {lessonStatus.completed ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : isUnlocked ? (
                              <Play className="w-6 h-6" />
                            ) : (
                              <Lock className="w-6 h-6" />
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">Level {lesson.level}</div>
                            <div className="text-xs text-gray-500">{lesson.category}</div>
                            {lessonStatus.completed && (
                              <div className="text-xs text-green-600 font-medium">
                                {lessonStatus.score}% ✓
                              </div>
                            )}
                          </div>
                        </div>
                        {index < lessons.length - 1 && (
                          <div className={`h-1 w-8 mx-2 ${
                            lessonStatus.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const lessonStatus = getLessonStatus(lesson.id);
              const isUnlocked = isLessonUnlocked(lesson);
              
              return (
                <Card 
                  key={lesson.id} 
                  className={`group transition-all duration-300 ${
                    isUnlocked 
                      ? 'hover:shadow-lg cursor-pointer' 
                      : 'opacity-60 cursor-not-allowed bg-gray-50'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isUnlocked 
                            ? 'bg-gradient-to-br from-emerald-100 to-cyan-100'
                            : 'bg-gray-200'
                        }`}>
                          {isUnlocked ? (
                            <lesson.icon className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <Badge variant="secondary" className="w-fit mb-1 text-xs">
                            Level {lesson.level}
                          </Badge>
                          {lessonStatus.completed && (
                            <Badge variant="default" className="w-fit bg-green-100 text-green-700 text-xs">
                              ✓ Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
                          {lesson.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Animated
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className={`text-xl ${!isUnlocked ? 'text-gray-500' : ''}`}>
                      {lesson.title}
                    </CardTitle>
                    <p className={`text-sm ${!isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                      {isUnlocked ? lesson.description : 'Complete previous lesson to unlock'}
                    </p>
                    
                    {!isUnlocked && lesson.prerequisite && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-700">
                          🔒 Complete "Level {lesson.prerequisite}" to unlock this lesson
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {lesson.points} pts
                        </div>
                        <div className="flex items-center gap-1">
                          <HelpCircle className="w-4 h-4" />
                          {lesson.quiz.questions.length} questions
                        </div>
                      </div>

                      <Badge variant="outline" className="w-fit">
                        {lesson.category}
                      </Badge>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{lessonStatus.progress}%</span>
                        </div>
                        <Progress value={lessonStatus.progress} className="h-2" />
                      </div>

                      {lessonStatus.completed ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-green-600">✅ Completed</span>
                            <span className="text-sm text-gray-600">Score: {lessonStatus.score}%</span>
                          </div>
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => isUnlocked && handleWatchLesson(lesson)}
                            disabled={!isUnlocked}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Again & Retake Quiz
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className={`w-full ${
                            isUnlocked 
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={() => isUnlocked && handleWatchLesson(lesson)}
                          disabled={!isUnlocked}
                        >
                          {isUnlocked ? (
                            <>
                              <Video className="w-4 h-4 mr-2" />
                              Watch Video & Take Quiz
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Locked - Complete Level {lesson.prerequisite}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* How It Works */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  How Video Lessons Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Each lesson features an engaging animated video followed by a quiz to reinforce your learning:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="font-medium">Watch Animation</h4>
                        <p className="text-sm text-gray-600">Engaging animated videos with clear explanations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="font-medium">Take Quiz</h4>
                        <p className="text-sm text-gray-600">Multiple choice questions to test understanding</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="font-medium">Earn Rewards</h4>
                        <p className="text-sm text-gray-600">Get points and track your progress</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lessons;