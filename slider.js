// --- елементи
const cards = [...document.querySelectorAll('.card')];
const btnPrev = document.querySelector('.arrow.left');
const btnNext = document.querySelector('.arrow.right');
const dotElems = [...document.querySelectorAll('.dot')];

// індекс позиції картинок: 0 -> (1-2-3), 1 -> (2-3-1), 2 -> (3-1-2)
let pos = 0;

function applyPositions() {
    cards.forEach(c => c.classList.remove('left', 'center', 'right'));
    cards[(pos + 0) % 3].classList.add('left');
    cards[(pos + 1) % 3].classList.add('center');
    cards[(pos + 2) % 3].classList.add('right');
}

// --- крапочки
const active = document.getElementById('activeBlob');
const ghost = document.getElementById('ghostBlob');

const DOT = 19; const GAP = 16; const STEP = DOT + GAP; const DOTS = 6;
let dot = 0; // 0..5

function xFor(i) { return i * STEP; }

function moveDotsTo(newDot) {
    const prev = dot;
    if (newDot === prev) return;
    const dir = (newDot > prev) ? 1 : -1;
    dot = (newDot + DOTS) % DOTS;

    ghost.style.opacity = '1';
    ghost.style.transform = `translateX(${xFor(prev)}px)`;

    active.classList.remove('stretch-left', 'stretch-right');
    active.classList.add(dir === 1 ? 'stretch-right' : 'stretch-left');

    active.animate(
        [
            { transform: `translateX(${xFor(prev)}px) scaleX(1)` },
            { transform: `translateX(${xFor(prev + (dir > 0 ? 0.35 : -0.35))}px) scaleX(1.25)` },
            { transform: `translateX(${xFor(dot)}px) scaleX(1)` }
        ],
        { duration: 420, easing: 'cubic-bezier(.22,.61,.36,1)' }
    );

    active.style.transform = `translateX(${xFor(dot)}px)`;
    setTimeout(() => { ghost.style.opacity = '0'; ghost.style.transform = `translateX(${xFor(dot)}px)`; }, 420);
}

function moveDots(dir) { moveDotsTo(dot + dir); }

// ініціалізації
function init() {
    applyPositions();
    active.style.transform = `translateX(${xFor(dot)}px)`;
    ghost.style.transform = `translateX(${xFor(dot)}px)`;
}

btnNext.addEventListener('click', () => { pos = (pos + 1) % 3; applyPositions(); moveDots(1); });
btnPrev.addEventListener('click', () => { pos = (pos - 1 + 3) % 3; applyPositions(); moveDots(-1); });

dotElems.forEach((d, i) => {
    d.addEventListener('click', () => {
        moveDotsTo(i);
        pos = i % 3; // синхронізуємо позиції картинок
        applyPositions();
    });
});

init();