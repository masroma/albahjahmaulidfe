<template>
    <div>
        <!-- header -->
        <div class="header">
      
            <img src="/maulidakbar2020.jpg" alt="banner maulid" >
           

            <router-link :to="{name: 'home'}" v-if="this.$route.name == 'detail'">
                <div class="button-back">
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
            </router-link>
        </div>

    </div>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
</script>

<style>

</style>