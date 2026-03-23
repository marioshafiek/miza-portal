<template>
  <div class="tw-w-full tw-max-w-[400px] tw-bg-white tw-rounded-[20px] tw-border tw-border-gray-200 tw-shadow-[0_8px_40px_-8px_rgba(0,0,0,.1),0_0_0_1px_rgba(0,0,0,.03)] tw-overflow-hidden">

    <!-- Header -->
    <div class="tw-flex tw-flex-col tw-items-center tw-text-center tw-px-8 tw-pt-9 tw-pb-7 tw-border-b tw-border-gray-100 tw-bg-[#fafafa]">
      <div class="tw-w-10 tw-h-10 tw-rounded-[11px] tw-bg-gradient-to-br tw-from-indigo-500 tw-to-violet-500 tw-flex tw-items-center tw-justify-center tw-mb-3.5">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M9 1L16.5 5.25V12.75L9 17L1.5 12.75V5.25L9 1Z" fill="white" fill-opacity=".9"/>
        </svg>
      </div>
      <h2 class="tw-text-[18px] tw-font-extrabold tw-text-[#0f0f11] tw-tracking-tight tw-mb-1">Welcome back</h2>
      <p class="tw-text-[13px] tw-text-gray-400">Sign in to your Miza account.</p>
    </div>

    <!-- Form -->
    <form class="tw-flex tw-flex-col tw-gap-4 tw-px-8 tw-pt-7 tw-pb-8" @submit.prevent="handleLogin">

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
            placeholder="••••••••"
            autocomplete="current-password"
            class="mz-input"
          />
          <InputIcon
            :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
            class="mz-eye-icon"
            @click="showPassword = !showPassword"
          />
        </IconField>
      </div>

      <!-- Remember + Forgot -->
      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-flex tw-items-center tw-gap-2">
          <Checkbox v-model="form.remember" binary input-id="remember" />
          <label for="remember" class="tw-text-[13px] tw-text-gray-700 tw-cursor-pointer">Remember me</label>
        </div>
        <a href="#" class="tw-text-[13px] tw-text-indigo-500 tw-font-semibold tw-no-underline hover:tw-underline">Forgot password?</a>
      </div>

      <!-- Error -->
      <Transition name="mz-fade">
        <div v-if="error" class="tw-flex tw-items-center tw-gap-2 tw-px-3.5 tw-py-2.5 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-[10px] tw-text-[13px] tw-text-red-600">
          <i class="pi pi-exclamation-circle" />
          {{ error }}
        </div>
      </Transition>

      <!-- Submit -->
      <Button
        type="submit"
        label="Sign in"
        :loading="loading"
        class="mz-auth-submit"
      />

    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Checkbox from 'primevue/checkbox'

const router = useRouter()
const authStore = useAuthStore()
const showPassword = ref(false)
const loading = ref(false)
const form = reactive({ email: '', password: '', remember: false })
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.email, form.password)
    router.push('/')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
// InputText inside auth
.mz-input.p-inputtext {
  width: 100%;
  font-size: 13.5px !important;
  font-family: 'Inter', sans-serif !important;
  border-radius: 9px !important;
  border: 1.5px solid #e5e7eb !important;
  background: #f9fafb !important;
  color: #111 !important;
  padding: 10px 12px 10px 36px !important;
  box-shadow: none !important;
  transition: border-color .15s, background .15s;
  &::placeholder { color: #c4c9d4 !important; }
  &:focus { border-color: #6366f1 !important; background: #fff !important; box-shadow: none !important; }
}

// Eye toggle icon
.mz-eye-icon {
  cursor: pointer !important;
  color: #9ca3af !important;
  &:hover { color: #374151 !important; }
}

// Checkbox — filled indigo
.p-checkbox .p-checkbox-box {
  border-radius: 5px !important;
  border: 1.5px solid #e5e7eb !important;
  &.p-highlight {
    background: #6366f1 !important;
    border-color: #6366f1 !important;
  }
}

// Submit button — filled indigo, no border
.mz-auth-submit.p-button {
  width: 100%;
  background: #6366f1 !important;
  border: none !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  padding: 12px !important;
  &:hover:not(:disabled) { background: #4f52e0 !important; }
  &:disabled { opacity: .6; }
}

// Transition
.mz-fade-enter-active, .mz-fade-leave-active { transition: opacity .2s, transform .2s; }
.mz-fade-enter-from, .mz-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
