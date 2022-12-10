<template>
    <div class="text-end">
        <button class="btn btn-primary" type="button" @click.prevent="openModel(true)">
            增加一個產品
        </button>
    </div>
    <table class="table mt-4 table-striped">
        <thead>
            <tr class="tabledisable">
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key = "item.id"  class="tabledisable">
                <td>{{item.category}}</td>
                <td>{{item.title}}</td>
                <td class="text-right">
                    {{$filters.currency(item.origin_price)}}
                </td>
                <td class="text-right">
                    {{$filters.currency(item.price)}}
                </td>
                <td>
                    <span class="text-success" v-if="item.is_enabled == '1'">啟用</span>
                    <span class="text-muted" v-else>未啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm"  @click.prevent="openModel(false,item)"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-outline-danger btn-sm" @click.prevent="OpenDelModel(item)"><i class="bi bi-trash3"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Pagination :pages="pagination" @updata-page = "getproducts"></Pagination>
    <ProductModal ref="productModal" :product="tempProduct" @updata-product="updatedProducts"></ProductModal>
    <DelModa ref="OpenDelModel" :DelProductData="tempProduct" @del-product="delProductfn"></DelModa>
    <Loading :active="isLoading"></Loading>
</template>
<style>
    @media(max-width: 414px){
        .tabledisable td:nth-child(3),.tabledisable th:nth-child(3){
            display:none;
        }
    }
</style>
<script>
import Pagination from '../components/Pagination.vue';
import ProductModal from '../components/ProductModal.vue';
import DelModa from '../components/DelModal.vue';
export default {
    data () {
        return {
            products: [],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false
        };
    },
    components: {
        ProductModal,
        DelModa,
        Pagination
    },
    inject: ['emitter'],
    methods: {
        getproducts (page = 1) {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
                this.$http.get(api)
                .then((res) => {
                    this.isLoading = false;
                    if (res.data.success) {
                        this.products = res.data.products;
                        this.pagination = res.data.pagination;
                    }
                });
        },
        openModel (isNew, item) {
            if (isNew) {
                this.tempProduct = {};
            } else {
                this.tempProduct = { ...item };
            }
            this.isNew = isNew;
            const productComponent = this.$refs.productModal;
            productComponent.showModel();
        },
        OpenDelModel (item) {
            const productComponent = this.$refs.OpenDelModel;
            this.tempProduct = { ...item };
            productComponent.showModel();
        },
        updatedProducts (item) {
            this.tempProduct = item;
            this.isLoading = true;
            // 新增
            let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
            let httpMethod = 'post';
            // 編輯
            if (!this.isNew) {
                api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
                httpMethod = 'put';
            }
            const productComponent = this.$refs.productModal;
                this.$http[httpMethod](api, { data: this.tempProduct })
                .then((response) => {
                    this.isLoading = false;
                    productComponent.hideModel();
                    if (response.data.success) {
                        this.getproducts();
                        if (!this.isNew) {
                            this.$httpMessageState(response, '編輯成功');
                        } else {
                            this.$httpMessageState(response, '商品建立成功');
                        }
                    } else {
                        if (!this.isNew) {
                            this.$httpMessageState(response, '編輯失敗');
                        } else {
                            this.$httpMessageState(response, '商品建立失敗');
                        }
                    }
                });
        },
        delProductfn (item) {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item}`;
            const productComponent = this.$refs.OpenDelModel;
                this.$http.delete(api, { data: this.tempProduct })
                .then((response) => {
                    this.isLoading = false;
                    productComponent.hideModel();
                    if (response.data.success) {
                        this.getproducts();
                        this.$httpMessageState(response, '刪除成功');
                    } else {
                        this.$httpMessageState(response, '刪除失敗');
                    }
                });
        }
    },
    created () {
        this.getproducts();
    }
};
</script>
