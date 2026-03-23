<template>
  <div class="tw-w-full tw-max-w-[400px] tw-bg-white tw-rounded-[20px] tw-border tw-border-gray-200 tw-shadow-[0_8px_40px_-8px_rgba(0,0,0,.1),0_0_0_1px_rgba(0,0,0,.03)] tw-overflow-hidden">

    <!-- Header -->
    <div class="tw-flex tw-flex-col tw-items-center tw-text-center tw-px-8 tw-pt-9 tw-pb-7 tw-border-b tw-border-gray-100 tw-bg-[#fafafa]">
      <div class="tw-w-10 tw-h-10 tw-rounded-[11px] tw-bg-gradient-to-br tw-from-indigo-500 tw-to-violet-500 tw-flex tw-items-center tw-justify-center tw-mb-3.5">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M9 1L16.5 5.25V12.75L9 17L1.5 12.75V5.25L9 1Z" fill="white" fill-opacity=".9"/>
        </svg>
      </div>
      <h2 class="tw-text-[18px] tw-font-extrabold tw-text-[#0f0f11] tw-tracking-tight tw-mb-1">Create an account</h2>
      <p class="tw-text-[13px] tw-text-gray-400">Sign up for your Miza account.</p>
    </div>

    <!-- Form -->
    <form class="tw-flex tw-flex-col tw-gap-4 tw-px-8 tw-pt-7 tw-pb-8" @submit.prevent="handleSignUp">

      <!-- First + Last name -->
      <div class="tw-flex tw-gap-3">
        <div class="tw-flex tw-flex-col tw-gap-1.5 tw-flex-1">
          <label class="tw-text-[12.5px] tw-font-semibold tw-text-gray-700">First name</label>
          <InputText
            v-model="form.firstName"
            placeholder="Mario"
            class="mz-input mz-input--no-icon"
          />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-1.5 tw-flex-1">
          <label class="tw-text-[12.5px] tw-font-semibold tw-text-gray-700">Last name</label>
          <InputText
            v-model="form.lastName"
            placeholder="Shafiek"
            class="mz-input mz-input--no-icon"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="tw-flex tw-flex-col tw-gap-1.5">
        <label class="tw-text-[12.5px] tw-font-semibold tw-text-gray-700">Email address</label>
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            class="mz-input"
          />
        </IconField>
      </div>

      <!-- Password -->
      <div class="tw-flex tw-flex-col tw-gap-1.5">
        <label class="tw-text-[12.5px] tw-font-semibold tw-text-gray-700">Password</label>
        <IconField>
          <InputIcon class="pi pi-lock" />
          <InputText
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Min. 6 characters"
            autocomplete="new-password"
            class="mz-input"
          />
          <InputIcon
            :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
            class="mz-eye-icon"
            @click="showPassword = !showPassword"
          />
        </IconField>
      </div>

      <!-- Role -->
      <div class="tw-flex tw-flex-col tw-gap-1.5">
        <label class="tw-text-[12.5px] tw-font-semibold tw-text-gray-700">Role</label>
        <Select
          v-model="form.role"
          :options="roleOptions"
          option-label="label"
          option-value="value"
          placeholder="Select a role"
          class="mz-select"
        >
          <template #prefix><i class="pi pi-id-card" style="font-size:13px;color:#9ca3af" /></template>
        </Select>
      </div>

      <!-- Error / Success -->
      <Transition name="mz-fade">
        <div v-if="error" class="tw-flex tw-items-center tw-gap-2 tw-px-3.5 tw-py-2.5 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-[10px] tw-text-[13px] tw-text-red-600">
          <i class="pi pi-exclamation-circle" />
          {{ error }}
        </div>
      </Transition>
      <Transition name="mz-fade">
        <div v-if="success" class="tw-flex tw-items-center tw-gap-2 tw-px-3.5 tw-py-2.5 tw-bg-emerald-50 tw-border tw-border-emerald-200 tw-rounded-[10px] tw-text-[13px] tw-text-emerald-600">
          <i class="pi pi-check-circle" />
          {{ success }}
        </div>
      </Transition>

      <!-- Submit -->
      <Button
        type="submit"
        label="Create account"
        :loading="loading"
        class="mz-auth-submit"
      />

      <p class="tw-text-center tw-text-[13px] tw-text-gray-400">
        Already have an account?
        <router-link to="/auth/login" class="tw-text-indigo-500 tw-font-semibold tw-no-underline hover:tw-underline">Sign in</router-link>
      </p>

    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from 'stores/auth'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const authStore = useAuthStore()
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const roleOptions = [
  { label: 'Super Admin',       value: 'super_admin' },
  { label: 'Admin',             value: 'admin' },
  { label: 'Warehouse Manager', value: 'warehouse_manager' },
  { label: 'Factory Staff',     value: 'factory_staff' },
  { label: 'Cashier',           value: 'cashier' },
  { label: 'Customer',          value: 'customer' },
]

const form = reactive({ firstName: '', lastName: '', email: '', password: '', role: '' })

async function handleSignUp() {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await authStore.signUp(form.email, form.password, form.firstName, form.lastName, form.role)
    success.value = 'Account created! Check your email to confirm your account.'
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
// Input without leading icon — full-width padding
.mz-input--no-icon.p-inputtext {
  padding-left: 12px !important;
}

// Select inside auth
.mz-select.p-select {
  width: 100%;
  border-radius: 9px !important;
  border: 1.5px solid #e5e7eb !important;
  background: #f9fafb !important;
  box-shadow: none !important;
  font-size: 13.5px !important;
  &:hover { border-color: #d1d5db !important; }
  &.p-focus { border-color: #6366f1 !important; background: #fff !important; box-shadow: none !important; }
  .p-select-label { font-size: 13.5px !important; color: #111 !important; padding: 10px 12px !important; }
}
</style>
