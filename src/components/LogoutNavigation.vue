<template>
    <div>
        <nav>
            <div class="item" :active="activeNav === 'rejestracja'" @click="navTo('rejestracja')">UTWÓRZ KONTO</div>
            <div>|</div>
            <div class="item" :active="activeNav === 'logowanie'" @click="navTo('logowanie')">ZALOGUJ SIĘ</div>
        </nav>
    </div>
</template>

<script>
    export default {
        methods: {
            navTo (name) {
                this.$store.commit('setNav', name);
            }
        },
        computed: {
            activeNav () {
                return this.$store.state.activeNav
            }
        }
    };
</script>

<style>
    nav {
        display: flex;
        width: 400px;
        justify-content: center;
        padding: 0 24px 60px;
        border-bottom: 1px solid black;
        margin-bottom: 32px;
    }

    nav > div {
        margin: 0 16px;
    }

    .item {
        cursor: pointer;
    }

    .item[active] {
        text-decoration: underline;
    }
</style>
