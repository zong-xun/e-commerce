<template>
    <Loading :active="isLoading"></Loading>
    <ToastMessages></ToastMessages>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/user/cart" class="nav-link navbar-brand" >阿勳商場</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/user/cart" class="nav-link" >購物頁</router-link>
                    <router-link to="/" class="nav-link">管理者</router-link>
                </div>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <form class="row justify-content-center" @submit.prevent="sigin">
            <div class="col-md-6">
                <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
                <div class="mb-2">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required
                        autofocus  v-model="user.username"/>
                </div>
                <div class="mb-2">
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password"/>
                </div>
                <div class="text-end mt-4">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import ToastMessages from '../components/ToastMessages.vue';
    export default {
        data () {
            return {
            isLoading: false,
            user: {
                username: '',
                password: ''
            }
        };
        },
        components: {
            ToastMessages
        },
        inject: ['emitter'],
        methods: {
            sigin () {
                this.isLoading = true;
                const api = `${process.env.VUE_APP_API}admin/signin`;
                this.$http.post(api, this.user)
                .then((res) => {
                    this.isLoading = false;
                    if (res.data.success) {
                        const {
                            token, expired
                        } = res.data;
                        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                        this.$router.push('/dashboard/products');
                    } else {
                        this.emitter.emit('push-message', {
                            style: 'danger',
                            title: '登入失敗',
                            content: res.data.message
                        });
                        this.$router.push('/');
                    }
                });
            }
        }
    };
</script>
