// ----- CONFIG -----
const password = "I love you GUPPI";
const pdfPath = "gift/Devangi’s Star Certificate.pdf";

// Image lists (adjust counts/paths to match your folder)
const images1 = Array.from({ length: 20 }, (_, i) => `images/Image(${i + 1}).jpg`);
const images2 = Array.from({ length: 20 }, (_, i) => `images/Image(${i + 21}).jpg`);

// ----- UTILITIES -----
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ----- GALLERY RENDERING -----
// Renders a set of images into a container, with staggered delay for CSS fade-in
function displayImages(sectionId, images) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  const shuffled = shuffleArray(images);
  container.innerHTML = "";
  shuffled.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "gallery-img";
    img.alt = "Photo";
    const delay = 120 * idx + Math.floor(Math.random() * 120);
    img.style.setProperty("--delay", `${delay}ms`);
    container.appendChild(img);
  });
}

// ----- OPTIONAL: PERIODIC RESHUFFLE (swap all tiles every N seconds) -----
function reshuffleGrid(sectionId, images, intervalMs = 7000) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  let pool = shuffleArray(images);

  function swapAll() {
    const tiles = container.querySelectorAll(".gallery-img");
    if (!tiles.length) return;

    if (pool.length < tiles.length) pool = shuffleArray(images);
    const next = pool.splice(0, tiles.length);

    tiles.forEach((img, i) => {
      img.style.transition = "opacity 260ms ease";
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = next[i];
        img.style.opacity = "1";
      }, 200);
    });
  }

  return setInterval(swapAll, intervalMs);
}

// ----- OPTIONAL: RANDOM SINGLE TILE SWAP (drip-feed motion) -----
function randomSwap(sectionId, images, intervalMs = 1800) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  let pool = shuffleArray(images);

  function swapOne() {
    const tiles = container.querySelectorAll(".gallery-img");
    if (!tiles.length) return;

    if (!pool.length) pool = shuffleArray(images);
    const idx = Math.floor(Math.random() * tiles.length);
    const img = tiles[idx];
    const next = pool.pop();

    img.style.transition = "opacity 220ms ease";
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = next;
      img.style.opacity = "1";
    }, 180);
  }

  return setInterval(swapOne, intervalMs);
}

// ----- SURPRISE: PASSWORD LOGIC -----
function setupPassword() {
  const input = document.getElementById("password-input");
  const btn = document.getElementById("unlock-btn");
  const msg = document.getElementById("unlock-message");
  if (!input || !btn || !msg) return;

  function tryUnlock() {
    const val = (input.value || "").trim();
    if (val === password) {
      msg.style.color = "#111111";
      msg.textContent = "Password correct! Your gift will download now…";
      setTimeout(() => {
        window.location.href = pdfPath;
      }, 1000);
    } else {
      msg.style.color = "#111111";
      msg.textContent = "Sorry, that password is incorrect.";
    }
  }

  btn.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
}

// ----- INIT -----
document.addEventListener("DOMContentLoaded", () => {
  // Initial grids
  displayImages("photos1", images1);
  displayImages("photos2", images2);

  // Choose ONE of the behaviors below:
  // A) Periodic full reshuffle
  // const t1 = reshuffleGrid("photos1", images1, 7000);
  // const t2 = reshuffleGrid("photos2", images2, 7000);

  // B) Random single-tile swap (more subtle)
  const r1 = randomSwap("photos1", images1, 1800);
  const r2 = randomSwap("photos2", images2, 1800);

  // Password handler
  setupPassword();
});
