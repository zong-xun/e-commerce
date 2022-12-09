<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/user/cart" class="nav-link navbar-brand" >阿勳商場</router-link>
            <!-- <a class="navbar-brand" href="#">購物範例</a> -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/user/cart" class="nav-link" >購物頁</router-link>
                    <router-link to="/" class="nav-link">管理者</router-link>
                </div>
            </div>
        </div>
    </nav>
    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
        <router-view/>
    </div>
</template>
<script>
// import emitter from '../methods/emitter';
import ToastMessages from '../components/ToastMessages.vue';
export default {
    components: {
        ToastMessages
    },
    // provide () {
    //     return {
    //         emitter
    //     };
    // },
    inject: ['emitter'],
    created () {
    }
};
</script>
