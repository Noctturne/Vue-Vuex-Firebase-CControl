<template>
  <div class="container-fluid p-0 m-0">
      <template v-if="user">
        <router-view/>
      </template>
      <transition name="fade" mode="out-in">
        <Auth v-if="!user && user !== undefined"/>
      </transition>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { auth } from './util/firebase';
import { useStore } from 'vuex';
import  Auth  from './views/Auth.vue';
export default{
  name: "App",
  components:{
    Auth,
  },
  setup(){
    const store = useStore();
    const user = computed(() => store.state.user);

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        store.commit("setUser", user);
      })
    });

    return{
      user
    }
  }
}
</script>


<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }


  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
@import'~bootstrap/dist/css/bootstrap.css';
</style>
