<template>
  <div class="mobile-splash">
    <div class="mobile-splash__card">
      <div class="mobile-splash__icon">
        <MizaLogo variant="icon" :size="64" />
      </div>

      <div class="mobile-splash__logo">
        <MizaLogo tone="dark" :size="22" />
      </div>

      <h1 class="mobile-splash__title">Desktop Only</h1>

      <p class="mobile-splash__message">
        This portal is optimized for desktop browsers.<br>
        Please open it on a computer for the best experience.
      </p>

      <div class="mobile-splash__divider"></div>

      <p class="mobile-splash__hint">
        <span class="mobile-splash__hint-icon">💡</span>
        Open this link on your laptop or desktop browser.
      </p>
    </div>
  </div>
</template>

<script setup>
import MizaLogo from 'components/brand/MizaLogo.vue'
</script>

<style scoped>
.mobile-splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #161412;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.mobile-splash__card {
  background: #1f1d1a;
  border: 1px solid rgba(245, 197, 24, 0.18);
  border-radius: 24px;
  padding: 40px 32px;
  max-width: 360px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 60px rgba(214, 38, 44, 0.18);
}

.mobile-splash__icon {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.mobile-splash__logo {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}

.mobile-splash__title {
  font-family: 'Baloo 2', ui-sans-serif, system-ui, sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #fbfaf8;
  margin: 0 0 14px;
  line-height: 1.15;
}

.mobile-splash__message {
  font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  color: rgba(251, 250, 248, 0.6);
  line-height: 1.65;
  margin: 0 0 24px;
}

.mobile-splash__divider {
  height: 1px;
  background: rgba(245, 197, 24, 0.15);
  margin: 0 0 20px;
}

.mobile-splash__hint {
  font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  color: rgba(251, 250, 248, 0.45);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.mobile-splash__hint-icon {
  font-size: 15px;
}
</style>
