<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="modal" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title text-light" id="exampleModalLabel">購物清單</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row mt-4">
                            <div class="col">
                                <div class="sticky-top">
                                    <table class="table align-middle">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>品名</th>
                                                <th style="text-align: center;">數量</th>
                                                <th style="text-align: end; padding-right: 25px;">單價</th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="item in this.shoppingcartdata.carts" :key="item.id">
                                            <tr class="tabletrmodel">
                                                <td>
                                                    <button type="button" class="btn btn-outline-danger btn-sm"
                                                        @click.prevent="delonecart(item.id)">
                                                        <i class="bi bi-trash3"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    {{item.product.title}}
                                                    <div class="text-success"
                                                        v-if="this.shoppingcartdata.final_total !== this.shoppingcartdata.total">
                                                        已套用優惠券
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="input-group input-group-sm">
                                                        <input type="number" class="form-control"
                                                            style="text-align: center;" v-model.number="item.qty" min="1"
                                                            @change="updataCart(item)"
                                                            :disabled="(item.id === status.loadingItem)">
                                                        <div class="input-group-text">{{ item.product.unit }}</div>
                                                    </div>
                                                </td>
                                                <td class="text-end">
                                                    <span
                                                        v-if="this.shoppingcartdata.final_total === this.shoppingcartdata.total">{{$filters.currency(item.final_total)}}</span>
                                                    <small class="text-success"
                                                        v-if="this.shoppingcartdata.final_total !== this.shoppingcartdata.total">折扣價：{{$filters.currency(item.final_total)}}</small>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="3" class="text-end">總計</td>
                                                <td class="text-end">{{$filters.currency(this.shoppingcartdata.total)}}</td>
                                            </tr>
                                            <tr v-if="this.shoppingcartdata.final_total !== this.shoppingcartdata.total">
                                                <td colspan="3" class="text-end text-success">折扣後總計</td>
                                                <td class="text-end text-success">
                                                    {{$filters.currency(this.shoppingcartdata.final_total)}}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div class="input-group mb-3 input-group-sm">
                                        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="button"
                                                @click.prevent="addCouponCode()">
                                                套用優惠碼
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary"
                        @click.prevent="$emit('cart-product', shoppingcartdata)">確定</button>
                </div>
            </div>
        </div>
    </div>
    <Loading :active="isLoading"></Loading>
</template>
<style>
    .tabletrmodel td:nth-child(1){
        width: 5%;
    }
    /* .tabletrmodel td:nth-child(1) button{
        height: 16px;
    } */
    .tabletrmodel td:nth-child(2){
        width: 15%;
    }
    .tabletrmodel td:nth-child(3){
        width: 10%;
    }
    .tabletrmodel td:nth-child(4){
        width: 20%;
    }
    @media(max-width: 414px){
        .tabletrmodel td:nth-child(3){
        width: 20%;
    }
}
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
</style>
<script>
import modalMixin from '@/Mixin/modalMixin';
export default {
    props: {
        shoppingcart: {
            type: Object,
            defaule () {
                return {};
            }
        }
    },
    watch: {
        shoppingcart () {
            this.shoppingcartdata = this.shoppingcart;
            this.coupon_code = '';
        }
    },
    data () {
        return {
            modal: {},
            shoppingcartdata: {},
            isLoading: false,
            status: {
                loadingItem: ''
            },
            coupon_code: ''
        };
    },
    methods: {
        delonecart (id) {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
                this.$http.delete(api)
                .then((res) => {
                    if (res.data.success) {
                        this.getcardata();
                        this.isLoading = false;
                    }
                });
        },
        getcardata () {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
                this.$http.get(api)
                .then((res) => {
                    if (res.data.success) {
                        this.shoppingcartdata = res.data.data;
                    }
                });
        },
        updataCart (item) {
            this.isLoading = true;
            this.status.loadingItem = item.id;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
            const cart = {
                product_id: item.product_id,
                qty: item.qty
            };
                this.$http.put(api, { data: cart })
                .then((res) => {
                    if (res.data.success) {
                        this.getcardata();
                        this.isLoading = false;
                        this.status.loadingItem = '';
                    }
                });
        },
        addCouponCode () {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
            const Codedata = {
                data: {
                    code: this.coupon_code
                }
            };
            this.$http.post(api, Codedata)
            .then((res) => {
                if (res.data.success) {
                    console.log(res);
                    this.getcardata();
                } else {
                    this.$httpMessageState(res, '優惠券');
                }
                this.isLoading = false;
            });
        }

    },
    emits: ['cart-product'],
    mixins: [modalMixin]
};
</script>
