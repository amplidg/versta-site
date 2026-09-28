/**
 * Gerador procedural de nuvens brancas em estilo aquarela (Canvas 2D).
 *
 * Cada nuvem é desenhada UMA vez, ao carregar, e depois só é deslocada via
 * CSS transform — por isso a animação continua leve no celular.
 *
 * Técnica (imitando aquarela sobre papel):
 *   1. halo branco difuso (a tinta "molhada" que se espalha);
 *   2. várias demãos translúcidas com bordas irregulares e levemente
 *      deslocadas entre si (camadas de aguada);
 *   3. sombreado frio muito sutil na base de cada "bolha" (volume);
 *   4. borda levemente mais marcada (pigmento que acumula ao secar);
 *   5. granulação de papel dentro da forma;
 *   6. brilho no topo.
 *
 * Para trocar por imagens em aquarela no futuro, veja CLOUD_IMAGES em
 * HeroIntro.tsx — este arquivo deixa de ser usado.
 */

type Rng = () => number;

/** PRNG determinístico: a mesma semente gera sempre a mesma nuvem. */
function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Puff = { x: number; y: number; r: number };

/** Proporção largura/altura das nuvens (usada também no CSS). */
export const CLOUD_ASPECT = 2.3;

/* Cores (derivadas do tom "névoa" da paleta, bem claras) */
const SHADE = "150, 176, 190";
const RIM = "118, 146, 164";
const GRAIN = "108, 132, 148";

/* Funciona na thread principal (canvas do DOM) e em Web Worker (OffscreenCanvas) */
type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
type Ctx2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

function makeCanvas(w: number, h: number): AnyCanvas {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function ctx2d(c: AnyCanvas): Ctx2D {
  return (c as OffscreenCanvas).getContext("2d") as Ctx2D;
}

/**
 * Desenha uma máscara desfocada usando o truque de sombra (funciona em
 * todos os navegadores, inclusive onde ctx.filter não existe).
 */
function drawBlurred(
  ctx: Ctx2D,
  mask: AnyCanvas,
  blur: number,
  color: string,
  alpha = 1,
) {
  const shift = mask.width + blur * 4 + 10;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = shift;
  ctx.drawImage(mask, -shift, 0);
  ctx.restore();
}

/**
 * Campo de ruído suave (value noise): uma grade pequena de valores
 * aleatórios ampliada com suavização. Usado para irregularidade de tinta.
 */
function noiseCanvas(W: number, H: number, rng: Rng, cells: number, min: number, max: number, rgb = "255,255,255") {
  const cw = Math.max(2, cells);
  const ch = Math.max(2, Math.round((cells * H) / W));
  const small = makeCanvas(cw, ch);
  const sctx = ctx2d(small);
  const img = sctx.createImageData(cw, ch);
  const [r, g, b] = rgb.split(",").map(Number);
  for (let i = 0; i < cw * ch; i++) {
    img.data[i * 4] = r;
    img.data[i * 4 + 1] = g;
    img.data[i * 4 + 2] = b;
    img.data[i * 4 + 3] = Math.round(255 * (min + (max - min) * rng()));
  }
  sctx.putImageData(img, 0, 0);
  const out = makeCanvas(W, H);
  const o = ctx2d(out);
  o.imageSmoothingEnabled = true;
  o.imageSmoothingQuality = "high";
  o.drawImage(small, 0, 0, W, H);
  return out;
}

/** Bolha com contorno orgânico e franja fina (borda "molhada"). */
function blob(ctx: Ctx2D, p: Puff, rng: Rng, wobble: number) {
  const n = 96;
  const f1 = rng() * Math.PI * 2;
  const f2 = rng() * Math.PI * 2;
  const f3 = rng() * Math.PI * 2;
  const f4 = rng() * Math.PI * 2;
  const amp = wobble * (0.6 + rng() * 0.6);
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const k =
      1 +
      amp *
        (0.5 * Math.sin(2 * t + f1) +
          0.28 * Math.sin(5 * t + f2) +
          0.14 * Math.sin(13 * t + f3) +
          0.08 * Math.sin(29 * t + f4));
    const x = p.x + Math.cos(t) * p.r * k;
    const y = p.y + Math.sin(t) * p.r * k * 0.9;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

/** Distribui as bolhas no formato de uma nuvem cúmulo (topo em domo, base achatada). */
function makePuffs(W: number, H: number, rng: Rng): Puff[] {
  const pad = W * 0.06;
  const w = W - pad * 2;
  const h = H - pad * 2;
  const base = pad + h * 0.74;
  const list: Puff[] = [];

  const top = 13 + Math.floor(rng() * 6);
  for (let i = 0; i < top; i++) {
    const u = Math.min(0.97, Math.max(0.03, (i + 0.5) / top + (rng() - 0.5) * 0.07));
    const dome = Math.pow(Math.sin(Math.PI * u), 0.85);
    const r = h * (0.1 + 0.16 * dome * (0.7 + 0.6 * rng()));
    list.push({
      x: pad + w * u,
      y: base - dome * h * 0.3 - r * 0.2 + (rng() - 0.5) * h * 0.06,
      r,
    });
  }
  // base: poucas bolhas largas e sobrepostas (depois esmaecida no desenho)
  for (let i = 0; i < 5; i++) {
    const u = 0.14 + (0.72 * i) / 4 + (rng() - 0.5) * 0.05;
    const r = h * (0.16 + 0.05 * rng());
    list.push({ x: pad + w * u, y: base - r * 0.35, r });
  }
  // preenchimento interno
  for (let i = 0; i < 7; i++) {
    list.push({
      x: pad + w * (0.2 + 0.6 * rng()),
      y: base - h * 0.18 * rng(),
      r: h * (0.15 + 0.08 * rng()),
    });
  }
  return list;
}

export function drawCloud(canvas: AnyCanvas, seed: number) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = ctx2d(canvas);
  if (!ctx || !W || !H) return;
  const rng = mulberry32(seed);
  const S = W / 1000; // escala para blur/tamanhos
  const puffs = makePuffs(W, H, rng);

  // Máscara base da forma
  const mask = makeCanvas(W, H);
  const m = ctx2d(mask);
  m.fillStyle = "#fff";
  puffs.forEach((p) => blob(m, p, rng, 0.13));

  // Máscara suave (para recortar sombreado, granulação e brilho)
  const soft = makeCanvas(W, H);
  drawBlurred(ctx2d(soft), mask, 8 * S, "#fff");

  // A nuvem é composta aqui e só no fim vai para o canvas visível
  const art = makeCanvas(W, H);
  const a = ctx2d(art);

  // 1. Halo difuso (a água que espalha a tinta)
  drawBlurred(a, mask, 30 * S, "rgba(255,255,255,1)", 0.38);

  // 2. Demãos translúcidas levemente deslocadas (aguadas sobrepostas)
  const layer = makeCanvas(W, H);
  const lc = ctx2d(layer);
  for (let l = 0; l < 3; l++) {
    lc.clearRect(0, 0, W, H);
    lc.fillStyle = "#fff";
    puffs.forEach((p) =>
      blob(
        lc,
        {
          x: p.x + (rng() - 0.5) * p.r * 0.22,
          y: p.y + (rng() - 0.5) * p.r * 0.16,
          r: p.r * (0.82 + rng() * 0.2),
        },
        rng,
        0.2,
      ),
    );
    drawBlurred(a, layer, (1.2 + l * 2.2) * S, "#fff", 0.36);
  }
  drawBlurred(a, mask, 2.5 * S, "#fff", 0.4);

  // 3. Sombra fria em manchas irregulares (não bolha por bolha)
  const shade = makeCanvas(W, H);
  const sc = ctx2d(shade);
  const grad = sc.createLinearGradient(0, H * 0.25, 0, H * 0.95);
  grad.addColorStop(0, `rgba(${SHADE}, 0)`);
  grad.addColorStop(1, `rgba(${SHADE}, 0.38)`);
  sc.fillStyle = grad;
  sc.fillRect(0, 0, W, H);
  sc.drawImage(noiseCanvas(W, H, rng, 9, 0, 0.3, SHADE), 0, 0);
  sc.globalCompositeOperation = "destination-in";
  sc.drawImage(soft, 0, 0);
  a.globalAlpha = 0.5;
  a.drawImage(shade, 0, 0);
  a.globalAlpha = 1;

  // 4. Linha de pigmento fina e descontínua no contorno (aquarela secando)
  const rim = makeCanvas(W, H);
  const rc = ctx2d(rim);
  rc.drawImage(mask, 0, 0);
  rc.globalCompositeOperation = "destination-out";
  drawBlurred(rc, mask, 5 * S, "#000", 1);
  rc.globalCompositeOperation = "destination-in";
  rc.drawImage(noiseCanvas(W, H, rng, 22, 0, 1), 0, 0);
  rc.globalCompositeOperation = "source-in";
  rc.fillStyle = `rgb(${RIM})`;
  rc.fillRect(0, 0, W, H);
  drawBlurred(a, rim, 1 * S, `rgb(${RIM})`, 0.3);

  // 5. Granulação de papel
  const grain = makeCanvas(W, H);
  const gc = ctx2d(grain);
  const dots = Math.round((W * H) / 150);
  for (let i = 0; i < dots; i++) {
    const al = 0.05 + rng() * 0.14;
    gc.fillStyle = rng() > 0.35 ? `rgba(${GRAIN}, ${al})` : `rgba(255,255,255,${al * 2})`;
    const s = (0.6 + rng() * 1.2) * Math.max(1, S);
    gc.fillRect(rng() * W, rng() * H, s, s);
  }
  gc.globalCompositeOperation = "destination-in";
  gc.drawImage(soft, 0, 0);
  a.globalAlpha = 0.55;
  a.drawImage(grain, 0, 0);
  a.globalAlpha = 1;

  // 6. Brilho no topo
  const hi = makeCanvas(W, H);
  const hc = ctx2d(hi);
  const hg = hc.createLinearGradient(0, 0, 0, H * 0.65);
  hg.addColorStop(0, "rgba(255,255,255,0.75)");
  hg.addColorStop(1, "rgba(255,255,255,0)");
  hc.fillStyle = hg;
  hc.fillRect(0, 0, W, H);
  hc.globalCompositeOperation = "destination-in";
  hc.drawImage(soft, 0, 0);
  a.drawImage(hi, 0, 0);

  // 7. Aguada irregular: transparência varia em manchas (duas escalas)
  a.globalCompositeOperation = "destination-in";
  a.drawImage(noiseCanvas(W, H, rng, 7, 0.62, 1), 0, 0);
  a.drawImage(noiseCanvas(W, H, rng, 26, 0.78, 1), 0, 0);

  // 8. Base que se desfaz suavemente
  a.globalCompositeOperation = "destination-out";
  const fade = a.createLinearGradient(0, H * 0.62, 0, H * 0.92);
  fade.addColorStop(0, "rgba(0,0,0,0)");
  fade.addColorStop(1, "rgba(0,0,0,0.85)");
  a.fillStyle = fade;
  a.fillRect(0, 0, W, H);
  a.globalCompositeOperation = "source-over";

  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(art, 0, 0);
}
