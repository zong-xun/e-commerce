<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-md table-responsive">
                <div class="text-end">
                    <button class="btn btn-primary" type="button" @click.prevent="OpenCartModel()" style=" font-size: 29px;padding: 0.1rem 0.6rem;">
                        <i class="bi bi-cart4"></i>
                    </button>
                </div>
                <table class="table align-middle table-hover ">
                    <thead>
                        <tr class="tabletr">
                            <th>圖片</th>
                            <th>商品名稱</th>
                            <th>價格</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for=" item in productsdata" :key="item.id" class="tabletr">
                            <td style="width: 200px">
                                <div style="height: 100px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imagesUrl})`}"></div>
                            </td>
                            <td><a href="#" class="text-dark">{{item.title}}</a></td>
                            <td>
                                <!-- <div class="h5"> 元</div> -->
                                <del class="h6">原價 {{$filters.currency(item.origin_price)}}元</del>
                                <div class="h5" >現在只要 {{$filters.currency(item.price)}}元</div>
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm">
                                    <button type="button" class="btn btn-outline-secondary" @click.prevent="getproduct(item.id)" style="border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem;">
                                        查看更多
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" @click.prevent="attcart(item.id)" :disabled="(this.status.loadingItem === item.id)" style=" align-items: center;display: flex; justify-content: center;    border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem;">
                                        <div class="spinner-grow text-danger spinner-grow-sm" role="status" v-if="(this.status.loadingItem === item.id)">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Pagination :pages="pagination" @updata-page = "getproducts"></Pagination>
    <shoppingcartModel ref="shoppingcartModel" :shoppingcart="cartdata" @cart-product = "closeCartModel"></shoppingcartModel>
    <Loading :active="isLoading"></Loading>
</template>
<style>

    .tabletr td:nth-child(3),.tabletr th:nth-child(3){
        max-width: 100px;
        overflow-x: auto;
    }
    .tabletr td:nth-child(4) div, .tabletr th:nth-child(4){
        flex-wrap: wrap;
    }
@media(max-width: 414px){
    .tabletr td:nth-child(3),.tabletr th:nth-child(3){
        display: none;
    }
    .tabletr td:nth-child(1),.tabletr th:nth-child(1){
        max-width: 100px;
        overflow-x: auto;
    }
}

</style>
<script>
import Pagination from '../components/Pagination.vue';
import shoppingcartModel from '../components/shoppingcart.vue';
export default {
    data () {
        return {
            productsdata: [],
            pagination: {},
            isLoading: false,
            status: {
                loadingItem: ''
            },
            cartdata: {}
        };
    },
    components: {
        Pagination,
        shoppingcartModel
    },
    methods: {
        getproducts (page) {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
                this.$http.get(api)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.isLoading = false;
                        this.productsdata = res.data.products;
                        this.pagination = res.data.pagination;
                    }
                });
        },
        getproduct (id) {
            this.$router.push(`/user/product/${id}`);
        },
        attcart (id) {
            const productdata = {
                product_id: id,
                qty: 1
            };
            this.status.loadingItem = id;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
            this.$http.post(api, { data: productdata })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.status.loadingItem = '';
                        console.log(res);
                    }
                });
        },
        OpenCartModel () {
            this.isLoading = true;
            const productComponent = this.$refs.shoppingcartModel;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
                this.$http.get(api)
                .then((res) => {
                    console.log(res);
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
        this.getproducts();
    }
};
</script>
