<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h5 class="modal-title text-light" id="exampleModalLabel" v-if="(this.istitle === true)">刪除產品</h5>
                    <h5 class="modal-title text-light" id="exampleModalLabel" v-if="(this.istitle === false)">刪除優惠卷</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span v-if="(this.istitle === true)">是否確定要刪除【{{this.tempProduct.title}}】</span>
                    <span v-if="(this.istitle === false)">是否確定要刪除【{{this.couponData.title}}】優惠卷</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger"  @click.prevent="$emit('del-product',tempProduct.id)" v-if="(this.istitle === true)">確定</button>
                    <button type="button" class="btn btn-danger"  @click.prevent="$emit('del-item',couponData.id)" v-if="(this.istitle === false)">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modalMixin from '@/Mixin/modalMixin';
export default {
    props: {
        DelProductData: {
            type: Object,
            defaule () {
                return {};
            }
        },
        item: {
            type: Object,
            defaule () {
                return {};
            }
        }
    },
    watch: {
        DelProductData () {
            this.tempProduct = this.DelProductData;
            this.istitle = true;
        },
        item () {
            this.couponData = this.item;
            this.istitle = false;
        }
    },
    data () {
        return {
            modal: {},
            tempProduct: {},
            couponData: {},
            istitle: true
        };
    },
    methods () {

    },
    emits: ['del-item', 'del-product'],
    mixins: [modalMixin]
};
</script>
