function rect_move_inside(a, b)
{
    return {
        x: Math.min(b.x + b.w - a.w, Math.max(b.x, a.x)),
        y: Math.min(b.y + b.h - a.h, Math.max(b.y, a.y)),
        w: a.w,
        h: a.h
    };
}

export default rect_move_inside;
