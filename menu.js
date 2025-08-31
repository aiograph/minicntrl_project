const menuBtn = document.getElementById('menuBtn');
const burgerMenu = document.getElementById('burgerMenu');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');
});