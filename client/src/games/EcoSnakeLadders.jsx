import React, { useEffect } from "react";

const EcoSnakesLadders = () => {
  useEffect(() => {
    // Prevent double-initialization in React StrictMode
    if (typeof window !== "undefined" && window.__ecoSnakesInit) return;
    if (typeof window !== "undefined") window.__ecoSnakesInit = true;

    (() => {
      /* ---------- Core config ---------- */
      const BOARD_SIZE = 100;
      const LADDERS = {
        3: 22,
        8: 31,
        12: 45,
        19: 51,
        28: 64,
        35: 67,
        42: 79,
        56: 87,
      };
      const SNAKES = {
        17: 4,
        24: 5,
        33: 14,
        38: 20,
        48: 26,
        62: 37,
        73: 47,
        88: 64,
      };

      // additional tile types (green=rewards, red=penalty, power-up tiles)
      const GREEN_TILES = [2, 6, 11, 18, 25, 30, 40, 54, 70, 82];
      const RED_TILES = [5, 14, 23, 29, 36, 46, 57, 68, 75, 94];
      const POWER_TILES = {
        5: "energy",
        21: "shield",
        34: "coin",
        50: "oxygen",
        77: "rainbow",
      };

      // educational mini-tasks (questions)
      const TASKS = [
        {
          q: "Which action reduces plastic in oceans?",
          opts: ["Burn it", "Recycle it", "Dump it", "Bury it"],
          a: 1,
          reward: { coins: 3, oxygen: 4 },
        },
        {
          q: "What is renewable energy?",
          opts: ["Coal", "Solar", "Oil", "Gas"],
          a: 1,
          reward: { coins: 3, energy: 2 },
        },
        {
          q: "Which saves water?",
          opts: ["Leave tap open", "Fix leak", "Wash car daily", "Throw waste"],
          a: 1,
          reward: { coins: 2, oxygen: 3 },
        },
        {
          q: "What helps soil?",
          opts: ["Plant trees", "Cut trees", "Burn fields", "Dump waste"],
          a: 0,
          reward: { coins: 3, oxygen: 4 },
        },
      ];

      // DOM
      const boardArea = document.getElementById("boardArea");
      const overlay = document.getElementById("overlay");
      const pieces = document.getElementById("pieces");
      const playersCompact = document.getElementById("playersCompact");
      const rollBtn = document.getElementById("rollBtn");
      const diceEl = document.getElementById("dice");
      const currentName = document.getElementById("currentName");
      const msg = document.getElementById("msg");
      const kidModeCheckbox = document.getElementById("kidMode");
      const quizModeCheckbox = document.getElementById("quizMode");
      const resetBtn = document.getElementById("resetBtn");
      const helpBtn = document.getElementById("helpBtn");
      const diceSet = document.getElementById("diceSet");

      const oxygenBar = document.getElementById("oxygenBar");
      const pollutionBar = document.getElementById("pollutionBar");
      const ecoCoinsEl = document.getElementById("ecoCoins");
      const energyEl = document.getElementById("energyPts");
      const shieldsEl = document.getElementById("shields");

      const confettiCanvas = document.getElementById("confetti");

      // popup elements
      const helpPopup = document.getElementById("helpPopup");
      const helpClose = document.getElementById("helpClose");
      const helpMore = document.getElementById("helpMore");

      if (
        !boardArea ||
        !overlay ||
        !pieces ||
        !rollBtn ||
        !diceEl ||
        !currentName
      ) {
        // if something critical missing, just stop
        return;
      }

      let players = [],
        currentIdx = 0,
        animating = false,
        kidMode = false,
        quizMode = true;
      let audioCtx =
        (window.AudioContext || window.webkitAudioContext) &&
        new (window.AudioContext || window.webkitAudioContext)();
      let gameState = {
        oxygen: 72,
        pollution: 18,
        coins: 0,
        energy: 0,
        shields: 0,
      };

      // audio
      function beep(freq, dur = 0.1, type = "sine", vol = 0.07) {
        if (!audioCtx) return;
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = vol;
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start();
        o.stop(audioCtx.currentTime + dur);
      }
      function audioReward() {
        beep(880, 0.12);
        setTimeout(() => beep(1100, 0.08), 120);
      }
      function audioPenalty() {
        beep(240, 0.14, "sawtooth", 0.12);
        setTimeout(() => beep(160, 0.09, "sawtooth", 0.06), 110);
      }
      function audioRoll() {
        beep(320, 0.05);
        setTimeout(() => beep(420, 0.05), 70);
      }

      /* ---------- build board tiles ---------- */
      function buildBoard() {
        boardArea.innerHTML = "";
        // Build board with 91-100 at top row, 1-10 at bottom row
        // Bottom row (1-10): 1 on left going right
        // Row above (11-20): 20 on left going to 11 on right
        // Alternating zigzag pattern up to 91-100 at top
        for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
          // rowIndex 0 = top of screen = row with 91-100
          // rowIndex 9 = bottom of screen = row with 1-10
          const rowFromBottom = 9 - rowIndex; // 0 = bottom row (1-10), 9 = top row (91-100)
          const isOddRowFromBottom = rowFromBottom % 2 === 1;
          let tilesInRow = [];

          for (let col = 0; col < 10; col++) {
            const cellNum = rowFromBottom * 10 + col + 1;
            tilesInRow.push(cellNum);
          }

          // Even rows from bottom (0,2,4,6,8) go left-to-right (1-10, 21-30, etc.)
          // Odd rows from bottom (1,3,5,7,9) go right-to-left (20-11, 40-31, etc.)
          if (isOddRowFromBottom) {
            tilesInRow.reverse();
          }

          for (const i of tilesInRow) {
            const t = document.createElement("div");
            t.className = "tile";
            t.dataset.cell = i;
            const num = document.createElement("div");
            num.className = "num";
            num.textContent = i;
            t.appendChild(num);

            if (GREEN_TILES.includes(i)) {
              t.classList.add("green");
              t.title = "Reward tile";
            }
            if (RED_TILES.includes(i)) {
              t.classList.add("red");
              t.title = "Penalty tile";
            }
            if (LADDERS[i]) {
              const lbl = document.createElement("div");
              lbl.className = "event";
              lbl.textContent = "🪜 Ladder";
              t.appendChild(lbl);
            }
            if (SNAKES[i]) {
              const lbl = document.createElement("div");
              lbl.className = "event";
              lbl.textContent = "🐍 Snake";
              t.appendChild(lbl);
            }
            if (POWER_TILES[i]) {
              const lbl = document.createElement("div");
              lbl.className = "event";
              lbl.textContent = "✨ Power-up";
              t.appendChild(lbl);
            }

            boardArea.appendChild(t);
          }
        }
      }

      // compute tile center for pieces/overlay (620x620)
      function tileCenter(cell) {
        const idx = Math.max(1, Math.min(100, cell)) - 1;
        const rowFromBottom = Math.floor(idx / 10); // 0 = bottom row (1-10), 9 = top row (91-100)
        const colInRow = idx % 10;
        const isOddRow = rowFromBottom % 2 === 1;
        // Even rows from bottom go left-to-right, odd rows go right-to-left
        const col = isOddRow ? 9 - colInRow : colInRow;
        const tile = 620 / 10;
        const x = col * tile + tile / 2;
        const y = (9 - rowFromBottom) * tile + tile / 2; // Flip Y so row 0 is at bottom
        return { x, y };
      }

      /* ---------- decorative ladders & snakes (simple SVG lines) ---------- */
      function drawLines() {
        overlay.innerHTML = "";
        // ladders - exact ladder shape with two rails and rungs
        for (const fStr in LADDERS) {
          const f = +fStr,
            t = LADDERS[f];
          const a = tileCenter(f),
            b = tileCenter(t);

          // Calculate ladder direction and perpendicular
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / len; // unit vector along ladder
          const uy = dy / len;
          const px = -uy; // perpendicular unit vector
          const py = ux;

          const railWidth = 6; // distance from center to each rail
          const rungSpacing = 18; // space between rungs
          const numRungs = Math.max(3, Math.floor(len / rungSpacing));

          // Left rail
          const leftRail = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          leftRail.setAttribute("x1", a.x + px * railWidth);
          leftRail.setAttribute("y1", a.y + py * railWidth);
          leftRail.setAttribute("x2", b.x + px * railWidth);
          leftRail.setAttribute("y2", b.y + py * railWidth);
          leftRail.setAttribute("stroke", "#8B4513");
          leftRail.setAttribute("stroke-width", 2);
          leftRail.setAttribute("stroke-linecap", "round");
          overlay.appendChild(leftRail);

          // Right rail
          const rightRail = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          rightRail.setAttribute("x1", a.x - px * railWidth);
          rightRail.setAttribute("y1", a.y - py * railWidth);
          rightRail.setAttribute("x2", b.x - px * railWidth);
          rightRail.setAttribute("y2", b.y - py * railWidth);
          rightRail.setAttribute("stroke", "#8B4513");
          rightRail.setAttribute("stroke-width", 2);
          rightRail.setAttribute("stroke-linecap", "round");
          overlay.appendChild(rightRail);

          // Rungs
          for (let i = 0; i <= numRungs; i++) {
            const t = i / numRungs;
            const rx = a.x + dx * t;
            const ry = a.y + dy * t;

            const rung = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line"
            );
            rung.setAttribute("x1", rx + px * railWidth);
            rung.setAttribute("y1", ry + py * railWidth);
            rung.setAttribute("x2", rx - px * railWidth);
            rung.setAttribute("y2", ry - py * railWidth);
            rung.setAttribute("stroke", "#A0522D");
            rung.setAttribute("stroke-width", 2);
            rung.setAttribute("stroke-linecap", "round");
            overlay.appendChild(rung);
          }
        }
        // snakes - curvy green paths with wave pattern
        for (const s in SNAKES) {
          const start = +s,
            dest = SNAKES[s];
          const a = tileCenter(start),
            b = tileCenter(dest);
          // Create a wavy snake path
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const waves = Math.max(2, Math.floor(len / 60));
          const amplitude = 20;

          let pathD = `M ${a.x} ${a.y}`;
          for (let w = 0; w < waves; w++) {
            const t = (w + 0.5) / waves;
            const t2 = (w + 1) / waves;
            const mx = a.x + dx * t;
            const my = a.y + dy * t;
            const ex = a.x + dx * t2;
            const ey = a.y + dy * t2;
            // Perpendicular offset for wave
            const px = (-dy / len) * amplitude * (w % 2 === 0 ? 1 : -1);
            const py = (dx / len) * amplitude * (w % 2 === 0 ? 1 : -1);
            pathD += ` Q ${mx + px} ${my + py} ${ex} ${ey}`;
          }

          const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path.setAttribute("d", pathD);
          path.setAttribute("stroke", "#22c55e");
          path.setAttribute("stroke-width", 4);
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-linecap", "round");
          path.setAttribute("opacity", 0.85);
          overlay.appendChild(path);

          // Snake head
          const head = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          head.setAttribute("cx", a.x);
          head.setAttribute("cy", a.y);
          head.setAttribute("r", 6);
          head.setAttribute("fill", "#16a34a");
          overlay.appendChild(head);
        }
        // small power icons
        for (const p in POWER_TILES) {
          const pos = tileCenter(+p);
          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          text.setAttribute("x", pos.x - 6);
          text.setAttribute("y", pos.y + 26);
          text.setAttribute("font-size", 28);
          text.textContent = "✨";
          overlay.appendChild(text);
        }
      }

      /* ---------- pieces ---------- */
      function createPieceEl(player) {
        const el = document.createElement("div");
        el.className = "piece";
        el.dataset.id = player.id;
        el.style.background = player.color;
        el.textContent = player.avatar;
        pieces.appendChild(el);
        return el;
      }

      function movePieceInstant(el, cell) {
        const c = tileCenter(Math.max(1, Math.min(100, cell || 1)));
        el.style.left = c.x + "px";
        el.style.top = c.y + "px";
      }

      function placePieces() {
        pieces.innerHTML = "";
        players.forEach((p) => {
          const el = createPieceEl(p);
          movePieceInstant(el, p.position || 1);
          if (kidMode) el.classList.add("big");
          else el.classList.remove("big");
        });
      }

      /* animate step-by-step */
      function animateSteps(playerIdx, start, end, baseDelay = 140) {
        return new Promise((resolve) => {
          if (start === end) {
            resolve();
            return;
          }
          let cur = start;
          const dir = start < end ? 1 : -1;
          const delay = kidMode ? baseDelay * 1.5 : baseDelay;
          const el = pieces.querySelector(`.piece[data-id="${playerIdx}"]`);
          const stepFn = () => {
            cur += dir;
            players[playerIdx].position = cur;
            if (el) movePieceInstant(el, cur);
            highlightTile(cur);
            if (cur === end) {
              setTimeout(() => {
                clearHighlights();
                resolve();
              }, kidMode ? 420 : 220);
            } else setTimeout(stepFn, delay);
          };
          stepFn();
        });
      }

      let hTimer = null;
      function highlightTile(cell) {
        clearHighlights();
        const idx = cell - 1;
        const t = boardArea.children[idx];
        if (t) {
          t.style.boxShadow = "0 12px 26px rgba(16,185,129,0.14)";
          t.style.transform = "scale(1.04)";
        }
        hTimer = setTimeout(clearHighlights, kidMode ? 700 : 320);
      }
      function clearHighlights() {
        if (hTimer) clearTimeout(hTimer);
        [...boardArea.children].forEach((t) => {
          t.style.boxShadow = "";
          t.style.transform = "";
        });
      }

      /* ---------- HUD updates ---------- */
      function updateHUD() {
        if (oxygenBar)
          oxygenBar.style.width =
            Math.max(0, Math.min(100, gameState.oxygen)) + "%";
        if (pollutionBar)
          pollutionBar.style.width =
            Math.max(0, Math.min(100, gameState.pollution)) + "%";
        if (ecoCoinsEl) ecoCoinsEl.textContent = gameState.coins;
        if (energyEl) energyEl.textContent = gameState.energy;
        if (shieldsEl) shieldsEl.textContent = gameState.shields;
      }

      /* ---------- confetti (simple) ---------- */
      const confetti = (function () {
        const c = confettiCanvas;
        const ctx = c.getContext("2d");
        let items = [],
          running = false;
        function resize() {
          c.width = window.innerWidth;
          c.height = window.innerHeight;
        }
        function spawn(n = 60) {
          for (let i = 0; i < n; i++) {
            items.push({
              x: Math.random() * c.width,
              y: -20 - Math.random() * 200,
              vx: (Math.random() - 0.5) * 6,
              vy: 2 + Math.random() * 6,
              size: 6 + Math.random() * 8,
              color: ["#ff7a7a", "#ffd36b", "#7af5c8", "#a4d8ff"][
                Math.floor(Math.random() * 4)
              ],
              rot: Math.random() * 360,
              vr: (Math.random() - 0.5) * 10,
            });
          }
          if (!running) {
            running = true;
            animate();
            c.style.display = "block";
            setTimeout(() => {
              running = false;
            }, 2400);
          }
        }
        function animate() {
          resize();
          const step = () => {
            ctx.clearRect(0, 0, c.width, c.height);
            items.forEach((p, i) => {
              p.x += p.vx;
              p.y += p.vy;
              p.vy += 0.12;
              p.rot += p.vr;
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate((p.rot * Math.PI) / 180);
              ctx.fillStyle = p.color;
              ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
              ctx.restore();
              if (p.y > c.height + 60) items.splice(i, 1);
            });
            if (items.length > 0) requestAnimationFrame(step);
            else {
              ctx.clearRect(0, 0, c.width, c.height);
              c.style.display = "none";
            }
          };
          step();
        }
        window.addEventListener("resize", resize);
        return { spawn };
      })();

      /* ---------- mini educational prompt ---------- */

      // Custom popup dialog system
      function showPopup(
        title,
        message,
        buttons = [{ text: "OK", value: true }],
        inputField = null
      ) {
        return new Promise((resolve) => {
          const overlay = document.createElement("div");
          overlay.style.cssText =
            "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;";

          const popup = document.createElement("div");
          popup.style.cssText =
            "background:linear-gradient(180deg,#fff,#f0fdf4);padding:24px;border-radius:16px;max-width:400px;width:90%;box-shadow:0 20px 50px rgba(0,0,0,0.3);border:4px solid #86efac;";

          const titleEl = document.createElement("h3");
          titleEl.style.cssText =
            'margin:0 0 12px;color:#16a34a;font-size:20px;font-family:"Baloo 2",cursive;';
          titleEl.textContent = title;
          popup.appendChild(titleEl);

          const msgEl = document.createElement("p");
          msgEl.style.cssText =
            "margin:0 0 16px;color:#0f172a;font-size:14px;line-height:1.5;white-space:pre-wrap;";
          msgEl.textContent = message;
          popup.appendChild(msgEl);

          let inputEl = null;
          if (inputField) {
            inputEl = document.createElement("input");
            inputEl.type = inputField.type || "text";
            inputEl.value = inputField.default || "";
            inputEl.placeholder = inputField.placeholder || "";
            inputEl.style.cssText =
              "width:100%;padding:10px;border:2px solid #bbf7d0;border-radius:8px;font-size:16px;margin-bottom:16px;box-sizing:border-box;";
            popup.appendChild(inputEl);
            setTimeout(() => inputEl.focus(), 100);
          }

          const btnContainer = document.createElement("div");
          btnContainer.style.cssText =
            "display:flex;gap:10px;justify-content:flex-end;";

          buttons.forEach((btn) => {
            const btnEl = document.createElement("button");
            btnEl.textContent = btn.text;
            btnEl.style.cssText = btn.primary
              ? "padding:10px 20px;border:none;border-radius:10px;font-weight:800;cursor:pointer;background:linear-gradient(180deg,#34d399,#10b981);color:#fff;font-size:14px;"
              : "padding:10px 20px;border:2px solid #e5e7eb;border-radius:10px;font-weight:800;cursor:pointer;background:#fff;color:#374151;font-size:14px;";
            btnEl.onclick = () => {
              document.body.removeChild(overlay);
              resolve(inputEl ? (btn.value ? inputEl.value : null) : btn.value);
            };
            btnContainer.appendChild(btnEl);
          });

          popup.appendChild(btnContainer);
          overlay.appendChild(popup);
          document.body.appendChild(overlay);

          // Close on overlay click
          overlay.onclick = (e) => {
            if (e.target === overlay) {
              document.body.removeChild(overlay);
              resolve(inputEl ? null : false);
            }
          };
        });
      }

      async function showConfirm(title, message) {
        return showPopup(title, message, [
          { text: "No", value: false },
          { text: "Yes", value: true, primary: true },
        ]);
      }

      async function showPrompt(title, message, defaultValue = "") {
        return showPopup(
          title,
          message,
          [
            { text: "Cancel", value: false },
            { text: "OK", value: true, primary: true },
          ],
          { default: defaultValue }
        );
      }

      async function showQuizPopup(question, options) {
        return new Promise((resolve) => {
          const overlay = document.createElement("div");
          overlay.style.cssText =
            "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;";

          const popup = document.createElement("div");
          popup.style.cssText =
            "background:linear-gradient(180deg,#fff,#ecfeff);padding:24px;border-radius:16px;max-width:450px;width:90%;box-shadow:0 20px 50px rgba(0,0,0,0.3);border:4px solid #67e8f9;";

          const titleEl = document.createElement("h3");
          titleEl.style.cssText =
            'margin:0 0 16px;color:#0891b2;font-size:18px;font-family:"Baloo 2",cursive;';
          titleEl.textContent = "🌿 Eco Quiz!";
          popup.appendChild(titleEl);

          const qEl = document.createElement("p");
          qEl.style.cssText =
            "margin:0 0 16px;color:#0f172a;font-size:15px;font-weight:700;line-height:1.4;";
          qEl.textContent = question;
          popup.appendChild(qEl);

          options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.style.cssText =
              "display:block;width:100%;padding:12px;margin-bottom:8px;border:2px solid #e0f2fe;border-radius:10px;font-weight:700;cursor:pointer;background:#fff;color:#0f172a;font-size:14px;text-align:left;transition:all 0.2s;";
            btn.textContent = `${idx + 1}. ${opt}`;
            btn.onmouseover = () => (btn.style.background = "#ecfeff");
            btn.onmouseout = () => (btn.style.background = "#fff");
            btn.onclick = () => {
              document.body.removeChild(overlay);
              resolve(idx);
            };
            popup.appendChild(btn);
          });

          overlay.appendChild(popup);
          document.body.appendChild(overlay);
        });
      }

      async function askTask() {
        if (!quizMode) return { correct: false, reward: null };
        const t = TASKS[Math.floor(Math.random() * TASKS.length)];
        const sel = await showQuizPopup(t.q, t.opts);
        const correct = sel === t.a;
        return { correct, reward: t.reward, fact: t.opts[t.a] };
      }

      /* ---------- game actions on landing ---------- */
      async function handleLanding(playerIdx) {
        const p = players[playerIdx];
        let landed = p.position;
        const tile = boardArea.children[landed - 1];

        // visual flash for tile
        if (tile) {
          tile.classList.add("glow");
          setTimeout(() => tile.classList.remove("glow"), 700);
        }

        // power-up tile
        if (POWER_TILES[landed]) {
          const t = POWER_TILES[landed];
          if (t === "energy") {
            gameState.energy += 1;
            showFloating(p, "⚡ Energy +1");
            audioReward();
          }
          if (t === "shield") {
            gameState.shields += 1;
            showFloating(p, "🛡 Shield +1");
            audioReward();
          }
          if (t === "coin") {
            gameState.coins += 5;
            showFloating(p, "🪙 +5 Eco-Coins");
            audioReward();
          }
          if (t === "oxygen") {
            gameState.oxygen = Math.min(100, gameState.oxygen + 8);
            showFloating(p, "🍃 Oxygen +8");
            audioReward();
          }
          if (t === "rainbow") {
            // teleport to nearest ladder ahead
            const ahead = Object.keys(LADDERS)
              .map((n) => +n)
              .filter((n) => n > landed)
              .sort((a, b) => a - b);
            if (ahead.length) {
              const dest = LADDERS[ahead[0]];
              await animateSteps(playerIdx, landed, dest, 110);
              p.position = dest;
              showFloating(p, "🌈 Jumped to ladder!");
              audioReward();
              landed = dest;
            }
          }
        }

        // green reward tile
        if (GREEN_TILES.includes(landed)) {
          gameState.coins += 2;
          gameState.oxygen = Math.min(100, gameState.oxygen + 3);
          showFloating(p, "✅ Reward: +2 coins, +3 O₂");
          audioReward();
        }

        // ladder
        if (LADDERS[landed]) {
          await new Promise((r) => setTimeout(r, 150));
          showFloating(p, "🪜 Climb!");
          audioReward();
          const dest = LADDERS[landed];
          await animateSteps(playerIdx, landed, dest, 110);
          p.position = dest;
          landed = dest;
        }

        // red penalty tiles: present mini-task; failure = penalty
        if (RED_TILES.includes(landed)) {
          // chance depends on diceSet and other state
          const ds = diceSet.value;
          const risk = ds === "risk" ? 0.8 : ds === "eco" ? 0.2 : 0.45;
          // task to possibly avoid penalty
          const task = await askTask();
          if (task.correct || Math.random() > risk) {
            // partial mitigation: success
            gameState.coins += task.reward?.coins || 1;
            gameState.oxygen = Math.min(
              100,
              gameState.oxygen + (task.reward?.oxygen || 1)
            );
            showFloating(p, "🟢 Task pass! small reward");
            audioReward();
          } else {
            // failure -> penalty
            // check shields
            let useShield = p._shieldActive;
            if (!useShield && gameState.shields > 0) {
              useShield = await showConfirm(
                "🛡 Use Shield?",
                `${p.name} — Use your Shield to block this penalty?`
              );
            }
            if (useShield) {
              if (!p._shieldActive && gameState.shields > 0) {
                gameState.shields--;
                showFloating(p, "🛡 Shield used — penalty blocked");
              }
              p._shieldActive = false;
              audioReward();
            } else {
              // apply penalty: coins lost, oxygen down, slide back a few
              const loss = Math.min(gameState.coins, 3);
              gameState.coins -= loss;
              gameState.oxygen = Math.max(0, gameState.oxygen - 6);
              showFloating(p, `🔴 Penalty: -${loss} coins, -6 O₂`);
              audioPenalty();
              // small shake effect on board
              boardArea.classList.add("shake");
              setTimeout(() => boardArea.classList.remove("shake"), 520);
              // slide back 2-4 tiles
              const stepsBack = 2 + Math.floor(Math.random() * 3);
              const newPos = Math.max(1, p.position - stepsBack);
              await animateSteps(playerIdx, p.position, newPos, 120);
              p.position = newPos;
              landed = p.position;
            }
          }
        }

        // snake after all protections
        if (SNAKES[landed]) {
          const blocked = p._shieldActive;
          if (blocked) {
            p._shieldActive = false;
            showFloating(p, "🛡 Shield blocked the snake!");
            audioReward();
          } else {
            audioPenalty();
            showFloating(p, "🐍 Snake! Slide down!");
            const dest = SNAKES[landed];
            await new Promise((r) => setTimeout(r, 360));
            await animateSteps(playerIdx, landed, dest, 120);
            p.position = dest;
            landed = dest;
          }
        }

        // small environmental drift: if player does many rewards, pollution decreases slightly
        gameState.pollution = Math.max(
          0,
          gameState.pollution - Math.random() * 1.2
        );
        // cap
        gameState.oxygen = Math.max(0, Math.min(100, gameState.oxygen));
        gameState.pollution = Math.max(0, Math.min(100, gameState.pollution));

        updateHUD();
        placePieces();
        return landed;
      }

      // show floating text near piece
      function showFloating(player, text) {
        const pos = tileCenter(player.position || 1);
        const f = document.createElement("div");
        f.textContent = text;
        f.style.position = "absolute";
        f.style.left = pos.x + 60 + "px";
        f.style.top = pos.y + 20 + "px";
        f.style.padding = "6px 10px";
        f.style.borderRadius = "10px";
        f.style.background = "rgba(2,8,6,0.9)";
        f.style.color = "#dfffe6";
        f.style.fontWeight = "800";
        f.style.zIndex = 999;
        document.body.appendChild(f);
        requestAnimationFrame(() => {
          f.style.transition = "transform .9s, opacity .9s";
          f.style.transform = "translateY(-60px)";
          f.style.opacity = "0";
        });
        setTimeout(() => f.remove(), 900);
      }

      /* ---------- roll handler (advanced dice sets) ---------- */
      async function handleRoll() {
        if (animating) return;
        animating = true;
        rollBtn.disabled = true;
        if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();

        // produce dice depending on set
        const ds = diceSet.value;
        let dice = Math.floor(Math.random() * 6) + 1;
        // modify distribution slightly
        if (ds === "eco") {
          // slight bias toward 4-6
          if (Math.random() < 0.28) dice = 4 + Math.floor(Math.random() * 3);
        } else if (ds === "risk") {
          // risk: high variance - 1 or 6 more likely
          const r = Math.random();
          if (r < 0.18) dice = 1;
          else if (r > 0.82) dice = 6;
        }
        diceEl.textContent = dice;
        audioRoll();

        // energy booster: spend energy to add +2
        const p = players[currentIdx];
        if (gameState.energy > 0) {
          const useEnergy = await showConfirm(
            "⚡ Use Energy?",
            `${p.name}: Spend 1 Energy for +2 move?`
          );
          if (useEnergy) {
            gameState.energy--;
            dice += 2;
            showFloating(p, "⚡ Energy used: +2 move");
          }
        }

        await new Promise((r) => setTimeout(r, 420));

        const startPos = p.position || 0;
        let target = startPos + dice;
        if (target > BOARD_SIZE) target = BOARD_SIZE;

        await animateSteps(currentIdx, startPos, target, 140);

        // on landing, compute events
        let landed = await handleLanding(currentIdx);

        // coins for passing certain tiles (e.g., pass multiple of 10 gives bonus)
        if (Math.floor(landed / 10) > Math.floor(startPos / 10)) {
          gameState.coins += 1;
          showFloating(p, "🏁 Passed section: +1 coin");
          audioReward();
        }

        // win check
        if (landed >= BOARD_SIZE) {
          audioReward();
          confetti.spawn(120);
          showBigMessage(`${p.name} reached the finish! 🎉`);
          rollBtn.disabled = true;
          animating = false;
          
          // Dispatch game completion event
          window.dispatchEvent(new CustomEvent('gameComplete', {
            detail: { finalScore: p.coins * 10 }
          }));
          return;
        }

        // next player
        currentIdx = (currentIdx + 1) % players.length;
        updateCurrent();
        diceEl.textContent = "-";
        rollBtn.disabled = false;
        animating = false;
        updateHUD();
      }

      /* ---------- UI and init ---------- */
      function updateCurrent() {
        currentName.textContent = `${players[currentIdx].name} ${players[currentIdx].avatar}`;
        const rows = playersCompact.querySelectorAll(".player-compact");
        rows.forEach((r, idx) => {
          r.style.border =
            idx === currentIdx
              ? "2px solid #fde68a"
              : "1px solid rgba(0,0,0,0.06)";
        });
      }

      function showBigMessage(text) {
        msg.textContent = text;
        msg.classList.add("glow");
        setTimeout(() => {
          msg.classList.remove("glow");
          msg.textContent = "Game over — Reset to play again.";
        }, 3800);
      }

      function init() {
        buildBoard();
        drawLines();
        // default two players
        players = [
          { id: 0, name: "Player 1", avatar: "🐼", color: "#FF5E5E", position: 1 },
          { id: 1, name: "Player 2", avatar: "🐯", color: "#5EBEFF", position: 1 },
        ];
        // create player rows
        playersCompact.innerHTML = "";
        players.forEach((p, i) => {
          const row = document.createElement("div");
          row.className = "player-compact";
          row.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px">
          <div class="avatar" style="background:${p.color}">${p.avatar}</div>
          <div style="display:flex;flex-direction:column">
            <input class="name-input" value="${p.name}" data-index="${i}" />
            <div style="font-size:11px;color:#64748b">Pos: <span data-pos>0</span></div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          <button class="small-btn" data-action="avatar" data-index="${i}">Avatar</button>
          <button class="small-btn" data-action="color" data-index="${i}">Color</button>
        </div>`;
          playersCompact.appendChild(row);
        });

        // wire avatar/color/name inputs
        playersCompact.querySelectorAll("button[data-action]").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const idx = +btn.dataset.index;
            const row = btn.closest(".player-compact");
            const avatarEl = row.querySelector(".avatar");
            if (btn.dataset.action === "avatar") {
              const em = await showPrompt(
                "🎭 Change Avatar",
                "Enter a single emoji for your avatar:",
                avatarEl.textContent
              );
              if (em) {
                avatarEl.textContent = em;
                players[idx].avatar = em;
              }
            } else {
              const col = await showPrompt(
                "🎨 Change Color",
                "Enter hex color (e.g. #FF5E5E):",
                avatarEl.style.background
              );
              if (col) {
                avatarEl.style.background = col;
                players[idx].color = col;
              }
            }
            placePieces();
          });
        });
        playersCompact.querySelectorAll(".name-input").forEach((inp) => {
          inp.addEventListener("input", () => {
            const idx = +inp.dataset.index;
            players[idx].name = inp.value;
            updateCurrent();
          });
        });

        // HUD & pieces
        updateHUD();
        placePieces();
        updateCurrent();
        rollBtn.disabled = false;
      }

      // events
      rollBtn.addEventListener("click", handleRoll);
      resetBtn.addEventListener("click", () => {
        players.forEach((p) => (p.position = 1));
        currentIdx = 0;
        gameState = {
          oxygen: 72,
          pollution: 18,
          coins: 0,
          energy: 0,
          shields: 0,
        };
        updateHUD();
        placePieces();
        updateCurrent();
        msg.textContent = "Reset — ready to play!";
        rollBtn.disabled = false;
      });
      kidModeCheckbox.addEventListener("change", () => {
        kidMode = kidModeCheckbox.checked;
        document
          .getElementById("container")
          .classList.toggle("kid", kidMode);
        placePieces();
      });
      quizModeCheckbox.addEventListener(
        "change",
        () => (quizMode = quizModeCheckbox.checked)
      );

      // HELP popup: show/hide handlers (replaces alert)
      helpBtn.addEventListener("click", () => {
        helpPopup.classList.add("show");
        helpPopup.setAttribute("aria-hidden", "false");
        // simple focus trap: focus close button
        if (helpClose) helpClose.focus();
      });
      helpClose.addEventListener("click", () => {
        helpPopup.classList.remove("show");
        helpPopup.setAttribute("aria-hidden", "true");
      });
      helpMore.addEventListener("click", () => {
        // Expand with more tips in the popup
        const more = document.createElement("div");
        more.style.marginTop = "10px";
        more.innerHTML = `
      <p style="font-weight:800">Advanced Tips:</p>
      <ul style="padding-left:18px;margin:6px 0 0 0">
        <li>Use Shields strategically on red-heavy areas.</li>
        <li>Green Dice yields more rewards — safe for beginners.</li>
        <li>Energy usage is temporary but can secure a ladder if timed right.</li>
      </ul>
    `;
        const helpText = document.getElementById("helpText");
        // Prevent duplicate append
        if (!helpText.dataset.more) {
          helpText.appendChild(more);
          helpText.dataset.more = "1";
        }
      });
      // close on backdrop click
      helpPopup.addEventListener("click", (e) => {
        if (e.target === helpPopup) {
          helpPopup.classList.remove("show");
          helpPopup.setAttribute("aria-hidden", "true");
        }
      });
      // close on escape
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && helpPopup.classList.contains("show")) {
          helpPopup.classList.remove("show");
          helpPopup.setAttribute("aria-hidden", "true");
        }
      });

      helpBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          helpBtn.click();
        }
      });

      // utility: update displayed positions in compact rows
      function refreshPositions() {
        playersCompact.querySelectorAll(".player-compact").forEach((r, idx) => {
          const sp = r.querySelector("[data-pos]");
          sp.textContent = players[idx].position;
        });
      }

      // after every move, call this interval to refresh positions & HUD
      setInterval(() => {
        refreshPositions();
        updateHUD();
      }, 400);

      // minimal unlock: use arrow keys to open audio context on first keypress
      window.addEventListener("keydown", function onFirst() {
        if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
        window.removeEventListener("keydown", onFirst);
      });

      // initialize confetti and UI
      init();

      // expose for debugging (optional)
      window.__eco = { players, gameState, animateSteps, start: init };
    })();
  }, []);

  return (
    <div className="snake-game-root">
      <style>{`
  .snake-game-root {
    --bg: linear-gradient(180deg,#FFFBEB 0%, #ECFCCB 50%, #C7EAFB 100%);
    --card:#fff;
    --accent:#10b981;
    --accent-2:#06b6d4;
    --danger:#ef4444;
    --tile-size:56px;
    --board-gap:10px;
    --glow: 0 10px 30px rgba(16,185,129,0.18);
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: var(--bg);
    display:flex;
    align-items:flex-start;
    justify-content:center;
    padding: 80px 20px 20px 20px;
    color:#062017;
    min-height:100vh;
    width: 100%;
    box-sizing: border-box;
  }
  .snake-game-root *{box-sizing:border-box}
  .snake-game-root .container {
    width:100%;
    max-width:1400px;
    display:flex;
    flex-wrap:wrap;
    gap:20px;
    align-items:flex-start;
    justify-content:center;
    padding:10px;
  }
  .snake-game-root .board-card {
    width:680px;
    min-height:720px;
    background:linear-gradient(180deg,#fffaf0,#fff6ea);
    border-radius:16px;border:6px solid #FDE68A;
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);padding:20px;position:relative;overflow:visible;
  }
  .snake-game-root .board-area { 
    width:620px;
    height:620px;
    margin:10px auto;
    border-radius:12px;
    background: linear-gradient(180deg,#FEF3C7,#FFEDD5);
    display:grid;
    grid-template-columns:repeat(10,1fr);
    grid-template-rows:repeat(10,1fr);
    gap:2px;
    border:4px solid #FFEDD5;
    position:relative;
  }
  .snake-game-root .tile { 
    position:relative;
    background: linear-gradient(180deg,#fff,#fff8f0);
    display:flex;
    align-items:flex-start;
    justify-content:flex-start;
    padding:4px;
    font-weight:800;
    color:#6b7280;
    font-size:11px;
    border-radius:6px;
    transition:transform .18s, box-shadow .18s;
    overflow:hidden;
    min-width:0;
    min-height:0;
  }
  .snake-game-root .tile .num { font-size:10px;color:#374151;background:rgba(255,255,255,0.9);padding:1px 4px;border-radius:6px;border:1px solid rgba(0,0,0,0.05); }
  .snake-game-root .tile .event { font-size:9px;position:absolute;bottom:2px;left:2px;right:2px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
  .snake-game-root .tile.green{ box-shadow: 0 6px 18px rgba(34,197,94,0.12); border:2px solid rgba(34,197,94,0.12); }
  .snake-game-root .tile.red{ box-shadow: 0 6px 18px rgba(239,68,68,0.10); border:2px solid rgba(239,68,68,0.10); }
  .snake-game-root .tile.event{ font-size:11px;color:#0f172a;padding:6px;display:flex;align-items:center;justify-content:center;font-weight:800; }

  .snake-game-root .overlay{ position:absolute; left:20px; top:30px; width:620px; height:620px; pointer-events:none; z-index:4;}
  .snake-game-root .pieces{ position:absolute; left:20px; top:30px; width:620px; height:620px; pointer-events:none; z-index:6;}
  .snake-game-root .piece{ position:absolute;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:20px;transform: translate(-50%,-50%);box-shadow:0 8px 20px rgba(0,0,0,0.18);border:4px solid #fff;transition:transform 220ms cubic-bezier(.2,.9,.2,1), left 220ms linear, top 220ms linear;}
  .snake-game-root .piece.big{ width:64px;height:64px;font-size:26px;}
  .snake-game-root .snake-img{ position:absolute;width:48px;height:36px;transform: translate(-50%,-50%);pointer-events:none }

  /* panel */
  .snake-game-root .panel{ 
    width:420px;
    min-width:350px;
    min-height:720px;
    background:#fff;
    border-radius:14px;
    border:6px solid #DBEAFE; 
    box-shadow:0 10px 30px rgba(0,0,0,0.12); 
    padding:14px; 
    display:flex; 
    flex-direction:column; 
    gap:12px; 
    overflow:visible;
  }
  .snake-game-root .title{ font-family:"Baloo 2", cursive; font-size:22px; color:#16a34a; margin:0 }
  .snake-game-root .subtitle{ font-weight:800; color:#0f172a; font-size:13px }
  .snake-game-root .players-compact{ display:flex; flex-direction:column; gap:8px; max-height:260px; overflow:auto; padding-right:6px }
  .snake-game-root .player-compact{ display:flex; align-items:center; justify-content:space-between; gap:8px; padding:8px 10px; border-radius:10px; background:linear-gradient(180deg,#fbf7ff,#fff); border:1px solid rgba(0,0,0,0.04)}
  .snake-game-root .avatar{ width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:20px;border:3px solid rgba(255,255,255,0.9)}
  .snake-game-root .name-input{ width:160px;padding:6px;border-radius:8px;border:2px solid #eef2ff;font-weight:800}
  .snake-game-root .controls{ display:flex; flex-direction:column; gap:8px; margin-top:6px }
  .snake-game-root .dice-box{ font-size:28px; font-weight:900; color:#0369a1; text-align:center; padding:8px 0; }
  .snake-game-root .roll-btn{ padding:12px; border-radius:12px; background:linear-gradient(180deg,#34d399,#10b981); color:#fff; font-weight:900; border:6px solid #86efac; cursor:pointer; font-size:18px; box-shadow:var(--glow) }
  .snake-game-root .roll-btn[disabled]{ opacity:0.6; cursor:not-allowed }
  .snake-game-root .small-row{ display:flex; gap:8px; align-items:center }
  .snake-game-root .small-btn{ padding:8px 10px; border-radius:10px; background:#fff; border:1px solid rgba(0,0,0,0.06); cursor:pointer; font-weight:800 }
  .snake-game-root .message{ padding:8px; border-radius:10px; background:linear-gradient(180deg,#ecfeff,#ffffff); border:2px solid #bbf7d0; font-weight:800; color:#064e3b; text-align:center; min-height:40px; display:flex; align-items:center; justify-content:center }
  .snake-game-root .footer-compact{ margin-top:auto; display:flex; gap:8px; align-items:center; justify-content:space-between }
  .snake-game-root .reset{ background:#fee2e2;border:1px solid #fecaca;padding:10px;border-radius:10px;font-weight:900;cursor:pointer }
  .snake-game-root .help{ background:#fff;border:1px solid #e6eef8;padding:10px;border-radius:10px;font-weight:800;cursor:pointer }

  /* HUD badges */
  .snake-game-root .hud{ display:flex; gap:8px; align-items:center; margin-top:6px; flex-wrap:wrap }
  .snake-game-root .badge{ background:linear-gradient(90deg,#ffffff,#f0fff4); padding:8px 10px; border-radius:12px; font-weight:800; display:flex; gap:8px; align-items:center; box-shadow: 0 6px 18px rgba(0,0,0,0.06) }
  .snake-game-root .meter{ width:160px; height:10px; background:rgba(0,0,0,0.06); border-radius:8px; overflow:hidden; }
  .snake-game-root .meter > i{ display:block; height:100%; background:linear-gradient(90deg,#10b981,#34d399); width:40%; transition:width 360ms; }

  /* effects */
  .snake-game-root .glow { box-shadow: 0 8px 30px rgba(16,185,129,0.28), 0 2px 6px rgba(16,185,129,0.08); transform:translateY(-3px); transition: all 240ms; }
  .snake-game-root .shake { animation: shakeX .52s ease-in-out; }
  @keyframes shakeX { 10%{transform:translateX(-6px)} 30%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 70%{transform:translateX(4px)} 100%{transform:translateX(0)} }

  .snake-game-root .confetti-canvas{ position:fixed; left:0; top:0; width:100%; height:100%; pointer-events:none; z-index:9999; display:none; }

  /* HELP POPUP - added styles */
  .snake-game-root .help-modal {
    position: fixed;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(2,6,23,0.52);
    z-index: 99999;
    padding: 18px;
  }
  .snake-game-root .help-modal.show { display:flex; }
  .snake-game-root .help-modal-content {
    width: 480px;
    max-width: calc(100% - 40px);
    max-height: 84vh;
    overflow:auto;
    background: linear-gradient(180deg,#ffffff,#f7fffa);
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 12px 40px rgba(3,7,18,0.36);
    border: 6px solid rgba(255,255,255,0.6);
    font-family: "Inter", sans-serif;
  }
  .snake-game-root .help-modal h2 { margin:0 0 8px; font-family:'Baloo 2', cursive; color:var(--accent); font-size:20px; }
  .snake-game-root .help-modal p { margin:8px 0; color:#0f172a; font-weight:700; line-height:1.45; font-size:14px; }
  .snake-game-root .help-modal .help-actions { margin-top:12px; display:flex; gap:8px; }
  .snake-game-root .help-modal .btn { flex:1; padding:10px 12px; border-radius:10px; border:0; cursor:pointer; font-weight:900; }
  .snake-game-root .help-modal .btn.primary { background:var(--accent); color:#fff; }
  .snake-game-root .help-modal .btn.ghost { background:#fff; border:1px solid rgba(0,0,0,0.06); }

  /* small responsive */
  @media (max-width:1200px){ 
    .snake-game-root .container{ max-width:100%; } 
    .snake-game-root .board-card{ width:auto; max-width:680px; }
    .snake-game-root .panel{ width:100%; max-width:420px; }
  }
  @media (max-width:900px){ 
    .snake-game-root {padding:70px 10px 10px 10px} 
    .snake-game-root .container{ flex-direction:column; align-items:center; } 
    .snake-game-root .board-card{ width:100%; max-width:100%; margin-bottom:20px; } 
    .snake-game-root .board-area{ width:100%; height:auto; aspect-ratio:1; max-width:620px; }
    .snake-game-root .panel{ width:100%; max-width:100%; min-height:auto; } 
  }
      `}</style>

      <div className="container" id="container">
        <div className="board-card">
          <div className="board-area" id="boardArea" />
          <svg
            className="overlay"
            id="overlay"
            viewBox="0 0 620 620"
            preserveAspectRatio="xMidYMid meet"
          />
          <div className="pieces" id="pieces" />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "8px",
              transform: "translateX(-50%)",
              fontSize: "20px",
            }}
          >
            🏁 FINISH
          </div>
        </div>

        <div className="panel" id="panel">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1 className="title">Eco Snakes &amp; Ladders</h1>
              <div className="subtitle">
                Colorful Icon Badges • Educational Tasks • Full Advanced Pack
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 900, color: "#0f172a" }}>2 Players</div>
              <div style={{ fontSize: "12px", color: "#475569" }}>
                Laptop layout
              </div>
            </div>
          </div>

          <div className="hud" id="hud">
            <div className="badge">
              🍃 Oxygen{" "}
              <div className="meter" style={{ marginLeft: "6px" }}>
                <i id="oxygenBar" style={{ width: "72%" }} />
              </div>
            </div>
            <div className="badge">
              🌫 Pollution{" "}
              <div className="meter" style={{ marginLeft: "6px" }}>
                <i
                  id="pollutionBar"
                  style={{
                    width: "18%",
                    background: "linear-gradient(90deg,#f97316,#ef4444)",
                  }}
                />
              </div>
            </div>
            <div className="badge">
              🪙 Eco-Coins{" "}
              <span
                id="ecoCoins"
                style={{ marginLeft: "6px", fontWeight: 900 }}
              >
                0
              </span>
            </div>
            <div className="badge">
              ⚡ Energy{" "}
              <span
                id="energyPts"
                style={{ marginLeft: "6px", fontWeight: 900 }}
              >
                0
              </span>
            </div>
            <div className="badge">
              🛡 Shield{" "}
              <span
                id="shields"
                style={{ marginLeft: "6px", fontWeight: 900 }}
              >
                0
              </span>
            </div>
          </div>

          <div className="players-compact" id="playersCompact" />

          <div className="controls">
            <div
              className="small-row"
              style={{ justifyContent: "space-between" }}
            >
              <label className="small-row" title="Kid friendly mode">
                <input id="kidMode" type="checkbox" />{" "}
                <span style={{ fontWeight: 800, marginLeft: "6px" }}>
                  Kid Mode
                </span>
              </label>
              <label className="small-row" title="Quiz mode">
                <input id="quizMode" type="checkbox" defaultChecked />{" "}
                <span style={{ fontWeight: 800, marginLeft: "6px" }}>
                  Quiz Mode
                </span>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: 800,
                  }}
                >
                  Current
                </div>
                <div
                  id="currentName"
                  style={{
                    fontWeight: 900,
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  —
                </div>
              </div>
              <div style={{ width: "120px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: 800,
                  }}
                >
                  Dice
                </div>
                <div id="dice" className="dice-box">
                  -
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <select
                id="diceSet"
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #e6eef8",
                  fontWeight: 800,
                }}
              >
                <option value="normal">Standard Dice (neutral)</option>
                <option value="eco">Green Dice — more rewards</option>
                <option value="risk">Red Dice — higher penalty chance</option>
              </select>
              <button id="rollBtn" className="roll-btn" disabled>
                🎲 Roll
              </button>
            </div>

            <div id="msg" className="message" style={{ display: "block" }}>
              Welcome! Edit names, then press Roll.
            </div>
          </div>

          <div className="footer-compact">
            <div style={{ display: "flex", gap: "8px" }}>
              <button id="resetBtn" className="reset">
                Reset
              </button>
              <button id="helpBtn" className="help">
                How to play
              </button>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#475569",
                fontWeight: 800,
              }}
            >
              Made for 1366×768 — Full Advanced Pack
            </div>
          </div>
        </div>
      </div>

      {/* HELP POPUP */}
      <div
        id="helpPopup"
        className="help-modal"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
      >
        <div className="help-modal-content" role="document">
          <h2>❓ How to Play — Eco Snakes &amp; Ladders (Advanced)</h2>
          <div id="helpText" style={{ marginTop: "8px" }}>
            <p>1) Two players. Edit name/avatar/color.</p>
            <p>
              2) Choose Dice Set: Normal / Green (more rewards) / Red (high
              variance).
            </p>
            <p>
              3) Click Roll. Answer quiz tasks on penalties or earn rewards on
              green tiles.
            </p>
            <p>
              4) Power-ups at special tiles: Energy (spend for +2 move), Shield
              (block next penalty), Oxygen, Coins.
            </p>
            <p>
              5) Green tiles give coins &amp; oxygen; Red tiles prompt tasks —
              fail and take penalties.
            </p>
            <p>
              6) Win by reaching tile 100. Environmental meters update as you
              play.
            </p>
            <p
              style={{
                marginTop: "8px",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Tip: Use Shields to block big penalties and Energy to get short
              bursts ahead.
            </p>
          </div>
          <div className="help-actions" style={{ marginTop: "12px" }}>
            <button id="helpClose" className="btn primary">
              OK
            </button>
            <button id="helpMore" className="btn ghost">
              More Tips
            </button>
          </div>
        </div>
      </div>

      <canvas id="confetti" className="confetti-canvas" />
    </div>
  );
};

export default EcoSnakesLadders;
