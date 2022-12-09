<template>

  <router-view/>
</template>
<style lang="scss">
@import "./assets/all.scss";
.productstable tr:nth-child(odd) td{
  background:$gray-200;
}
// .productstable tr:nth-child(odd) td:last-child{
//   background:none;
// }
</style>
<script>
import 'bootstrap/dist/js/bootstrap.bundle';
import emitter from './methods/emitter';
export default {
  provide () {
        return {
            emitter
        };
    }
};
</script>
