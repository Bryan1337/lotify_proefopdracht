<script setup lang="ts">

import { formatCurrency } from 'Scripts/currencyHelper';
import type { Game } from 'Types/FeaturedProductTypes';
import { computed, ref, watch } from 'vue';

const props = defineProps<Game>();

/**
 * Only show progress once the donationAmount exceeds or is equal to this value
 */
const showProgressThreshold = 500;

/**
 * 0 initially so we can animate it on mount
 */
const donationProgressPercentage = ref(0);

const parsedProps = computed(() => {

	const donationAmount = parseFloat(props.donationAmount);

	const donationGoal = parseFloat(props.donationGoal);

	const ticketPrice = parseFloat(props.ticketPrice);

	const splitDescription = props.emailDescription.split(" ");

	return {
		donationAmount,
		donationGoal,
		ticketPrice,
		firstWord: splitDescription[0],
		otherWords: splitDescription.slice(1),
		hasReachedGoal: (donationAmount >= donationGoal),
		showProgress: (donationAmount >= showProgressThreshold),
	};
})

const calculateProgressPercentage = () => {

	donationProgressPercentage.value = ((parsedProps.value.donationAmount / parsedProps.value.donationGoal) * 100) >> 0;
}

/**
 * Watch these values and re-calculate the progress bar percentage once they update
 */
watch(() => [
	parsedProps.value.donationAmount,
	parsedProps.value.donationGoal,
], () => {

	calculateProgressPercentage();
});

const imageLoaded = ref(false);

const onImageLoaded = () => {

	imageLoaded.value = true;
}

</script>

<template>
	<article>
		<div class="progress-wrapper" :class="[parsedProps.showProgress ? 'show' : 'hide']">
			<progress :value="donationProgressPercentage" max="100">
			</progress>
		</div>
		<div class="fp">
			<img src="Assets/img/card_background.jpg" :onload="onImageLoaded" :class="[imageLoaded ? 'show' : 'hide']" />
			<Transition @afterEnter="calculateProgressPercentage">
				<div v-if="imageLoaded" class="fp-contents">
					<span>
						<template v-if="parsedProps.showProgress">
							<p v-if="parsedProps.hasReachedGoal">
								<em> {{ formatCurrency(parsedProps.donationAmount) }} </em> opgehaald
							</p>
							<p v-if="!parsedProps.hasReachedGoal">
								<em> {{ formatCurrency(parsedProps.donationAmount) }} </em> van {{ formatCurrency(parsedProps.donationGoal) }}
							</p>
						</template>
					</span>
					<p class="card-text">
						<span>
							<em>{{ parsedProps.firstWord }}</em> {{ parsedProps.otherWords.join(" ") }}
						</span>
					</p>
					<a :href="props.url">
						Speel mee vanaf {{ formatCurrency(parsedProps.ticketPrice) }}
					</a>
				</div>
			</Transition>
		</div>
	</article>
</template>

<style scoped>
img {
	background-color: rgba(0, 0, 0, .2);
	transition: var(--main-transition);
	object-fit: cover;
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
}

article {
	transition: var(--main-transition);
	min-height: 480px;
	max-height: 580px;
	min-width: 300px;
	max-width: 500px;
	height: 100%;
	width: 100%;
}

article:hover .card-text {
	transform: translateY(0);
}

.card-text {
	display: flex;
	flex-grow: 1;
	transition: var(--main-transition);
	align-items: flex-end;
	transform: translateY(48px);
}

article:hover a {
	transform: translateY(0);
}


.fp {
	position: relative;
	overflow: hidden;
	transition: var(--main-transition);
	height: 580px;
}


.fp-contents {
	transition: var(--main-transition);
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 1;
}

.show {
	opacity: 1;
	transition: var(--main-transition);
}

.hide {
	opacity: 0;
}

progress {
	transition: var(--main-transition);
	height: 28px;
	width: calc(100% + 8px);
	appearance: none;
	position: relative;
	left: -4px;
}

progress::-webkit-progress-value {
	transition: var(--main-transition);
}

progress[value]::-webkit-progress-bar {
	background-color: transparent;
}

progress[value]::-webkit-progress-value {
	background-color: var(--secondary-color);
	transform: skewX(-10deg);
}

em {
	color: var(--secondary-color);
}

p {
	padding: 16px;
	text-transform: uppercase;
	font-family: var(--main-font);
	font-size: 32px;
	color: #fff;
	font-style: italic;
	font-weight: 900;
}

a {
	cursor: pointer;
	font-family: var(--main-font);
	width: 100%;
	border: none;
	font-size: 16px;
	font-style: italic;
	font-weight: 900;
	text-transform: uppercase;
	background-color: var(--secondary-color);
	color: var(--primary-color);
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	transition: var(--main-transition);
	position: relative;
	transform: translateY(100%);
}

.progress-wrapper {
	overflow: hidden;
	position: relative;
	top: 8px;
}


@media (max-width: 600px) {

	article:hover .card-text, .card-text {
		transform: translateY(0);
	}

	.card-text {
		align-items: center;
	}

	p {
		font-size: 24px;
	}

	a {
		transform: translateY(0);
	}
}
</style>

