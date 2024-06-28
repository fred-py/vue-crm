<template>
    <body style="background-color: var(--green-gradient);">
        <div class="welcome">
            <h1 style="color: #048D4B;
                font-family: InterVariable, sans-serif;
                font-weight: 800;
                padding-bottom: 1.5rem;">
                Welcome to the Wheelie Wash Dash
            </h1>
            <!--Refer to PrimerVue Docs for styling etc...-->
            <div class="flex justify-center flex-wrap gap-4 color">
                <router-link to="/login" rel="noopener">
                    <Button label="Login"  severity="secondary" text raised />
                </router-link>
                <router-link to="/register" rel="noopener">
                    <Button label="Register"  severity="secondary" text raised/>
                </router-link>
            </div>
        </div>
    </body>
</template>

<script setup>
//import LandingNav from '../components/LandingNav.vue';
//const landingNav = LandingNav;

import Button from 'primevue/button';


</script>
<style lang="scss" scoped>
    @import '../assets/layout/styles/color.scss';
    .welcome {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
    }
</style>
