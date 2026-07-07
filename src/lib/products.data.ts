import volvoImg from "@/assets/volvo-excavators.jpg.asset.json";
import wheelLoaderImg from "@/assets/wheel-loader.jpg.asset.json";
import trackDrillImg from "@/assets/track-drill.jpg.asset.json";
import telehandlerImg from "@/assets/telehandler.jpg.asset.json";
import mobileCraneImg from "@/assets/mobile-crane.jpg.asset.json";
import craneMobileImg from "@/assets/crane-mobile.jpg.asset.json";
import factoryImg from "@/assets/factory-line.jpg.asset.json";
import dozerImg from "@/assets/cat-dozer.jpg.asset.json";

export type ProductSpec = { label: string; value: string };
export type ProductShipping = {
  packedDims: string;
  weight: string;
  mode: string;
  leadTime: string;
  incoterms: string[];
  corridors: string[];
};

export type Product = {
  slug: string;
  name: string;
  spec: string;
  origin: string;
  img: string;
  tag: string;
  tagline: string;
  overview: string;
  gallery: string[];
  specs: ProductSpec[];
  shipping: ProductShipping;
};

const CONTEXT_GALLERY = [factoryImg.url, mobileCraneImg.url];

export const PRODUCTS: Product[] = [
  {
    slug: "excavators",
    name: "Excavators",
    spec: "20T — 90T",
    origin: "JP · CN",
    img: volvoImg.url,
    tag: "Earthmoving",
    tagline: "Precision hydraulics for every dig profile.",
    overview:
      "Volvo, Komatsu and Sany crawler excavators inspected, refurbished and shipped ready-to-work. Configurable buckets, quick-couplers and hammer circuits.",
    gallery: [volvoImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Operating weight", value: "20 — 90 t" },
      { label: "Bucket capacity", value: "1.0 — 4.5 m³" },
      { label: "Engine power", value: "110 — 460 kW" },
      { label: "Reach", value: "up to 11.9 m" },
      { label: "Hours (typical)", value: "< 6,500" },
    ],
    shipping: {
      packedDims: "10.5 × 3.4 × 3.2 m",
      weight: "22 — 92 t",
      mode: "RoRo · Flat-rack",
      leadTime: "35 — 55 days port-to-port",
      incoterms: ["FOB", "CIF", "DAP"],
      corridors: ["Shanghai → Mombasa", "Yokohama → Durban", "Tianjin → Lagos"],
    },
  },
  {
    slug: "wheel-loaders",
    name: "Wheel Loaders",
    spec: "3m³ — 6m³",
    origin: "JP",
    img: wheelLoaderImg.url,
    tag: "Material handling",
    tagline: "High-cycle loaders for quarry and yard.",
    overview:
      "Komatsu WA-series loaders with rebuilt drivetrains, refreshed tyres and OEM buckets. Ideal for aggregate, stockpile and port operations.",
    gallery: [wheelLoaderImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Bucket capacity", value: "3.0 — 6.0 m³" },
      { label: "Operating weight", value: "18 — 34 t" },
      { label: "Engine power", value: "170 — 380 kW" },
      { label: "Breakout force", value: "180 — 320 kN" },
    ],
    shipping: {
      packedDims: "9.2 × 3.1 × 3.5 m",
      weight: "18 — 34 t",
      mode: "RoRo",
      leadTime: "30 — 50 days port-to-port",
      incoterms: ["FOB", "CIF", "DAP"],
      corridors: ["Yokohama → Mombasa", "Kobe → Dar es Salaam"],
    },
  },
  {
    slug: "bulldozers",
    name: "Bulldozers",
    spec: "D6 — D11",
    origin: "USA · CN",
    img: dozerImg.url,
    tag: "Grading",
    tagline: "Track-type tractors for the toughest cuts.",
    overview:
      "Caterpillar D6–D11 and Shantui SD-series dozers, straight or SU blades, with optional single-shank rippers. Full undercarriage inspection included.",
    gallery: [dozerImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Operating weight", value: "20 — 113 t" },
      { label: "Blade capacity", value: "3.9 — 34.4 m³" },
      { label: "Engine power", value: "160 — 690 kW" },
      { label: "Undercarriage", value: "SystemOne / standard" },
    ],
    shipping: {
      packedDims: "8.6 × 3.5 × 3.6 m",
      weight: "20 — 113 t",
      mode: "Flat-rack · Break-bulk",
      leadTime: "45 — 70 days port-to-port",
      incoterms: ["FOB", "CIF"],
      corridors: ["Houston → Walvis Bay", "Shanghai → Lagos"],
    },
  },
  {
    slug: "mining",
    name: "Mining Equipment",
    spec: "Drill & haul",
    origin: "USA · SE",
    img: trackDrillImg.url,
    tag: "Extraction",
    tagline: "Drill rigs and haul trucks for surface mining.",
    overview:
      "Atlas Copco and Epiroc surface drills paired with Cat 777/785 rigid haulers. Configurable for iron ore, copper and aggregate operations.",
    gallery: [trackDrillImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Drill hole diameter", value: "89 — 229 mm" },
      { label: "Haul payload", value: "90 — 150 t" },
      { label: "Engine power", value: "300 — 1,200 kW" },
      { label: "Duty cycle", value: "24/7 continuous" },
    ],
    shipping: {
      packedDims: "12.0 × 4.2 × 4.5 m",
      weight: "35 — 165 t",
      mode: "Break-bulk · Heavy-lift",
      leadTime: "60 — 90 days port-to-port",
      incoterms: ["FOB", "CIF", "DAP"],
      corridors: ["Gothenburg → Richards Bay", "Houston → Pointe-Noire"],
    },
  },
  {
    slug: "telehandlers",
    name: "Telehandlers & Forklifts",
    spec: "3T — 20T",
    origin: "UK · CN",
    img: telehandlerImg.url,
    tag: "Sitework",
    tagline: "Reach and lift for construction and logistics yards.",
    overview:
      "JCB Loadall telehandlers and Heli / Hangcha forklifts. Diesel and LPG options, with fork, bucket and jib attachments available.",
    gallery: [telehandlerImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Lift capacity", value: "3 — 20 t" },
      { label: "Lift height", value: "4.5 — 17 m" },
      { label: "Engine power", value: "55 — 130 kW" },
      { label: "Attachments", value: "Fork · Bucket · Jib" },
    ],
    shipping: {
      packedDims: "6.4 × 2.4 × 2.6 m",
      weight: "5 — 22 t",
      mode: "RoRo · 40' HC",
      leadTime: "28 — 45 days port-to-port",
      incoterms: ["FOB", "CIF", "DAP"],
      corridors: ["Southampton → Tema", "Shanghai → Mombasa"],
    },
  },
  {
    slug: "cranes",
    name: "Cranes",
    spec: "25T — 750T",
    origin: "DE · CN",
    img: craneMobileImg.url,
    tag: "Lifting",
    tagline: "All-terrain and crawler cranes for infrastructure.",
    overview:
      "Liebherr LTM all-terrain and Sany SCC crawler cranes. Verified boom, rope and load-chart certification prior to shipment.",
    gallery: [craneMobileImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Max lift capacity", value: "25 — 750 t" },
      { label: "Boom length", value: "up to 100 m" },
      { label: "Configuration", value: "All-terrain · Crawler" },
      { label: "Counterweight", value: "modular" },
    ],
    shipping: {
      packedDims: "16.5 × 3.0 × 4.0 m + counterweights",
      weight: "36 — 96 t (per module)",
      mode: "Break-bulk · Heavy-lift",
      leadTime: "50 — 80 days port-to-port",
      incoterms: ["FOB", "CIF"],
      corridors: ["Hamburg → Dakar", "Shanghai → Djibouti"],
    },
  },
  {
    slug: "mobile-cranes",
    name: "Mobile Cranes",
    spec: "Rough terrain",
    origin: "IN · JP",
    img: mobileCraneImg.url,
    tag: "Field lift",
    tagline: "Rough-terrain cranes for remote sites.",
    overview:
      "Tadano and Escorts rough-terrain cranes. Compact, self-propelled, and configured for pipeline, mining and remote construction lifts.",
    gallery: [mobileCraneImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Capacity", value: "20 — 80 t" },
      { label: "Boom", value: "24 — 44 m telescoping" },
      { label: "Drive", value: "4×4 rough-terrain" },
      { label: "Engine power", value: "150 — 260 kW" },
    ],
    shipping: {
      packedDims: "13.8 × 2.9 × 3.6 m",
      weight: "24 — 55 t",
      mode: "RoRo · Flat-rack",
      leadTime: "40 — 60 days port-to-port",
      incoterms: ["FOB", "CIF", "DAP"],
      corridors: ["Chennai → Mombasa", "Yokohama → Luanda"],
    },
  },
  {
    slug: "haulage",
    name: "Prime Movers · Tippers · Haulage",
    spec: "6x4 · 8x4",
    origin: "CN · DE",
    img: factoryImg.url,
    tag: "Fleet",
    tagline: "Long-haul tractors and heavy tippers.",
    overview:
      "Sinotruk HOWO, Shacman X3000 and Mercedes-Benz Actros prime movers and tippers. Fleet-ready pricing, uniform spec, spare-parts kits included.",
    gallery: [factoryImg.url, ...CONTEXT_GALLERY],
    specs: [
      { label: "Configuration", value: "6×4 · 8×4" },
      { label: "Engine power", value: "280 — 480 kW" },
      { label: "GVW", value: "25 — 50 t" },
      { label: "Body", value: "Tractor · Tipper · Cargo" },
    ],
    shipping: {
      packedDims: "9.0 × 2.5 × 3.6 m",
      weight: "9 — 16 t",
      mode: "RoRo",
      leadTime: "30 — 50 days port-to-port",
      incoterms: ["FOB", "CIF", "DAP"],
      corridors: ["Tianjin → Dar es Salaam", "Bremerhaven → Lagos"],
    },
  },
];
