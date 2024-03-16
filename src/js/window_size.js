// http://stackoverflow.com/a/11744120
function window_size()
{
    const w = window;
    const d = document;
    const e = d.documentElement;
    const b = d.getElementsByTagName('body')[0];
    return {
        w: w.innerWidth || e.clientWidth || b.clientWidth,
        h: w.innerHeight|| e.clientHeight|| b.clientHeight
    };
}

export default window_size;
