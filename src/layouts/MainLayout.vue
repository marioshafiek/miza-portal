<template>
  <q-layout view="lHh Lpr lFf">

    <!-- ── Sidebar ──────────────────────────────────────────── -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="240"
      :breakpoint="768"
      bordered
      class="tw-bg-[#0f0f11] tw-border-r tw-border-white/[0.06]"
    >
      <div class="tw-flex tw-flex-col tw-h-full">

        <!-- Brand -->
        <div class="tw-flex tw-items-center tw-gap-2.5 tw-px-4 tw-pt-5 tw-pb-[18px] tw-border-b tw-border-white/[0.06]">
          <div class="tw-w-[34px] tw-h-[34px] tw-rounded-[9px] tw-bg-gradient-to-br tw-from-indigo-500 tw-to-violet-500 tw-flex tw-items-center tw-justify-center tw-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16.5 5.25V12.75L9 17L1.5 12.75V5.25L9 1Z" fill="white" fill-opacity=".9"/>
            </svg>
          </div>
          <div>
            <div class="tw-text-[15px] tw-font-bold tw-text-white tw-leading-[1.1] tw-tracking-tight">Miza</div>
            <div class="tw-text-[10px] tw-font-medium tw-text-white/35 tw-uppercase tw-tracking-[1px]">Portal</div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="tw-flex-1 tw-overflow-y-auto tw-px-3 tw-py-4 tw-space-y-5">
          <div>
            <div class="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[1.2px] tw-text-white/[0.22] tw-px-3 tw-mb-1.5">Main</div>
            <SidebarLink to="/" icon="pi pi-home" label="Dashboard" :exact="true" />
          </div>
          <div>
            <div class="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[1.2px] tw-text-white/[0.22] tw-px-3 tw-mb-1.5">Catalog</div>
            <SidebarLink to="/clients"    icon="pi pi-building" label="Clients" />
            <SidebarLink to="/categories" icon="pi pi-tag"      label="Categories" />
            <SidebarLink to="/products"   icon="pi pi-box"      label="Products" />
          </div>
          <div>
            <div class="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[1.2px] tw-text-white/[0.22] tw-px-3 tw-mb-1.5">Operations</div>
            <SidebarLink to="/inventory" icon="pi pi-warehouse"              label="Inventory" />
            <SidebarLink to="/orders"    icon="pi pi-receipt"                label="Orders" />
            <SidebarLink to="/transfers" icon="pi pi-arrow-right-arrow-left" label="Transfers" />
          </div>
          <div>
            <div class="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[1.2px] tw-text-white/[0.22] tw-px-3 tw-mb-1.5">Admin</div>
            <SidebarLink to="/users"    icon="pi pi-users" label="Users" />
            <SidebarLink to="/settings" icon="pi pi-cog"   label="Settings" />
          </div>
        </nav>

        <!-- User footer -->
        <div class="tw-flex tw-items-center tw-gap-2.5 tw-px-3 tw-pt-3.5 tw-pb-[18px] tw-border-t tw-border-white/[0.06]">
          <div class="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-gradient-to-br tw-from-indigo-500 tw-to-violet-500 tw-text-white tw-text-[13px] tw-font-bold tw-flex tw-items-center tw-justify-center tw-shrink-0">
            {{ (authStore.user?.email?.[0] ?? 'M').toUpperCase() }}
          </div>
          <div class="tw-flex-1 tw-min-w-0">
            <div class="tw-text-[12.5px] tw-font-semibold tw-text-gray-200 tw-truncate">{{ authStore.fullName || 'Mario Shafiek' }}</div>
            <div class="tw-text-[11px] tw-text-white/35 tw-truncate">{{ authStore.user?.email || 'admin@miza.io' }}</div>
          </div>
          <Button
            icon="pi pi-sign-out"
            text
            rounded
            severity="secondary"
            size="small"
            v-tooltip.top="'Logout'"
            class="mz-logout-btn"
            @click="handleLogout"
          />
        </div>

      </div>
    </q-drawer>

    <!-- ── Top Bar ───────────────────────────────────────────── -->
    <q-header class="tw-border-b tw-border-gray-200 tw-text-[#111]" style="background:#fafafa !important; box-shadow:none !important;">
      <div class="tw-flex tw-items-center tw-gap-1.5 tw-px-5 tw-h-[54px]">

        <!-- Mobile menu toggle -->
        <Button
          icon="pi pi-bars"
          text
          rounded
          severity="secondary"
          size="small"
          class="lg:tw-hidden"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div class="tw-flex-1" />

        <!-- Right actions -->
        <div class="tw-flex tw-items-center tw-gap-1">
          <Button
            icon="pi pi-bell"
            text
            rounded
            severity="secondary"
            size="small"
            class="mz-notif-btn"
            v-badge.danger="'3'"
          />
          <div @click="userSettingClicked($event)"
              class="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-gradient-to-br tw-from-indigo-500 tw-to-violet-500 tw-text-white tw-text-[13px] tw-font-bold tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-shrink-0"
              aria-haspopup="true" aria-controls="overlay_menu"
          >
            {{ (authStore.user?.email?.[0] ?? 'M').toUpperCase() }}
          </div>
          <Menu
            ref="menuRef"
            id="overlay_menu"
            :model="items"
            :popup="true"
            class="!tw-z-[10000] tw-mt-2"
          />
        </div>

      </div>
    </q-header>

    <!-- ── Page Content ───────────────────────────────────────── -->
    <q-page-container class="tw-bg-[#f5f5f7]">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import SidebarLink from 'components/layout/SidebarLink.vue'
import { useAuthStore } from 'stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const leftDrawerOpen = ref(false)
const menuRef = ref(null)

const items = ref([
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    command: () => router.push('/')
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => handleLogout()
  }
])

async function handleLogout() {
  await authStore.logout()
  router.push('/auth/login')
}

function userSettingClicked(event) {
  const menu = menuRef.value
  if (!menu) return
  if (typeof menu.toggle === 'function') return menu.toggle(event)
  if (typeof menu.show === 'function') return menu.show(event, event?.currentTarget)
}
</script>

<style lang="scss">
// Logout button — PrimeVue Button text+rounded on dark bg
.mz-logout-btn.p-button {
  width: 30px !important; height: 30px !important;
  color: #6b7280 !important;
  &:hover { background: rgba(255,255,255,.07) !important; color: #c9cdd4 !important; }
  .p-button-icon { font-size: 13px !important; }
}

// Topbar icon buttons
.mz-topbar .p-button.p-button-text.p-button-rounded {
  width: 34px !important; height: 34px !important;
  color: #6b7280 !important;
  &:hover { background: #f3f4f6 !important; color: #374151 !important; }
  .p-button-icon { font-size: 15px !important; }
}

// Notification badge position fix
.mz-notif-btn .p-badge {
  top: 4px !important; right: 4px !important;
  min-width: 14px !important; height: 14px !important;
  font-size: 9px !important; line-height: 14px !important;
}

// Page container min-height
.mz-page-container .q-page { min-height: calc(100vh - 54px) !important; }
</style>
