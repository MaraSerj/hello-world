import popover from './popover';

function popover_color(value)
{
    return popover({template: '<popover-color v-on:end="end" v-model="value" />', data: {value}});
}

export default popover_color;
