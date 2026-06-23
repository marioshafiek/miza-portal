<template>
  <router-link :to="to" custom v-slot="{ isActive, isExactActive, navigate }">
    <Button
      text
      class="mz-nav-link"
      :class="{ 'mz-nav-link--active': exact ? isExactActive : isActive }"
      @click="navigate"
    >
      <i :class="icon" class="mz-nav-icon" />
      <span class="tw-leading-none">{{ label }}</span>
    </Button>
  </router-link>
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  label: { type: String, required: true },
  icon:  { type: String, required: true },
  to:    { type: String, required: true },
  exact: { type: Boolean, default: false },
})
</script>

<style lang="scss">
.mz-nav-link.p-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 9px 12px !important;
  border-radius: 9px !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #6b7280 !important;
  background: transparent !important;
  transition: background .13s ease, color .13s ease;
  margin-bottom: 3px;

  .p-button-label { font-weight: inherit !important; line-height: 1; }

  .mz-nav-icon {
    font-size: 14px;
    color: #4b5563;
    transition: color .13s ease;
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(255,255,255,.05) !important;
    color: #c9cdd4 !important;
    .mz-nav-icon { color: #9ca3af; }
  }

  &.mz-nav-link--active {
    background: rgba(214, 38, 44, .18) !important;
    color: #ffffff !important;
    font-weight: 600 !important;

    .mz-nav-icon { color: #f5c518 !important; }

    &:hover {
      background: rgba(214, 38, 44, .26) !important;
    }
  }
}
</style>
