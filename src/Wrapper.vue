<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue';
import { fetchGames } from 'Scripts/api';
import FeaturedProductList from 'Components/FeaturedProducts/FeaturedProductList.vue';
import type { ReactiveEffect } from 'vue';
import type { Game } from 'Types/FeaturedProductTypes';

const games = reactive<ReactiveEffect<Array<Game>>>([]);

onMounted(async () => {

  const { data } = await fetchGames();

  games.value = data.games;
})

</script>

<template>
  <div id="wrapper">
    <FeaturedProductList :games=games />
  </div>
</template>

<style scoped>
  #wrapper {
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
</style>

