let questions = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('questions.json')
    .then(res => res.json())
    .then(data => {
      questions = data;
      showQuestion();
    });

  document.getElementById('submit-btn').addEventListener('click', handleSubmit);
});

function showQuestion() {
  if (currentIndex < questions.length) {
    document.getElementById('question-text').textContent = questions[currentIndex].question;
  } else {
    document.getElementById('question-text').textContent = "Game Over. Mind Meld complete.";
    document.getElementById('user-answer').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
  }
}

function handleSubmit() {
  const userAnswer = document.getElementById('user-answer').value.trim().toLowerCase();
  const correctAnswer = questions[currentIndex].answer.toLowerCase();

  const feedback = document.getElementById('feedback');
  if (userAnswer === correctAnswer) {
    feedback.textContent = "Mind Synced!";
    feedback.style.color = "#00ff88";
  } else {
    feedback.textContent = `Mind Diverged. The AI said: ${questions[currentIndex].answer}`;
    feedback.style.color = "#ff5050";
  }

  currentIndex++;
  document.getElementById('user-answer').value = '';
  setTimeout(() => {
    feedback.textContent = '';
    showQuestion();
  }, 2000);
}
