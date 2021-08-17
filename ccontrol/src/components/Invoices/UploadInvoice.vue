<template>
    <section class="uploadInvoice">
        <div class="row m-2 text-center">
            <div class="col">
                <button class="btn btn-dark btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" 
                    aria-controls="offcanvasTop"><i class="fas fa-plus"></i></button>
            </div>
        </div>
        <div class="offcanvas offcanvas-top text-center h-50" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title text-center" id="offcanvasTopLabel">Upload your bill</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body my-4">
                <div v-if="error" class="alert alert-warning text-center" role="alert">
                    <strong>{{error}}</strong>
                </div>
                <form id="billForm" @submit.prevent="handleSubmit">
                    <div class="col-12 offset-lg-3 col-lg-6">
                        <div class="input-group mb-4">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon">
                                <i class="far fa-file-pdf"></i>
                                <span v-if="file">({{file.name}})</span>
                                
                            </button>
                            <input type="file" class="form-control" id="inputGroupFile" aria-describedby="inputGroupFileAddon" aria-label="Upload"
                            @change="uploadFile">
                        </div>
                        <div class="input-group mb-4">
                            <button class="btn btn-outline-secondary" type="button"> Date </button>
                            <input type="date" class="form-control" name="date" id="date" @change="getDate"/> 
                        </div>
                    </div>
                    <div class="mb-2">
                        <button type="submit" class="btn btn-dark"> Upload </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

</template>

<script>

import { ref } from 'vue';
import {v4 as uuidv4} from "uuid";
import { auth, storage, db } from '../../util/firebase';

export default {
    name: "Invoices",
    props: {
        getBills: Function,
    },
    setup(props){
        let file = ref(null);
        let date = ref(null);
        let error = ref(null);
        
        const uploadFile = (e) => {
            const fileTemp = e.target.files[0];
            error.value = null;

            if(fileTemp.type === "application/pdf"){
                file.value = fileTemp;
            }else{
                error.value = "Invalid ext";
            }
        }
        const getDate = (e) => {
            date.value = e.target.value;
        }
        const handleSubmit = async () => {
            if(file.value && date.value){
                try {
                    const nameFile = uuidv4();
                    await storage.ref(auth.currentUser.uid).child(`${nameFile}.pdf`).put(file.value);

                    // Guardar en BD de Firebase
                    // Recuperar la url del archivo que hemos subido
                    const billURL = await storage.ref(`${auth.currentUser.uid}/${nameFile}.pdf`).getDownloadURL();
                    await db.collection(auth.currentUser.uid).add({
                        billURL,
                        date: new Date(date.value),
                        dateString: date.value
                    });
                   props.getBills();
                } catch (e) {
                    e.inner.forEach((error) => {
                        formError.value[error.path] = error.message;
                    });   
                }
                file.value = null;
                date.value = null;
                document.getElementById("inputGroupFile").value="";
                document.getElementById("date").value="";
            }else{
                error.value = "You have to upload a file and a date";
            }
        };

        return{
            file,
            date,
            error,
            uploadFile,
            getDate,
            handleSubmit,
        }
    }
}

</script>

<style>

</style>