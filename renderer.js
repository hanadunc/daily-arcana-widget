const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Tarot Deck Array
const tarotDeck = [
  {
    name: "0. THE FOOL",
    keywords: "✦ NEW BEGINNINGS • INNOCENCE • LEAP OF FAITH ✦",
    quote: "Embrace the unknown with an open heart. A grand journey begins with a single step into wonder.",
    fileName: "fool"
  },
  {
    name: "I. THE MAGICIAN",
    keywords: "✦ MANIFESTATION • RESOURCEFULNESS • POWER ✦",
    quote: "You hold all the tools necessary to turn vision into reality. Align your intent with action.",
    fileName: "magician"
  },
  {
    name: "II. THE HIGH PRIESTESS",
    keywords: "✦ INTUITION • SACRED KNOWLEDGE • MYSTERY ✦",
    quote: "Listen closely to the quiet whisper of your intuition. Trust what lies beneath the surface.",
    fileName: "priestess"
  },
  {
    name: "III. THE EMPRESS",
    keywords: "✦ ABUNDANCE • CREATIVITY • HARMONY ✦",
    quote: "Nurture your passions and allow beauty to bloom naturally around you.",
    fileName: "empress"
  },
  {
    name: "IV. THE EMPEROR",
    keywords: "✦ STRUCTURE • AUTHORITY • STABILITY ✦",
    quote: "Build firm foundations. Channel your focus into disciplined momentum.",
    fileName: "emperor"
  },
  {
    name: "VI. THE LOVERS",
    keywords: "✦ ALIGNMENT • HARMONY • CHOICES ✦",
    quote: "Seek choices that honor your values and deepen genuine connections.",
    fileName: "lovers"
  },
  {
    name: "X. WHEEL OF FORTUNE",
    keywords: "✦ DESTINY • CYCLES • SHIFTING FATE ✦",
    quote: "Life moves in cosmic cycles. Welcome change, for the wheel turns in your favor.",
    fileName: "wheel"
  },
  {
    name: "XVII. THE STAR",
    keywords: "✦ HOPE • INSPIRATION • SERENITY ✦",
    quote: "A beacon of light guides your path. Trust in renewal and inner healing.",
    fileName: "star"
  },
  {
    name: "XVIII. THE MOON",
    keywords: "✦ ILLUSION • DREAMS • SUBCONSCIOUS ✦",
    quote: "Navigate shadows with gentleness. Let your subconscious illuminate hidden truths.",
    fileName: "moon"
  },
  {
    name: "XIX. THE SUN",
    keywords: "✦ JOY • VITALITY • SUCCESS ✦",
    quote: "Radiate warmth and vitality. Victory and clarity shine brightly upon your path.",
    fileName: "sun"
  },
  {
    name: "XXI. THE WORLD",
    keywords: "✦ COMPLETION • INTEGRATION • FULFILLMENT ✦",
    quote: "A cycle comes to a triumphant close. Celebrate the wisdom of your journey.",
    fileName: "world"
  }
];

// Read local SVG file text directly from assets/cards/
function loadCardSVG(cardKey) {
  try {
    const cardsDir = path.join(__dirname, 'assets', 'cards');
    if (!fs.existsSync(cardsDir)) return null;

    const files = fs.readdirSync(cardsDir);
    const matchedFile = files.find(f => f.toLowerCase().includes(cardKey.toLowerCase()) && f.endsWith('.svg'));

    if (matchedFile) {
      return fs.readFileSync(path.join(cardsDir, matchedFile), 'utf8');
    } else if (files.length > 0) {
      const fallbackFile = files.find(f => f.endsWith('.svg'));
      if (fallbackFile) {
        return fs.readFileSync(path.join(cardsDir, fallbackFile), 'utf8');
      }
    }
  } catch (err) {
    console.error("Error reading card SVG:", err);
  }
  return null;
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

      const svgContent = loadCardSVG(currentCard.fileName);

      if (svgContent) {
        cardFront.innerHTML = svgContent;
      } else {
        cardFront.innerHTML = `<div style="color: #e0c085; font-family: 'Cinzel', serif; font-size: 0.8rem; text-align: center; padding: 20px;">✦ ${currentCard.name} ✦</div>`;
      }

      tarotCard.classList.add('is-flipped');
      isDrawn = true;

      infoBox.innerHTML = `
        <div class="card-details-text">
          <span class="card-title-text">${currentCard.name}</span>
          <span class="card-keywords-text">${currentCard.keywords}</span>
          <p class="card-quote-text">"${currentCard.quote}"</p>
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