<template>
    <Basic>
        <UploadInvoice :getBills="getBills"/>
        <div class="row invoices">
            <h1 class="text-center mt-4"> Bills </h1>
                <InvoiceList :bills="bills" :getBills="getBills"/>
        </div>
    </Basic>
</template>

<script>
import Basic from '../layouts/Basic.vue';
import UploadInvoice from '../components/Invoices/UploadInvoice.vue';
import { onMounted, ref } from 'vue';
import { auth, storage, db } from '../util/firebase';
import InvoiceList from '../components/Invoices/InvoiceList.vue';

export default {
    name: "Invoices",
    components:{
        Basic,
        UploadInvoice,
        InvoiceList
    },
    setup(){
        // Guardar facturas, ref para que refresque
        let bills = ref(null);

        onMounted(() => {
            getBills();
        });

        const getBills = async() => {
            const response = await db.collection(auth.currentUser.uid).orderBy("date", "desc").get();
            const result = [];
            response.docs.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                result.push(data);
            });
            bills.value = result;
        };

        return{
            bills,
            getBills
        }
    }
}

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>