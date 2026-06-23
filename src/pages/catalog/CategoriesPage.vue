<template>
  <q-page class="tw-bg-miza-paper">
    <div class="tw-max-w-[1200px] tw-mx-auto tw-px-7 tw-py-8 tw-flex tw-flex-col tw-gap-5">

      <!-- ── Page Header ──────────────────────────────────── -->
      <div class="tw-flex tw-items-end tw-justify-between">
        <div>
          <div class="tw-text-[10.5px] tw-font-bold tw-uppercase tw-tracking-[1.5px] tw-text-miza-red tw-mb-1">Catalog</div>
          <h1 class="tw-text-2xl tw-font-extrabold tw-text-miza-ink tw-tracking-tight tw-leading-[1.1]">Categories</h1>
          <p class="tw-text-[13.5px] tw-text-gray-400 tw-mt-1.5">Manage product categories and their display order.</p>
        </div>
      </div>

      <!-- ── Table ────────────────────────────────────────── -->
      <ResourceTable
        title="All Categories"
        :subtitle="`${categories.length} ${categories.length === 1 ? 'category' : 'categories'}`"
        :rows="categories"
        :loading="loadingCategories"
        add-label="New Category"
        empty-label="No categories yet"
        @create="openCreate"
        @edit="openEdit"
        @delete="openDelete"
      >
        <Column field="name" header="Name" sortable style="min-width:180px">
          <template #body="{ data }">
            <div class="tw-flex tw-items-center tw-gap-2.5">
              <div class="tw-w-8 tw-h-8 tw-rounded-[9px] tw-bg-gradient-to-br tw-from-cyan-100 tw-to-cyan-200 tw-text-cyan-600 tw-text-[13px] tw-font-extrabold tw-flex tw-items-center tw-justify-center tw-shrink-0">
                {{ data.name?.[0]?.toUpperCase() ?? '?' }}
              </div>
              <span class="tw-text-[13.5px] tw-font-semibold tw-text-[#111]">{{ data.name }}</span>
            </div>
          </template>
        </Column>

        <Column field="slug" header="Slug" sortable style="min-width:160px">
          <template #body="{ data }">
            <span class="tw-text-[12px] tw-font-mono tw-text-gray-400 tw-bg-gray-100 tw-px-2 tw-py-0.5 tw-rounded-[5px]">
              {{ data.slug }}
            </span>
          </template>
        </Column>

        <Column field="sort_order" header="Order" sortable style="width:90px">
          <template #body="{ data }">
            <span class="tw-inline-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-[6px] tw-bg-gray-100 tw-text-xs tw-font-bold tw-text-gray-500">
              {{ data.sort_order ?? 0 }}
            </span>
          </template>
        </Column>
      </ResourceTable>
    </div>

    <!-- ── Category Dialog ─────────────────────────────────── -->
    <ResourceFormDialog
      v-model="categoryDialog"
      :title="editingCategory ? 'Edit Category' : 'New Category'"
      :subtitle="editingCategory ? editingCategory.name : 'Fill in the details below'"
      :initial-form="categoryForm"
      :loading="savingCategory"
      :error-message="categoryError"
      :submit-label="editingCategory ? 'Save Changes' : 'Create Category'"
      @submit="saveCategory"
    >
      <template #default>
        <FloatLabel variant="on">
          <InputText id="cat-name" v-model="categoryForm.name" class="tw-w-full" @input="autoSlug" />
          <label for="cat-name">Category name *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="cat-slug" v-model="categoryForm.slug" class="tw-w-full" />
          <label for="cat-slug">Slug *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="cat-order" v-model.number="categoryForm.sort_order" type="number" class="tw-w-full" />
          <label for="cat-order">Sort order</label>
        </FloatLabel>
      </template>
    </ResourceFormDialog>

    <!-- ── Delete Dialog ──────────────────────────────────── -->
    <DeleteConfirmDialog
      v-model="deleteDialog"
      title="Delete Category?"
      :message="`'${deleteTarget?.name}' will be permanently removed.`"
      :loading="deletingRow"
      @confirm="confirmDelete"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { supabase } from '../../utils/supabase'
import ResourceTable from 'components/common/ResourceTable.vue'
import ResourceFormDialog from 'components/common/ResourceFormDialog.vue'
import DeleteConfirmDialog from 'components/common/DeleteConfirmDialog.vue'

const categories        = ref([])
const loadingCategories = ref(false)

async function fetchCategories() {
  loadingCategories.value = true
  const { data, error } = await supabase.from('categories').select('*').order('sort_order')
  if (!error) categories.value = data ?? []
  loadingCategories.value = false
}
onMounted(fetchCategories)

// ── Dialog state ──────────────────────────────────────────────────────────────
const categoryDialog  = ref(false)
const editingCategory = ref(null)
const savingCategory  = ref(false)
const categoryError   = ref('')
const categoryForm    = ref({ name: '', slug: '', sort_order: 0 })

function toSlug(val) {
  return val.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
function autoSlug() {
  if (!editingCategory.value) {
    categoryForm.value.slug = toSlug(categoryForm.value.name)
  }
}

function openCreate() {
  editingCategory.value = null
  categoryForm.value = { name: '', slug: '', sort_order: 0 }
  categoryError.value = ''; categoryDialog.value = true
}
function openEdit(row) {
  editingCategory.value = row
  categoryForm.value = { name: row.name, slug: row.slug, sort_order: row.sort_order ?? 0 }
  categoryError.value = ''; categoryDialog.value = true
}
async function saveCategory(form) {
  savingCategory.value = true; categoryError.value = ''
  try {
    if (editingCategory.value) {
      const { error } = await supabase.from('categories').update(form).eq('id', editingCategory.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('categories').insert(form)
      if (error) throw error
    }
    categoryDialog.value = false; await fetchCategories()
  } catch (e) { categoryError.value = e.message }
  finally { savingCategory.value = false }
}

// ── Delete ────────────────────────────────────────────────────────────────────
const deleteDialog = ref(false)
const deleteTarget = ref(null)
const deletingRow  = ref(false)

function openDelete(row) { deleteTarget.value = row; deleteDialog.value = true }

async function confirmDelete() {
  if (!deleteTarget.value) return
  deletingRow.value = true
  const { error } = await supabase.from('categories').delete().eq('id', deleteTarget.value.id)
  if (!error) { deleteDialog.value = false; await fetchCategories() }
  deletingRow.value = false
}
</script>
