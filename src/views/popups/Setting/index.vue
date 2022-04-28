<template>
  <q-form
    @submit="onSubmitForm"
  >
    <q-page
      padding
    >
      <div
        class="tw-flex tw-items-center"
      >
        <div>
          Setting
        </div>
        <!-- Back to popup main page -->
        <q-btn
          class="tw-ml-auto"
          dense
          round
          flat
          icon="arrow_back"
          :to="{ name: 'PopupMain' }"
        />
      </div>
      <q-separator
        class="q-my-sm"
      />
      <!-- Content -->
      <q-toggle
        v-model="saveAs"
        label="Prompt before save"
      />
    </q-page>
    <q-footer>
      <q-card
        square
      >
        <q-card-section
          class="q-pa-sm"
        >
          <!-- Save button -->
          <q-btn
            class="tw-w-full"
            color="primary"
            type="submit"
            :label="i18nSaveBtn"
            :loading="isSaveBtnLoading"
          />
        </q-card-section>
      </q-card>
    </q-footer>
  </q-form>
</template>
<script lang="ts">
export default {
  name: 'PopupSetting',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()

const { fileSetting } = storeToRefs(settingStore)
const saveAs = ref(false)
const isSaveBtnLoading = ref(false)

/* I18n (localizing) */
const i18nSaveBtn = computed(() => chrome.i18n.getMessage('saveBtn'))

const initData = () => {
  saveAs.value = fileSetting.value.saveAs
}

const onSubmitForm = () => {
  try {
    isSaveBtnLoading.value = true
    /* Set the file setting */
    settingStore.setFileSetting({
      saveAs: saveAs.value
    })
  } catch (e) {
    console.error(e)
  } finally {
    isSaveBtnLoading.value = false
  }
}

initData()
</script>
