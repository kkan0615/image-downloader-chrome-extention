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

</script>
<style
  lang="scss"
>
$popup-max-height: 600px;
$popup-width: 400px;

.popup {
  width: $popup-width;
  max-height: $popup-max-height;
}
</style>
