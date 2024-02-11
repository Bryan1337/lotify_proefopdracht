<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { fetchGames } from 'Scripts/api';
import FeaturedProductItem from 'Components/FeaturedProducts/FeaturedProductItem.vue';
import type { Game } from 'Types/FeaturedProductTypes';

const games = ref<Array<Game>>([]);

onMounted(async () => {

	const { data } = await fetchGames();

	games.value = data.games;
})

const loadingItems = 3;

</script>

<template>
  <div class="fp-wrapper">
	<template v-if="games.length === 0">
		<div v-for="i in loadingItems" :key="i" class="loading-item" >
		</div>
	</template>
	<template v-if="games.length > 0">
		<FeaturedProductItem
			v-for="game in games"
			:key="game.id"
			:id="game.id"
			:donationAmount="game.donationAmount"
			:donationGoal="game.donationGoal"
			:ticketPrice="game.ticketPrice"
			:emailDescription="game.emailDescription"
			:url="game.url"
		/>
	</template>
  </div>
</template>

<style scoped>

.fp-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding: 16px 8px;
	box-sizing: border-box;
	background-color: var(--primary-color);
}

.loading-item {
	min-height: 480px;
	max-height: 580px;
	min-width: 300px;
	max-width: 500px;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0, 0.20);
}
</style>

