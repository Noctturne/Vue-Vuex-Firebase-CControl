<template>
    <div class="center-screen auth p-2">
        <div class="title m-2">
            <h1><strong>{{title}}</strong></h1>
        </div>
        <Login v-if="showLogin"/>
    </div>
</template>

<script>
import Login from '../components/Auth/Login.vue';
import { ref } from 'vue';

export default {
    name: "auth",
    components:{
        Login,
    },
    setup(){
        const title = "CControl";

        let showLogin = ref(true);
        /*
        const changeForm = () => {
            showLogin.value = !showLogin.value;
        }
        */
        return{
            title,
            showLogin,
        }
    }
}
</script>

<style lang="scss" scoped>
    .center-screen{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    background-color: var(--gray);
    }
</style>