<script setup lang="ts">

import { computed } from 'vue';

interface Props {
	game: Record<string, any>;
}

const { game } = defineProps<Props>();

const {
	donationAmount,
	donationGoal,
	ticketPrice,
	emailDescription,
} = game;

const [firstWord, ...otherWords] = emailDescription.split(" ");

const hasReachedGoal = (parseFloat(donationAmount) === parseFloat(donationGoal));

const showProgress = true || (parseFloat(donationAmount) >= 500);

const donationProgressPercentage = computed(() => {

	if (parseFloat(donationGoal) === 0) {

		return 0;
	}

	return ((parseFloat(donationAmount) / parseFloat(donationGoal)) * 100) >> 0;
});

const formatCurrency = (value: number = 0) => {

	const numberFormat = Intl.NumberFormat('nl-NL', {
		currency: 'EUR',
		style: 'currency',
		/** Only show fractions if value has decimals */
		maximumFractionDigits: (value % 1 === 0) ? 0 : 2,
		currencyDisplay: 'narrowSymbol',
	});

	return numberFormat.format(value);
}

</script>

<template>
	<article>
		<div v-if="showProgress" class="progress-bar-wrapper">
			<progress :value="donationProgressPercentage" max="100">
			</progress>
		</div>
		<div class="featured-product">
			<div class="fp-contents">
				<span>
					<p v-if="showProgress && hasReachedGoal">
						<em> {{ formatCurrency(donationGoal) }} </em> opgehaald
					</p>
					<p v-if="showProgress && !hasReachedGoal">
						<em> {{ formatCurrency(donationAmount) }} </em> van {{ formatCurrency(donationGoal) }}
					</p>
				</span>
				<p class="txt-grow">
					<span>
						<em>{{ firstWord }}</em> {{ otherWords.join(" ") }}
					</span>
				</p>
			</div>

			<a :href="game.url">
				Speel mee vanaf {{ formatCurrency(ticketPrice) }}
			</a>
		</div>

	</article>
</template>

<style scoped>

article {

	max-width: 500px;
}

article:hover .txt-grow {
	transform: translateY(-48px);
}

.txt-grow {
	display: flex;
	flex-grow: 1;
	transition: 250ms all;
	align-items: flex-end;
}

article:hover a {
	transform: translateY(-48px);
}

.fp-contents {
	height: 100%;
	display: flex;
	flex-direction: column;
}

progress {
	height: 28px;
	width: calc(100% + 8px);
	appearance: none;
	position: relative;
	left: -4px;
}

progress[value]::-webkit-progress-bar {
	background-color: transparent;
}

progress[value]::-webkit-progress-value {
	background-color: var(--secondary-color);
	transform: skewX(-15deg);
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
}

.featured-product {
	background-image: url("Assets/img/card_background.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-color: rgba(0, 0, 0, .2);
	overflow: hidden;
	height: 580px;
}

a {
	transition: 250ms all;
	position: relative;
	transform: translateY(0%);
}

.progress-bar-wrapper {
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

