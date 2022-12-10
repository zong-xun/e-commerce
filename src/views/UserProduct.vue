<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
        </nav>
        <div class="text-end">
            <button class="btn btn-primary" type="button" @click.prevent="OpenCartModel()" style=" font-size: 29px;padding: 0.1rem 0.6rem;">
                <i class="bi bi-cart4"></i>
            </button>
        </div>
        <div class="row justify-content-center">
            <article class="col-8">
                <h2>{{ product.title }}</h2>
                <div>{{ product.content }}</div>
                <div>{{ product.description }}</div>
                <img v-for="(item, index) in product.imagesUrl" :key="index" :src="item" alt="" class="img-fluid mb-3">
            </article>
            <div class="col-4">
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                <hr>
                <button type="button" class="btn btn-outline-danger" @click="attcart(product.id)">
                    <div class="spinner-grow text-danger spinner-grow-sm" role="status" v-if="(this.status.loadingItem === product.id)">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
        </div>
    </div>
    <shoppingcartModel ref="shoppingcartModel" :shoppingcart="cartdata" @cart-product = "closeCartModel"></shoppingcartModel>
</template>
<script>
import shoppingcartModel from '../components/shoppingcart.vue';
    export default {
        data () {
            return {
                product: {
                },
                cartdata: {

                },
                id: '',
                isLoading: false,
                status: {
                    loadingItem: ''
                }
            };
        },
        components: {
            shoppingcartModel
        },
        methods: {
            getProduct () {
                this.isLoading = true;
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
                    this.$http.get(api)
                    .then((res) => {
                        if (res.data.success) {
                            this.isLoading = false;
                            this.product = res.data.product;
                        }
                    });
            },
            attcart (id) {
                this.isLoading = true;
                const productdata = {
                    product_id: id,
                    qty: 1
                };
                this.status.loadingItem = id;
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
                this.$http.post(api, { data: productdata })
                .then((res) => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.status.loadingItem = '';
                    }
                });
            },
            OpenCartModel () {
                this.isLoading = true;
                const productComponent = this.$refs.shoppingcartModel;
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
                    this.$http.get(api)
                    .then((res) => {
                        if (res.data.success) {
                            this.cartdata = res.data.data;
                            this.isLoading = false;
                            productComponent.showModel();
                        }
                    });
            },
            closeCartModel () {
                const productComponent = this.$refs.shoppingcartModel;
                productComponent.hideModel();
            }
        },
        created () {
            this.id = this.$route.params.productId;
            this.getProduct();
        },
        emits: ['cart-product']
    };
</script>
