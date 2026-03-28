// ─────────────────────────────────────────
//  QUESTIONS ARRAY — add/edit here freely
// ─────────────────────────────────────────
const questions = [
  {
    question: "HTML ka full form ?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Hyper Text Multiple Language"
    ],
    correct: 0
  },
  {
    question: "CSS ka full form kya hai?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correct: 1
  },
  {
    question: "JavaScript mein variable declare karne ke liye kya use karte hain?",
    options: [
      "var, let, const",
      "int, float, string",
      "dim, set, put",
      "define, assign, store"
    ],
    correct: 0
  },
  {
    question: "HTML mein image insert karne ke liye kaunsa tag use hota hai?",
    options: [
      "<picture>",
      "<photo>",
      "<img>",
      "<image>"
    ],
    correct: 2
  },
  {
    question: "CSS mein background color set karne ki property kya hai?",
    options: [
      "color",
      "bg-color",
      "background",
      "background-color"
    ],
    correct: 3
  }
];

// ─────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────
const TIMER_SECONDS = 15;

// ─────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────
let currentIndex = 0;
let score        = 0;
let answered     = false;
let timerInterval= null;
let timeLeft     = TIMER_SECONDS;

// ─────────────────────────────────────────
//  DOM REFERENCES
// ─────────────────────────────────────────
const scoreBadge      = document.querySelector('.score-badge');
const timerBadge      = document.querySelector('.timer-badge');
const progressFill    = document.querySelector('.progress-fill');
const questionCounter = document.querySelector('.question-counter');
const questionText    = document.querySelector('.question-text');
const optionsList     = document.querySelector('.options-list');
const btnNext         = document.querySelector('.btn-next');
const btnBack         = document.querySelector('.btn-back');
const dotsWrap        = document.querySelector('.dots');
const resultScreen    = document.getElementById('resultScreen');
const quizCard        = document.querySelector('.quiz-card');

// ─────────────────────────────────────────
//  BUILD DOTS
// ─────────────────────────────────────────
function buildDots() {
  dotsWrap.innerHTML = '';
  questions.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === currentIndex ? ' active' : '');
    dotsWrap.appendChild(d);
  });
}

// ─────────────────────────────────────────
//  RENDER QUESTION
// ─────────────────────────────────────────
function renderQuestion() {
  answered = false;
  const q      = questions[currentIndex];
  const total  = questions.length;
  const letters = ['A', 'B', 'C', 'D'];

  // Update counter & progress bar
  questionCounter.textContent    = `Question ${currentIndex + 1} of ${total}`;
  progressFill.style.width       = `${((currentIndex + 1) / total) * 100}%`;

  // Update question text
  questionText.textContent = q.question;

  // Render options
  optionsList.innerHTML = '';
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.innerHTML = `
      <div class="option-letter">${letters[i]}</div>
      <span class="option-text">${opt}</span>
      <span class="option-icon"></span>
    `;
    div.addEventListener('click', () => selectOption(div, i));
    optionsList.appendChild(div);
  });

  // Update navigation dots
  buildDots();

  // Update button label
  // btnNext.textContent = currentIndex === total - 1 ? 'Finish Quiz 🎉' : 'Next Question →';

  // Start countdown timer
  startTimer();
}

// ─────────────────────────────────────────
//  SELECT OPTION
// ─────────────────────────────────────────
function selectOption(clickedEl, selectedIndex) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const correctIndex = questions[currentIndex].correct;
  const allOptions   = optionsList.querySelectorAll('.option');

  allOptions.forEach((el, i) => {
    el.classList.add('disabled');
    const icon = el.querySelector('.option-icon');

    if (i === correctIndex) {
      el.classList.add('correct');
      icon.textContent = '✅';
    } else if (i === selectedIndex && selectedIndex !== correctIndex) {
      el.classList.add('wrong');
      icon.textContent = '❌';
    }
  });

  // Update score if correct
  if (selectedIndex === correctIndex) {
    score++;
    scoreBadge.textContent = `Score: ${score}`;
  }
}

// ─────────────────────────────────────────
//  TIMER
// ─────────────────────────────────────────
function startTimer() {
  timeLeft = TIMER_SECONDS;
  updateTimerUI();
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) autoExpire();
    }
  }, 1000);
}

function updateTimerUI() {
  timerBadge.innerHTML = `<span class="clock-icon">⏱</span> 0:${String(timeLeft).padStart(2, '0')}`;
  // Turn red when 5 seconds or less remain
  timerBadge.style.background = timeLeft <= 5 ? '#fee2e2' : 'var(--timer-bg)';
  timerBadge.style.color      = timeLeft <= 5 ? '#dc2626' : 'var(--timer-text)';
}

// Called when timer runs out before user selects
function autoExpire() {
  answered = true;
  const correctIndex = questions[currentIndex].correct;
  const allOptions   = optionsList.querySelectorAll('.option');

  allOptions.forEach((el, i) => {
    el.classList.add('disabled');
    if (i === correctIndex) {
      el.classList.add('correct');
      el.querySelector('.option-icon').textContent = '✅';
    }
  });
}

// ─────────────────────────────────────────
//  NEXT BUTTON
// ─────────────────────────────────────────
btnNext.addEventListener('click', () => {
  if (!answered) {
    // User clicks next without answering — expire first, then move
    clearInterval(timerInterval);
    autoExpire();
    setTimeout(moveNext, 600);
    return;
  }
  moveNext();
});

// ─────────────────────────────────────────
//  Back BUTTON
// ─────────────────────────────────────────
btnBack.addEventListener('click', () => {
  currentIndex--;
  renderQuestion();
})


function moveNext() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

// ─────────────────────────────────────────
//  RESULT SCREEN
// ─────────────────────────────────────────
function showResult() {
  clearInterval(timerInterval);
  quizCard.classList.add('result-mode');
  resultScreen.classList.add('show');

  const pct = score / questions.length;
  document.getElementById('finalScore').textContent = score;
  document.getElementById('totalQ').textContent     = questions.length;

  if (pct === 1) {
    document.getElementById('resultEmoji').textContent = '🏆';
    document.getElementById('resultTitle').textContent = 'Perfect Score!';
  } else if (pct >= 0.6) {
    document.getElementById('resultEmoji').textContent = '🎉';
    document.getElementById('resultTitle').textContent = 'Well Done!';
  } else {
    document.getElementById('resultEmoji').textContent = '📚';
    document.getElementById('resultTitle').textContent = 'Keep Practising!';
  }
}

// ─────────────────────────────────────────
//  RESTART
// ─────────────────────────────────────────
function restartQuiz() {
  currentIndex = 0;
  score        = 0;
  answered     = false;
  scoreBadge.textContent = 'Score: 0';
  quizCard.classList.remove('result-mode');
  resultScreen.classList.remove('show');
  renderQuestion();
}

// ─────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────
renderQuestion();