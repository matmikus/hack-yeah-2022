<template>
    <div class="new-container">nowy</div>
</template>

<script>
    import axios from 'axios';

    export default {
        data () {
            return {
                searchResults: []
            };
        },
        methods: {
            search (phrase) {
                axios.get(`/api?q=${phrase}`).then((res) => {
                    console.log(res);
                });
            }
        }
    };
</script>

<style>
    .new-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
