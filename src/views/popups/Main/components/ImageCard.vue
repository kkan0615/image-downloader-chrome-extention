<template>
  <div>
    <!-- Checkbox -->
    <q-checkbox
      :model-value="isCheck"
      size="sm"
      dense
      class="tw-absolute tw-left-0 tw-top-0 tw-z-10"
      @update:model-value="updateIsCheck"
    />
    <!-- Image -->
    <q-img
      class="tw-h-20 tw-w-full tw-cursor-pointer"
      :src="src"
      @click="() => updateIsCheck(!isCheck)"
    >
      <template #error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Fail to load
        </div>
      </template>
    </q-img>
    <!-- Expand button -->
    <popup-main-card-dialog
      :src="src"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'PopupMainImageCard',
}
</script>
<script setup lang="ts">
import PopupMainCardDialog from '@/views/popups/Main/components/CardDialog.vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
    required: true,
  },
  isCheck: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const emits = defineEmits(['update:src', 'update:isCheck'])

const updateIsCheck = (bool: boolean) => {
  emits('update:isCheck', bool)
}
</script>
