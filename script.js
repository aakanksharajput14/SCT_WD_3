
const quizQuestions = [
  {
    type: "single",
    question: "What does HTTP stand for?",
    answers: { a:"High Transfer Text Protocol" , b: "HyperText Transfer Protocol", c: "Hyper Transfer Text Program", d: "Hyperlink Text Transfer Program" },
    correct: ["b"]
  },
  {
    type: "single",
    question: "Which language is used for web development?",
    answers: { a: "Python", b: "Java", c: "JavaScript", d: "C++" },
    correct: ["c"]
  },
  {
    type: "single",
    question: "Who is known as the father of computers?",
    answers: { a: "Charles Babbage", b: "Alan Turing", c: "Bill Gates", d: "Steve Jobs" },
    correct: ["a"]
  },
  {
    type: "multi",
    question: "Which of the following are programming languages?",
    answers: { a: "HTML", b: "Python", c: "Java", d: "CSS" },
    correct: ["b", "c"]
  },
  {
    type: "multi",
    question: "Which are examples of databases?",
    answers: { a: "MySQL", b: "MongoDB", c: "Github", d: "PostgreSQL" },
    correct: ["a", "b","d"]
  },
  {
    type: "fill",
    question: "______ is the process of finding and fixing errors in a program.",
    correct: ["debugging"]
  },
  {
    type: "fill",
    question: "The protocol used for sending emails is ______",
    correct: ["SMTP"]
  },
  {
    type: "single",
    question: "Open-source software means its source code is publicly available",
    answers: { a: "True", b: "False" },
    correct: ["a"]
  },
  {
    type: "single",
    question: "Python supports Object-Oriented Programming. ",
    answers: { a: "True", b: "False" },
    correct: ["a"]
  }
];

function buildQuiz() {
  const quizContainer = document.getElementById("quiz");
  const output = [];

  quizQuestions.forEach((q, index) => {
    let answers = [];

    if (q.type === "single") {
      for (let letter in q.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${index}" value="${letter}">
            ${letter}: ${q.answers[letter]}
          </label>`
        );
      }
    } else if (q.type === "multi") {
      for (let letter in q.answers) {
        answers.push(
          `<label>
            <input type="checkbox" name="question${index}" value="${letter}">
            ${letter}: ${q.answers[letter]}
          </label>`
        );
      }
    } else if (q.type === "fill") {
      answers.push(
        `<input type="text" name="question${index}" placeholder="Your Answer">`
      );
    }

    output.push(
      `<div class="question"> ${index + 1}. ${q.question} </div>
       <div class="answers"> ${answers.join("")} </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  let score = 0;

  quizQuestions.forEach((q, index) => {
    if (q.type === "single") {
      const selected = document.querySelector(`input[name=question${index}]:checked`);
      if (selected && q.correct.includes(selected.value)) {
        score++;
      }
    } else if (q.type === "multi") {
      const selected = Array.from(document.querySelectorAll(`input[name=question${index}]:checked`)).map(e => e.value);
      if (JSON.stringify(selected.sort()) === JSON.stringify(q.correct.sort())) {
        score++;
      }
    } else if (q.type === "fill") {
      const answer = document.querySelector(`input[name=question${index}]`).value.trim().toLowerCase();
      if (q.correct.includes(answer)) {
        score++;
      }
    }
  });

  document.getElementById("results").innerHTML = `You scored ${score} out of ${quizQuestions.length}`;
}

document.getElementById("submit").addEventListener("click", showResults);

buildQuiz();
