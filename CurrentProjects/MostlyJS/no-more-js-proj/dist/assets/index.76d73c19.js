import {
  Scene as x,
  PerspectiveCamera as b,
  WebGLRenderer as v,
  Mesh as c,
  TorusBufferGeometry as L,
  MeshStandardMaterial as f,
  PointLight as z,
  AmbientLight as M,
  PointLightHelper as P,
  GridHelper as S,
  TextureLoader as j,
  SphereBufferGeometry as u,
  MeshBasicMaterial as k,
  MathUtils as B
} from "https://cdn.skypack.dev/three";
import { OrbitControls as C } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls";
const H = function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) i(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const s of t.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function i(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = r(e);
    fetch(e.href, t);
  }
};
H();
var O = "./assets/spaceImage.c6e4e782.jpg",
  A = "./assets/normal_texture.e86198ef.png",
  E = "./assets/8k_jupiter_texture.0bd844bf.jpg";
function R() {
  const o = new x(),
    n = new b(75, window.innerWidth / window.innerHeight, 0.1, 1e3),
    r = new v({ canvas: document.getElementById("bg") });
  r.setPixelRatio(window.devicePixelRatio),
    r.setSize(window.innerWidth, window.innerHeight),
    (n.position.z = document.body.getBoundingClientRect().top * -0.01 + 30);
  const i = new c(
    new L(10, 3, 16, 100),
    new f({ color: 16737095, wireframe: !1 })
  );
  o.add(i);
  const e = new z(16777215, 0.5);
  e.position.set(5, 5, 5), o.add(e);
  const t = new M(16777215, 0.5);
  o.add(t),
    new P(e),
    new S(200, 50),
    new C(n, r.domElement),
    Array(400).fill().forEach(w);
  const s = new j(),
    p = s.load(O);
  o.background = p;
  const a = new c(new u(), new f({ map: s.load(E), normalMap: s.load(A) }));
  a.scale.set(10, 10, 10),
    (a.position.z = 80),
    (a.position.x = -20),
    o.add(a),
    window.addEventListener("resize", () => {
      console.log("resizing"),
        r.setSize(window.innerWidth, window.innerHeight),
        (n.aspect = window.innerWidth / window.innerHeight),
        n.updateProjectionMatrix();
    }),
    (document.body.onscroll = m);
  function m() {
    const d = document.body.getBoundingClientRect().top;
    (a.rotation.x += 1e-4),
      (a.rotation.y += 0.05),
      (a.rotation.z += 1e-4),
      (n.position.z = d * -0.01 + 30),
      (n.position.x = d * -2e-4),
      (n.position.y = d * -2e-4);
  }
  function w() {
    const d = new c(new u(0.25, 24, 24), new k({ color: 16777215 })),
      [g, h, y] = Array(3)
        .fill()
        .map(() => B.randFloatSpread(200));
    d.position.set(g, h, y), o.add(d);
  }
  function l() {
    (i.rotation.x += 0.01),
      (i.rotation.y += 0.01),
      (i.rotation.z += 0.01),
      r.render(o, n),
      requestAnimationFrame(l);
  }
  l();
}
window.onload = R;
