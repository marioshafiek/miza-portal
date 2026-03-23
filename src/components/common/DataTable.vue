<template>
  <div class="tw-bg-white tw-rounded-xl tw-border tw-border-gray-200 tw-overflow-hidden">
    <!-- Table Header -->
    <div class="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-4 tw-border-b tw-border-gray-100">
      <div>
        <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-0">{{ title }}</h3>
        <p v-if="subtitle" class="tw-text-xs tw-text-gray-400 tw-mt-0.5">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>

    <!-- Q-Table -->
    <q-table
      :rows="rows"
      :columns="columns"
      :loading="loading"
      flat
      borderless
      row-key="id"
      class="miza-table"
      :rows-per-page-options="[10, 25, 50]"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope ?? {}" />
      </template>
    </q-table>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})
</script>

<style lang="scss" scoped>
:deep(.miza-table) {
  .q-table__top {
    display: none;
  }
  thead tr th {
    @apply tw-text-xs tw-font-semibold tw-text-gray-500 tw-uppercase tw-tracking-wider tw-bg-gray-50;
  }
  tbody tr {
    @apply hover:tw-bg-gray-50 tw-transition-colors;
  }
  tbody tr td {
    @apply tw-text-sm tw-text-gray-700;
  }
}
</style>
