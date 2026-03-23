<template>
  <div class="tw-bg-white tw-rounded-[14px] tw-border tw-border-gray-200 tw-overflow-hidden">

    <!-- ── Header ──────────────────────────────────────────── -->
    <div class="tw-flex tw-items-center tw-justify-between tw-px-5 tw-pt-[18px] tw-pb-4 tw-border-b tw-border-gray-100">
      <div>
        <h3 class="tw-text-[14px] tw-font-[650] tw-text-[#111] tw-leading-tight">{{ title }}</h3>
        <p v-if="subtitle" class="tw-text-[11.5px] tw-text-gray-400 tw-mt-0.5">{{ subtitle }}</p>
      </div>

      <div class="tw-flex tw-items-center tw-gap-2">
        <slot name="toolbar" />

        <!-- Search -->
        <IconField v-if="searchable">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchText"
            placeholder="Search…"
            size="small"
            class="mz-search-field"
          />
        </IconField>

        <!-- Add -->
        <Button
          v-if="canCreate"
          :label="addLabel"
          icon="pi pi-plus"
          size="small"
          class="mz-btn-add"
          @click="$emit('create')"
        />
      </div>
    </div>

    <!-- ── DataTable ────────────────────────────────────────── -->
    <DataTable
      :value="filteredRows"
      :loading="loading"
      :paginator="filteredRows.length > pageSize"
      :rows="pageSize"
      :rows-per-page-options="[10, 25, 50]"
      striped-rows
      removable-sort
      size="small"
      class="mz-datatable"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    >
      <slot />

      <!-- Empty -->
      <template #empty>
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-[52px] tw-px-6 tw-text-center">
          <div class="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-gray-50 tw-border tw-border-gray-200 tw-flex tw-items-center tw-justify-center tw-mb-3">
            <i class="pi pi-inbox" style="font-size:22px;color:#9ca3af" />
          </div>
          <p class="tw-text-[13.5px] tw-text-gray-400 tw-font-medium">{{ emptyLabel }}</p>
          <Button
            v-if="canCreate"
            :label="`+ ${addLabel}`"
            text
            size="small"
            class="mz-empty-btn"
            @click="$emit('create')"
          />
        </div>
      </template>

      <!-- Actions column -->
      <Column v-if="showActions" style="width:80px" header="">
        <template #body="{ data }">
          <div class="tw-flex tw-items-center tw-justify-end tw-gap-0.5 tw-opacity-0 tw-transition-opacity mz-row-actions">
            <Button
              v-if="canEdit"
              icon="pi pi-pencil"
              text
              rounded
              size="small"
              severity="secondary"
              class="mz-action-edit"
              v-tooltip.top="'Edit'"
              @click.stop="$emit('edit', data)"
            />
            <Button
              v-if="canDelete"
              icon="pi pi-trash"
              text
              rounded
              size="small"
              severity="danger"
              class="mz-action-delete"
              v-tooltip.top="'Delete'"
              @click.stop="$emit('delete', data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const props = defineProps({
  title:       { type: String,  required: true },
  subtitle:    { type: String,  default: '' },
  rows:        { type: Array,   default: () => [] },
  loading:     { type: Boolean, default: false },
  searchable:  { type: Boolean, default: true },
  canCreate:   { type: Boolean, default: true },
  canEdit:     { type: Boolean, default: true },
  canDelete:   { type: Boolean, default: true },
  showActions: { type: Boolean, default: true },
  addLabel:    { type: String,  default: 'Add' },
  emptyLabel:  { type: String,  default: 'No records found' },
  pageSize:    { type: Number,  default: 10 },
})

defineEmits(['create', 'edit', 'delete'])

const searchText = ref('')
const filteredRows = computed(() => {
  if (!searchText.value.trim()) return props.rows
  const q = searchText.value.toLowerCase()
  return props.rows.filter(row =>
    Object.values(row).some(v => String(v ?? '').toLowerCase().includes(q))
  )
})
</script>

<style lang="scss">
// ── Search ──────────────────────────────────────────────────────────────────
.mz-search-field.p-inputtext {
  font-size: 13px !important;
  padding: 7px 10px 7px 32px !important;
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  background: #f9fafb !important;
  width: 180px !important;
  color: #111 !important;
  box-shadow: none !important;
  &::placeholder { color: #c4c9d4 !important; }
  &:focus { border-color: #6366f1 !important; background: #fff !important; }
}

// ── Add button — filled, NO border ─────────────────────────────────────────
.mz-btn-add.p-button {
  background: #6366f1 !important;
  border: none !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  padding: 7px 14px !important;
  box-shadow: none !important;
  &:hover { background: #4f52e0 !important; }
  &:focus { box-shadow: none !important; }
}

// ── DataTable ───────────────────────────────────────────────────────────────
.mz-datatable {
  font-family: 'Inter', sans-serif !important;

  .p-datatable-thead > tr > th {
    background: #f9fafb !important;
    border-bottom: 1px solid #f3f4f6 !important;
    border-top: none !important;
    padding: 10px 16px !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.07em !important;
    color: #9ca3af !important;
    white-space: nowrap;
  }

  .p-datatable-tbody > tr > td {
    padding: 11px 16px !important;
    font-size: 13.5px !important;
    color: #374151 !important;
    border-bottom: 1px solid #f9fafb !important;
    border-top: none !important;
  }

  .p-datatable-tbody > tr {
    transition: background .1s;
    &:hover > td { background: #fafafa !important; }
    &:hover .mz-row-actions { opacity: 1 !important; }
  }

  .p-datatable-table { border-collapse: collapse; }

  .p-paginator {
    border-top: 1px solid #f3f4f6 !important;
    background: #fff !important;
    padding: 10px 16px !important;
    font-size: 12px;
    .p-paginator-page.p-highlight {
      background: #6366f1 !important;
      color: #fff !important;
      border: none !important;
      border-radius: 6px !important;
    }
    .p-paginator-first, .p-paginator-prev,
    .p-paginator-next, .p-paginator-last {
      border: none !important;
      box-shadow: none !important;
    }
  }
}

// ── Row actions ─────────────────────────────────────────────────────────────
.mz-action-edit.p-button {
  width: 28px !important; height: 28px !important;
  border: none !important; box-shadow: none !important;
  color: #9ca3af !important;
  &:hover { background: #eef2ff !important; color: #6366f1 !important; }
  .p-button-icon { font-size: 12px !important; }
}
.mz-action-delete.p-button {
  width: 28px !important; height: 28px !important;
  border: none !important; box-shadow: none !important;
  color: #9ca3af !important;
  &:hover { background: #fef2f2 !important; color: #ef4444 !important; }
  .p-button-icon { font-size: 12px !important; }
}

// ── Empty btn ────────────────────────────────────────────────────────────────
.mz-empty-btn.p-button {
  margin-top: 8px;
  color: #6366f1 !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}

// ── Shared badge helpers ─────────────────────────────────────────────────────
.mz-badge-active {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; border-radius: 20px; font-size: 11.5px; font-weight: 600;
  .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
  &.is-active   { background: #ecfdf5; color: #059669; }
  &.is-inactive { background: #f9fafb; color: #9ca3af; }
}
.mz-badge-type {
  display: inline-flex; align-items: center;
  padding: 3px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600;
}
</style>
