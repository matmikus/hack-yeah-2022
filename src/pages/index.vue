<template>
    <div>
        <PageHeader></PageHeader>
        <main>
            <template v-if="!isLoggedIn">
                <LogoutNavigation></LogoutNavigation>
                <LogoutForm></LogoutForm>
            </template>
            <template v-else>
                <LoginNavigation></LoginNavigation>
                <List v-if="activeNav === 'lista'"></List>
                <New v-if="activeNav === 'nowy'"></New>
            </template>
        </main>
    </div>
</template>

<script>
    import PageHeader from '~/components/PageHeader';
    import LogoutNavigation from '~/components/LogoutNavigation';
    import LogoutForm from '~/components/LogoutForm';
    import LoginNavigation from '~/components/LoginNavigation';
    import List from '~/components/List';
    import New from '~/components/New';

    export default {
        components: {
            LogoutNavigation,
            PageHeader, LogoutForm, LoginNavigation, List, New
        },
        computed: {
            isLoggedIn () {
                return this.$store.state.isLoggedIn;
            },
            activeNav () {
                return this.$store.state.activeNav;
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200..900&display=swap');

    html, body {
        margin: 0;
        font-family: 'Muli', sans-serif;
        height: 100%;
    }

    main {
        font-size: 16px;
        margin: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .heading {
        font-size: 20px;
        padding: 16px;
    }

    button {
        text-transform: uppercase;
    }
</style>
