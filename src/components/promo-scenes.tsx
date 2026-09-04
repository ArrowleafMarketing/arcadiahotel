import Image from "next/image";
import type { PromoBackdrop as PromoBackdropSpec } from "@/lib/promos";

/* Backdrops for the exit-intent showing of the promo popup.

   A campaign either supplies a photo or falls back to a drawn scene. The drawn
   scenes are pure CSS/SVG — nothing to license and nothing extra to download —
   and every SVG scales uniformly off its own width, so the artwork never skews
   on narrow screens. Either way the backdrop is blurred and dimmed so the
   off-white card stays the focal point. */

export function PromoBackdrop({ backdrop }: { backdrop: PromoBackdropSpec }) {
  if (backdrop.kind === "photo") {
    return <PhotoScene src={backdrop.src} />;
  }
  return backdrop.scene === "street" ? <StreetScene /> : <ParkScene />;
}

/* The photo is decoration behind a dialog that carries its own text, so it's
   hidden from assistive tech rather than announced. Scaled up slightly so the
   blur doesn't bleed a soft edge in from the sides. */
function PhotoScene({ src }: { src: string }) {
  return (
    <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* The photo isn't fetched until the popup opens, so hold a shade taken
          from its own shadows underneath. A visitor on a slow connection sees
          dim green park rather than a flash of near-black. */}
      <span className="absolute inset-0 bg-[#3d4a2e]" />

      {/* The source is capped at 1200px wide and blurred on top of that, so
          there's nothing to gain from Next requesting larger variants. */}
      <Image
        src={src}
        alt=""
        fill
        sizes="1200px"
        className="scale-110 object-cover blur-[3px]"
      />
      <span className="absolute inset-0 bg-[#14261c]/55" />
    </span>
  );
}

/* ---------- Shared ---------- */

type Light = {
  left: string;
  top: string;
  size: number;
  color: string;
  opacity: number;
};

function Bokeh({ lights }: { lights: readonly Light[] }) {
  return (
    <>
      {lights.map((light, index) => (
        <span
          key={index}
          className="promo-bokeh absolute rounded-full"
          style={{
            left: light.left,
            top: light.top,
            width: light.size,
            height: light.size,
            marginLeft: -light.size / 2,
            marginTop: -light.size / 2,
            background: `radial-gradient(circle, ${light.color} 0%, transparent 70%)`,
            opacity: light.opacity,
            filter: "blur(14px)",
            animationDelay: `${index * 0.7}s`,
          }}
        />
      ))}
    </>
  );
}

/** y = apex + drop * sin(pi * t): a symmetric sag across the span. */
function sagPath(y: number, drop: number) {
  return (t: number) => y + drop * Math.sin(Math.PI * t);
}

function wireFrom(sag: (t: number) => number) {
  return Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    return `${i === 0 ? "M" : "L"}${t * 1000} ${sag(t)}`;
  }).join(" ");
}

/* ---------- Art in the Park: a sunlit lawn of artist tents ---------- */

const PARK_BOKEH: readonly Light[] = [
  { left: "8%", top: "18%", size: 120, color: "#cfe0a8", opacity: 0.7 },
  { left: "22%", top: "62%", size: 90, color: "#e8d48a", opacity: 0.6 },
  { left: "34%", top: "12%", size: 70, color: "#f2e6bb", opacity: 0.65 },
  { left: "48%", top: "78%", size: 140, color: "#a8bf70", opacity: 0.5 },
  { left: "61%", top: "26%", size: 100, color: "#bfd9bd", opacity: 0.6 },
  { left: "74%", top: "68%", size: 80, color: "#e8b07a", opacity: 0.5 },
  { left: "86%", top: "34%", size: 130, color: "#cfe0a8", opacity: 0.65 },
  { left: "14%", top: "88%", size: 95, color: "#e8d48a", opacity: 0.45 },
  { left: "92%", top: "82%", size: 75, color: "#a8bf70", opacity: 0.5 },
  { left: "56%", top: "48%", size: 60, color: "#f2e6bb", opacity: 0.45 },
];

function ParkScene() {
  return (
    <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <span className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_100%,#8a9a4a_0%,#47552a_38%,#1b2411_100%)]" />
      <TentRow />
      <Bunting />
      <Bokeh lights={PARK_BOKEH} />
    </span>
  );
}

const TENTS = [
  { x: 90, w: 105, h: 74, opacity: 0.34 },
  { x: 295, w: 128, h: 92, opacity: 0.44 },
  { x: 500, w: 112, h: 80, opacity: 0.38 },
  { x: 705, w: 132, h: 95, opacity: 0.44 },
  { x: 910, w: 108, h: 74, opacity: 0.34 },
] as const;

function TentRow() {
  const base = 150;

  return (
    <svg
      viewBox="0 0 1000 220"
      className="absolute inset-x-0 bottom-0 w-full blur-[2px]"
      fill="none"
    >
      {TENTS.map((tent, index) => (
        <g key={index} opacity={tent.opacity}>
          <path
            d={`M${tent.x - tent.w} ${base} L${tent.x} ${base - tent.h} L${tent.x + tent.w} ${base} Z`}
            fill="#f3f1e6"
          />
          <line x1={tent.x - tent.w} y1={base} x2={tent.x - tent.w} y2="220" stroke="#f3f1e6" strokeWidth="2.5" />
          <line x1={tent.x + tent.w} y1={base} x2={tent.x + tent.w} y2="220" stroke="#f3f1e6" strokeWidth="2.5" />
        </g>
      ))}
    </svg>
  );
}

const PENNANT_COLORS = ["#f2e6bb", "#bfd9bd", "#e8b07a", "#cfe0a8"];

function Bunting() {
  const swags = [
    { drop: 44, y: 20, opacity: 0.85, count: 17, size: 20 },
    { drop: 32, y: 66, opacity: 0.45, count: 13, size: 15 },
  ];

  return (
    <svg
      viewBox="0 0 1000 200"
      className="absolute inset-x-0 top-0 w-full blur-[1.5px]"
      fill="none"
    >
      {swags.map((swag, swagIndex) => {
        const sag = sagPath(swag.y, swag.drop);
        return (
          <g key={swagIndex} opacity={swag.opacity}>
            <path d={wireFrom(sag)} stroke="#f3f1e6" strokeWidth="1.2" opacity="0.5" />
            {Array.from({ length: swag.count }, (_, i) => {
              const t = (i + 0.5) / swag.count;
              const x = t * 1000;
              const y = sag(t);
              const half = swag.size / 2;
              return (
                <path
                  key={i}
                  d={`M${x - half} ${y} L${x + half} ${y} L${x} ${y + swag.size * 1.35} Z`}
                  fill={PENNANT_COLORS[i % PENNANT_COLORS.length]}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Hyde Park Street Fair: a tree-lined street at dusk ---------- */

const STREET_BOKEH: readonly Light[] = [
  { left: "9%", top: "20%", size: 120, color: "#ffc978", opacity: 0.7 },
  { left: "24%", top: "64%", size: 90, color: "#ff9e6b", opacity: 0.55 },
  { left: "36%", top: "14%", size: 70, color: "#ffe4b0", opacity: 0.6 },
  { left: "50%", top: "80%", size: 140, color: "#e2857a", opacity: 0.45 },
  { left: "63%", top: "28%", size: 100, color: "#ffc978", opacity: 0.6 },
  { left: "76%", top: "70%", size: 80, color: "#bfd9bd", opacity: 0.4 },
  { left: "88%", top: "36%", size: 130, color: "#ffd9a0", opacity: 0.6 },
  { left: "16%", top: "88%", size: 95, color: "#ff9e6b", opacity: 0.4 },
  { left: "93%", top: "84%", size: 75, color: "#ffc978", opacity: 0.45 },
  { left: "58%", top: "50%", size: 60, color: "#ffe4b0", opacity: 0.45 },
];

function StreetScene() {
  return (
    <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <span className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_100%,#5b4a6e_0%,#2b2a48_38%,#12121f_100%)]" />
      <TreeCanopy />
      <AwningRow />
      <StringLights />
      <Bokeh lights={STREET_BOKEH} />
    </span>
  );
}

/* The elms Hyde Park is known for — dark masses closing in the top corners. */
function TreeCanopy() {
  return (
    <span aria-hidden="true">
      <span className="absolute -left-[10%] -top-[18%] h-[52%] w-[46%] rounded-full bg-[#14261c] opacity-70 blur-[26px]" />
      <span className="absolute -right-[12%] -top-[22%] h-[56%] w-[48%] rounded-full bg-[#14261c] opacity-70 blur-[26px]" />
    </span>
  );
}

const STALLS = [
  { x: 105, w: 96, h: 62, a: "#e8d3b4", b: "#c8746a" },
  { x: 320, w: 112, h: 74, a: "#f0e2c6", b: "#6f8fa8" },
  { x: 540, w: 100, h: 66, a: "#e8d3b4", b: "#8fa86f" },
  { x: 760, w: 116, h: 76, a: "#f0e2c6", b: "#c8746a" },
  { x: 950, w: 92, h: 60, a: "#e8d3b4", b: "#6f8fa8" },
] as const;

/** Striped vendor awnings. The stripes are the canopy, so no clip path. */
function AwningRow() {
  const base = 150;
  const stripes = 8;

  return (
    <svg
      viewBox="0 0 1000 220"
      className="absolute inset-x-0 bottom-0 w-full blur-[2px]"
      fill="none"
    >
      {STALLS.map((stall, index) => {
        const left = stall.x - stall.w;
        const width = (stall.w * 2) / stripes;
        const top = base - stall.h;

        return (
          <g key={index} opacity="0.42">
            {Array.from({ length: stripes }, (_, i) => (
              <rect
                key={i}
                x={left + i * width}
                y={top}
                width={width}
                height={stall.h}
                fill={i % 2 === 0 ? stall.a : stall.b}
              />
            ))}
            {/* Scalloped valance along the awning's lower edge. */}
            {Array.from({ length: stripes }, (_, i) => (
              <circle
                key={`s${i}`}
                cx={left + i * width + width / 2}
                cy={base}
                r={width / 2}
                fill={i % 2 === 0 ? stall.a : stall.b}
              />
            ))}
            <line x1={left} y1={base} x2={left} y2="220" stroke="#e8d3b4" strokeWidth="2.5" />
            <line x1={stall.x + stall.w} y1={base} x2={stall.x + stall.w} y2="220" stroke="#e8d3b4" strokeWidth="2.5" />
          </g>
        );
      })}
    </svg>
  );
}

/** Cafe bulbs strung across the street. */
function StringLights() {
  const swags = [
    { drop: 46, y: 18, opacity: 0.85, bulbs: 22, radius: 2.6 },
    { drop: 34, y: 62, opacity: 0.45, bulbs: 16, radius: 2 },
  ];

  return (
    <svg
      viewBox="0 0 1000 200"
      className="absolute inset-x-0 top-0 w-full blur-[1.5px]"
      fill="none"
    >
      {swags.map((swag, swagIndex) => {
        const sag = sagPath(swag.y, swag.drop);
        return (
          <g key={swagIndex} opacity={swag.opacity}>
            <path d={wireFrom(sag)} stroke="#ffd9a0" strokeWidth="1" opacity="0.5" />
            {Array.from({ length: swag.bulbs }, (_, i) => {
              const t = (i + 0.5) / swag.bulbs;
              return (
                <circle
                  key={i}
                  cx={t * 1000}
                  cy={sag(t)}
                  r={swag.radius}
                  fill={i % 3 === 0 ? "#ffc978" : "#ffe4b0"}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
