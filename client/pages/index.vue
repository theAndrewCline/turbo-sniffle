<template>
  <div class="container">
    <div>
      <ul>
        <li v-for="author in authors" :key="author._id" class="author">
          {{ author.name }}
        </li>
      </ul>
      <button class="add-btn" @click="toggleAddAuthor">+</button>
      <div v-if="addAuthorForm">
        <input
          class="border border-solid rounded px-5 py-2"
          v-model="authorName"
        />
        <button class="submit-btn" @click="addAuthor">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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

const ADD_AUTHOR = gql`
  mutation($name: String!) {
    createAuthor(name: $name) {
      _id
      name
    }
  }
`

export default Vue.extend({
  data() {
    return {
      addAuthorForm: false,
      authorName: ''
    }
  },
  methods: {
    toggleAddAuthor() {
      this.addAuthorForm = !this.addAuthorForm
    },
    addAuthor() {
      const authorName = this.authorName

      this.addAuthorForm = false
      this.authorName = ''

      this.$apollo.mutate({
        mutation: ADD_AUTHOR,
        variables: {
          name: authorName
        },
        update(store, { data: { createAuthor } }) {
          const data = store.readQuery({ query: GET_AUTHORS })
          console.log(createAuthor, data)

          data.authors.push(createAuthor)
          store.writeQuery({ query: GET_AUTHORS }, data)
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createAuthor: {
            __typename: 'Author',
            _id: '-1',
            name: authorName
          }
        }
      })
    }
  },
  apollo: {
    authors: GET_AUTHORS
  }
})
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}

.author {
  @apply text-2xl font-bold;
}

.add-btn {
  @apply text-2xl font-bold bg-green-400 px-5 py-2 mt-2 rounded-full;
}

.submit-btn {
  @apply bg-green-400 px-5 py-2 mt-2 rounded;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
