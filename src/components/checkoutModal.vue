<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-light" id="exampleModalLabel">結帳</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row mt-4">
                            <div>
                                <form class="col" @submit.prevent="payOrder">
                                    <table class="table align-middle">
                                        <thead>
                                            <th>品名</th>
                                            <th>數量</th>
                                            <th style="text-align: center;">單價</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for=" (item, index) in orderarr" :key="index">
                                                <td>{{ item.product.title }}</td>
                                                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                                                <td class="text-end">{{ item.final_total }}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="2" class="text-end">總計</td>
                                                <td class="text-end">{{ this.checkoutdata.total }}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th width="100">Email</th>
                                                <td>{{ user.email }}</td>
                                            </tr>
                                            <tr>
                                                <th>姓名</th>
                                                <td>{{ user.name }}</td>
                                            </tr>
                                            <tr>
                                                <th>收件人電話</th>
                                                <td>{{ user.tel }}</td>
                                            </tr>
                                            <tr>
                                                <th>收件人地址</th>
                                                <td>{{ user.address }}</td>
                                            </tr>
                                            <tr>
                                                <th>付款狀態</th>
                                                <td>
                                                    <span v-if="!order.is_paid">尚未付款</span>
                                                    <span v-else class="text-success">付款完成</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="text-end" v-if="order.is_paid === false">
                                        <button class="btn btn-danger">確認付款去</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click.prevent="$emit('checkout-Previous')">上一步</button>
                <button type="button" class="btn btn-primary">確定</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
        import modalMixin from '@/Mixin/modalMixin';
        export default {
        props: {
            checkoutdata: {
                type: Object,
                defaule () {
                    return {};
                }
            }
        },
        watch: {
            checkoutdata () {
                this.user = this.checkoutdata.user;
                this.orderr = this.checkoutdata.products;
                this.orderarr = Object.values(this.orderr);
                console.log(Object.values(this.orderr));
            }
        },
        data () {
            return {
                order: {
                    user: {}
                },
                orderr: {},
                orderarr: [],
                user: {}
            };
        },
        methods: {
        },
        emits: ['checkout-Previous'],
        mixins: [modalMixin]
    };
    </script>
