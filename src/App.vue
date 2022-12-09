<template>

  <router-view/>
</template>
<style lang="scss">
@import "./assets/all.scss";
.productstable tr:nth-child(odd) td{
  background:$gray-200;
}
</style>
<script>
import 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/js/dist/modal.js';
import emitter from './methods/emitter';
export default {
  provide () {
        return {
            emitter
        };
    }
};
</script>
