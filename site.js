// Optical edge, as in the app (ios/Shared/Design/Components.swift, `Optical`):
// a large Caslon "K" starts its ink a few pixels right of its box, and an "A"
// reaches past it to the left, so a headline whose box is on the column edge
// looks off it. Shift each text block by its first glyph's side bearing, in
// either direction, so the INK meets the edge. Headline sizes follow the
// window width, so measure again after a resize.
const ctx = document.createElement('canvas').getContext('2d');

function optical() {
  for (const el of document.querySelectorAll('h1, h2, h3, p, .caps, summary span')) {
    const first = el.textContent.trim()[0];
    if (!first) continue;
    const s = getComputedStyle(el);
    ctx.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    // actualBoundingBoxLeft: how far the ink reaches left of the origin
    // (negative when it starts to the right of it).
    const reach = ctx.measureText(s.textTransform === 'uppercase' ? first.toUpperCase() : first).actualBoundingBoxLeft;
    el.style.translate = reach ? `${reach.toFixed(2)}px 0` : '';
  }
}

document.fonts.ready.then(optical);
let pending;
addEventListener('resize', () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(optical); });
