<template>
    <div class="vue-quill-v2" v-bind:class="{active: is_active || is_font_size_dropdown_opened}">
        <div ref="editable" class="vue-quill-v2-editable"></div>
        <div class="vue-quill-v2-toolbar">
            <button v-on:mousedown.prevent v-on:click="toggle_bold" v-bind:class="{active: format.bold}" class="vue-quill-v2-bool">
                <svg-icon-text-bold class="w10 h20" />
            </button>
            <button v-on:mousedown.prevent v-on:click="toggle_italic" v-bind:class="{active: format.italic}" class="vue-quill-v2-bool">
                <svg-icon-text-italic class="w5 h20" />
            </button>
            <button v-on:mousedown.prevent v-on:click="toggle_underline" v-bind:class="{active: format.underline}" class="vue-quill-v2-bool">
                <svg-icon-text-underline class="mt1n w10 h20" />
            </button>
            <button v-on:mousedown.prevent v-on:click="toggle_strike" v-bind:class="{active: format.strike}" class="vue-quill-v2-bool">
                <svg-icon-text-strikethrough class="w10 h13" />
            </button>
            <button v-on:mousedown.prevent v-on:click="select_color">
                <svg-icon-text-color class="mt1n w12 h12" />
            </button>
            <button v-on:mousedown.prevent v-on:click="select_background">
                <svg-icon-text-bg-color class="mt1n w10 h23" />
            </button>
            <button v-on:mousedown.prevent v-on:click="toggle_wrap" v-bind:class="{active: format.white_space == 'pre'}" class="vue-quill-v2-bool">
                <svg-icon-text-wrap class="w13 h13" />
            </button>
            <button v-on:mousedown.prevent v-on:click="clear">
                <svg-icon-text-format-clear class="w12 h12" />
            </button>
            <div class="multi-sel vue-quill-v2-enum">
                <input-enum v-on:input="update_size"
                            v-on:open="open_font_size_dropdown"
                            v-on:close="close_font_size_dropdown"
                            v-bind:value="format.size"
                            v-bind:options="size_options"
                            v-bind:multiselect="{maxHeight: 150, placeholder: 'Normal'}" />
            </div>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.bubble.css';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import Quill from 'quill';

    import popover_color from '../js/popover_color';
    function ignore() {}

    Quill.register(Quill.import('attributors/style/align'), true);
    Quill.register(Quill.import('attributors/style/background'), true);
    Quill.register(Quill.import('attributors/style/color'), true);
    Quill.register(Quill.import('attributors/style/direction'), true);
    Quill.register(Quill.import('attributors/style/font'), true);

    // https://bannernow.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=BAN&modal=detail&selectedIssue=BAN-118
    const Inline = Quill.import('blots/inline');
    class BoldBlot extends Inline {
        static blotName = 'bold';
        static tagName = 'b';
    }
    class ItalicBlot extends Inline {
        static blotName = 'italic';
        static tagName = 'i';
    }
    Quill.register(BoldBlot, true);
    Quill.register(ItalicBlot, true);

    // https://bannernow.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=BAN&modal=detail&selectedIssue=BAN-118
    const Block = Quill.import('blots/block');
    Block.tagName = 'DIV';
    Quill.register(Block, true);

    const sizeStyle = Quill.import('attributors/style/size');
    sizeStyle.whitelist = Array(300).fill(0).map((v, i)  => i >= 5 ? `${i}px` : null).filter(v => v);
    Quill.register(sizeStyle, true);

    // bannernow.com/node_modules/quill/formats/align.js
    const Parchment = Quill.import('parchment');
    const WhiteSpaceStyle = new Parchment.Attributor.Style('white_space', 'white-space', {
        scope: Parchment.Scope.INLINE,
        // https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
        whitelist: ['normal', 'pre'],
    });
    Quill.register(WhiteSpaceStyle, true);

    let ignore_change = false;

    const vue_quill_v2 = {
        props: ['value', 'placeholder'],
        data: function () {
            return {
                orig: '',
                format: {},
                selection: null,
                size_options: [{name: '', title: 'Normal'}].concat(sizeStyle.whitelist.map(v => ({name: v, title: v}))),
                is_active: true,
                is_font_size_dropdown_opened: true,
            };
        },
        watch: {
            value: 'update_html',
        },
        methods: {
            info: function (...args) {
                // if (__DEV__) {
                //     console.log(`[${this.$options._componentTag}-${this.uid()}]`, ...args);
                // }
            },
            ready: function () {
                this.info('ready');
                this.editor = new Quill(this.$refs.editable, {
                    modules: {
                        toolbar: false,
                    },
                    theme: 'snow',
                });
                this.update_html();
                this.editor.on('text-change', this.on_text_change);
                this.editor.on('editor-change', this.on_editor_change);
                this.editor.on('selection-change', this.on_selection_change);
                this.$once('hook:beforeDestroy', this.clean);
            },
            clean: function () {
                this.info('clean');
                // https://github.com/quilljs/quill/issues/662
                // > An explicit destroy is no longer necessary as Quill
                // > no longer keeps track of all editor instances. Just
                // > remove references to the instance and remove from
                // > the DOM and it will be garbage collected.
                this.editor.off('text-change', this.on_text_change);
                this.editor.off('editor-change', this.on_editor_change);
                this.editor.off('selection-chagne', this.on_selection_change);
                this.editor = null;
            },
            on_text_change: function (next, prev, source) {
                if (ignore_change) {
                    return;
                }
                this.info('text-change', next, prev, source);
                this.orig = this.editor.root.innerHTML.replace(/\s\s+/g, m => '&nbsp;'.repeat(m.length));
                if (this.orig != this.value) {
                    this.$emit('input', this.orig);
                }
            },
            on_editor_change: function () {
                this.info('editor-change');
                this.selection = this.editor.getSelection();
                if (this.selection) {
                    this.format = this.editor.getFormat(this.selection.index, this.selection.length);
                }
                else {
                    this.format = {};
                }
            },
            on_selection_change: function (next) {
                // https://codepen.io/DmitrySkripkin/pen/eeXpZB
                this.is_active = next !== null;
            },
            update_html: function () {
                this.info('update_html', JSON.stringify({orig: this.orig, value: this.value}));
                if (!this.editor || (this.orig == this.value)) {
                    this.info('update_html', 'skipped');
                    return;
                }
                // https://github.com/quilljs/quill/issues/1088#issuecomment-258252560
                const setSelection = this.editor.setSelection;
                try {
                    ignore_change = true;
                    this.editor.setSelection = ignore;
                    this.editor.pasteHTML(this.orig = this.value);
                }
                finally {
                    ignore_change = false;
                    this.editor.setSelection = setSelection;
                }
            },
            update_size: function (size) {
                this.editor.format('size', size);
            },
            toggle_bold: function () {
                this.editor.format('bold', !this.format.bold);
            },
            toggle_italic: function () {
                this.editor.format('italic', !this.format.italic);
            },
            toggle_underline: function () {
                this.editor.format('underline', !this.format.underline);
            },
            toggle_strike: function () {
                this.editor.format('strike', !this.format.strike);
            },
            toggle_wrap: function () {
                this.editor.format('white_space', this.format.white_space != 'pre' ? 'pre' : 'normal');
            },
            select_color: function (event) {
                popover_color(this.format.color).workflow({
                    target: event.target,
                    change: v => this.editor.format('color', v)
                });
            },
            select_background: function (event) {
                popover_color(this.format.background).workflow({
                    target: event.target,
                    change: v => this.editor.format('background', v),
                });
            },
            clear: function () {
                if (this.selection) {
                    this.editor.removeFormat(this.selection.index, this.selection.length);
                }
            },
            open_font_size_dropdown: function () {
                this.is_font_size_dropdown_opened = true;
            },
            close_font_size_dropdown: function () {
                this.is_font_size_dropdown_opened = false;
            },
        },
        mounted: function () {
            this.info('mounted');
            this.ready();
        }
    };

    export default vue_quill_v2;
</script>


