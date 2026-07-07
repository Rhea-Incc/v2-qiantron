import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Ship, Truck, Package, MapPin, CircleDot, ShieldCheck } from "lucide-react";
import { getProducts } from "@/lib/products.functions";
import type { Product } from "@/lib/products.data";

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => getProducts(),
});

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(productsQueryOptions);
    const product = data.products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — QianTron" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `Product — QianTron` },
        { name: "description", content: "Detailed specifications, gallery and shipping information." },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow">Error / 404</p>
        <h1 className="mt-4 text-display text-5xl">Category not found</h1>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-dragon px-5 py-3 text-sm font-semibold text-white shadow-dragon">
          <ArrowLeft className="h-4 w-4" /> Back to fleet
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Signal interrupted</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function ProductDetail() {
  const { slug } = Route.useLoaderData();
  const { data } = useSuspenseQuery(productsQueryOptions);
  const product = data.products.find((p) => p.slug === slug)!;
  const related = data.products.filter((p) => p.slug !== slug).slice(0, 3);
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> QianTron
          </Link>
          <div className="hidden text-eyebrow text-foreground/60 md:block">
            Fleet · <span className="text-foreground/90">{product.tag}</span>
          </div>
          <a href="#quote" className="inline-flex items-center gap-2 rounded-full bg-dragon px-4 py-2 text-[13px] font-semibold text-white shadow-dragon hover:brightness-110">
            Request quote <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-grad-hero grain">
        <div className="engineered-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:gap-14 md:px-10 md:py-24">
          <div>
            <div className="flex items-center gap-3 text-eyebrow">
              <span className="text-dragon">Fleet</span>
              <span className="h-px w-8 bg-line" />
              <span>{product.tag}</span>
            </div>
            <h1 className="mt-6 text-display text-5xl leading-[1.02] md:text-7xl">{product.name}</h1>
            <p className="mt-6 max-w-lg text-lg text-foreground/70">{product.tagline}</p>
            <p className="mt-4 max-w-xl text-sm text-foreground/60">{product.overview}</p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                ["Range", product.spec],
                ["Origin", product.origin],
                ["Mode", product.shipping.mode],
              ].map(([k, v]) => (
                <div key={k} className="bg-background/70 p-4 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-foreground/50">{k}</div>
                  <div className="mt-1 text-display text-lg">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
              <img src={product.gallery[active]} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md">
                <CircleDot className="h-3 w-3 text-dragon" /> {product.tag}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition-all ${
                    i === active ? "border-dragon shadow-dragon" : "border-line opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Shipping */}
      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
        {/* Specs */}
        <div>
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="text-dragon">01</span>
            <span className="h-px w-8 bg-line" />
            <span>Technical specifications</span>
          </div>
          <h2 className="mt-6 text-display text-3xl md:text-4xl">Engineered detail.</h2>
          <dl className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-6 px-5 py-4">
                <dt className="text-[11px] uppercase tracking-widest text-foreground/50">{s.label}</dt>
                <dd className="text-display text-lg text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Shipping */}
        <div>
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="text-dragon">02</span>
            <span className="h-px w-8 bg-line" />
            <span>Shipping & logistics</span>
          </div>
          <h2 className="mt-6 text-display text-3xl md:text-4xl">Delivered, end-to-end.</h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { Icon: Package, label: "Packed dims", value: product.shipping.packedDims },
              { Icon: ShieldCheck, label: "Unit weight", value: product.shipping.weight },
              { Icon: Ship, label: "Freight mode", value: product.shipping.mode },
              { Icon: Truck, label: "Lead time", value: product.shipping.leadTime },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-line bg-surface p-5">
                <Icon className="h-5 w-5 text-dragon" />
                <div className="mt-3 text-[10px] uppercase tracking-widest text-foreground/50">{label}</div>
                <div className="mt-1 text-display text-lg">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <div className="text-[10px] uppercase tracking-widest text-foreground/50">Incoterms available</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.shipping.incoterms.map((i) => (
                <span key={i} className="rounded-full border border-line bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80">
                  {i}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-surface p-5">
            <div className="text-[10px] uppercase tracking-widest text-foreground/50">Active corridors</div>
            <ul className="mt-3 space-y-2">
              {product.shipping.corridors.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="h-4 w-4 text-dragon" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="border-y border-line bg-grad-hero">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center md:px-10">
          <div>
            <div className="text-eyebrow text-dragon">Get a tailored quote</div>
            <h3 className="mt-3 text-display text-3xl md:text-4xl">Configure your {product.name.toLowerCase()} order.</h3>
            <p className="mt-2 max-w-xl text-sm text-foreground/60">
              Share destination, quantity and target readiness — our sourcing desk responds within one business day.
            </p>
          </div>
          <a href="mailto:hello@qiantron.com" className="inline-flex items-center gap-2 rounded-full bg-dragon px-6 py-3.5 text-sm font-semibold text-white shadow-dragon hover:brightness-110">
            Request quote <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex items-center gap-3 text-eyebrow">
          <span className="text-dragon">03</span>
          <span className="h-px w-8 bg-line" />
          <span>Continue exploring</span>
        </div>
        <h3 className="mt-6 text-display text-3xl md:text-4xl">Related categories.</h3>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <RelatedCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group relative isolate block aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <img src={product.img} alt={product.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md">
        <CircleDot className="h-3 w-3 text-dragon" /> {product.tag}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="text-display text-2xl text-white">{product.name}</div>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div className="text-[11px] uppercase tracking-widest text-white/60">{product.spec}</div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur-md transition-all group-hover:bg-dragon">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
