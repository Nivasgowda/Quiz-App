//this is to store different questions with their answers
const questions=[
    {
        question: "What is the capital of Australia?",
        answer: [
            {text:"Canberra", correct:true},
            {text:"Hong-Kong", correct:false},
            {text:"London", correct:false},
            {text:"Canada", correct:false},
           ]
    },

    {
        question: "Which is the largest animal in the World?",
        answer: [
            {text:"Elephant", correct:false},
            {text:"Blue-whale", correct:true},
            {text:"Octopus", correct:false},
            {text:"Giraffe", correct:false},
           ]  
    },
    {
        question: "What is the largest desert in the World?",
        answer: [
            {text:"Sahara", correct:false},
            {text:"Kalahari", correct:false},
            {text:"Gobi", correct:false},
            {text:"Antarctica", correct:true},
           ]
    },

    {
        question: "Which is the smallest country in the world?",
        answer: [
            {text:"SriLanka", correct:false},
            {text:"Bhutan", correct:false},
            {text:"Vatican City", correct:true},
            {text:"Nepal", correct:false},
           ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            {text:"Australia", correct:true},
            {text:"Asia", correct:false},
            {text:"Europe", correct:false},
            {text:"Africa", correct:false},
           ]
    }
];

const questionELement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//getting or storing the array of questions 
let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    //displaying the question on screen
    questionELement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answer.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display="none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);

}
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

function showScore(){
    resetState();
    questionELement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = `Play Again`;
    nextButton.style.display = "block";

}


nextButton.addEventListener("click", () =>{
if(currentQuestionIndex < questions.length){
    handleNextButton();
}else{
    startQuiz();
}
});

startQuiz();