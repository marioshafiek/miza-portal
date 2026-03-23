<template>
  <div class="tw-bg-white tw-rounded-xl tw-border tw-border-gray-200 tw-p-5 tw-flex tw-items-start tw-justify-between">
    <div>
      <p class="tw-text-sm tw-text-gray-500 tw-font-medium tw-mb-1">{{ label }}</p>
      <p class="tw-text-3xl tw-font-bold tw-text-gray-900">{{ value }}</p>
      <div class="tw-flex tw-items-center tw-gap-1 tw-mt-2">
        <q-icon
          :name="trend >= 0 ? 'trending_up' : 'trending_down'"
          :class="trend >= 0 ? 'tw-text-positive' : 'tw-text-negative'"
          size="16px"
        />
        <span
          class="tw-text-xs tw-font-medium"
          :class="trend >= 0 ? 'tw-text-positive' : 'tw-text-negative'"
        >
          {{ Math.abs(trend) }}%
        </span>
        <span class="tw-text-xs tw-text-gray-400">vs last month</span>
      </div>
    </div>

    <div
      class="tw-w-12 tw-h-12 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-shrink-0"
      :class="iconBg"
    >
      <q-icon :name="icon" :color="iconColor" size="24px" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  trend: { type: Number, default: 0 },
  icon: { type: String, default: 'analytics' },
  iconBg: { type: String, default: 'tw-bg-blue-50' },
  iconColor: { type: String, default: 'primary' },
})
</script>
