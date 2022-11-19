<template>
    <div class="list-container">
        <div v-if="list.length">
            <div v-for="quiz in list">
                quiz
            </div>
        </div>
        <div v-else>
            Brak quizów
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            list () {
                return this.$store.state.list;
            }
        }
    };
</script>

<style>
    .list-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
