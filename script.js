const questions = [
    {
        question: "Javascript is an ____ language?",
        answers: [
            { text: "Object-Oriented", correct: true},
            { text: "Object-Based", correct: false},
            { text: "Procedural", correct: false},
            { text: "None of the above", correct: false}
        ]
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            { text: "var", correct: false},
            { text: "let", correct: false},
            { text: "Both A and B", correct: true},
            { text: "None of the above", correct: false}
        ]
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: [
            { text: "getElementbyId()", correct: false},
            { text: "getElementsByClassName()", correct: false},
            { text: "Both A and B", correct: true},
            { text: "None of the above", correct: false}
        ]
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            { text: "document.write()", correct: false},
            { text: "console.log()", correct: false},
            { text: "window.alert()", correct: false},
            { text: "All of the above", correct: true}
        ]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: [
            { text: "const", correct: false},
            { text: "var", correct: true},
            { text: "let", correct: false},
            { text: "constant", correct: false}
        ]
    }
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.corect === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();