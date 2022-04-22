<template>
  <q-page
    padding
  >
    <q-btn
      color="primary"
      label="test"
      @click="onClickTestBtn"
    />
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'PopupMain',
}
</script>
<script setup lang="ts">
const onClickTestBtn = () => {
  // eslint-disable-next-line no-undef
  chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status === 'complete') {
      // eslint-disable-next-line no-undef
      chrome.tabs.executeScript({
        code: 'document.documentElement.innerHTML' // or 'file: "getPagesSource.js"'
      }, function (result) {
        // eslint-disable-next-line no-undef
        if (chrome.runtime.lastError) {
          // eslint-disable-next-line no-undef
          console.error(chrome.runtime.lastError.message)
        } else {
          console.log(result)
        }
      })
    }
  })
}
</script>
