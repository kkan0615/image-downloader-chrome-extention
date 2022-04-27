<template>
  <q-layout
    view="lHh LpR lFf"
    class="shadow-2 rounded-borders tw-w-96"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
export default {
  name: 'PopupMain',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
<style
  lang="scss"
>
.popup {
  width: 400px;
  height: 600px;
}
</style>
