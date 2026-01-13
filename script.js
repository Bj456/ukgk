let data = [];

/* CSV loader */
fetch("data.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.split("\n");
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      if (row.length >= 2) {
        data.push({
          question: row[0],
          answer: row[1]
        });
      }
    }
  });

const input = document.getElementById("search");
const results = document.getElementById("results");

/* Text search */
input.addEventListener("input", () => {
  showResult(input.value);
});

/* Voice Recognition */
const micBtn = document.getElementById("mic");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";

micBtn.onclick = () => {
  recognition.start();
};

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  input.value = spokenText;
  showResult(spokenText);
};

/* Search + Speak */
function showResult(query) {
  results.innerHTML = "";
  const q = query.toLowerCase();

  let found = false;

  data.forEach(item => {
    if (item.question.toLowerCase().includes(q)) {
      found = true;

      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <strong>Q:</strong> ${item.question}<br>
        <strong>A:</strong> ${item.answer}
      `;
      results.appendChild(div);

      speak(item.answer);
    }
  });

  if (!found && q.length > 2) {
    speak("Is prashn ka uttar data mein uplabdh nahi hai");
  }
}

/* Text to Speech */
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "hi-IN";
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}
