let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit');
const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart');

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    questionElement.innerHTML = `<h2>Pregunta ${currentQuestion + 1} de ${quizQuestions.length}</h2>
                               <p>${question.question}</p>`;

    choicesElement.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.className = 'choice';
        button.innerHTML = choice;
        button.onclick = () => selectChoice(index);
        choicesElement.appendChild(button);
    });
    
    selectedAnswer = -1;
    submitButton.disabled = true;
}

function selectChoice(index) {
    selectedAnswer = index;
    document.querySelectorAll('.choice').forEach((choice, idx) => {
        choice.classList.toggle('selected', idx === index);
    });
    submitButton.disabled = false;
}

function showResults() {
    quizElement.classList.add('hide');
    resultsElement.classList.remove('hide');
    scoreElement.textContent = `${score} de ${quizQuestions.length}`;
}

submitButton.addEventListener('click', () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizElement.classList.remove('hide');
    resultsElement.classList.add('hide');
    showQuestion();
});

showQuestion();