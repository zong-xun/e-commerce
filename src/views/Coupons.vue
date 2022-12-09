<template>
    <div>
        <Loading :active="isLoading"></Loading>
        <div class="text-end mt-4">
            <button class="btn btn-primary" @click.passive="openCouponModel(true)">
                建立新的優惠券
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr class="tabledisable">
                    <th>名稱</th>
                    <th>優惠碼</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in this.CouponData" :key="key" class="tabledisable">
                    <td>{{ item.title }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.percent }}%</td>
                    <td>{{ $filters.date(item.due_date) }}</td>
                    <td>
                        <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                        <span v-else class="text-muted">未起用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary btn-sm"
                                @click="openCouponModel(false,item)"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)"><i class="bi bi-trash3"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <couponModal ref="couponModal" @update-coupon="updateCoupon" :coupon = "tempCouponitem"/>
        <DelModal :item="tempCoupon" ref="delModal" @del-item="DelCoupon" />
    </div>
    <Pagination :pages="pagination" @updata-page = "getCouponData"></Pagination>
    <Loading :active="isLoading"></Loading>
</template>
<style>
    @media(max-width: 414px){
        .tabledisable td:nth-child(4),.tabledisable th:nth-child(4){
            display:none;
        }
    }
</style>
<script>
import CouponModal from '../components/CouponModal.vue';
import Pagination from '../components/Pagination.vue';
import DelModal from '../components/DelModal.vue';
export default {
    components: { CouponModal, Pagination, DelModal },
    props: {
        config: Object
    },
    data () {
        return {
            tempCoupon: {}, // 單一刪除
            isLoading: false,
            CouponData: [],
            pagination: {},
            isNew: false,
            tempCouponitem: {} // 單一資料編輯
        };
    },
    methods: {
        // 取得資料
        getCouponData (page = 1) {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
                this.$http.get(api)
                .then((res) => {
                    this.isLoading = false;
                    if (res.data.success) {
                        this.CouponData = res.data.coupons;
                        this.pagination = res.data.pagination;
                        this.isLoading = false;
                    }
                });
        },
        // 開啟編輯或新增modal
        openCouponModel (isNew, item) {
            if (isNew) {
                this.tempCouponitem = {};
            } else {
                this.tempCouponitem = { ...item };
            }
            this.isNew = isNew;
            const productComponent = this.$refs.couponModal;
            productComponent.showModel();
        },
        // 開啟刪除modal
        openDelCouponModal (item) {
            const productComponent = this.$refs.delModal;
            this.tempCoupon = { ...item };
            productComponent.showModel();
        },
        // 刪除
        DelCoupon (item) {
            this.isLoading = true;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item}`;
            const productComponent = this.$refs.delModal;
                this.$http.delete(api, { data: this.tempProduct })
                .then((response) => {
                    console.log(response);
                    this.isLoading = false;
                    productComponent.hideModel();
                    if (response.data.success) {
                        this.getCouponData();
                        this.$httpMessageState(response, '刪除成功');
                    } else {
                        this.$httpMessageState(response, '刪除失敗');
                    }
                });
        },
        // 跟新
        updateCoupon (item) {
                this.isLoading = true;
                this.tempCoupon = item;
                const dateTime = +new Date(this.tempCoupon.due_date);
                const timestamp = Math.floor(dateTime / 1000);
                const productComponent = this.$refs.couponModal;
                this.tempCoupon.due_date = timestamp;
                // 新增
                let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
                let httpMethod = 'post';
                // 編輯
                if (!this.isNew) {
                    api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
                    httpMethod = 'put';
                };
                this.$http[httpMethod](api, { data: this.tempCoupon })
                .then((response) => {
                    productComponent.hideModel();
                    this.isLoading = false;
                    if (response.data.success) {
                        this.getCouponData();
                        if (!this.isNew) {
                            this.$httpMessageState(response, '編輯成功');
                        } else {
                            this.$httpMessageState(response, '新增優惠卷成功');
                        }
                    } else {
                        if (!this.isNew) {
                            this.$httpMessageState(response, '編輯失敗');
                        } else {
                            this.$httpMessageState(response, '新增優惠卷失敗');
                        }
                    }
                });
        }
    },
    created () {
        this.getCouponData();
    }
};
</script>
