// Canvas dimensions match the GLB texture atlas (front = left half, back = right half)
const W = 1024;
const H = 1024;

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT  = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

function drawFitted(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  rect: { x: number; y: number; w: number; h: number },
  fit: "cover" | "contain"
) {
  const rx = rect.x * W, ry = rect.y * H;
  const rw = rect.w * W, rh = rect.h * H;
  const pick = fit === "contain" ? Math.min : Math.max;
  const scale = pick(rw / img.width, rh / img.height);
  const dw = img.width * scale, dh = img.height * scale;
  const dx = rx + (rw - dw) / 2, dy = ry + (rh - dh) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.rect(rx, ry, rw, rh);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}

export function drawCardTexture(
  baseImage: HTMLImageElement,
  frontImg: HTMLImageElement | null = null,
  backImg: HTMLImageElement | null = null,
  imageFit: "cover" | "contain" = "cover"
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(baseImage, 0, 0, W, H);

  if (frontImg) {
    drawFitted(ctx, frontImg, FRONT_UV_RECT, imageFit);
  } else {
    drawFront(ctx);
  }

  if (backImg) {
    drawFitted(ctx, backImg, BACK_UV_RECT, imageFit);
  } else {
    drawBack(ctx);
  }

  return canvas;
}

// ── FRONT FACE (left half: 0 → W/2) ──────────────────────────────────────────
function drawFront(ctx: CanvasRenderingContext2D) {
  const x = 0;
  const w = W / 2;
  const h = H * 0.755; // UV rect height

  // Background
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, 0, w, h);
  ctx.clip();

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, 0, w, h);

  // Top accent bar
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(x, 0, w, h * 0.08);

  // Name
  ctx.fillStyle = "#0f0f0f";
  ctx.font = `bold ${w * 0.12}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("DHINESH R", x + w / 2, h * 0.55);

  // Role
  ctx.fillStyle = "#555555";
  ctx.font = `${w * 0.075}px Inter, sans-serif`;
  ctx.fillText("Full Stack Developer", x + w / 2, h * 0.65);

  // ID
  ctx.fillStyle = "#aaaaaa";
  ctx.font = `${w * 0.065}px Inter, sans-serif`;
  ctx.fillText("dhinesh.in", x + w / 2, h * 0.75);

  ctx.restore();
}

// ── BACK FACE (right half: W/2 → W) ─────────────────────────────────────────
function drawBack(ctx: CanvasRenderingContext2D) {
  const x = W / 2;
  const w = W / 2;
  const h = H * 0.757;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, 0, w, h);
  ctx.clip();

  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(x, 0, w, h);

  // Bottom accent bar
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(x, h * 0.92, w, h * 0.08);

  // Label
  ctx.fillStyle = "#0f0f0f";
  ctx.font = `bold ${w * 0.08}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("PORTFOLIO CARD", x + w / 2, h * 0.3);

  ctx.fillStyle = "#777777";
  ctx.font = `${w * 0.065}px Inter, sans-serif`;
  ctx.fillText("dhinesh.in", x + w / 2, h * 0.42);

  ctx.restore();
}
