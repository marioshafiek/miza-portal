import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from 'src/utils/supabase'

export const useAuthStore = defineStore('auth', () => {
  // ── State ──────────────────────────────────────────────────
  const user = ref(null)
  const session = ref(null)

  // ── Getters ────────────────────────────────────────────────
  const isAuthenticated = computed(() => !!session.value)
  const fullName = computed(() =>
    user.value?.user_metadata
      ? `${user.value.user_metadata.first_name ?? ''} ${user.value.user_metadata.last_name ?? ''}`.trim()
      : user.value?.email ?? ''
  )

  // ── Actions ────────────────────────────────────────────────
  async function signUp(email, password, firstName, lastName, role) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName, role: role, source: 'admin' } }
    })
    if (error) throw error
    return data
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    session.value = data.session
    user.value = data.user
  }

  async function logout() {
    await supabase.auth.signOut()
    session.value = null
    user.value = null
  }

  async function init() {
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user ?? null

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })
  }

  function setUser(userData) {
    user.value = userData
  }

  return { user, session, isAuthenticated, fullName, signUp, login, logout, init, setUser }
})
