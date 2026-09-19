// 1. Question Dataset
const quizData = [
  {
    question: "Where is India located on the map?",
    options: ["China", "Korea", "South Asia"],
    correct: 2
  },
  {
    question: "What does CSS do for your website?",
    options: [
      "Make the website more interactive",
      "Helps with online forms",
      "It controls the visual appearance, styling, and layout of a website."
    ],
    correct: 2
  },
  {
    question: "What is 5000 / 5?",
    options: ["1000", "100", "50", "5000"],
    correct: 0
  },
  {
    question: "What is a variable in JavaScript?",
    options: [
      "A number for solving Mathematical Problems",
      "A number for only division equations",
      "A named container used to store, reference, and manipulate data values in computer memory."
    ],
    correct: 2
  },
  {
    question: "What is the definition of UTF-16 in JavaScript?",
    options: [
      "Uniform Transition File 16-Bit",
      "16-Bit Unicode Transformation Format",
      "United Transform File 16"
    ],
    correct: 1
  },
  {
    question: "What two people invented Google?",
    options: [
      "Bill Gates and Larry Page",
      "Steve Jobs and Bill Gates",
      "Larry Page and Sergey Brin"
    ],
    correct: 2
  },
  {
    question: "Which empire was the largest contiguous land empire in history?",
    options: [
      "The Mongol Empire",
      "The Byzantine Empire",
      "The Roman Empire",
      "The German Empire"
    ],
    correct: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Collapsing Style Sheets",
      "Cascading Style Sheets",
      "Cool Styling Sacs",
      "Calling Super Sheets"
    ],
    correct: 1
  },
  {
    question: "Who is the lead guitarist for the heavy metal band Led Zeppelin?",
    options: ["Tom Morello", "Jimi Hendrix", "Tony Iommi", "Jimmy Page"],
    correct: 3
  },
  {
    question: "Who invented the Python Programming Language?",
    options: ["Ada Lovelace", "Steve Wozniak", "Guido van Rossum"],
    correct: 2
  },
  {
    question: "What city was Abraham Lincoln born in?",
    options: ["New York City", "Hodgenville, Kentucky", "Little Rock, Arkansas"],
    correct: 1
  },
  {
    question: "What is the definition of an Array in coding?",
    options: [
      "A ray of different combined functions",
      "A bunch of fuctions all combined into one whole file",
      "An array is a data structure used to store a collection of items under a single variable name"
    ],
    correct: 2
  },
  {
    question: "What is 152 x 50?",
    options: ["4000", "7500", "7600", "8000"],
    correct: 2
  },
  {
    question: "What is the capital of Australia?",
    options: ["Queensland", "Sydney", "Melbourne", "Canberra"],
    correct: 3
  },
  {
    question: "Solve this Order of Operations Equation 48/8x3-2?",
    options: ["15", "16", "20", "18"],
    correct: 1
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const progress = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const timeCount = document.getElementById("time-count");
const celebrationGif = document.createElement("img");
celebrationGif.src = "img/Your paragraph text.gif";
celebrationGif.alt = "Animated congratulations";
celebrationGif.className = "results-gif";

let currentQuestion = 0;
let score = 0;
let timer;

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hide");
  endScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  nextButton.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  const question = quizData[currentQuestion];
  const shuffledOptions = shuffleArray(
    question.options.map((option, index) => ({ option, index }))
  );

  questionText.textContent = question.question;
  progress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  answerOptions.innerHTML = "";
  nextButton.classList.add("hide");

  shuffledOptions.forEach(({ option, index }) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.dataset.originalIndex = String(index);
    button.addEventListener("click", () => selectAnswer(index, question.correct));
    answerOptions.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  let timeLeft = 30;
  timeCount.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft -= 1;
    timeCount.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer(-1, -2);
    }
  }, 1000);
}

function selectAnswer(selectedIndex, correctAnswer) {
  clearInterval(timer);
  const optionButtons = answerOptions.querySelectorAll("button");
  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  const selectedButton = [...optionButtons].find(
    (button) => Number(button.dataset.originalIndex) === selectedIndex
  );

  if (selectedIndex === correctAnswer) {
    score += 1;
    selectedButton.classList.add("correct");
  } else if (selectedIndex >= 0) {
    selectedButton.classList.add("wrond");
    optionButtons.forEach((button) => {
      if (Number(button.dataset.originalIndex) === correctAnswer) {
        button.classList.add("correct");
      }
    });
  } else {
    optionButtons.forEach((button) => {
      if (Number(button.dataset.originalIndex) === correctAnswer) {
        button.classList.add("correct");
      }
    });
  }

  nextButton.classList.remove("hide");
}

function showNextQuestion() {
  currentQuestion += 1;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(timer);
  quizScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = `Your final score is: ${score} / ${quizData.length}`;
  if (!celebrationGif.isConnected) {
    endScreen.insertBefore(celebrationGif, restartButton);
  }
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", startQuiz);
      
