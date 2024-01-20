// Array of colors for the cards
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

// Shuffled array of colors for the game
let shuffledColors = shuffle(colors);
// Array to store selected cards during the game
let selectedCards = [];
// Counter to keep track of matched pairs
let matchedPairs = 0;

// Event listener for the "Start Game" button
document.getElementById('start-button').addEventListener('click', startGame);

// Function to start the game
function startGame() {
  document.getElementById('start-button').style.display = 'none';
  document.getElementById('game-container').classList.remove('hidden');
  initializeBoard();
}

// Function to initialize the memory board
function initializeBoard() {
  const memoryBoard = document.getElementById('memory-board');
  memoryBoard.innerHTML = '';

  // Create cards and add event listeners
  for (let color of shuffledColors) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.color = color;
    card.addEventListener('click', flipCard);
    memoryBoard.appendChild(card);
  }
}

// Function to handle card flipping
function flipCard() {
  // Allow flipping only if less than 2 cards are selected and the card is not already flipped
  if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
    this.style.backgroundColor = this.dataset.color;
    this.classList.add('flipped');
    selectedCards.push(this);

    // Check for a match after a short delay
    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Function to check if the selected cards match
function checkMatch() {
  const [card1, card2] = selectedCards;

  if (card1.dataset.color === card2.dataset.color) {
    // If colors match, disable click events and increment matched pairs
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    matchedPairs++;

    // Display a congratulatory message if all pairs are matched
    if (matchedPairs === colors.length / 2) {
      displayMessage('Congratulations! You have completed the game.');
    }
  } else {
    // If colors do not match, flip the cards back
    card1.style.backgroundColor = '#999';
    card2.style.backgroundColor = '#999';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  // Reset the array of selected cards
  selectedCards = [];
}

// Function to display a message
function displayMessage(message) {
  document.getElementById('message').innerText = message;
}

// Function to shuffle an array
function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

//portfolio
function toggleText(section) {
  var displayTextElement = document.getElementById(section + "Display");
  
  if (displayTextElement.innerHTML !== "") {
    displayTextElement.innerHTML = "";
  } else {
    var textLines;

    switch (section) {
      case 'personal':
        textLines = [
          "Naam: Azra Hale Özkan",
          "Geboortedatum: 21-01-2007",
          "Telefoonnummer: +31 6 820260182",
          "Geboortedatum: Rotterdam ",
          "Nationaliteit: Turks en Nederlands",
          "E-mail: ------",
          "Adres: ------",
        ];
        break;
      case 'education':
        textLines = [
          "Software Developer, niveau 4 MBO, 2023 - 2024"
        ];
        break;
      case 'internship':
        textLines = [
          "Snuffelstage basisschool",
        ];
        break;
      case 'skills':
          textLines = [
            "Vriendelijk",
            "Behulpzaam",
            "Geduldig",
          ];
          break;
        case 'hobbies':
            textLines = [
              "Wandelen",
              "lezen",
            ];
            break;
       case 'abilities':
        textLines = [
          "Beheers Engels taal",
          "Beheers Nederlandse taal",
          "Coderen",
        ];
    }

    for (var i = 0; i < textLines.length; i++) {
      displayTextElement.innerHTML += textLines[i] + "<br>";
    }
  }
}























document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('location');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');
 
    getWeatherBtn.addEventListener('click', getWeather);
 
    function getWeather() {
        const location = locationInput.value;
 
        if (!location) {
            alert('Voer een locatie in.');
            return;
        }
 
        const apiKey = '626fcf6a2654c1d7cc193664b0dd4c09'; // Vul hier je eigen API-sleutel in
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
 
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Locatie niet gevonden');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                displayError(error.message);
            });
    }
 
    function displayWeather(data) {
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
 
        weatherInfo.innerHTML = `
            <h2>Actuele Weergegevens</h2>
            <p>Temperatuur: ${temperature}°C</p>
            <p>Luchtvochtigheid: ${humidity}%</p>
            <p>Beschrijving: ${description}</p>
        `;
    }
 
    function displayError(message) {
        weatherInfo.innerHTML = `<p class="error">${message}</p>`;
    }
});
