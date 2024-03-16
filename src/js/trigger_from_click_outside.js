import jQuery from 'jquery';

function trigger_from_click_outside(elems, fn)
{
    const listeners = {click};
    jQuery(document).on(listeners);
    return {off};
    function click(event) {
        if (jQuery(event.target).closest(elems).length == 0) {
            fn();
        }
    }
    function off() {
        jQuery(document).off(listeners);
    }
}

export default trigger_from_click_outside;
