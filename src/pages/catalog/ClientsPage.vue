<template>
  <q-page class="tw-bg-miza-paper">
    <div class="tw-max-w-[1200px] tw-mx-auto tw-px-7 tw-py-8 tw-flex tw-flex-col tw-gap-5">

      <!-- ── Page Header ──────────────────────────────────── -->
      <div class="tw-flex tw-items-end tw-justify-between">
        <div>
          <div class="tw-text-[10.5px] tw-font-bold tw-uppercase tw-tracking-[1.5px] tw-text-miza-red tw-mb-1">Catalog</div>
          <h1 class="tw-text-2xl tw-font-extrabold tw-text-miza-ink tw-tracking-tight tw-leading-[1.1]">Clients</h1>
          <p class="tw-text-[13.5px] tw-text-gray-400 tw-mt-1.5">Manage schools, companies, and organizations — and their stages.</p>
        </div>
      </div>

      <!-- ── Tabs ─────────────────────────────────────────── -->
      <SelectButton
        v-model="activeTab"
        :options="tabs"
        option-value="key"
        class="mz-tab-switcher"
      >
        <template #option="{ option }">
          <div class="tw-flex tw-items-center tw-gap-[7px] tw-py-[7px] tw-px-4 tw-text-[13px] tw-font-semibold">
            <i :class="option.icon" class="tw-text-[13px]" />
            <span>{{ option.label }}</span>
            <span class="tw-text-[11px] tw-font-bold tw-py-0.5 tw-px-1.5 tw-rounded-[5px] tw-bg-gray-100 tw-text-gray-400 tw-transition-all mz-tab-badge">
              {{ option.key === 'clients' ? clients.length : stages.length }}
            </span>
          </div>
        </template>
      </SelectButton>

      <!-- ── Clients Tab ──────────────────────────────────── -->
      <div v-show="activeTab === 'clients'">
        <ResourceTable
          title="All Clients"
          :subtitle="`${clients.length} ${clients.length === 1 ? 'client' : 'clients'}`"
          :rows="clients" :loading="loadingClients"
          add-label="New Client" empty-label="No clients yet"
          @create="openClientCreate" @edit="openClientEdit" @delete="openClientDelete"
        >
          <Column field="name" header="Name" sortable style="min-width:180px">
            <template #body="{ data }">
              <div class="tw-flex tw-items-center tw-gap-2.5">
                <div class="tw-w-8 tw-h-8 tw-rounded-[9px] tw-bg-gradient-to-br tw-from-miza-red-tint tw-to-miza-red-tint tw-text-miza-red tw-text-[13px] tw-font-extrabold tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  {{ data.name?.[0]?.toUpperCase() ?? '?' }}
                </div>
                <span class="tw-text-[13.5px] tw-font-semibold tw-text-[#111]">{{ data.name }}</span>
              </div>
            </template>
          </Column>
          <Column field="type" header="Type" sortable style="width:110px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-px-2.5 tw-py-[3px] tw-rounded-[6px] tw-text-[11.5px] tw-font-semibold"
                :class="typeStyle(data.type).cls">{{ typeStyle(data.type).label }}</span>
            </template>
          </Column>
          <Column field="phone" header="Phone" style="width:160px">
            <template #body="{ data }"><span class="tw-text-[13px] tw-text-gray-400">{{ data.phone || '—' }}</span></template>
          </Column>
          <Column header="Stages" style="width:90px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-gap-[5px] tw-text-[13px] tw-text-gray-500">
                <i class="pi pi-copy" style="font-size:12px" />{{ stagesCountFor(data.id) }}
              </span>
            </template>
          </Column>
          <Column field="is_active" header="Status" sortable style="width:100px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-gap-[5px] tw-py-[3px] tw-px-[9px] tw-rounded-[20px] tw-text-[11.5px] tw-font-semibold"
                :class="data.is_active ? 'tw-bg-emerald-50 tw-text-emerald-600' : 'tw-bg-gray-50 tw-text-gray-400'">
                <span class="tw-w-[5px] tw-h-[5px] tw-rounded-full tw-bg-current tw-shrink-0" />
                {{ data.is_active ? 'Active' : 'Inactive' }}
              </span>
            </template>
          </Column>
        </ResourceTable>
      </div>

      <!-- ── Stages Tab ───────────────────────────────────── -->
      <div v-show="activeTab === 'stages'">
        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-0">
          <Select
            v-model="selectedClientId"
            :options="clientFilterOptions"
            option-label="label"
            option-value="value"
            placeholder="All clients"
            show-clear
            size="small"
            class="mz-filter-select"
          >
            <template #prefix><i class="pi pi-filter" style="font-size:12px;color:#9ca3af" /></template>
          </Select>
          <span class="tw-text-xs tw-text-gray-400 tw-font-medium">
            {{ filteredStages.length }} stage{{ filteredStages.length !== 1 ? 's' : '' }}
          </span>
        </div>

        <ResourceTable
          title="Client Stages"
          subtitle="Academic or organizational stages per client"
          :rows="filteredStages" :loading="loadingStages"
          add-label="New Stage" empty-label="No stages yet"
          @create="openStageCreate" @edit="openStageEdit" @delete="openStageDelete"
        >
          <Column header="Client" sortable style="min-width:160px">
            <template #body="{ data }">
              <div class="tw-flex tw-items-center tw-gap-2.5">
                <div class="tw-w-[26px] tw-h-[26px] tw-rounded-[7px] tw-bg-gradient-to-br tw-from-miza-red-tint tw-to-miza-red-tint tw-text-miza-red tw-text-[11px] tw-font-extrabold tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  {{ clientName(data.client_id)?.[0]?.toUpperCase() ?? '?' }}
                </div>
                <span class="tw-text-[13.5px] tw-font-semibold tw-text-[#111]">{{ clientName(data.client_id) || '—' }}</span>
              </div>
            </template>
          </Column>
          <Column field="name" header="Stage" sortable>
            <template #body="{ data }"><span class="tw-text-[13.5px] tw-font-semibold tw-text-gray-700">{{ data.name }}</span></template>
          </Column>
          <Column field="sort_order" header="Order" sortable style="width:80px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-[6px] tw-bg-gray-100 tw-text-xs tw-font-bold tw-text-gray-500">
                {{ data.sort_order ?? 0 }}
              </span>
            </template>
          </Column>
          <Column field="is_active" header="Status" sortable style="width:100px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-gap-[5px] tw-py-[3px] tw-px-[9px] tw-rounded-[20px] tw-text-[11.5px] tw-font-semibold"
                :class="data.is_active ? 'tw-bg-emerald-50 tw-text-emerald-600' : 'tw-bg-gray-50 tw-text-gray-400'">
                <span class="tw-w-[5px] tw-h-[5px] tw-rounded-full tw-bg-current tw-shrink-0" />
                {{ data.is_active ? 'Active' : 'Inactive' }}
              </span>
            </template>
          </Column>
        </ResourceTable>
      </div>
    </div>

    <!-- ── Client Dialog ──────────────────────────────────── -->
    <ResourceFormDialog
      v-model="clientDialog"
      :title="editingClient ? 'Edit Client' : 'New Client'"
      :subtitle="editingClient ? editingClient.name : 'Fill in the details below'"
      :initial-form="clientForm" :loading="savingClient" :error-message="clientError"
      :submit-label="editingClient ? 'Save Changes' : 'Create Client'"
      @submit="saveClient"
    >
      <template #default>
        <FloatLabel variant="on">
          <InputText id="c-name" v-model="clientForm.name" class="tw-w-full" />
          <label for="c-name">Client name *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Select
            id="c-type"
            v-model="clientForm.type"
            :options="clientTypeOptions"
            option-label="label"
            option-value="value"
            class="tw-w-full"
          />
          <label for="c-type">Type *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="c-phone" v-model="clientForm.phone" class="tw-w-full" />
          <label for="c-phone">Phone</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Textarea id="c-address" v-model="clientForm.address" rows="2" class="tw-w-full" />
          <label for="c-address">Address</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Textarea id="c-notes" v-model="clientForm.notes" rows="2" class="tw-w-full" />
          <label for="c-notes">Notes</label>
        </FloatLabel>
        <div class="tw-flex tw-items-center tw-gap-3 tw-px-3.5 tw-py-2.5 tw-bg-gray-50 tw-border tw-border-gray-200 tw-rounded-[10px]">
          <ToggleSwitch v-model="clientForm.is_active" />
          <div>
            <div class="tw-text-[13.5px] tw-font-semibold tw-text-gray-700">Active</div>
            <div class="tw-text-[11.5px] tw-text-gray-400 tw-mt-px">Visible across the platform</div>
          </div>
        </div>
      </template>
    </ResourceFormDialog>

    <!-- ── Stage Dialog ───────────────────────────────────── -->
    <ResourceFormDialog
      v-model="stageDialog"
      :title="editingStage ? 'Edit Stage' : 'New Stage'"
      :subtitle="editingStage ? editingStage.name : 'Add a stage for a client'"
      :initial-form="stageForm" :loading="savingStage" :error-message="stageError"
      :submit-label="editingStage ? 'Save Changes' : 'Create Stage'"
      width="440px"
      @submit="saveStage"
    >
      <template #default>
        <FloatLabel variant="on">
          <Select
            id="s-client"
            v-model="stageForm.client_id"
            :options="clientOptions"
            option-label="label"
            option-value="value"
            class="tw-w-full"
          />
          <label for="s-client">Client *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="s-name" v-model="stageForm.name" class="tw-w-full" />
          <label for="s-name">Stage name *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="s-order" v-model.number="stageForm.sort_order" type="number" class="tw-w-full" />
          <label for="s-order">Sort order</label>
        </FloatLabel>
        <div class="tw-flex tw-items-center tw-gap-3 tw-px-3.5 tw-py-2.5 tw-bg-gray-50 tw-border tw-border-gray-200 tw-rounded-[10px]">
          <ToggleSwitch v-model="stageForm.is_active" />
          <div>
            <div class="tw-text-[13.5px] tw-font-semibold tw-text-gray-700">Active</div>
            <div class="tw-text-[11.5px] tw-text-gray-400 tw-mt-px">Visible in the system</div>
          </div>
        </div>
      </template>
    </ResourceFormDialog>

    <!-- ── Delete Dialog ──────────────────────────────────── -->
    <DeleteConfirmDialog
      v-model="deleteDialog"
      :title="`Delete ${deleteTarget?.type === 'client' ? 'Client' : 'Stage'}?`"
      :message="deleteTarget?.type === 'client'
        ? `'${deleteTarget?.row?.name}' and all its stages will be permanently removed.`
        : `Stage '${deleteTarget?.row?.name}' will be permanently removed.`"
      :loading="deletingRow"
      @confirm="confirmDelete"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import FloatLabel from 'primevue/floatlabel'
import ToggleSwitch from 'primevue/toggleswitch'
import { supabase } from '../../utils/supabase'
import ResourceTable from 'components/common/ResourceTable.vue'
import ResourceFormDialog from 'components/common/ResourceFormDialog.vue'
import DeleteConfirmDialog from 'components/common/DeleteConfirmDialog.vue'

const tabs = [
  { key: 'clients', label: 'Clients', icon: 'pi pi-building' },
  { key: 'stages',  label: 'Stages',  icon: 'pi pi-copy' },
]
const activeTab = ref('clients')

const clients   = ref([])
const stages    = ref([])
const loadingClients = ref(false)
const loadingStages  = ref(false)
const selectedClientId = ref(null)

const clientOptions = computed(() => clients.value.map(c => ({ label: c.name, value: c.id })))
const clientFilterOptions = computed(() => clients.value.map(c => ({ label: c.name, value: c.id })))
const filteredStages = computed(() =>
  selectedClientId.value ? stages.value.filter(s => s.client_id === selectedClientId.value) : stages.value
)
function stagesCountFor(id) { return stages.value.filter(s => s.client_id === id).length }
function clientName(id) { return clients.value.find(c => c.id === id)?.name ?? '' }

const typeMap = {
  school:  { label: 'School',  cls: 'tw-bg-[#fbe9e9] tw-text-miza-red' },
  company: { label: 'Company', cls: 'tw-bg-[#fbe9e9] tw-text-miza-red' },
  club:    { label: 'Club',    cls: 'tw-bg-[#fffbeb] tw-text-amber-600' },
  other:   { label: 'Other',   cls: 'tw-bg-gray-50 tw-text-gray-500' },
}
function typeStyle(v) { return typeMap[v] ?? typeMap.other }

const clientTypeOptions = [
  { label: 'School',  value: 'school' },
  { label: 'Company', value: 'company' },
  { label: 'Club',    value: 'club' },
  { label: 'Other',   value: 'other' },
]

async function fetchClients() {
  loadingClients.value = true
  const { data, error } = await supabase.from('clients').select('*').order('name')
  if (!error) clients.value = data ?? []
  loadingClients.value = false
}
async function fetchStages() {
  loadingStages.value = true
  const { data, error } = await supabase.from('client_stages').select('*').order('sort_order')
  if (!error) stages.value = data ?? []
  loadingStages.value = false
}
onMounted(() => { fetchClients(); fetchStages() })

const clientDialog  = ref(false)
const editingClient = ref(null)
const savingClient  = ref(false)
const clientError   = ref('')
const clientForm    = ref({ name: '', type: 'school', phone: '', address: '', notes: '', is_active: true })

function openClientCreate() {
  editingClient.value = null
  clientForm.value = { name: '', type: 'school', phone: '', address: '', notes: '', is_active: true }
  clientError.value = ''; clientDialog.value = true
}
function openClientEdit(row) {
  editingClient.value = row
  clientForm.value = { name: row.name, type: row.type, phone: row.phone ?? '', address: row.address ?? '', notes: row.notes ?? '', is_active: row.is_active }
  clientError.value = ''; clientDialog.value = true
}
async function saveClient(form) {
  savingClient.value = true; clientError.value = ''
  try {
    if (editingClient.value) {
      const { error } = await supabase.from('clients').update(form).eq('id', editingClient.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('clients').insert(form)
      if (error) throw error
    }
    clientDialog.value = false; await fetchClients()
  } catch (e) { clientError.value = e.message }
  finally { savingClient.value = false }
}

const stageDialog  = ref(false)
const editingStage = ref(null)
const savingStage  = ref(false)
const stageError   = ref('')
const stageForm    = ref({ client_id: null, name: '', sort_order: 0, is_active: true })

function openStageCreate() {
  editingStage.value = null
  stageForm.value = { client_id: selectedClientId.value ?? null, name: '', sort_order: 0, is_active: true }
  stageError.value = ''; stageDialog.value = true
}
function openStageEdit(row) {
  editingStage.value = row
  stageForm.value = { client_id: row.client_id, name: row.name, sort_order: row.sort_order ?? 0, is_active: row.is_active }
  stageError.value = ''; stageDialog.value = true
}
async function saveStage(form) {
  savingStage.value = true; stageError.value = ''
  try {
    if (editingStage.value) {
      const { error } = await supabase.from('client_stages').update(form).eq('id', editingStage.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('client_stages').insert(form)
      if (error) throw error
    }
    stageDialog.value = false; await fetchStages()
  } catch (e) { stageError.value = e.message }
  finally { savingStage.value = false }
}

const deleteDialog = ref(false)
const deleteTarget = ref(null)
const deletingRow  = ref(false)

function openClientDelete(row) { deleteTarget.value = { type: 'client', row }; deleteDialog.value = true }
function openStageDelete(row)  { deleteTarget.value = { type: 'stage',  row }; deleteDialog.value = true }

async function confirmDelete() {
  if (!deleteTarget.value) return
  deletingRow.value = true
  const { type, row } = deleteTarget.value
  const { error } = await supabase.from(type === 'client' ? 'clients' : 'client_stages').delete().eq('id', row.id)
  if (!error) { deleteDialog.value = false; if (type === 'client') await fetchClients(); else await fetchStages() }
  deletingRow.value = false
}
</script>

<style lang="scss">
// ── SelectButton tab switcher ────────────────────────────────────────────────
.mz-tab-switcher.p-selectbutton {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 4px;
  gap: 2px;
  box-shadow: none;

  .p-togglebutton {
    border: none !important;
    border-radius: 8px !important;
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
    color: #9ca3af !important;
    transition: background .12s, color .12s;

    .p-togglebutton-content {
      background: transparent !important;
      border-radius: 8px;
      transition: background .12s;
      color: inherit !important;
    }

    &:hover:not(.p-togglebutton-checked) {
      color: #374151 !important;
      .p-togglebutton-content { background: #f9fafb !important; color: #374151 !important; }
    }

    &.p-togglebutton-checked {
      color: #fff !important;

      .p-togglebutton-content {
        background: #1f1d1a !important;
        color: #fff !important;
      }

      .mz-tab-badge {
        background: rgba(255,255,255,.15) !important;
        color: rgba(255,255,255,.8) !important;
      }
    }

    &:focus { box-shadow: none !important; }
  }
}

// Filter select
.mz-filter-select.p-select {
  min-width: 200px;
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  background: #fff !important;
  font-size: 13px !important;
  box-shadow: none !important;
  &:hover { border-color: #d1d5db !important; }
  &.p-focus { border-color: #d6262c !important; box-shadow: none !important; }
  .p-select-label { font-size: 13px !important; padding: 7px 10px !important; color: #374151 !important; }
}
</style>
