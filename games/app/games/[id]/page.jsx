"use client";

import { useState, useEffect, useCallback, useRef, use } from "react";
import Link from "next/link";

const GamePage = ({ params }) => {
  const { id } = use(params);

  // Ages 1-3 Games
  function NatureShapeJumper() {
    const [currentShape, setCurrentShape] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const shapes = [
      {
        name: "Sun",
        emoji: "☀️",
        color: "from-yellow-300 to-yellow-500",
        instruction: "Jump on the sun!",
      },
      {
        name: "Tree",
        emoji: "🌳",
        color: "from-green-400 to-emerald-600",
        instruction: "Hop on the tree!",
      },
      {
        name: "Water",
        emoji: "💧",
        color: "from-blue-400 to-cyan-500",
        instruction: "Tap the water drop!",
      },
      {
        name: "Flower",
        emoji: "🌸",
        color: "from-pink-400 to-rose-500",
        instruction: "Touch the flower!",
      },
      {
        name: "Cloud",
        emoji: "☁️",
        color: "from-gray-300 to-blue-200",
        instruction: "Click the cloud!",
      },
      {
        name: "Grass",
        emoji: "🌱",
        color: "from-lime-400 to-green-500",
        instruction: "Press the grass!",
      },
    ];

    const currentShape_data = shapes[currentShape];

    const handleShapeClick = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setScore(score + 1);
      setMessage("Great job! 🎉");

      setTimeout(() => {
        setCurrentShape((currentShape + 1) % shapes.length);
        setMessage("");
        setIsAnimating(false);
      }, 1000);
    };

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.3;
        window.speechSynthesis.speak(utterance);
      }
    };

    useEffect(() => {
      speakText(currentShape_data.instruction);
    }, [currentShape, currentShape_data]);

    const resetGame = () => {
      setCurrentShape(0);
      setScore(0);
      setMessage("");
      setIsAnimating(false);
      speakText(shapes[0].instruction);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nature Shape Jumper
          </h2>
          <p className="text-xl text-gray-600 mb-4">Score: {score}</p>
        </div>

        <div
          className={`bg-gradient-to-br ${
            currentShape_data.color
          } rounded-3xl p-16 shadow-2xl transform transition-all ${
            isAnimating ? "animate-bounce-in scale-110" : "scale-100"
          }`}
        >
          <div
            className={`text-9xl text-center ${
              isAnimating ? "animate-dance-celebrate" : "animate-bounce-slow"
            }`}
          >
            {currentShape_data.emoji}
          </div>
          <p className="text-4xl font-bold text-white text-center mt-6">
            {currentShape_data.name}
          </p>
        </div>

        <button
          onClick={handleShapeClick}
          disabled={isAnimating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl p-8 text-4xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 active:scale-95"
        >
          {currentShape_data.instruction}
        </button>

        {message && (
          <div className="text-center text-4xl font-bold text-green-600 animate-pop-reveal">
            {message}
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-xl font-bold hover:bg-gray-600 transform transition-all hover:scale-105"
        >
          Play Again 🔄
        </button>
      </div>
    );
  }

  function MyEcoHome() {
    const [currentHome, setCurrentHome] = useState(0);
    const [discovered, setDiscovered] = useState([]);

    const homes = [
      {
        name: "My House",
        emoji: "🏠",
        number: "123",
        color: "from-orange-400 to-red-500",
        description: "This is where your family lives!",
      },
      {
        name: "Bird Nest",
        emoji: "🪶",
        number: "1",
        color: "from-yellow-400 to-amber-600",
        description: "Birds build cozy homes in trees!",
      },
      {
        name: "Bee Hive",
        emoji: "🐝",
        number: "∞",
        color: "from-yellow-300 to-orange-400",
        description: "Bees work together in their hive!",
      },
      {
        name: "Bear Den",
        emoji: "🐻",
        number: "🏔️",
        color: "from-amber-700 to-orange-900",
        description: "Bears sleep in cozy dens!",
      },
      {
        name: "Plant Roots",
        emoji: "🌿",
        number: "🌍",
        color: "from-green-600 to-emerald-700",
        description: "Plants drink water from the soil!",
      },
      {
        name: "Fish Home",
        emoji: "🐠",
        number: "🌊",
        color: "from-blue-500 to-cyan-600",
        description: "Fish live in water with friends!",
      },
    ];

    const current_home = homes[currentHome];

    const handleHomeClick = () => {
      if (!discovered.includes(currentHome)) {
        setDiscovered([...discovered, currentHome]);
      }
      setCurrentHome((currentHome + 1) % homes.length);
    };

    const resetGame = () => {
      setCurrentHome(0);
      setDiscovered([]);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">My Eco-Home</h2>
          <p className="text-xl text-gray-600">
            Homes Discovered: {discovered.length}/6
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${current_home.color} rounded-3xl p-12 shadow-2xl`}
        >
          <div className="text-8xl text-center mb-4">{current_home.emoji}</div>
          <p className="text-4xl font-bold text-white text-center mb-2">
            {current_home.name}
          </p>
          <p className="text-2xl text-white text-center">
            {current_home.description}
          </p>
        </div>

        <button
          onClick={handleHomeClick}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl p-8 text-3xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Explore Next Home! 🏠
        </button>

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-xl font-bold"
        >
          Start Over 🔄
        </button>
      </div>
    );
  }

  function EcoCuriosityQuestions() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answered, setAnswered] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);

    const questions = [
      {
        question: "Why do trees have leaves?",
        answer:
          "Trees use leaves to catch sunlight and make food for themselves!",
        emoji: "🌳",
        color: "from-green-400 to-emerald-600",
      },
      {
        question: "What do bees do with flowers?",
        answer: "Bees drink nectar from flowers and help them make seeds!",
        emoji: "🐝",
        color: "from-yellow-400 to-amber-600",
      },
      {
        question: "Why do birds have wings?",
        answer: "Wings help birds fly to find food and make nests!",
        emoji: "🦅",
        color: "from-blue-400 to-cyan-600",
      },
      {
        question: "What happens when it rains?",
        answer: "Rain gives water to plants and animals to stay healthy!",
        emoji: "🌧️",
        color: "from-sky-400 to-blue-500",
      },
      {
        question: "Why do animals have homes?",
        answer: "Homes keep animals safe, warm, and protected!",
        emoji: "🏠",
        color: "from-orange-400 to-red-500",
      },
      {
        question: "What does the sun do?",
        answer: "The sun gives light and warmth to help everything grow!",
        emoji: "☀️",
        color: "from-yellow-300 to-yellow-600",
      },
    ];

    const current_q = questions[currentQuestion];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
    };

    const handleAnswer = () => {
      setShowAnswer(true);
      setAnswered([...answered, currentQuestion]);
      speakText(current_q.answer);
    };

    const nextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
        setTimeout(
          () => speakText(questions[currentQuestion + 1].question),
          300
        );
      }
    };

    const resetGame = () => {
      setCurrentQuestion(0);
      setAnswered([]);
      setShowAnswer(false);
      speakText(questions[0].question);
    };

    useEffect(() => {
      speakText(current_q.question);
    }, [currentQuestion, current_q]);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Eco Curiosity Questions
          </h2>
          <p className="text-xl text-gray-600">
            Questions: {answered.length}/{questions.length}
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${current_q.color} rounded-3xl p-12 shadow-2xl`}
        >
          <div className="text-7xl text-center mb-4">{current_q.emoji}</div>
          <p className="text-3xl font-bold text-white text-center">
            {current_q.question}
          </p>
        </div>

        {!showAnswer ? (
          <button
            onClick={handleAnswer}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl p-8 text-3xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Tell Me the Answer! 🤔
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-100 rounded-3xl p-6 border-4 border-blue-300">
              <p className="text-2xl font-bold text-blue-900">
                {current_q.answer}
              </p>
            </div>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="w-full bg-green-500 text-white rounded-2xl p-4 text-2xl font-bold"
              >
                Next Question 👉
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="w-full bg-gray-500 text-white rounded-2xl p-4 text-2xl font-bold"
              >
                Play Again 🔄
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  function SortingNatureWaste() {
    const [currentItem, setCurrentItem] = useState(0);
    const [sorted, setSorted] = useState({ recycle: 0, reuse: 0, waste: 0 });
    const [feedback, setFeedback] = useState("");

    const items = [
      {
        name: "Plastic Bottle",
        emoji: "🍾",
        correctBin: "recycle",
        color: "from-blue-400 to-cyan-500",
      },
      {
        name: "Old Toy",
        emoji: "🧸",
        correctBin: "reuse",
        color: "from-purple-400 to-pink-500",
      },
      {
        name: "Broken Glass",
        emoji: "🗑️",
        correctBin: "waste",
        color: "from-gray-400 to-gray-600",
      },
      {
        name: "Paper Bag",
        emoji: "📦",
        correctBin: "recycle",
        color: "from-amber-400 to-orange-500",
      },
      {
        name: "Old Clothes",
        emoji: "👕",
        correctBin: "reuse",
        color: "from-red-400 to-pink-500",
      },
      {
        name: "Food Scraps",
        emoji: "🍌",
        correctBin: "waste",
        color: "from-yellow-400 to-orange-500",
      },
    ];

    const current_item = items[currentItem];

    const handleSort = (bin) => {
      if (bin === current_item.correctBin) {
        setSorted({ ...sorted, [bin]: sorted[bin] + 1 });
        setFeedback("Great sorting! 🎉");
      } else {
        setFeedback("Try again! 💭");
      }

      setTimeout(() => {
        if (currentItem < items.length - 1) {
          setCurrentItem(currentItem + 1);
          setFeedback("");
        } else {
          setFeedback("All sorted! Game over!");
        }
      }, 1000);
    };

    const resetGame = () => {
      setCurrentItem(0);
      setSorted({ recycle: 0, reuse: 0, waste: 0 });
      setFeedback("");
    };

    const totalSorted = sorted.recycle + sorted.reuse + sorted.waste;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sorting Nature & Waste
          </h2>
          <p className="text-xl text-gray-600">
            Items Sorted: {totalSorted}/{items.length}
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${current_item.color} rounded-3xl p-12 shadow-2xl`}
        >
          <div className="text-8xl text-center mb-4">{current_item.emoji}</div>
          <p className="text-4xl font-bold text-white text-center">
            {current_item.name}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSort("recycle")}
            disabled={currentItem >= items.length}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-6 text-2xl font-bold disabled:opacity-50"
          >
            ♻️ Recycle
          </button>
          <button
            onClick={() => handleSort("reuse")}
            disabled={currentItem >= items.length}
            className="bg-green-500 hover:bg-green-600 text-white rounded-2xl p-6 text-2xl font-bold disabled:opacity-50"
          >
            🔄 Reuse
          </button>
          <button
            onClick={() => handleSort("waste")}
            disabled={currentItem >= items.length}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-2xl p-6 text-2xl font-bold disabled:opacity-50"
          >
            🗑️ Waste
          </button>
        </div>

        {feedback && (
          <div className="text-center text-3xl font-bold text-purple-600">
            {feedback}
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-xl font-bold"
        >
          Play Again 🔄
        </button>
      </div>
    );
  }

  function HowDoesNatureFeel() {
    const [currentScene, setCurrentScene] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(null);

    const scenes = [
      {
        question: "Does the tree look happy with sunshine?",
        emoji: "🌳",
        correctEmotion: "happy",
        color: "from-green-400 to-emerald-600",
        explanation: "Yes! Trees love sunshine to make food and grow!",
      },
      {
        question: "Does the fish look sad with trash in water?",
        emoji: "🐠",
        correctEmotion: "sad",
        color: "from-blue-400 to-cyan-600",
        explanation: "Yes! Trash makes water dirty and fish sad!",
      },
      {
        question: "Does the bird look scared?",
        emoji: "🦅",
        correctEmotion: "scared",
        color: "from-blue-500 to-indigo-600",
        explanation: "Yes! Loud noises and pollution make birds scared!",
      },
      {
        question: "Does the flower look happy when bee visits?",
        emoji: "🌸",
        correctEmotion: "happy",
        color: "from-pink-400 to-rose-500",
        explanation: "Yes! Bees help flowers make seeds!",
      },
    ];

    const current_scene = scenes[currentScene];

    const handleEmotion = (emotion) => {
      setSelectedEmotion(emotion);
      setShowAnswer(true);

      if (emotion === current_scene.correctEmotion) {
        setScore(score + 1);
      }
    };

    const nextScene = () => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
        setShowAnswer(false);
        setSelectedEmotion(null);
      }
    };

    const resetGame = () => {
      setCurrentScene(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedEmotion(null);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How Does Nature Feel?
          </h2>
          <p className="text-xl text-gray-600">
            Score: {score}/{scenes.length}
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${current_scene.color} rounded-3xl p-12 shadow-2xl`}
        >
          <div className="text-8xl text-center mb-4">{current_scene.emoji}</div>
          <p className="text-3xl font-bold text-white text-center">
            {current_scene.question}
          </p>
        </div>

        {!showAnswer ? (
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleEmotion("happy")}
              className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-2xl p-6 text-3xl font-bold"
            >
              😊 Happy
            </button>
            <button
              onClick={() => handleEmotion("sad")}
              className="bg-blue-400 hover:bg-blue-500 text-white rounded-2xl p-6 text-3xl font-bold"
            >
              😢 Sad
            </button>
            <button
              onClick={() => handleEmotion("scared")}
              className="bg-red-400 hover:bg-red-500 text-white rounded-2xl p-6 text-3xl font-bold"
            >
              😨 Scared
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-3xl p-6 text-center border-4 ${
                selectedEmotion === current_scene.correctEmotion
                  ? "bg-green-100 border-green-400"
                  : "bg-orange-100 border-orange-400"
              }`}
            >
              <div className="text-5xl mb-3">
                {selectedEmotion === current_scene.correctEmotion ? "🎉" : "💭"}
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {current_scene.explanation}
              </p>
            </div>

            {currentScene < scenes.length - 1 ? (
              <button
                onClick={nextScene}
                className="w-full bg-green-500 text-white rounded-2xl p-4 text-2xl font-bold"
              >
                Next Scene 👉
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="w-full bg-gray-500 text-white rounded-2xl p-4 text-2xl font-bold"
              >
                Play Again 🔄
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Ages 4 Games
  function EcoWeatherTracker() {
    const [days, setDays] = useState([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    const [currentDay, setCurrentDay] = useState(0);
    const [summary, setSummary] = useState(null);

    const weatherTypes = [
      {
        name: "Sunny",
        emoji: "☀️",
        color: "from-yellow-400 to-yellow-600",
        affects: "Plants grow fast with sun!",
      },
      {
        name: "Rainy",
        emoji: "🌧️",
        color: "from-blue-400 to-blue-600",
        affects: "Plants and animals need rain!",
      },
      {
        name: "Cloudy",
        emoji: "☁️",
        color: "from-gray-400 to-gray-600",
        affects: "Clouds bring mystery and coolness!",
      },
      {
        name: "Windy",
        emoji: "🌪️",
        color: "from-cyan-400 to-cyan-600",
        affects: "Wind spreads seeds far away!",
      },
    ];

    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const handleWeather = (weatherType) => {
      const newDays = [...days];
      newDays[currentDay] = weatherType;
      setDays(newDays);

      if (currentDay < 6) {
        setCurrentDay(currentDay + 1);
      }
    };

    const generateSummary = () => {
      const counts = {};
      days.forEach((day) => {
        if (day) {
          counts[day.name] = (counts[day.name] || 0) + 1;
        }
      });

      const max = Math.max(...Object.values(counts || {}));
      const mostFrequent = Object.keys(counts).find((k) => counts[k] === max);

      setSummary(counts);
    };

    const resetGame = () => {
      setDays([null, null, null, null, null, null, null]);
      setCurrentDay(0);
      setSummary(null);
    };

    if (summary) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Weekly Weather Summary
            </h2>
            <p className="text-xl text-gray-600">
              Here's what the weather was like this week!
            </p>
          </div>

          <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl p-8 space-y-4">
            {Object.entries(summary).map(([weather, count]) => (
              <div
                key={weather}
                className="flex justify-between items-center p-4 bg-white rounded-2xl"
              >
                <span className="text-2xl font-bold text-gray-800">
                  {weather}
                </span>
                <span className="text-3xl font-bold text-blue-600">
                  {count} days
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="w-full bg-gray-500 text-white rounded-2xl p-4 text-2xl font-bold"
          >
            Track Again 🔄
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Eco Weather Tracker
          </h2>
          <p className="text-xl text-gray-600">
            {dayNames[currentDay]}: {currentDay + 1}/7
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {weatherTypes.map((weather) => (
            <button
              key={weather.name}
              onClick={() => handleWeather(weather)}
              disabled={currentDay >= 7}
              className={`bg-gradient-to-br ${weather.color} rounded-2xl p-6 text-white font-bold disabled:opacity-50 transform hover:scale-105 transition-all`}
            >
              <div className="text-5xl mb-2">{weather.emoji}</div>
              <p className="text-lg">{weather.name}</p>
              <p className="text-sm mt-2">{weather.affects}</p>
            </button>
          ))}
        </div>

        {currentDay === 7 && (
          <button
            onClick={generateSummary}
            className="w-full bg-blue-600 text-white rounded-2xl p-4 text-2xl font-bold"
          >
            See Summary 📊
          </button>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-xl font-bold"
        >
          Start Over 🔄
        </button>
      </div>
    );
  }

  function HabitatHunt() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const habitats = [
      {
        question: "Is that tree big or small?",
        options: [
          {
            answer: "big",
            correct: true,
            emoji: "🌲",
            description: "Big trees!",
          },
          {
            answer: "small",
            correct: false,
            emoji: "🌱",
            description: "Small plants",
          },
        ],
        layer: "Ground & Trees",
        color: "from-green-400 to-emerald-600",
      },
      {
        question: "Is the bird flying high or low?",
        options: [
          {
            answer: "high",
            correct: true,
            emoji: "🦅",
            description: "In the sky!",
          },
          {
            answer: "low",
            correct: false,
            emoji: "🦗",
            description: "On the ground",
          },
        ],
        layer: "Sky",
        color: "from-blue-400 to-cyan-600",
      },
      {
        question: "Is the ant living high or low?",
        options: [
          {
            answer: "low",
            correct: true,
            emoji: "🐜",
            description: "In the soil!",
          },
          {
            answer: "high",
            correct: false,
            emoji: "☁️",
            description: "In the clouds",
          },
        ],
        layer: "Underground",
        color: "from-amber-600 to-orange-700",
      },
      {
        question: "Is the butterfly living in trees or on ground?",
        options: [
          {
            answer: "trees",
            correct: true,
            emoji: "🦋",
            description: "In flowers & trees!",
          },
          {
            answer: "ground",
            correct: false,
            emoji: "🌪️",
            description: "In wind",
          },
        ],
        layer: "Shrubs & Flowers",
        color: "from-pink-400 to-rose-500",
      },
    ];

    const current_habitat = habitats[currentQuestion];

    const handleAnswer = (option) => {
      setSelectedAnswer(option);
      setShowFeedback(true);
      if (option.correct) {
        setScore(score + 1);
      }
    };

    const nextQuestion = () => {
      if (currentQuestion < habitats.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      }
    };

    const resetGame = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowFeedback(false);
      setSelectedAnswer(null);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Habitat Hunt
          </h2>
          <p className="text-xl text-gray-600">
            Score: {score}/{habitats.length}
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${current_habitat.color} rounded-3xl p-12 shadow-2xl`}
        >
          <p className="text-3xl font-bold text-white text-center mb-4">
            {current_habitat.question}
          </p>
          <p className="text-xl text-white text-center opacity-90">
            {current_habitat.layer}
          </p>
        </div>

        {!showFeedback ? (
          <div className="grid grid-cols-2 gap-4">
            {current_habitat.options.map((option) => (
              <button
                key={option.answer}
                onClick={() => handleAnswer(option)}
                className="bg-white hover:bg-gray-100 rounded-2xl p-6 border-4 border-gray-300 transform hover:scale-105 transition-all"
              >
                <div className="text-5xl mb-2">{option.emoji}</div>
                <p className="text-2xl font-bold text-gray-800 capitalize">
                  {option.answer}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-3xl p-6 text-center border-4 ${
                selectedAnswer.correct
                  ? "bg-green-100 border-green-400"
                  : "bg-orange-100 border-orange-400"
              }`}
            >
              <div className="text-5xl mb-3">
                {selectedAnswer.correct ? "🎉" : "💭"}
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {selectedAnswer.correct ? "Correct!" : "Try again!"}
              </p>
              <p className="text-xl text-gray-700 mt-2">
                {selectedAnswer.description}
              </p>
            </div>

            {currentQuestion < habitats.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="w-full bg-green-500 text-white rounded-2xl p-4 text-2xl font-bold"
              >
                Next Question 👉
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="w-full bg-gray-500 text-white rounded-2xl p-4 text-2xl font-bold"
              >
                Play Again 🔄
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  function EcoStorytime() {
    const [currentStory, setCurrentStory] = useState(0);
    const [currentScene, setCurrentScene] = useState(0);

    const stories = [
      {
        title: "A Tree Growing",
        emoji: "🌳",
        color: "from-green-400 to-emerald-600",
        scenes: [
          {
            text: "Once upon a time, there was a tiny seed.",
            emoji: "🌱",
            bg: "from-brown-400 to-orange-600",
          },
          {
            text: "The seed felt warm rain and started to grow!",
            emoji: "🌧️",
            bg: "from-blue-400 to-cyan-600",
          },
          {
            text: "A little sprout pushed through the soil.",
            emoji: "🌿",
            bg: "from-green-400 to-emerald-500",
          },
          {
            text: "It grew bigger and bigger into a beautiful tree!",
            emoji: "🌳",
            bg: "from-green-500 to-emerald-700",
          },
        ],
      },
      {
        title: "A Bird Finding Food",
        emoji: "🦅",
        color: "from-blue-400 to-cyan-600",
        scenes: [
          {
            text: "A hungry bird woke up in the morning.",
            emoji: "🦅",
            bg: "from-sky-300 to-blue-500",
          },
          {
            text: "It flew high up in the sky, looking for food.",
            emoji: "☁️",
            bg: "from-sky-400 to-blue-600",
          },
          {
            text: "It found berries on a bush! Yum!",
            emoji: "🫐",
            bg: "from-purple-400 to-pink-500",
          },
          {
            text: "The happy bird had a great breakfast!",
            emoji: "😊",
            bg: "from-yellow-300 to-yellow-600",
          },
        ],
      },
      {
        title: "Journey of a Raindrop",
        emoji: "💧",
        color: "from-blue-500 to-indigo-600",
        scenes: [
          {
            text: "I am a raindrop in a cloud.",
            emoji: "☁️",
            bg: "from-gray-300 to-blue-200",
          },
          {
            text: "I fall down, down, down to the Earth!",
            emoji: "🌧️",
            bg: "from-sky-400 to-blue-500",
          },
          {
            text: "I land on a plant and give it water to drink.",
            emoji: "🌱",
            bg: "from-green-400 to-emerald-600",
          },
          {
            text: "The plant grows big and strong! The cycle continues!",
            emoji: "🌻",
            bg: "from-yellow-400 to-orange-500",
          },
        ],
      },
    ];

    const current_story = stories[currentStory];
    const current_scene = current_story.scenes[currentScene];

    const nextScene = () => {
      if (currentScene < current_story.scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      } else if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setCurrentScene(0);
      }
    };

    const resetGame = () => {
      setCurrentStory(0);
      setCurrentScene(0);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Eco Storytime
          </h2>
          <p className="text-xl text-gray-600">{current_story.title}</p>
        </div>

        <div
          className={`bg-gradient-to-br ${current_scene.bg} rounded-3xl p-12 shadow-2xl`}
        >
          <div className="text-8xl text-center mb-6">{current_scene.emoji}</div>
          <p className="text-3xl font-bold text-white text-center">
            {current_scene.text}
          </p>
        </div>

        <div className="flex gap-4">
          {current_story.scenes.map((_, idx) => (
            <div
              key={idx}
              className={`h-4 flex-1 rounded-full ${
                idx === currentScene
                  ? "bg-purple-600"
                  : idx < currentScene
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextScene}
          disabled={
            currentStory === stories.length - 1 &&
            currentScene === current_story.scenes.length - 1
          }
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-4 text-2xl font-bold disabled:opacity-50"
        >
          Next{" "}
          {currentScene === current_story.scenes.length - 1 ? "Story" : "Scene"}{" "}
          👉
        </button>

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-2xl font-bold"
        >
          Start Over 🔄
        </button>
      </div>
    );
  }

  function ISpyNature() {
    const [currentClue, setCurrentClue] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const clues = [
      {
        clue: "I spy something green that helps us breathe",
        answer: "tree",
        emoji: "🌳",
        options: ["tree", "car", "toy"],
        explanation: "Trees make oxygen for us to breathe!",
      },
      {
        clue: "I spy something brown that animals live in",
        answer: "soil",
        emoji: "🪵",
        options: ["soil", "sky", "water"],
        explanation: "Many animals make homes in the soil!",
      },
      {
        clue: "I spy something blue that fish swim in",
        answer: "water",
        emoji: "💧",
        options: ["water", "grass", "rock"],
        explanation: "Fish need water to live and swim!",
      },
      {
        clue: "I spy something yellow that gives us light",
        answer: "sun",
        emoji: "☀️",
        options: ["sun", "moon", "star"],
        explanation: "The sun gives light and warmth to Earth!",
      },
      {
        clue: "I spy something that starts with W and we drink",
        answer: "water",
        emoji: "🚰",
        options: ["water", "juice", "milk"],
        explanation: "Water keeps us healthy and hydrated!",
      },
      {
        clue: "I spy something that starts with B and makes honey",
        answer: "bee",
        emoji: "🐝",
        options: ["bee", "bird", "bear"],
        explanation: "Bees make honey and help flowers grow!",
      },
      {
        clue: "I spy something colorful that butterflies like",
        answer: "flower",
        emoji: "🌸",
        options: ["flower", "rock", "cloud"],
        explanation: "Butterflies love to visit colorful flowers!",
      },
      {
        clue: "I spy something white and fluffy in the sky",
        answer: "cloud",
        emoji: "☁️",
        options: ["cloud", "bird", "plane"],
        explanation: "Clouds are made of tiny water drops in the sky!",
      },
    ];

    const currentQuestion = clues[currentClue];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const handleAnswer = (answer) => {
      setSelectedAnswer(answer);
      setShowAnswer(true);

      if (answer === currentQuestion.answer) {
        setScore(score + 1);
        speakText(`Yes! ${currentQuestion.explanation}`);
      } else {
        speakText(`Not quite! ${currentQuestion.explanation}`);
      }
    };

    const nextClue = () => {
      if (currentClue < clues.length - 1) {
        setCurrentClue(currentClue + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
        setTimeout(() => speakText(clues[currentClue + 1].clue), 300);
      }
    };

    const resetGame = () => {
      setCurrentClue(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setTimeout(() => speakText(clues[0].clue), 300);
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-3xl p-6 text-center border-4 border-teal-300">
          <div className="text-6xl mb-4">{currentQuestion.emoji}</div>
          <h3 className="text-3xl font-bold text-teal-800 mb-4">
            {currentQuestion.clue}
          </h3>
          <div className="text-2xl font-bold text-teal-600">
            Score: {score} / {clues.length}
          </div>
        </div>

        {!showAnswer ? (
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="bg-white hover:bg-teal-50 rounded-2xl p-6 border-4 border-teal-200 hover:border-teal-400 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="text-3xl font-bold text-teal-800 capitalize">
                  {option}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-3xl p-6 text-center border-4 ${
                selectedAnswer === currentQuestion.answer
                  ? "bg-green-100 border-green-400"
                  : "bg-orange-100 border-orange-400"
              }`}
            >
              <div className="text-5xl mb-3">
                {selectedAnswer === currentQuestion.answer ? "🎉" : "💭"}
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {selectedAnswer === currentQuestion.answer
                  ? "Great job!"
                  : "Good try!"}
              </p>
              <p className="text-xl text-gray-700">
                {currentQuestion.explanation}
              </p>
            </div>

            {currentClue < clues.length - 1 ? (
              <button
                onClick={nextClue}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Next Clue 👀
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Play Again 🔄
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  function AnimalMovement() {
    const [currentMove, setCurrentMove] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [score, setScore] = useState(0);
    const [completedMoves, setCompletedMoves] = useState([]);

    const movements = [
      {
        name: "Stretch like a Tree",
        emoji: "🌳",
        instruction: "Reach your arms up high to the sky like tree branches!",
        color: "from-green-400 to-emerald-500",
        action: "stretch",
      },
      {
        name: "Jump like a Frog",
        emoji: "🐸",
        instruction: "Bend your knees and jump high like a frog hopping!",
        color: "from-lime-400 to-green-500",
        action: "jump",
      },
      {
        name: "Flap like a Bird",
        emoji: "🐦",
        instruction: "Spread your arms wide and flap them like bird wings!",
        color: "from-blue-400 to-cyan-500",
        action: "flap",
      },
      {
        name: "Wiggle like a Worm",
        emoji: "🪱",
        instruction: "Lie down and wiggle your whole body like a worm!",
        color: "from-pink-400 to-rose-500",
        action: "wiggle",
      },
      {
        name: "Stomp like an Elephant",
        emoji: "🐘",
        instruction: "Walk slowly and stomp your feet like a big elephant!",
        color: "from-gray-400 to-slate-500",
        action: "stomp",
      },
      {
        name: "Swim like a Fish",
        emoji: "🐟",
        instruction: "Move your arms back and forth like a fish swimming!",
        color: "from-cyan-400 to-blue-500",
        action: "swim",
      },
      {
        name: "Slither like a Snake",
        emoji: "🐍",
        instruction: "Move side to side on the ground like a slithering snake!",
        color: "from-emerald-400 to-teal-500",
        action: "slither",
      },
      {
        name: "Hop like a Bunny",
        emoji: "🐰",
        instruction: "Put your hands up like bunny ears and hop around!",
        color: "from-orange-400 to-amber-500",
        action: "hop",
      },
    ];

    const currentMovement = movements[currentMove];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.3;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const startMovement = () => {
      setIsMoving(true);
      speakText(`${currentMovement.name}! ${currentMovement.instruction}`);

      // Auto-complete after 5 seconds
      setTimeout(() => {
        completeMovement();
      }, 5000);
    };

    const completeMovement = () => {
      setIsMoving(false);
      setScore(score + 1);
      setCompletedMoves([...completedMoves, currentMove]);
      speakText("Great job! You moved like an animal!");
    };

    const nextMove = () => {
      if (currentMove < movements.length - 1) {
        setCurrentMove(currentMove + 1);
      }
    };

    const resetGame = () => {
      setCurrentMove(0);
      setScore(0);
      setIsMoving(false);
      setCompletedMoves([]);
    };

    return (
      <div className="space-y-6">
        <div
          className={`bg-gradient-to-r ${currentMovement.color} rounded-3xl p-8 text-center border-4 border-white shadow-2xl`}
        >
          <div className="text-8xl mb-4 animate-bounce">
            {currentMovement.emoji}
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">
            {currentMovement.name}
          </h3>
          <p className="text-2xl text-white/90 leading-relaxed">
            {currentMovement.instruction}
          </p>
          <div className="mt-6 text-3xl font-bold text-white">
            Moves Completed: {score} / {movements.length}
          </div>
        </div>

        {!isMoving ? (
          <div className="space-y-4">
            {!completedMoves.includes(currentMove) ? (
              <button
                onClick={startMovement}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Start Moving! 🎯
              </button>
            ) : (
              <>
                {currentMove < movements.length - 1 ? (
                  <button
                    onClick={nextMove}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-8 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    Next Animal 🐾
                  </button>
                ) : (
                  <button
                    onClick={resetGame}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    Play Again 🔄
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="bg-yellow-100 border-4 border-yellow-400 rounded-3xl p-8 text-center">
            <div className="text-6xl mb-4 animate-pulse">⭐</div>
            <p className="text-3xl font-bold text-yellow-800">Keep moving!</p>
            <p className="text-xl text-yellow-700 mt-2">You're doing great!</p>
            <button
              onClick={completeMovement}
              className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-4 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              I Did It! ✓
            </button>
          </div>
        )}

        {/* Progress indicators */}
        <div className="grid grid-cols-4 gap-3">
          {movements.map((move, index) => (
            <div
              key={index}
              className={`rounded-xl p-3 text-center border-2 transition-all ${
                completedMoves.includes(index)
                  ? "bg-green-200 border-green-400"
                  : index === currentMove
                  ? "bg-blue-200 border-blue-400"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="text-3xl">{move.emoji}</div>
              {completedMoves.includes(index) && (
                <div className="text-xl">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Ages 5 Games
  function NatureColorHunt() {
    const [currentColor, setCurrentColor] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [foundItems, setFoundItems] = useState([]);

    const colorHunts = [
      {
        color: "Green",
        emoji: "💚",
        instruction:
          "Find something GREEN! Look for leaves, grass, or green toys!",
        items: ["leaf", "grass", "frog", "tree"],
        backgroundColor: "from-green-200 to-emerald-300",
        borderColor: "border-green-400",
      },
      {
        color: "Brown",
        emoji: "🟤",
        instruction:
          "Find something BROWN! Look for sticks, soil, or brown toys!",
        items: ["stick", "soil", "bear", "tree bark"],
        backgroundColor: "from-amber-200 to-orange-300",
        borderColor: "border-amber-400",
      },
      {
        color: "Blue",
        emoji: "💙",
        instruction: "Find something BLUE! Look for water, sky, or blue toys!",
        items: ["water", "sky", "fish", "bottle"],
        backgroundColor: "from-blue-200 to-cyan-300",
        borderColor: "border-blue-400",
      },
      {
        color: "Yellow",
        emoji: "💛",
        instruction:
          "Find something YELLOW! Look for the sun, flowers, or yellow toys!",
        items: ["sun", "flower", "butterfly", "bee"],
        backgroundColor: "from-yellow-200 to-amber-300",
        borderColor: "border-yellow-400",
      },
      {
        color: "Red",
        emoji: "❤️",
        instruction:
          "Find something RED! Look for apples, ladybugs, or red toys!",
        items: ["apple", "ladybug", "cardinal", "rose"],
        backgroundColor: "from-red-200 to-pink-300",
        borderColor: "border-red-400",
      },
      {
        color: "Purple",
        emoji: "💜",
        instruction:
          "Find something PURPLE! Look for flowers, berries, or purple toys!",
        items: ["flower", "berry", "butterfly", "grape"],
        backgroundColor: "from-purple-200 to-violet-300",
        borderColor: "border-purple-400",
      },
    ];

    const currentHunt = colorHunts[currentColor];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const startHunt = () => {
      setGameStarted(true);
      speakText(colorHunts[0].instruction);
    };

    const itemFound = (item) => {
      setScore(score + 1);
      setFoundItems([...foundItems, item]);
      speakText(`Great! You found a ${item}! Keep looking for more!`);
    };

    const nextColor = () => {
      if (currentColor < colorHunts.length - 1) {
        setCurrentColor(currentColor + 1);
        setTimeout(
          () => speakText(colorHunts[currentColor + 1].instruction),
          300
        );
      }
    };

    const skipColor = () => {
      speakText(
        `You skipped ${
          currentColor < colorHunts.length - 1
            ? "that color"
            : "the final color"
        }! Let's move on!`
      );
      nextColor();
    };

    const resetGame = () => {
      setCurrentColor(0);
      setScore(0);
      setGameStarted(false);
      setFoundItems([]);
    };

    if (!gameStarted) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 text-center border-4 border-yellow-300 shadow-2xl">
            <div className="text-8xl mb-4">🎨</div>
            <h2 className="text-4xl font-bold text-orange-800 mb-4">
              Nature Color Hunt!
            </h2>
            <p className="text-2xl text-orange-700 mb-6">
              Can you find objects in different colors? Look around and find
              things that match each color!
            </p>
            <button
              onClick={startHunt}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Hunting! 🔍
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div
          className={`bg-gradient-to-r ${currentHunt.backgroundColor} rounded-3xl p-6 text-center border-4 ${currentHunt.borderColor} shadow-2xl`}
        >
          <div className="text-7xl mb-4">{currentHunt.emoji}</div>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            {currentHunt.instruction}
          </h3>
          <div className="text-2xl font-bold text-gray-700">
            Items Found: {score}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {currentHunt.items.map((item) => (
            <button
              key={item}
              onClick={() => itemFound(item)}
              className="bg-white hover:bg-green-50 rounded-2xl p-6 border-4 border-green-300 hover:border-green-500 transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-5xl mb-2">✓</div>
              <div className="text-2xl font-bold text-gray-800 capitalize">
                {item}
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {currentColor < colorHunts.length - 1 ? (
            <>
              <button
                onClick={nextColor}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Next Color →
              </button>
              <button
                onClick={skipColor}
                className="bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Skip Color ⏭️
              </button>
            </>
          ) : (
            <button
              onClick={resetGame}
              className="col-span-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Play Again 🔄
            </button>
          )}
        </div>
      </div>
    );
  }

  function EcoSimonSays() {
    const [currentCommand, setCurrentCommand] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [completedCommands, setCompletedCommands] = useState([]);

    const commands = [
      {
        instruction: "Simon says plant a seed!",
        emoji: "🌱",
        action: "plant",
        color: "from-green-400 to-emerald-500",
      },
      {
        instruction: "Simon says recycle the trash!",
        emoji: "♻️",
        action: "recycle",
        color: "from-blue-400 to-cyan-500",
      },
      {
        instruction: "Simon says fly like a butterfly!",
        emoji: "🦋",
        action: "fly",
        color: "from-pink-400 to-rose-500",
      },
      {
        instruction: "Pick up trash without Simon saying!",
        emoji: "🗑️",
        action: "trap",
        isSimon: false,
        color: "from-orange-400 to-yellow-500",
      },
      {
        instruction: "Simon says drink clean water!",
        emoji: "💧",
        action: "drink",
        color: "from-cyan-400 to-blue-500",
      },
      {
        instruction: "Stomp loudly without Simon saying!",
        emoji: "👣",
        action: "stomp",
        isSimon: false,
        color: "from-gray-400 to-slate-500",
      },
      {
        instruction: "Simon says save energy by turning off lights!",
        emoji: "💡",
        action: "lights",
        color: "from-yellow-400 to-amber-500",
      },
      {
        instruction: "Simon says hug a tree!",
        emoji: "🌳",
        action: "hug",
        color: "from-green-500 to-lime-600",
      },
    ];

    const currentCmd = commands[currentCommand];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const startGame = () => {
      setGameStarted(true);
      speakText(commands[0].instruction);
    };

    const handleDo = () => {
      const isSimonCmd = currentCmd.isSimon !== false;
      const correct = isSimonCmd;

      if (correct) {
        setScore(score + 1);
        speakText("Great! You listened carefully! Simon said do it!");
        setCompletedCommands([...completedCommands, currentCommand]);
      } else {
        speakText(
          "Oops! Simon DIDN'T say that! You have to listen for Simon says!"
        );
      }

      setIsCorrect(correct);
    };

    const handleDontDo = () => {
      const isSimonCmd = currentCmd.isSimon !== false;
      const correct = !isSimonCmd;

      if (correct) {
        setScore(score + 1);
        speakText("Perfect! You didn't do it! Simon DIDN'T say to do that!");
        setCompletedCommands([...completedCommands, currentCommand]);
      } else {
        speakText("Uh oh! Simon DID say to do that! You should have done it!");
      }

      setIsCorrect(correct);
    };

    const nextCommand = () => {
      if (currentCommand < commands.length - 1) {
        setCurrentCommand(currentCommand + 1);
        setIsCorrect(null);
        setTimeout(
          () => speakText(commands[currentCommand + 1].instruction),
          300
        );
      }
    };

    const resetGame = () => {
      setCurrentCommand(0);
      setScore(0);
      setGameStarted(false);
      setIsCorrect(null);
      setCompletedCommands([]);
    };

    if (!gameStarted) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 text-center border-4 border-purple-300 shadow-2xl">
            <div className="text-8xl mb-4">👂</div>
            <h2 className="text-4xl font-bold text-purple-800 mb-4">
              Eco Simon Says!
            </h2>
            <p className="text-2xl text-purple-700 mb-4">
              Listen carefully! Only do what Simon says! If Simon DOESN'T say
              "Simon says", don't do it!
            </p>
            <p className="text-xl text-purple-600 mb-6">
              It's tricky! Be careful and listen for "Simon says" first!
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Playing! 🎮
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div
          className={`bg-gradient-to-r ${currentCmd.color} rounded-3xl p-6 text-center border-4 border-white shadow-2xl`}
        >
          <div className="text-8xl mb-4">{currentCmd.emoji}</div>
          <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {currentCmd.instruction}
          </h3>
          <div className="text-3xl font-bold text-white drop-shadow-lg">
            Score: {score} / {commands.length}
          </div>
        </div>

        {isCorrect === null ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDo}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Do It! ✓
            </button>
            <button
              onClick={handleDontDo}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Don't Do It! ✗
            </button>
          </div>
        ) : (
          <div
            className={`rounded-3xl p-6 text-center border-4 ${
              isCorrect
                ? "bg-green-100 border-green-400"
                : "bg-orange-100 border-orange-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "🎉" : "🤔"}</div>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {isCorrect ? "You're listening well!" : "Oops! Try again!"}
            </p>

            {currentCommand < commands.length - 1 ? (
              <button
                onClick={nextCommand}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-4 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Next Command 👂
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-4 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Play Again 🔄
              </button>
            )}
          </div>
        )}

        {/* Progress indicators */}
        <div className="grid grid-cols-4 gap-2">
          {commands.map((cmd, index) => (
            <div
              key={index}
              className={`rounded-xl p-3 text-center border-2 transition-all ${
                completedCommands.includes(index)
                  ? "bg-green-200 border-green-400"
                  : index === currentCommand
                  ? "bg-blue-200 border-blue-400"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="text-3xl">{cmd.emoji}</div>
              {completedCommands.includes(index) && (
                <div className="text-lg">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function ClimateFreezeDance() {
    const [gameState, setGameState] = useState("start");
    const [currentPose, setCurrentPose] = useState(0);
    const [score, setScore] = useState(0);
    const [isMusic, setIsMusic] = useState(false);

    const poses = [
      {
        name: "Tree in the Wind",
        emoji: "🌳",
        instruction: "Sway like a tree in the wind!",
        color: "from-green-400 to-emerald-500",
        description: "Trees bend and sway when the wind blows.",
      },
      {
        name: "Melting Ice Block",
        emoji: "❄️",
        instruction: "Slowly melt like ice on a hot day!",
        color: "from-cyan-400 to-blue-500",
        description: "Ice melts into water when it gets warm.",
      },
      {
        name: "Falling Raindrop",
        emoji: "💧",
        instruction: "Fall gently like a raindrop!",
        color: "from-blue-300 to-purple-400",
        description: "Raindrops fall from the sky to help plants grow.",
      },
      {
        name: "Spinning Tornado",
        emoji: "🌪️",
        instruction: "Spin like a spinning tornado!",
        color: "from-gray-400 to-slate-500",
        description: "Strong winds create spinning tornadoes.",
      },
      {
        name: "Growing Flower",
        emoji: "🌸",
        instruction: "Grow tall like a beautiful flower!",
        color: "from-pink-400 to-rose-500",
        description: "Flowers need sun, rain, and warmth to grow.",
      },
      {
        name: "Sleepy Bear",
        emoji: "🐻",
        instruction: "Curl up and sleep like a bear in winter!",
        color: "from-amber-400 to-orange-500",
        description: "Bears hibernate during cold winters to save energy.",
      },
    ];

    const currentPoseData = poses[currentPose];

    const playSound = () => {
      const audioContext = (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 400;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    };

    const startGame = () => {
      setGameState("playing");
      setIsMusic(true);
    };

    const pauseMusic = () => {
      setIsMusic(false);
      playSound();
      speakText("Freeze! " + currentPoseData.instruction);
    };

    const correctPose = () => {
      setScore(score + 1);
      speakText("Perfect freeze! You're amazing!");
      if (currentPose < poses.length - 1) {
        setTimeout(() => {
          setCurrentPose(currentPose + 1);
          setIsMusic(true);
        }, 1500);
      } else {
        setGameState("complete");
      }
    };

    const playAgain = () => {
      setGameState("start");
      setCurrentPose(0);
      setScore(0);
      setIsMusic(false);
    };

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    };

    if (gameState === "start") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 text-center border-4 border-blue-300 shadow-2xl">
            <div className="text-8xl mb-4 animate-bounce">💃</div>
            <h2 className="text-4xl font-bold text-blue-800 mb-4">
              Climate Freeze Dance!
            </h2>
            <p className="text-2xl text-blue-700 mb-4">
              Dance to the music! When the music stops, freeze in a special
              pose!
            </p>
            <p className="text-xl text-blue-600 mb-6">
              Learn about weather and climate through fun freeze dance moves!
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Dancing! 🎵
            </button>
          </div>
        </div>
      );
    }

    if (gameState === "complete") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8 text-center border-4 border-green-300 shadow-2xl">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Amazing Job!
            </h2>
            <p className="text-3xl font-bold text-green-700 mb-2">
              Score: {score} / {poses.length}
            </p>
            <p className="text-2xl text-green-600 mb-6">
              You froze in all the climate poses! You're a climate expert!
            </p>
            <button
              onClick={playAgain}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Play Again! 🔄
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div
          className={`bg-gradient-to-r ${currentPoseData.color} rounded-3xl p-6 text-center border-4 border-white shadow-2xl transition-all`}
        >
          <div className="text-8xl mb-4 animate-pulse">
            {currentPoseData.emoji}
          </div>
          <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {isMusic ? "Dance!" : currentPoseData.name}
          </h3>
          <p className="text-2xl text-white drop-shadow-lg mb-4">
            {currentPoseData.description}
          </p>
          <div className="text-3xl font-bold text-white drop-shadow-lg">
            Score: {score} / {poses.length}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {isMusic ? (
            <>
              <button
                onClick={pauseMusic}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all col-span-2"
              >
                Stop Music! ⏸️
              </button>
            </>
          ) : (
            <>
              <button
                onClick={correctPose}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Perfect Pose! ✓
              </button>
              <button
                onClick={() => {
                  setIsMusic(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-6 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Dance Again! 💃
              </button>
            </>
          )}
        </div>

        {/* Progress indicators */}
        <div className="grid grid-cols-3 gap-2">
          {poses.map((pose, index) => (
            <div
              key={index}
              className={`rounded-xl p-3 text-center border-2 transition-all ${
                index < currentPose
                  ? "bg-green-200 border-green-400"
                  : index === currentPose
                  ? "bg-blue-200 border-blue-400"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="text-3xl">{pose.emoji}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function EcoStoreGame() {
    const [gameState, setGameState] = useState("start");
    const [money, setMoney] = useState(100);
    const [inventory, setInventory] = useState({
      fruits: 0,
      bags: 0,
      bottles: 0,
      seeds: 0,
    });
    const [customers, setCustomers] = useState(0);
    const [ecoScore, setEcoScore] = useState(0);

    const items = [
      {
        id: "fruits",
        name: "Organic Fruits",
        emoji: "🍎",
        buyCost: 5,
        sellPrice: 10,
        color: "from-red-400 to-orange-500",
        description: "Fresh fruits from eco-farms!",
      },
      {
        id: "bags",
        name: "Reusable Bags",
        emoji: "👜",
        buyCost: 8,
        sellPrice: 12,
        color: "from-purple-400 to-pink-500",
        description: "Say no to plastic!",
      },
      {
        id: "bottles",
        name: "Water Bottles",
        emoji: "🧴",
        buyCost: 7,
        sellPrice: 11,
        color: "from-blue-400 to-cyan-500",
        description: "Save water, save Earth!",
      },
      {
        id: "seeds",
        name: "Seeds",
        emoji: "🌱",
        buyCost: 3,
        sellPrice: 8,
        color: "from-green-400 to-emerald-500",
        description: "Plant your garden!",
      },
    ];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const startGame = () => {
      setGameState("playing");
      speakText(
        "Welcome to your Eco Store! Buy sustainable items and sell them to happy customers!"
      );
    };

    const buyItem = (itemId) => {
      const item = items.find((i) => i.id === itemId);
      if (money >= item.buyCost) {
        setMoney(money - item.buyCost);
        setInventory({
          ...inventory,
          [itemId]: inventory[itemId] + 1,
        });
        speakText(`You bought ${item.name}! Great choice!`);
      } else {
        speakText("You don't have enough money!");
      }
    };

    const sellItem = (itemId) => {
      const item = items.find((i) => i.id === itemId);
      if (inventory[itemId] > 0) {
        setMoney(money + item.sellPrice);
        setInventory({
          ...inventory,
          [itemId]: inventory[itemId] - 1,
        });
        setCustomers(customers + 1);
        setEcoScore(ecoScore + 10);
        speakText(
          `Customer bought ${item.name}! Excellent! You earned money and helped the planet!`
        );
      } else {
        speakText("You don't have that item in stock!");
      }
    };

    const resetGame = () => {
      setGameState("start");
      setMoney(100);
      setInventory({ fruits: 0, bags: 0, bottles: 0, seeds: 0 });
      setCustomers(0);
      setEcoScore(0);
    };

    if (gameState === "start") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-100 to-lime-100 rounded-3xl p-8 text-center border-4 border-green-300 shadow-2xl">
            <div className="text-8xl mb-4">🛒</div>
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Eco Store Game!
            </h2>
            <p className="text-2xl text-green-700 mb-4">
              Open your own eco-friendly store! Buy sustainable items and sell
              them to customers!
            </p>
            <p className="text-xl text-green-600 mb-6">
              Start with 100 coins. Make smart choices and help the planet!
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Open My Store! 🌍
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Store Status */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 text-center border-3 border-yellow-400 shadow-lg">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-2xl font-bold text-yellow-800">${money}</div>
            <div className="text-sm text-yellow-700">Money</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 text-center border-3 border-blue-400 shadow-lg">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-800">{customers}</div>
            <div className="text-sm text-blue-700">Customers</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 text-center border-3 border-green-400 shadow-lg">
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-2xl font-bold text-green-800">{ecoScore}</div>
            <div className="text-sm text-green-700">Eco Score</div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 text-center border-3 border-white shadow-lg`}
            >
              <div className="text-6xl mb-2">{item.emoji}</div>
              <div className="text-lg font-bold text-white drop-shadow mb-1">
                {item.name}
              </div>
              <div className="text-sm text-white drop-shadow mb-2">
                Stock: {inventory[item.id]}
              </div>
              <div className="text-xs text-white drop-shadow mb-3">
                {item.description}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => buyItem(item.id)}
                  className="flex-1 bg-white text-gray-800 rounded-lg px-2 py-2 text-sm font-bold hover:scale-105 transition-all"
                >
                  Buy 💵 {item.buyCost}
                </button>
                <button
                  onClick={() => sellItem(item.id)}
                  className="flex-1 bg-yellow-300 text-gray-800 rounded-lg px-2 py-2 text-sm font-bold hover:scale-105 transition-all disabled:opacity-50"
                  disabled={inventory[item.id] === 0}
                >
                  Sell 💵 {item.sellPrice}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* End Game Button */}
        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-4 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Play Again 🔄
        </button>
      </div>
    );
  }

  function NatureRhythmBeats() {
    const [gameState, setGameState] = useState("start");
    const [score, setScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [playerPattern, setPlayerPattern] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const rhythms = [
      {
        name: "Thunderstorm",
        pattern: ["clap", "clap", "stomp"],
        emoji: "⛈️",
        description: "Clap-clap-stomp!",
        sounds: ["👏 👏 🦶"],
      },
      {
        name: "Woodpecker",
        pattern: ["tap", "tap", "clap"],
        emoji: "🪵",
        description: "Tap-tap-clap!",
        sounds: ["👇 👇 👏"],
      },
      {
        name: "Rain",
        pattern: ["clap", "stomp", "clap", "stomp"],
        emoji: "🌧️",
        description: "Clap-stomp-clap-stomp!",
        sounds: ["👏 🦶 👏 🦶"],
      },
      {
        name: "Heartbeat",
        pattern: ["thump", "thump"],
        emoji: "💚",
        description: "Thump-thump!",
        sounds: ["❤️ ❤️"],
      },
      {
        name: "Bird Song",
        pattern: ["chirp", "chirp", "chirp"],
        emoji: "🐦",
        description: "Chirp-chirp-chirp!",
        sounds: ["🐦 🐦 🐦"],
      },
    ];

    const speakText = (text) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const playSound = (type) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const sounds = {
          clap: "Clap!",
          stomp: "Stomp!",
          tap: "Tap!",
          thump: "Thump!",
          chirp: "Chirp!",
        };
        const utterance = new SpeechSynthesisUtterance(sounds[type] || type);
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
      }
    };

    const startGame = () => {
      setGameState("playing");
      setScore(0);
      setCurrentRound(0);
      setPlayerPattern([]);
      speakText(
        "Welcome to Nature Rhythm Beats! Listen to the pattern and repeat it!"
      );
      setTimeout(() => playRhythm(), 1000);
    };

    const playRhythm = () => {
      setIsPlaying(true);
      const rhythm = rhythms[currentRound % rhythms.length];

      setTimeout(() => {
        speakText(`Listen to the ${rhythm.name} rhythm!`);
      }, 300);

      let delay = 1500;
      rhythm.pattern.forEach((sound) => {
        setTimeout(() => {
          playSound(sound);
        }, delay);
        delay += 500;
      });

      setTimeout(() => {
        setIsPlaying(false);
      }, delay);
    };

    const handleSound = (soundType) => {
      if (isPlaying) return;

      const rhythm = rhythms[currentRound % rhythms.length];
      const nextIndex = playerPattern.length;
      const correctSound = rhythm.pattern[nextIndex];

      playSound(soundType);

      if (soundType === correctSound) {
        const newPattern = [...playerPattern, soundType];
        setPlayerPattern(newPattern);

        if (newPattern.length === rhythm.pattern.length) {
          setScore(score + 10);
          speakText(`Perfect! You got the ${rhythm.name} rhythm right!`);

          setTimeout(() => {
            setCurrentRound(currentRound + 1);
            setPlayerPattern([]);
            if (currentRound + 1 < rhythms.length) {
              playRhythm();
            } else {
              speakText("Amazing! You mastered all the nature rhythms!");
              setGameState("end");
            }
          }, 2000);
        }
      } else {
        speakText("Oops! That's not quite right. Listen again!");
        setPlayerPattern([]);
        setTimeout(() => playRhythm(), 1500);
      }
    };

    const resetGame = () => {
      setGameState("start");
      setScore(0);
      setCurrentRound(0);
      setPlayerPattern([]);
    };

    if (gameState === "start") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 text-center border-4 border-amber-300 shadow-2xl">
            <div className="text-8xl mb-4">🥁</div>
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              Nature Rhythm Beats!
            </h2>
            <p className="text-2xl text-amber-700 mb-4">
              Listen to nature sounds and repeat the rhythm patterns!
            </p>
            <p className="text-xl text-amber-600 mb-6">
              Clap like thunder, tap like woodpeckers, and thump like a
              heartbeat!
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Playing! 🎵
            </button>
          </div>
        </div>
      );
    }

    if (gameState === "end") {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-8 text-center border-4 border-green-300 shadow-2xl">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Rhythm Master!
            </h2>
            <p className="text-2xl text-green-700 mb-4">
              You mastered all the nature rhythms!
            </p>
            <div className="text-5xl font-bold text-green-600 mb-6">
              Score: {score}
            </div>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-6 text-3xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Play Again! 🔄
            </button>
          </div>
        </div>
      );
    }

    const currentRhythm = rhythms[currentRound % rhythms.length];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 text-center border-3 border-blue-400 shadow-lg">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-blue-800">{score}</div>
            <div className="text-sm text-blue-700">Score</div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 text-center border-3 border-purple-400 shadow-lg">
            <div className="text-4xl mb-2">🎵</div>
            <div className="text-2xl font-bold text-purple-800">
              {currentRound + 1}/{rhythms.length}
            </div>
            <div className="text-sm text-purple-700">Rhythms</div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-br from-${
            currentRhythm.emoji === "⛈️" ? "gray" : "amber"
          }-100 to-${
            currentRhythm.emoji === "⛈️" ? "slate" : "orange"
          }-100 rounded-3xl p-8 text-center border-4 border-amber-300 shadow-2xl`}
        >
          <div className="text-8xl mb-4">{currentRhythm.emoji}</div>
          <h3 className="text-4xl font-bold text-amber-800 mb-2">
            {currentRhythm.name}
          </h3>
          <p className="text-2xl text-amber-700 mb-4">
            {currentRhythm.description}
          </p>
          {isPlaying && (
            <p className="text-xl text-amber-600 animate-pulse">
              🎧 Listening... Remember the pattern!
            </p>
          )}
          {!isPlaying && playerPattern.length > 0 && (
            <p className="text-lg text-green-600 font-bold">
              {playerPattern.length}/{currentRhythm.pattern.length} ✓
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSound("clap")}
            disabled={isPlaying}
            className="bg-gradient-to-br from-red-400 to-pink-500 text-white rounded-2xl p-4 text-3xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105 transition-all"
          >
            👏 Clap
          </button>
          <button
            onClick={() => handleSound("stomp")}
            disabled={isPlaying}
            className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-2xl p-4 text-3xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105 transition-all"
          >
            🦶 Stomp
          </button>
          <button
            onClick={() => handleSound("tap")}
            disabled={isPlaying}
            className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl p-4 text-3xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105 transition-all"
          >
            👇 Tap
          </button>
          <button
            onClick={() => handleSound("thump")}
            disabled={isPlaying}
            className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-2xl p-4 text-3xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105 transition-all"
          >
            ❤️ Thump
          </button>
        </div>

        <button
          onClick={() => {
            setIsPlaying(false);
            playRhythm();
          }}
          disabled={isPlaying}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 text-2xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105 transition-all"
        >
          🔊 Play Rhythm Again
        </button>

        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-2xl p-4 text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Start Over 🔄
        </button>
      </div>
    );
  }

  // Grades 6-9 Games
  function CarbonFootprint() {
    const [co2Total, setCo2Total] = useState(0);
    const [itemsSelected, setItemsSelected] = useState([]);

    const dailyActivities = [
      { activity: "Eating meat", co2: 5.8, emoji: "🥩", unit: "kg CO₂" },
      { activity: "Driving a car", co2: 0.41, emoji: "🚗", unit: "kg CO₂/km" },
      {
        activity: "Taking a flight",
        co2: 0.255,
        emoji: "✈️",
        unit: "kg CO₂/km",
      },
      {
        activity: "Using electricity",
        co2: 0.233,
        emoji: "💡",
        unit: "kg CO₂/kWh",
      },
      { activity: "Using plastic", co2: 6, emoji: "♻️", unit: "kg CO₂" },
      { activity: "Eating vegetables", co2: 0.9, emoji: "🥕", unit: "kg CO₂" },
    ];

    const handleActivity = (activity) => {
      if (!itemsSelected.includes(activity.activity)) {
        setItemsSelected([...itemsSelected, activity.activity]);
        setCo2Total(co2Total + activity.co2);
      }
    };

    const resetGame = () => {
      setCo2Total(0);
      setItemsSelected([]);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Carbon Footprint Calculator
          </h2>
          <p className="text-2xl font-bold text-red-600">
            Total CO₂: {co2Total.toFixed(2)} kg
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {dailyActivities.map((activity) => (
            <button
              key={activity.activity}
              onClick={() => handleActivity(activity)}
              disabled={itemsSelected.includes(activity.activity)}
              className={`rounded-2xl p-4 font-bold text-center transform hover:scale-105 transition-all ${
                itemsSelected.includes(activity.activity)
                  ? "bg-gray-400 text-white opacity-50"
                  : "bg-white border-4 border-gray-300 hover:border-red-500"
              }`}
            >
              <div className="text-4xl mb-2">{activity.emoji}</div>
              <p className="text-sm font-bold">{activity.activity}</p>
              <p className="text-xs text-gray-600">
                {activity.co2} {activity.unit}
              </p>
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-2xl font-bold"
        >
          Reset 🔄
        </button>
      </div>
    );
  }

  function EcosystemBuilder() {
    const [plants, setPlants] = useState(5);
    const [herbivores, setHerbivores] = useState(3);
    const [carnivores, setCarnivores] = useState(1);
    const [water, setWater] = useState(50);
    const [health, setHealth] = useState(100);
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [message, setMessage] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      if (!isRunning || gameOver || won) return;

      const interval = setInterval(() => {
        setTime((prev) => prev + 1);

        // Ecosystem simulation logic
        setPlants((prev) => {
          const growth = water > 30 ? 0.5 : -0.3;
          return Math.min(20, Math.max(0, prev + growth));
        });

        setHerbivores((prev) => {
          const food = plants > herbivores * 1.5 ? 0.3 : -0.4;
          return Math.min(15, Math.max(0, prev + food));
        });

        setCarnivores((prev) => {
          const prey = herbivores > carnivores * 2 ? 0.2 : -0.3;
          return Math.min(10, Math.max(0, prev + prey));
        });

        setWater((prev) => Math.max(0, prev - 2));

        // Calculate ecosystem health
        const balance =
          Math.abs(plants - herbivores * 2) +
          Math.abs(herbivores - carnivores * 3);
        const newHealth = Math.max(0, 100 - balance * 5);
        setHealth(newHealth);

        if (newHealth <= 0 || plants <= 0 || herbivores <= 0) {
          setGameOver(true);
          setMessage("Ecosystem collapsed! Try to maintain better balance.");
        }

        if (time >= 60 && newHealth >= 70) {
          setWon(true);
          setMessage("Ecosystem thriving! You maintained perfect balance!");
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [isRunning, gameOver, won, plants, herbivores, carnivores, water, time]);

    const addWater = () => setWater((prev) => Math.min(100, prev + 20));
    const addPlant = () => setPlants((prev) => Math.min(20, prev + 2));
    const addHerbivore = () => {
      if (plants >= 3) setHerbivores((prev) => Math.min(15, prev + 1));
      else setMessage("Need more plants first!");
    };
    const addCarnivore = () => {
      if (herbivores >= 2) setCarnivores((prev) => Math.min(10, prev + 1));
      else setMessage("Need more herbivores first!");
    };

    const resetGame = () => {
      setPlants(5);
      setHerbivores(3);
      setCarnivores(1);
      setWater(50);
      setHealth(100);
      setTime(0);
      setGameOver(false);
      setWon(false);
      setMessage("");
      setIsRunning(false);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Ecosystem Builder
          </h2>
          <p className="text-gray-600">
            Build and maintain a balanced ecosystem for 60 seconds!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-100 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-2">🌿</div>
            <div className="text-2xl font-bold text-green-700">
              {Math.floor(plants)}
            </div>
            <div className="text-sm text-green-600">Plants</div>
          </div>
          <div className="bg-amber-100 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-2">🐰</div>
            <div className="text-2xl font-bold text-amber-700">
              {Math.floor(herbivores)}
            </div>
            <div className="text-sm text-amber-600">Herbivores</div>
          </div>
          <div className="bg-red-100 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-2">🦊</div>
            <div className="text-2xl font-bold text-red-700">
              {Math.floor(carnivores)}
            </div>
            <div className="text-sm text-red-600">Carnivores</div>
          </div>
          <div className="bg-blue-100 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-2">💧</div>
            <div className="text-2xl font-bold text-blue-700">
              {Math.floor(water)}%
            </div>
            <div className="text-sm text-blue-600">Water</div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-4">
          <div className="flex justify-between mb-2">
            <span className="font-bold">Ecosystem Health</span>
            <span className="font-bold">{Math.floor(health)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                health > 70
                  ? "bg-green-500"
                  : health > 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${health}%` }}
            />
          </div>
          <div className="text-center mt-2 text-gray-600">
            Time: {time}s / 60s
          </div>
        </div>

        {message && (
          <div
            className={`text-center p-3 rounded-xl font-bold ${
              won
                ? "bg-green-200 text-green-800"
                : gameOver
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {message}
          </div>
        )}

        {!isRunning && !gameOver && !won ? (
          <button
            onClick={() => setIsRunning(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 text-xl font-bold hover:scale-105 transition-all"
          >
            Start Simulation
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={addWater}
              disabled={gameOver || won}
              className="bg-blue-500 text-white rounded-xl p-3 font-bold disabled:opacity-50"
            >
              💧 Add Water
            </button>
            <button
              onClick={addPlant}
              disabled={gameOver || won}
              className="bg-green-500 text-white rounded-xl p-3 font-bold disabled:opacity-50"
            >
              🌿 Plant Seed
            </button>
            <button
              onClick={addHerbivore}
              disabled={gameOver || won}
              className="bg-amber-500 text-white rounded-xl p-3 font-bold disabled:opacity-50"
            >
              🐰 Add Herbivore
            </button>
            <button
              onClick={addCarnivore}
              disabled={gameOver || won}
              className="bg-red-500 text-white rounded-xl p-3 font-bold disabled:opacity-50"
            >
              🦊 Add Carnivore
            </button>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-4 text-xl font-bold"
        >
          Reset Game
        </button>
      </div>
    );
  }

  function OceanRescue() {
    const [playerX, setPlayerX] = useState(50);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [trash, setTrash] = useState([]);
    const [marineLife, setMarineLife] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [cleanedItems, setCleanedItems] = useState(0);
    const gameRef = useRef(null);

    useEffect(() => {
      if (!isRunning || gameOver) return;

      const spawnInterval = setInterval(() => {
        const isTrash = Math.random() > 0.3;
        const newItem = {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          y: 0,
          type: isTrash ? "trash" : "marine",
          emoji: isTrash
            ? ["🥤", "🛢️", "🛍️", "📦", "🍶"][Math.floor(Math.random() * 5)]
            : ["🐟", "🐠", "🐬", "🐢", "🦀"][Math.floor(Math.random() * 5)],
        };
        if (isTrash) {
          setTrash((prev) => [...prev, newItem]);
        } else {
          setMarineLife((prev) => [...prev, newItem]);
        }
      }, 1200);

      const moveInterval = setInterval(() => {
        setTrash((prev) => {
          const updated = prev.map((t) => ({ ...t, y: t.y + 5 }));
          const missed = updated.filter((t) => t.y >= 100);
          if (missed.length > 0) {
            setLives((l) => {
              const newLives = l - missed.length;
              if (newLives <= 0) setGameOver(true);
              return Math.max(0, newLives);
            });
          }
          return updated.filter((t) => t.y < 100);
        });

        setMarineLife((prev) =>
          prev.map((m) => ({ ...m, y: m.y + 4 })).filter((m) => m.y < 100)
        );
      }, 150);

      return () => {
        clearInterval(spawnInterval);
        clearInterval(moveInterval);
      };
    }, [isRunning, gameOver]);

    const movePlayer = (direction) => {
      setPlayerX((prev) => Math.max(5, Math.min(95, prev + direction * 10)));
    };

    const checkCollision = useCallback(() => {
      setTrash((prev) => {
        const collected = prev.filter(
          (t) => Math.abs(t.x - playerX) < 15 && t.y > 75 && t.y < 95
        );
        if (collected.length > 0) {
          setScore((s) => s + collected.length * 10);
          setCleanedItems((c) => c + collected.length);
        }
        return prev.filter(
          (t) => !(Math.abs(t.x - playerX) < 15 && t.y > 75 && t.y < 95)
        );
      });

      setMarineLife((prev) => {
        const hit = prev.filter(
          (m) => Math.abs(m.x - playerX) < 15 && m.y > 75 && m.y < 95
        );
        if (hit.length > 0) {
          setScore((s) => Math.max(0, s - hit.length * 5));
        }
        return prev.filter(
          (m) => !(Math.abs(m.x - playerX) < 15 && m.y > 75 && m.y < 95)
        );
      });
    }, [playerX]);

    useEffect(() => {
      if (isRunning) checkCollision();
    }, [playerX, isRunning, checkCollision]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") movePlayer(-1);
        if (e.key === "ArrowRight") movePlayer(1);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const resetGame = () => {
      setPlayerX(50);
      setScore(0);
      setLives(3);
      setTrash([]);
      setMarineLife([]);
      setGameOver(false);
      setIsRunning(false);
      setCleanedItems(0);
    };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Ocean Rescue Mission
          </h2>
          <p className="text-gray-600">Catch trash, avoid marine life!</p>
        </div>

        <div className="flex justify-between bg-blue-100 rounded-xl p-3">
          <div className="font-bold">Score: {score}</div>
          <div className="font-bold">Cleaned: {cleanedItems}</div>
          <div className="font-bold">Lives: {"❤️".repeat(lives)}</div>
        </div>

        {gameOver && (
          <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">🌊</div>
            <h3 className="text-2xl font-bold text-red-700 mb-2">
              Ocean Overwhelmed!
            </h3>
            <p className="text-gray-600 mb-4">
              You cleaned {cleanedItems} items. Score: {score}
            </p>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white rounded-xl px-6 py-3 font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {!gameOver && (
          <div
            ref={gameRef}
            className="relative bg-gradient-to-b from-sky-300 to-blue-600 rounded-2xl h-80 overflow-hidden"
          >
            {/* Trash items */}
            {trash.map((t) => (
              <div
                key={t.id}
                className="absolute text-3xl transition-all"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {t.emoji}
              </div>
            ))}

            {/* Marine life */}
            {marineLife.map((m) => (
              <div
                key={m.id}
                className="absolute text-3xl transition-all"
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {m.emoji}
              </div>
            ))}

            {/* Player boat */}
            <div
              className="absolute bottom-2 text-4xl transition-all duration-100"
              style={{ left: `${playerX}%`, transform: "translateX(-50%)" }}
            >
              🚤
            </div>

            {/* Net indicator */}
            <div
              className="absolute bottom-12 w-16 h-8 border-2 border-dashed border-white/50 rounded-full"
              style={{ left: `${playerX}%`, transform: "translateX(-50%)" }}
            />
          </div>
        )}

        {!isRunning && !gameOver ? (
          <button
            onClick={() => setIsRunning(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-4 text-xl font-bold"
          >
            Start Rescue Mission
          </button>
        ) : (
          !gameOver && (
            <div className="flex gap-4">
              <button
                onClick={() => movePlayer(-1)}
                className="flex-1 bg-blue-500 text-white rounded-xl p-4 text-2xl font-bold"
              >
                ⬅️ Left
              </button>
              <button
                onClick={() => movePlayer(1)}
                className="flex-1 bg-blue-500 text-white rounded-xl p-4 text-2xl font-bold"
              >
                Right ➡️
              </button>
            </div>
          )
        )}

        <div className="bg-blue-50 rounded-xl p-3 text-center text-sm text-blue-700">
          🥤 Catch trash (+10 pts) | 🐟 Avoid marine life (-5 pts) | Miss trash
          = lose a life
        </div>
      </div>
    );
  }

  function RenewablePower() {
    const [budget, setBudget] = useState(1000);
    const [powerGenerated, setPowerGenerated] = useState(0);
    const [powerNeeded] = useState(500);
    const [installations, setInstallations] = useState([]);
    const [pollution, setPollution] = useState(50);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [won, setWon] = useState(false);
    const [lost, setLost] = useState(false);

    const energySources = [
      {
        id: "solar",
        name: "Solar Panel",
        emoji: "☀️",
        cost: 150,
        power: 30,
        pollution: -5,
        weather: "sunny",
      },
      {
        id: "wind",
        name: "Wind Turbine",
        emoji: "🌀",
        cost: 200,
        power: 40,
        pollution: -8,
        weather: "windy",
      },
      {
        id: "hydro",
        name: "Hydro Dam",
        emoji: "🌊",
        cost: 300,
        power: 60,
        pollution: -10,
        weather: "rainy",
      },
      {
        id: "geothermal",
        name: "Geothermal",
        emoji: "🌋",
        cost: 250,
        power: 50,
        pollution: -7,
        weather: "any",
      },
      {
        id: "coal",
        name: "Coal Plant",
        emoji: "🏭",
        cost: 100,
        power: 80,
        pollution: 20,
        weather: "any",
      },
    ];

    const [weather, setWeather] = useState("sunny");
    const weathers = ["sunny", "windy", "rainy", "cloudy"];

    useEffect(() => {
      if (!isRunning || won || lost) return;

      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
        setWeather(weathers[Math.floor(Math.random() * weathers.length)]);

        // Calculate power based on weather and installations
        let totalPower = 0;
        installations.forEach((inst) => {
          const source = energySources.find((e) => e.id === inst.type);
          if (source) {
            let efficiency = 1;
            if (source.weather !== "any") {
              efficiency = source.weather === weather ? 1.5 : 0.5;
            }
            totalPower += source.power * efficiency;
          }
        });
        setPowerGenerated(Math.floor(totalPower));

        // Add budget over time
        setBudget((prev) => prev + 50);

        // Check win/lose conditions
        if (pollution >= 100) {
          setLost(true);
        }
        if (totalPower >= powerNeeded && pollution <= 20) {
          setWon(true);
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [isRunning, won, lost, installations, weather]);

    const installSource = (sourceId) => {
      const source = energySources.find((e) => e.id === sourceId);
      if (!source || budget < source.cost) return;

      setBudget((prev) => prev - source.cost);
      setInstallations((prev) => [...prev, { type: sourceId, id: Date.now() }]);
      setPollution((prev) =>
        Math.max(0, Math.min(100, prev + source.pollution))
      );
    };

    const resetGame = () => {
      setBudget(1000);
      setPowerGenerated(0);
      setInstallations([]);
      setPollution(50);
      setTime(0);
      setIsRunning(false);
      setWon(false);
      setLost(false);
      setWeather("sunny");
    };

    const weatherEmoji = {
      sunny: "☀️",
      windy: "💨",
      rainy: "🌧️",
      cloudy: "☁️",
    };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Renewable Power Plant
          </h2>
          <p className="text-gray-600">
            Generate {powerNeeded}kW clean energy!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-yellow-100 rounded-xl p-3 text-center">
            <div className="text-2xl">💰</div>
            <div className="font-bold text-lg">${budget}</div>
            <div className="text-xs text-gray-600">Budget</div>
          </div>
          <div className="bg-blue-100 rounded-xl p-3 text-center">
            <div className="text-2xl">{weatherEmoji[weather]}</div>
            <div className="font-bold text-lg capitalize">{weather}</div>
            <div className="text-xs text-gray-600">Weather</div>
          </div>
        </div>

        <div className="bg-green-100 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span>
              Power: {powerGenerated}/{powerNeeded} kW
            </span>
            <span
              className={
                powerGenerated >= powerNeeded ? "text-green-600 font-bold" : ""
              }
            >
              {Math.floor((powerGenerated / powerNeeded) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  100,
                  (powerGenerated / powerNeeded) * 100
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span>Pollution Level</span>
            <span className={pollution > 70 ? "text-red-600 font-bold" : ""}>
              {pollution}%
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                pollution > 70
                  ? "bg-red-500"
                  : pollution > 40
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${pollution}%` }}
            />
          </div>
        </div>

        {(won || lost) && (
          <div
            className={`rounded-2xl p-6 text-center ${
              won
                ? "bg-green-100 border-4 border-green-400"
                : "bg-red-100 border-4 border-red-400"
            }`}
          >
            <div className="text-6xl mb-4">{won ? "⚡" : "🏭"}</div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                won ? "text-green-700" : "text-red-700"
              }`}
            >
              {won ? "Clean Energy Success!" : "Pollution Too High!"}
            </h3>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white rounded-xl px-6 py-3 font-bold mt-4"
            >
              Play Again
            </button>
          </div>
        )}

        {!won && !lost && (
          <>
            <div className="flex flex-wrap gap-2 justify-center">
              {installations.map((inst) => {
                const source = energySources.find((e) => e.id === inst.type);
                return (
                  <span key={inst.id} className="text-2xl">
                    {source?.emoji}
                  </span>
                );
              })}
              {installations.length === 0 && (
                <span className="text-gray-400">No installations yet</span>
              )}
            </div>

            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 text-xl font-bold"
              >
                Start Building
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {energySources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => installSource(source.id)}
                    disabled={budget < source.cost}
                    className={`rounded-xl p-3 font-bold text-sm disabled:opacity-50 ${
                      source.pollution > 0
                        ? "bg-gray-400 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    <span className="text-2xl">{source.emoji}</span>
                    <div>{source.name}</div>
                    <div className="text-xs">
                      ${source.cost} | {source.power}kW
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-3 font-bold"
        >
          Reset
        </button>
      </div>
    );
  }

  function RecyclingMaster() {
    const [currentItem, setCurrentItem] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [recycledCount, setRecycledCount] = useState({
      paper: 0,
      plastic: 0,
      glass: 0,
      metal: 0,
      organic: 0,
      trash: 0,
    });

    const items = [
      {
        name: "Newspaper",
        emoji: "📰",
        bin: "paper",
        fact: "Paper can be recycled 5-7 times!",
      },
      {
        name: "Cardboard Box",
        emoji: "📦",
        bin: "paper",
        fact: "Recycling cardboard saves 75% energy!",
      },
      {
        name: "Plastic Bottle",
        emoji: "🍶",
        bin: "plastic",
        fact: "Plastic takes 450 years to decompose!",
      },
      {
        name: "Plastic Bag",
        emoji: "🛍️",
        bin: "plastic",
        fact: "1 million bags are used every minute!",
      },
      {
        name: "Glass Jar",
        emoji: "🫙",
        bin: "glass",
        fact: "Glass is 100% recyclable infinitely!",
      },
      {
        name: "Wine Bottle",
        emoji: "🍾",
        bin: "glass",
        fact: "Recycled glass melts at lower temps!",
      },
      {
        name: "Soda Can",
        emoji: "🥫",
        bin: "metal",
        fact: "Aluminum cans recycle in 60 days!",
      },
      {
        name: "Tin Can",
        emoji: "🥫",
        bin: "metal",
        fact: "Steel cans are the most recycled!",
      },
      {
        name: "Banana Peel",
        emoji: "🍌",
        bin: "organic",
        fact: "Organic waste makes great compost!",
      },
      {
        name: "Apple Core",
        emoji: "🍎",
        bin: "organic",
        fact: "Composting reduces methane emissions!",
      },
      {
        name: "Broken Mirror",
        emoji: "🪞",
        bin: "trash",
        fact: "Broken glass is too dangerous to recycle!",
      },
      {
        name: "Styrofoam",
        emoji: "📋",
        bin: "trash",
        fact: "Styrofoam is rarely recyclable!",
      },
      {
        name: "Magazine",
        emoji: "📖",
        bin: "paper",
        fact: "Magazines can become new paper!",
      },
      {
        name: "Milk Jug",
        emoji: "🥛",
        bin: "plastic",
        fact: "HDPE plastic is highly recyclable!",
      },
      {
        name: "Food Scraps",
        emoji: "🥕",
        bin: "organic",
        fact: "30% of waste is compostable!",
      },
    ];

    const bins = [
      { id: "paper", name: "Paper", emoji: "📄", color: "bg-blue-500" },
      { id: "plastic", name: "Plastic", emoji: "♻️", color: "bg-yellow-500" },
      { id: "glass", name: "Glass", emoji: "🪟", color: "bg-green-500" },
      { id: "metal", name: "Metal", emoji: "🔩", color: "bg-gray-500" },
      { id: "organic", name: "Organic", emoji: "🌱", color: "bg-amber-600" },
      { id: "trash", name: "Trash", emoji: "🗑️", color: "bg-slate-700" },
    ];

    useEffect(() => {
      if (!isPlaying || gameOver) return;

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [isPlaying, gameOver]);

    const handleBinClick = (binId) => {
      const item = items[currentItem];
      const isCorrect = item.bin === binId;

      if (isCorrect) {
        setScore((prev) => prev + 10 + streak * 2);
        setStreak((prev) => prev + 1);
        setRecycledCount((prev) => ({ ...prev, [binId]: prev[binId] + 1 }));
        setFeedback({ correct: true, message: `Correct! ${item.fact}` });
      } else {
        setScore((prev) => Math.max(0, prev - 5));
        setStreak(0);
        setFeedback({
          correct: false,
          message: `Oops! ${item.name} goes in ${
            bins.find((b) => b.id === item.bin)?.name
          }`,
        });
      }

      setTimeout(() => {
        setFeedback(null);
        setCurrentItem((prev) => (prev + 1) % items.length);
      }, 1500);
    };

    const resetGame = () => {
      setCurrentItem(0);
      setScore(0);
      setStreak(0);
      setTimeLeft(60);
      setIsPlaying(false);
      setGameOver(false);
      setFeedback(null);
      setRecycledCount({
        paper: 0,
        plastic: 0,
        glass: 0,
        metal: 0,
        organic: 0,
        trash: 0,
      });
    };

    const currentItemData = items[currentItem];

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Recycling Master
          </h2>
          <p className="text-gray-600">Sort items into the correct bins!</p>
        </div>

        <div className="flex justify-between bg-green-100 rounded-xl p-3">
          <div className="font-bold">Score: {score}</div>
          <div className="font-bold">Streak: {streak}🔥</div>
          <div className="font-bold">Time: {timeLeft}s</div>
        </div>

        {gameOver && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Great Job!
            </h3>
            <p className="text-xl mb-2">Final Score: {score}</p>
            <div className="grid grid-cols-3 gap-2 my-4 text-sm">
              {bins.map((bin) => (
                <div
                  key={bin.id}
                  className={`${bin.color} text-white rounded-lg p-2`}
                >
                  {bin.emoji} {recycledCount[bin.id]}
                </div>
              ))}
            </div>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white rounded-xl px-6 py-3 font-bold"
            >
              Play Again
            </button>
          </div>
        )}

        {!gameOver && !isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 text-xl font-bold"
          >
            Start Sorting!
          </button>
        )}

        {isPlaying && !gameOver && (
          <>
            <div className="bg-white border-4 border-gray-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-7xl mb-4 animate-bounce">
                {currentItemData.emoji}
              </div>
              <div className="text-2xl font-bold">{currentItemData.name}</div>
            </div>

            {feedback && (
              <div
                className={`text-center p-3 rounded-xl font-bold ${
                  feedback.correct
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              {bins.map((bin) => (
                <button
                  key={bin.id}
                  onClick={() => handleBinClick(bin.id)}
                  disabled={!!feedback}
                  className={`${bin.color} text-white rounded-xl p-3 font-bold disabled:opacity-50 hover:scale-105 transition-all`}
                >
                  <div className="text-2xl">{bin.emoji}</div>
                  <div className="text-xs">{bin.name}</div>
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-3 font-bold"
        >
          Reset
        </button>
      </div>
    );
  }

  function ClimateDetective() {
    const [currentCase, setCurrentCase] = useState(0);
    const [score, setScore] = useState(0);
    const [cluesFound, setCluesFound] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);

    const cases = [
      {
        id: 1,
        title: "The Rising Seas Mystery",
        scene: "🌊",
        description:
          "Sea levels have risen 8 inches since 1900. What's causing this?",
        clues: [
          {
            id: 1,
            emoji: "🌡️",
            text: "Global temperature rose 1.1°C",
            found: false,
          },
          {
            id: 2,
            emoji: "🧊",
            text: "Arctic ice melting 13% per decade",
            found: false,
          },
          {
            id: 3,
            emoji: "🏔️",
            text: "Glaciers shrinking worldwide",
            found: false,
          },
        ],
        question: "What is the main cause of rising sea levels?",
        options: [
          { id: "a", text: "More rain", correct: false },
          { id: "b", text: "Melting ice caps due to warming", correct: true },
          { id: "c", text: "Ocean currents changing", correct: false },
        ],
        explanation:
          "As global temperatures rise, ice sheets and glaciers melt, adding water to the oceans.",
      },
      {
        id: 2,
        title: "The Vanishing Coral Case",
        scene: "🪸",
        description: "50% of coral reefs have died since 1950. Investigate!",
        clues: [
          {
            id: 1,
            emoji: "🌡️",
            text: "Ocean temperature up 0.5°C",
            found: false,
          },
          {
            id: 2,
            emoji: "🧪",
            text: "Ocean acidity increased 30%",
            found: false,
          },
          {
            id: 3,
            emoji: "☀️",
            text: "Corals losing their color (bleaching)",
            found: false,
          },
        ],
        question: "Why are coral reefs dying?",
        options: [
          { id: "a", text: "Too many fish", correct: false },
          { id: "b", text: "Ocean warming and acidification", correct: true },
          { id: "c", text: "Lack of sunlight", correct: false },
        ],
        explanation:
          "Warmer, more acidic oceans stress corals, causing them to expel algae and bleach.",
      },
      {
        id: 3,
        title: "The Extreme Weather File",
        scene: "🌪️",
        description: "Hurricanes are 25% more intense than 40 years ago. Why?",
        clues: [
          {
            id: 1,
            emoji: "🌊",
            text: "Ocean surface warmer by 1°C",
            found: false,
          },
          {
            id: 2,
            emoji: "💨",
            text: "More water vapor in atmosphere",
            found: false,
          },
          {
            id: 3,
            emoji: "📈",
            text: "Category 4-5 storms doubled",
            found: false,
          },
        ],
        question: "What makes hurricanes stronger?",
        options: [
          {
            id: "a",
            text: "Warmer ocean water provides more energy",
            correct: true,
          },
          { id: "b", text: "Wind patterns changing direction", correct: false },
          { id: "c", text: "Moon's gravity increasing", correct: false },
        ],
        explanation:
          "Hurricanes draw energy from warm water. Warmer oceans = stronger storms.",
      },
      {
        id: 4,
        title: "The Carbon Mystery",
        scene: "🏭",
        description:
          "CO2 levels are highest in 800,000 years. Trace the source!",
        clues: [
          {
            id: 1,
            emoji: "🚗",
            text: "Transportation emits 29% of CO2",
            found: false,
          },
          {
            id: 2,
            emoji: "⚡",
            text: "Power plants emit 25% of CO2",
            found: false,
          },
          {
            id: 3,
            emoji: "🌲",
            text: "Deforestation releases stored carbon",
            found: false,
          },
        ],
        question: "What is the biggest contributor to rising CO2?",
        options: [
          { id: "a", text: "Natural volcanic activity", correct: false },
          { id: "b", text: "Burning fossil fuels", correct: true },
          { id: "c", text: "Ocean evaporation", correct: false },
        ],
        explanation:
          "Burning coal, oil, and gas releases carbon that was stored for millions of years.",
      },
    ];

    const currentCaseData = cases[currentCase];

    const findClue = (clueId) => {
      if (cluesFound.includes(clueId)) return;
      setCluesFound((prev) => [...prev, clueId]);
      setScore((prev) => prev + 10);
    };

    const submitAnswer = (optionId) => {
      setSelectedAnswer(optionId);
      setShowResult(true);
      const option = currentCaseData.options.find((o) => o.id === optionId);
      if (option?.correct) {
        setScore((prev) => prev + 30);
      }
    };

    const nextCase = () => {
      if (currentCase < cases.length - 1) {
        setCurrentCase((prev) => prev + 1);
        setCluesFound([]);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameComplete(true);
      }
    };

    const resetGame = () => {
      setCurrentCase(0);
      setScore(0);
      setCluesFound([]);
      setSelectedAnswer(null);
      setShowResult(false);
      setGameComplete(false);
    };

    if (gameComplete) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-8xl">🕵️</div>
          <h2 className="text-3xl font-bold text-gray-800">Case Closed!</h2>
          <p className="text-xl">You're a certified Climate Detective!</p>
          <div className="bg-green-100 rounded-2xl p-6">
            <div className="text-4xl font-bold text-green-700">
              {score} points
            </div>
            <div className="text-gray-600">
              Evidence collected from {cases.length} cases
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-indigo-500 text-white rounded-xl px-8 py-4 font-bold text-xl"
          >
            New Investigation
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Climate Detective
          </h2>
          <p className="text-gray-600">
            Case {currentCase + 1} of {cases.length}
          </p>
        </div>

        <div className="flex justify-between bg-indigo-100 rounded-xl p-3">
          <div className="font-bold">Score: {score}</div>
          <div className="font-bold">Clues: {cluesFound.length}/3</div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-6xl text-center mb-4">
            {currentCaseData.scene}
          </div>
          <h3 className="text-xl font-bold mb-2">{currentCaseData.title}</h3>
          <p>{currentCaseData.description}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-gray-700">Find the clues:</h4>
          <div className="grid grid-cols-1 gap-2">
            {currentCaseData.clues.map((clue) => (
              <button
                key={clue.id}
                onClick={() => findClue(clue.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  cluesFound.includes(clue.id)
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-gray-100 hover:bg-gray-200 border-2 border-gray-200"
                }`}
              >
                <span className="text-2xl">{clue.emoji}</span>
                <span
                  className={
                    cluesFound.includes(clue.id)
                      ? "text-green-700"
                      : "text-gray-500"
                  }
                >
                  {cluesFound.includes(clue.id)
                    ? clue.text
                    : "??? Click to investigate"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {cluesFound.length === 3 && !showResult && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-700">
              {currentCaseData.question}
            </h4>
            {currentCaseData.options.map((option) => (
              <button
                key={option.id}
                onClick={() => submitAnswer(option.id)}
                className="w-full bg-indigo-100 hover:bg-indigo-200 rounded-xl p-3 text-left font-medium"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {showResult && (
          <div
            className={`rounded-2xl p-4 ${
              selectedAnswer &&
              currentCaseData.options.find((o) => o.id === selectedAnswer)
                ?.correct
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <div className="text-2xl mb-2">
              {currentCaseData.options.find((o) => o.id === selectedAnswer)
                ?.correct
                ? "✅ Correct!"
                : "❌ Not quite!"}
            </div>
            <p className="text-gray-700">{currentCaseData.explanation}</p>
            <button
              onClick={nextCase}
              className="mt-4 bg-indigo-500 text-white rounded-xl px-6 py-2 font-bold"
            >
              {currentCase < cases.length - 1
                ? "Next Case"
                : "Complete Investigation"}
            </button>
          </div>
        )}
      </div>
    );
  }

  function WaterCycleAdventure() {
    const [stage, setStage] = useState("ocean");
    const [dropletState, setDropletState] = useState("liquid");
    const [journeyLog, setJourneyLog] = useState([]);
    const [points, setPoints] = useState(0);
    const [cyclesCompleted, setCyclesCompleted] = useState(0);
    const [showFact, setShowFact] = useState(null);

    const stages = {
      ocean: {
        emoji: "🌊",
        name: "Ocean",
        description: "You are a water droplet in the vast ocean.",
        color: "from-blue-400 to-blue-600",
        actions: [
          {
            id: "evaporate",
            text: "Evaporate into the sky",
            nextStage: "cloud",
            stateChange: "vapor",
            points: 10,
          },
          {
            id: "stay",
            text: "Stay in the ocean",
            nextStage: "ocean",
            stateChange: "liquid",
            points: 0,
          },
        ],
        fact: "Oceans hold 97% of Earth's water!",
      },
      cloud: {
        emoji: "☁️",
        name: "Cloud",
        description: "You float high in the atmosphere as water vapor.",
        color: "from-gray-300 to-blue-300",
        actions: [
          {
            id: "rain",
            text: "Fall as rain",
            nextStage: "land",
            stateChange: "liquid",
            points: 15,
          },
          {
            id: "snow",
            text: "Fall as snow",
            nextStage: "mountain",
            stateChange: "solid",
            points: 15,
          },
          {
            id: "drift",
            text: "Drift with the wind",
            nextStage: "cloud",
            stateChange: "vapor",
            points: 5,
          },
        ],
        fact: "Clouds form when water vapor cools and condenses!",
      },
      land: {
        emoji: "🌍",
        name: "Land",
        description: "You landed on the ground as rain.",
        color: "from-green-400 to-emerald-600",
        actions: [
          {
            id: "river",
            text: "Flow into a river",
            nextStage: "river",
            stateChange: "liquid",
            points: 10,
          },
          {
            id: "soil",
            text: "Soak into the soil",
            nextStage: "groundwater",
            stateChange: "liquid",
            points: 10,
          },
          {
            id: "plant",
            text: "Get absorbed by a plant",
            nextStage: "plant",
            stateChange: "liquid",
            points: 15,
          },
        ],
        fact: "Only 3% of Earth's water is fresh water!",
      },
      mountain: {
        emoji: "🏔️",
        name: "Mountain",
        description: "You are frozen as snow on a mountain peak.",
        color: "from-white to-blue-200",
        actions: [
          {
            id: "melt",
            text: "Melt in spring",
            nextStage: "river",
            stateChange: "liquid",
            points: 10,
          },
          {
            id: "glacier",
            text: "Become part of a glacier",
            nextStage: "glacier",
            stateChange: "solid",
            points: 20,
          },
        ],
        fact: "Glaciers store about 69% of Earth's fresh water!",
      },
      river: {
        emoji: "🏞️",
        name: "River",
        description: "You flow downstream in a rushing river.",
        color: "from-cyan-400 to-blue-500",
        actions: [
          {
            id: "ocean",
            text: "Flow to the ocean",
            nextStage: "ocean",
            stateChange: "liquid",
            points: 20,
            completeCycle: true,
          },
          {
            id: "lake",
            text: "Enter a lake",
            nextStage: "lake",
            stateChange: "liquid",
            points: 10,
          },
        ],
        fact: "Rivers carry water and nutrients to the ocean!",
      },
      lake: {
        emoji: "🏊",
        name: "Lake",
        description: "You rest in a calm lake.",
        color: "from-blue-300 to-cyan-500",
        actions: [
          {
            id: "evaporate",
            text: "Evaporate into clouds",
            nextStage: "cloud",
            stateChange: "vapor",
            points: 15,
          },
          {
            id: "river",
            text: "Flow out through a river",
            nextStage: "river",
            stateChange: "liquid",
            points: 10,
          },
        ],
        fact: "Lakes contain about 87% of surface fresh water!",
      },
      groundwater: {
        emoji: "💧",
        name: "Groundwater",
        description: "You flow slowly through underground aquifers.",
        color: "from-amber-600 to-brown-700",
        actions: [
          {
            id: "spring",
            text: "Emerge at a spring",
            nextStage: "river",
            stateChange: "liquid",
            points: 15,
          },
          {
            id: "well",
            text: "Get pumped up by a well",
            nextStage: "land",
            stateChange: "liquid",
            points: 10,
          },
        ],
        fact: "Groundwater can be thousands of years old!",
      },
      plant: {
        emoji: "🌱",
        name: "Plant",
        description: "You travel up through a plant's roots and stem.",
        color: "from-green-500 to-lime-600",
        actions: [
          {
            id: "transpire",
            text: "Transpire through leaves",
            nextStage: "cloud",
            stateChange: "vapor",
            points: 20,
          },
        ],
        fact: "Plants release water through transpiration!",
      },
      glacier: {
        emoji: "🧊",
        name: "Glacier",
        description: "You are frozen in an ancient glacier.",
        color: "from-cyan-200 to-blue-300",
        actions: [
          {
            id: "melt",
            text: "Melt (climate change)",
            nextStage: "ocean",
            stateChange: "liquid",
            points: 15,
            completeCycle: true,
          },
          {
            id: "wait",
            text: "Stay frozen for centuries",
            nextStage: "glacier",
            stateChange: "solid",
            points: 5,
          },
        ],
        fact: "Some glacier ice is over 100,000 years old!",
      },
    };

    const currentStage = stages[stage];

    const takeAction = (action) => {
      setJourneyLog((prev) => [...prev, { stage, action: action.text }]);
      setPoints((prev) => prev + action.points);
      setDropletState(action.stateChange);
      setShowFact(currentStage.fact);

      if (action.completeCycle) {
        setCyclesCompleted((prev) => prev + 1);
      }

      setTimeout(() => {
        setShowFact(null);
        setStage(action.nextStage);
      }, 2000);
    };

    const resetGame = () => {
      setStage("ocean");
      setDropletState("liquid");
      setJourneyLog([]);
      setPoints(0);
      setCyclesCompleted(0);
      setShowFact(null);
    };

    const stateEmoji = { liquid: "💧", vapor: "💨", solid: "❄️" };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Water Cycle Adventure
          </h2>
          <p className="text-gray-600">Journey as a water droplet!</p>
        </div>

        <div className="flex justify-between bg-blue-100 rounded-xl p-3">
          <div className="font-bold">Points: {points}</div>
          <div className="font-bold">State: {stateEmoji[dropletState]}</div>
          <div className="font-bold">Cycles: {cyclesCompleted}</div>
        </div>

        <div
          className={`bg-gradient-to-br ${currentStage.color} rounded-2xl p-6 text-white text-center`}
        >
          <div className="text-7xl mb-4">{currentStage.emoji}</div>
          <h3 className="text-2xl font-bold mb-2">{currentStage.name}</h3>
          <p className="text-lg">{currentStage.description}</p>
        </div>

        {showFact && (
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center animate-pulse">
            <div className="text-2xl mb-2">💡</div>
            <p className="font-bold text-yellow-800">{showFact}</p>
          </div>
        )}

        {!showFact && (
          <div className="space-y-2">
            <h4 className="font-bold text-gray-700">What will you do?</h4>
            {currentStage.actions.map((action) => (
              <button
                key={action.id}
                onClick={() => takeAction(action)}
                className="w-full bg-white border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl p-3 text-left font-medium transition-all"
              >
                {action.text}
                <span className="float-right text-blue-500">
                  +{action.points}
                </span>
              </button>
            ))}
          </div>
        )}

        {journeyLog.length > 0 && (
          <div className="bg-gray-100 rounded-xl p-3">
            <h4 className="font-bold text-sm mb-2">Journey Log:</h4>
            <div className="flex flex-wrap gap-1">
              {journeyLog.slice(-5).map((log, i) => (
                <span
                  key={i}
                  className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {stages[log.stage].emoji}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-3 font-bold"
        >
          Start New Journey
        </button>
      </div>
    );
  }

  function EndangeredSpeciesRescue() {
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [resources, setResources] = useState(100);
    const [time, setTime] = useState(0);
    const [species, setSpecies] = useState([
      {
        id: 1,
        name: "Giant Panda",
        emoji: "🐼",
        population: 1800,
        habitat: 50,
        threat: "habitat loss",
        status: "vulnerable",
      },
      {
        id: 2,
        name: "Sea Turtle",
        emoji: "🐢",
        population: 6500,
        habitat: 40,
        threat: "pollution",
        status: "endangered",
      },
      {
        id: 3,
        name: "Tiger",
        emoji: "🐅",
        population: 3900,
        habitat: 35,
        threat: "poaching",
        status: "endangered",
      },
      {
        id: 4,
        name: "Elephant",
        emoji: "🐘",
        population: 415000,
        habitat: 45,
        threat: "poaching",
        status: "vulnerable",
      },
      {
        id: 5,
        name: "Polar Bear",
        emoji: "🐻‍❄️",
        population: 26000,
        habitat: 30,
        threat: "climate",
        status: "vulnerable",
      },
      {
        id: 6,
        name: "Gorilla",
        emoji: "🦍",
        population: 1000,
        habitat: 25,
        threat: "habitat loss",
        status: "critical",
      },
    ]);
    const [actions, setActions] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const conservationActions = [
      {
        id: "habitat",
        name: "Restore Habitat",
        cost: 20,
        effect: { habitat: 15, population: 200 },
        emoji: "🌳",
      },
      {
        id: "antipoach",
        name: "Anti-Poaching Patrol",
        cost: 25,
        effect: { population: 300 },
        emoji: "👮",
      },
      {
        id: "breeding",
        name: "Breeding Program",
        cost: 30,
        effect: { population: 500 },
        emoji: "🏥",
      },
      {
        id: "education",
        name: "Community Education",
        cost: 15,
        effect: { habitat: 10, population: 100 },
        emoji: "📚",
      },
      {
        id: "climate",
        name: "Climate Action",
        cost: 35,
        effect: { habitat: 20 },
        emoji: "🌍",
      },
    ];

    useEffect(() => {
      if (!isRunning || gameOver) return;

      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
        setResources((prev) => Math.min(100, prev + 5));

        setSpecies((prev) =>
          prev.map((s) => {
            let popChange = -50 - Math.random() * 100;
            const habitatChange = -2;

            if (s.habitat < 20) popChange -= 200;
            if (s.status === "critical") popChange -= 100;

            return {
              ...s,
              population: Math.max(0, s.population + popChange),
              habitat: Math.max(0, Math.min(100, s.habitat + habitatChange)),
              status:
                s.population < 500
                  ? "critical"
                  : s.population < 2000
                  ? "endangered"
                  : "vulnerable",
            };
          })
        );

        // Check for extinctions
        const extinct = species.filter((s) => s.population <= 0);
        if (extinct.length >= 3) {
          setGameOver(true);
        }
      }, 3000);

      return () => clearInterval(interval);
    }, [isRunning, gameOver, species]);

    const applyAction = (actionId) => {
      if (!selectedSpecies) return;
      const action = conservationActions.find((a) => a.id === actionId);
      if (!action || resources < action.cost) return;

      setResources((prev) => prev - action.cost);
      setActions((prev) => [
        ...prev,
        { species: selectedSpecies.name, action: action.name },
      ]);

      setSpecies((prev) =>
        prev.map((s) => {
          if (s.id !== selectedSpecies.id) return s;
          return {
            ...s,
            population: s.population + (action.effect.population || 0),
            habitat: Math.min(100, s.habitat + (action.effect.habitat || 0)),
          };
        })
      );

      setSelectedSpecies(null);
    };

    const resetGame = () => {
      setSelectedSpecies(null);
      setResources(100);
      setTime(0);
      setSpecies([
        {
          id: 1,
          name: "Giant Panda",
          emoji: "🐼",
          population: 1800,
          habitat: 50,
          threat: "habitat loss",
          status: "vulnerable",
        },
        {
          id: 2,
          name: "Sea Turtle",
          emoji: "🐢",
          population: 6500,
          habitat: 40,
          threat: "pollution",
          status: "endangered",
        },
        {
          id: 3,
          name: "Tiger",
          emoji: "🐅",
          population: 3900,
          habitat: 35,
          threat: "poaching",
          status: "endangered",
        },
        {
          id: 4,
          name: "Elephant",
          emoji: "🐘",
          population: 415000,
          habitat: 45,
          threat: "poaching",
          status: "vulnerable",
        },
        {
          id: 5,
          name: "Polar Bear",
          emoji: "🐻‍❄️",
          population: 26000,
          habitat: 30,
          threat: "climate",
          status: "vulnerable",
        },
        {
          id: 6,
          name: "Gorilla",
          emoji: "🦍",
          population: 1000,
          habitat: 25,
          threat: "habitat loss",
          status: "critical",
        },
      ]);
      setActions([]);
      setIsRunning(false);
      setGameOver(false);
    };

    const savedSpecies = species.filter((s) => s.population > 1000).length;
    const statusColors = {
      critical: "bg-red-500",
      endangered: "bg-orange-500",
      vulnerable: "bg-yellow-500",
    };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Endangered Species Rescue
          </h2>
          <p className="text-gray-600">Protect wildlife from extinction!</p>
        </div>

        <div className="flex justify-between bg-pink-100 rounded-xl p-3">
          <div className="font-bold">Resources: {resources}</div>
          <div className="font-bold">Time: {time}s</div>
          <div className="font-bold">Saved: {savedSpecies}/6</div>
        </div>

        {gameOver && (
          <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-bold text-red-700 mb-2">
              Too Many Extinctions!
            </h3>
            <p className="text-gray-600 mb-4">
              You saved {savedSpecies} species. Keep trying!
            </p>
            <button
              onClick={resetGame}
              className="bg-pink-500 text-white rounded-xl px-6 py-3 font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {!isRunning && !gameOver && (
          <button
            onClick={() => setIsRunning(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl p-4 text-xl font-bold"
          >
            Start Conservation Mission
          </button>
        )}

        {isRunning && !gameOver && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {species.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpecies(s)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedSpecies?.id === s.id
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 bg-white"
                  } ${s.population <= 0 ? "opacity-50" : ""}`}
                  disabled={s.population <= 0}
                >
                  <div className="text-3xl">{s.emoji}</div>
                  <div className="text-sm font-bold">{s.name}</div>
                  <div className="text-xs text-gray-600">
                    Pop: {Math.floor(s.population)}
                  </div>
                  <div
                    className={`text-xs text-white px-2 py-0.5 rounded mt-1 ${
                      statusColors[s.status]
                    }`}
                  >
                    {s.status}
                  </div>
                </button>
              ))}
            </div>

            {selectedSpecies && (
              <div className="bg-pink-50 rounded-xl p-4">
                <h4 className="font-bold mb-2">Help {selectedSpecies.name}:</h4>
                <div className="text-sm text-gray-600 mb-3">
                  Main threat: {selectedSpecies.threat} | Habitat:{" "}
                  {selectedSpecies.habitat}%
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {conservationActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => applyAction(action.id)}
                      disabled={resources < action.cost}
                      className="bg-pink-500 text-white rounded-lg p-2 text-sm font-bold disabled:opacity-50"
                    >
                      {action.emoji} {action.name}
                      <div className="text-xs">Cost: {action.cost}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-gray-500 text-white rounded-2xl p-3 font-bold"
        >
          Reset
        </button>
      </div>
    );
  }

  const gamesData = {
    "nature-shape-jumper": {
      title: "Nature Shape Jumper",
      Component: NatureShapeJumper,
      age: "Ages 1-3",
    },
    "my-eco-home": {
      title: "My Eco-Home",
      Component: MyEcoHome,
      age: "Ages 1-3",
    },
    "eco-curiosity-questions": {
      title: "Eco Curiosity Questions",
      Component: EcoCuriosityQuestions,
      age: "Ages 1-3",
    },
    "sorting-nature-waste": {
      title: "Sorting Nature & Waste",
      Component: SortingNatureWaste,
      age: "Ages 1-3",
    },
    "how-does-nature-feel": {
      title: "How Does Nature Feel?",
      Component: HowDoesNatureFeel,
      age: "Ages 1-3",
    },
    "eco-weather-tracker": {
      title: "Eco Weather Tracker",
      Component: EcoWeatherTracker,
      age: "Ages 4",
    },
    "habitat-hunt": {
      title: "Habitat Hunt",
      Component: HabitatHunt,
      age: "Ages 4",
    },
    "eco-storytime": {
      title: "Eco Storytime",
      Component: EcoStorytime,
      age: "Ages 4",
    },
    "i-spy-nature": {
      title: "I Spy in Nature",
      Component: ISpyNature,
      age: "Ages 4",
    },
    "animal-movement": {
      title: "Animal Movement Play",
      Component: AnimalMovement,
      age: "Ages 4",
    },
    "nature-color-hunt": {
      title: "Nature Color Hunt",
      Component: NatureColorHunt,
      age: "Ages 5",
    },
    "eco-simon-says": {
      title: "Eco Simon Says",
      Component: EcoSimonSays,
      age: "Ages 5",
    },
    "climate-freeze-dance": {
      title: "Climate Freeze Dance",
      Component: ClimateFreezeDance,
      age: "Ages 5",
    },
    "eco-store-game": {
      title: "Eco Store Game",
      Component: EcoStoreGame,
      age: "Ages 5",
    },
    "nature-rhythm-beats": {
      title: "Nature Rhythm Beats",
      Component: NatureRhythmBeats,
      age: "Ages 5",
    },
    "carbon-footprint": {
      title: "Carbon Footprint",
      Component: CarbonFootprint,
      age: "Grades 6-9",
    },
    "ecosystem-builder": {
      title: "Ecosystem Builder",
      Component: EcosystemBuilder,
      age: "Grades 6-9",
    },
    "ocean-rescue": {
      title: "Ocean Rescue",
      Component: OceanRescue,
      age: "Grades 6-9",
    },
    "renewable-power": {
      title: "Renewable Power",
      Component: RenewablePower,
      age: "Grades 6-9",
    },
    "recycling-master": {
      title: "Recycling Master",
      Component: RecyclingMaster,
      age: "Grades 6-9",
    },
    "climate-detective": {
      title: "Climate Detective",
      Component: ClimateDetective,
      age: "Grades 6-9",
    },
    "water-cycle": {
      title: "Water Cycle Adventure",
      Component: WaterCycleAdventure,
      age: "Grades 6-9",
    },
    "endangered-species": {
      title: "Endangered Species Rescue",
      Component: EndangeredSpeciesRescue,
      age: "Grades 6-9",
    },
  };

  const game = gamesData[id];

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Game Not Found
          </h1>
          <p className="text-xl text-gray-600">
            This game doesn't exist yet. Please go back and try another game!
          </p>
        </div>
      </div>
    );
  }

  const GameComponent = game.Component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            href="/games"
            className="text-blue-600 hover:text-blue-800 text-lg font-bold"
          >
            ← Back to Games
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">
            {game.title}
          </h1>
          <p className="text-gray-600 text-lg">{game.age}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <GameComponent />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
