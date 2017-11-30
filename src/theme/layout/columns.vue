<template>
    <div class="columns is-gapless is-multiline">
        <div class="column is-half" v-for="post in posts" :key="post.id"  v-on:click="displayContent(post.url, $event)">
            <app-post :imageURL="post.urlToImage">
                <h3 slot="title">{{ post.title }}</h3>
                <p slot="content" v-html="post.description"></p>
            </app-post>
        </div>
    </div>
</template>
<script scoped>
    import Post from '../components/card.vue'
    import { mapGetters } from 'vuex'
    export default {
      components: {
        'app-post': Post
      },
      computed: {
        ...mapGetters('postModule', ['posts'])
      },
      methods: {
        loadPosts () {
          let postId = this.$route.params.id
          this.$store.dispatch('postModule/updateColumn', postId)
        }
      },
      watch: {
        '$route' (to, from) {
          this.loadPosts()
        }
      },
      created () {
        this.loadPosts()
      }
    }
</script>
<style scoped>
    .column {
        height: 15em;
    }
</style>