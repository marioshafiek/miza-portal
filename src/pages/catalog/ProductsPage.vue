<template>
  <q-page class="tw-bg-[#f5f5f7]">
    <div class="tw-max-w-[1200px] tw-mx-auto tw-px-7 tw-py-8 tw-flex tw-flex-col tw-gap-5">

      <!-- ── Page Header ──────────────────────────────────── -->
      <div class="tw-flex tw-items-end tw-justify-between">
        <div>
          <div class="tw-text-[10.5px] tw-font-bold tw-uppercase tw-tracking-[1.5px] tw-text-indigo-500 tw-mb-1">Catalog</div>
          <h1 class="tw-text-2xl tw-font-extrabold tw-text-[#0f0f11] tw-tracking-tight tw-leading-[1.1]">Products</h1>
          <p class="tw-text-[13.5px] tw-text-gray-400 tw-mt-1.5">Manage your product catalog, variants, and inventory items.</p>
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
              {{ option.key === 'products' ? products.length : variants.length }}
            </span>
          </div>
        </template>
      </SelectButton>

      <!-- ── Products Tab ─────────────────────────────────── -->
      <div v-show="activeTab === 'products'">
        <!-- Filters row -->
        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-0">
          <Select
            v-model="filterCategoryId"
            :options="categoryFilterOptions"
            option-label="label"
            option-value="value"
            placeholder="All categories"
            show-clear
            size="small"
            class="mz-filter-select"
          >
            <template #prefix><i class="pi pi-filter" style="font-size:12px;color:#9ca3af" /></template>
          </Select>
          <Select
            v-model="filterClientId"
            :options="clientFilterOptions"
            option-label="label"
            option-value="value"
            placeholder="All clients"
            show-clear
            size="small"
            class="mz-filter-select"
          >
            <template #prefix><i class="pi pi-building" style="font-size:12px;color:#9ca3af" /></template>
          </Select>
          <span class="tw-text-xs tw-text-gray-400 tw-font-medium">
            {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }}
          </span>
        </div>

        <ResourceTable
          title="All Products"
          :subtitle="`${products.length} ${products.length === 1 ? 'product' : 'products'}`"
          :rows="filteredProducts"
          :loading="loadingProducts"
          add-label="New Product"
          empty-label="No products yet"
          @create="openProductCreate"
          @edit="openProductEdit"
          @delete="openProductDelete"
        >
          <Column field="name" header="Product" sortable style="min-width:200px">
            <template #body="{ data }">
              <div class="tw-flex tw-items-center tw-gap-2.5">
                <div class="tw-w-8 tw-h-8 tw-rounded-[9px] tw-bg-gradient-to-br tw-from-indigo-100 tw-to-indigo-200 tw-text-indigo-500 tw-text-[13px] tw-font-extrabold tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  {{ data.name?.[0]?.toUpperCase() ?? '?' }}
                </div>
                <div>
                  <div class="tw-text-[13.5px] tw-font-semibold tw-text-[#111]">{{ data.name }}</div>
                  <div class="tw-text-[11px] tw-text-gray-400 tw-font-mono">{{ data.sku_base }}</div>
                </div>
              </div>
            </template>
          </Column>
          <Column field="category_id" header="Category" sortable style="width:140px">
            <template #body="{ data }">
              <span class="tw-text-[13px] tw-text-gray-500">{{ categoryName(data.category_id) || '—' }}</span>
            </template>
          </Column>
          <Column field="base_price" header="Base Price" sortable style="width:120px">
            <template #body="{ data }">
              <span class="tw-text-[13.5px] tw-font-semibold tw-text-gray-700">
                {{ data.base_price != null ? `EGP ${Number(data.base_price).toFixed(2)}` : '—' }}
              </span>
            </template>
          </Column>
          <Column field="client_id" header="Client" style="width:140px">
            <template #body="{ data }">
              <span v-if="data.client_id" class="tw-inline-flex tw-items-center tw-px-2 tw-py-[3px] tw-rounded-[6px] tw-text-[11.5px] tw-font-semibold tw-bg-[#eef2ff] tw-text-indigo-500">
                {{ clientName(data.client_id) }}
              </span>
              <span v-else class="tw-text-[12px] tw-text-gray-300">General</span>
            </template>
          </Column>
          <Column header="Variants" style="width:90px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-gap-[5px] tw-text-[13px] tw-text-gray-500">
                <i class="pi pi-tag" style="font-size:12px" />{{ variantsCountFor(data.id) }}
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

      <!-- ── Variants Tab ─────────────────────────────────── -->
      <div v-show="activeTab === 'variants'">
        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-0">
          <Select
            v-model="filterVariantProductId"
            :options="productFilterOptions"
            option-label="label"
            option-value="value"
            placeholder="All products"
            show-clear
            size="small"
            class="mz-filter-select"
          >
            <template #prefix><i class="pi pi-filter" style="font-size:12px;color:#9ca3af" /></template>
          </Select>
          <span class="tw-text-xs tw-text-gray-400 tw-font-medium">
            {{ filteredVariants.length }} variant{{ filteredVariants.length !== 1 ? 's' : '' }}
          </span>
        </div>

        <ResourceTable
          title="Product Variants"
          subtitle="Size and color combinations per product"
          :rows="filteredVariants"
          :loading="loadingVariants"
          add-label="New Variant"
          empty-label="No variants yet"
          @create="openVariantCreate"
          @edit="openVariantEdit"
          @delete="openVariantDelete"
        >
          <Column field="product_id" header="Product" sortable style="min-width:160px">
            <template #body="{ data }">
              <div class="tw-flex tw-items-center tw-gap-2.5">
                <div class="tw-w-[26px] tw-h-[26px] tw-rounded-[7px] tw-bg-gradient-to-br tw-from-indigo-100 tw-to-indigo-200 tw-text-indigo-500 tw-text-[11px] tw-font-extrabold tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  {{ productName(data.product_id)?.[0]?.toUpperCase() ?? '?' }}
                </div>
                <span class="tw-text-[13.5px] tw-font-semibold tw-text-[#111]">{{ productName(data.product_id) || '—' }}</span>
              </div>
            </template>
          </Column>
          <Column field="sku" header="SKU" sortable style="width:140px">
            <template #body="{ data }">
              <span class="tw-font-mono tw-text-[12px] tw-text-gray-500 tw-bg-gray-50 tw-px-2 tw-py-0.5 tw-rounded-[5px]">{{ data.sku }}</span>
            </template>
          </Column>
          <Column field="size" header="Size" sortable style="width:80px">
            <template #body="{ data }">
              <span class="tw-inline-flex tw-items-center tw-justify-center tw-min-w-[32px] tw-h-6 tw-px-2 tw-rounded-[6px] tw-bg-gray-100 tw-text-xs tw-font-bold tw-text-gray-600">
                {{ data.size || '—' }}
              </span>
            </template>
          </Column>
          <Column field="color" header="Color" style="width:120px">
            <template #body="{ data }">
              <div v-if="data.color" class="tw-flex tw-items-center tw-gap-1.5">
                <div class="tw-w-3.5 tw-h-3.5 tw-rounded-full tw-border tw-border-gray-200 tw-shrink-0"
                  :style="{ background: data.color.startsWith('#') ? data.color : 'transparent' }" />
                <span class="tw-text-[13px] tw-text-gray-600">{{ data.color }}</span>
              </div>
              <span v-else class="tw-text-gray-300 tw-text-[12px]">—</span>
            </template>
          </Column>
          <Column field="price_modifier" header="Price ±" sortable style="width:100px">
            <template #body="{ data }">
              <span class="tw-text-[13px]"
                :class="Number(data.price_modifier) > 0 ? 'tw-text-emerald-600 tw-font-semibold' : Number(data.price_modifier) < 0 ? 'tw-text-red-500 tw-font-semibold' : 'tw-text-gray-400'">
                {{ Number(data.price_modifier) > 0 ? '+' : '' }}{{ Number(data.price_modifier).toFixed(2) }}
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

    <!-- ── Product Dialog ──────────────────────────────────── -->
    <ResourceFormDialog
      v-model="productDialog"
      :title="editingProduct ? 'Edit Product' : 'New Product'"
      :subtitle="editingProduct ? editingProduct.name : 'Fill in the product details below'"
      :initial-form="productForm"
      :loading="savingProduct"
      :error-message="productError"
      :submit-label="editingProduct ? 'Save Changes' : 'Create Product'"
      width="560px"
      @submit="saveProduct"
    >
      <template #default>
        <FloatLabel variant="on">
          <InputText id="p-name" v-model="productForm.name" class="tw-w-full" />
          <label for="p-name">Product name *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="p-sku" v-model="productForm.sku_base" class="tw-w-full" />
          <label for="p-sku">Base SKU *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Select
            id="p-category"
            v-model="productForm.category_id"
            :options="categoryOptions"
            option-label="label"
            option-value="value"
            show-clear
            class="tw-w-full"
          />
          <label for="p-category">Category</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="p-price" v-model.number="productForm.base_price" type="number" min="0" step="0.01" class="tw-w-full" />
          <label for="p-price">Base price (EGP) *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Select
            id="p-client"
            v-model="productForm.client_id"
            :options="clientOptions"
            option-label="label"
            option-value="value"
            show-clear
            class="tw-w-full"
          />
          <label for="p-client">Client (optional)</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Select
            id="p-stage"
            v-model="productForm.client_stage_id"
            :options="stageOptionsForClient"
            option-label="label"
            option-value="value"
            show-clear
            :disabled="!productForm.client_id"
            class="tw-w-full"
          />
          <label for="p-stage">Client stage (optional)</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Textarea id="p-desc" v-model="productForm.description" rows="2" class="tw-w-full" />
          <label for="p-desc">Description</label>
        </FloatLabel>
        <div class="tw-flex tw-items-center tw-gap-3 tw-px-3.5 tw-py-2.5 tw-bg-gray-50 tw-border tw-border-gray-200 tw-rounded-[10px]">
          <ToggleSwitch v-model="productForm.is_active" />
          <div>
            <div class="tw-text-[13.5px] tw-font-semibold tw-text-gray-700">Active</div>
            <div class="tw-text-[11.5px] tw-text-gray-400 tw-mt-px">Visible across the platform</div>
          </div>
        </div>
      </template>
    </ResourceFormDialog>

    <!-- ── Variant Dialog ──────────────────────────────────── -->
    <ResourceFormDialog
      v-model="variantDialog"
      :title="editingVariant ? 'Edit Variant' : 'New Variant'"
      :subtitle="editingVariant ? editingVariant.sku : 'Add a size/color combination'"
      :initial-form="variantForm"
      :loading="savingVariant"
      :error-message="variantError"
      :submit-label="editingVariant ? 'Save Changes' : 'Create Variant'"
      width="520px"
      @submit="saveVariant"
    >
      <template #default>
        <FloatLabel variant="on">
          <Select
            id="v-product"
            v-model="variantForm.product_id"
            :options="productOptions"
            option-label="label"
            option-value="value"
            class="tw-w-full"
          />
          <label for="v-product">Product *</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText id="v-sku" v-model="variantForm.sku" class="tw-w-full" />
          <label for="v-sku">Variant SKU *</label>
        </FloatLabel>
        <div class="tw-grid tw-grid-cols-2 tw-gap-3">
          <FloatLabel variant="on">
            <InputText id="v-size" v-model="variantForm.size" class="tw-w-full" />
            <label for="v-size">Size</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="v-color" v-model="variantForm.color" class="tw-w-full" />
            <label for="v-color">Color</label>
          </FloatLabel>
        </div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-3">
          <FloatLabel variant="on">
            <InputText id="v-modifier" v-model.number="variantForm.price_modifier" type="number" step="0.01" class="tw-w-full" />
            <label for="v-modifier">Price modifier</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="v-weight" v-model.number="variantForm.weight_grams" type="number" min="0" class="tw-w-full" />
            <label for="v-weight">Weight (grams)</label>
          </FloatLabel>
        </div>
        <!-- <FloatLabel variant="on">
          <InputText id="v-barcode" v-model="variantForm.barcode" class="tw-w-full" />
          <label for="v-barcode">Barcode</label>
        </FloatLabel> -->
        <div class="tw-flex tw-items-center tw-gap-3 tw-px-3.5 tw-py-2.5 tw-bg-gray-50 tw-border tw-border-gray-200 tw-rounded-[10px]">
          <ToggleSwitch v-model="variantForm.is_active" />
          <div>
            <div class="tw-text-[13.5px] tw-font-semibold tw-text-gray-700">Active</div>
            <div class="tw-text-[11.5px] tw-text-gray-400 tw-mt-px">Available for sale</div>
          </div>
        </div>
      </template>
    </ResourceFormDialog>

    <!-- ── Delete Dialog ──────────────────────────────────── -->
    <DeleteConfirmDialog
      v-model="deleteDialog"
      :title="`Delete ${deleteTarget?.type === 'product' ? 'Product' : 'Variant'}?`"
      :message="deleteTarget?.type === 'product'
        ? `'${deleteTarget?.row?.name}' and all its variants will be permanently removed.`
        : `Variant '${deleteTarget?.row?.sku}' will be permanently removed.`"
      :loading="deletingRow"
      @confirm="confirmDelete"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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

// ── Tabs ──────────────────────────────────────────────────────────────────────
const tabs = [
  { key: 'products', label: 'Products', icon: 'pi pi-box' },
  { key: 'variants', label: 'Variants', icon: 'pi pi-tag' },
]
const activeTab = ref('products')

// ── Data ──────────────────────────────────────────────────────────────────────
const products        = ref([])
const variants        = ref([])
const categories      = ref([])
const clients         = ref([])
const clientStages    = ref([])
const loadingProducts = ref(false)
const loadingVariants = ref(false)

// ── Filters ───────────────────────────────────────────────────────────────────
const filterCategoryId      = ref(null)
const filterClientId        = ref(null)
const filterVariantProductId = ref(null)

const filteredProducts = computed(() => {
  let list = products.value
  if (filterCategoryId.value) list = list.filter(p => p.category_id === filterCategoryId.value)
  if (filterClientId.value)   list = list.filter(p => p.client_id   === filterClientId.value)
  return list
})

const filteredVariants = computed(() =>
  filterVariantProductId.value
    ? variants.value.filter(v => v.product_id === filterVariantProductId.value)
    : variants.value
)

// ── Lookup helpers ────────────────────────────────────────────────────────────
function categoryName(id) { return categories.value.find(c => c.id === id)?.name ?? '' }
function clientName(id)   { return clients.value.find(c => c.id === id)?.name ?? '' }
function productName(id)  { return products.value.find(p => p.id === id)?.name ?? '' }
function variantsCountFor(productId) { return variants.value.filter(v => v.product_id === productId).length }

// ── Options for selects ───────────────────────────────────────────────────────
const categoryOptions       = computed(() => categories.value.map(c => ({ label: c.name, value: c.id })))
const categoryFilterOptions = computed(() => categories.value.map(c => ({ label: c.name, value: c.id })))
const clientOptions         = computed(() => clients.value.map(c => ({ label: c.name, value: c.id })))
const clientFilterOptions   = computed(() => clients.value.map(c => ({ label: c.name, value: c.id })))
const productOptions        = computed(() => products.value.map(p => ({ label: p.name, value: p.id })))
const productFilterOptions  = computed(() => products.value.map(p => ({ label: p.name, value: p.id })))

// ── Fetch ─────────────────────────────────────────────────────────────────────
async function fetchProducts() {
  loadingProducts.value = true
  const { data, error } = await supabase.from('products').select('*').order('name')
  if (!error) products.value = data ?? []
  loadingProducts.value = false
}
async function fetchVariants() {
  loadingVariants.value = true
  const { data, error } = await supabase.from('product_variants').select('*').order('sku')
  if (!error) variants.value = data ?? []
  loadingVariants.value = false
}
async function fetchCategories() {
  const { data, error } = await supabase.from('categories').select('id, name').order('name')
  if (!error) categories.value = data ?? []
}
async function fetchClients() {
  const { data, error } = await supabase.from('clients').select('id, name').order('name')
  if (!error) clients.value = data ?? []
}
async function fetchClientStages() {
  const { data, error } = await supabase.from('client_stages').select('id, client_id, name').eq('is_active', true).order('sort_order')
  if (!error) clientStages.value = data ?? []
}

onMounted(() => {
  fetchProducts()
  fetchVariants()
  fetchCategories()
  fetchClients()
  fetchClientStages()
})

// ── Product CRUD ──────────────────────────────────────────────────────────────
const productDialog  = ref(false)
const editingProduct = ref(null)
const savingProduct  = ref(false)
const productError   = ref('')
const productForm    = ref({
  name: '', sku_base: '', category_id: null, base_price: null,
  client_id: null, client_stage_id: null, description: '', is_active: true,
})

const stageOptionsForClient = computed(() => {
  if (!productForm.value.client_id) return []
  return clientStages.value
    .filter(s => s.client_id === productForm.value.client_id)
    .map(s => ({ label: s.name, value: s.id }))
})

watch(() => productForm.value.client_id, () => {
  productForm.value.client_stage_id = null
})

function openProductCreate() {
  editingProduct.value = null
  productForm.value = {
    name: '', sku_base: '', category_id: null, base_price: null,
    client_id: null, client_stage_id: null, description: '', is_active: true,
  }
  productError.value = ''
  productDialog.value = true
}
function openProductEdit(row) {
  editingProduct.value = row
  productForm.value = {
    name: row.name,
    sku_base: row.sku_base,
    category_id: row.category_id ?? null,
    base_price: row.base_price,
    client_id: row.client_id ?? null,
    client_stage_id: row.client_stage_id ?? null,
    description: row.description ?? '',
    is_active: row.is_active,
  }
  productError.value = ''
  productDialog.value = true
}
async function saveProduct(form) {
  savingProduct.value = true
  productError.value = ''
  try {
    if (editingProduct.value) {
      const { error } = await supabase.from('products').update(form).eq('id', editingProduct.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('products').insert(form)
      if (error) throw error
    }
    productDialog.value = false
    await fetchProducts()
  } catch (e) { productError.value = e.message }
  finally { savingProduct.value = false }
}

// ── Variant CRUD ──────────────────────────────────────────────────────────────
const variantDialog  = ref(false)
const editingVariant = ref(null)
const savingVariant  = ref(false)
const variantError   = ref('')
const variantForm    = ref({
  product_id: null, sku: '', size: '', color: '',
  price_modifier: 0, weight_grams: null, is_active: true,
})

function openVariantCreate() {
  editingVariant.value = null
  variantForm.value = {
    product_id: filterVariantProductId.value ?? null,
    sku: '', size: '', color: '',
    price_modifier: 0, weight_grams: null, is_active: true,
  }
  variantError.value = ''
  variantDialog.value = true
}
function openVariantEdit(row) {
  editingVariant.value = row
  variantForm.value = {
    product_id: row.product_id,
    sku: row.sku,
    size: row.size ?? '',
    color: row.color ?? '',
    price_modifier: row.price_modifier ?? 0,
    weight_grams: row.weight_grams ?? null,
    // barcode: row.barcode ?? null,
    is_active: row.is_active,
  }
  variantError.value = ''
  variantDialog.value = true
}
async function saveVariant(form) {
  savingVariant.value = true
  variantError.value = ''
  try {
    const payload = { ...form }
    if (editingVariant.value) {
      const { error } = await supabase.from('product_variants').update(payload).eq('id', editingVariant.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('product_variants').insert(payload)
      if (error) throw error
    }
    variantDialog.value = false
    await fetchVariants()
  } catch (e) { variantError.value = e.message }
  finally { savingVariant.value = false }
}

// ── Delete ────────────────────────────────────────────────────────────────────
const deleteDialog = ref(false)
const deleteTarget = ref(null)
const deletingRow  = ref(false)

function openProductDelete(row) { deleteTarget.value = { type: 'product', row }; deleteDialog.value = true }
function openVariantDelete(row) { deleteTarget.value = { type: 'variant', row }; deleteDialog.value = true }

async function confirmDelete() {
  if (!deleteTarget.value) return
  deletingRow.value = true
  const { type, row } = deleteTarget.value
  const table = type === 'product' ? 'products' : 'product_variants'
  const { error } = await supabase.from(table).delete().eq('id', row.id)
  if (!error) {
    deleteDialog.value = false
    if (type === 'product') { await fetchProducts(); await fetchVariants() }
    else await fetchVariants()
  }
  deletingRow.value = false
}
</script>

<style lang="scss">
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
        background: #0f0f11 !important;
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

.mz-filter-select.p-select {
  min-width: 200px;
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  background: #fff !important;
  font-size: 13px !important;
  box-shadow: none !important;
  &:hover { border-color: #d1d5db !important; }
  &.p-focus { border-color: #6366f1 !important; box-shadow: none !important; }
  .p-select-label { font-size: 13px !important; padding: 7px 10px !important; color: #374151 !important; }
}
</style>
