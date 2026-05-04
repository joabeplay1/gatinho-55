import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/RunnerCanvas.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=86705d17"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/RunnerCanvas.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=86705d17"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import * as THREE from "/node_modules/.vite/deps/three.js?v=0837c942";
import { MAP_THEMES } from "/src/components/game/GameEngine.jsx";
const LANES = [-2.4, 0, 2.4];
const SEG_LEN = 22;
const NUM_TILES = 14;
const BASE_SPD = 11;
const SPD_INC = 0.38;
const JUMP_V = 14;
const GRAV = -32;
const GROUND_Y = 0;
function makeCat() {
  const g = new THREE.Group();
  const orange = new THREE.MeshPhongMaterial({ color: 16747586, shininess: 20 });
  const dOrange = new THREE.MeshPhongMaterial({ color: 13391104, shininess: 10 });
  const cream = new THREE.MeshPhongMaterial({ color: 16769200, shininess: 10 });
  const pink = new THREE.MeshPhongMaterial({ color: 16755404, shininess: 5 });
  const black = new THREE.MeshPhongMaterial({ color: 1118481 });
  const white = new THREE.MeshPhongMaterial({ color: 16777215 });
  const M = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.scale.set(sx, sy, sz);
    m.castShadow = true;
    g.add(m);
    return m;
  };
  M(new THREE.BoxGeometry(1, 0.9, 1.3), orange, 0, 0.9, 0);
  M(new THREE.SphereGeometry(0.5, 10, 8), orange, 0, 0.85, -0.55);
  M(new THREE.BoxGeometry(0.22, 0.88, 1.32), dOrange, 0, 0.9, 0.01);
  M(new THREE.BoxGeometry(1.02, 0.88, 0.13), dOrange, 0, 0.9, -0.25);
  M(new THREE.BoxGeometry(1.02, 0.88, 0.13), dOrange, 0, 0.9, 0.25);
  const head = new THREE.Group();
  head.position.set(0, 1.72, 0.36);
  M(new THREE.BoxGeometry(0.92, 0.84, 0.88), orange, 0, 0, 0);
  g.add(head);
  {
    const H = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      head.add(m);
      return m;
    };
    H(new THREE.BoxGeometry(0.92, 0.84, 0.88), orange, 0, 0, 0);
    H(new THREE.SphereGeometry(0.28, 8, 6), cream, -0.3, -0.04, 0.38);
    H(new THREE.SphereGeometry(0.28, 8, 6), cream, 0.3, -0.04, 0.38);
    H(new THREE.SphereGeometry(0.09, 8, 8), pink, 0, -0.08, 0.46);
    H(new THREE.SphereGeometry(0.1, 8, 8), white, -0.22, 0.1, 0.44);
    H(new THREE.SphereGeometry(0.1, 8, 8), white, 0.22, 0.1, 0.44);
    H(new THREE.SphereGeometry(0.06, 6, 6), black, -0.22, 0.1, 0.5);
    H(new THREE.SphereGeometry(0.06, 6, 6), black, 0.22, 0.1, 0.5);
    H(new THREE.ConeGeometry(0.22, 0.38, 5), orange, -0.3, 0.56, 0, 0, 0, -0.28);
    H(new THREE.ConeGeometry(0.22, 0.38, 5), orange, 0.3, 0.56, 0, 0, 0, 0.28);
    H(new THREE.ConeGeometry(0.13, 0.24, 5), pink, -0.3, 0.56, 0.01, 0, 0, -0.28);
    H(new THREE.ConeGeometry(0.13, 0.24, 5), pink, 0.3, 0.56, 0.01, 0, 0, 0.28);
  }
  const legGeo = new THREE.BoxGeometry(0.3, 0.55, 0.3);
  const pawGeo = new THREE.BoxGeometry(0.32, 0.14, 0.36);
  const legDefs = [
    [-0.34, 0.28, 0.4],
    [0.34, 0.28, 0.4],
    [-0.34, 0.28, -0.4],
    [0.34, 0.28, -0.4]
  ];
  const legs = legDefs.map(([lx, , lz]) => {
    const lg = new THREE.Group();
    lg.position.set(lx, 0.28, lz);
    const upper = new THREE.Mesh(legGeo, orange);
    upper.position.y = -0.27;
    upper.castShadow = true;
    lg.add(upper);
    const lower = new THREE.Mesh(legGeo, dOrange);
    lower.position.set(0, -0.62, 0.04);
    lower.castShadow = true;
    lg.add(lower);
    const paw = new THREE.Mesh(pawGeo, cream);
    paw.position.set(0, -0.88, 0.08);
    paw.castShadow = true;
    lg.add(paw);
    g.add(lg);
    return lg;
  });
  const tailCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.05, 0.75, -0.65),
      new THREE.Vector3(0.35, 1.05, -1),
      new THREE.Vector3(0.4, 1.5, -0.85),
      new THREE.Vector3(0.22, 1.8, -0.6)
    ]
  );
  const tail = new THREE.Mesh(
    new THREE.TubeGeometry(tailCurve, 14, 0.1, 7, false),
    dOrange
  );
  tail.castShadow = true;
  g.add(tail);
  g.userData.legs = legs;
  g.userData.tail = tail;
  g.userData.head = head;
  g.scale.setScalar(0.78);
  return g;
}
function makeMouse() {
  const g = new THREE.Group();
  const grey = new THREE.MeshPhongMaterial({ color: 13684944, shininess: 30 });
  const lgrey = new THREE.MeshPhongMaterial({ color: 15263976, shininess: 20 });
  const pink = new THREE.MeshPhongMaterial({ color: 16751001 });
  const black = new THREE.MeshPhongMaterial({ color: 1118481 });
  const wht = new THREE.MeshPhongMaterial({ color: 16777215 });
  const gold = new THREE.MeshPhongMaterial({ color: 16766720, emissive: 16755200, emissiveIntensity: 0.9 });
  const M = (geo, mat, x, y, z, sx = 1, sy = 1, sz = 1) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.castShadow = true;
    g.add(m);
    return m;
  };
  M(new THREE.SphereGeometry(0.38, 12, 10), grey, 0, 0.1, 0, 1, 0.8, 1.1);
  M(new THREE.SphereGeometry(0.3, 12, 10), lgrey, 0, 0.42, 0.38, 1, 0.95, 0.95);
  M(new THREE.SphereGeometry(0.16, 10, 8), grey, -0.2, 0.7, 0.28, 1, 1.1, 0.35);
  M(new THREE.SphereGeometry(0.16, 10, 8), grey, 0.2, 0.7, 0.28, 1, 1.1, 0.35);
  M(new THREE.SphereGeometry(0.1, 8, 8), pink, -0.2, 0.7, 0.3, 0.8, 0.9, 0.25);
  M(new THREE.SphereGeometry(0.1, 8, 8), pink, 0.2, 0.7, 0.3, 0.8, 0.9, 0.25);
  M(new THREE.SphereGeometry(0.055, 8, 8), black, -0.12, 0.5, 0.66);
  M(new THREE.SphereGeometry(0.055, 8, 8), black, 0.12, 0.5, 0.66);
  M(new THREE.SphereGeometry(0.02, 6, 6), wht, -0.1, 0.52, 0.7);
  M(new THREE.SphereGeometry(0.02, 6, 6), wht, 0.14, 0.52, 0.7);
  M(new THREE.SphereGeometry(0.065, 8, 8), pink, 0, 0.42, 0.67);
  const tC = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.08, -0.38),
      new THREE.Vector3(0.28, 0.22, -0.62),
      new THREE.Vector3(0.32, 0.48, -0.5)
    ]
  );
  const tM = new THREE.Mesh(
    new THREE.TubeGeometry(tC, 8, 0.04, 5, false),
    new THREE.MeshPhongMaterial({ color: 12624032 })
  );
  g.add(tM);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.07, 10, 28),
    gold
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.05;
  g.add(ring);
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(0.58, 28),
    new THREE.MeshPhongMaterial({ color: 16772744, emissive: 16763904, emissiveIntensity: 0.5, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.06;
  g.add(disc);
  g.userData.ring = ring;
  g.userData.disc = disc;
  g.scale.setScalar(0.9);
  return g;
}
function makeTrackTile(theme, zPos) {
  const g = new THREE.Group();
  const TW = 8.4;
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(TW, 0.3, SEG_LEN),
    new THREE.MeshPhongMaterial({ color: parseInt(theme.trackColor), shininess: 60 })
  );
  slab.receiveShadow = true;
  g.add(slab);
  const lineMat = new THREE.MeshPhongMaterial({
    color: parseInt(theme.trackLine),
    emissive: parseInt(theme.trackGlow),
    emissiveIntensity: 0.6,
    shininess: 100
  });
  LANES.slice(0, -1).forEach((lx, i) => {
    const between = (LANES[i] + LANES[i + 1]) / 2;
    for (let dz = -SEG_LEN / 2 + 1; dz < SEG_LEN / 2; dz += 3.5) {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 1.8), lineMat);
      dash.position.set(between, 0.155, dz);
      g.add(dash);
    }
  });
  for (let dz = -SEG_LEN / 2 + 1; dz < SEG_LEN / 2; dz += 3.5) {
    const dl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 1.8), lineMat);
    dl.position.set(0, 0.155, dz);
    g.add(dl);
  }
  [-TW / 2 - 0.2, TW / 2 + 0.2].forEach((ex) => {
    const kerb = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.45, SEG_LEN),
      new THREE.MeshPhongMaterial({ color: parseInt(theme.trackColor) * 1.3 | 0, shininess: 30 })
    );
    kerb.position.set(ex, 0.08, 0);
    g.add(kerb);
  });
  g.position.set(0, 0, zPos);
  return g;
}
function makeScenery(theme, zPos) {
  const g = new THREE.Group();
  const id = theme.id;
  [-1, 1].forEach((side) => {
    const bx = side * 6;
    const rng = (a, b) => a + Math.random() * (b - a);
    if (id === 0) {
      const bH = rng(8, 22);
      const bW = rng(1.8, 3.2);
      const bld = new THREE.Mesh(
        new THREE.BoxGeometry(bW, bH, rng(1.5, 2.8)),
        new THREE.MeshPhongMaterial({ color: 657944 })
      );
      bld.position.set(bx + side * rng(0, 1.5), bH / 2, 0);
      g.add(bld);
      const nCols = [16711935, 65535, 16711816, 35071];
      for (let r = 0; r < Math.floor(bH / 1.5); r++) {
        if (Math.random() < 0.6) {
          const wn = new THREE.Mesh(
            new THREE.BoxGeometry(bW * 0.8, 0.18, 0.05),
            new THREE.MeshPhongMaterial({ color: nCols[r % nCols.length], emissive: nCols[r % nCols.length], emissiveIntensity: 0.9 })
          );
          wn.position.set(bx + side * rng(0, 1.5), 1.2 + r * 1.5, bld.position.z + rng(0.8, 1.4) * side * 0 + 0.04);
          g.add(wn);
        }
      }
      if (Math.random() > 0.5) {
        const sign = new THREE.Mesh(
          new THREE.BoxGeometry(rng(0.8, 1.5), 0.3, 0.08),
          new THREE.MeshPhongMaterial({ color: 16711850, emissive: 16711816, emissiveIntensity: 1.2 })
        );
        sign.position.set(bx + side * 0.3, rng(2, 5), 0.05);
        g.add(sign);
      }
      const pipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, rng(3, 7), 7),
        new THREE.MeshPhongMaterial({ color: 2236979 })
      );
      pipe.position.set(bx - side * 0.8, rng(1.5, 4), 0);
      g.add(pipe);
    } else if (id === 1) {
      const mH = rng(4, 12);
      const mW = rng(0.8, 1.6);
      const monolith = new THREE.Mesh(
        new THREE.BoxGeometry(mW, mH, mW * 0.7),
        new THREE.MeshPhongMaterial({ color: 855320, shininess: 80 })
      );
      monolith.position.set(bx + side * rng(0, 2), mH / 2, 0);
      g.add(monolith);
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, mH, 0.04),
        new THREE.MeshPhongMaterial({ color: 3359880, emissive: 2241382, emissiveIntensity: 0.6 })
      );
      edge.position.set(bx + side * rng(0, 2) + side * mW * 0.51, mH / 2, 0);
      g.add(edge);
      for (let s = 0; s < 4; s++) {
        const star = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 5, 5),
          new THREE.MeshPhongMaterial({ color: 16777215, emissive: 16777215, emissiveIntensity: 1 })
        );
        star.position.set(bx + rng(-3, 3), rng(mH * 0.5, mH * 1.5), -rng(2, 8));
        g.add(star);
      }
    } else {
      const th = rng(5, 11);
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(rng(0.3, 0.5), rng(0.4, 0.65), th, 8),
        new THREE.MeshPhongMaterial({ color: 4005896 })
      );
      trunk.position.set(bx + side * rng(0, 1.5), th / 2, 0);
      g.add(trunk);
      for (let c = 0; c < 3; c++) {
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(rng(1.2, 2.2) - c * 0.3, rng(2, 3), 8),
          new THREE.MeshPhongMaterial({ color: 866829 })
        );
        cone.position.set(bx + side * rng(0, 1.5), th * 0.55 + c * 1.6, 0);
        g.add(cone);
      }
      if (Math.random() > 0.4) {
        const mush = new THREE.Mesh(
          new THREE.SphereGeometry(0.22, 8, 6),
          new THREE.MeshPhongMaterial({ color: 16729088, emissive: 16720384, emissiveIntensity: 0.5 })
        );
        mush.position.set(bx + side * rng(0.3, 1), 0.18, rng(-1, 1));
        mush.scale.set(1, 0.7, 1);
        g.add(mush);
      }
      if (Math.random() > 0.5) {
        const lantern = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 0.3, 0.22),
          new THREE.MeshPhongMaterial({ color: 16755200, emissive: 16746496, emissiveIntensity: 1 })
        );
        lantern.position.set(bx + side * 0.5, rng(0.6, 1.5), rng(-0.5, 0.5));
        g.add(lantern);
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, lantern.position.y, 5),
          new THREE.MeshPhongMaterial({ color: 5583616 })
        );
        pole.position.set(lantern.position.x, lantern.position.y / 2, lantern.position.z);
        g.add(pole);
      }
      if (side === 1 && Math.random() > 0.65) {
        const tw = rng(4, 7);
        const tower = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.8, tw, 9),
          new THREE.MeshPhongMaterial({ color: 3809312 })
        );
        tower.position.set(bx + 1.5, tw / 2, 0);
        g.add(tower);
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(0.85, 1.5, 9),
          new THREE.MeshPhongMaterial({ color: 9048080 })
        );
        cap.position.set(bx + 1.5, tw + 0.75, 0);
        g.add(cap);
      }
    }
  });
  g.position.z = zPos;
  return g;
}
function makeObstacle(type, laneX, theme) {
  const g = new THREE.Group();
  const mat = new THREE.MeshPhongMaterial({ color: 3359846, shininess: 60 });
  const warn = new THREE.MeshPhongMaterial({ color: 16724736, emissive: 11145472, emissiveIntensity: 0.6 });
  if (type === 0) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 0.42), mat);
    bar.position.y = 0.42;
    bar.castShadow = true;
    g.add(bar);
    for (let i = -0.8; i <= 0.81; i += 0.4) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.87, 0.44), warn);
      st.position.set(i, 0.42, 0);
      g.add(st);
    }
  } else if (type === 1) {
    [-0.95, 0.95].forEach((px) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.45, 7), mat);
      p.position.set(px, 0.72, 0);
      p.castShadow = true;
      g.add(p);
    });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 0.38), warn);
    bar.position.y = 1.36;
    g.add(bar);
  } else {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 0.44), mat);
    wall.position.y = 1.2;
    wall.castShadow = true;
    g.add(wall);
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.22, 0.52), warn);
    top.position.y = 2.35;
    g.add(top);
  }
  g.position.x = laneX;
  return g;
}
export default function RunnerCanvas({ themeId, isPlaying, onScore, onGameOver, onDistanceUpdate, "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const mountRef = useRef(null);
  const S = useRef(null);
  const raf = useRef(null);
  const keys = useRef({});
  const touch = useRef({ sx: 0, sy: 0 });
  const boot = useCallback(() => {
    const theme = MAP_THEMES[themeId] || MAP_THEMES[0];
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || window.innerWidth;
    const H = el.clientHeight || window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme.skyTop);
    scene.fog = new THREE.Fog(theme.fogColor, theme.fogNear, theme.fogFar);
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 220);
    camera.position.set(0, 4.8, 12);
    camera.lookAt(0, 1.2, -10);
    scene.add(new THREE.AmbientLight(16777215, 3.2));
    const sun = new THREE.DirectionalLight(16772829, 4);
    sun.position.set(6, 16, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 80;
    sun.shadow.bias = -1e-3;
    scene.add(sun);
    const fillLight = new THREE.DirectionalLight(11189247, 1.6);
    fillLight.position.set(-5, 8, 4);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(16777215, 2.5);
    rimLight.position.set(0, 6, -20);
    scene.add(rimLight);
    const catPt = new THREE.PointLight(16774624, 2.2, 14);
    catPt.position.set(0, 4, 7);
    scene.add(catPt);
    const skyGeo = new THREE.PlaneGeometry(300, 120);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(theme.skyTop) },
        bottomColor: { value: new THREE.Color(theme.skyBottom) }
      },
      vertexShader: `
        varying float vY;
        void main() { vY = position.y; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }
      `,
      fragmentShader: `
        uniform vec3 topColor; uniform vec3 bottomColor;
        varying float vY;
        void main() { float t = clamp((vY+20.0)/80.0,0.0,1.0); gl_FragColor = vec4(mix(bottomColor,topColor,t),1.0); }
      `,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.rotation.x = Math.PI / 2;
    sky.position.set(0, 30, -60);
    scene.add(sky);
    const cat = makeCat();
    cat.position.set(0, GROUND_Y, 5);
    cat.rotation.y = Math.PI;
    scene.add(cat);
    const tiles = [];
    for (let i = 0; i < NUM_TILES; i++) {
      const z = -(i * SEG_LEN) + SEG_LEN / 2;
      const t = makeTrackTile(theme, z);
      scene.add(t);
      tiles.push(t);
    }
    let tilePool_nextZ = -(NUM_TILES * SEG_LEN) + SEG_LEN / 2;
    const scenery = [];
    for (let i = 0; i < NUM_TILES; i++) {
      const z = -(i * SEG_LEN);
      const s = makeScenery(theme, z);
      scene.add(s);
      scenery.push(s);
    }
    let sceneryPool_nextZ = -(NUM_TILES * SEG_LEN);
    const mice = [];
    for (let i = 0; i < 6; i++) {
      const ln = Math.floor(Math.random() * 3);
      const m = makeMouse();
      m.position.set(LANES[ln], 0.88, -20 - i * 13);
      scene.add(m);
      mice.push({ mesh: m, collected: false });
    }
    S.current = {
      renderer,
      scene,
      camera,
      cat,
      sun,
      catPt,
      sky,
      tiles,
      tilePool_nextZ,
      scenery,
      sceneryPool_nextZ,
      obstacles: [],
      mice,
      theme,
      obsNextZ: -40,
      mouseNextZ: -70,
      lane: 1,
      targetLane: 1,
      catX: 0,
      catY: GROUND_Y,
      velY: 0,
      isJumping: false,
      isSliding: false,
      slideT: 0,
      dead: false,
      score: 0,
      dist: 0,
      speed: BASE_SPD,
      frame: 0,
      legT: 0
    };
  }, [themeId]);
  function spawnObs(zPos) {
    const st = S.current;
    const count = Math.min(1 + Math.floor(st.score / 7), 2);
    const used = /* @__PURE__ */ new Set();
    for (let n = 0; n < count; n++) {
      let ln;
      let t = 0;
      do {
        ln = Math.floor(Math.random() * 3);
        t++;
      } while (used.has(ln) && t < 12);
      used.add(ln);
      const type = Math.floor(Math.random() * 3);
      const mesh = makeObstacle(type, LANES[ln], st.theme);
      mesh.position.z = zPos - Math.random() * 10;
      st.scene.add(mesh);
      st.obstacles.push({ mesh, lane: ln, type, z: mesh.position.z });
    }
  }
  function spawnMice(zPos) {
    const st = S.current;
    const count = 1 + Math.floor(Math.random() * 3);
    const used = [];
    for (let i = 0; i < count; i++) {
      let ln;
      let t = 0;
      do {
        ln = Math.floor(Math.random() * 3);
        t++;
      } while (used.includes(ln) && t < 10);
      used.push(ln);
      const m = makeMouse();
      m.position.set(LANES[ln], 0.88, zPos - i * 5.5);
      st.scene.add(m);
      st.mice.push({ mesh: m, collected: false });
    }
  }
  const loop = useCallback(() => {
    const st = S.current;
    if (!st || st.dead) return;
    const dt = 1 / 60;
    st.frame++;
    st.speed = BASE_SPD + st.score * SPD_INC;
    const dz = st.speed * dt;
    st.dist += dz;
    if (onDistanceUpdate) onDistanceUpdate(Math.floor(st.dist));
    st.tiles.forEach((t) => {
      t.position.z += dz;
    });
    st.scenery.forEach((s) => {
      s.position.z += dz;
    });
    st.obstacles.forEach((o) => {
      o.mesh.position.z += dz;
      o.z += dz;
    });
    st.mice.forEach((m) => {
      if (!m.collected) m.mesh.position.z += dz;
    });
    st.tiles.forEach((tile) => {
      if (tile.position.z > SEG_LEN * 1.2) {
        tile.position.z = st.tilePool_nextZ;
        st.tilePool_nextZ -= SEG_LEN;
      }
    });
    st.scenery.forEach((s) => {
      if (s.position.z > SEG_LEN * 1.2) {
        while (s.children.length) s.remove(s.children[0]);
        const fresh = makeScenery(st.theme, 0);
        fresh.children.forEach((c) => s.add(c));
        s.position.z = st.sceneryPool_nextZ;
        st.sceneryPool_nextZ -= SEG_LEN;
      }
    });
    st.obsNextZ += dz;
    if (st.obsNextZ > -28) {
      spawnObs(-55);
      st.obsNextZ = -55;
    }
    st.mouseNextZ += dz;
    if (st.mouseNextZ > -28) {
      spawnMice(-55 - Math.random() * 12);
      st.mouseNextZ = -55 - Math.random() * 12;
    }
    for (let i = st.obstacles.length - 1; i >= 0; i--) {
      if (st.obstacles[i].z > 13) {
        st.scene.remove(st.obstacles[i].mesh);
        st.obstacles.splice(i, 1);
      }
    }
    for (let i = st.mice.length - 1; i >= 0; i--) {
      const m = st.mice[i];
      if (m.mesh.position.z > 12 || m.collected) {
        st.scene.remove(m.mesh);
        st.mice.splice(i, 1);
      }
    }
    const tX = LANES[st.targetLane];
    st.catX += (tX - st.catX) * dt * 13;
    st.cat.position.x = st.catX;
    if (st.isJumping || st.catY > GROUND_Y) {
      st.velY += GRAV * dt;
      st.catY += st.velY * dt;
      if (st.catY <= GROUND_Y) {
        st.catY = GROUND_Y;
        st.velY = 0;
        st.isJumping = false;
      }
    }
    st.cat.position.y = st.catY;
    if (st.isSliding) {
      st.slideT -= dt * 1e3;
      if (st.slideT <= 0) {
        st.isSliding = false;
        st.cat.scale.y = 1;
      }
    }
    st.legT += dt * st.speed * 1.5;
    const legs = st.cat.userData.legs;
    if (legs) {
      const s = Math.sin(st.legT);
      legs[0].rotation.x = s * 0.7;
      legs[1].rotation.x = -s * 0.7;
      legs[2].rotation.x = -s * 0.55;
      legs[3].rotation.x = s * 0.55;
    }
    const bob = Math.abs(Math.sin(st.legT)) * 0.07;
    st.cat.position.y = st.catY + bob;
    if (st.cat.userData.tail) st.cat.userData.tail.rotation.z = Math.sin(st.frame * 0.09) * 0.28;
    const xDiff = tX - st.catX;
    st.cat.rotation.z = THREE.MathUtils.lerp(st.cat.rotation.z, -xDiff * 0.055, 0.14);
    st.mice.forEach((m) => {
      if (m.collected) return;
      m.mesh.rotation.y += dt * 2.2;
      m.mesh.position.y = 0.88 + Math.sin(st.frame * 0.07 + m.mesh.position.x) * 0.13;
      if (m.mesh.userData.ring) m.mesh.userData.ring.rotation.z += dt * 3.5;
    });
    st.mice.forEach((m) => {
      if (m.collected) return;
      const mz = m.mesh.position.z;
      if (mz > 4.5 && mz < 7.8 && Math.abs(st.catX - m.mesh.position.x) < 1.6) {
        m.collected = true;
        st.score++;
        if (onScore) onScore(st.score);
      }
    });
    for (const obs of st.obstacles) {
      const oz = obs.mesh.position.z;
      if (oz > 4 && oz < 7.5 && Math.abs(st.catX - obs.mesh.position.x) < 1.35) {
        let hit = false;
        if (obs.type === 0) hit = st.catY < 1;
        else if (obs.type === 1) hit = !st.isSliding;
        else
          hit = true;
        if (hit) {
          st.dead = true;
          if (onGameOver) onGameOver(st.score, Math.floor(st.dist));
          return;
        }
      }
    }
    const camTX = st.catX * 0.28;
    const camTY = st.isSliding ? 3.8 : 4.8;
    st.camera.position.x = THREE.MathUtils.lerp(st.camera.position.x, camTX, 0.1);
    st.camera.position.y = THREE.MathUtils.lerp(st.camera.position.y, camTY, 0.08);
    st.camera.position.z = 12;
    st.camera.lookAt(st.catX * 0.22, 1.2, -10);
    st.sun.position.set(st.camera.position.x + 6, 16, st.camera.position.z + 8);
    st.catPt.position.set(st.catX, 4, 7.5);
    st.renderer.render(st.scene, st.camera);
    raf.current = requestAnimationFrame(loop);
  }, [onScore, onGameOver, onDistanceUpdate]);
  const onKeyDown = useCallback((e) => {
    const st = S.current;
    if (!st || st.dead || keys.current[e.key]) return;
    keys.current[e.key] = true;
    const k = e.key;
    if ((k === "ArrowLeft" || k === "a" || k === "A") && st.targetLane > 0) st.targetLane--;
    else if ((k === "ArrowRight" || k === "d" || k === "D") && st.targetLane < 2) st.targetLane++;
    else if ((k === "ArrowUp" || k === "w" || k === "W" || k === " ") && !st.isJumping && st.catY <= 0.15) {
      st.velY = JUMP_V;
      st.isJumping = true;
    } else if ((k === "ArrowDown" || k === "s" || k === "S") && !st.isSliding && !st.isJumping) {
      st.isSliding = true;
      st.slideT = 600;
      st.cat.scale.y = 0.52;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(k)) e.preventDefault();
  }, []);
  const onKeyUp = useCallback((e) => {
    keys.current[e.key] = false;
  }, []);
  const onTouchStart = useCallback((e) => {
    touch.current = { sx: e.touches[0].clientX, sy: e.touches[0].clientY };
  }, []);
  const onTouchEnd = useCallback((e) => {
    const st = S.current;
    if (!st || st.dead) return;
    const dx = e.changedTouches[0].clientX - touch.current.sx;
    const dy = e.changedTouches[0].clientY - touch.current.sy;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -25 && st.targetLane > 0) st.targetLane--;
      else if (dx > 25 && st.targetLane < 2) st.targetLane++;
    } else {
      if (dy < -25 && !st.isJumping && st.catY <= 0.15) {
        st.velY = JUMP_V;
        st.isJumping = true;
      } else if (dy > 25 && !st.isSliding && !st.isJumping) {
        st.isSliding = true;
        st.slideT = 600;
        st.cat.scale.y = 0.52;
      }
    }
  }, []);
  const onResize = useCallback(() => {
    const st = S.current;
    if (!st || !mountRef.current) return;
    const W = mountRef.current.clientWidth, H = mountRef.current.clientHeight;
    st.renderer.setSize(W, H);
    st.camera.aspect = W / H;
    st.camera.updateProjectionMatrix();
  }, []);
  useEffect(() => {
    if (!isPlaying || !mountRef.current) return;
    boot();
    raf.current = requestAnimationFrame(loop);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", onResize);
      const st = S.current;
      if (st?.renderer) {
        st.renderer.dispose();
        if (mountRef.current?.contains(st.renderer.domElement))
          mountRef.current.removeChild(st.renderer.domElement);
      }
      S.current = null;
    };
  }, [isPlaying, themeId]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "components/game/RunnerCanvas:775:4",
      "data-dynamic-content": "true",
      ref: mountRef,
      className: "w-full h-full",
      onTouchStart,
      onTouchEnd,
      style: { touchAction: "none" },
      "data-collection-item-id": __dataCollectionItemId
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/game/RunnerCanvas.jsx",
      lineNumber: 794,
      columnNumber: 5
    },
    this
  );
}
_s(RunnerCanvas, "u24K+/RztKSiQru/b0mVxotGItk=");
_c = RunnerCanvas;
var _c;
$RefreshReg$(_c, "RunnerCanvas");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/RunnerCanvas.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/RunnerCanvas.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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O0FBQUEsRUFFZ0Y7QUFFcEY7QUFBQ0MsR0F0WHVCUCxjQUFZO0FBQUEsS0FBWkE7QUFBWSxJQUFBOEo7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJ1c2VDYWxsYmFjayIsIlRIUkVFIiwiTUFQX1RIRU1FUyIsIkxBTkVTIiwiU0VHX0xFTiIsIk5VTV9USUxFUyIsIkJBU0VfU1BEIiwiU1BEX0lOQyIsIkpVTVBfViIsIkdSQVYiLCJHUk9VTkRfWSIsIm1ha2VDYXQiLCJnIiwiR3JvdXAiLCJvcmFuZ2UiLCJNZXNoUGhvbmdNYXRlcmlhbCIsImNvbG9yIiwic2hpbmluZXNzIiwiZE9yYW5nZSIsImNyZWFtIiwicGluayIsImJsYWNrIiwid2hpdGUiLCJNIiwiZ2VvIiwibWF0IiwieCIsInkiLCJ6IiwicngiLCJyeSIsInJ6Iiwic3giLCJzeSIsInN6IiwibSIsIk1lc2giLCJwb3NpdGlvbiIsInNldCIsInJvdGF0aW9uIiwic2NhbGUiLCJjYXN0U2hhZG93IiwiYWRkIiwiQm94R2VvbWV0cnkiLCJTcGhlcmVHZW9tZXRyeSIsImhlYWQiLCJIIiwiQ29uZUdlb21ldHJ5IiwibGVnR2VvIiwicGF3R2VvIiwibGVnRGVmcyIsImxlZ3MiLCJtYXAiLCJseCIsImx6IiwibGciLCJ1cHBlciIsImxvd2VyIiwicGF3IiwidGFpbEN1cnZlIiwiQ2F0bXVsbFJvbUN1cnZlMyIsIlZlY3RvcjMiLCJ0YWlsIiwiVHViZUdlb21ldHJ5IiwidXNlckRhdGEiLCJzZXRTY2FsYXIiLCJtYWtlTW91c2UiLCJncmV5IiwibGdyZXkiLCJ3aHQiLCJnb2xkIiwiZW1pc3NpdmUiLCJlbWlzc2l2ZUludGVuc2l0eSIsInRDIiwidE0iLCJyaW5nIiwiVG9ydXNHZW9tZXRyeSIsIk1hdGgiLCJQSSIsImRpc2MiLCJDaXJjbGVHZW9tZXRyeSIsInRyYW5zcGFyZW50Iiwib3BhY2l0eSIsInNpZGUiLCJEb3VibGVTaWRlIiwibWFrZVRyYWNrVGlsZSIsInRoZW1lIiwielBvcyIsIlRXIiwic2xhYiIsInBhcnNlSW50IiwidHJhY2tDb2xvciIsInJlY2VpdmVTaGFkb3ciLCJsaW5lTWF0IiwidHJhY2tMaW5lIiwidHJhY2tHbG93Iiwic2xpY2UiLCJmb3JFYWNoIiwiaSIsImJldHdlZW4iLCJkeiIsImRhc2giLCJkbCIsImV4Iiwia2VyYiIsIm1ha2VTY2VuZXJ5IiwiaWQiLCJieCIsInJuZyIsImEiLCJiIiwicmFuZG9tIiwiYkgiLCJiVyIsImJsZCIsIm5Db2xzIiwiciIsImZsb29yIiwid24iLCJsZW5ndGgiLCJzaWduIiwicGlwZSIsIkN5bGluZGVyR2VvbWV0cnkiLCJtSCIsIm1XIiwibW9ub2xpdGgiLCJlZGdlIiwicyIsInN0YXIiLCJ0aCIsInRydW5rIiwiYyIsImNvbmUiLCJtdXNoIiwibGFudGVybiIsInBvbGUiLCJ0dyIsInRvd2VyIiwiY2FwIiwibWFrZU9ic3RhY2xlIiwidHlwZSIsImxhbmVYIiwid2FybiIsImJhciIsInN0IiwicHgiLCJwIiwid2FsbCIsInRvcCIsIlJ1bm5lckNhbnZhcyIsInRoZW1lSWQiLCJpc1BsYXlpbmciLCJvblNjb3JlIiwib25HYW1lT3ZlciIsIm9uRGlzdGFuY2VVcGRhdGUiLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX3MiLCJtb3VudFJlZiIsIlMiLCJyYWYiLCJrZXlzIiwidG91Y2giLCJib290IiwiZWwiLCJjdXJyZW50IiwiVyIsImNsaWVudFdpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNsaWVudEhlaWdodCIsImlubmVySGVpZ2h0IiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwiYW50aWFsaWFzIiwic2V0U2l6ZSIsInNldFBpeGVsUmF0aW8iLCJtaW4iLCJkZXZpY2VQaXhlbFJhdGlvIiwic2hhZG93TWFwIiwiZW5hYmxlZCIsIlBDRlNvZnRTaGFkb3dNYXAiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJzY2VuZSIsIlNjZW5lIiwiYmFja2dyb3VuZCIsIkNvbG9yIiwic2t5VG9wIiwiZm9nIiwiRm9nIiwiZm9nQ29sb3IiLCJmb2dOZWFyIiwiZm9nRmFyIiwiY2FtZXJhIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJsb29rQXQiLCJBbWJpZW50TGlnaHQiLCJzdW4iLCJEaXJlY3Rpb25hbExpZ2h0Iiwic2hhZG93IiwibWFwU2l6ZSIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIm5lYXIiLCJmYXIiLCJiaWFzIiwiZmlsbExpZ2h0IiwicmltTGlnaHQiLCJjYXRQdCIsIlBvaW50TGlnaHQiLCJza3lHZW8iLCJQbGFuZUdlb21ldHJ5Iiwic2t5TWF0IiwiU2hhZGVyTWF0ZXJpYWwiLCJ1bmlmb3JtcyIsInRvcENvbG9yIiwidmFsdWUiLCJib3R0b21Db2xvciIsInNreUJvdHRvbSIsInZlcnRleFNoYWRlciIsImZyYWdtZW50U2hhZGVyIiwiQmFja1NpZGUiLCJza3kiLCJjYXQiLCJ0aWxlcyIsInQiLCJwdXNoIiwidGlsZVBvb2xfbmV4dFoiLCJzY2VuZXJ5Iiwic2NlbmVyeVBvb2xfbmV4dFoiLCJtaWNlIiwibG4iLCJtZXNoIiwiY29sbGVjdGVkIiwib2JzdGFjbGVzIiwib2JzTmV4dFoiLCJtb3VzZU5leHRaIiwibGFuZSIsInRhcmdldExhbmUiLCJjYXRYIiwiY2F0WSIsInZlbFkiLCJpc0p1bXBpbmciLCJpc1NsaWRpbmciLCJzbGlkZVQiLCJkZWFkIiwic2NvcmUiLCJkaXN0Iiwic3BlZWQiLCJmcmFtZSIsImxlZ1QiLCJzcGF3bk9icyIsImNvdW50IiwidXNlZCIsIlNldCIsIm4iLCJoYXMiLCJzcGF3bk1pY2UiLCJpbmNsdWRlcyIsImxvb3AiLCJkdCIsIm8iLCJ0aWxlIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJmcmVzaCIsInNwbGljZSIsInRYIiwic2luIiwiYm9iIiwiYWJzIiwieERpZmYiLCJNYXRoVXRpbHMiLCJsZXJwIiwibXoiLCJvYnMiLCJveiIsImhpdCIsImNhbVRYIiwiY2FtVFkiLCJyZW5kZXIiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvbktleURvd24iLCJlIiwia2V5IiwiayIsInByZXZlbnREZWZhdWx0Iiwib25LZXlVcCIsIm9uVG91Y2hTdGFydCIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9uVG91Y2hFbmQiLCJkeCIsImNoYW5nZWRUb3VjaGVzIiwiZHkiLCJvblJlc2l6ZSIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzcG9zZSIsImNvbnRhaW5zIiwicmVtb3ZlQ2hpbGQiLCJ0b3VjaEFjdGlvbiIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlJ1bm5lckNhbnZhcy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBNQVBfVEhFTUVTIH0gZnJvbSBcIi4vR2FtZUVuZ2luZVwiO1xuXG4vLyDilIDilIDilIAgQ29uc3RhbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuY29uc3QgTEFORVMgPSBbLTIuNCwgMCwgMi40XTtcbmNvbnN0IFNFR19MRU4gPSAyMjtcbmNvbnN0IE5VTV9USUxFUyA9IDE0O1xuY29uc3QgQkFTRV9TUEQgPSAxMTtcbmNvbnN0IFNQRF9JTkMgPSAwLjM4O1xuY29uc3QgSlVNUF9WID0gMTQ7XG5jb25zdCBHUkFWID0gLTMyO1xuY29uc3QgR1JPVU5EX1kgPSAwO1xuXG4vLyDilIDilIDilIAgQ3V0ZSBDYXQgKG9yYW5nZSB0YWJieSwgc2VlbiBmcm9tIGJlaGluZCkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5mdW5jdGlvbiBtYWtlQ2F0KCkge1xuICBjb25zdCBnID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgY29uc3Qgb3JhbmdlID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ZmY4YzQyLCBzaGluaW5lc3M6IDIwIH0pO1xuICBjb25zdCBkT3JhbmdlID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4Y2M1NTAwLCBzaGluaW5lc3M6IDEwIH0pO1xuICBjb25zdCBjcmVhbSA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweGZmZTBiMCwgc2hpbmluZXNzOiAxMCB9KTtcbiAgY29uc3QgcGluayA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweGZmYWFjYywgc2hpbmluZXNzOiA1IH0pO1xuICBjb25zdCBibGFjayA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDExMTExMSB9KTtcbiAgY29uc3Qgd2hpdGUgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSk7XG5cbiAgY29uc3QgTSA9IChnZW8sIG1hdCwgeCwgeSwgeiwgcnggPSAwLCByeSA9IDAsIHJ6ID0gMCwgc3ggPSAxLCBzeSA9IDEsIHN6ID0gMSkgPT4ge1xuICAgIGNvbnN0IG0gPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdCk7XG4gICAgbS5wb3NpdGlvbi5zZXQoeCwgeSwgeik7bS5yb3RhdGlvbi5zZXQocngsIHJ5LCByeik7bS5zY2FsZS5zZXQoc3gsIHN5LCBzeik7XG4gICAgbS5jYXN0U2hhZG93ID0gdHJ1ZTtnLmFkZChtKTtyZXR1cm4gbTtcbiAgfTtcblxuICAvLyDilIDilIAgQm9keSDilIDilIBcbiAgTShuZXcgVEhSRUUuQm94R2VvbWV0cnkoMS4wLCAwLjksIDEuMyksIG9yYW5nZSwgMCwgMC45LCAwKTtcblxuICAvLyDilIDilIAgQnV0dCAvIHRhaWwgYmFzZSDilIDilIBcbiAgTShuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC41LCAxMCwgOCksIG9yYW5nZSwgMCwgMC44NSwgLTAuNTUpO1xuXG4gIC8vIOKUgOKUgCBCYWNrIHN0cmlwZSDilIDilIBcbiAgTShuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yMiwgMC44OCwgMS4zMiksIGRPcmFuZ2UsIDAsIDAuOSwgMC4wMSk7XG4gIE0obmV3IFRIUkVFLkJveEdlb21ldHJ5KDEuMDIsIDAuODgsIDAuMTMpLCBkT3JhbmdlLCAwLCAwLjksIC0wLjI1KTtcbiAgTShuZXcgVEhSRUUuQm94R2VvbWV0cnkoMS4wMiwgMC44OCwgMC4xMyksIGRPcmFuZ2UsIDAsIDAuOSwgMC4yNSk7XG5cbiAgLy8g4pSA4pSAIEhlYWQg4pSA4pSAXG4gIGNvbnN0IGhlYWQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgaGVhZC5wb3NpdGlvbi5zZXQoMCwgMS43MiwgMC4zNik7XG4gIE0obmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuOTIsIDAuODQsIDAuODgpLCBvcmFuZ2UsIDAsIDAsIDApO1xuICAvLyBhZGQgdG8gZ3JvdXAgQUZURVIgYm9keSBzbyB3ZSByZWZlcmVuY2UgaGVhZCBzZXBhcmF0ZWx5XG4gIGcuYWRkKGhlYWQpO1xuICB7XG4gICAgY29uc3QgSCA9IChnZW8sIG1hdCwgeCwgeSwgeikgPT4ge1xuICAgICAgY29uc3QgbSA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KTtcbiAgICAgIG0ucG9zaXRpb24uc2V0KHgsIHksIHopO20uY2FzdFNoYWRvdyA9IHRydWU7aGVhZC5hZGQobSk7cmV0dXJuIG07XG4gICAgfTtcbiAgICAvLyBIZWFkIGJveFxuICAgIEgobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuOTIsIDAuODQsIDAuODgpLCBvcmFuZ2UsIDAsIDAsIDApO1xuICAgIC8vIENoZWVrc1xuICAgIEgobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMjgsIDgsIDYpLCBjcmVhbSwgLTAuMywgLTAuMDQsIDAuMzgpO1xuICAgIEgobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMjgsIDgsIDYpLCBjcmVhbSwgMC4zLCAtMC4wNCwgMC4zOCk7XG4gICAgLy8gTm9zZVxuICAgIEgobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDksIDgsIDgpLCBwaW5rLCAwLCAtMC4wOCwgMC40Nik7XG4gICAgLy8gRXllcyAobG9va2luZyBmb3J3YXJkLCBvbmx5IHZpc2libGUgZnJvbSBiYWNrIGFzIHNtYWxsIGRvdHMpXG4gICAgSChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xLCA4LCA4KSwgd2hpdGUsIC0wLjIyLCAwLjEsIDAuNDQpO1xuICAgIEgobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMSwgOCwgOCksIHdoaXRlLCAwLjIyLCAwLjEsIDAuNDQpO1xuICAgIEgobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDYsIDYsIDYpLCBibGFjaywgLTAuMjIsIDAuMSwgMC41KTtcbiAgICBIKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjA2LCA2LCA2KSwgYmxhY2ssIDAuMjIsIDAuMSwgMC41KTtcbiAgICAvLyBFYXJzXG4gICAgSChuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuMjIsIDAuMzgsIDUpLCBvcmFuZ2UsIC0wLjMsIDAuNTYsIDAuMCwgMCwgMCwgLTAuMjgpO1xuICAgIEgobmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjIyLCAwLjM4LCA1KSwgb3JhbmdlLCAwLjMsIDAuNTYsIDAuMCwgMCwgMCwgMC4yOCk7XG4gICAgSChuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuMTMsIDAuMjQsIDUpLCBwaW5rLCAtMC4zLCAwLjU2LCAwLjAxLCAwLCAwLCAtMC4yOCk7XG4gICAgSChuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuMTMsIDAuMjQsIDUpLCBwaW5rLCAwLjMsIDAuNTYsIDAuMDEsIDAsIDAsIDAuMjgpO1xuICB9XG5cbiAgLy8g4pSA4pSAIExlZ3Mg4pSA4pSAXG4gIGNvbnN0IGxlZ0dlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjMsIDAuNTUsIDAuMyk7XG4gIGNvbnN0IHBhd0dlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjMyLCAwLjE0LCAwLjM2KTtcbiAgY29uc3QgbGVnRGVmcyA9IFtcbiAgWy0wLjM0LCAwLjI4LCAwLjRdLFxuICBbMC4zNCwgMC4yOCwgMC40XSxcbiAgWy0wLjM0LCAwLjI4LCAtMC40XSxcbiAgWzAuMzQsIDAuMjgsIC0wLjRdXTtcblxuICBjb25zdCBsZWdzID0gbGVnRGVmcy5tYXAoKFtseCwsIGx6XSkgPT4ge1xuICAgIGNvbnN0IGxnID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgbGcucG9zaXRpb24uc2V0KGx4LCAwLjI4LCBseik7XG4gICAgY29uc3QgdXBwZXIgPSBuZXcgVEhSRUUuTWVzaChsZWdHZW8sIG9yYW5nZSk7dXBwZXIucG9zaXRpb24ueSA9IC0wLjI3O3VwcGVyLmNhc3RTaGFkb3cgPSB0cnVlO2xnLmFkZCh1cHBlcik7XG4gICAgY29uc3QgbG93ZXIgPSBuZXcgVEhSRUUuTWVzaChsZWdHZW8sIGRPcmFuZ2UpO2xvd2VyLnBvc2l0aW9uLnNldCgwLCAtMC42MiwgMC4wNCk7bG93ZXIuY2FzdFNoYWRvdyA9IHRydWU7bGcuYWRkKGxvd2VyKTtcbiAgICBjb25zdCBwYXcgPSBuZXcgVEhSRUUuTWVzaChwYXdHZW8sIGNyZWFtKTtwYXcucG9zaXRpb24uc2V0KDAsIC0wLjg4LCAwLjA4KTtwYXcuY2FzdFNoYWRvdyA9IHRydWU7bGcuYWRkKHBhdyk7XG4gICAgZy5hZGQobGcpO1xuICAgIHJldHVybiBsZztcbiAgfSk7XG5cbiAgLy8g4pSA4pSAIFRhaWwg4pSA4pSAXG4gIGNvbnN0IHRhaWxDdXJ2ZSA9IG5ldyBUSFJFRS5DYXRtdWxsUm9tQ3VydmUzKFtcbiAgbmV3IFRIUkVFLlZlY3RvcjMoMC4wNSwgMC43NSwgLTAuNjUpLFxuICBuZXcgVEhSRUUuVmVjdG9yMygwLjM1LCAxLjA1LCAtMS4wKSxcbiAgbmV3IFRIUkVFLlZlY3RvcjMoMC40LCAxLjUsIC0wLjg1KSxcbiAgbmV3IFRIUkVFLlZlY3RvcjMoMC4yMiwgMS44LCAtMC42KV1cbiAgKTtcbiAgY29uc3QgdGFpbCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgIG5ldyBUSFJFRS5UdWJlR2VvbWV0cnkodGFpbEN1cnZlLCAxNCwgMC4xLCA3LCBmYWxzZSksXG4gICAgZE9yYW5nZVxuICApO1xuICB0YWlsLmNhc3RTaGFkb3cgPSB0cnVlO1xuICBnLmFkZCh0YWlsKTtcblxuICBnLnVzZXJEYXRhLmxlZ3MgPSBsZWdzO1xuICBnLnVzZXJEYXRhLnRhaWwgPSB0YWlsO1xuICBnLnVzZXJEYXRhLmhlYWQgPSBoZWFkO1xuXG4gIC8vIHNjYWxlIHRvIGxvb2sgcHJvcG9ydGlvbmFsIGluIGdhbWVcbiAgZy5zY2FsZS5zZXRTY2FsYXIoMC43OCk7XG4gIHJldHVybiBnO1xufVxuXG4vLyDilIDilIDilIAgTW91c2UgY29sbGVjdGlibGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5mdW5jdGlvbiBtYWtlTW91c2UoKSB7XG4gIGNvbnN0IGcgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgY29uc3QgZ3JleSA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweGQwZDBkMCwgc2hpbmluZXNzOiAzMCB9KTtcbiAgY29uc3QgbGdyZXkgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhlOGU4ZTgsIHNoaW5pbmVzczogMjAgfSk7XG4gIGNvbnN0IHBpbmsgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjk5OTkgfSk7XG4gIGNvbnN0IGJsYWNrID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MTExMTExIH0pO1xuICBjb25zdCB3aHQgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSk7XG4gIGNvbnN0IGdvbGQgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmQ3MDAsIGVtaXNzaXZlOiAweGZmYWEwMCwgZW1pc3NpdmVJbnRlbnNpdHk6IDAuOSB9KTtcblxuICBjb25zdCBNID0gKGdlbywgbWF0LCB4LCB5LCB6LCBzeCA9IDEsIHN5ID0gMSwgc3ogPSAxKSA9PiB7XG4gICAgY29uc3QgbSA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KTttLnBvc2l0aW9uLnNldCh4LCB5LCB6KTttLnNjYWxlLnNldChzeCwgc3ksIHN6KTtcbiAgICBtLmNhc3RTaGFkb3cgPSB0cnVlO2cuYWRkKG0pO3JldHVybiBtO1xuICB9O1xuXG4gIC8vIGJvZHlcbiAgTShuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4zOCwgMTIsIDEwKSwgZ3JleSwgMCwgMC4xLCAwLCAxLjAsIDAuOCwgMS4xKTtcbiAgLy8gaGVhZFxuICBNKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjMsIDEyLCAxMCksIGxncmV5LCAwLCAwLjQyLCAwLjM4LCAxLCAwLjk1LCAwLjk1KTtcbiAgLy8gZWFyc1xuICBNKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjE2LCAxMCwgOCksIGdyZXksIC0wLjIsIDAuNywgMC4yOCwgMSwgMS4xLCAwLjM1KTtcbiAgTShuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xNiwgMTAsIDgpLCBncmV5LCAwLjIsIDAuNywgMC4yOCwgMSwgMS4xLCAwLjM1KTtcbiAgTShuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xLCA4LCA4KSwgcGluaywgLTAuMiwgMC43LCAwLjMsIDAuOCwgMC45LCAwLjI1KTtcbiAgTShuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xLCA4LCA4KSwgcGluaywgMC4yLCAwLjcsIDAuMywgMC44LCAwLjksIDAuMjUpO1xuICAvLyBleWVzXG4gIE0obmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDU1LCA4LCA4KSwgYmxhY2ssIC0wLjEyLCAwLjUsIDAuNjYpO1xuICBNKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjA1NSwgOCwgOCksIGJsYWNrLCAwLjEyLCAwLjUsIDAuNjYpO1xuICBNKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjAyLCA2LCA2KSwgd2h0LCAtMC4xLCAwLjUyLCAwLjcpO1xuICBNKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjAyLCA2LCA2KSwgd2h0LCAwLjE0LCAwLjUyLCAwLjcpO1xuICAvLyBub3NlXG4gIE0obmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDY1LCA4LCA4KSwgcGluaywgMCwgMC40MiwgMC42Nyk7XG4gIC8vIHRhaWxcbiAgY29uc3QgdEMgPSBuZXcgVEhSRUUuQ2F0bXVsbFJvbUN1cnZlMyhbXG4gIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAuMDgsIC0wLjM4KSxcbiAgbmV3IFRIUkVFLlZlY3RvcjMoMC4yOCwgMC4yMiwgLTAuNjIpLFxuICBuZXcgVEhSRUUuVmVjdG9yMygwLjMyLCAwLjQ4LCAtMC41KV1cbiAgKTtcbiAgY29uc3QgdE0gPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuVHViZUdlb21ldHJ5KHRDLCA4LCAwLjA0LCA1LCBmYWxzZSksXG4gIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweGMwYTBhMCB9KSk7XG4gIGcuYWRkKHRNKTtcblxuICAvLyBnb2xkZW4gZ2xvdyByaW5nIChsaWtlIGluIHRoZSByZWZlcmVuY2UgaW1hZ2UpXG4gIGNvbnN0IHJpbmcgPSBuZXcgVEhSRUUuTWVzaChcbiAgICBuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgwLjYyLCAwLjA3LCAxMCwgMjgpLCBnb2xkXG4gICk7XG4gIHJpbmcucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuICByaW5nLnBvc2l0aW9uLnkgPSAwLjA1O1xuICBnLmFkZChyaW5nKTtcblxuICAvLyBpbm5lciBnbG93IGRpc2NcbiAgY29uc3QgZGlzYyA9IG5ldyBUSFJFRS5NZXNoKFxuICAgIG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgwLjU4LCAyOCksXG4gICAgbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ZmZlZTg4LCBlbWlzc2l2ZTogMHhmZmNjMDAsIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjUsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OiAwLjM1LCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIH0pXG4gICk7XG4gIGRpc2Mucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgZGlzYy5wb3NpdGlvbi55ID0gMC4wNjtcbiAgZy5hZGQoZGlzYyk7XG5cbiAgZy51c2VyRGF0YS5yaW5nID0gcmluZztcbiAgZy51c2VyRGF0YS5kaXNjID0gZGlzYztcbiAgZy5zY2FsZS5zZXRTY2FsYXIoMC45KTtcbiAgcmV0dXJuIGc7XG59XG5cbi8vIOKUgOKUgOKUgCBUcmFjayBzZWdtZW50IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuZnVuY3Rpb24gbWFrZVRyYWNrVGlsZSh0aGVtZSwgelBvcykge1xuICBjb25zdCBnID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gIGNvbnN0IFRXID0gOC40O1xuXG4gIC8vIE1haW4gc2xhYlxuICBjb25zdCBzbGFiID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KFRXLCAwLjMsIFNFR19MRU4pLFxuICAgIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiBwYXJzZUludCh0aGVtZS50cmFja0NvbG9yKSwgc2hpbmluZXNzOiA2MCB9KVxuICApO1xuICBzbGFiLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICBnLmFkZChzbGFiKTtcblxuICAvLyBHbG93aW5nIGxhbmUgbGluZXNcbiAgY29uc3QgbGluZU1hdCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7XG4gICAgY29sb3I6IHBhcnNlSW50KHRoZW1lLnRyYWNrTGluZSksIGVtaXNzaXZlOiBwYXJzZUludCh0aGVtZS50cmFja0dsb3cpLFxuICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjYsIHNoaW5pbmVzczogMTAwXG4gIH0pO1xuICBMQU5FUy5zbGljZSgwLCAtMSkuZm9yRWFjaCgobHgsIGkpID0+IHtcbiAgICBjb25zdCBiZXR3ZWVuID0gKExBTkVTW2ldICsgTEFORVNbaSArIDFdKSAvIDI7XG4gICAgZm9yIChsZXQgZHogPSAtU0VHX0xFTiAvIDIgKyAxOyBkeiA8IFNFR19MRU4gLyAyOyBkeiArPSAzLjUpIHtcbiAgICAgIGNvbnN0IGRhc2ggPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4wOCwgMC4wMiwgMS44KSwgbGluZU1hdCk7XG4gICAgICBkYXNoLnBvc2l0aW9uLnNldChiZXR3ZWVuLCAwLjE1NSwgZHopO1xuICAgICAgZy5hZGQoZGFzaCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBDZW50ZXIgbGluZVxuICBmb3IgKGxldCBkeiA9IC1TRUdfTEVOIC8gMiArIDE7IGR6IDwgU0VHX0xFTiAvIDI7IGR6ICs9IDMuNSkge1xuICAgIGNvbnN0IGRsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMDYsIDAuMDIsIDEuOCksIGxpbmVNYXQpO1xuICAgIGRsLnBvc2l0aW9uLnNldCgwLCAwLjE1NSwgZHopO2cuYWRkKGRsKTtcbiAgfVxuXG4gIC8vIFNpZGUga2VyYnNcbiAgWy1UVyAvIDIgLSAwLjIsIFRXIC8gMiArIDAuMl0uZm9yRWFjaCgoZXgpID0+IHtcbiAgICBjb25zdCBrZXJiID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC40LCAwLjQ1LCBTRUdfTEVOKSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiBwYXJzZUludCh0aGVtZS50cmFja0NvbG9yKSAqIDEuMyB8IDAsIHNoaW5pbmVzczogMzAgfSlcbiAgICApO1xuICAgIGtlcmIucG9zaXRpb24uc2V0KGV4LCAwLjA4LCAwKTtcbiAgICBnLmFkZChrZXJiKTtcbiAgfSk7XG5cbiAgZy5wb3NpdGlvbi5zZXQoMCwgMCwgelBvcyk7XG4gIHJldHVybiBnO1xufVxuXG4vLyDilIDilIDilIAgVGhlbWUtc3BlY2lmaWMgc2NlbmVyeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmZ1bmN0aW9uIG1ha2VTY2VuZXJ5KHRoZW1lLCB6UG9zKSB7XG4gIGNvbnN0IGcgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgY29uc3QgaWQgPSB0aGVtZS5pZDtcblxuICBbLTEsIDFdLmZvckVhY2goKHNpZGUpID0+IHtcbiAgICBjb25zdCBieCA9IHNpZGUgKiA2LjA7XG4gICAgY29uc3Qgcm5nID0gKGEsIGIpID0+IGEgKyBNYXRoLnJhbmRvbSgpICogKGIgLSBhKTtcblxuICAgIGlmIChpZCA9PT0gMCkge1xuICAgICAgLy8gPT09IENJVFkgTkVPTiA9PT1cbiAgICAgIC8vIFRhbGwgc2t5c2NyYXBlclxuICAgICAgY29uc3QgYkggPSBybmcoOCwgMjIpO1xuICAgICAgY29uc3QgYlcgPSBybmcoMS44LCAzLjIpO1xuICAgICAgY29uc3QgYmxkID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShiVywgYkgsIHJuZygxLjUsIDIuOCkpLFxuICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHgwYTBhMTggfSlcbiAgICAgICk7XG4gICAgICBibGQucG9zaXRpb24uc2V0KGJ4ICsgc2lkZSAqIHJuZygwLCAxLjUpLCBiSCAvIDIsIDApO1xuICAgICAgZy5hZGQoYmxkKTtcbiAgICAgIC8vIE5lb24gd2luZG93IHN0cmlwc1xuICAgICAgY29uc3QgbkNvbHMgPSBbMHhmZjAwZmYsIDB4MDBmZmZmLCAweGZmMDA4OCwgMHgwMDg4ZmZdO1xuICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBNYXRoLmZsb29yKGJIIC8gMS41KTsgcisrKSB7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC42KSB7XG4gICAgICAgICAgY29uc3Qgd24gPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShiVyAqIDAuOCwgMC4xOCwgMC4wNSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogbkNvbHNbciAlIG5Db2xzLmxlbmd0aF0sIGVtaXNzaXZlOiBuQ29sc1tyICUgbkNvbHMubGVuZ3RoXSwgZW1pc3NpdmVJbnRlbnNpdHk6IDAuOSB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgd24ucG9zaXRpb24uc2V0KGJ4ICsgc2lkZSAqIHJuZygwLCAxLjUpLCAxLjIgKyByICogMS41LCBibGQucG9zaXRpb24ueiArIHJuZygwLjgsIDEuNCkgKiBzaWRlICogMCArIDAuMDQpO1xuICAgICAgICAgIGcuYWRkKHduKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gTmVvbiBzaWduIG9uIHJvYWQgbGV2ZWxcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgIGNvbnN0IHNpZ24gPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkocm5nKDAuOCwgMS41KSwgMC4zLCAwLjA4KSxcbiAgICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwYWEsIGVtaXNzaXZlOiAweGZmMDA4OCwgZW1pc3NpdmVJbnRlbnNpdHk6IDEuMiB9KVxuICAgICAgICApO1xuICAgICAgICBzaWduLnBvc2l0aW9uLnNldChieCArIHNpZGUgKiAwLjMsIHJuZygyLCA1KSwgMC4wNSk7XG4gICAgICAgIGcuYWRkKHNpZ24pO1xuICAgICAgfVxuICAgICAgLy8gUGlwZSBvbiBzaWRlXG4gICAgICBjb25zdCBwaXBlID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMTIsIDAuMTIsIHJuZygzLCA3KSwgNyksXG4gICAgICAgIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDIyMjIzMyB9KVxuICAgICAgKTtcbiAgICAgIHBpcGUucG9zaXRpb24uc2V0KGJ4IC0gc2lkZSAqIDAuOCwgcm5nKDEuNSwgNCksIDApO1xuICAgICAgZy5hZGQocGlwZSk7XG5cbiAgICB9IGVsc2UgaWYgKGlkID09PSAxKSB7XG4gICAgICAvLyA9PT0gTU9OT0xJVEggPT09XG4gICAgICBjb25zdCBtSCA9IHJuZyg0LCAxMik7XG4gICAgICBjb25zdCBtVyA9IHJuZygwLjgsIDEuNik7XG4gICAgICBjb25zdCBtb25vbGl0aCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkobVcsIG1ILCBtVyAqIDAuNyksXG4gICAgICAgIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDBkMGQxOCwgc2hpbmluZXNzOiA4MCB9KVxuICAgICAgKTtcbiAgICAgIG1vbm9saXRoLnBvc2l0aW9uLnNldChieCArIHNpZGUgKiBybmcoMCwgMiksIG1IIC8gMiwgMCk7XG4gICAgICBnLmFkZChtb25vbGl0aCk7XG4gICAgICAvLyBTdWJ0bGUgZWRnZSBnbG93XG4gICAgICBjb25zdCBlZGdlID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjA0LCBtSCwgMC4wNCksXG4gICAgICAgIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDMzNDQ4OCwgZW1pc3NpdmU6IDB4MjIzMzY2LCBlbWlzc2l2ZUludGVuc2l0eTogMC42IH0pXG4gICAgICApO1xuICAgICAgZWRnZS5wb3NpdGlvbi5zZXQoYnggKyBzaWRlICogcm5nKDAsIDIpICsgc2lkZSAqIG1XICogMC41MSwgbUggLyAyLCAwKTtcbiAgICAgIGcuYWRkKGVkZ2UpO1xuICAgICAgLy8gU3RhcnMgKHNtYWxsIHNwaGVyZXMgZmFyIGJhY2spXG4gICAgICBmb3IgKGxldCBzID0gMDsgcyA8IDQ7IHMrKykge1xuICAgICAgICBjb25zdCBzdGFyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDUsIDUsIDUpLFxuICAgICAgICAgIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiwgZW1pc3NpdmU6IDB4ZmZmZmZmLCBlbWlzc2l2ZUludGVuc2l0eTogMSB9KVxuICAgICAgICApO1xuICAgICAgICBzdGFyLnBvc2l0aW9uLnNldChieCArIHJuZygtMywgMyksIHJuZyhtSCAqIDAuNSwgbUggKiAxLjUpLCAtcm5nKDIsIDgpKTtcbiAgICAgICAgZy5hZGQoc3Rhcik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gPT09IE1BR0lDIEZPUkVTVCA9PT1cbiAgICAgIC8vIEJpZyB0cmVlXG4gICAgICBjb25zdCB0aCA9IHJuZyg1LCAxMSk7XG4gICAgICBjb25zdCB0cnVuayA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeShybmcoMC4zLCAwLjUpLCBybmcoMC40LCAwLjY1KSwgdGgsIDgpLFxuICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHgzZDIwMDggfSlcbiAgICAgICk7XG4gICAgICB0cnVuay5wb3NpdGlvbi5zZXQoYnggKyBzaWRlICogcm5nKDAsIDEuNSksIHRoIC8gMiwgMCk7XG4gICAgICBnLmFkZCh0cnVuayk7XG4gICAgICAvLyBMYXllcmVkIGNhbm9weSAoZGFyayBwaW5lIHN0eWxlKVxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCAzOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgIG5ldyBUSFJFRS5Db25lR2VvbWV0cnkocm5nKDEuMiwgMi4yKSAtIGMgKiAwLjMsIHJuZygyLCAzKSwgOCksXG4gICAgICAgICAgbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MGQzYTBkIH0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbmUucG9zaXRpb24uc2V0KGJ4ICsgc2lkZSAqIHJuZygwLCAxLjUpLCB0aCAqIDAuNTUgKyBjICogMS42LCAwKTtcbiAgICAgICAgZy5hZGQoY29uZSk7XG4gICAgICB9XG4gICAgICAvLyBHbG93aW5nIG11c2hyb29tc1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjQpIHtcbiAgICAgICAgY29uc3QgbXVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgIG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjIyLCA4LCA2KSxcbiAgICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjQ0MDAsIGVtaXNzaXZlOiAweGZmMjIwMCwgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNSB9KVxuICAgICAgICApO1xuICAgICAgICBtdXNoLnBvc2l0aW9uLnNldChieCArIHNpZGUgKiBybmcoMC4zLCAxLjApLCAwLjE4LCBybmcoLTEsIDEpKTtcbiAgICAgICAgbXVzaC5zY2FsZS5zZXQoMSwgMC43LCAxKTtcbiAgICAgICAgZy5hZGQobXVzaCk7XG4gICAgICB9XG4gICAgICAvLyBMYW50ZXJuXG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgICBjb25zdCBsYW50ZXJuID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMjIsIDAuMywgMC4yMiksXG4gICAgICAgICAgbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ZmZhYTAwLCBlbWlzc2l2ZTogMHhmZjg4MDAsIGVtaXNzaXZlSW50ZW5zaXR5OiAxIH0pXG4gICAgICAgICk7XG4gICAgICAgIGxhbnRlcm4ucG9zaXRpb24uc2V0KGJ4ICsgc2lkZSAqIDAuNSwgcm5nKDAuNiwgMS41KSwgcm5nKC0wLjUsIDAuNSkpO1xuICAgICAgICBnLmFkZChsYW50ZXJuKTtcbiAgICAgICAgLy8gcG9sZVxuICAgICAgICBjb25zdCBwb2xlID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4wMywgMC4wMywgbGFudGVybi5wb3NpdGlvbi55LCA1KSxcbiAgICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHg1NTMzMDAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgcG9sZS5wb3NpdGlvbi5zZXQobGFudGVybi5wb3NpdGlvbi54LCBsYW50ZXJuLnBvc2l0aW9uLnkgLyAyLCBsYW50ZXJuLnBvc2l0aW9uLnopO1xuICAgICAgICBnLmFkZChwb2xlKTtcbiAgICAgIH1cbiAgICAgIC8vIENhc3RsZSB0b3dlciAobGV2ZWwgMyBvbmx5LCBvY2Nhc2lvbmFsKVxuICAgICAgaWYgKHNpZGUgPT09IDEgJiYgTWF0aC5yYW5kb20oKSA+IDAuNjUpIHtcbiAgICAgICAgY29uc3QgdHcgPSBybmcoNCwgNyk7XG4gICAgICAgIGNvbnN0IHRvd2VyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC43LCAwLjgsIHR3LCA5KSxcbiAgICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHgzYTIwMjAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgdG93ZXIucG9zaXRpb24uc2V0KGJ4ICsgMS41LCB0dyAvIDIsIDApO1xuICAgICAgICBnLmFkZCh0b3dlcik7XG4gICAgICAgIGNvbnN0IGNhcCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgIG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMC44NSwgMS41LCA5KSxcbiAgICAgICAgICBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHg4YTEwMTAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgY2FwLnBvc2l0aW9uLnNldChieCArIDEuNSwgdHcgKyAwLjc1LCAwKTtcbiAgICAgICAgZy5hZGQoY2FwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGcucG9zaXRpb24ueiA9IHpQb3M7XG4gIHJldHVybiBnO1xufVxuXG4vLyDilIDilIDilIAgT2JzdGFjbGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5mdW5jdGlvbiBtYWtlT2JzdGFjbGUodHlwZSwgbGFuZVgsIHRoZW1lKSB7XG4gIGNvbnN0IGcgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MzM0NDY2LCBzaGluaW5lc3M6IDYwIH0pO1xuICBjb25zdCB3YXJuID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ZmYzMzAwLCBlbWlzc2l2ZTogMHhhYTExMDAsIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjYgfSk7XG5cbiAgaWYgKHR5cGUgPT09IDApIHtcbiAgICAvLyBCQVJSSUVSIOKAkyBqdW1wIG92ZXJcbiAgICBjb25zdCBiYXIgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMi40LCAwLjg1LCAwLjQyKSwgbWF0KTtcbiAgICBiYXIucG9zaXRpb24ueSA9IDAuNDI7YmFyLmNhc3RTaGFkb3cgPSB0cnVlO2cuYWRkKGJhcik7XG4gICAgZm9yIChsZXQgaSA9IC0wLjg7IGkgPD0gMC44MTsgaSArPSAwLjQpIHtcbiAgICAgIGNvbnN0IHN0ID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMSwgMC44NywgMC40NCksIHdhcm4pO1xuICAgICAgc3QucG9zaXRpb24uc2V0KGksIDAuNDIsIDApO2cuYWRkKHN0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gMSkge1xuICAgIC8vIExPVyBCQVIg4oCTIHNsaWRlIHVuZGVyXG4gICAgWy0wLjk1LCAwLjk1XS5mb3JFYWNoKChweCkgPT4ge1xuICAgICAgY29uc3QgcCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMDcsIDAuMDcsIDEuNDUsIDcpLCBtYXQpO1xuICAgICAgcC5wb3NpdGlvbi5zZXQocHgsIDAuNzIsIDApO3AuY2FzdFNoYWRvdyA9IHRydWU7Zy5hZGQocCk7XG4gICAgfSk7XG4gICAgY29uc3QgYmFyID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDIuNCwgMC4yMiwgMC4zOCksIHdhcm4pO1xuICAgIGJhci5wb3NpdGlvbi55ID0gMS4zNjtnLmFkZChiYXIpO1xuICB9IGVsc2Uge1xuICAgIC8vIFdBTEwg4oCTIGNoYW5nZSBsYW5lXG4gICAgY29uc3Qgd2FsbCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgyLjQsIDIuNCwgMC40NCksIG1hdCk7XG4gICAgd2FsbC5wb3NpdGlvbi55ID0gMS4yO3dhbGwuY2FzdFNoYWRvdyA9IHRydWU7Zy5hZGQod2FsbCk7XG4gICAgY29uc3QgdG9wID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDIuNiwgMC4yMiwgMC41MiksIHdhcm4pO1xuICAgIHRvcC5wb3NpdGlvbi55ID0gMi4zNTtnLmFkZCh0b3ApO1xuICB9XG5cbiAgZy5wb3NpdGlvbi54ID0gbGFuZVg7XG4gIHJldHVybiBnO1xufVxuXG4vLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJ1bm5lckNhbnZhcyh7IHRoZW1lSWQsIGlzUGxheWluZywgb25TY29yZSwgb25HYW1lT3Zlciwgb25EaXN0YW5jZVVwZGF0ZSwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgY29uc3QgbW91bnRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFMgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHJhZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qga2V5cyA9IHVzZVJlZih7fSk7XG4gIGNvbnN0IHRvdWNoID0gdXNlUmVmKHsgc3g6IDAsIHN5OiAwIH0pO1xuXG4gIGNvbnN0IGJvb3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBNQVBfVEhFTUVTW3RoZW1lSWRdIHx8IE1BUF9USEVNRVNbMF07XG4gICAgY29uc3QgZWwgPSBtb3VudFJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBjb25zdCBXID0gZWwuY2xpZW50V2lkdGggfHwgd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3QgSCA9IGVsLmNsaWVudEhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvLyBSZW5kZXJlclxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZShXLCBIKTtcbiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKSk7XG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICBlbC5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIC8vIFNjZW5lXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKHRoZW1lLnNreVRvcCk7XG4gICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZyh0aGVtZS5mb2dDb2xvciwgdGhlbWUuZm9nTmVhciwgdGhlbWUuZm9nRmFyKTtcblxuICAgIC8vIENhbWVyYSDigJMgYmVoaW5kL2Fib3ZlIGNhdCwgbW9yZSBwdWxsZWQgYmFjayBzbyBjYXQgaXMgZnVsbHkgdmlzaWJsZVxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg1NSwgVyAvIEgsIDAuMSwgMjIwKTtcbiAgICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDQuOCwgMTIuMCk7XG4gICAgY2FtZXJhLmxvb2tBdCgwLCAxLjIsIC0xMCk7XG5cbiAgICAvLyDilIDilIAgTGlnaHRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAzLjIpKTtcblxuICAgIGNvbnN0IHN1biA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkLCA0LjApO1xuICAgIHN1bi5wb3NpdGlvbi5zZXQoNiwgMTYsIDgpO1xuICAgIHN1bi5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICBzdW4uc2hhZG93Lm1hcFNpemUuc2V0KDIwNDgsIDIwNDgpO1xuICAgIHN1bi5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTg7c3VuLnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxODtcbiAgICBzdW4uc2hhZG93LmNhbWVyYS50b3AgPSAxODtzdW4uc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTg7XG4gICAgc3VuLnNoYWRvdy5jYW1lcmEubmVhciA9IDAuNTtzdW4uc2hhZG93LmNhbWVyYS5mYXIgPSA4MDtcbiAgICBzdW4uc2hhZG93LmJpYXMgPSAtMC4wMDE7XG4gICAgc2NlbmUuYWRkKHN1bik7XG5cbiAgICBjb25zdCBmaWxsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYmJmZiwgMS42KTtcbiAgICBmaWxsTGlnaHQucG9zaXRpb24uc2V0KC01LCA4LCA0KTtcbiAgICBzY2VuZS5hZGQoZmlsbExpZ2h0KTtcblxuICAgIC8vIFJpbSBsaWdodCBmcm9tIGZyb250IChzbyBjYXQgc2lsaG91ZXR0ZSBpcyBjbGVhciBmcm9tIGJlaGluZClcbiAgICBjb25zdCByaW1MaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAyLjUpO1xuICAgIHJpbUxpZ2h0LnBvc2l0aW9uLnNldCgwLCA2LCAtMjApO1xuICAgIHNjZW5lLmFkZChyaW1MaWdodCk7XG5cbiAgICBjb25zdCBjYXRQdCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmNWUwLCAyLjIsIDE0KTtcbiAgICBjYXRQdC5wb3NpdGlvbi5zZXQoMCwgNCwgNyk7XG4gICAgc2NlbmUuYWRkKGNhdFB0KTtcblxuICAgIC8vIOKUgOKUgCBTa3kgZ3JhZGllbnQgcGxhbmUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgY29uc3Qgc2t5R2VvID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMzAwLCAxMjApO1xuICAgIGNvbnN0IHNreU1hdCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICB0b3BDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKHRoZW1lLnNreVRvcCkgfSxcbiAgICAgICAgYm90dG9tQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcih0aGVtZS5za3lCb3R0b20pIH1cbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhTaGFkZXI6IGBcbiAgICAgICAgdmFyeWluZyBmbG9hdCB2WTtcbiAgICAgICAgdm9pZCBtYWluKCkgeyB2WSA9IHBvc2l0aW9uLnk7IGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCptb2RlbFZpZXdNYXRyaXgqdmVjNChwb3NpdGlvbiwxLjApOyB9XG4gICAgICBgLFxuICAgICAgZnJhZ21lbnRTaGFkZXI6IGBcbiAgICAgICAgdW5pZm9ybSB2ZWMzIHRvcENvbG9yOyB1bmlmb3JtIHZlYzMgYm90dG9tQ29sb3I7XG4gICAgICAgIHZhcnlpbmcgZmxvYXQgdlk7XG4gICAgICAgIHZvaWQgbWFpbigpIHsgZmxvYXQgdCA9IGNsYW1wKCh2WSsyMC4wKS84MC4wLDAuMCwxLjApOyBnbF9GcmFnQ29sb3IgPSB2ZWM0KG1peChib3R0b21Db2xvcix0b3BDb2xvcix0KSwxLjApOyB9XG4gICAgICBgLFxuICAgICAgc2lkZTogVEhSRUUuQmFja1NpZGVcbiAgICB9KTtcbiAgICBjb25zdCBza3kgPSBuZXcgVEhSRUUuTWVzaChza3lHZW8sIHNreU1hdCk7XG4gICAgc2t5LnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICBza3kucG9zaXRpb24uc2V0KDAsIDMwLCAtNjApO1xuICAgIHNjZW5lLmFkZChza3kpO1xuXG4gICAgLy8g4pSA4pSAIENhdCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBjb25zdCBjYXQgPSBtYWtlQ2F0KCk7XG4gICAgY2F0LnBvc2l0aW9uLnNldCgwLCBHUk9VTkRfWSwgNS4wKTtcbiAgICBjYXQucm90YXRpb24ueSA9IE1hdGguUEk7IC8vIGZhY2UgYXdheSBmcm9tIGNhbWVyYSA9IHRvd2FyZCB0cmFja1xuICAgIHNjZW5lLmFkZChjYXQpO1xuXG4gICAgLy8g4pSA4pSAIFRyYWNrIHRpbGVzIChwb29sKSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBjb25zdCB0aWxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTlVNX1RJTEVTOyBpKyspIHtcbiAgICAgIGNvbnN0IHogPSAtKGkgKiBTRUdfTEVOKSArIFNFR19MRU4gLyAyO1xuICAgICAgY29uc3QgdCA9IG1ha2VUcmFja1RpbGUodGhlbWUsIHopO1xuICAgICAgc2NlbmUuYWRkKHQpO1xuICAgICAgdGlsZXMucHVzaCh0KTtcbiAgICB9XG4gICAgbGV0IHRpbGVQb29sX25leHRaID0gLShOVU1fVElMRVMgKiBTRUdfTEVOKSArIFNFR19MRU4gLyAyO1xuXG4gICAgLy8g4pSA4pSAIFNjZW5lcnkgKHBvb2wpIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIGNvbnN0IHNjZW5lcnkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9USUxFUzsgaSsrKSB7XG4gICAgICBjb25zdCB6ID0gLShpICogU0VHX0xFTik7XG4gICAgICBjb25zdCBzID0gbWFrZVNjZW5lcnkodGhlbWUsIHopO1xuICAgICAgc2NlbmUuYWRkKHMpO1xuICAgICAgc2NlbmVyeS5wdXNoKHMpO1xuICAgIH1cbiAgICBsZXQgc2NlbmVyeVBvb2xfbmV4dFogPSAtKE5VTV9USUxFUyAqIFNFR19MRU4pO1xuXG4gICAgLy8g4pSA4pSAIE1pY2Ug4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgY29uc3QgbWljZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICBjb25zdCBsbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpO1xuICAgICAgY29uc3QgbSA9IG1ha2VNb3VzZSgpO1xuICAgICAgbS5wb3NpdGlvbi5zZXQoTEFORVNbbG5dLCAwLjg4LCAtMjAgLSBpICogMTMpO1xuICAgICAgc2NlbmUuYWRkKG0pO1xuICAgICAgbWljZS5wdXNoKHsgbWVzaDogbSwgY29sbGVjdGVkOiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICAvLyDilIDilIAgU3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgUy5jdXJyZW50ID0ge1xuICAgICAgcmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEsIGNhdCwgc3VuLCBjYXRQdCwgc2t5LFxuICAgICAgdGlsZXMsIHRpbGVQb29sX25leHRaLFxuICAgICAgc2NlbmVyeSwgc2NlbmVyeVBvb2xfbmV4dFosXG4gICAgICBvYnN0YWNsZXM6IFtdLCBtaWNlLCB0aGVtZSxcbiAgICAgIG9ic05leHRaOiAtNDAsIG1vdXNlTmV4dFo6IC03MCxcbiAgICAgIGxhbmU6IDEsIHRhcmdldExhbmU6IDEsXG4gICAgICBjYXRYOiAwLCBjYXRZOiBHUk9VTkRfWSwgdmVsWTogMCxcbiAgICAgIGlzSnVtcGluZzogZmFsc2UsIGlzU2xpZGluZzogZmFsc2UsIHNsaWRlVDogMCxcbiAgICAgIGRlYWQ6IGZhbHNlLCBzY29yZTogMCwgZGlzdDogMCxcbiAgICAgIHNwZWVkOiBCQVNFX1NQRCwgZnJhbWU6IDAsIGxlZ1Q6IDBcbiAgICB9O1xuICB9LCBbdGhlbWVJZF0pO1xuXG4gIC8vIOKUgOKUgCBTcGF3biBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBmdW5jdGlvbiBzcGF3bk9icyh6UG9zKSB7XG4gICAgY29uc3Qgc3QgPSBTLmN1cnJlbnQ7XG4gICAgY29uc3QgY291bnQgPSBNYXRoLm1pbigxICsgTWF0aC5mbG9vcihzdC5zY29yZSAvIDcpLCAyKTtcbiAgICBjb25zdCB1c2VkID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IG4gPSAwOyBuIDwgY291bnQ7IG4rKykge1xuICAgICAgbGV0IGxuO2xldCB0ID0gMDtcbiAgICAgIGRvIHtsbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpO3QrKzt9IHdoaWxlICh1c2VkLmhhcyhsbikgJiYgdCA8IDEyKTtcbiAgICAgIHVzZWQuYWRkKGxuKTtcbiAgICAgIGNvbnN0IHR5cGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcbiAgICAgIGNvbnN0IG1lc2ggPSBtYWtlT2JzdGFjbGUodHlwZSwgTEFORVNbbG5dLCBzdC50aGVtZSk7XG4gICAgICBtZXNoLnBvc2l0aW9uLnogPSB6UG9zIC0gTWF0aC5yYW5kb20oKSAqIDEwO1xuICAgICAgc3Quc2NlbmUuYWRkKG1lc2gpO1xuICAgICAgc3Qub2JzdGFjbGVzLnB1c2goeyBtZXNoLCBsYW5lOiBsbiwgdHlwZSwgejogbWVzaC5wb3NpdGlvbi56IH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNwYXduTWljZSh6UG9zKSB7XG4gICAgY29uc3Qgc3QgPSBTLmN1cnJlbnQ7XG4gICAgLy8gTGluZSBvZiAxLTMgbWljZSBpbiByYW5kb20gbGFuZXNcbiAgICBjb25zdCBjb3VudCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcbiAgICBjb25zdCB1c2VkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBsZXQgbG47bGV0IHQgPSAwO1xuICAgICAgZG8ge2xuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7dCsrO30gd2hpbGUgKHVzZWQuaW5jbHVkZXMobG4pICYmIHQgPCAxMCk7XG4gICAgICB1c2VkLnB1c2gobG4pO1xuICAgICAgY29uc3QgbSA9IG1ha2VNb3VzZSgpO1xuICAgICAgbS5wb3NpdGlvbi5zZXQoTEFORVNbbG5dLCAwLjg4LCB6UG9zIC0gaSAqIDUuNSk7XG4gICAgICBzdC5zY2VuZS5hZGQobSk7XG4gICAgICBzdC5taWNlLnB1c2goeyBtZXNoOiBtLCBjb2xsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIOKUgOKUgCBHYW1lIGxvb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGNvbnN0IGxvb3AgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc3QgPSBTLmN1cnJlbnQ7XG4gICAgaWYgKCFzdCB8fCBzdC5kZWFkKSByZXR1cm47XG5cbiAgICBjb25zdCBkdCA9IDEgLyA2MDtcbiAgICBzdC5mcmFtZSsrO1xuICAgIHN0LnNwZWVkID0gQkFTRV9TUEQgKyBzdC5zY29yZSAqIFNQRF9JTkM7XG4gICAgY29uc3QgZHogPSBzdC5zcGVlZCAqIGR0O1xuICAgIHN0LmRpc3QgKz0gZHo7XG4gICAgaWYgKG9uRGlzdGFuY2VVcGRhdGUpIG9uRGlzdGFuY2VVcGRhdGUoTWF0aC5mbG9vcihzdC5kaXN0KSk7XG5cbiAgICAvLyBNb3ZlIHRpbGVzXG4gICAgc3QudGlsZXMuZm9yRWFjaCgodCkgPT4ge3QucG9zaXRpb24ueiArPSBkejt9KTtcbiAgICBzdC5zY2VuZXJ5LmZvckVhY2goKHMpID0+IHtzLnBvc2l0aW9uLnogKz0gZHo7fSk7XG4gICAgc3Qub2JzdGFjbGVzLmZvckVhY2goKG8pID0+IHtvLm1lc2gucG9zaXRpb24ueiArPSBkejtvLnogKz0gZHo7fSk7XG4gICAgc3QubWljZS5mb3JFYWNoKChtKSA9PiB7aWYgKCFtLmNvbGxlY3RlZCkgbS5tZXNoLnBvc2l0aW9uLnogKz0gZHo7fSk7XG5cbiAgICAvLyDilIDilIAgUmVjeWNsZSB0aWxlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBzdC50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICBpZiAodGlsZS5wb3NpdGlvbi56ID4gU0VHX0xFTiAqIDEuMikge1xuICAgICAgICB0aWxlLnBvc2l0aW9uLnogPSBzdC50aWxlUG9vbF9uZXh0WjtcbiAgICAgICAgc3QudGlsZVBvb2xfbmV4dFogLT0gU0VHX0xFTjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOKUgOKUgCBSZWN5Y2xlIHNjZW5lcnkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgc3Quc2NlbmVyeS5mb3JFYWNoKChzKSA9PiB7XG4gICAgICBpZiAocy5wb3NpdGlvbi56ID4gU0VHX0xFTiAqIDEuMikge1xuICAgICAgICAvLyBSZWJ1aWxkIGNoaWxkcmVuXG4gICAgICAgIHdoaWxlIChzLmNoaWxkcmVuLmxlbmd0aCkgcy5yZW1vdmUocy5jaGlsZHJlblswXSk7XG4gICAgICAgIGNvbnN0IGZyZXNoID0gbWFrZVNjZW5lcnkoc3QudGhlbWUsIDApO1xuICAgICAgICBmcmVzaC5jaGlsZHJlbi5mb3JFYWNoKChjKSA9PiBzLmFkZChjKSk7XG4gICAgICAgIHMucG9zaXRpb24ueiA9IHN0LnNjZW5lcnlQb29sX25leHRaO1xuICAgICAgICBzdC5zY2VuZXJ5UG9vbF9uZXh0WiAtPSBTRUdfTEVOO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g4pSA4pSAIFNwYXduIG9ic3RhY2xlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBzdC5vYnNOZXh0WiArPSBkejtcbiAgICBpZiAoc3Qub2JzTmV4dFogPiAtMjgpIHtcbiAgICAgIHNwYXduT2JzKC01NSk7XG4gICAgICBzdC5vYnNOZXh0WiA9IC01NTtcbiAgICB9XG5cbiAgICAvLyDilIDilIAgU3Bhd24gbWljZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBzdC5tb3VzZU5leHRaICs9IGR6O1xuICAgIGlmIChzdC5tb3VzZU5leHRaID4gLTI4KSB7XG4gICAgICBzcGF3bk1pY2UoLTU1IC0gTWF0aC5yYW5kb20oKSAqIDEyKTtcbiAgICAgIHN0Lm1vdXNlTmV4dFogPSAtNTUgLSBNYXRoLnJhbmRvbSgpICogMTI7XG4gICAgfVxuXG4gICAgLy8g4pSA4pSAIENsZWFudXAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgZm9yIChsZXQgaSA9IHN0Lm9ic3RhY2xlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKHN0Lm9ic3RhY2xlc1tpXS56ID4gMTMpIHtzdC5zY2VuZS5yZW1vdmUoc3Qub2JzdGFjbGVzW2ldLm1lc2gpO3N0Lm9ic3RhY2xlcy5zcGxpY2UoaSwgMSk7fVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gc3QubWljZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgbSA9IHN0Lm1pY2VbaV07XG4gICAgICBpZiAobS5tZXNoLnBvc2l0aW9uLnogPiAxMiB8fCBtLmNvbGxlY3RlZCkge3N0LnNjZW5lLnJlbW92ZShtLm1lc2gpO3N0Lm1pY2Uuc3BsaWNlKGksIDEpO31cbiAgICB9XG5cbiAgICAvLyDilIDilIAgQ2F0IFgg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgY29uc3QgdFggPSBMQU5FU1tzdC50YXJnZXRMYW5lXTtcbiAgICBzdC5jYXRYICs9ICh0WCAtIHN0LmNhdFgpICogZHQgKiAxMztcbiAgICBzdC5jYXQucG9zaXRpb24ueCA9IHN0LmNhdFg7XG5cbiAgICAvLyDilIDilIAgR3Jhdml0eSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBpZiAoc3QuaXNKdW1waW5nIHx8IHN0LmNhdFkgPiBHUk9VTkRfWSkge1xuICAgICAgc3QudmVsWSArPSBHUkFWICogZHQ7XG4gICAgICBzdC5jYXRZICs9IHN0LnZlbFkgKiBkdDtcbiAgICAgIGlmIChzdC5jYXRZIDw9IEdST1VORF9ZKSB7c3QuY2F0WSA9IEdST1VORF9ZO3N0LnZlbFkgPSAwO3N0LmlzSnVtcGluZyA9IGZhbHNlO31cbiAgICB9XG4gICAgc3QuY2F0LnBvc2l0aW9uLnkgPSBzdC5jYXRZO1xuXG4gICAgLy8g4pSA4pSAIFNsaWRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIGlmIChzdC5pc1NsaWRpbmcpIHtcbiAgICAgIHN0LnNsaWRlVCAtPSBkdCAqIDEwMDA7XG4gICAgICBpZiAoc3Quc2xpZGVUIDw9IDApIHtzdC5pc1NsaWRpbmcgPSBmYWxzZTtzdC5jYXQuc2NhbGUueSA9IDE7fVxuICAgIH1cblxuICAgIC8vIOKUgOKUgCBDYXQgYW5pbWF0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIHN0LmxlZ1QgKz0gZHQgKiBzdC5zcGVlZCAqIDEuNTtcbiAgICBjb25zdCBsZWdzID0gc3QuY2F0LnVzZXJEYXRhLmxlZ3M7XG4gICAgaWYgKGxlZ3MpIHtcbiAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihzdC5sZWdUKTtcbiAgICAgIGxlZ3NbMF0ucm90YXRpb24ueCA9IHMgKiAwLjc7XG4gICAgICBsZWdzWzFdLnJvdGF0aW9uLnggPSAtcyAqIDAuNztcbiAgICAgIGxlZ3NbMl0ucm90YXRpb24ueCA9IC1zICogMC41NTtcbiAgICAgIGxlZ3NbM10ucm90YXRpb24ueCA9IHMgKiAwLjU1O1xuICAgIH1cbiAgICAvLyBib2R5IGJvYlxuICAgIGNvbnN0IGJvYiA9IE1hdGguYWJzKE1hdGguc2luKHN0LmxlZ1QpKSAqIDAuMDc7XG4gICAgc3QuY2F0LnBvc2l0aW9uLnkgPSBzdC5jYXRZICsgYm9iO1xuICAgIC8vIHRhaWwgd2FnXG4gICAgaWYgKHN0LmNhdC51c2VyRGF0YS50YWlsKSBzdC5jYXQudXNlckRhdGEudGFpbC5yb3RhdGlvbi56ID0gTWF0aC5zaW4oc3QuZnJhbWUgKiAwLjA5KSAqIDAuMjg7XG4gICAgLy8gbGVhblxuICAgIGNvbnN0IHhEaWZmID0gdFggLSBzdC5jYXRYO1xuICAgIHN0LmNhdC5yb3RhdGlvbi56ID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAoc3QuY2F0LnJvdGF0aW9uLnosIC14RGlmZiAqIDAuMDU1LCAwLjE0KTtcblxuICAgIC8vIOKUgOKUgCBNaWNlIGFuaW1hdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBzdC5taWNlLmZvckVhY2goKG0pID0+IHtcbiAgICAgIGlmIChtLmNvbGxlY3RlZCkgcmV0dXJuO1xuICAgICAgbS5tZXNoLnJvdGF0aW9uLnkgKz0gZHQgKiAyLjI7XG4gICAgICBtLm1lc2gucG9zaXRpb24ueSA9IDAuODggKyBNYXRoLnNpbihzdC5mcmFtZSAqIDAuMDcgKyBtLm1lc2gucG9zaXRpb24ueCkgKiAwLjEzO1xuICAgICAgaWYgKG0ubWVzaC51c2VyRGF0YS5yaW5nKSBtLm1lc2gudXNlckRhdGEucmluZy5yb3RhdGlvbi56ICs9IGR0ICogMy41O1xuICAgIH0pO1xuXG4gICAgLy8g4pSA4pSAIENvbGxlY3QgbWljZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBzdC5taWNlLmZvckVhY2goKG0pID0+IHtcbiAgICAgIGlmIChtLmNvbGxlY3RlZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbXogPSBtLm1lc2gucG9zaXRpb24uejtcbiAgICAgIGlmIChteiA+IDQuNSAmJiBteiA8IDcuOCAmJiBNYXRoLmFicyhzdC5jYXRYIC0gbS5tZXNoLnBvc2l0aW9uLngpIDwgMS42KSB7XG4gICAgICAgIG0uY29sbGVjdGVkID0gdHJ1ZTtzdC5zY29yZSsrO2lmIChvblNjb3JlKSBvblNjb3JlKHN0LnNjb3JlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOKUgOKUgCBPYnN0YWNsZSBjb2xsaXNpb24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgZm9yIChjb25zdCBvYnMgb2Ygc3Qub2JzdGFjbGVzKSB7XG4gICAgICBjb25zdCBveiA9IG9icy5tZXNoLnBvc2l0aW9uLno7XG4gICAgICBpZiAob3ogPiA0LjAgJiYgb3ogPCA3LjUgJiYgTWF0aC5hYnMoc3QuY2F0WCAtIG9icy5tZXNoLnBvc2l0aW9uLngpIDwgMS4zNSkge1xuICAgICAgICBsZXQgaGl0ID0gZmFsc2U7XG4gICAgICAgIGlmIChvYnMudHlwZSA9PT0gMCkgaGl0ID0gc3QuY2F0WSA8IDEuMDtlbHNlXG4gICAgICAgIGlmIChvYnMudHlwZSA9PT0gMSkgaGl0ID0gIXN0LmlzU2xpZGluZztlbHNlXG4gICAgICAgIGhpdCA9IHRydWU7XG4gICAgICAgIGlmIChoaXQpIHtzdC5kZWFkID0gdHJ1ZTtpZiAob25HYW1lT3Zlcikgb25HYW1lT3ZlcihzdC5zY29yZSwgTWF0aC5mbG9vcihzdC5kaXN0KSk7cmV0dXJuO31cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDilIDilIAgQ2FtZXJhIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgIGNvbnN0IGNhbVRYID0gc3QuY2F0WCAqIDAuMjg7XG4gICAgY29uc3QgY2FtVFkgPSBzdC5pc1NsaWRpbmcgPyAzLjggOiA0Ljg7XG4gICAgc3QuY2FtZXJhLnBvc2l0aW9uLnggPSBUSFJFRS5NYXRoVXRpbHMubGVycChzdC5jYW1lcmEucG9zaXRpb24ueCwgY2FtVFgsIDAuMSk7XG4gICAgc3QuY2FtZXJhLnBvc2l0aW9uLnkgPSBUSFJFRS5NYXRoVXRpbHMubGVycChzdC5jYW1lcmEucG9zaXRpb24ueSwgY2FtVFksIDAuMDgpO1xuICAgIHN0LmNhbWVyYS5wb3NpdGlvbi56ID0gMTIuMDtcbiAgICBzdC5jYW1lcmEubG9va0F0KHN0LmNhdFggKiAwLjIyLCAxLjIsIC0xMCk7XG5cbiAgICBzdC5zdW4ucG9zaXRpb24uc2V0KHN0LmNhbWVyYS5wb3NpdGlvbi54ICsgNiwgMTYsIHN0LmNhbWVyYS5wb3NpdGlvbi56ICsgOCk7XG4gICAgc3QuY2F0UHQucG9zaXRpb24uc2V0KHN0LmNhdFgsIDQsIDcuNSk7XG5cbiAgICBzdC5yZW5kZXJlci5yZW5kZXIoc3Quc2NlbmUsIHN0LmNhbWVyYSk7XG4gICAgcmFmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gIH0sIFtvblNjb3JlLCBvbkdhbWVPdmVyLCBvbkRpc3RhbmNlVXBkYXRlXSk7XG5cbiAgLy8g4pSA4pSAIElucHV0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBjb25zdCBvbktleURvd24gPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGNvbnN0IHN0ID0gUy5jdXJyZW50O1xuICAgIGlmICghc3QgfHwgc3QuZGVhZCB8fCBrZXlzLmN1cnJlbnRbZS5rZXldKSByZXR1cm47XG4gICAga2V5cy5jdXJyZW50W2Uua2V5XSA9IHRydWU7XG4gICAgY29uc3QgayA9IGUua2V5O1xuICAgIGlmICgoayA9PT0gXCJBcnJvd0xlZnRcIiB8fCBrID09PSBcImFcIiB8fCBrID09PSBcIkFcIikgJiYgc3QudGFyZ2V0TGFuZSA+IDApIHN0LnRhcmdldExhbmUtLTtlbHNlXG4gICAgaWYgKChrID09PSBcIkFycm93UmlnaHRcIiB8fCBrID09PSBcImRcIiB8fCBrID09PSBcIkRcIikgJiYgc3QudGFyZ2V0TGFuZSA8IDIpIHN0LnRhcmdldExhbmUrKztlbHNlXG4gICAgaWYgKChrID09PSBcIkFycm93VXBcIiB8fCBrID09PSBcIndcIiB8fCBrID09PSBcIldcIiB8fCBrID09PSBcIiBcIikgJiYgIXN0LmlzSnVtcGluZyAmJiBzdC5jYXRZIDw9IDAuMTUpIHtcbiAgICAgIHN0LnZlbFkgPSBKVU1QX1Y7c3QuaXNKdW1waW5nID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKChrID09PSBcIkFycm93RG93blwiIHx8IGsgPT09IFwic1wiIHx8IGsgPT09IFwiU1wiKSAmJiAhc3QuaXNTbGlkaW5nICYmICFzdC5pc0p1bXBpbmcpIHtcbiAgICAgIHN0LmlzU2xpZGluZyA9IHRydWU7c3Quc2xpZGVUID0gNjAwO3N0LmNhdC5zY2FsZS55ID0gMC41MjtcbiAgICB9XG4gICAgaWYgKFtcIkFycm93TGVmdFwiLCBcIkFycm93UmlnaHRcIiwgXCJBcnJvd1VwXCIsIFwiQXJyb3dEb3duXCIsIFwiIFwiXS5pbmNsdWRlcyhrKSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LCBbXSk7XG4gIGNvbnN0IG9uS2V5VXAgPSB1c2VDYWxsYmFjaygoZSkgPT4ge2tleXMuY3VycmVudFtlLmtleV0gPSBmYWxzZTt9LCBbXSk7XG5cbiAgY29uc3Qgb25Ub3VjaFN0YXJ0ID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcbiAgICB0b3VjaC5jdXJyZW50ID0geyBzeDogZS50b3VjaGVzWzBdLmNsaWVudFgsIHN5OiBlLnRvdWNoZXNbMF0uY2xpZW50WSB9O1xuICB9LCBbXSk7XG4gIGNvbnN0IG9uVG91Y2hFbmQgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGNvbnN0IHN0ID0gUy5jdXJyZW50O2lmICghc3QgfHwgc3QuZGVhZCkgcmV0dXJuO1xuICAgIGNvbnN0IGR4ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gdG91Y2guY3VycmVudC5zeDtcbiAgICBjb25zdCBkeSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHRvdWNoLmN1cnJlbnQuc3k7XG4gICAgaWYgKE1hdGguYWJzKGR4KSA+IE1hdGguYWJzKGR5KSkge1xuICAgICAgaWYgKGR4IDwgLTI1ICYmIHN0LnRhcmdldExhbmUgPiAwKSBzdC50YXJnZXRMYW5lLS07ZWxzZVxuICAgICAgaWYgKGR4ID4gMjUgJiYgc3QudGFyZ2V0TGFuZSA8IDIpIHN0LnRhcmdldExhbmUrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGR5IDwgLTI1ICYmICFzdC5pc0p1bXBpbmcgJiYgc3QuY2F0WSA8PSAwLjE1KSB7c3QudmVsWSA9IEpVTVBfVjtzdC5pc0p1bXBpbmcgPSB0cnVlO30gZWxzZVxuICAgICAgaWYgKGR5ID4gMjUgJiYgIXN0LmlzU2xpZGluZyAmJiAhc3QuaXNKdW1waW5nKSB7c3QuaXNTbGlkaW5nID0gdHJ1ZTtzdC5zbGlkZVQgPSA2MDA7c3QuY2F0LnNjYWxlLnkgPSAwLjUyO31cbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblJlc2l6ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBzdCA9IFMuY3VycmVudDtpZiAoIXN0IHx8ICFtb3VudFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgVyA9IG1vdW50UmVmLmN1cnJlbnQuY2xpZW50V2lkdGgsSCA9IG1vdW50UmVmLmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgIHN0LnJlbmRlcmVyLnNldFNpemUoVywgSCk7c3QuY2FtZXJhLmFzcGVjdCA9IFcgLyBIO3N0LmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNQbGF5aW5nIHx8ICFtb3VudFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgYm9vdCgpO1xuICAgIHJhZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgb25SZXNpemUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYuY3VycmVudCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG4gICAgICBjb25zdCBzdCA9IFMuY3VycmVudDtcbiAgICAgIGlmIChzdD8ucmVuZGVyZXIpIHtcbiAgICAgICAgc3QucmVuZGVyZXIuZGlzcG9zZSgpO1xuICAgICAgICBpZiAobW91bnRSZWYuY3VycmVudD8uY29udGFpbnMoc3QucmVuZGVyZXIuZG9tRWxlbWVudCkpXG4gICAgICAgIG1vdW50UmVmLmN1cnJlbnQucmVtb3ZlQ2hpbGQoc3QucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICB9XG4gICAgICBTLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtpc1BsYXlpbmcsIHRoZW1lSWRdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUnVubmVyQ2FudmFzOjc3NTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcmVmPXttb3VudFJlZn0gY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbFwiXG4gICAgb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnR9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmR9XG4gICAgc3R5bGU9e3sgdG91Y2hBY3Rpb246IFwibm9uZVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfSAvPik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9SdW5uZXJDYW52YXMuanN4In0=
