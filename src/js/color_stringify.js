import tinycolor2 from 'tinycolor2';

function color_stringify(color)
{
    if (color.a != 1) {
        return tinycolor2(color.rgba).toRgbString();
    }
    return color.hex;
}

export default color_stringify;
