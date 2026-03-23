import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // ── State ──────────────────────────────────────────────────
  const sidebarOpen = ref(true)
  const darkMode = ref(false)
  const globalLoading = ref(false)

  // ── Actions ────────────────────────────────────────────────
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  function setLoading(val) {
    globalLoading.value = val
  }

  return { sidebarOpen, darkMode, globalLoading, toggleSidebar, toggleDarkMode, setLoading }
})
