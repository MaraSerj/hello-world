import elem_is_visible from './elem_is_visible';
import jQuery from 'jquery';

const listeners = [];
const listeners_jquery = {
    mouseup: () => setTimeout(check, 0),
};
let timer = null;

/**
 * Fire an event when an element become visible (once for
 * each transition hidden -> visible).
 */
function trigger_from_elem_visible(elem, callback)
{
    attach(elem, callback);
    return {off: () => detach(elem, callback)};
}

function attach(elem, callback)
{
    let i = listeners.findIndex(v => v.elem === elem);
    if (i == -1) {
        i = listeners.push({elem, visibility: null, callbacks: []}) - 1;
    }
    listeners[i].callbacks.push(callback);
    if (listeners.length == 1) {
        jQuery(document).on(listeners_jquery);
        timer = setInterval(check, 250);
    }
}

function detach(elem, callback)
{
    const i = listeners.findIndex(v => v.elem === elem);
    if (i != -1) {
        const row = listeners[i];
        const j = row.callbacks.indexOf(callback);
        if (j != -1) {
            if (row.callbacks.length > 1) {
                row.callbacks.splice(j, 1);
            }
            else {
                listeners.splice(i, 1);
                if (listeners.length == 0) {
                    jQuery(document).off(listeners_jquery);
                    clearInterval(timer);
                    timer = null;
                }
            }
        }
    }
}

function check()
{
    for (let i = 0, end = listeners.length; i < end; ++i) {
        const row = listeners[i];
        const visible = elem_is_visible(row.elem);
        if (row.visibility != visible) {
            row.visibility = visible;
            if (visible) {
                row.callbacks.forEach(notify);
            }
        }
    }
}

function notify(cb)
{
    try {
        cb();
    }
    catch (error) {
        if (__DEV__) {
            console.error('[trigger_from_element_visible] notify failed', error);
        }
    }
}

export default trigger_from_elem_visible;
