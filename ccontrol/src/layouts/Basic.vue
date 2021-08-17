<template>
  <div class="basic">
      <Header/>
      <main class="container-fluid content">
          <slot/>
      </main>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
    name: "Basic",
    components: {
        Header,
    }
}
</script>

<style>

</style>