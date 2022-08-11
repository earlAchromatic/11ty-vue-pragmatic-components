<template>
  <h1 @click="clicked">IM A VUE COMPONENT</h1>
  <button @click="clicked">click</button>
  <slot></slot>
  <div v-show="clicker">
    <AsyncComp> World </AsyncComp>
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
      }, 5000);
    });
  },
  loadingComponent: Loading,
  delay: 400,
});

const clicker = ref(true);

const clicked = () => {
  clicker.value = true;
};
</script>