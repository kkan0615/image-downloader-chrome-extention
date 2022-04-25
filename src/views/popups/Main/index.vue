<template>
  <q-page
    padding
  >
    <!-- Check all checkbox -->
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
      <!-- Image card container -->
      <popup-main-image-card
        v-for="(imgEl, index) in imgElList"
        :key="`img-${index}`"
        v-model:is-check="imgEl.isCheck"
        :src="imgEl.src"
        class="tw-border tw-relative"
      />
    </div>
    <!-- Save button -->
    <q-btn
      :disable="!isCheckSome"
      class="tw-w-full q-mt-sm"
      color="primary"
      label="save"
      :loading="isSaveBtnLoading"
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
import { request } from '@/utils/libs/axios'
import PopupMainImageCard from '@/views/popups/Main/components/ImageCard.vue'

const imgElList = ref<{ src: string; isCheck: boolean; fileExtension: string }[]>([])
const isSaveBtnLoading = ref(false)
const errorMsg = ref('')

const isCheckAll = computed(() => imgElList.value.every(imgEl => imgEl.isCheck))
const isCheckSome = computed(() => imgElList.value.some(imgEl => imgEl.isCheck))

onMounted(async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const tab = tabs[0]

  if (tab && tab.id) {
    const scriptResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: () => {
        const imgElList = Array.from(document.body.getElementsByTagName('img'))
        let result: { src: string; fileExtension: string }[] = []
        imgElList.map(async imgEl => {
          /* File extension */
          const splitByPoint = imgEl.src.split('.')
          const fileExtension = imgEl.src.split('.')[splitByPoint.length - 1].split('?')[0]
          /**
            Disallow: check the readme.md
           */
          if (fileExtension !== 'svg'
            && imgEl.width >= 20 && imgEl.height >= 20
          ) {
            result.push({
              src: imgEl.src,
              fileExtension,
            })
          }
        })

        return result
      },
    })
    /* Add to imgElList */
    imgElList.value = scriptResult[0].result
    /* Src is required */
      .filter((result: { src: string; fileExtension: string }) => !!result.src)
    /* Make all the data checked */
      .map((result: { src: string; fileExtension: string }) => {
        return {
          src: result.src,
          isCheck: true,
          fileExtension: result.fileExtension,
        }
      })
  }
})

const onClickCheckAllCheckBox = () => {
  imgElList.value = imgElList.value.map(imgEl => {
    return {
      src: imgEl.src,
      isCheck: !isCheckAll.value,
      fileExtension: imgEl.fileExtension
    }
  })
}

const downloadAsBlob = async (url: string) => {
  try {
    const res = await request.get(url, {
      responseType: 'blob',
    })

    return res.data
  } catch (e) {
    console.error(e)
    errorMsg.value = 'Fail to download'
  }
}

const onClickSaveBtn = async () => {
  try {
    isSaveBtnLoading.value = true
    await Promise.all(imgElList.value.map(async (imgEl, index) => {
      if (imgEl.isCheck) {
        /* Set the image name */
        const fileName = 'download' + index
        const linkEl = document.createElement('a')
        /* Download image and change to blob */
        const resBlob = await downloadAsBlob(imgEl.src)
        const href = window.URL.createObjectURL(resBlob)
        linkEl.setAttribute('href', href)
        linkEl.setAttribute('download', `${fileName}.${imgEl.fileExtension}`)
        document.body.appendChild(linkEl)
        linkEl.click()
        linkEl.remove()
      }
    }))
  } catch (e) {
    console.error(e)
  } finally {
    isSaveBtnLoading.value = false
  }
}
</script>
