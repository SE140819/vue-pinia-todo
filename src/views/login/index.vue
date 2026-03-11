<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left side: Illustration -->
      <div class="illustration-section">
        <div class="illustration-wrapper">
          <img src="/assets/login-illustration.png" alt="Engagement Illustration" class="main-img" />
          <div class="bg-blur"></div>
        </div>
      </div>

      <!-- Right side: Form -->
      <div class="form-section">
        <div class="form-wrapper">
          <!-- Logo -->
          <div class="logo-container">
            <svg class="logo-svg" viewBox="0 0 100 100" width="40" height="40">
              <path d="M10 20 L90 20 L60 80 L10 80 Z" fill="#2d5a9e" />
              <path d="M40 20 L90 20 L60 80 L40 80 Z" fill="#1e3a63" />
            </svg>
            <div class="logo-text">
              <span class="brand">FASTBOY</span>
              <span class="sub-brand">Marketing</span>
              <span class="product">Social Automation</span>
            </div>
          </div>

          <div class="header-text">
            <h1>Welcome to Social Automation Tool</h1>
            <p>Login to access your account</p>
          </div>

          <el-form :model="loginForm" class="custom-form">
            <div class="input-group">
              <label>Email</label>
              <el-input 
                v-model="loginForm.email" 
                placeholder="Enter email" 
                class="premium-input"
              />
            </div>

            <div class="input-group">
              <label>Password</label>
              <el-input 
                v-model="loginForm.password" 
                type="password" 
                placeholder="Enter your password" 
                show-password
                class="premium-input"
              />
            </div>

            <div class="form-actions">
              <el-checkbox v-model="rememberMe">Remember me</el-checkbox>
              <a href="#" class="forgot-link">Forgot Password</a>
            </div>

            <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">
              Login
            </el-button>
          </el-form>

          <p class="signup-text">
            Don't have an account? <a href="#">Sign up</a>
          </p>

          <div class="divider">
            <span>Or continue with</span>
          </div>

          <div class="social-login">
            <div class="google-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
            </div>
          </div>

          <div class="footer-links">
            <a href="#">Terms Of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const rememberMe = ref(false)
const loginForm = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  if (!loginForm.email || !loginForm.password) {
    ElMessage.warning('Vui lòng nhập đầy đủ thông tin')
    return
  }

  loading.value = true
  // We use our refactored store (which uses authApi)
  const success = authStore.login(loginForm.email, loginForm.password)
  
  setTimeout(() => {
    loading.value = false
    if (success) {
      ElMessage.success('Đăng nhập thành công')
      router.push('/')
    } else {
      ElMessage.error('Sai tài khoản hoặc mật khẩu')
    }
  }, 800)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  margin: 20px;
}

/* Illustration Section */
.illustration-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  display: none; /* Hidden on mobile */
}

@media (min-width: 1024px) {
  .illustration-section {
    display: flex;
  }
}

.illustration-wrapper {
  position: relative;
  z-index: 1;
}

.main-img {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.bg-blur {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(162, 137, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

/* Form Section */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-wrapper {
  width: 100%;
  max-width: 440px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #1e3a63;
  letter-spacing: 1px;
}

.sub-brand {
  font-size: 14px;
  font-weight: 600;
  color: #444;
}

.product {
  font-size: 12px;
  color: #666;
}

.header-text h1 {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.header-text p {
  color: #888;
  margin-bottom: 32px;
  font-size: 14px;
}

/* Custom Form Styles */
.input-group {
  margin-bottom: 24px;
  position: relative;
}

.input-group label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: #fff;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  z-index: 2;
}

:deep(.premium-input .el-input__wrapper) {
  height: 48px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  transition: all 0.3s;
}

:deep(.premium-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #2d5a9e inset !important;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forgot-link {
  font-size: 13px;
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 600;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: #3563a3;
  border: none;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 24px;
}

.login-btn:hover {
  background-color: #2d5a9e;
}

.signup-text {
  text-align: center;
  font-size: 13px;
  color: #888;
  margin-bottom: 24px;
}

.signup-text a {
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 600;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #eee;
}

.divider span {
  padding: 0 10px;
  font-size: 12px;
  color: #aaa;
}

.social-login {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.google-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.google-btn:hover {
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.google-btn img {
  width: 24px;
  height: 24px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  font-size: 12px;
  color: #666;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}

.footer-links a:hover {
  color: #333;
  border-bottom: 1px solid #333;
}
</style>