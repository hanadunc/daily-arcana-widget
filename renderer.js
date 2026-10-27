const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Complete 22 Major Arcana Deck Array
const tarotDeck = [
  {
    name: "0. THE FOOL",
    keywords: "✦ NEW BEGINNINGS • INNOCENCE • LEAP OF FAITH ✦",
    quote: "Step into the unknown. A brand new cosmos awaits your first move.",
    fileName: "fool.svg"
  },
  {
    name: "I. THE MAGICIAN",
    keywords: "✦ MANIFESTATION • RESOURCEFULNESS • POWER ✦",
    quote: "All elements are in position. Direct your focus and spin reality.",
    fileName: "magician.svg"
  },
  {
    name: "II. THE HIGH PRIESTESS",
    keywords: "✦ INTUITION • SACRED KNOWLEDGE • MYSTERY ✦",
    quote: "Quiet the mind and tune into what lies beneath the surface.",
    fileName: "priestess.svg"
  },
  {
    name: "III. THE EMPRESS",
    keywords: "✦ ABUNDANCE • CREATIVITY • HARMONY ✦",
    quote: "Abundance favors momentum. Let your creative energy bloom.",
    fileName: "empress.svg"
  },
  {
    name: "IV. THE EMPEROR",
    keywords: "✦ STRUCTURE • AUTHORITY • STABILITY ✦",
    quote: "Order brings freedom. Stand grounded and direct your power.",
    fileName: "emperor.svg"
  },
  {
    name: "V. THE HIEROPHANT",
    keywords: "✦ TRADITION • WISDOM • CONFORMITY ✦",
    quote: "Honor timeless wisdom while discovering your inner truth.",
    fileName: "hierophant.svg"
  },
  {
    name: "VI. THE LOVERS",
    keywords: "✦ ALIGNMENT • HARMONY • CHOICES ✦",
    quote: "Choose paths that honor your truth and mirror your inner harmony.",
    fileName: "lovers.svg"
  },
  {
    name: "VII. THE CHARIOT",
    keywords: "✦ WILLPOWER • DETERMINATION • VICTORY ✦",
    quote: "Harness opposing forces and drive forward with clear intent.",
    fileName: "chariot.svg"
  },
  {
    name: "VIII. STRENGTH",
    keywords: "✦ COURAGE • COMPASSION • RESILIENCE ✦",
    quote: "True power speaks quietly. Tame chaos with quiet grace.",
    fileName: "strength.svg"
  },
  {
    name: "IX. THE HERMIT",
    keywords: "✦ SOLITUDE • REFLECTION • GUIDANCE ✦",
    quote: "Turn inward. The lantern light of self-reflection shows the way.",
    fileName: "hermit.svg"
  },
  {
    name: "X. WHEEL OF FORTUNE",
    keywords: "✦ DESTINY • CYCLES • SHIFTING FATE ✦",
    quote: "The wheel turns continuously. Ride the shifts and trust the cycle.",
    fileName: "wheel.svg"
  },
  {
    name: "XI. JUSTICE",
    keywords: "✦ FAIRNESS • TRUTH • ACCOUNTABILITY ✦",
    quote: "Seek balance in all things. Truth weighs light upon the heart.",
    fileName: "justice.svg"
  },
  {
    name: "XII. THE HANGED MAN",
    keywords: "✦ SURRENDER • RELEASE • PERSPECTIVE ✦",
    quote: "Pause the movement. A new vantage point changes everything.",
    fileName: "hangedman.svg"
  },
  {
    name: "XIII. DEATH",
    keywords: "✦ TRANSFORMATION • ENDINGS • REBIRTH ✦",
    quote: "Release what was. Clear space for the next radiant phase.",
    fileName: "death.svg"
  },
  {
    name: "XIV. TEMPERANCE",
    keywords: "✦ MODERATION • PATIENCE • INTEGRATION ✦",
    quote: "Blend opposing elements into steady, harmonious flow.",
    fileName: "temperance.svg"
  },
  {
    name: "XV. THE DEVIL",
    keywords: "✦ SHADOWS • ATTACHMENT • LIBERATION ✦",
    quote: "Recognize illusionary bounds. You hold the key to your own freedom.",
    fileName: "devil.svg"
  },
  {
    name: "XVI. THE TOWER",
    keywords: "✦ UPHEAVAL • BREAKTHROUGH • REVELATION ✦",
    quote: "Old structures fall to reveal undeniable, unshakeable truth.",
    fileName: "tower.svg"
  },
  {
    name: "XVII. THE STAR",
    keywords: "✦ HOPE • INSPIRATION • SERENITY ✦",
    quote: "Clear skies ahead. Renew your spirit and let your inner light lead.",
    fileName: "star.svg"
  },
  {
    name: "XVIII. THE MOON",
    keywords: "✦ ILLUSION • DREAMS • SUBCONSCIOUS ✦",
    quote: "Look past the shadows. Your intuition reads the hidden currents.",
    fileName: "moon.svg"
  },
  {
    name: "XIX. THE SUN",
    keywords: "✦ JOY • VITALITY • SUCCESS ✦",
    quote: "Pure warmth and total clarity. Stand in the full light of victory.",
    fileName: "sun.svg"
  },
  {
    name: "XX. JUDGMENT",
    keywords: "✦ AWAKENING • RECKONING • CALLING ✦",
    quote: "Listen to the higher call. Rise into your true potential.",
    fileName: "judgement.svg"
  },
  {
    name: "XXI. THE WORLD",
    keywords: "✦ COMPLETION • INTEGRATION • FULFILLMENT ✦",
    quote: "Full circle achieved. Reflect on the wisdom gained before the next leap.",
    fileName: "world.svg"
  }
];

// Read the card's exact SVG file from assets/cards/
function loadCardSVG(cardKey, fileName) {
  const svgPath = path.join(__dirname, 'assets', 'cards', fileName);

  try {
    return fs.readFileSync(svgPath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Missing card SVG for "${cardKey}": ${svgPath}`);
    } else {
      console.error(`Failed to read card SVG for "${cardKey}" at ${svgPath}:`, err);
    }
    return null;
  }
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

      const svgContent = loadCardSVG(currentCard.name, currentCard.fileName);

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
        <p class="card-quote-text">${currentCard.quote}</p>
      </div>
    `;

      infoBox.querySelectorAll('.card-title-text, .card-keywords-text').forEach((el) => {
        let size = parseFloat(getComputedStyle(el).fontSize);
        while (el.scrollWidth > el.clientWidth && size > 7) {
          size -= 0.5;
          el.style.setProperty('font-size', size + 'px', 'important');
        }
      });
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
