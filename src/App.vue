<template>
    <div id="app">
        <vue-quill-v2 v-model="text" class="min-hh" />
        <pre>{{ text }}</pre>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data: function () {
            return {
                text: '',
            };
        },
    };
</script>

<style>
    body {
        background: #20262E;
        padding: 20px;
        font-family: Helvetica;
    }

    #app {
        background: #fff;
        border-radius: 4px;
        padding: 20px;
        transition: all 0.2s;

        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
        min-width: 0;
        min-height: 0;
    }
    .min-hh {min-height: 100%;}
    .w10 {width: 10px;}
    .w5 {width: 5px;}
    .w10 {width: 10px;}
    .w13 {width: 13px;}
    .w12 {width: 12px;}
    .w20 {width: 20px;}
    .h20 {height: 20px;}
    .h23 {height: 23px;}
    .h13 {height: 13px;}
    .h12 {height: 12px;}
    li {
        margin: 8px 0;
    }

    h2 {
        font-weight: bold;
        margin-bottom: 15px;
    }

    del {
        color: rgba(0, 0, 0, 0.3);
    }

    .vue-quill-v2 {
        text-rendering: optimizeLegibility;
        font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        font-family: "Inter", sans-serif;
        font-weight: normal;
        font-size: 13px;
        line-height: 1.5em;
        scrollbar-color: #e0e5ea transparent;
        box-sizing: border-box;
        min-height: 100%;
        transition: color 0.2s, border-color 0.2s;
        position: relative;
        border: 1px solid #e0e2e5;
        border-radius: 4px;
        color: black;
        border-color: #1fc64e;
        width: 400px;
    }

    .vue-quill-v2:hover, .vue-quill-v2.active {
        color: black;
        border-color: #1fc64e;
    }

    .vue-quill-v2 .ql-container.ql-snow {
        text-rendering: optimizeLegibility;
        font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        font-weight: normal;
        line-height: 1.5em;
        scrollbar-color: #e0e5ea transparent;
        color: black;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0px;
        position: relative;
        box-sizing: border-box;
        border: none;
    }

    .vue-quill-v2:not(.active) .vue-quill-v2-toolbar {
        pointer-events: none;
    }

    .vue-quill-v2.active .vue-quill-v2-toolbar {
        height: 32px;
        opacity: 1;
    }

    .vue-quill-v2-toolbar {
        text-rendering: optimizeLegibility;
        font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        font-family: "Inter", sans-serif;
        font-weight: normal;
        font-size: 13px;
        line-height: 1.5em;
        scrollbar-color: #e0e5ea transparent;
        box-sizing: border-box;
        justify-content: space-around;
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        transition: height 0.2s, opacity 0.2s;
        color: #a4aab0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        height: 32px;
        opacity: 1;
    }

    .vue-quill-v2-toolbar button {
        padding: 5px;
        color: #A4AAB0;
    }

    .vue-quill-v2-toolbar button:hover, .vue-quill-v2-toolbar button.active {
        color: #21d353;
    }

    .vue-quill-v2-toolbar button:first-child {
        padding-left: 10px;
    }

    .vue-quill-v2-toolbar i {
        display: block;
        color: inherit !important;
    }

    .vue-quill-v2-enum {
        height: 30px;
        font-family: 'Inter', sans-serif;
        font-weight: normal;
        font-size: 13px;
        line-height: 30px;
    }

    .vue-quill-v2-enum .multiselect__content-wrapper {
        overflow-x: hidden;
    }

    .vue-quill-v2-enum .multiselect {
        min-height: auto;
    }

    .vue-quill-v2-enum .multiselect__tags {
        width: 90px;
        min-height: auto;
        margin: 0;
        padding: 0;
        border: none;
    }

    .vue-quill-v2-enum .multiselect__select {
        top: 0;
        right: 0;
        width: 20px;
        height: 25px;
        margin: 0;
        padding: 0;
    }

    .vue-quill-v2-enum .multiselect__placeholder {
        margin: 0;
        padding: 0 0 0 10px;
    }

    .vue-quill-v2-enum .multiselect__single {
        width: 75px;
        margin: 0;
        padding: 0 0 0 10px;
        min-height: auto;
        font-size: inherit;
        line-height: inherit;
    }

    .vue-quill-v2-enum .multiselect__element {
        color: #A4AAB0;
        background: white;
    }

    .vue-quill-v2-enum .multiselect__input {
        width: 75px !important;
        padding: 5px !important;
        font-size: 13px;
    }

    .vue-quill-v2-enum .multiselect__option--selected,
    .vue-quill-v2-enum .multiselect__option--highlight,
    .vue-quill-v2-enum .multiselect__option--selected.multiselect__option--highlight {
        color: white;
        background: #21d353;
    }

    .vue-quill-v2-toolbar button {
        cursor: pointer;
        box-sizing: content-box;
        border: none;
        margin: 0;
        background: none;
        user-select: none;
        color: #A4AAB0;
        transition: color 0.2s;
        padding: 5px 5px 5px 10px;
    }

    .vue-quill-v2-toolbar button:hover {
        color: #21d353;
    }

</style>
