// ===============================
// Animal Archetype Web App
// (Stable + safe version)
// ===============================

// ---------------- TRAITS ----------------
const TRAITS = ["social", "bold", "calm", "order", "curious", "warm"];

function emptyTraitVector() {
  const v = {};
  TRAITS.forEach((t) => (v[t] = 0));
  return v;
}

function addTraits(sum, add) {
  for (const [k, v] of Object.entries(add || {})) {
    if (sum[k] === undefined) sum[k] = 0;
    sum[k] += v;
  }
  return sum;
}

// ---------------- ANIMALS ----------------
const animals = {
  Axolotl: {
    emoji: "🦎",
    blurb:
      "Calm, adaptable, and quietly adorable. You don’t need to be loud to be powerful.",
    profile: { social: -1, bold: -1, calm: 2, order: -1, curious: 1, warm: 1 },
  },
  Kakapo: {
    emoji: "🦜",
    blurb: "Rare, sweet, and wonderfully weird. You do things your own way.",
    profile: { social: -1, bold: -1, calm: 2, order: 0, curious: 2, warm: 1 },
  },
  "Mantis Shrimp": {
    emoji: "🦐",
    blurb: "Colorful brain + surprising strength. You notice things others miss.",
    profile: { social: 0, bold: 2, calm: -2, order: 1, curious: 2, warm: -1 },
  },
  Pangolin: {
    emoji: "🦔",
    blurb: "Kind but protected. You have boundaries and strong inner values.",
    profile: { social: -2, bold: -1, calm: 1, order: 2, curious: 0, warm: 0 },
  },
  Quokka: {
    emoji: "🐿️",
    blurb: "Optimistic, friendly, and a natural mood booster.",
    profile: { social: 2, bold: -1, calm: 1, order: -1, curious: 1, warm: 2 },
  },
  Shoebill: {
    emoji: "🐦",
    blurb: "Calm intensity. You observe first, act when ready.",
    profile: { social: -2, bold: 1, calm: 2, order: 1, curious: 0, warm: -1 },
  },
  "Fennec Fox": {
    emoji: "🦊",
    blurb: "Quick thinker. You pivot fast and adapt easily.",
    profile: { social: 0, bold: 1, calm: -1, order: -1, curious: 2, warm: 0 },
  },
  Narwhal: {
    emoji: "🦄",
    blurb: "Gentle and magical thinker. Curious and kind.",
    profile: { social: 1, bold: 0, calm: 2, order: 0, curious: 2, warm: 2 },
  },
  "Snow Leopard": {
    emoji: "🐆",
    blurb: "Quiet power. Independent and strong under pressure.",
    profile: { social: -2, bold: 2, calm: 1, order: 1, curious: 0, warm: -1 },
  },
  Octopus: {
    emoji: "🐙",
    blurb: "Creative problem solver. You think sideways.",
    profile: { social: -1, bold: 1, calm: 0, order: -1, curious: 2, warm: 0 },
  },
};

// ---------------- QUESTIONS ----------------
const baseQuestions = [
  {
    text: "When entering a new group, you…",
    answers: [
      { label: "Say hi to everyone", t: { social: 2, warm: 1 } },
      { label: "Find one person", t: { social: 0, warm: 1 } },
      { label: "Observe first", t: { social: -2, calm: 1 } },
      { label: "Organize things", t: { order: 2 } },
    ],
  },
  {
    text: "When stressed you…",
    answers: [
      { label: "Push harder", t: { calm: -2, bold: 1 } },
      { label: "Go quiet", t: { social: -2, calm: 1 } },
      { label: "Make a plan", t: { order: 2 } },
      { label: "Make jokes", t: { warm: 2 } },
    ],
  },
  {
    text: "Rules are…",
    answers: [
      { label: "Important", t: { order: 2 } },
      { label: "Flexible", t: { order: -1, curious: 1 } },
      { label: "Annoying", t: { order: -2, bold: 1 } },
      { label: "Helpful sometimes", t: { order: 1 } },
    ],
  },
  {
    text: "Your energy level is usually…",
    answers: [
      { label: "Calm", t: { calm: 2 } },
      { label: "Intense", t: { calm: -2 } },
      { label: "Balanced", t: { calm: 1 } },
      { label: "Explosive bursts", t: { order: -1, bold: 1 } },
    ],
  },
  {
    text: "You feel proud when you…",
    answers: [
      { label: "Win", t: { bold: 2 } },
      { label: "Learn something hard", t: { curious: 2 } },
      { label: "Help someone", t: { warm: 2 } },
      { label: "Keep peace", t: { calm: 2 } },
    ],
  },
];

// Duplicate to reach 15 total questions
const questions = [...baseQuestions];
while (questions.length < 15) {
  const remaining = 15 - questions.length;
  questions.push(...baseQuestions.slice(0, Math.min(baseQuestions.length, remaining)));
}

// ---------------- IMAGE HELPER ----------------
function imageHTML(src, alt) {
  return `<img src="${src}" alt="${alt}" loading="lazy" />`;
}

// IMPORTANT: images are expected under /images/
const IMG = (name) => `./images/${name}`;

// ---------------- IMAGE ROUNDS ----------------
const imageRounds = [
  {
    prompt: "Pick the place you'd rather be:",
    options: [
      { media: imageHTML(IMG("a-glasshouse.jpg"), "glasshouse"), t: { calm: 2, order: 1 } },
      { media: imageHTML(IMG("b-neon.jpg"), "neon"), t: { bold: 1, calm: -1, order: -1 } },
    ],
  },
  {
    prompt: "Which feels more like your mind?",
    options: [
      { media: imageHTML(IMG("c-library.jpg"), "library"), t: { curious: 2, order: 1 } },
      { media: imageHTML(IMG("d-ocean.jpg"), "ocean"), t: { calm: 1, bold: 1 } },
    ],
  },
  {
    prompt: "Your friend vibe?",
    options: [
      { media: imageHTML(IMG("e-campfire.jpg"), "campfire"), t: { social: 2, warm: 2 } },
      { media: imageHTML(IMG("f-summit.jpg"), "summit"), t: { social: -2, bold: 1 } },
    ],
  },
  {
    prompt: "What feels satisfying?",
    options: [
      { media: imageHTML(IMG("g-clockwork.jpg"), "clockwork"), t: { order: 2 } },
      { media: imageHTML(IMG("h-garden.jpg"), "garden"), t: { order: -2, curious: 2 } },
    ],
  },
  {
    prompt: "Your protective instinct?",
    options: [
      { media: imageHTML(IMG("i-shield.jpg"), "shield"), t: { bold: 1, order: 2 } },
      { media: imageHTML(IMG("j-soft.jpg"), "soft"), t: { warm: 2, calm: 2 } },
    ],
  },
];

// ---------------- DOM ----------------
const app = document.getElementById("app");
let qIndex = 0;
let iIndex = 0;
let qPicks = [];
let iPicks = [];

function renderQuestion() {
  const q = questions[qIndex];
  app.innerHTML = `
    <h2>${q.text}</h2>
    <div class="btn-row">
      ${q.answers
        .map(
          (a, i) => `<button class="btn" onclick="pickQ(${i})">${a.label}</button>`
        )
        .join("")}
    </div>
  `;
}

function pickQ(i) {
  qPicks[qIndex] = i;
  if (qIndex < questions.length - 1) {
    qIndex++;
    renderQuestion();
  } else {
    renderImage();
  }
}

function renderImage() {
  const r = imageRounds[iIndex];
  app.innerHTML = `
    <h2>${r.prompt}</h2>
    <div class="img-grid">
      ${r.options
        .map(
          (o, i) => `
            <button class="img-card" onclick="pickI(${i})" aria-label="Pick option ${i + 1}">
              ${o.media}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function pickI(i) {
  iPicks[iIndex] = i;
  if (iIndex < imageRounds.length - 1) {
    iIndex++;
    renderImage();
  } else {
    renderResult();
  }
}

function renderResult() {
  const traits = emptyTraitVector();

  // Safe adds (won't crash if something is missing)
  questions.forEach((q, qi) => {
    const pick = qPicks[qi];
    if (pick != null) addTraits(traits, q.answers[pick].t);
  });
  imageRounds.forEach((r, ri) => {
    const pick = iPicks[ri];
    if (pick != null) addTraits(traits, r.options[pick].t);
  });

  // Find closest animal profile
  let best = null;
  let bestScore = -Infinity;

  Object.entries(animals).forEach(([name, a]) => {
    let score = 0;
    TRAITS.forEach((t) => {
      score -= Math.abs((traits[t] || 0) - (a.profile[t] || 0));
    });
    if (score > bestScore) {
      bestScore = score;
      best = name;
    }
  });

  const result = animals[best];
  app.innerHTML = `
    <h1>${result.emoji} ${best}</h1>
    <p>${result.blurb}</p>
    <button class="btn" onclick="location.reload()">Retake</button>
  `;
}

// Expose for inline onclick handlers
window.pickQ = pickQ;
window.pickI = pickI;

renderQuestion();
