<template>
  <q-page class="tw-bg-gray-50 dark:tw-bg-dark-page">
    <div class="tw-flex tw-items-center tw-justify-center">
      <div>Dashboard</div>
    </div>
  </q-page>
</template>

<script setup>
  import { supabase } from '../utils/supabase'
  import { ref, onMounted } from 'vue'
  const users = ref([])

  async function getTodos() {
    const { data } = await supabase.from('categories').select()
    users.value = data
  }

  onMounted(() => {
    getTodos()
  })

</script>
