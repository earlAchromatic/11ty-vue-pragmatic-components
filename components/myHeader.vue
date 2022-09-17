<template>
  <h1 @click="clicked">IM A RAD VUE COMPONENT</h1>
  <button @click="clicked">click Here to visit</button>
  <slot></slot>
  <div v-show="clicker">
    <AsyncComp> World Away </AsyncComp>
  </div>
</template>

<script setup>
import { ref } from '../node_modules/vue';
import { defineAsyncComponent } from 'vue';
import Loading from './Loading.vue';

const AsyncComp = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./SlottedComp.vue'));
      }, 2000);
    });
  },
  loadingComponent: Loading,
  delay: 100,
});

const clicker = ref(false);

const clicked = () => {
  clicker.value = true;
};
</script>
