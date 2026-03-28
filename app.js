// Lista delle parole
const parole = ["testa","occhio","naso","bocca","orecchio","denti","gola","petto","braccio","mano","dito","pancia","schiena","gamba","piede"];
let currentWord = "";
let points = 0;

// Modalità
function startGame() { window.location.href = "gioco.html"; }
function startQuiz() { window.location.href = "quiz.html"; }

// Funzione Text-to-Speech
function parla(testo) {
    const msg = new SpeechSynthesisUtterance(testo);
    msg.lang = "it-IT";
    msg.rate = 0.7;
    speechSynthesis.speak(msg);
}

// =====================
// MODALITÀ PARLA
// =====================
function nextWord() {
    currentWord = parole[Math.floor(Math.random()*parole.length)];
    const wordElem = document.getElementById("word");
    if(wordElem) wordElem.innerText = currentWord.toUpperCase();

    const feedback = document.getElementById("feedback");
    if(feedback) feedback.innerText = "";

    const pointsElem = document.getElementById("points");
    if(pointsElem) pointsElem.innerText = "Punti: "+points;
}

// Avvia il riconoscimento vocale
function startRecognition() {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        alert("Il riconoscimento vocale non è supportato da questo browser.");
        return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "it-IT";
    recognition.onresult = function(event) {
        const spoken = event.results[0][0].transcript.toLowerCase();
        const feedback = document.getElementById("feedback");
        const pointsElem = document.getElementById("points");
        if(spoken.includes(currentWord)) {
            points++;
            if(feedback) feedback.innerText="✅ Corretto!";
        } else {
            if(feedback) feedback.innerText="❌ Riprova!";
        }
        if(pointsElem) pointsElem.innerText="Punti: "+points;
    }
    recognition.start();
}

// =====================
// MODALITÀ QUIZ
// =====================
function nextQuiz() {
    currentWord = parole[Math.floor(Math.random()*parole.length)];
    const targetElem = document.getElementById("target");
    if(targetElem) targetElem.innerText = currentWord.toUpperCase();

    const quizFeedback = document.getElementById("quizFeedback");
    if(quizFeedback) quizFeedback.innerText = "";

    // Pronuncia parola
    parla(currentWord);
}

// Controllo click sugli hotspot in modalità quiz
window.addEventListener("click", function(event) {
    const btn = event.target;
    if(btn.classList.contains("hotspot") && document.getElementById("target")) {
        const answer = btn.textContent.trim().toLowerCase();
        const feedback = document.getElementById("quizFeedback");
        if(answer === currentWord){
            if(feedback) feedback.innerText="✅ Corretto!";
        } else {
            if(feedback) feedback.innerText="❌ Sbagliato!";
        }
    }
});