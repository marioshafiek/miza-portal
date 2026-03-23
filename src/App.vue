<template>
  <MobileSplash v-if="isMobile" />
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MobileSplash from 'src/components/MobileSplash.vue'

const MOBILE_BREAKPOINT = 1024

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
