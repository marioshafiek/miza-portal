<template>
  <div class="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-gray-50 tw-p-8 tw-text-center">
    <div class="tw-w-24 tw-h-24 tw-rounded-3xl tw-bg-gray-100 tw-flex tw-items-center tw-justify-center tw-mb-6">
      <q-icon name="search_off" size="48px" class="tw-text-gray-400" />
    </div>
    <h1 class="tw-text-6xl tw-font-bold tw-text-gray-900 tw-mb-2">404</h1>
    <p class="tw-text-xl tw-font-semibold tw-text-gray-700 tw-mb-2">Page not found</p>
    <p class="tw-text-gray-400 tw-mb-8 tw-max-w-sm">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <q-btn unelevated color="primary" label="Go to Dashboard" icon="arrow_back" class="tw-rounded-xl" to="/" />
  </div>
</template>
