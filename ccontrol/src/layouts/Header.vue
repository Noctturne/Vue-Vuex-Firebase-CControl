<template>
  <div class="header">
        <div class="row g-0 justify-content-between">
            <div class="logo col-4 p-2">
                <router-link to="/" class="link-secondary text-decoration-none"><h1><strong>{{title}}</strong></h1></router-link>
            </div>
            <div class="account col-8 text-end p-2">
                <button type="button" className="btn btn-link link-dark btn-sm text-decoration-none"> {{user.displayName || user.email}} 
                    <i class="fas fa-cog ps-1"></i> 
                </button>
                <button type="button" className="btn btn-link link-dark text-decoration-none" @click="logout"> 
                        <i class="fas fa-sign-out-alt ps-1"></i>
                </button>
            </div>
        </div>
  </div>
</template>

<script>
import  {useStore } from 'vuex';
import { auth } from '../util/firebase';
import { computed } from 'vue';
export default {
    name: "Header",
    setup(){
        const title = "CControl";

        const store = useStore();
        // Usamos computed porque los datos pueden variar
        const user = computed(() => store.state.user);

        const logout = () => {
            auth.signOut();
        }
        return{
            title,
            user,
            logout
        }
    }
}

</script>

<style>

</style>