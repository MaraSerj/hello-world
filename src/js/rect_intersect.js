function rect_intersect(a, b)
{
    const x1 = Math.max(a.x, b.x);
    const y1 = Math.max(a.y, b.y);
    const x2 = Math.min(a.x + a.w, b.x + b.w);
    const y2 = Math.min(a.y + a.h, b.y + b.h);
    return {x: x1, y: y1, w: Math.max(0, x2 - x1), h: Math.max(0, y2 - y1)};
}

export default rect_intersect;
