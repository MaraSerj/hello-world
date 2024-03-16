import rect_from_size from './rect_from_size';
import window_size from './window_size';

function window_rect_visible()
{
    const size = window_size();
    const x = document.documentElement.scrollLeft;
    const y = document.documentElement.scrollTop;
    return {x, y, w: x + size.w, h: y + size.h};
}

export default window_rect_visible;
