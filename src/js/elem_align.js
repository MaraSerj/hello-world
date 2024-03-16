import rect_from_bcr from './rect_from_bcr';
import rect_from_size from './rect_from_size';
import rect_point from './rect_point';
import rect_move_inside from './rect_move_inside';
import window_rect_visible from './window_rect_visible';

function elem_align(source_elem, target_elem, x = 0, y = 0.5)
{
    const target = rect_from_bcr(target_elem.getBoundingClientRect());
    const source = rect_from_bcr(source_elem.getBoundingClientRect());
    const a = rect_point(target, x, y);
    const b = rect_point(rect_from_size(source), 1 - x, 1 - y);
    source.x = a.x - b.x;
    source.y = a.y - b.y;
    const tmp = rect_move_inside(source, window_rect_visible());
    source_elem.style.left = tmp.x + 'px';
    source_elem.style.top = tmp.y + 'px';
}

export default elem_align;
