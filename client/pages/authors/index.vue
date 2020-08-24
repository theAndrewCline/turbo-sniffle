<template>
  <div>
    <ul>
      <li v-for="author in authors" :key="author._id" class="author">
        {{ author.name }}
      </li>
    </ul>

    <button class="add-btn" @click="toggleAddAuthor">+</button>
      <AddAuthor v-if="addAuthorForm" v-on:submit-author="submitAuthor"/>
    </div>
  </div>
</template>

<style>
.author {
  @apply text-2xl font-bold;
}

.add-btn {
  @apply text-2xl font-bold bg-orange-300 px-5 py-2 mt-2 rounded-full;
}
</style>

<script lang="js">
import Vue from 'vue'
import gql from 'graphql-tag'

const GET_AUTHORS = gql`
  query {
    authors {
      _id
      name
    }
  }
`

export default Vue.extend({
  data() {
    return {
      addAuthorForm: false
    }
  },
  methods: {
    toggleAddAuthor() {
      this.addAuthorForm = !this.addAuthorForm
    },
    submitAuthor() {
      this.addAuthorForm = false
    }
  },
  apollo: {
    authors: {
      query: GET_AUTHORS
    }
  }
})
</script>
