<template>
  <Transition name="fade">
    <div v-if="show" class="app-splash">
      <div class="splash-content">
        <div class="logo-wrapper animate-pulse">
          <!-- Mock Logo - replace with actual if needed -->
          <div class="logo-circle">
            <span class="logo-text">FB</span>
          </div>
        </div>
        <div class="loading-bar-container">
          <div class="loading-bar"></div>
        </div>
        <p class="loading-hint">Initializing Social Automation...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(true)

onMounted(() => {
  // Simulate initial load sequence
  setTimeout(() => {
    show.value = false
  }, 2000)
})
</script>


<style lang="scss" scoped>
@use "@/assets/styles/variables" as vars;

.app-splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: #f8fbff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.splash-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.logo-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3563a3 0%, #1e3a63 100%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 40px rgba(30, 58, 99, 0.2);
  animation: logo-morph 4s ease-in-out infinite;
}

.logo-text {
  color: #fff;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
}

.loading-bar-container {
  width: 200px;
  height: 4px;
  background-color: #e6eefb;
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar {
  width: 0%;
  height: 100%;
  background-color: #3563a3;
  animation: load 2s ease-in-out forwards;
}

.loading-hint {
  font-size: 13px;
  color: #8da2bd;
  font-weight: 500;
}

@keyframes logo-morph {
  0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
}

@keyframes load {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

.fade-leave-active {
  transition: opacity 0.8s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
