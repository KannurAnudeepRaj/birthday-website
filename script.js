// ----- CONFIG -----
const password = "I love you Mirru";
const pdfPath = "gift/birthday-gift.pdf";

// Array of images (20 in each section, filenames: Image(1).jpg ... Image(40).jpg)
const images1 = Array.from({ length: 20 }, (_, i) => `images/Image(${i + 1}).jpg`);
const images2 = Array.from({ length: 20 }, (_, i) => `images/Image(${i + 21}).jpg`);

// Fisher-Yates shuffle for full randomness
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function displayImages(sectionId, images) {
  const container = document.getElementById(sectionId);
  const shuffled = shuffleArray(images);
  shuffled.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('gallery-img');
    img.alt = "Devangi photo";
    // Fade-in with random delay
    const delay = 130 * idx + Math.floor(Math.random() * 100); // in ms
    img.style.setProperty('--delay', `${delay}ms`);
    // Drift animation with random rotate and stagger
    const rot = (Math.random() * 7 - 4).toFixed(2); // -4deg to +3deg
    img.style.setProperty('--rot', `${rot}deg`);
    img.style.animation = `fadeInDrift 1.2s cubic-bezier(.44,.16,.46,1.19) ${delay}ms forwards, floatGallery ${5.6 + Math.random()*2.5}s ${0.8 + Math.random()*2.5}s infinite ease-in-out`;
    container.appendChild(img);
  });
}

// Display photo galleries after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  displayImages('photos-1', images1);
  displayImages('photos-2', images2);
});

// PASSWORD/SECRET SURPRISE LOGIC
document.getElementById('unlock-btn').addEventListener('click', function() {
  const input = document.getElementById('password-input').value.trim();
  const msg = document.getElementById('unlock-message');
  msg.textContent = "";
  if (input === password) {
    msg.style.color = '#198754'; // green
    msg.textContent = "Password correct! Your gift will download now…";
    setTimeout(() => {
      window.location.href = pdfPath;
    }, 1200);
  } else {
    msg.style.color = '#B22222'; // red
    msg.textContent = "Sorry, that password is incorrect.";
  }
});

document.getElementById('password-input').addEventListener('keydown', function(e) {
  if (e.key === "Enter") {
    document.getElementById('unlock-btn').click();
  }
});
