import Vue from 'vue';
import elem_align from './elem_align';
import jQuery from 'jquery';
import trigger_from_click_outside from './trigger_from_click_outside';

function popover(props)
{
    return new Vue({
        el: document.body.appendChild(document.createElement('DIV')),
        mixins: [props],
        methods: {
            end: function (retval) {
                // console.log('[popover]', 'end', {retval});
                this.retval = retval;
                this.$destroy();
                jQuery(this.$el).remove();
            },
            promise: function () {
                // console.log('[popover]', 'promise');
                return new Promise(resolve => {
                    this.$once('hook:beforeDestroy', () => resolve(this.retval));
                });
            },
            align: function (target, x = 0.5, y = 1) {
                // console.log('[popover]', 'align', {target, x, y});
                elem_align(this.$el, target, x, y);
                return this;
            },
            /**
             * The standard workflow for popovers:
             *
             *     1. Align popover relative to some target element
             *     2. Wait until closed
             *     3. Watch for value changes
             *
             * @param target
             * @param watch
             * @returns {methods}
             */
            workflow: function ({target, change} = {}) {
                // console.log('[popover]', 'workflow', {target, change});
                elem_align(this.$el, target, 0.5, 1);
                if (!this.trigger) {
                    // Skip `click` event for `target`
                    // this.$nextTick(function () {
                    //     this.trigger = trigger_from_click_outside([this.$el], () => this.end(this.value));
                    //     this.$once('hook:beforeDestroy', this.trigger.off);
                    // });
                    setTimeout(() => {
                        this.trigger = trigger_from_click_outside([this.$el], () => this.end(this.value));
                        this.$once('hook:beforeDestroy', this.trigger.off);
                    }, 1);
                }
                if (change) {
                    this.$watch('value', change);
                }
                return this;
            },
            show: function () {
            }
        }
    });
}

export default popover;
