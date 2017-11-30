<template>
    <div class="card" v-bind:style="{ backgroundImage: 'url(' + imageURL + ')' }">
        <div class="card-content">
            <slot name="title"></slot>
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
      props: ['imageURL']
    }
</script>
<style scoped>
    .card {
        height: 100%;
        background-position: center;
        background-size: cover;
    }
    .card-content {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.4);
        transition: all 0.2s ease-out;
        height: 35%;
    }
    .card.active-card .card-content {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .card-content > * {
        color: white;
    }
    .card-content > p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .card.active-card .card-content > p {
        white-space: normal;
    }

</style>