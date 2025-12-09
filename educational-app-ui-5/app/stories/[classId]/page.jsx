"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Play, Pause, Volume2, VolumeX, CheckCircle2, XCircle, SkipForward, SkipBack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { storiesData } from "@/lib/class-stories-data"

function AnimatedVideo({ video, isPlaying, currentSceneIndex, elapsedTime, onDoubleTap, skipIndicator }) {
  const currentScene = video.scenes[currentSceneIndex] || video.scenes[0]
  const videoRef = useRef(null)

  // Find the current subtitle based on elapsed time
  const currentSubtitle = video.subtitles?.find(
    (subtitle) => elapsedTime >= subtitle.startTime && elapsedTime < subtitle.endTime,
  )

  const handleVideoTap = (e) => {
    if (!videoRef.current) return

    const rect = videoRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isLeftSide = x < rect.width / 2

    onDoubleTap(isLeftSide ? "backward" : "forward")
  }

  return (
    <div
      ref={videoRef}
      className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 select-none"
      onDoubleClick={handleVideoTap}
    >
      <img
        key={currentSceneIndex}
        src={currentScene.image || "/placeholder.svg"}
        alt={video.title}
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isPlaying ? "scale-105 animate-pulse" : "scale-100"
        }`}
        style={{
          animation: isPlaying ? "fadeIn 1s ease-in" : "none",
        }}
      />

      {/* Animated overlay effects */}
      <div className={`absolute inset-0 ${isPlaying ? "animate-[shimmer_3s_ease-in-out_infinite]" : ""}`}>
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {skipIndicator && (
        <div
          key={skipIndicator.timestamp}
          className={`absolute top-1/2 -translate-y-1/2 ${
            skipIndicator.direction === "forward" ? "right-8" : "left-8"
          } animate-fade-in`}
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-full p-6 shadow-2xl">
            {skipIndicator.direction === "forward" ? (
              <SkipForward className="w-12 h-12 text-white" />
            ) : (
              <SkipBack className="w-12 h-12 text-white" />
            )}
          </div>
          <p className="text-white text-sm font-bold text-center mt-2 bg-black/80 rounded-full px-3 py-1">
            {skipIndicator.direction === "forward" ? "+10s" : "-10s"}
          </p>
        </div>
      )}

      {currentSubtitle && isPlaying && (
        <div className="absolute bottom-8 left-0 right-0 px-4 flex justify-center pointer-events-none">
          <div
            key={currentSubtitle.startTime}
            className="bg-black/75 backdrop-blur-sm px-6 py-3 rounded-lg max-w-4xl animate-fade-in"
          >
            <p className="text-white text-lg md:text-xl font-semibold text-center leading-relaxed">
              {currentSubtitle.text}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ClassStoryPage({ params }) {
  const [classId, setClassId] = useState(null)
  const [storyData, setStoryData] = useState(null)

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setClassId(resolvedParams.classId)
      setStoryData(storiesData[resolvedParams.classId])
    }
    resolveParams()
  }, [params])

  const [phase, setPhase] = useState("selection")
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedVideos, setCompletedVideos] = useState([])
  const [allVideosCompleted, setAllVideosCompleted] = useState(false)
  const [skipIndicator, setSkipIndicator] = useState(null)

  const sceneTimerRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const VIDEO_DURATION = 60000
  const startTimeRef = useRef(null)
  const lastSpokenSubtitleRef = useRef(null)

  const speakNarration = (text) => {
    if (isMuted) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.85
    utterance.pitch = 1.2
    utterance.volume = 1
    window.speechSynthesis.speak(utterance)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      window.speechSynthesis.cancel()
    }
  }

  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (phase === "video" && isPlaying && storyData && selectedVideoIndex !== null) {
      const currentVideo = storyData.videos[selectedVideoIndex]

      if (progress === 0 && elapsedTime === 0) {
        lastSpokenSubtitleRef.current = null
        speakNarration(currentVideo.narration)
        startTimeRef.current = Date.now()
      }

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        const progressPercent = Math.min((elapsed / VIDEO_DURATION) * 100, 100)
        setProgress(progressPercent)
        setElapsedTime(elapsed)

        speakCurrentSubtitle(currentVideo, elapsed)

        if (elapsed >= VIDEO_DURATION) {
          clearInterval(progressIntervalRef.current)
          window.speechSynthesis.cancel()
          setIsPlaying(false)
          setProgress(100)
          setTimeout(() => {
            setPhase("quiz")
            setCurrentQuestion(0)
          }, 1000)
        }
      }, 50)
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [phase, isPlaying, selectedVideoIndex, storyData, isMuted])

  // Scene transition effect
  useEffect(() => {
    if (phase === "video" && isPlaying && storyData && selectedVideoIndex !== null) {
      const currentVideo = storyData.videos[selectedVideoIndex]
      const currentScene = currentVideo.scenes[currentSceneIndex]

      if (currentSceneIndex < currentVideo.scenes.length - 1) {
        sceneTimerRef.current = setTimeout(() => {
          setCurrentSceneIndex((prev) => prev + 1)
        }, currentScene.duration)
      }
    }

    return () => {
      if (sceneTimerRef.current) clearTimeout(sceneTimerRef.current)
    }
  }, [phase, isPlaying, selectedVideoIndex, currentSceneIndex, storyData])

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      if (sceneTimerRef.current) clearTimeout(sceneTimerRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
    setIsPlaying(!isPlaying)
  }

  const playVideo = (index) => {
    setSelectedVideoIndex(index)
    setPhase("video")
    setProgress(0)
    setCurrentSceneIndex(0)
    setElapsedTime(0) // Reset elapsed time when starting new video
    setIsPlaying(true)
  }

  const skipVideo = () => {
    window.speechSynthesis.cancel()
    if (sceneTimerRef.current) clearTimeout(sceneTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    setPhase("quiz")
    setCurrentQuestion(0)
    setProgress(0)
    setElapsedTime(0)
  }

  const backToSelection = () => {
    window.speechSynthesis.cancel()
    if (sceneTimerRef.current) clearTimeout(sceneTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    setPhase("selection")
    setSelectedVideoIndex(null)
    setIsPlaying(false)
    setProgress(0)
    setCurrentSceneIndex(0)
    setElapsedTime(0) // Reset elapsed time
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (!storyData || selectedVideoIndex === null) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const currentVideo = storyData.videos[selectedVideoIndex]
    const question = currentVideo.quiz[currentQuestion]

    const isCorrect = answerIndex === question.correctAnswer

    if (isCorrect) {
      setTimeout(() => {
        if (currentQuestion === currentVideo.quiz.length - 1) {
          const newCompletedVideos = [...completedVideos, selectedVideoIndex]
          setCompletedVideos(newCompletedVideos)

          if (newCompletedVideos.length === storyData.videos.length) {
            setAllVideosCompleted(true)
          }

          setTimeout(() => {
            backToSelection()
          }, 2000)
        } else {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setShowFeedback(false)
        }
      }, 2000)
    } else {
      setTimeout(() => {
        setSelectedAnswer(null)
        setShowFeedback(false)
      }, 2000)
    }
  }

  const speakCurrentSubtitle = (currentVideo, currentElapsed) => {
    if (isMuted) return

    const currentSubtitle = currentVideo.subtitles?.find(
      (subtitle) => currentElapsed >= subtitle.startTime && currentElapsed < subtitle.endTime,
    )

    if (currentSubtitle && lastSpokenSubtitleRef.current !== currentSubtitle.startTime) {
      window.speechSynthesis.cancel()
      speakNarration(currentSubtitle.text)
      lastSpokenSubtitleRef.current = currentSubtitle.startTime
    }
  }

  const handleDoubleTapSkip = (direction) => {
    if (!isPlaying || !startTimeRef.current) return

    const skipAmount = 10000 // 10 seconds in milliseconds
    const currentElapsed = Date.now() - startTimeRef.current

    let newElapsed
    if (direction === "forward") {
      newElapsed = Math.min(currentElapsed + skipAmount, VIDEO_DURATION)
    } else {
      newElapsed = Math.max(currentElapsed - skipAmount, 0)
    }

    // Adjust start time to reflect the skip
    startTimeRef.current = Date.now() - newElapsed
    setElapsedTime(newElapsed)
    setProgress((newElapsed / VIDEO_DURATION) * 100)

    // Update scene index based on new elapsed time
    if (storyData && selectedVideoIndex !== null) {
      const currentVideo = storyData.videos[selectedVideoIndex]
      let accumulatedTime = 0
      let newSceneIndex = 0

      for (let i = 0; i < currentVideo.scenes.length; i++) {
        if (newElapsed >= accumulatedTime && newElapsed < accumulatedTime + currentVideo.scenes[i].duration) {
          newSceneIndex = i
          break
        }
        accumulatedTime += currentVideo.scenes[i].duration
        if (i === currentVideo.scenes.length - 1) {
          newSceneIndex = i
        }
      }

      setCurrentSceneIndex(newSceneIndex)

      lastSpokenSubtitleRef.current = null
      window.speechSynthesis.cancel()
      speakCurrentSubtitle(currentVideo, newElapsed)
    }

    // Show skip indicator feedback
    setSkipIndicator({ direction, timestamp: Date.now() })
    setTimeout(() => setSkipIndicator(null), 800)
  }

  if (!classId || !storyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-2xl font-bold text-muted-foreground">Loading story...</p>
        </div>
      </div>
    )
  }

  if (phase === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <header className="px-4 py-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/stories">
              <Button variant="ghost" size="lg" className="rounded-full text-lg gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Stories
              </Button>
            </Link>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div
              className={`w-24 h-24 bg-gradient-to-br ${storyData.color} rounded-3xl flex items-center justify-center text-6xl shadow-lg mx-auto mb-4`}
            >
              {storyData.emoji}
            </div>
            <div className="text-sm font-bold text-primary mb-2">{storyData.grade}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{storyData.title}</h1>
            <p className="text-lg text-muted-foreground">
              Choose any video to watch. Each video has a quiz at the end!
            </p>
          </div>

          {allVideosCompleted && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 rounded-3xl p-6 mb-8 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h2>
              <p className="text-lg text-green-700">You've completed all videos and quizzes!</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyData.videos.map((video, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-6 shadow-xl border-4 border-border hover:shadow-2xl transition-all group cursor-pointer"
                onClick={() => playVideo(index)}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={video.scenes[0].image || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
                  />
                  {completedVideos.includes(index) && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground text-center mb-2">
                  {index + 1}. {video.title}
                </h3>
                <p className="text-sm text-muted-foreground text-center">{video.quiz.length} questions</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-muted-foreground">
              {completedVideos.length} of {storyData.videos.length} videos completed
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (phase === "video") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <header className="px-4 py-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <Button onClick={backToSelection} variant="ghost" size="lg" className="rounded-full text-lg gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Video Selection
            </Button>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border-4 border-border">
            <div className="mb-4 text-center">
              <div className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-2">
                Video {selectedVideoIndex + 1} of {storyData.videos.length}
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-card-foreground">
                {storyData.videos[selectedVideoIndex].title}
              </h4>
            </div>

            <div className="relative rounded-3xl overflow-hidden mb-6 shadow-2xl border-4 border-border">
              <div className="w-full aspect-video relative">
                <AnimatedVideo
                  video={storyData.videos[selectedVideoIndex]}
                  isPlaying={isPlaying}
                  currentSceneIndex={currentSceneIndex}
                  elapsedTime={elapsedTime}
                  onDoubleTap={handleDoubleTapSkip}
                  skipIndicator={skipIndicator}
                />
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                  <Button
                    onClick={togglePlay}
                    size="lg"
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:scale-110 transition-all shadow-2xl"
                  >
                    <Play className="w-12 h-12 text-white ml-2" fill="white" />
                  </Button>
                </div>
              )}

              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg w-14 h-14 border-2 border-white"
                >
                  {isPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
                </Button>
                <Button
                  onClick={toggleMute}
                  size="icon"
                  className="rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg w-14 h-14 border-2 border-white"
                >
                  {isMuted ? <VolumeX className="w-7 h-7 text-white" /> : <Volume2 className="w-7 h-7 text-white" />}
                </Button>
              </div>
            </div>

            {isPlaying && (
              <div className="mb-6">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${storyData.color} transition-all duration-100`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
                  <span>{Math.floor((progress / 100) * (VIDEO_DURATION / 1000))}s</span>
                  <span>{VIDEO_DURATION / 1000}s</span>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                onClick={skipVideo}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-bold px-6 py-6 rounded-2xl"
              >
                <SkipForward className="w-6 h-6 mr-2" />
                Skip to Quiz
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              💡 Double-tap left side to rewind 10s • Double-tap right side to skip forward 10s
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (phase === "quiz") {
    const currentVideo = storyData.videos[selectedVideoIndex]
    const question = currentVideo.quiz[currentQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <header className="px-4 py-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <Button onClick={backToSelection} variant="ghost" size="lg" className="rounded-full text-lg gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Video Selection
            </Button>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border-4 border-border">
            <div className="mb-4 text-center">
              <div className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-2">
                Question {currentQuestion + 1} of {currentVideo.quiz.length}
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">{currentVideo.title}</h3>
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4 text-balance">
                {question.question}
              </h2>
              {question.type === "true-false" && <p className="text-lg text-muted-foreground">Select True or False</p>}
            </div>

            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correctAnswer
                const showCorrect = showFeedback && isSelected && isCorrect
                const showWrong = showFeedback && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => !showFeedback && handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-6 rounded-2xl border-4 transition-all text-left font-semibold text-lg ${
                      showCorrect
                        ? "bg-green-100 border-green-500 text-green-800"
                        : showWrong
                          ? "bg-red-100 border-red-500 text-red-800"
                          : isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-muted border-border hover:border-primary hover:bg-primary/5"
                    } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-7 h-7 text-green-600" />}
                      {showWrong && <XCircle className="w-7 h-7 text-red-600" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {showFeedback && (
              <div
                className={`p-6 rounded-2xl border-4 ${
                  selectedAnswer === question.correctAnswer
                    ? "bg-green-100 border-green-500"
                    : "bg-orange-100 border-orange-500"
                }`}
              >
                <p
                  className={`text-lg font-bold mb-2 ${
                    selectedAnswer === question.correctAnswer ? "text-green-800" : "text-orange-800"
                  }`}
                >
                  {selectedAnswer === question.correctAnswer ? "🎉 Correct!" : "Not quite! Try again!"}
                </p>
                {selectedAnswer === question.correctAnswer && (
                  <p className="text-base text-green-700">{question.explanation}</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }
}
