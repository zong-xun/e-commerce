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
                                <form class="col" @submit.prevent="Orderapi">
                                    <table class="table align-middle">
                                        <thead>
                                            <th>品名</th>
                                            <th>數量</th>
                                            <th style="text-align: center;">單價</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for=" (item, index) in this.checkoutdata.product.carts" :key="index">
                                                <td>{{ item.product.title }}</td>
                                                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                                                <td class="text-end">{{ item.final_total }}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="2" class="text-end">總計</td>
                                                <td class="text-end">{{ this.checkoutdata.product.final_total }}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th width="100">Email</th>
                                                <td>{{ this.checkoutdata.email }}</td>
                                            </tr>
                                            <tr>
                                                <th>姓名</th>
                                                <td>{{ this.checkoutdata.name }}</td>
                                            </tr>
                                            <tr>
                                                <th>收件人電話</th>
                                                <td>{{ this.checkoutdata.tel }}</td>
                                            </tr>
                                            <tr>
                                                <th>收件人地址</th>
                                                <td>{{ this.checkoutdata.address }}</td>
                                            </tr>
                                            <tr>
                                                <th>付款狀態</th>
                                                <td>
                                                    <span v-if="this.newOrderData.is_paid === false">尚未付款</span>
                                                    <span v-else class="text-success">付款完成</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                            @click.prevent="$emit('checkout-Previous')" v-if="this.newOrderData.is_paid === false">上一步</button>
                                        <button class="btn btn-primary" v-if="this.newOrderData.is_paid === false">確認付款去</button>
                                        <button type="button" class="btn btn-primary" v-else @click.prevent="$emit('checkout-close', paydata)" @click="rest">關閉</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Loading :active="isLoading"></Loading>
</template>
<script>
        import modalMixin from '@/Mixin/modalMixin';
        import emailjs from 'emailjs-com';
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
                // console.log(this.checkoutdata);
                // this.user = this.checkoutdata.user;
                // this.orderr = this.checkoutdata.products;
                // this.orderarr = Object.values(this.orderr);
            }
        },
        data () {
            return {
                orderr: {},
                orderarr: [],
                isLoading: false,
                user: {},
                newOrderData: {
                    is_paid: false
                },
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: ''
                    },
                    message: ''
                },
                paydata: {}
            };
        },
        methods: {
            getOrder (id) {
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
                    this.$http.get(api)
                    .then((res) => {
                        if (res.data.success) {
                            console.log(res);
                            this.newOrderData = res.data.order;
                        }
                    });
            },
            payOrder (id) {
                this.isLoading = true;
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`;
                this.$http.post(api)
                    .then((res) => {
                        if (res.data.success) {
                            console.log(res);
                            this.paydata = res;
                            this.getOrder(id);
                            this.sendEmail(this.checkoutdata);
                            this.isLoading = false;
                        }
                    });
            },
            sendEmail (item) {
                console.log(item);
                const products = Object.values(item.product.carts);
                console.log(products);
                let htmladd = '';
                let imageadd = '';
                for (let i = 0; i <= products.length - 1; i++) {
                    for (let x = 0; x <= products[i].product.imagesUrl.length; x++) {
                        imageadd += ` <img src="${products[i].product.imagesUrl[x]}" alt="">`;
                    }
                    htmladd += `
                        <div style="font-size:30px;">
                        名稱 : <span >${products[i].product.title}</span>
                        </div>
                        ${imageadd}
                        <div style="font-size:30px;">
                        價格 : <span>${products[i].final_total}</span>
                        </div>
                    `;
                    imageadd = '';
                };
                const templateParams = {
                    user: item.name,
                    email: item.email,
                    address: item.address,
                    tel: item.tel,
                    total: item.product.final_total,
                    htmlemailtep: htmladd
                };
                emailjs.send('service_zong', 'template_ia2bt5u', templateParams, 'es4Xj-CcZvB4tDDAV')
                .then(() => {
                }, () => {
                });
            },
            Orderapi () {
                this.isLoading = true;
                console.log(this.checkoutdata);
                this.form.user.name = this.checkoutdata.name;
                this.form.user.email = this.checkoutdata.email;
                this.form.user.tel = this.checkoutdata.tel;
                this.form.user.address = this.checkoutdata.address;
                this.form.message = this.checkoutdata.message;
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
                this.$http.post(api, { data: this.form })
                .then((res) => {
                    if (res.data.success) {
                        console.log(res);
                        this.payOrder(res.data.orderId);
                        this.isLoading = false;
                    }
                });
            },
            rest () {
                console.log('1');
                this.newOrderData.is_paid = false;
            }
        },
        emits: ['checkout-close'],
        mixins: [modalMixin]
    };
    </script>
