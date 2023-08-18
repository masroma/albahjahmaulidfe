<template>
    <div>
        <div class="main">
          <form class="m">
            <div class="form-group">
                <label for="">Nama lengkap <span class="text-danger"></span></label>
                <input type="text" placeholder="Nama Lengkap" v-model="transaksi.nama">
                <small class="text-danger" v-if="validation.nama">{{ validation.nama[0] }}</small>
            </div>
            <div class="form-group">
                <label for="">Whatsapp</label>
                <input type="number" placeholder="No Whatsapp" v-model="transaksi.whatsapp">
                <small class="text-danger" v-if="validation.whatsapp">{{ validation.whatsapp[0] }}</small>
            </div>
            <div class="form-group">
                <label for="">Email <span class="text-danger"></span></label>
                <input type="text" placeholder="Email" v-model="transaksi.email">
                <small class="text-danger" v-if="validation.email">{{ validation.email[0] }}</small>
            </div>
            <div class="form-group">
                <label for="">Alamat Lengkap</label>
                <textarea name="alamat" id="" cols="30" rows="10" v-model="transaksi.alamat"></textarea>
                <small class="text-danger" v-if="validation.alamat">{{ validation.alamat[0] }}</small>
            </div>

            <div class="form-group">
                <label for="">Jumlah Tiket <span class="text-danger"></span></label>
                <input type="number" placeholder="qty" v-model="transaksi.qty" min="1" >
                <small class="text-danger" v-if="validation.qty">{{ validation.qtyl[0] }}</small>
            </div>

           
               
            
          </form>

          <div class="footer" v-if="this.$route.name == 'detail'">
            <div class="price">
                <p>Tiket</p>
                <p>Rp.{{transaksi.amount}}</p>
            </div>
            <div class="button-daftar">
                <!-- <router-link :to="{name: 'detail'}" class="buttondaftar" >Daftar Sekarang</router-link> -->

                <button @click="storeTransaksi"  class="buttonpembayaran" v-if="this.$route.name == 'detail'">LANJUT PEMBAYARAN</button>

            </div>
        </div>
         

        
               
          
        </div>
    </div>
 </template>
 
 <script>

import { ref, reactive, watch } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'
    
    //hook vue router
    import { useRoute, useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"
 export default {
     name: 'DetailComponent',

    
     setup() {

    //store vuex
    const store = useStore()

    //route
    const route = useRoute()

    //router
    const router = useRouter()

    //toast
    const toast = useToast()

   

    //state donation
    const transaksi = reactive({
        amount: 295000,   
        nama: 'romadhon', 
        email:'masroma75@gmail.com',
        whatsapp:'082299995502',
        alamat:'jln mutiara',
        qty:1
        
    })

    const validation = ref([]);

    watch(transaksi, (newValue, oldValue) => {
      transaksi.amount = newValue.qty * 295000;
    });

    function storeTransaksi() {
     
     //define variable
     let formData = new FormData();

     formData.append('nama', this.transaksi.nama)
        formData.append('email', this.transaksi.email)
        formData.append('whatsapp', this.transaksi.whatsapp)
        formData.append('alamat', this.transaksi.alamat)
        formData.append('amount', this.transaksi.amount)
        formData.append('qty', this.transaksi.qty)
     
     formData.append("_method", "POST");
     //panggil actions "register" dari module "auth"
     store
       .dispatch("daftarpeserta/store", 
         formData,
       )
       .then((response) => {

        // console.log('token',response.data.data.snap_token)

        window.snap.pay(response.data.data.snap_token, {

            onSuccess: function () {
                toast.success('Transaksi Berhasil!')

                //redirect ke dashboard
                router.push({name: 'home'})
                
            },
            onPending: function (result) {
                console.log('balikan dari ssnap', result)
                toast.error('Transaksi Pending! silahkan cek email untuk melanjutkan pembayaran')

                //redirect ke dashboard
                router.push({name: 'home'})
            },
            onError: function () {
                toast.error('Transaksi Gagal')

//redirect ke dashboard
                router.push({name: 'detail'})
            }
        })
         //redirect ke dashboard
        
        

         // toast.success("Tambah data berhasil")
       })
       .catch((error) => {
         //show validaation message
         // console.log(error);

         validation.value = error;
       });
   }

    
    //method store donation
  
    return {
        transaksi,       // <-- state donation
        storeTransaksi,
        validation
       
    }

    }

 }
 </script>