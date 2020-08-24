<template>
  <div>
    <router-link to="/authors">
      <button
        class="transition duration-500 ease-in-out bg-blue-300 hover:bg-blue-400 rounded p-4 m-2 text-lg shadow-lg hover:shadow-xl"
      >
        Search By Author
      </button>
    </router-link>

    <router-link to="/books">
      <button
        class="transition duration-500 ease-in-out bg-orange-300 hover:bg-orange-400 rounded p-4 m-2 text-lg shadow-lg hover:shadow-xl"
      >
        Search By Title
      </button>
    </router-link>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style>
.container {
  @apply;
}
</style>
