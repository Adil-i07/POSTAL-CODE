
/*
 * Postal-area update for the main postal-code map.
 * Load immediately after js/core.js and before js/places.js.
 */
(() => {
  const province = DATA.find(p => p.areaCode === '203');
  if (!province) return;

  province.provName = 'ราษฎรบุรี';

  // Update postal entries
  const oldMueang = province.entries.findIndex(
    entry => entry.zip === '20327'
  );

  if (oldMueang < 0) return;

  province.entries.splice(
    oldMueang,
    1,
    { zip: '20327', name: 'เมืองราษฎรบุรี' },
    { zip: '20332', name: 'สลัมคลองเจ๋ง' },
    { zip: '20333', name: 'วรวงศ์' }
  );

  // Three new subdistrict boundaries
  // Right: สลัมคลองเจ๋ง
  const right = [
    [1088, 309.7],
    [1088, 410],
    [1050.3, 410],
    [1050.2, 316.9]
  ];

  // North: เมืองราษฎรบุรี
  const north = [
    [1050.2, 316.9],
    [1050.2, 379.9],
    [1010, 379.9],
    [995, 364.9],
    [985.1, 350],
    [985.1, 329.5]
  ];

  // South: วรวงศ์
  const south = [
    [985, 329.6],
    [985.1, 350],
    [994.9, 364.9],
    [1010.1, 380],
    [1050.3, 379.9],
    [1050.8, 409.9],
    [967.9, 409.8],
    [968.1, 332.8],
    [984.9, 329.5]
  ];

  // Convert coordinates to SVG polygon strings
  const toPolygon = points =>
    points.map(([x, y]) => `${x},${y}`).join(' ');

  const oldCells = DS[2];

  // Keep all other areas unchanged
  DS[2] = [
    oldCells[0],
    toPolygon(north),
    toPolygon(right),
    toPolygon(south),
    ...oldCells.slice(2)
  ];

  // Rebuild map geometry, labels and hit areas
  rebuildBase();

  // Mark the new province announcement as seen
  try {
    const key = 'rn_seen';
    const seen = JSON.parse(localStorage.getItem(key) || '[]');

    if (!seen.includes('rn-20327-v1')) {
      seen.push('rn-20327-v1');
      localStorage.setItem(key, JSON.stringify(seen));
    }
  } catch (_) {}
})();
