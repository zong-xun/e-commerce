<template>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">{{this.modeltitle}}優惠券</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                            placeholder="請輸入標題">
                    </div>
                    <div class="mb-3">
                        <label for="coupon_code">優惠碼</label>
                        <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                            placeholder="請輸入優惠碼">
                    </div>
                    <div class="mb-3">
                        <label for="due_date">到期日</label>
                        <input type="date" class="form-control" id="due_date" v-model="tempCoupon.due_date">
                    </div>
                    <div class="mb-3">
                        <label for="price">折扣百分比</label>
                        <input type="number" class="form-control" id="price" v-model.number="tempCoupon.percent"
                            placeholder="請輸入折扣百分比">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                                v-model="tempCoupon.is_enabled" id="is_enabled">
                            <label class="form-check-label" for="is_enabled">
                                是否啟用
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">確定
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modalMixin from '@/Mixin/modalMixin';
export default {
    name: 'couponModal',
    props: {
        coupon: {
            type: Object,
            defaule () {
                return {};
            }
        }
    },
    watch: {
        coupon () {
            this.tempCoupon = this.coupon;
            if (this.coupon.due_date !== undefined) {
                const localDate = new Date(this.tempCoupon.due_date * 1000);
                this.tempCoupon.due_date = localDate.toISOString().split('T')[0];
                this.modeltitle = '編輯';
            } else {
                this.tempCoupon.is_enabled = 0;
                this.modeltitle = '新增';
            }
        }
    },
    data () {
        return {
            tempCoupon: {
            },
            modeltitle: '新增',
            due_date: ''
        };
    },
    emits: ['update-coupon'],
    mixins: [modalMixin]
};
</script>
