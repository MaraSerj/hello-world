<template>
    <!-- XXX Deprecated in favor of el-select+el-option -->
    <multiselect v-on:search-change="emit_search_change" v-on:tag="emit_insert" v-on:open="open" v-on:close="close" v-model="model" v-bind="multiselect_props">
        <template slot="tag" slot-scope="props">
            <span class="multiselect__tag">
                <img v-if="props.option.icon" v-bind:src="props.option.icon" v-bind:alt="props.option.title" class="tag-img">
                <span>
                    {{ props.option.title }}
                </span>
                <i v-on:click="props.remove(props.option)" class="multiselect__tag-icon" aria-hidden="true" tabindex="1"></i>
            </span>
        </template>
        <template slot="option" slot-scope="props">
            <div class="custom-option">
                <span v-if="multiple_norm" class="option_check"></span>
                <img v-if="props.option.icon" v-bind:src="props.option.icon" v-bind:alt="props.option.title" class="option_image">
                <span class="option_title">
                    {{ props.option.title }}
                </span>
            </div>
        </template>
        <template slot="clear">
            <!-- v-if="(clear_norm && !empty)" hides dropdown after first select -->
            <!--
                Clear value on mousedown will lead on not desirable side
                effect on modal-translations-translate component. On mousedown
                everything get cleaned and modal shrinks and displays at center,
                mouse pointer appears on modal overlay. After mouseup event
                bootstrap hides modal, thinking a user was clicked on overlay.
            -->
            <div v-show="clear_norm && !empty" v-on:mousedown.prevent.stop v-on:mouseup.prevent.stop="$emit('input', multiple_norm ? [] : null)" class="multiselect__clear"></div>
        </template>
        <span slot="noResult">
            Nothing found
        </span>
    </multiselect>
</template>

<script>
    function prop(obj)
    {
        if (obj === null || obj === undefined) {
            return null;
        }
        return ('value' in obj) ? obj.value : obj.name;
    }

    function check(option, value)
    {
        const p = prop(option);
        if (p && value && option.value_key) {
            return p[option.value_key] == value[option.value_key];
        }
        return p == value;
    }

    // <input-banners v-model="banners" v-bind:query="query_banner" />
    // query_banners: am(async function () {
    //     return await api_banners_query({folder: this.folder});
    // })
    //
    // Having function as a query parameter there also should be some way to reload
    // input-banners when call to query function will return different results. Option
    // parameter has no this issue.

    const input_enum = {
        props: ['value', 'options', 'multiple', 'clear', 'hardlimit', 'limit', 'limitall', 'placeholder', 'multiselect', 'disabled', 'normalize', 'insert'],
        data: function () {
            return {
                opened: false,
            };
        },
        computed: {
            model: {
                get: function () {
                    return this.value_norm;
                },
                set: function (next) {
                    if (this.multiple_norm) {
                        this.$emit('input', next.slice(-this.hardlimit).map(prop));
                    }
                    else {
                        this.$emit('input', prop(next));
                    }
                }
            },
            closed: function () {
                return !this.opened;
            },
            empty: function () {
                return this.multiple_norm ? (this.value && this.value.length == 0) : !this.value;
            },
            clear_norm: function () {
                return this.clear !== undefined && this.clear !== false;
            },
            limitall_norm: function () {
                return this.limitall !== undefined && this.limitall !== false;
            },
            multiple_norm: function () {
                return this.multiple !== undefined && this.multiple !== false;
            },
            options_norm: function () {
                return this.options ? this.options.map(function (option) {
                    return {$isDisabled: option.disabled, ...option};
                }) : [];
            },
            value_norm: function () {
                if (this.multiple_norm) {
                    return this.value ? this.value.map(v => this.options_norm.find(w => check(w, v))).filter(v => v) : [];
                }
                return this.options_norm.find(v => check(v, this.value));
            },
            insert_norm: function () {
                return this.insert !== undefined && this.insert !== false;
            },
            multiselect_props: function () {
                return {
                    allowEmpty: this.clear_norm,
                    // [Vue-Multiselect warn]: ClearOnSelect and Multiple props can’t be both set to false.
                    clearOnSelect: !this.multiple_norm,
                    closeOnSelect: !this.multiple_norm,
                    deselectLabel: '',
                    label: 'title',
                    limit: Number(this.limit) || 5,
                    // XXX Probably it should not be here
                    limitText: count => {
                        if (this.limitall_norm) {
                            count -= this.value.length == this.options.length;
                        }
                        return count ? `and ${count} more` : null;
                    },
                    optionHeight: 46,
                    // maxHeight: 150,
                    multiple: this.multiple_norm,
                    options: this.options_norm,
                    placeholder: this.placeholder || 'Selection option',
                    searchable: true,
                    selectedLabel: '',
                    selectLabel: '',
                    showLabels: false,
                    taggable: this.insert_norm,
                    trackBy: 'name',
                    disabled: this.disabled,
                    ...this.multiselect
                };
            }
        },
        watch: {
            options: function () {
                // There is an array of image urls, and a url selected previously.
                // If image urls array does not contains selected url the image
                // still should be displayed to the user.
                //
                // Basically, when disabled, it means - keep input value as is,
                // even if it cannot be found in options array.
                if (this.normalize === false) {
                    return;
                }
                const value_norm = this.value_norm;
                if (this.multiple_norm) {
                    if (!this.value || this.value.length != value_norm.length) {
                        this.$emit('input', value_norm.map(prop));
                    }
                }
                else if (!check(value_norm, this.value)) {
                    this.$emit('input', prop(value_norm));
                }
            }
        },
        methods: {
            emit_search_change: function (...args) {
                this.$emit('search-change', ...args);
            },
            emit_insert: function (name) {
                this.$emit('insert', name);
                // XXX Probably this is not a good way to do it.
                this.$emit('input', name);
            },
            open: function () {
                this.opened = true;
                this.$emit('open');
            },
            close: function () {
                this.opened = false;
                this.$emit('close');
            },
        }
    };

    export default input_enum;
</script>

<style>
    .multiselect__clear {
        position: absolute;
        right: 41px;
        height: 40px;
        width: 40px;
        display: block;
        cursor: pointer;
        z-index: 3;
    }
    .multiselect__clear&:before, .multiselect__clear&:after {
        content: "";
        display: block;
        position: absolute;
        width: 2px;
        height: 12px;
        background: #aaa;
        top: 14px;
        right: 6px;
    }
    .multiselect__clear&:before {
        transform: rotate(45deg);
    }
    .multiselect__clear&:after {
        transform: rotate(-45deg);
    }
</style>
