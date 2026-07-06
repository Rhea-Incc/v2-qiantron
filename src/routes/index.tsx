import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/products.functions";
import type { Product } from "@/lib/products.data";

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => getProducts(),
});
import {
  ArrowRight,
  ArrowUpRight,
  Ship,
  Truck,
  ShieldCheck,
  Anchor,
  Search,
  Wrench,
  Package,
  MapPin,
  Zap,
  Activity,
  Layers,
  Globe2,
  Boxes,
  ChevronRight,
  CircleDot,
} from "lucide-react";

import logoAsset from "@/assets/logo.png.asset.json";
import wordmarkAsset from "@/assets/wordmark.png.asset.json";
import volvoImg from "@/assets/volvo-excavators.jpg.asset.json";
import wheelLoaderImg from "@/assets/wheel-loader.jpg.asset.json";
import trackDrillImg from "@/assets/track-drill.jpg.asset.json";
import telehandlerImg from "@/assets/telehandler.jpg.asset.json";
import mobileCraneImg from "@/assets/mobile-crane.jpg.asset.json";
import craneMobileImg from "@/assets/crane-mobile.jpg.asset.json";
import factoryImg from "@/assets/factory-line.jpg.asset.json";
import dozerImg from "@/assets/cat-dozer.jpg.asset.json";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  head: () => ({
    meta: [
      { title: "QianTron — Premium Machinery. Seamless Logistics. Delivered." },
      {
        name: "description",
        content:
          "From global sourcing to final delivery, QianTron orchestrates every stage of your machinery acquisition — sourcing, inspection, RoRo shipping, customs, and inland transport.",
      },
      { property: "og:title", content: "QianTron — Engineering Trust. Delivering Power." },
      {
        property: "og:description",
        content:
          "Premium construction machinery sourcing, RoRo shipping, customs clearance, and door-to-door delivery across Africa and beyond.",
      },
      { property: "og:image", content: dozerImg.url },
      { property: "twitter:image", content: dozerImg.url },
    ],
  }),
  component: Landing,
});

/* ---------------- helpers ---------------- */

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-eyebrow">
      <span className="text-dragon">{index}</span>
      <span className="h-px w-8 bg-line" />
      <span>{label}</span>
    </div>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-line" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="QianTron dragon and gear emblem" className="h-8 w-8 object-contain" />
          <span className="text-display text-lg font-semibold tracking-tight">
            Qian<span className="text-dragon">Tron</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Difference", "#difference"],
            ["Fleet", "#fleet"],
            ["Logistics", "#logistics"],
            ["Platform", "#platform"],
            ["Ecosystem", "#ecosystem"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-dragon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#login"
            className="hidden text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground md:inline-flex"
          >
            Client Login
          </a>
          <a
            href="#fleet"
            className="group inline-flex items-center gap-2 rounded-full bg-dragon px-4 py-2 text-[13px] font-semibold text-white shadow-dragon transition-all hover:brightness-110"
          >
            Explore Equipment
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-dvh overflow-hidden bg-grad-hero grain">
      {/* animated engineering grid */}
      <div className="absolute inset-0 opacity-70">
        <div className="engineered-grid grid-drift absolute -inset-[200px]" />
      </div>
      {/* radial dragon glow */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -right-40 top-20 h-[680px] w-[680px] rounded-full opacity-40 blur-3xl"
      >
        <div className="h-full w-full bg-grad-dragon" />
      </motion.div>

      {/* route lines SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-red" x1="0" x2="1">
            <stop offset="0%" stopColor="#B71C1C" stopOpacity="0" />
            <stop offset="50%" stopColor="#B71C1C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D6A800" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-40 720 C 320 620, 520 780, 780 640 S 1200 520, 1520 600" stroke="url(#line-red)" strokeWidth="1.2" fill="none" className="dash-flow" />
        <path d="M-40 820 C 260 780, 640 860, 900 760 S 1300 700, 1520 740" stroke="url(#line-red)" strokeWidth="1" fill="none" className="dash-flow" style={{ animationDelay: "-2s" }} />
      </svg>

      <Nav />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-dvh max-w-[1400px] flex-col justify-center px-6 pt-32 pb-16 md:px-10"
      >
        <Reveal>
          <SectionTag index="01" label="Global Machinery Orchestration" />
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-display text-[42px] leading-[1] sm:text-6xl md:text-7xl lg:text-[104px]">
            Premium Machinery.
            <br />
            <span className="text-foreground/70">Seamless Logistics.</span>
            <br />
            <span className="bg-grad-dragon bg-clip-text text-transparent">Delivered.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-xl text-base text-foreground/70 md:text-lg">
            From global sourcing to final delivery, QianTron manages every stage of your machinery
            acquisition journey — engineered end-to-end with the precision of the industries we serve.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#fleet"
              className="group inline-flex items-center gap-2 rounded-full bg-dragon px-6 py-3.5 text-sm font-semibold text-white shadow-dragon transition-all hover:brightness-110"
            >
              Explore Equipment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-3.5 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:bg-surface"
            >
              Client Login
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-16 max-w-3xl">
            <p className="text-eyebrow">Trusted by</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] uppercase tracking-widest text-foreground/50">
              <span>Contractors</span>
              <span className="text-dragon">·</span>
              <span>Miners</span>
              <span className="text-dragon">·</span>
              <span>Infrastructure Developers</span>
              <span className="text-dragon">·</span>
              <span>Fleet Operators</span>
            </div>
          </div>
        </Reveal>

        {/* HUD stats */}
        <Reveal delay={0.7}>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              ["42", "Countries served"],
              ["9", "Origin markets"],
              ["1.2K+", "Units delivered"],
              ["99.4%", "On-time clearance"],
            ].map(([k, v]) => (
              <div key={v} className="bg-background/70 p-5 backdrop-blur-sm">
                <div className="text-display text-3xl text-foreground md:text-4xl">{k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-foreground/50">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-eyebrow opacity-70">
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-line to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 02 — Difference (timeline) ---------------- */

const journey = [
  { n: "01", t: "Source", d: "Direct partnerships with tier-1 Chinese, Japanese and European OEMs.", Icon: Search },
  { n: "02", t: "Inspect", d: "Multi-point technical inspection & pre-shipment quality assurance.", Icon: ShieldCheck },
  { n: "03", t: "Ship", d: "RoRo and container freight across global corridors.", Icon: Ship },
  { n: "04", t: "Clear", d: "Bonded customs handling and documentation, in-country.", Icon: Anchor },
  { n: "05", t: "Transport", d: "Inland lowbed and prime-mover convoys to destination.", Icon: Truck },
  { n: "06", t: "Deliver", d: "Commissioning, handover and operational readiness.", Icon: Package },
];

function Difference() {
  return (
    <section id="difference" className="relative border-y border-line bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <SectionTag index="02" label="The QianTron Difference" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-display text-4xl md:text-6xl">
            One partner.
            <br />
            <span className="text-foreground/60">Six coordinated stages.</span>
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 md:gap-4">
            {journey.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group relative">
                  <div className="flex items-center justify-between">
                    <div className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full border border-line bg-surface transition-all duration-500 group-hover:border-dragon group-hover:shadow-dragon">
                      <s.Icon className="h-6 w-6 text-foreground/80 transition-colors group-hover:text-dragon" />
                    </div>
                  </div>
                  <div className="mt-5 text-eyebrow text-dragon">{s.n}</div>
                  <div className="mt-1 text-display text-2xl">{s.t}</div>
                  <p className="mt-2 text-sm text-foreground/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 03 — Fleet ---------------- */

const fleet = [
  { name: "Excavators", spec: "20T — 90T", origin: "JP · CN", img: volvoImg.url, tag: "Earthmoving" },
  { name: "Wheel Loaders", spec: "3m³ — 6m³", origin: "JP", img: wheelLoaderImg.url, tag: "Material handling" },
  { name: "Bulldozers", spec: "D6 — D11", origin: "USA · CN", img: dozerImg.url, tag: "Grading" },
  { name: "Mining Equipment", spec: "Drill & haul", origin: "USA · SE", img: trackDrillImg.url, tag: "Extraction" },
  { name: "Telehandlers & Forklifts", spec: "3T — 20T", origin: "UK · CN", img: telehandlerImg.url, tag: "Sitework" },
  { name: "Cranes", spec: "25T — 750T", origin: "DE · CN", img: craneMobileImg.url, tag: "Lifting" },
  { name: "Mobile Cranes", spec: "Rough terrain", origin: "IN · JP", img: mobileCraneImg.url, tag: "Field lift" },
  { name: "Prime Movers · Tippers · Haulage", spec: "6x4 · 8x4", origin: "CN · DE", img: factoryImg.url, tag: "Fleet" },
];

function Fleet() {
  return (
    <section id="fleet" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionTag index="03" label="Premium Equipment Portfolio" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-2xl text-display text-4xl md:text-6xl">
                A fleet engineered
                <br />
                <span className="text-foreground/60">for the world's toughest work.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a href="#logistics" className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground">
              View all categories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6 md:gap-5">
          {fleet.map((f, i) => (
            <Reveal
              key={f.name}
              delay={(i % 3) * 0.08}
              className={
                i === 0
                  ? "md:col-span-4"
                  : i === 1
                    ? "md:col-span-2"
                    : i === 2
                      ? "md:col-span-2"
                      : i === 3
                        ? "md:col-span-4"
                        : i === 4
                          ? "md:col-span-3"
                          : i === 5
                            ? "md:col-span-3"
                            : i === 6
                              ? "md:col-span-2"
                              : "md:col-span-4"
              }
            >
              <FleetCard {...f} large={i === 0 || i === 3} />
            </Reveal>
          ))}
        </div>

        {/* Marquee of extra categories */}
        <div className="mt-16 overflow-hidden border-y border-line py-6">
          <div className="marquee flex w-max items-center gap-12 text-eyebrow text-foreground/50">
            {[
              "Excavators", "Wheel Loaders", "Bulldozers", "Forklifts", "Motor Graders",
              "Cranes", "Mining Equipment", "Prime Movers", "Haulage Trucks", "Tippers",
              "Excavators", "Wheel Loaders", "Bulldozers", "Forklifts", "Motor Graders",
              "Cranes", "Mining Equipment", "Prime Movers", "Haulage Trucks", "Tippers",
            ].map((t, i) => (
              <span key={i} className="flex items-center gap-12">
                {t} <span className="text-dragon">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetCard({
  name, spec, origin, img, tag, large,
}: { name: string; spec: string; origin: string; img: string; tag: string; large?: boolean }) {
  return (
    <div
      className={`group relative isolate overflow-hidden rounded-2xl border border-line bg-surface ${
        large ? "aspect-[16/10]" : "aspect-[4/5]"
      }`}
    >
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="engineered-grid absolute inset-0 opacity-30" />
      </div>

      {/* top tag */}
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md">
        <CircleDot className="h-3 w-3 text-dragon" /> {tag}
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="text-display text-2xl text-white md:text-3xl">{name}</div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] uppercase tracking-widest text-white/60">
            <div>
              <div className="text-white/40">Range</div>
              <div className="mt-0.5 text-white/90">{spec}</div>
            </div>
            <div>
              <div className="text-white/40">Origin</div>
              <div className="mt-0.5 text-white/90">{origin}</div>
            </div>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur-md transition-all group-hover:bg-dragon">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Section 04 — Global Logistics ---------------- */

function LogisticsMap() {
  const nodes = [
    { id: "cn", x: 78, y: 38, label: "China" },
    { id: "jp", x: 86, y: 40, label: "Japan" },
    { id: "eu", x: 48, y: 30, label: "Europe" },
    { id: "me", x: 58, y: 46, label: "Middle East" },
    { id: "af-w", x: 44, y: 60, label: "West Africa" },
    { id: "af-e", x: 56, y: 65, label: "East Africa" },
    { id: "af-s", x: 52, y: 78, label: "Southern Africa" },
  ];
  const routes: [string, string][] = [
    ["cn", "me"], ["jp", "me"], ["eu", "af-w"],
    ["me", "af-e"], ["af-e", "af-s"], ["af-w", "af-s"],
    ["cn", "af-e"],
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-elev">
      <div className="engineered-grid absolute inset-0 opacity-40" />
      {/* stylized continents (abstract blobs) */}
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="cont" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.28 0.006 25)" />
            <stop offset="100%" stopColor="oklch(0.18 0.006 25)" />
          </linearGradient>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="#B71C1C" />
            <stop offset="100%" stopColor="#D6A800" />
          </linearGradient>
        </defs>
        {/* abstract continent silhouettes */}
        <path fill="url(#cont)" d="M8,18 Q14,10 24,12 T44,14 Q52,16 52,22 T40,30 Q28,34 20,30 T8,26 Z" />
        <path fill="url(#cont)" d="M42,28 Q50,26 56,30 T64,44 Q60,54 52,54 T40,46 Q38,38 42,28 Z" />
        <path fill="url(#cont)" d="M62,10 Q78,8 88,14 T96,26 Q92,32 84,30 T70,26 Q64,20 62,10 Z" />
        <path fill="url(#cont)" d="M70,34 Q80,32 88,36 T92,44 Q86,50 78,48 T70,42 Z" />
      </svg>

      {/* routes */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {routes.map(([a, b], i) => {
          const A = byId[a], B = byId[b];
          const midX = (A.x + B.x) / 2;
          const midY = Math.min(A.y, B.y) - 8;
          return (
            <g key={i}>
              <path
                d={`M ${A.x} ${A.y} Q ${midX} ${midY} ${B.x} ${B.y}`}
                stroke="url(#route)"
                strokeWidth="0.35"
                fill="none"
                className="dash-flow"
                style={{ animationDelay: `-${i * 0.6}s` }}
              />
            </g>
          );
        })}
      </svg>

      {/* nodes */}
      {nodes.map(n => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="relative">
            <span className="pulse-dot absolute inset-0 -m-2 rounded-full bg-dragon/40" />
            <span className="relative block h-2.5 w-2.5 rounded-full bg-dragon shadow-dragon" />
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-white/70">
            {n.label}
          </div>
        </div>
      ))}

      {/* HUD overlay */}
      <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-widest text-white/60 backdrop-blur-md">
        <span className="text-dragon">●</span> Live corridor · RoRo + Container
      </div>
      <div className="absolute bottom-5 right-5 grid grid-cols-3 gap-4 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/80 backdrop-blur-md">
        {[
          ["12", "Vessels"],
          ["48", "Ports"],
          ["6", "Regions"],
        ].map(([k, v]) => (
          <div key={v} className="text-center">
            <div className="text-display text-lg">{k}</div>
            <div className="text-[9px] uppercase tracking-widest text-white/50">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Logistics() {
  return (
    <section id="logistics" className="relative border-y border-line bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <SectionTag index="04" label="Global Logistics Intelligence" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-display text-4xl md:text-5xl">
                Corridors from
                <br />
                <span className="bg-grad-dragon bg-clip-text text-transparent">origin to site.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-foreground/70">
                We orchestrate the full ocean-to-inland chain across China, Japan, Europe, the Middle
                East and Africa — one operations layer, one accountable partner.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 grid gap-3">
                {[
                  ["RoRo Shipping", Ship],
                  ["Port Clearance", Anchor],
                  ["Freight Forwarding", Globe2],
                  ["Inland Trucking", Truck],
                  ["Final Delivery", MapPin],
                ].map(([label, Icon]: any) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-line bg-surface/50 px-4 py-3 backdrop-blur-sm transition-all hover:border-dragon/50 hover:bg-surface"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-dragon" />
                      <span className="text-sm">{label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-foreground/40" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.15}><LogisticsMap /></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 05 — Dashboard preview ---------------- */

function Dashboard() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal><SectionTag index="05" label="Client Ecosystem" /></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-display text-4xl md:text-6xl">
                Track your machinery
                <br />
                <span className="text-foreground/60">from factory to site.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-foreground/70">
                A unified client portal for live shipment tracking, document control, procurement,
                customs and commissioning — engineered for teams that move nine-figure fleets.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Live shipment tracking", Ship],
                  ["Document management", Layers],
                  ["Equipment orders", Boxes],
                  ["Shipping milestones", Activity],
                  ["ETA monitoring", Zap],
                  ["Customs status", ShieldCheck],
                  ["Delivery status", Truck],
                  ["Project management", Wrench],
                ].map(([l, Ic]: any) => (
                  <div key={l} className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 px-3 py-3 text-sm text-foreground/80">
                    <Ic className="h-4 w-4 text-dragon" /> {l}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.25} className="mt-16">
          <DashboardMock />
        </Reveal>
      </div>
    </section>
  );
}

function DashboardMock() {
  const shipments = [
    { id: "QT-8842", unit: "CAT 336 Excavator", from: "Shanghai", to: "Mombasa", pct: 78, status: "At Sea", eta: "Nov 08" },
    { id: "QT-8817", unit: "Komatsu WA470 Loader", from: "Yokohama", to: "Dar es Salaam", pct: 42, status: "Loaded", eta: "Nov 22" },
    { id: "QT-8791", unit: "Liebherr LTM 1090", from: "Hamburg", to: "Lagos", pct: 96, status: "In Clearance", eta: "Nov 02" },
    { id: "QT-8770", unit: "JCB 555 Telehandler", from: "Ningbo", to: "Djibouti", pct: 20, status: "Origin QA", eta: "Dec 04" },
  ];

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface to-background p-6 shadow-elev md:p-8">
      <div className="engineered-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-dragon/10 blur-3xl" />

      {/* window chrome */}
      <div className="relative flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          </div>
          <div className="ml-4 text-[11px] uppercase tracking-widest text-foreground/50">
            portal.qiantron.com / fleet / shipments
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-foreground/70 md:flex">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live sync
        </div>
      </div>

      {/* KPI row */}
      <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["In transit", "23", "+4"],
          ["At origin", "11", "+2"],
          ["In clearance", "6", "-1"],
          ["Delivered (MTD)", "48", "+12"],
        ].map(([l, v, d]) => (
          <div key={l} className="rounded-xl border border-line bg-background/60 p-4 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-widest text-foreground/50">{l}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-display text-3xl">{v}</div>
              <div className={`text-[11px] ${d.startsWith("-") ? "text-dragon" : "text-emerald-400"}`}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* shipments table */}
      <div className="relative mt-6 overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-[90px_1fr_120px_100px] gap-4 border-b border-line bg-surface/60 px-4 py-3 text-[10px] uppercase tracking-widest text-foreground/50 md:grid-cols-[100px_1fr_140px_180px_100px]">
          <div>Order</div>
          <div>Equipment · Route</div>
          <div className="hidden md:block">Status</div>
          <div>Progress</div>
          <div className="text-right">ETA</div>
        </div>
        {shipments.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-[90px_1fr_120px_100px] items-center gap-4 border-b border-line/60 px-4 py-4 text-sm last:border-0 md:grid-cols-[100px_1fr_140px_180px_100px]"
          >
            <div className="font-mono text-[11px] text-foreground/70">{s.id}</div>
            <div className="min-w-0">
              <div className="truncate">{s.unit}</div>
              <div className="mt-0.5 text-[11px] text-foreground/50">{s.from} → {s.to}</div>
            </div>
            <div className="hidden md:block">
              <span className="rounded-full border border-line bg-background/60 px-2 py-1 text-[10px] uppercase tracking-widest text-foreground/70">
                {s.status}
              </span>
            </div>
            <div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div className="h-full bg-grad-dragon" style={{ width: `${s.pct}%` }} />
              </div>
              <div className="mt-1 text-[10px] text-foreground/50">{s.pct}%</div>
            </div>
            <div className="text-right text-[12px] text-foreground/80">{s.eta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section 06 — Powering Africa ---------------- */

function Powering() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative">
        <img src={dozerImg.url} alt="Heavy earthmoving machinery on site" className="h-[92dvh] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-20 md:px-10 md:pb-32">
            <Reveal><SectionTag index="06" label="Infrastructure Powering Africa" /></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-4xl text-display text-4xl leading-[1.02] md:text-7xl">
                "The machines behind the continent's
                <br />
                <span className="bg-grad-dragon bg-clip-text text-transparent">next generation of infrastructure.</span>"
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid max-w-4xl grid-cols-2 gap-6 text-sm text-foreground/70 md:grid-cols-5">
                {["Construction", "Mining", "Road Projects", "Ports", "Industrial"].map((s) => (
                  <div key={s} className="border-t border-line pt-3">
                    <div className="text-eyebrow text-dragon">Sector</div>
                    <div className="mt-1 text-foreground">{s}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 07 — Ecosystem ---------------- */

function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal><SectionTag index="07" label="Partner Ecosystem" /></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-display text-4xl md:text-6xl">
            One network.
            <br />
            <span className="text-foreground/60">Synchronised in motion.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <EcosystemDiagram />
          </div>
          <div className="md:col-span-6 md:pl-10">
            <div className="grid gap-4">
              {[
                ["Manufacturers", "Tier-1 OEMs submit qualified equipment into the network."],
                ["Shipping Partners", "RoRo, break-bulk and container carriers moving units end-to-end."],
                ["Clients", "Contractors, miners and operators procure and track in one place."],
                ["QianTron", "The operational core orchestrating every handoff and every document."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-5 backdrop-blur-sm transition-all hover:border-dragon/50">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-grad-dragon text-[11px] font-semibold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-display text-lg">{t}</div>
                      <p className="mt-1 text-sm text-foreground/70">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcosystemDiagram() {
  const nodes = [
    { label: "Manufacturers", x: 20, y: 22 },
    { label: "Shipping", x: 80, y: 22 },
    { label: "Clients", x: 80, y: 78 },
    { label: "Partners", x: 20, y: 78 },
  ];
  return (
    <div className="relative aspect-square w-full max-w-lg rounded-3xl border border-line bg-surface/40 p-6 shadow-elev">
      <div className="engineered-grid absolute inset-0 rounded-3xl opacity-40" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke="url(#eco)" strokeWidth="0.3" className="dash-flow"
            style={{ animationDelay: `-${i * 1.1}s` }}
          />
        ))}
        <defs>
          <linearGradient id="eco" x1="0" x2="1">
            <stop offset="0%" stopColor="#B71C1C" />
            <stop offset="100%" stopColor="#D6A800" />
          </linearGradient>
        </defs>
      </svg>
      {/* center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-24 w-24 place-items-center rounded-full border border-dragon/40 bg-background shadow-dragon">
          <img src={logoAsset.url} alt="QianTron core" className="h-14 w-14 object-contain" />
        </div>
      </div>
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="rounded-full border border-line bg-background/90 px-3 py-1.5 text-[11px] uppercase tracking-widest text-foreground/80 backdrop-blur">
            {n.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Section 08 — Roadmap ---------------- */

const roadmap = [
  { q: "Now", items: ["Client Portal", "Logistics Tracking"] },
  { q: "Next", items: ["Manufacturer Portal", "Smart Procurement"] },
  { q: "Horizon", items: ["Partner Portal", "Equipment Marketplace", "Integrated Shipping Intelligence"] },
];

function Roadmap() {
  return (
    <section id="platform" className="relative border-y border-line bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal><SectionTag index="08" label="Future Platform Vision" /></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-display text-4xl md:text-6xl">
            A platform designed
            <br />
            <span className="text-foreground/60">for how global machinery should move.</span>
          </h2>
        </Reveal>

        <div className="relative mt-20 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-dragon via-gold to-transparent md:block" />
          {roadmap.map((r, i) => (
            <Reveal key={r.q} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-line bg-surface/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-dragon shadow-dragon" />
                  <div className="text-eyebrow">{r.q}</div>
                </div>
                <div className="mt-6 space-y-3">
                  {r.items.map((it) => (
                    <div key={it} className="flex items-center justify-between border-b border-line/60 pb-3 last:border-0">
                      <span className="text-[15px] text-foreground/90">{it}</span>
                      <ArrowUpRight className="h-4 w-4 text-foreground/40" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 09 — Final CTA ---------------- */

function CTA() {
  return (
    <section id="login" className="relative isolate overflow-hidden">
      <div className="relative min-h-[90dvh]">
        <div className="absolute inset-0 bg-grad-hero" />
        <div className="engineered-grid absolute inset-0 opacity-40" />
        {/* dragon watermark */}
        <img
          src={logoAsset.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-6%] top-1/2 h-[110%] w-auto -translate-y-1/2 opacity-[0.06]"
        />
        <div className="relative mx-auto flex min-h-[90dvh] max-w-[1400px] flex-col justify-center px-6 py-28 md:px-10">
          <Reveal><SectionTag index="09" label="Begin" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-display text-5xl leading-[1] md:text-8xl lg:text-[128px]">
              Engineering Trust.
              <br />
              <span className="bg-grad-dragon bg-clip-text text-transparent">Delivering Power.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a
                href="#login"
                className="group inline-flex items-center gap-2 rounded-full bg-dragon px-6 py-3.5 text-sm font-semibold text-white shadow-dragon transition-all hover:brightness-110"
              >
                Create Client Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#login"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-3.5 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:bg-surface"
              >
                Login
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-24 grid gap-6 border-t border-line pt-10 md:grid-cols-3">
              <div>
                <img src={wordmarkAsset.url} alt="QianTron wordmark" className="h-6 w-auto opacity-90" />
                <p className="mt-4 max-w-xs text-sm text-foreground/60">
                  Premium machinery sourcing, RoRo shipping, customs clearance and door-to-door delivery.
                </p>
              </div>
              <div className="text-sm text-foreground/70">
                <div className="text-eyebrow">Contact</div>
                <div className="mt-3">ops@qiantron.com</div>
                <div>+1 (000) 000-0000</div>
              </div>
              <div className="text-sm text-foreground/70">
                <div className="text-eyebrow">Operations</div>
                <div className="mt-3">Shanghai · Yokohama · Hamburg</div>
                <div>Mombasa · Dar es Salaam · Lagos</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-foreground/40">
              <div>© {new Date().getFullYear()} QianTron. All rights reserved.</div>
              <div>Engineering trust. Delivering power.</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Progress bar ---------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-grad-dragon"
    />
  );
}

/* ---------------- Page ---------------- */

function Landing() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
      return () => { document.documentElement.style.scrollBehavior = ""; };
    }
  }, []);
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <ScrollProgress />
      <Hero />
      <Difference />
      <Fleet />
      <Logistics />
      <Dashboard />
      <Powering />
      <Ecosystem />
      <Roadmap />
      <CTA />
    </main>
  );
}
