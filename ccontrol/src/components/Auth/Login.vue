<template>
  <div class="login">
      <div class="alert alert-warning text-center" role="alert">
        <strong>Use this app with -> email: demo@demo | pass: demodemo</strong>
        <small id="alert"></small>
      </div>
      <form @submit.prevent="onLogin">
          <div class="mb-2">
            <input type="text" id="email" name="email" class="form-control" placeholder="Email"
              v-model="formData.email"/>
          </div>
          <div class="mb-2">
            <input type="password" id="password" name="password" class="form-control" autocomplete="on" placeholder="Password"
              v-model="formData.password"/>
          </div>
          <div class="d-grid gap-2 mb-2">
            <button type="submit" class="btn btn-dark"> Log in </button>
          </div>
          <small> Not a member? <a> <strong>Sign up </strong></a></small>
      </form>
  </div>
</template>

<script>
import * as Yup from "yup";
import {ref} from 'vue';
import {auth} from "../../util/firebase";

export default {
    name: "login",
    setup(){
      let formData = {};
      let formError = ref({});

      const schemaForm = Yup.object().shape({
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
      });

      

      const onLogin = async() => {
        formError.value = {};

        try {
          await schemaForm.validate(formData, { abortEarly: false });
          try {
            const {email, password} = formData;
            await auth.signInWithEmailAndPassword(email, password);
          } catch (e) {
            return;
          }
        } catch (e) {
            alert(e.name);
        }
      }
      return{
        formData,
        onLogin,
        formError
      }
    }
}
</script>

<style lang="scss" scoped>
.login{
    a{
        cursor: pointer;
    }
} 
</style>