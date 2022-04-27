<template>
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'App',
}
</script>
<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Dark mode
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
} else {
// Light mode
  document.documentElement.classList.remove('dark')
}
// Set quasar dark mode
$q.dark.set(window.matchMedia('(prefers-color-scheme: dark)').matches) // or false or "auto"

</script>
<style
    lang="scss"
>
body {
  margin: 0;
}
</style>
