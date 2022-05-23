class Tamagotchi {
	constructor() {
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
			this.checkGameOver();
		}, HUNGER_INTERVAL);

		this.boredomTimer = setInterval(() => {
			this.incrementStat('boredom');
			this.renderBoredom();
			this.checkGameOver();
		}, BOREDOM_INTERVAL);

		this.startSleepinessTimer();
	}

	startSleepinessTimer() {
		this.sleepinessTimer = setInterval(() => {
			this.incrementStat('sleepiness');
			this.renderSleepiness();
			this.checkGameOver();
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

	checkGameOver() {
		if (this.sleepiness >= 20 || this.hunger >= 20 || this.boredom >= 20) {
			// clear stats intervals
			clearInterval(this.ageTimer);
			clearInterval(this.hungerTimer);
			clearInterval(this.boredomTimer);
			clearInterval(this.sleepinessTimer);
			// reset timers
			this.ageTimer = null;
			this.hungerTimer = null;
			this.boredomTimer = null;
			this.sleepinessTimer = null;
			// reset game stats and update
			this.sleepiness = 0;
			this.renderSleepiness();
			this.hunger = 0;
			this.renderHunger();
			this.boredom = 0;
			this.renderBoredom();
			this.age = 0;
			this.renderAge();
			// call controller to update views
			handleGameOver();
		}
	}
}
