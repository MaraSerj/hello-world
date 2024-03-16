import Vue from 'vue';
import App from './App.vue';
import bootstrap_tooltip from './components/bootstrap-tooltip.vue';
import input_enum from './components/input-enum.vue';
import popover_color from './components/popover-color.vue';
import vue_quill_v2 from './components/vue-quill-v2.vue';
import svg_icon_text_align_center from './components/svg/svg-icon-text-align-center.vue';
import svg_icon_text_align_left from './components/svg/svg-icon-text-align-left.vue';
import svg_icon_text_align_right from './components/svg/svg-icon-text-align-right.vue';
import svg_icon_text_bg_color from './components/svg/svg-icon-text-bg-color.vue';
import svg_icon_text_bold from './components/svg/svg-icon-text-bold.vue';
import svg_icon_text_color from './components/svg/svg-icon-text-color.vue';
import svg_icon_text_format_clear from './components/svg/svg-icon-text-format-clear.vue';
import svg_icon_text_italic from './components/svg/svg-icon-text-italic.vue';
import svg_icon_text_strikethrough from './components/svg/svg-icon-text-strikethrough.vue';
import svg_icon_text_underline from './components/svg/svg-icon-text-underline.vue';
import svg_icon_text_wrap from './components/svg/svg-icon-text-wrap.vue';
import "vue-multiselect/dist/vue-multiselect.min.css";
Vue.config.productionTip = false;

Vue.component('input-enum', input_enum);
Vue.component('vue-quill-v2', vue_quill_v2);
Vue.component('chrome-picker', require('vue-color').Chrome);
Vue.component('multiselect', require('vue-multiselect').default);
Vue.component('bootstrap-tooltip', bootstrap_tooltip);
Vue.component('popover-color', popover_color);
Vue.component('svg-icon-text-align-center', svg_icon_text_align_center);
Vue.component('svg-icon-text-align-center', svg_icon_text_align_center);
Vue.component('svg-icon-text-align-left', svg_icon_text_align_left);
Vue.component('svg-icon-text-align-right', svg_icon_text_align_right);
Vue.component('svg-icon-text-bg-color', svg_icon_text_bg_color);
Vue.component('svg-icon-text-bold', svg_icon_text_bold);
Vue.component('svg-icon-text-color', svg_icon_text_color);
Vue.component('svg-icon-text-format-clear', svg_icon_text_format_clear);
Vue.component('svg-icon-text-italic', svg_icon_text_italic);
Vue.component('svg-icon-text-strikethrough', svg_icon_text_strikethrough);
Vue.component('svg-icon-text-underline', svg_icon_text_underline);
Vue.component('svg-icon-text-wrap', svg_icon_text_wrap);

new Vue({
    render: h => h(App),
}).$mount('#app');
