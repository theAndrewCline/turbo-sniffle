<template>
  <div>
    <input class="border border-solid rounded px-5 py-2" v-model="authorName" />
    <button class="submit-btn" @click="addAuthor">
      Submit
    </button>
  </div>
</template>

<style>
.submit-btn {
  @apply bg-orange-300 px-5 py-2 mt-2 rounded;
}
</style>

<script lang="js">
import Vue from 'vue'
import gql from 'graphql-tag'

const ADD_AUTHOR = gql`
  mutation($name: String!) {
    createAuthor(name: $name) {
      _id
      name
    }
  }
`

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
        authorName: ''
      }
    },
    methods: {
      addAuthor() {
        const authorName = this.authorName

        this.$emit('submit-author')

        this.authorName = ''

        this.$apollo.mutate({
          mutation: ADD_AUTHOR,
          variables: {
            name: authorName
          },
          update(store, { data: { createAuthor } }) {
            const data = store.readQuery({ query: GET_AUTHORS })
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
    }
  })
</script>
