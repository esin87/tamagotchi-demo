/*----- constants -----*/
const EGG_DURATION = 5000;
const SLEEPINESS_INTERVAL = 6000;
const AGE_INTERVAL = 5000;
const HUNGER_INTERVAL = 5000;
const BOREDOM_INTERVAL = 3000;

const BABY_IMG = './assets/baby.webp';
const CHILD_IMG = './assets/child.webp';
const TEEN_IMG = './assets/teen.webp';
const ADULT_IMG = './assets/adult.webp';

/*----- app's state (variables) -----*/
let pet;

/*----- cached element references -----*/
// pet display
const tamagotchiWrapperEl = document.querySelector('.tamagotchi-wrapper');
const tamagotchiEl = document.querySelector('#tamagotchi');
const petImageEl = document.createElement('img');
// stat displays
const statsContainerEl = document.querySelector('.life-stats');
const ageEl = document.querySelector('.age span');
const hungerEl = document.querySelector('.hunger span');
const boredomEl = document.querySelector('.boredom span');
const sleepinessEl = document.querySelector('.sleepiness span');
const zContainer = document.querySelector('.z-container');
// buttons
const feedBtn = document.querySelector('button.feed');
const playBtn = document.querySelector('button.play');
const sleepBtn = document.querySelector('button.sleep');

/*----- event listeners -----*/
feedBtn.addEventListener('click', handleFeed);
sleepBtn.addEventListener('click', handleSleep);
playBtn.addEventListener('click', handlePlay);

/*----- functions -----*/
function handlePlay(event) {
	party.confetti(petImageEl, {
		count: party.variation.range(20, 40),
	});
	pet.decrementStat('boredom');
	pet.renderBoredom();
}

function toggleSleepAnimation() {
	zContainer.classList.toggle('hide');
}

function handleSleep(event) {
	// while sleeping, other buttons can't be clicked
	sleepBtn.removeEventListener('click', handleSleep);
	feedBtn.removeEventListener('click', handleFeed);
	playBtn.removeEventListener('click', handlePlay);
	toggleSleepAnimation();
	let currentVal = pet.sleepiness;
	for (let i = 0; i <= currentVal; i++) {
		setTimeout(() => {
			pet.decrementStat('sleepiness');
			pet.renderSleepiness();
			if (pet.sleepiness === 0) {
				toggleSleepAnimation();
				// add back button functionality
				feedBtn.addEventListener('click', handleFeed);
				sleepBtn.addEventListener('click', handleSleep);
				playBtn.addEventListener('click', handlePlay);
			}
		}, i * 1000);
	}
}

function handleFeed(event) {
	pet.decrementStat('hunger');
	pet.renderHunger();
}

function initEgg() {
	const egg = document.createElement('div');
	egg.setAttribute('class', 'egg');
	const spot = document.createElement('div');
	spot.setAttribute('class', 'spots');
	egg.appendChild(spot);
	tamagotchiEl.appendChild(egg);
}

function clearEgg() {
	tamagotchiEl.innerHTML = '';
}
function initGame() {
	pet = new Tamagotchi('Esinator');
	initEgg();
	setTimeout(() => {
		clearEgg();
		pet.start();
	}, EGG_DURATION);
}

initGame();
