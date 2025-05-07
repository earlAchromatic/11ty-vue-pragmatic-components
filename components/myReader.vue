<template>
  <h1 @click="clicked">IM A VUE COMPONENT</h1>
  <button @click="clicked">click</button>
  <slot></slot>
  <div v-show="clicker">
    <AsyncComp> Helloo World </AsyncComp>
  </div>
</template>

<script setup>

const AsyncComp = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./SlottedComp.vue'));
      }, 4000);
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
