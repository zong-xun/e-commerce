import Modal from 'bootstrap/js/dist/modal';

export default {
    methods: {
        showModel () {
            this.modal.show();
        },
        hideModel () {
            this.modal.hide();
        }
    },
    mounted () {
        this.modal = new Modal(this.$refs.modal);
    }
};
