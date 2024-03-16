function rect_from_bcr({left, top, right, bottom} = {})
{
    return {x: left, y: top, w: right - left, h: bottom - top};
}

export default rect_from_bcr;
