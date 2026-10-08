const { ipcRenderer } = require('electron');

let tarotDeck = [];
try {
  tarotDeck = require('./tarotData.js');
} catch (e) {
  // Fallback if tarotData.js uses ES module or standard array
  tarotDeck = [
    {
      name: "0. THE FOOL",
      keywords: "✦ NEW BEGINNINGS • INNOCENCE • LEAP OF FAITH ✦",
      quote: "Embrace the unknown with an open heart. A grand journey begins with a single step into wonder.",
      image: "assets/cards/fool.png"
    }
  ];
}

document.addEventListener('DOMContentLoaded', () => {
  const minBtn = document.getElementById('minBtn');
  const closeBtn = document.getElementById('closeBtn');

  if (minBtn) minBtn.addEventListener('click', () => ipcRenderer.send('minimize-app'));
  if (closeBtn) closeBtn.addEventListener('click', () => ipcRenderer.send('close-app'));

  const tarotCard = document.getElementById('tarotCard');
  const cardFront = document.getElementById('cardFront');
  const infoBox = document.getElementById('infoBox');

  let isDrawn = false;

  function pullDailyCard() {
    if (!isDrawn) {
      const randomIndex = Math.floor(Math.random() * tarotDeck.length);
      const currentCard = tarotDeck[randomIndex];

      // Assign front image
      if (currentCard.image) {
        cardFront.style.backgroundImage = `url('${currentCard.image}')`;
      }

      // Flip card
      tarotCard.classList.add('is-flipped');
      isDrawn = true;

      // Update text details
      infoBox.innerHTML = `
        <div class="card-details-text">
          <span class="card-title-text">${currentCard.name || currentCard.title}</span>
          <span class="card-keywords-text">${currentCard.keywords}</span>
          <p class="card-quote-text">"${currentCard.quote || currentCard.description}"</p>
        </div>
      `;
    } else {
      tarotCard.classList.remove('is-flipped');
      isDrawn = false;

      infoBox.innerHTML = `
        <button class="draw-btn" id="drawBtn">
          <span class="btn-title">DRAW DAILY CARD</span>
          <span class="btn-subtitle">FOCUS YOUR INTENTION ON THE DAY AHEAD...</span>
        </button>
      `;
    }
  }

  if (tarotCard) tarotCard.addEventListener('click', pullDailyCard);
  if (infoBox) infoBox.addEventListener('click', pullDailyCard);
});