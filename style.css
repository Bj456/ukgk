let allQuestions = [];
let quizQuestions = [];
let current = 0;
let score = 0;
let lang = "hi";

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
    startQuiz();
  });

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  quizQuestions = shuffle([...allQuestions]).slice(0, 10);
  current = 0;
  score = 0;
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz-box").style.display = "block";
  showQuestion();
}

function setLang(l) {
  lang = l;
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[current];
  document.getElementById("q-count").innerText =
    `Question ${current + 1} / 10`;

  document.getElementById("question").innerText =
    q.question[lang];

  const optBox = document.getElementById("options");
  optBox.innerHTML = "";

  q.options[lang].forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optBox.appendChild(btn);
  });

  document.getElementById("nextBtn").disabled = true;
}

function checkAnswer(index, btn) {
  const q = quizQuestions[current];
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(b => b.disabled = true);

  if (index === q.answer_index) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons[q.answer_index].classList.add("correct");
  }

  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  current++;
  if (current < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText =
    `You scored ${score} out of 10`;
}
