// select a point on a rectangle
function rect_point(r, mx, my)
{
    return {
        x: r.x + r.w*mx,
        y: r.y + r.h*my
    };
}

export default rect_point;
