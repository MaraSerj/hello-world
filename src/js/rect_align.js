// move rectangle relative to the point
function rect_align(r, p, mx, my)
{
    return {
        x: p.x - mx*r.w,
        y: p.y - my*r.h,
        w: r.w,
        h: r.h
    };
}

export default rect_align;
