<template>
  <nav class="nav">
    <router-link to="/">
      <h1 class="logo">Read Well</h1>
    </router-link>
  </nav>
</template>

<script lang="js"></script>

<style scoped>
.nav {
  @apply w-full h-12 bg-blue-900 border-b-2 border-solid border-orange-400 flex items-center;
}

.logo {
  @apply font-bold text-2xl ml-2 text-gray-200;
}
</style>
