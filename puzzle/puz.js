







// Puzzle configuration
const COLS = 6;
const ROWS = 6;
const TOTAL = COLS * ROWS;
const IMAGE_URL = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0f8a20cef93bacb7f9e79236fdb760fa22ad34ba_vase_of_flowers_2003.38.1.jpg';

// Create pieces
const container = document.getElementById('container');
for (let index = 0; index < TOTAL; index++) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.dataset.index = String(index);

  // Use a single large image and position it per piece so it looks like slices
  piece.style.backgroundImage = `url('${IMAGE_URL}')`;
  piece.style.backgroundSize = `${COLS * 100}% ${ROWS * 100}%`;
  const row = Math.floor(index / COLS);
  const col = index % COLS;
  const posX = (col / (COLS - 1)) * 100;
  const posY = (row / (ROWS - 1)) * 100;
  piece.style.backgroundPosition = `${posX}% ${posY}%`;

  // Faces
  const top = document.createElement('div'); top.classList.add('top', 'side'); piece.appendChild(top);
  const right = document.createElement('div'); right.classList.add('right', 'side'); piece.appendChild(right);
  const botm = document.createElement('div'); botm.classList.add('botm', 'side'); piece.appendChild(botm);
  const left = document.createElement('div'); left.classList.add('left', 'side'); piece.appendChild(left);
  const center = document.createElement('div'); center.classList.add('center'); piece.appendChild(center);

  container.appendChild(piece);
}

// State for each piece: x,y,z,mode
let arr = new Array(TOTAL);

// Helper to get index from event target
function getPieceIndexFromEl(el) {
  const parent = el.parentElement;
  if (!parent) return null;
  const idx = parent.dataset.index;
  return idx == null ? null : Number(idx);
}

// Face click handling
document.querySelectorAll('.side').forEach(side => {
  side.addEventListener('click', (e) => {
    const numP = getPieceIndexFromEl(e.target);
    if (numP == null || !arr[numP]) return;

    const state = arr[numP];
    const pieceEl = e.target.parentElement;

    if (side.classList.contains('left')) {
      if (state.mode === 'vertical') {
        state.y += 180;
      } else {
        state.x += 180;
      }
    }

    if (side.classList.contains('right')) {
      if (state.mode === 'vertical') {
        state.y -= 180;
      } else {
        state.x -= 180;
      }
    }

    if (side.classList.contains('top')) {
      if (state.mode === 'vertical') {
        state.x += 180;
      } else {
        state.y += 180;
      }
    }

    if (side.classList.contains('botm')) {
      if (state.mode === 'vertical') {
        state.x -= 180;
      } else {
        state.y -= 180;
      }
    }

    pieceEl.style.transform = `rotateX(${state.x}deg) rotateY(${state.y}deg) rotateZ(${state.z}deg)`;
  });
});

// Center click toggles z rotation and mode
document.querySelectorAll('.center').forEach(center => {
  center.addEventListener('click', (e) => {
    const numP = getPieceIndexFromEl(e.target);
    if (numP == null || !arr[numP]) return;
    const state = arr[numP];
    state.z += 90;
    state.mode = state.mode === 'vertical' ? 'horiz' : 'vertical';
    e.target.parentElement.style.transform = `rotateX(${state.x}deg) rotateY(${state.y}deg) rotateZ(${state.z}deg)`;
  });
});

// Rotate whole body
let bodyZ = 0;
const rotateBodyEl = document.getElementById('rotateBody');
if (rotateBodyEl) {
  rotateBodyEl.addEventListener('click', () => {
    bodyZ += 90;
    document.body.style.transform = `rotateZ(${bodyZ}deg)`;
  });
}

// Initialize random positions
function randomInitPosition() {
  document.querySelectorAll('.piece').forEach((piece, i) => {
    const randomX = (Math.round(Math.random() * 8) - 4) * 180; // -4..4 * 180
    const randomY = (Math.round(Math.random() * 8) - 4) * 180;
    const randomZ = (Math.round(Math.random() * 8) - 4) * 90;
    piece.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;
    arr[i] = { x: randomX, y: randomY, z: randomZ, mode: (randomZ % 180 === 0) ? 'vertical' : 'horiz' };
  });
}

// Small delay so DOM finishes and CSS computed styles apply
setTimeout(randomInitPosition, 300);

