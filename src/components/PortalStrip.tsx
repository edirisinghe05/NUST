import { motion } from "framer-motion";
import { ArrowUpRight, Globe, KeyRound } from "lucide-react";
import { portalLinks } from "../data/config";

const ICONS = [Globe, KeyRound];

export default function PortalStrip() {
  return (
    <section className="relative border-b border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
            Official Portals
          </p>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {portalLinks.map((portal, i) => {
            const Icon = ICONS[i] ?? Globe;
            const primary = i === 1; // student portal = primary action
            return (
              <motion.a
                key={portal.label}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group flex items-center gap-4 overflow-hidden rounded-lg border px-6 py-5 transition-all duration-300 hover:-translate-y-1 ${
                  primary
                    ? "border-gold bg-gold text-ink shadow-lg shadow-gold/15 hover:shadow-xl hover:shadow-gold/25"
                    : "border-gold/50 bg-panel text-paper hover:border-gold hover:shadow-lg hover:shadow-gold/10"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md border transition-transform duration-300 group-hover:scale-110 ${
                    primary
                      ? "border-ink/25 bg-ink/10 text-ink"
                      : "border-gold/40 bg-gold/10 text-gold"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-display text-lg font-bold uppercase leading-tight tracking-wide sm:text-xl ${
                      primary ? "text-ink" : "text-paper"
                    }`}
                  >
                    {portal.label}
                  </span>
                  <span
                    className={`mt-0.5 block font-mono text-[10px] uppercase tracking-[0.25em] ${
                      primary ? "text-ink/70" : "text-muted"
                    }`}
                  >
                    {portal.description}
                  </span>
                </span>

                <ArrowUpRight
                  className={`h-5 w-5 shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                    primary ? "text-ink" : "text-gold"
                  }`}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
