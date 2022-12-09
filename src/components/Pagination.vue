<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage('pre')">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{'active':page === pages.current_page}">
                <a class="page-link" href="#" @click.prevent="updatePage(page)">
                {{page}}
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage('next')">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
    data () {
        return {
            pagesdata: {}
        };
    },
    props: ['pages'],
    methods: {
        updatePage (pagenextpre) {
            this.pagesdata = this.pages;
            if (pagenextpre === 'pre') {
                if (this.pagesdata.has_pre) {
                    this.$emit('updata-page', this.pagesdata.current_page - 1);
                }
            } else if (pagenextpre === 'next') {
                if (this.pagesdata.has_next) {
                    this.$emit('updata-page', this.pagesdata.current_page + 1);
                }
            } else {
                this.$emit('updata-page', pagenextpre);
            }
        },
        nextpage () {

        },
        prepage () {

        }
    }
};
</script>
