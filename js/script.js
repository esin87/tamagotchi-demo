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
// pet buttons
const feedBtn = document.querySelector('button.feed');
const playBtn = document.querySelector('button.play');
const sleepBtn = document.querySelector('button.sleep');
// modal
const modalEl = document.querySelector('.modal');
const modalBtn = document.querySelector('#js-modal-btn');

/*----- event listeners -----*/
modalBtn.addEventListener('click', handleModalClick);

/*----- functions -----*/
function handleModalClick(event) {
	modalEl.style.opacity = '0%';
	initGame();
	modalBtn.removeEventListener('click', handleModalClick);
}
function handlePlay(event) {
	party.confetti(petImageEl, {
		count: party.variation.range(20, 40),
	});
	pet.decrementStat('boredom');
	pet.renderBoredom();
}

function toggleSleepAnimation(toggle) {
	if (toggle === 'on') {
		zContainer.classList.remove('hide');
	} else if (toggle === 'off') {
		zContainer.classList.add('hide');
	}
}

function handleSleep(event) {
	if (pet.sleepiness === 0) return;
	// while sleeping clear timer
	clearInterval(pet.sleepinessTimer);
	// while sleeping, other buttons can't be clicked
	sleepBtn.removeEventListener('click', handleSleep);
	feedBtn.removeEventListener('click', handleFeed);
	playBtn.removeEventListener('click', handlePlay);
	toggleSleepAnimation('on');
	let currentVal = pet.sleepiness;
	for (let i = 0; i <= currentVal; i++) {
		setTimeout(() => {
			pet.decrementStat('sleepiness');
			pet.renderSleepiness();
			if (pet.sleepiness === 0) {
				toggleSleepAnimation('off');
				// add back button functionality
				feedBtn.addEventListener('click', handleFeed);
				sleepBtn.addEventListener('click', handleSleep);
				playBtn.addEventListener('click', handlePlay);
				// start timer again
				pet.startSleepinessTimer();
			}
		}, i * 1000);
	}
}

function handleFeed(event) {
	pet.decrementStat('hunger');
	pet.renderHunger();

	party.scene.current.createEmitter({
		emitterOptions: {
			loops: 1,
			useGravity: false,
			modules: [
				new party.ModuleBuilder()
					.drive('size')
					.by((t) => 0.5 + 0.3 * (Math.cos(t * 10) + 1))
					.build(),
				new party.ModuleBuilder()
					.drive('rotation')
					.by((t) => new party.Vector(0, 0, 100).scale(t))
					.relative()
					.build(),
			],
		},
		emissionOptions: {
			rate: 0,
			bursts: [{ time: 0, count: party.variation.skew(20, 10) }],
			sourceSampler: party.sources.dynamicSource(petImageEl),
			angle: party.variation.range(0, 360),
			initialSpeed: 400,
			initialColor: party.variation.gradientSample(
				party.Gradient.simple(
					party.Color.fromHex('#ffa68d'),
					party.Color.fromHex('#fd3a84')
				)
			),
		},
		rendererOptions: {
			shapeFactory: heartShape,
			applyLighting: undefined,
		},
	});
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
		modalEl.remove();
		pet.start();
		/*----- event listeners -----*/
		feedBtn.addEventListener('click', handleFeed);
		sleepBtn.addEventListener('click', handleSleep);
		playBtn.addEventListener('click', handlePlay);
	}, EGG_DURATION);
}
