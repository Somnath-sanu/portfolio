import { writeFileSync, mkdirSync } from 'node:fs'

mkdirSync('src/assets/lottie', { recursive: true })

const lime = [0.49, 1, 0.702, 1]
const navy = [0.11, 0.133, 0.188, 1]
const navy2 = [0.204, 0.235, 0.322, 1]
const visorDark = [0.02, 0.18, 0.086, 1]
const skin = [0.945, 0.761, 0.49, 1]
const hoodie = [0.059, 0.463, 0.431, 1]
const pants = [0.118, 0.227, 0.373, 1]
const hair = [0.122, 0.161, 0.216, 1]
const shoe = [0.067, 0.094, 0.153, 1]
const cream = [0.6, 0.965, 0.894, 1]

function color(c) {
  return { a: 0, k: c }
}

function rect(name, w, h, r, fill, x, y) {
  return {
    ty: 'gr',
    nm: name,
    it: [
      { ty: 'rc', p: { a: 0, k: [w / 2, h / 2] }, s: { a: 0, k: [w, h] }, r: { a: 0, k: r } },
      { ty: 'fl', c: color(fill), o: { a: 0, k: 100 } },
      { ty: 'tr', p: { a: 0, k: [x, y] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
    ],
  }
}

function ellipse(name, w, h, fill, x, y) {
  return {
    ty: 'gr',
    nm: name,
    it: [
      { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [w, h] } },
      { ty: 'fl', c: color(fill), o: { a: 0, k: 100 } },
      { ty: 'tr', p: { a: 0, k: [x, y] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
    ],
  }
}

function rotKeys(frames, values) {
  const k = []
  for (let i = 0; i < frames.length; i++) {
    const item = { t: frames[i], s: [values[i]] }
    if (i < frames.length - 1) {
      item.e = [values[i + 1]]
      item.i = { x: [0.42], y: [1] }
      item.o = { x: [0.58], y: [0] }
    }
    k.push(item)
  }
  return { a: 1, k }
}

function layer({ ind, nm, p, a = [0, 0], r, shapes, parent }) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm,
    parent,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: r ?? { a: 0, k: 0 },
      p: { a: 0, k: p },
      a: { a: 0, k: a },
      s: { a: 0, k: [100, 100] },
    },
    ao: 0,
    shapes,
    ip: 0,
    op: 60,
    st: 0,
    bm: 0,
  }
}

function lottie(nm, layers) {
  return {
    v: '5.7.4',
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 320,
    nm,
    ddd: 0,
    assets: [],
    layers,
  }
}

function robot(pose) {
  const walk = pose === 'walk'
  const sit = pose === 'sit'
  const idle = pose === 'idle'
  const legA = walk ? rotKeys([0, 15, 30, 45, 60], [22, -24, 22, -24, 22]) : { a: 0, k: sit ? -78 : 4 }
  const legB = walk ? rotKeys([0, 15, 30, 45, 60], [-22, 24, -22, 24, -22]) : { a: 0, k: sit ? -72 : -4 }
  const armA = walk
    ? rotKeys([0, 15, 30, 45, 60], [-18, 16, -18, 16, -18])
    : sit
      ? rotKeys([0, 20, 40, 60], [-42, -28, -42, -28])
      : idle
        ? rotKeys([0, 30, 60], [6, 12, 6])
        : { a: 0, k: 8 }
  const armB = walk
    ? rotKeys([0, 15, 30, 45, 60], [18, -16, 18, -16, 18])
    : sit
      ? rotKeys([0, 15, 30, 45, 60], [18, 32, 18, 32, 18])
      : idle
        ? rotKeys([0, 30, 60], [-6, -12, -6])
        : { a: 0, k: -8 }
  const bodyY = sit ? 28 : 0

  return lottie(`robot-${pose}`, [
    layer({
      ind: 1,
      nm: 'legL',
      p: [78, 168 + bodyY],
      a: [9, 0],
      r: legA,
      shapes: [rect('leg', 18, 70, 8, navy2, 0, 0), rect('foot', 26, 10, 4, lime, -4, 64)],
    }),
    layer({
      ind: 2,
      nm: 'legR',
      p: [108, 168 + bodyY],
      a: [9, 0],
      r: legB,
      shapes: [rect('leg', 18, 70, 8, navy, 0, 0), rect('foot', 26, 10, 4, lime, -4, 64)],
    }),
    layer({
      ind: 3,
      nm: 'torso',
      p: [100, 132 + bodyY],
      a: [38, 40],
      shapes: [
        rect('body', 76, 80, 16, navy, 0, 0),
        rect('panel', 50, 26, 6, visorDark, 13, 18),
        ellipse('dot1', 8, 8, lime, 24, 31),
        ellipse('dot2', 8, 8, lime, 52, 31),
      ],
    }),
    layer({
      ind: 4,
      nm: 'armL',
      p: [58, 118 + bodyY],
      a: [8, 0],
      r: armA,
      shapes: [rect('arm', 16, 62, 8, navy2, 0, 0), ellipse('hand', 16, 16, lime, 8, 62)],
    }),
    layer({
      ind: 5,
      nm: 'armR',
      p: [142, 118 + bodyY],
      a: [8, 0],
      r: armB,
      shapes: [rect('arm', 16, 62, 8, navy, 0, 0), ellipse('hand', 16, 16, lime, 8, 62)],
    }),
    layer({
      ind: 6,
      nm: 'head',
      p: [100, 70 + bodyY],
      a: [34, 40],
      r: walk ? rotKeys([0, 30, 60], [-3, 3, -3]) : { a: 0, k: 0 },
      shapes: [
        rect('antenna', 6, 22, 3, navy2, 31, -18),
        ellipse('bulb', 14, 14, lime, 34, -22),
        rect('skull', 68, 52, 14, navy, 0, 8),
        rect('visor', 52, 18, 9, lime, 8, 22),
        rect('eyeL', 10, 10, 2, visorDark, 16, 26),
        rect('eyeR', 10, 10, 2, visorDark, 42, 26),
      ],
    }),
  ])
}

function human(pose) {
  const walk = pose === 'walk'
  const sit = pose === 'sit'
  const idle = pose === 'idle'
  const legA = walk ? rotKeys([0, 15, 30, 45, 60], [20, -22, 20, -22, 20]) : { a: 0, k: sit ? -76 : 3 }
  const legB = walk ? rotKeys([0, 15, 30, 45, 60], [-20, 22, -20, 22, -20]) : { a: 0, k: sit ? -70 : -3 }
  const armA = walk
    ? rotKeys([0, 15, 30, 45, 60], [-16, 14, -16, 14, -16])
    : sit
      ? rotKeys([0, 20, 40, 60], [-40, -26, -40, -26])
      : idle
        ? rotKeys([0, 30, 60], [4, 10, 4])
        : { a: 0, k: 6 }
  const armB = walk
    ? rotKeys([0, 15, 30, 45, 60], [16, -14, 16, -14, 16])
    : sit
      ? rotKeys([0, 15, 30, 45, 60], [16, 30, 16, 30, 16])
      : idle
        ? rotKeys([0, 30, 60], [-4, -10, -4])
        : { a: 0, k: -6 }
  const bodyY = sit ? 28 : 0

  return lottie(`human-${pose}`, [
    layer({
      ind: 1,
      nm: 'legL',
      p: [80, 170 + bodyY],
      a: [8, 0],
      r: legA,
      shapes: [rect('leg', 16, 68, 8, pants, 0, 0), rect('shoe', 24, 10, 4, shoe, -4, 62)],
    }),
    layer({
      ind: 2,
      nm: 'legR',
      p: [108, 170 + bodyY],
      a: [8, 0],
      r: legB,
      shapes: [rect('leg', 16, 68, 8, pants, 0, 0), rect('shoe', 24, 10, 4, shoe, -4, 62)],
    }),
    layer({
      ind: 3,
      nm: 'torso',
      p: [100, 134 + bodyY],
      a: [36, 38],
      shapes: [rect('hoodie', 72, 76, 16, hoodie, 0, 0), rect('placket', 18, 28, 6, cream, 27, 8)],
    }),
    layer({
      ind: 4,
      nm: 'armL',
      p: [60, 118 + bodyY],
      a: [8, 0],
      r: armA,
      shapes: [rect('sleeve', 15, 22, 8, hoodie, 0, 0), rect('arm', 15, 42, 8, skin, 0, 18)],
    }),
    layer({
      ind: 5,
      nm: 'armR',
      p: [140, 118 + bodyY],
      a: [8, 0],
      r: armB,
      shapes: [rect('sleeve', 15, 22, 8, hoodie, 0, 0), rect('arm', 15, 42, 8, skin, 0, 18)],
    }),
    layer({
      ind: 6,
      nm: 'head',
      p: [100, 72 + bodyY],
      a: [0, 10],
      r: walk ? rotKeys([0, 30, 60], [-2, 2, -2]) : { a: 0, k: 0 },
      shapes: [
        ellipse('face', 56, 64, skin, 0, 8),
        ellipse('hair', 60, 28, hair, 0, -8),
        ellipse('eyeL', 6, 6, shoe, -12, 8),
        ellipse('eyeR', 6, 6, shoe, 12, 8),
      ],
    }),
  ])
}

for (const pose of ['idle', 'walk', 'sit']) {
  writeFileSync(`src/assets/lottie/robot-${pose}.json`, JSON.stringify(robot(pose)))
  writeFileSync(`src/assets/lottie/human-${pose}.json`, JSON.stringify(human(pose)))
}

console.log('wrote 6 lottie clips')
