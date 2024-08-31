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
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Web/about_us" class="nav-link" active-class="active"
              >About Us</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/Web/contact_us" class="nav-link" active-class="active"
              >Contact Us</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No script needed for this component, since it's all template
</script>

<style scoped>
/* Add your styles here if needed */
</style>
