<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="tw-min-h-screen tw-flex">

        <!-- Left Panel — Branding -->
        <div class="tw-hidden lg:tw-flex tw-flex-col tw-justify-between tw-w-1/2 tw-p-12 tw-bg-miza-ink tw-shrink-0 tw-relative tw-overflow-hidden">
          <!-- soft gold glow accent -->
          <div class="tw-pointer-events-none tw-absolute tw--top-24 tw--right-24 tw-w-80 tw-h-80 tw-rounded-full tw-bg-miza-gold/10 tw-blur-3xl"></div>
          <div class="tw-pointer-events-none tw-absolute tw--bottom-32 tw--left-20 tw-w-96 tw-h-96 tw-rounded-full tw-bg-miza-red/20 tw-blur-3xl"></div>

          <div class="tw-flex tw-items-center tw-gap-3 tw-relative">
            <MizaLogo variant="icon" :size="36" />
            <MizaLogo tone="dark" :size="22" />
          </div>

          <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-py-16 tw-relative">
            <h1 class="tw-font-display tw-text-[40px] tw-font-extrabold tw-text-white tw-leading-[1.1] tw-mb-4">
              Outfit every school<br />with confidence.
            </h1>
            <p class="tw-text-[15px] tw-text-white/55 tw-leading-[1.7] tw-max-w-md">
              A unified platform for all your admin needs — clients, inventory, orders, and more.
            </p>
          </div>

          <p class="tw-text-xs tw-text-white/25 tw-relative">© 2026 Miza. All rights reserved.</p>
        </div>

        <!-- Right Panel — Form -->
        <div class="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-py-8 tw-px-6 tw-bg-miza-paper">
          <router-view />
        </div>

      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MizaLogo from 'components/brand/MizaLogo.vue'
</script>
