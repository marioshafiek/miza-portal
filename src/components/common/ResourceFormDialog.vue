<template>
  <Dialog
    v-model:visible="open"
    :modal="true"
    :closable="false"
    :draggable="false"
    :style="{ width, maxWidth: '95vw' }"
    content-style="padding:0"
    class="mz-dialog"
  >
    <!-- Header -->
    <template #header>
      <div class="tw-w-full tw-flex tw-items-start tw-justify-between tw-px-6 tw-pt-[22px] tw-pb-[18px] tw-border-b tw-border-gray-100">
        <div>
          <h3 class="tw-text-[15px] tw-font-bold tw-text-[#111] tw-leading-tight">{{ title }}</h3>
          <p v-if="subtitle" class="tw-text-xs tw-text-gray-400 tw-mt-0.5">{{ subtitle }}</p>
        </div>
        <Button
          icon="pi pi-times"
          text
          rounded
          severity="secondary"
          size="small"
          class="mz-dialog-close-btn"
          @click="close"
        />
      </div>
    </template>

    <!-- Body -->
    <div class="tw-flex tw-flex-col tw-gap-3.5 tw-px-6 tw-py-[22px]">
      <slot :form="form" :errors="errors" />
    </div>

    <!-- Error -->
    <Transition name="mz-fade">
      <div v-if="errorMessage" class="tw-mx-6 tw-mb-4 tw-flex tw-items-center tw-gap-2 tw-px-3.5 tw-py-2.5 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-[10px] tw-text-[13px] tw-text-red-600">
        <i class="pi pi-exclamation-circle" />
        {{ errorMessage }}
      </div>
    </Transition>

    <!-- Footer -->
    <template #footer>
      <div class="tw-flex tw-items-center tw-justify-end tw-gap-2 tw-px-6 tw-pt-3.5 tw-pb-5 tw-border-t tw-border-gray-100 tw-bg-[#fafafa]">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          size="small"
          class="mz-btn-cancel"
          @click="close"
        />
        <Button
          :label="submitLabel"
          :loading="loading"
          size="small"
          class="mz-btn-save"
          @click="submit"
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
  modelValue:   { type: Boolean, default: false },
  title:        { type: String,  required: true },
  subtitle:     { type: String,  default: '' },
  initialForm:  { type: Object,  default: () => ({}) },
  loading:      { type: Boolean, default: false },
  errorMessage: { type: String,  default: '' },
  submitLabel:  { type: String,  default: 'Save' },
  width:        { type: String,  default: '520px' },
})

const emit = defineEmits(['update:modelValue', 'submit', 'close'])

const open   = ref(props.modelValue)
const form   = ref({ ...props.initialForm })
const errors = ref({})

watch(() => props.modelValue, (val) => {
  open.value = val
  if (val) { form.value = { ...props.initialForm }; errors.value = {} }
})
watch(open, (val) => { emit('update:modelValue', val); if (!val) emit('close') })
watch(() => props.initialForm, (val) => { form.value = { ...val } }, { deep: true })

function close()  { open.value = false }
function submit() { emit('submit', { ...form.value }) }
</script>

<style lang="scss">
// ── Dialog shell ─────────────────────────────────────────────────────────────
.mz-dialog.p-dialog {
  border-radius: 16px !important;
  border: 1px solid #e5e7eb !important;
  box-shadow: 0 24px 64px -12px rgba(0,0,0,.16), 0 0 0 1px rgba(0,0,0,.04) !important;
  overflow: hidden;

  .p-dialog-header { padding: 0 !important; background: #fff !important; border-bottom: none !important; width: 100% !important; }
  .p-dialog-content{ padding: 0 !important; background: #fff !important; }
  .p-dialog-footer { padding: 0 !important; background: #fff !important; border-top: none !important; }
}

// Close button — text+rounded, no border
.mz-dialog-close-btn.p-button {
  width: 28px !important; height: 28px !important;
  border: none !important; box-shadow: none !important;
  color: #9ca3af !important; flex-shrink: 0; margin-left: 10px;
  &:hover { background: #f3f4f6 !important; color: #374151 !important; }
  .p-button-icon { font-size: 12px !important; }
}

// Cancel — outlined (border visible, no fill)
.mz-btn-cancel.p-button {
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  color: #6b7280 !important;
  background: transparent !important;
  box-shadow: none !important;
  font-size: 13px !important; font-weight: 600 !important;
  &:hover { background: #f3f4f6 !important; color: #111 !important; }
}

// Save — filled, NO border
.mz-btn-save.p-button {
  background: #d6262c !important;
  border: none !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  font-size: 13px !important; font-weight: 600 !important;
  &:hover:not(:disabled) { background: #b71e23 !important; }
  &:disabled { opacity: .6; }
}

// ── PrimeVue form fields inside dialog ──────────────────────────────────────
.mz-dialog .p-dialog-content {

  // InputText
  .p-inputtext {
    width: 100%;
    font-size: 13.5px !important;
    font-family: var(--font-body) !important;
    border-radius: 9px !important;
    border: 1.5px solid #e5e7eb !important;
    background: #f9fafb !important;
    color: #111 !important;
    padding: 10px 12px !important;
    box-shadow: none !important;
    transition: border-color .15s, background .15s;
    &::placeholder { color: #c4c9d4 !important; }
    &:focus { border-color: #d6262c !important; background: #fff !important; box-shadow: none !important; }
    &.p-invalid { border-color: #ef4444 !important; }
  }

  // Textarea
  .p-textarea {
    width: 100%;
    font-size: 13.5px !important;
    font-family: var(--font-body) !important;
    border-radius: 9px !important;
    border: 1.5px solid #e5e7eb !important;
    background: #f9fafb !important;
    color: #111 !important;
    padding: 10px 12px !important;
    box-shadow: none !important;
    resize: none;
    min-height: 72px;
    &:focus { border-color: #d6262c !important; background: #fff !important; box-shadow: none !important; }
  }

  // Select (Dropdown)
  .p-select {
    width: 100%;
    border-radius: 9px !important;
    border: 1.5px solid #e5e7eb !important;
    background: #f9fafb !important;
    box-shadow: none !important;
    font-size: 13.5px !important;
    &:hover { border-color: #d1d5db !important; }
    &.p-focus { border-color: #d6262c !important; background: #fff !important; box-shadow: none !important; }
    .p-select-label { font-size: 13.5px !important; color: #111 !important; padding: 10px 12px !important; }
  }

  // FloatLabel wrapper
  .p-floatlabel {
    width: 100%;
    label { font-size: 13px !important; color: #9ca3af !important; }
    &:has(.p-inputtext:focus) label,
    &:has(.p-inputtext:not(:placeholder-shown)) label { color: #d6262c !important; font-size: 11px !important; }
  }

  // ToggleSwitch
  .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: #d6262c !important;
  }
}

// Transition
.mz-fade-enter-active, .mz-fade-leave-active { transition: opacity .2s, transform .2s; }
.mz-fade-enter-from, .mz-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
