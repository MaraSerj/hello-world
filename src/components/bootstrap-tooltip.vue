<script>
    import jQuery from 'jquery';

    const bootstrap_tooltip = {
        props: ['value', 'html', 'placement', 'delay'],
        render: function () {
            return this.$slots.default[0];
        },
        mounted: function () {
            jQuery(this.$el).tooltip({
                title: this.value,
                html: String(this.html) == 'true',
                delay: {show: +this.delay || 0, hide: 0},
                toggle: 'tooltip',
                placement: this.placement || 'top',
                container: 'body',
                template: '<div class="tooltip bn-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            });
        },
        beforeDestroy: function () {
            jQuery(this.$el).tooltip('destroy');
        }
    };

    export default bootstrap_tooltip;
</script>

<style>
    .tooltip-inner[class] {
        max-width: 500px;
    }
</style>
