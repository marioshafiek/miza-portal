<template>
  <Dialog
    v-model:visible="open"
    :modal="true"
    :closable="false"
    :draggable="false"
    :style="{ width: '380px', maxWidth: '95vw' }"
    content-style="padding:0"
    class="mz-dialog"
  >
    <template #header><span /></template>

    <div class="tw-flex tw-flex-col tw-items-center tw-text-center tw-px-7 tw-pt-8 tw-pb-5">
      <div class="tw-w-[52px] tw-h-[52px] tw-rounded-[14px] tw-bg-red-50 tw-border tw-border-red-200 tw-flex tw-items-center tw-justify-center tw-mb-4">
        <i class="pi pi-trash" style="font-size:20px;color:#ef4444" />
      </div>
      <h3 class="tw-text-[15px] tw-font-bold tw-text-[#111] tw-mb-2">{{ title }}</h3>
      <p class="tw-text-[13.5px] tw-text-gray-500 tw-leading-relaxed">{{ message }}</p>
    </div>

    <template #footer>
      <div class="tw-flex tw-gap-2.5 tw-px-5 tw-pt-4 tw-pb-[22px] tw-border-t tw-border-gray-100">
        <!-- Cancel — outlined, border visible -->
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          size="small"
          class="mz-confirm-cancel tw-flex-1"
          @click="open = false"
        />
        <!-- Delete — filled red, NO border -->
        <Button
          label="Delete"
          severity="danger"
          :loading="loading"
          size="small"
          class="mz-confirm-delete tw-flex-1"
          @click="$emit('confirm')"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title:      { type: String,  default: 'Delete record?' },
  message:    { type: String,  default: 'This action cannot be undone.' },
  loading:    { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'confirm'])
const open = ref(props.modelValue)

watch(() => props.modelValue, (val) => { open.value = val })
watch(open, (val) => emit('update:modelValue', val))
</script>

<style lang="scss">
// Cancel — outlined, border shows
.mz-confirm-cancel.p-button {
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  color: #6b7280 !important;
  background: transparent !important;
  box-shadow: none !important;
  font-size: 13px !important; font-weight: 600 !important;
  &:hover { background: #f3f4f6 !important; color: #111 !important; }
}

// Delete — filled red, NO border
.mz-confirm-delete.p-button {
  background: #ef4444 !important;
  border: none !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  font-size: 13px !important; font-weight: 600 !important;
  &:hover:not(:disabled) { background: #dc2626 !important; }
  &:disabled { opacity: .6; }
}
</style>
