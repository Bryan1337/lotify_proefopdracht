<script setup lang="ts">
import type { ReactiveEffect } from 'vue';
import FeaturedProductItem from './FeaturedProductItem.vue';
import type { Game } from 'Types/FeaturedProductTypes';


interface Props {
	games: ReactiveEffect<Array<Game>>;
}

const props = defineProps<Props>();

const { games } = props;

</script>

<template>
	<FeaturedProductItem v-for="game in games.value" :key="game.id" :game="game" />
</template>

<style scoped>

</style>
