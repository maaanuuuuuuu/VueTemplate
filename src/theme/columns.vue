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
    import Post from './post.vue'
    import { mapGetters } from 'vuex'
    export default {
      components: {
        'app-post': Post
      },
      computed: {
        ...mapGetters('postModule', ['posts'])
      },
      methods: {
        debug (param) {
          console.log(param)
        },
        loadPosts () {
          let postId = this.$route.params.id
          console.log('postId=' + postId)
          this.$store.dispatch('postModule/updateColumn', postId)
        },
        displayContent (theURL, event) {
          this.debug(this)
          this.debug(theURL)
          this.debug(event)
          this.debug(event.target) // add active-card class but to which element ?
        }
      },
      watch: {
        '$route' (to, from) {
          this.debug('changed to ' + this.$route.params.id)
          this.loadPosts()
        }
      },
      created () {
        this.debug('created')
        this.loadPosts()
      }
    }
</script>
<style scoped>
    .column {
        height: 15em;
    }
</style>