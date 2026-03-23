<template>
  <div class="mobile-splash">
    <div class="mobile-splash__card">
      <div class="mobile-splash__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="4" width="32" height="56" rx="4" stroke="#6366f1" stroke-width="3" fill="none"/>
          <line x1="20" y1="52" x2="28" y2="52" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
          <rect x="28" y="20" width="28" height="20" rx="3" fill="#6366f1" opacity="0.15" stroke="#6366f1" stroke-width="2.5"/>
          <line x1="33" y1="25" x2="51" y2="25" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
          <line x1="33" y1="30" x2="47" y2="30" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
          <line x1="33" y1="35" x2="44" y2="35" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="mobile-splash__logo">Miza</div>

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
// No logic needed — purely presentational
</script>

<style scoped>
.mobile-splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0f0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.mobile-splash__card {
  background: #1a1a2e;
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: 20px;
  padding: 40px 32px;
  max-width: 360px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 60px rgba(99, 102, 241, 0.12);
}

.mobile-splash__icon {
  margin-bottom: 16px;
}

.mobile-splash__icon svg {
  width: 64px;
  height: 64px;
  margin: 0 auto;
}

.mobile-splash__logo {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6366f1;
  margin-bottom: 20px;
}

.mobile-splash__title {
  font-size: 24px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 14px;
  line-height: 1.2;
}

.mobile-splash__message {
  font-size: 15px;
  color: #94a3b8;
  line-height: 1.65;
  margin: 0 0 24px;
}

.mobile-splash__divider {
  height: 1px;
  background: rgba(99, 102, 241, 0.15);
  margin: 0 0 20px;
}

.mobile-splash__hint {
  font-size: 13px;
  color: #64748b;
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
