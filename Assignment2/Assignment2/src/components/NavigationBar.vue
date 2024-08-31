<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Web/about_us" class="nav-link">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Web/contact_us" class="nav-link">Contact Us</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link to="/auth/login" class="btn btn-primary me-2">Login</router-link>
          <router-link to="/auth/signup" class="btn btn-primary">Sign Up</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 这里可以根据需要加入对应的逻辑代码
</script>

<style scoped>
/* 可以根据需要在这里加入额外的样式 */
</style>
