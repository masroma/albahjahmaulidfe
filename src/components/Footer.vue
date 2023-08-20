<template>
    <div>
        <div class="footer" v-if="this.$route.name == 'home'">
            <!-- <div class="price">
                <a href="">Kang Zaenal</a>
                <p>Rp.295.000</p>
            </div> -->
            <div class="button-daftar">
                <router-link :to="{name: 'detail'}" class="buttondaftar" >Daftar Sekarang</router-link>

            </div>
        </div>
         
    </div>
  </template>
  
  <script>
  
  export default {
      name: 'FooterComponent'
     
  }
  </script>
  
  <style>
  
  </style>