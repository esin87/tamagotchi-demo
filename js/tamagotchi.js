class Tamagotchi {
	constructor(name) {
		this.name = name;
		this.age = 0;
		this.sleepiness = 0;
		this.hunger = 0;
		this.boredom = 0;
		this.ageTimer = null;
		this.hungerTimer = null;
		this.boredomTimer = null;
		this.sleepinessTimer = null;
	}

	incrementStat(stat) {
		this[stat]++;
	}

	decrementStat(stat) {
		if (this[stat] > 0) {
			this[stat]--;
		}
	}

	start() {
		tamagotchiEl.appendChild(petImageEl);
		this.updatePetImage();
		this.ageTimer = setInterval(() => {
			this.incrementStat('age');
			this.renderAge();
			this.updatePetImage();
		}, AGE_INTERVAL);

		this.hungerTimer = setInterval(() => {
			this.incrementStat('hunger');
			this.renderHunger();
		}, HUNGER_INTERVAL);

		this.boredomHunger = setInterval(() => {
			this.incrementStat('boredom');
			this.renderBoredom();
		}, BOREDOM_INTERVAL);

		this.startSleepinessTimer();
	}

	startSleepinessTimer() {
		this.sleepinessTimer = setInterval(() => {
			this.incrementStat('sleepiness');
			this.renderSleepiness();
		}, SLEEPINESS_INTERVAL);
	}

	renderBoredom() {
		boredomEl.innerText = this.boredom;
	}

	renderHunger() {
		hungerEl.innerText = this.hunger;
	}

	renderAge() {
		ageEl.innerText = this.age;
	}

	renderSleepiness() {
		sleepinessEl.innerText = this.sleepiness;
	}

	updatePetImage() {
		if (this.age <= 5) {
			petImageEl.setAttribute('src', BABY_IMG);
		} else if (this.age <= 12) {
			petImageEl.setAttribute('src', CHILD_IMG);
		} else if (this.age <= 19) {
			petImageEl.setAttribute('src', TEEN_IMG);
		} else {
			petImageEl.setAttribute('src', ADULT_IMG);
		}
	}
}
