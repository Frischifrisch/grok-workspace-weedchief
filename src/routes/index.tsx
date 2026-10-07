import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck } from "lucide-react";
import { FirmwareCard } from "@/components/firmware-card";
import { Button } from "@/components/ui/button";
import { FIRMWARES } from "@/lib/axle/catalog";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";
import { PhoneStrip } from "@/components/phone-strip";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const lang = useAxle((s) => s.lang);
  const copy = t(lang);
  const faq = [
    [copy.faq.q1, copy.faq.a1],
    [copy.faq.q2, copy.faq.a2],
    [copy.faq.q3, copy.faq.a3],
    [copy.faq.q4, copy.faq.a4],
    [copy.faq.q5, copy.faq.a5],
    [copy.faq.q6, copy.faq.a6],
    [copy.faq.q7, copy.faq.a7],
    [copy.faq.q8, copy.faq.a8],
    [copy.faq.q9, copy.faq.a9],
    [copy.faq.q10, copy.faq.a10],
    [copy.faq.q11, copy.faq.a11],
    [copy.faq.q12, copy.faq.a12],
    [copy.faq.q13, copy.faq.a13],
    [copy.faq.q14, copy.faq.a14],
    [copy.faq.q15, copy.faq.a15],
  ];

  return (
    <main className="space-y-24 pb-10">
      <section className="grid items-center gap-8 pt-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:pt-4">
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.28em] text-subtle">{copy.hero.kicker}</p>
          <h1 className="font-display mt-5 max-w-xl text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {copy.hero.title1}
            <br />
            <span className="text-accent">{copy.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">{copy.hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#firmware">
                {copy.hero.explore}
                <ArrowRight className="cta-arrow size-4" />
              </a>
            </Button>
            <Button asChild variant="raised" size="lg" className="w-full sm:w-auto">
              <a href="#how">{copy.nav.how}</a>
            </Button>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <CircleCheck className="size-4 text-accent" /> {copy.hero.checks}
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck className="size-4 text-accent" /> {copy.hero.open}
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck className="size-4 text-accent" /> {copy.hero.models}
            </li>
          </ul>
        </div>
        <div className="relative">
          <img
            src="/product/st5max-hero.jpg"
            alt="NAVEE ST5 Max"
            className="product-photo mx-auto max-h-[28rem] w-auto object-contain"
          />
        </div>
      </section>

      <section id="firmware" className="scroll-mt-24">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.firmware.title}</h2>
        <p className="mt-2 text-muted">{copy.firmware.sub}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {FIRMWARES.map((fw) => (
            <FirmwareCard key={fw.slug} fw={fw} lang={lang} />
          ))}
        </div>
      </section>

      <section id="compare" className="scroll-mt-24">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.compare.title}</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[20rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-3 pr-4 font-medium text-subtle"> </th>
                <th className="py-3 pr-4 font-medium">{copy.compare.stock}</th>
                <th className="py-3 font-medium text-accent">{copy.compare.custom}</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              {(
                [
                  [copy.compare.speed, copy.compare.speedS, copy.compare.speedC],
                  [copy.compare.cfg, copy.compare.cfgS, copy.compare.cfgC],
                  [copy.compare.restore, copy.compare.restoreS, copy.compare.restoreC],
                  [copy.compare.app, copy.compare.appS, copy.compare.appC],
                  [copy.compare.updates, copy.compare.updatesS, copy.compare.updatesC],
                ] as const
              ).map((row) => (
                <tr key={row[0]} className="border-b border-line/70">
                  <td className="py-3 pr-4 text-fg">{row[0]}</td>
                  <td className="py-3 pr-4">{row[1]}</td>
                  <td className="py-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="how" className="scroll-mt-24">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.how.title}</h2>
        <p className="mt-2 text-muted">{copy.how.sub}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["01", copy.how.s1t, copy.how.s1],
            ["02", copy.how.s2t, copy.how.s2],
            ["03", copy.how.s3t, copy.how.s3],
            ["04", copy.how.s4t, copy.how.s4],
          ].map(([n, title, body]) => (
            <li key={n} className="rounded-[var(--radius-md)] border border-line bg-surface p-5">
              <p className="font-mono text-xs text-accent">{n}</p>
              <p className="mt-2 font-medium">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-3xl tracking-tight">{copy.models.title}</h2>
        <p className="mt-2 text-muted">{copy.models.sub}</p>
        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          {[
            "NAVEE ST5 Max",
            "NAVEE ST3",
            copy.fw.st5custom.title,
            copy.fw.st5test.title,
            copy.fw.stock.title,
            copy.fw.dash.title,
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-muted">
              <CircleCheck className="size-4 text-accent" /> {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-3xl tracking-tight">{copy.made.title}</h2>
        <p className="mt-2 max-w-xl text-muted">{copy.made.lead}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [copy.made.simpleT, copy.made.simple],
            [copy.made.checkedT, copy.made.checked],
            [copy.made.provenT, copy.made.proven],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[var(--radius-md)] border border-line bg-surface p-5">
              <p className="font-medium">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl tracking-tight">{copy.faq.title}</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faq.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {q}
                <span className="text-subtle group-open:hidden">+</span>
                <span className="hidden text-subtle group-open:inline">–</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl tracking-tight">{copy.apk.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.apk.lead}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.apk.note}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-subtle">{copy.apk.perms}</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {[copy.apk.p1, copy.apk.p2, copy.apk.p3, copy.apk.p4].map((p) => (
              <li key={p} className="flex gap-2">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">{copy.apk.web}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/garage">{copy.apk.download}</Link>
            </Button>
            <Button asChild variant="raised">
              <Link to="/firmware">{copy.firmware.title}</Link>
            </Button>
          </div>
        </div>
        <PhoneStrip />
      </section>

      <section className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
        <h2 className="font-medium">{copy.roads.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{copy.roads.body}</p>
      </section>
    </main>
  );
}
