<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-light" id="exampleModalLabel">訂購資訊</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div>
                            <Form class="col" v-slot="{ errors }" @submit="createOrder">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <Field id="email" name="email" type="email" class="form-control"
                                        :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                                        rules="email|required" v-model="form.user.email"></Field>
                                    <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                                </div>

                                <div class="mb-3">
                                    <label for="name" class="form-label">收件人姓名</label>
                                    <Field id="name" name="姓名" type="text" class="form-control"
                                        :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required"
                                        v-model="form.user.name"></Field>
                                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                                </div>

                                <div class="mb-3">
                                    <label for="tel" class="form-label">收件人電話</label>
                                    <Field id="tel" name="電話" type="tel" class="form-control"
                                        :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" rules="required"
                                        v-model="form.user.tel"></Field>
                                    <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                                </div>

                                <div class="mb-3">
                                    <label for="address" class="form-label">收件人地址</label>
                                    <Field id="address" name="地址" type="text" class="form-control"
                                        :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                                        v-model="form.user.address"></Field>
                                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                                </div>

                                <div class="mb-3">
                                    <label for="message" class="form-label">留言</label>
                                    <textarea name="" id="message" class="form-control" cols="30" rows="10"
                                        v-model="form.message"></textarea>
                                </div>
                                <div class="text-end modal-footer"  style="padding-bottom: 0;">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                    @click.prevent="$emit('User-Order-Previous')">上一步</button>
                                    <button class="btn btn-primary" @click.prevent="$emit('User-Order-checkout', form)" v-if="form.user.address !== '' || form.user.email !== '' || form.user.name !== '' || form.user.tel !== ''">送出訂單</button>
                                    <button class="btn btn-primary" v-else>送出訂單</button>
                                    <!-- <button class="btn btn-primary" @click.prevent="$emit('User-Order-checkout', form)">送出訂單</button> -->
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-primary" >結帳</button>
            </div> -->
        </div>
    </div>
</div>
</template>
<script>
    import modalMixin from '@/Mixin/modalMixin';
    export default {
    props: {
        userorder: {
            type: Object,
            defaule () {
                return {};
            }
        }
    },
    watch: {

    },
    data () {
        return {
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
        };
    },
    methods: {
        createOrder () {
        }
    },
    emits: ['User-Order-Previous', 'User-Order-checkout'],
    mixins: [modalMixin]
};
</script>
