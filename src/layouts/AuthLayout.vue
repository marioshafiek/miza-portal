<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="tw-min-h-screen tw-flex">

        <!-- Left Panel — Branding -->
        <div class="tw-hidden lg:tw-flex tw-flex-col tw-justify-between tw-w-1/2 tw-p-12 tw-bg-[#0f0f11] tw-shrink-0">
          <div class="tw-flex tw-items-center tw-gap-2.5">
            <div class="tw-w-9 tw-h-9 tw-rounded-[10px] tw-bg-gradient-to-br tw-from-indigo-500 tw-to-violet-500 tw-flex tw-items-center tw-justify-center tw-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L16.5 5.25V12.75L9 17L1.5 12.75V5.25L9 1Z" fill="white" fill-opacity=".9"/>
              </svg>
            </div>
            <span class="tw-text-[17px] tw-font-bold tw-text-white tw-tracking-tight">Miza Portal</span>
          </div>

          <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-py-16">
            <h1 class="tw-text-[36px] tw-font-extrabold tw-text-white tw-leading-tight tw-tracking-tight tw-mb-4">
              Miza Uniform<br />with confidence.<br /><span class="tw-text-lg tw-font-medium tw-text-white/70">Empowering your school’s success.</span>
            </h1>
            <p class="tw-text-[15px] tw-text-white/45 tw-leading-[1.7]">
              A unified platform for all your admin needs — clients, inventory, orders, and more.
            </p>
          </div>

          <p class="tw-text-xs tw-text-white/20">© 2026 Miza. All rights reserved.</p>
        </div>

        <!-- Right Panel — Form -->
        <div class="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-py-8 tw-px-6 tw-bg-[#f5f5f7]">
          <router-view />
        </div>

      </div>
    </q-page-container>
  </q-layout>
</template>
