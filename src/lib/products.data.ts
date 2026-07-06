import volvoImg from "@/assets/volvo-excavators.jpg.asset.json";
import wheelLoaderImg from "@/assets/wheel-loader.jpg.asset.json";
import trackDrillImg from "@/assets/track-drill.jpg.asset.json";
import telehandlerImg from "@/assets/telehandler.jpg.asset.json";
import mobileCraneImg from "@/assets/mobile-crane.jpg.asset.json";
import craneMobileImg from "@/assets/crane-mobile.jpg.asset.json";
import factoryImg from "@/assets/factory-line.jpg.asset.json";
import dozerImg from "@/assets/cat-dozer.jpg.asset.json";

export type Product = {
  slug: string;
  name: string;
  spec: string;
  origin: string;
  img: string;
  tag: string;
};

export const PRODUCTS: Product[] = [
  { slug: "excavators", name: "Excavators", spec: "20T — 90T", origin: "JP · CN", img: volvoImg.url, tag: "Earthmoving" },
  { slug: "wheel-loaders", name: "Wheel Loaders", spec: "3m³ — 6m³", origin: "JP", img: wheelLoaderImg.url, tag: "Material handling" },
  { slug: "bulldozers", name: "Bulldozers", spec: "D6 — D11", origin: "USA · CN", img: dozerImg.url, tag: "Grading" },
  { slug: "mining", name: "Mining Equipment", spec: "Drill & haul", origin: "USA · SE", img: trackDrillImg.url, tag: "Extraction" },
  { slug: "telehandlers", name: "Telehandlers & Forklifts", spec: "3T — 20T", origin: "UK · CN", img: telehandlerImg.url, tag: "Sitework" },
  { slug: "cranes", name: "Cranes", spec: "25T — 750T", origin: "DE · CN", img: craneMobileImg.url, tag: "Lifting" },
  { slug: "mobile-cranes", name: "Mobile Cranes", spec: "Rough terrain", origin: "IN · JP", img: mobileCraneImg.url, tag: "Field lift" },
  { slug: "haulage", name: "Prime Movers · Tippers · Haulage", spec: "6x4 · 8x4", origin: "CN · DE", img: factoryImg.url, tag: "Fleet" },
];
