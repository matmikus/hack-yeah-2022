<template>
    <div>
        <div class="form" v-if="activeNav === 'rejestracja'" v-once>
            <div class="heading">Utwórz konto</div>
            <label for="name">Nazwa użytkownika</label>
            <input name="name" type="text">
            <label for="password">Hasło</label>
            <input name="password" type="password">
            <label for="password2">Powtórz hasło</label>
            <input name="password2" type="password">
            <button @click="onSignInClick">Utwórz</button>
        </div>
        <div class="form" v-if="activeNav === 'logowanie'" v-once>
            <div class="heading">Zaloguj się</div>
            <label for="login-name">Nazwa użytkownika</label>
            <input name="login-name" type="text">
            <label for="login-password">Hasło</label>
            <input name="login-password" type="password">
            <button @click="onLogInClick">Zaloguj</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            onSignInClick () {
                this.$store.commit('setNav', 'logowanie');
            },
            onLogInClick () {
                this.$store.commit('setLoggedIn', true);
                this.$store.commit('setNav', 'lista');
            }
        },
        computed: {
            activeNav () {
                return this.$store.state.activeNav;
            }
        }
    };
</script>

<style lang="css">
    .form {
        display: flex;
        flex-direction: column;
        width: 250px;
    }

    .form > * {
        margin: 4px 0;
    }

    .form > button {
        margin-top: 24px !important;
    }
</style>
