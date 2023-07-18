const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteInput = document.getElementById('quoteInput')
const timer = document.getElementById('timer')

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    let quote = await getRandomQuote();
    quoteDisplay.innerHTML = '';
    quoteInput.value = null;

    quote = quote.split('');

    quote.forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    });

    clearInterval(intervalId);
    startTimer();
}

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {

        if (arrayValue[index] == null) {
            characterSpan.classList.remove('correct', 'incorrect');
            correct = false;
        } else if (arrayValue[index] === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });

    if (correct) {
        alert('Congratulations!!!');
        renderNewQuote();
    }
});

let startTime;
let intervalId;

function startTimer() {
    startTime = new Date();

    intervalId = setInterval(() => {
        let dateNow = new Date();
        let difference = dateNow - startTime;

        timer.innerText = Math.floor(difference / 1000);

    }, 1000);

}

renderNewQuote();