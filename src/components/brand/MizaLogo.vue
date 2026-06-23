<template>
  <!-- ── Icon-only (rounded pill / app tile) ──────────────────────────────── -->
  <svg
    v-if="variant === 'icon'"
    :height="size"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Miza"
    :style="{ height: typeof size === 'number' ? size + 'px' : size, width: 'auto' }"
  >
    <rect x="0" y="0" width="200" height="200" :rx="44" :fill="tile" />
    <path
      :fill="swoosh"
      d="M58 64 Q58 48 78 48 L138 48 Q160 48 160 68 Q160 82 148 92 L96 134 L140 134 Q160 134 160 154 Q160 152 140 152 L62 152 Q40 152 40 132 Q40 118 52 108 L104 66 L78 66 Q58 66 58 64 Z"
    />
  </svg>

  <!-- ── Primary wordmark ─────────────────────────────────────────────────── -->
  <svg
    v-else
    viewBox="0 0 600 220"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Miza"
    :style="{ height: typeof size === 'number' ? size + 'px' : size, width: 'auto' }"
  >
    <!-- M -->
    <path
      :fill="letter"
      d="M20 200 L20 44 Q20 20 46 20 Q62 20 70 36 L96 94 Q100 108 104 94 L130 36 Q138 20 154 20 Q180 20 180 44 L180 200 Q180 200 154 200 Q140 200 140 182 L140 100 Q140 90 132 104 L114 138 Q106 154 100 154 Q94 154 86 138 L68 104 Q60 90 60 100 L60 182 Q60 200 46 200 Z"
    />
    <!-- i stem + dot -->
    <rect :fill="letter" x="210" y="64" width="40" height="136" rx="20" />
    <circle :fill="swoosh" cx="230" cy="30" r="22" />
    <!-- Z gold swoosh -->
    <path
      :fill="swoosh"
      transform="translate(-34,0)"
      d="M300 56 Q300 38 320 38 L470 38 Q492 38 492 56 Q492 70 480 80 L372 162 L474 162 Q494 162 494 182 Q494 200 474 200 L318 200 Q296 200 296 182 Q296 168 308 158 L416 76 L322 76 Q300 76 300 56 Z"
    />
    <!-- A -->
    <path
      :fill="letter"
      transform="translate(-78,0)"
      d="M512 200 Q500 200 504 188 L546 44 Q552 20 572 20 Q592 20 598 44 L640 188 Q644 200 632 200 Q618 200 614 186 L606 158 L538 158 L530 186 Q526 200 512 200 Z M551 120 L593 120 L578 70 Q572 56 566 70 Z"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 'wordmark' (default) | 'icon'
  variant: { type: String, default: 'wordmark' },
  // height in px (number) or any CSS length (string)
  size: { type: [Number, String], default: 28 },
  // 'light' (on light bg) | 'dark' (on dark bg) — controls letter color
  tone: { type: String, default: 'light' },
})

// On light → red letters; on dark → white letters. Z/dot stay gold. (brand §4)
const letter = computed(() => (props.tone === 'dark' ? '#FFFFFF' : '#D6262C'))
const swoosh = '#F5C518'
// Icon tile uses Miza red background
const tile = '#D6262C'
</script>
