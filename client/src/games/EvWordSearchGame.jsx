import React, { useEffect } from "react";

const EvWordSearchGame = () => {
  useEffect(() => {
    // ===== WORD DATA =====
    const WORD_DATA = {
      easy: [
        { word: "EV", icon: "🚗", hint: "Electric Vehicle" },
        { word: "CAR", icon: "🚙", hint: "Transportation" },
        { word: "SUN", icon: "☀", hint: "Solar source" },
        { word: "AIR", icon: "💨", hint: "Clean breathing" },
        { word: "ECO", icon: "🌿", hint: "Environmental" },
        { word: "GREEN", icon: "🌱", hint: "Sustainable color" },
        { word: "WIND", icon: "🌬", hint: "Turbine power" },
        { word: "BIKE", icon: "🚲", hint: "Two wheels" },
      ],
      medium: [
        { word: "TESLA", icon: "🚗", hint: "EV brand" },
        { word: "BATTERY", icon: "🔋", hint: "Stores energy" },
        { word: "SOLAR", icon: "☀", hint: "Panel power" },
        { word: "CHARGE", icon: "⚡", hint: "Power up" },
        { word: "HYBRID", icon: "🚙", hint: "Gas + Electric" },
        { word: "MOTOR", icon: "⚙", hint: "Engine type" },
        { word: "ENERGY", icon: "💡", hint: "Power source" },
        { word: "CLEAN", icon: "✨", hint: "No pollution" },
        { word: "ZERO", icon: "0️⃣", hint: "No emissions" },
        { word: "PLUG", icon: "🔌", hint: "Connect to charge" },
      ],
      hard: [
        { word: "ELECTRIC", icon: "⚡", hint: "Power type" },
        { word: "RENEWABLE", icon: "♻", hint: "Sustainable" },
        { word: "CHARGING", icon: "🔌", hint: "Getting power" },
        { word: "EMISSION", icon: "💨", hint: "Output gas" },
        { word: "LITHIUM", icon: "🔋", hint: "Battery element" },
        { word: "TURBINE", icon: "🌀", hint: "Wind power" },
        { word: "SUSTAINABLE", icon: "🌍", hint: "Long-lasting" },
        { word: "HYDROGEN", icon: "💧", hint: "Fuel cell" },
        { word: "AUTOPILOT", icon: "🤖", hint: "Self-driving" },
        { word: "REGENERATE", icon: "🔄", hint: "Brake energy" },
      ],
    };

    const EV_FACTS = [
      "Electric vehicles can save you up to $1,000 per year on fuel costs!",
      "EVs have 90% fewer moving parts than gas cars, meaning less maintenance.",
      "The first electric car was built in 1832 - before gas cars existed!",
      "Norway leads the world with over 80% of new car sales being electric.",
      "EV batteries can be recycled to recover valuable materials like lithium.",
      "One wind turbine can generate enough power to charge 1,000 EVs daily.",
      "Solar panels on your roof can charge your EV for nearly free!",
      "EVs produce zero direct emissions, improving city air quality.",
      "Fast chargers can add 200 miles of range in just 15 minutes.",
      "By 2030, EVs are expected to be cheaper than gas cars to manufacture.",
    ];

    const GRID_SIZE = 12;
    let grid = [];
    let words = [];
    let foundWords = [];
    let selecting = false;
    let selectedCells = [];
    let startCell = null;
    let difficulty = "medium";
    let score = 0;
    let seconds = 0;
    let timerInterval = null;

    const gridEl = document.getElementById("word-grid");
    const wordListEl = document.getElementById("word-list");
    const foundCountEl = document.getElementById("found-count");
    const totalCountEl = document.getElementById("total-count");
    const timerEl = document.getElementById("timer");
    const scoreEl = document.getElementById("score");
    const winPopup = document.getElementById("win-popup");

    const newGameBtn = document.getElementById("new-game-btn");
    const hintBtn = document.getElementById("hint-btn");
    const playAgainBtn = document.getElementById("play-again-btn");
    const diffBtns = document.querySelectorAll(".diff-btn");

    if (!gridEl || !wordListEl) return;

    // ===== CORE GAME FUNCTIONS =====

    function init() {
      words = [...WORD_DATA[difficulty]];
      foundWords = [];
      score = 0;
      seconds = 0;
      scoreEl.textContent = "0";
      timerEl.textContent = "0:00";
      foundCountEl.textContent = "0";
      totalCountEl.textContent = String(words.length);

      if (timerInterval) clearInterval(timerInterval);

      generateGrid();
      renderWordList();
      startTimer();
    }

    function generateGrid() {
      // Empty grid
      grid = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
          grid[i][j] = { letter: "", wordIndex: -1 };
        }
      }

      const directions = [
        { dr: 0, dc: 1 }, // horizontal right
        { dr: 1, dc: 0 }, // vertical down
        { dr: 1, dc: 1 }, // diagonal down-right
        { dr: 0, dc: -1 }, // horizontal left
        { dr: 1, dc: -1 }, // diagonal down-left
      ];

      const shuffledWords = [...words].sort(() => Math.random() - 0.5);

      shuffledWords.forEach((wordObj, wordIndex) => {
        let placed = false;
        let attempts = 0;
        const word = wordObj.word;

        while (!placed && attempts < 100) {
          const dir = directions[Math.floor(Math.random() * directions.length)];
          const startRow = Math.floor(Math.random() * GRID_SIZE);
          const startCol = Math.floor(Math.random() * GRID_SIZE);

          if (canPlaceWord(word, startRow, startCol, dir)) {
            placeWord(word, startRow, startCol, dir, wordIndex);
            placed = true;
          }
          attempts++;
        }
      });

      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j].letter === "") {
            grid[i][j].letter =
              letters[Math.floor(Math.random() * letters.length)];
          }
        }
      }

      renderGrid();
    }

    function canPlaceWord(word, row, col, dir) {
      for (let i = 0; i < word.length; i++) {
        const r = row + i * dir.dr;
        const c = col + i * dir.dc;

        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
        if (grid[r][c].letter !== "" && grid[r][c].letter !== word[i])
          return false;
      }
      return true;
    }

    function placeWord(word, row, col, dir, wordIndex) {
      for (let i = 0; i < word.length; i++) {
        const r = row + i * dir.dr;
        const c = col + i * dir.dc;
        grid[r][c].letter = word[i];
        grid[r][c].wordIndex = wordIndex;
      }
    }

    function renderGrid() {
      gridEl.innerHTML = "";

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const cell = document.createElement("div");
          cell.className = "grid-cell";
          cell.textContent = grid[i][j].letter;
          cell.dataset.row = String(i);
          cell.dataset.col = String(j);

          cell.addEventListener("mousedown", handleMouseDown);
          cell.addEventListener("mouseenter", handleMouseEnter);
          cell.addEventListener("mouseup", handleMouseUp);

          gridEl.appendChild(cell);
        }
      }

      document.addEventListener("mouseup", handleMouseUp);
    }

    function renderWordList() {
      wordListEl.innerHTML = "";

      words.forEach((wordObj, index) => {
        const item = document.createElement("div");
        item.className = "word-item";
        item.id = `word-${index}`;
        item.innerHTML = `
          <span class="icon">${wordObj.icon}</span>
          <span class="word">${wordObj.word}</span>
          <span class="hint">${wordObj.hint}</span>
        `;
        wordListEl.appendChild(item);
      });
    }

    // ===== SELECTION / MOUSE LOGIC =====

    function handleMouseDown(e) {
      selecting = true;
      startCell = {
        row: parseInt(e.target.dataset.row, 10),
        col: parseInt(e.target.dataset.col, 10),
      };
      selectedCells = [startCell];
      updateSelection();
    }

    function handleMouseEnter(e) {
      if (!selecting) return;

      const row = parseInt(e.target.dataset.row, 10);
      const col = parseInt(e.target.dataset.col, 10);

      selectedCells = getCellsInLine(startCell.row, startCell.col, row, col);
      updateSelection();
    }

    function handleMouseUp() {
      if (!selecting) return;
      selecting = false;

      checkSelection();
      clearSelection();
    }

    function getCellsInLine(r1, c1, r2, c2) {
      const cells = [];
      const dr = Math.sign(r2 - r1);
      const dc = Math.sign(c2 - c1);

      const rowDiff = Math.abs(r2 - r1);
      const colDiff = Math.abs(c2 - c1);

      if (rowDiff !== colDiff && rowDiff !== 0 && colDiff !== 0) {
        return [{ row: r1, col: c1 }];
      }

      const steps = Math.max(rowDiff, colDiff);

      for (let i = 0; i <= steps; i++) {
        cells.push({
          row: r1 + i * dr,
          col: c1 + i * dc,
        });
      }

      return cells;
    }

    function updateSelection() {
      document.querySelectorAll(".grid-cell").forEach((cell) => {
        cell.classList.remove("selecting");
      });

      selectedCells.forEach(({ row, col }) => {
        const index = row * GRID_SIZE + col;
        gridEl.children[index].classList.add("selecting");
      });
    }

    function clearSelection() {
      document.querySelectorAll(".grid-cell").forEach((cell) => {
        cell.classList.remove("selecting");
      });
      selectedCells = [];
    }

    function checkSelection() {
      const selectedWord = selectedCells
        .map(({ row, col }) => grid[row][col].letter)
        .join("");
      const reversedWord = selectedWord.split("").reverse().join("");

      let foundIndex = -1;

      words.forEach((wordObj, index) => {
        if (!foundWords.includes(index)) {
          if (
            wordObj.word === selectedWord ||
            wordObj.word === reversedWord
          ) {
            foundIndex = index;
          }
        }
      });

      if (foundIndex !== -1) {
        foundWords.push(foundIndex);

        selectedCells.forEach(({ row, col }) => {
          const index = row * GRID_SIZE + col;
          gridEl.children[index].classList.add("found");
        });

        const wordItem = document.getElementById(`word-${foundIndex}`);
        if (wordItem) wordItem.classList.add("found");

        score += words[foundIndex].word.length * 10;
        scoreEl.textContent = String(score);
        foundCountEl.textContent = String(foundWords.length);

        if (foundWords.length === words.length) {
          setTimeout(showWin, 500);
        }
      } else if (selectedCells.length > 1) {
        selectedCells.forEach(({ row, col }) => {
          const index = row * GRID_SIZE + col;
          const cell = gridEl.children[index];
          cell.classList.add("wrong");
          setTimeout(() => cell.classList.remove("wrong"), 300);
        });
      }
    }

    // ===== TIMER & WIN =====

    function startTimer() {
      timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
      }, 1000);
    }

    function showWin() {
      clearInterval(timerInterval);

      document.getElementById("win-time").textContent = timerEl.textContent;
      document.getElementById("win-score").textContent = String(score);
      document.getElementById("win-fact").textContent =
        EV_FACTS[Math.floor(Math.random() * EV_FACTS.length)];

      winPopup.style.display = "flex";
    }

    function showHint() {
      const unfoundIndex = words.findIndex(
        (_, i) => !foundWords.includes(i)
      );
      if (unfoundIndex === -1) return;

      const word = words[unfoundIndex].word;

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j].letter === word[0]) {
            const index = i * GRID_SIZE + j;
            const cell = gridEl.children[index];
            cell.style.background = "#ffeb3b";
            cell.style.transform = "scale(1.2)";
            setTimeout(() => {
              if (!cell.classList.contains("found")) {
                cell.style.background = "#fff";
                cell.style.transform = "scale(1)";
              }
            }, 1500);

            score = Math.max(0, score - 5);
            scoreEl.textContent = String(score);
            return;
          }
        }
      }
    }

    // ===== EVENT LISTENERS =====

    const newGameHandler = () => init();
    const hintHandler = () => showHint();
    const playAgainHandler = () => {
      winPopup.style.display = "none";
      init();
    };

    if (newGameBtn) newGameBtn.addEventListener("click", newGameHandler);
    if (hintBtn) hintBtn.addEventListener("click", hintHandler);
    if (playAgainBtn)
      playAgainBtn.addEventListener("click", playAgainHandler);

    diffBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        diffBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        difficulty = btn.dataset.diff || "medium";
        init();
      });
    });

    gridEl.addEventListener("selectstart", (e) => e.preventDefault());

    // Start once
    init();

    // Cleanup on unmount
    return () => {
      if (timerInterval) clearInterval(timerInterval);
      document.removeEventListener("mouseup", handleMouseUp);
      if (newGameBtn)
        newGameBtn.removeEventListener("click", newGameHandler);
      if (hintBtn) hintBtn.removeEventListener("click", hintHandler);
      if (playAgainBtn)
        playAgainBtn.removeEventListener("click", playAgainHandler);
      diffBtns.forEach((btn) => {
        btn.replaceWith(btn.cloneNode(true)); // quick way to drop listeners
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .ev-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .ev-root {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 70px 20px 20px;
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .ev-root h1 {
          color: #1b5e20;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 3px;
          font-size: 1.8rem;
        }

        .subtitle {
          color: #2e7d32;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .game-wrapper {
          display: flex;
          gap: 20px;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: flex-start;
          width: auto;
        }

        .game-container {
          background: rgba(255,255,255,0.97);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .word-list-container {
          background: rgba(255,255,255,0.97);
          border-radius: 16px;
          padding: 15px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          width: 240px;
          flex: 0 0 auto;
          max-height: 520px;
          overflow-y: auto;
        }

        .stats-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 10px 15px;
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          border-radius: 10px;
          gap: 12px;
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #2e7d32;
          font-weight: 600;
          text-transform: uppercase;
        }

        .stat-value {
          font-size: 1.1rem;
          color: #1b5e20;
          font-weight: bold;
        }

        .grid-container {
          background: #263238;
          padding: 8px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
        }

        .word-grid {
          display: grid;
          grid-template-columns: repeat(12, 32px);
          grid-template-rows: repeat(12, 32px);
          gap: 2px;
        }

        .grid-cell {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: bold;
          background: #fff;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
          transition: all 0.15s ease;
          color: #37474f;
        }

        .grid-cell:hover {
          background: #e3f2fd;
          transform: scale(1.08);
        }

        .grid-cell.selecting {
          background: #bbdefb;
          color: #1565c0;
        }

        .grid-cell.found {
          background: linear-gradient(135deg, #66bb6a, #43a047);
          color: white;
          animation: foundPulse 0.4s ease;
        }

        @keyframes foundPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .grid-cell.wrong {
          background: #ef5350;
          color: white;
          animation: shake 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .word-list-title {
          font-size: 1rem;
          color: #2e7d32;
          margin-bottom: 10px;
          text-align: center;
          font-weight: bold;
        }

        .word-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .word-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background: linear-gradient(135deg, #f5f5f5, #eeeeee);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .word-item.found {
          background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
          text-decoration: line-through;
        }

        .word-item .icon {
          font-size: 1rem;
        }

        .word-item .word {
          font-weight: 600;
          color: #37474f;
          font-size: 0.8rem;
        }

        .word-item.found .word {
          color: #2e7d32;
        }

        .word-item .hint {
          display: none;
        }

        .controls {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 15px;
        }

        .btn {
          padding: 10px 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #43a047, #2e7d32);
          color: white;
        }

        .btn-secondary {
          background: linear-gradient(135deg, #42a5f5, #1976d2);
          color: white;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .difficulty-selector {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 12px;
        }

        .diff-btn {
          padding: 6px 12px;
          font-size: 0.75rem;
          border: 2px solid #43a047;
          background: white;
          color: #43a047;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .diff-btn.active {
          background: #43a047;
          color: white;
        }

        .diff-btn:hover {
          background: #e8f5e9;
        }

        .diff-btn.active:hover {
          background: #2e7d32;
        }

        .info-box {
          display: none;
        }

        .win-popup {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .win-content {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 420px;
          animation: popIn 0.3s ease;
        }

        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .win-content .trophy {
          font-size: 4rem;
          margin-bottom: 15px;
        }

        .win-content h2 {
          color: #2e7d32;
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .win-content p {
          color: #455a64;
          margin-bottom: 15px;
          font-size: 1rem;
        }

        .win-stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 20px;
        }

        .win-stat-value {
          font-size: 1.8rem;
          color: #43a047;
          font-weight: bold;
        }

        .win-stat-label {
          font-size: 0.8rem;
          color: #78909c;
        }

        .fun-fact {
          background: #e8f5e9;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-style: italic;
          color: #2e7d32;
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .game-wrapper {
            flex-wrap: wrap;
          }
          
          .game-container, .word-list-container {
            width: 100%;
            max-width: 500px;
            flex: 1 1 100%;
          }
          
          .word-list-container {
            max-height: none;
          }
        }
        
        @media (max-width: 500px) {
          .word-grid {
            grid-template-columns: repeat(12, 28px);
            grid-template-rows: repeat(12, 28px);
          }
          
          .grid-cell {
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="ev-root">
        <h1>🔍 EV Word Search</h1>
        <p className="subtitle">
          Find all the electric vehicle & green energy words!
        </p>

        <div className="game-wrapper">
          <div className="game-container">
            <div className="stats-bar">
              <div className="stat">
                <div className="stat-label">Found</div>
                <div className="stat-value">
                  <span id="found-count">0</span>/<span id="total-count">10</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Time</div>
                <div className="stat-value" id="timer">
                  0:00
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Score</div>
                <div className="stat-value" id="score">
                  0
                </div>
              </div>
            </div>

            <div className="difficulty-selector">
              <button className="diff-btn" data-diff="easy">
                Easy
              </button>
              <button className="diff-btn active" data-diff="medium">
                Medium
              </button>
              <button className="diff-btn" data-diff="hard">
                Hard
              </button>
            </div>

            <div className="grid-container">
              <div className="word-grid" id="word-grid">{/* JS fills */}</div>
            </div>

            <div className="controls">
              <button className="btn btn-primary" id="new-game-btn">
                🔄 New Game
              </button>
              <button className="btn btn-secondary" id="hint-btn">
                💡 Hint
              </button>
            </div>
          </div>

          <div className="word-list-container">
            <div className="word-list-title">🔋 Words to Find</div>
            <div className="word-list" id="word-list">{/* JS fills */}</div>

            <div className="info-box">
              <h4>💡 How to Play</h4>
              <p>
                Click and drag across letters to select a word. Words can be
                horizontal, vertical, or diagonal!
              </p>
            </div>
          </div>
        </div>

        <div className="win-popup" id="win-popup">
          <div className="win-content">
            <div className="trophy">🏆</div>
            <h2>Congratulations!</h2>
            <p>You found all the EV words!</p>
            <div className="win-stats">
              <div>
                <div className="win-stat-value" id="win-time">
                  0:00
                </div>
                <div className="win-stat-label">Time</div>
              </div>
              <div>
                <div className="win-stat-value" id="win-score">
                  0
                </div>
                <div className="win-stat-label">Score</div>
              </div>
            </div>
            <div className="fun-fact" id="win-fact">
              Electric vehicles can save you up to $1,000 per year on fuel
              costs!
            </div>
            <button className="btn btn-primary" id="play-again-btn">
              🎮 Play Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvWordSearchGame;
