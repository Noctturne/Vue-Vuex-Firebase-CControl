<template>
  <section class="list mt-4">
      <small v-if="bills?.length === 0"> Invoice list is empty </small>
        <div class="row mb-4 bill" v-for="bill in bills" :key="bill.id">
            <div class="col-6 offset-lg-2 col-lg-2">
                <small><i class="far fa-calendar-minus px-2"></i>{{formatDate(bill.dateString)}}</small>
            </div>
            <div class="col-6 col-lg-6 text-end">
                <a :href="bill.billURL" target="_blank" type="button" class="btn btn-success btn-sm mx-2"><i class="fas fa-download"></i></a>
                <button type="button" class="btn btn-danger btn-sm mx-2" @click="deleteBill(bill.id)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
  </section>

</template>

<script>
import moment from 'moment';
import { auth, db } from '../../util/firebase';

export default {
    name: "InvoiceList",
    props: {
        bills: Array,
        getBills: Function
    },
    setup(props){
        const formatDate = (date) => {
            return moment(date).format("MMMM [/] YYYY");
        }

        const deleteBill = async (id) => {
            try {
                await db.collection(auth.currentUser.uid).doc(id).delete();
                props.getBills();
            } catch (e) {
                console.log(e);
            }
        }
        return{
            formatDate,
            deleteBill
        }
    }
}
</script>

<style>

</style>