<template>
  <div>
    <q-btn
      flat
      dense
      color="gray"
      class="tw-absolute tw-right-0 tw-bottom-0 tw-z-10"
      icon="open_in_full"
      size="sm"
      @click="isOpen = !isOpen"
    />
    <q-dialog
      v-model="isOpen"
      seamless
    >
      <q-card
        class="tw-w-screen"
      >
        <q-card-section class="row items-center q-pb-none q-pt-sm">
          <div>
            Preview
          </div>
          <q-space />
          <q-btn
            v-close-popup
            size="sm"
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-card-section
          class="tw-w-full"
        >
          <q-img
            fit="contain"
            class="tw-h-full tw-w-full tw-cursor-pointer"
            :src="src"
          >
            <template #error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Fail to load
              </div>
            </template>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PopupMainCardDialog',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const props = defineProps({
  src: {
    type: String,

  }
})
</script>
