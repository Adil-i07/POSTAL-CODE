/*
 * Postal-area update for the main postal-code map.
 * Load this immediately after js/core.js and before js/places.js.
 */
(() => {
  const province = DATA.find(p => p.areaCode === '203');
  if (!province) return;

  province.provName = 'ราษฎรบุรี';

  // Split the former Mueang entry into the three requested subdistricts.
  const oldEntries = province.entries;
  const oldMueang = oldEntries.findIndex(entry => entry.zip === '20327');
  if (oldMueang < 0) return;
  province.entries.splice(oldMueang, 1,
    { zip: '20327', name: 'เมืองราษฎรบุรี' },
    { zip: '20332', name: 'สลัมคลองเจ๋ง' },
    { zip: '20333', name: 'วรวงศ์' }
  );

  // Keep the new subdistricts inside the former Mueang cell. The shared
  // boundaries follow the north-south road and the west-to-southeast road
  // shown in the supplied reference map.
  const oldCells = DS[2];
  DS[2] = [
    oldCells[0],
    '968,303 1050,303 1050,370 1025,370 1000,350 985,330 968,330',
    '1050,303 1088,303 1088,410 1050,410',
    '968,330 985,330 1000,350 1025,370 1050,370 1050,410 968,410',
    ...oldCells.slice(2)
  ];

  // Rebuild SVG polygons, labels, and hit-test geometry using the updated data.
  rebuildBase();

  // The old fixed notice describes an obsolete province/area rename.
  try {
    const key = 'rn_seen';
    const seen = JSON.parse(localStorage.getItem(key) || '[]');
    if (!seen.includes('rn-20327-v1')) {
      seen.push('rn-20327-v1');
      localStorage.setItem(key, JSON.stringify(seen));
    }
  } catch (_) {}
})();
