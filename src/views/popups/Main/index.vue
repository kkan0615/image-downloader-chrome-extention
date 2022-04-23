<template>
  <q-page
    padding
  >
    <q-checkbox
      :model-value="isCheckAll"
      dense
      label="Check all"
      @click="onClickCheckAllCheckBox"
    />
    <q-separator
      class="q-my-sm"
    />
    <div
      class="tw-grid tw-grid-cols-4 tw-gap-2"
    >
      <div
        v-for="(imgEl, index) in imgElList"
        :key="`img-${index}`"
        class="tw-border tw-relative"
      >
        <!--        <div-->
        <!--          class="tw-absolute tw-w-full tw-h-20 tw-z-10 tw-bg-gray-500"-->
        <!--        />-->
        <q-checkbox
          v-model="imgEl.isCheck"
          size="sm"
          dense
          class="tw-absolute tw-left-0 tw-top-0 tw-z-10"
        />
        <q-img
          class="tw-h-20 tw-w-full tw-cursor-pointer"
          :src="imgEl.src"
          @click="() => imgEl.isCheck = !imgEl.isCheck"
        />
        <q-btn
          flat
          dense
          color="gray"
          class="tw-absolute tw-right-0 tw-bottom-0 tw-z-10"
          icon="open_in_full"
          size="sm"
        />
      </div>
    </div>
    <q-btn
      :disable="!isCheckAll"
      class="tw-w-full q-mt-sm"
      color="primary"
      label="save"
      @click="onClickSaveBtn"
    />
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'PopupMain',
}
</script>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const imgElList = ref<{ src: string; isCheck: boolean }[]>([])

const isCheckAll = computed(() => imgElList.value.every(imgEl => imgEl.isCheck))

onMounted(async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const tab = tabs[0]

  if (tab && tab.id) {
    const scriptResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: () => {
        const imgElList = Array.from(document.body.getElementsByTagName('img'))
        let result: string[] = []
        imgElList.map(imgEl => {
          console.log(imgEl.src)
          result.push(imgEl.src)
        })
        return result
      },
    })
    imgElList.value = scriptResult[0].result
      .filter((result: string) => !!result)
      .map((result: string) => {
        return {
          src: result,
          isCheck: true,
        }
      })
  }
})

const onClickCheckAllCheckBox = () => {
  imgElList.value = imgElList.value.map(imgEl => {
    return {
      src: imgEl.src,
      isCheck: !isCheckAll.value,
    }
  })
}

const onClickSaveBtn = () => {
  imgElList.value.map((imgEl, index) => {
    if (imgEl.isCheck) {
      const fileName = 'download' + index
      const el = document.createElement('a')
      el.setAttribute('href', imgEl.src)
      el.setAttribute('download', fileName)
      document.body.appendChild(el)
      el.click()
      el.remove()
    }
  })
}
</script>
