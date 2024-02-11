<script setup lang="ts">

import { formatCurrency } from 'Scripts/currencyHelper';
import type { Game } from 'Types/FeaturedProductTypes';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<Game>();
/**
 * Only show progress once the donationAmount exceeds or is equal to this value
 */
const showProgressThreshold = 500;
/**
 * 0 initially so we can animate it on mount
 */
const donationProgressPercentage = ref(0);

const mounted = ref(false);

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
 * Calculate the progress bar percentage once the component mounts
 */
onMounted(() => {

	requestAnimationFrame(() => {

		mounted.value = true;

		calculateProgressPercentage();
	});
})

/** Watch these values and re-calculate the progress bar percentage once they update */
watch(() => [
	parsedProps.value.donationAmount,
	parsedProps.value.donationGoal,
], () => {

	calculateProgressPercentage();
});


</script>

<template>
	<article :class="mounted ? 'show' : 'hide'">
		<div class="progress-wrapper" :class="[parsedProps.showProgress ? 'show' : 'hide']">
			<progress :value="donationProgressPercentage" max="100">
			</progress>
		</div>
		<div class="fp">
			<div class="fp-contents">
				<span>
					<template v-if="parsedProps.showProgress">
						<p v-if="parsedProps.hasReachedGoal">
							<em> {{ formatCurrency(parsedProps.donationAmount) }} </em> opgehaald
						</p>
						<p v-if="!parsedProps.hasReachedGoal">
							<em> {{ formatCurrency(parsedProps.donationAmount) }} </em> van {{
								formatCurrency(parsedProps.donationGoal) }}
						</p>
					</template>
				</span>
				<p class="txt-grow">
					<span>
						<em>{{ parsedProps.firstWord }}</em> {{ parsedProps.otherWords.join(" ") }}
					</span>
				</p>
			</div>
			<a :href="props.url">
				Speel mee vanaf {{ formatCurrency(parsedProps.ticketPrice) }}
			</a>
		</div>
	</article>
</template>

<style scoped>
article {
	transition: var(--main-transition);
	min-height: 480px;
	max-height: 580px;
	min-width: 300px;
	max-width: 500px;
	height: 100%;
	width: 100%;
}

article:hover .txt-grow {
	transform: translateY(-48px);
}

.txt-grow {
	display: flex;
	flex-grow: 1;
	transition: var(--main-transition);
	align-items: flex-end;
}

article:hover a {
	transform: translateY(-48px);
}


.fp {
	background-image: url("Assets/img/card_background.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-color: rgba(0, 0, 0, .2);
	overflow: hidden;
	transition: var(--main-transition);
	height: 580px;
}


.fp-contents {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.show {
	opacity: 1;
	transition: var(--main-transition);
	transition-delay: 500ms;
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
	font-size: 24px;
	color: #fff;
	font-style: italic;
	font-weight: 900;
	line-height: 25.2px;
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
	transform: translateY(0%);
}

.progress-wrapper {
	overflow: hidden;
	position: relative;
	top: 8px;
}


@media (max-width: 600px) {

	article:hover .txt-grow {
		transform: translateY(0);
	}

	.txt-grow {
		align-items: center;
	}

	a {
		transform: translateY(-48px);
	}
}
</style>

