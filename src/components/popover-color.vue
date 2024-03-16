<template>
    <div style="position: absolute; top: 0; left: 0; z-index: 1000000; padding: 10px;">
        <chrome-picker v-on:input="$emit('input', color_stringify($event))" v-bind:value="value || ''" />
    </div>
</template>

<script>
    import color_stringify from '../js/color_stringify';

    const popover_color = {
        props: ['value'],
        methods: {
            color_stringify,
        }
    };

    export default popover_color;
</script>
