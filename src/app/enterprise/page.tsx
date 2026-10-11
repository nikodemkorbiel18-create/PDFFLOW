"use client";

import Link from "next/link";
import { Building, ArrowRight, CheckCircle, Shield } from "lucide-react";

// Only list what PDFflow actually does today. Team features, SSO, an API and
// compliance certifications do not exist yet — don't advertise them until they do.
const facts = [
  "PDF processing runs in the browser — files aren't uploaded to PDFflow servers",
  "Works in Chrome, Edge, Safari and Firefox, and installs as a web app",
  "30 tools free with unlimited use; Pro unlocks all 100 tools",
  "Pro is billed per person: $4.99/month or $39.99/year",
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-[#030304]">
      <section className="relative pt-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Building className="w-4 h-4" />
            Teams
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Using PDFflow at work?
          </h1>
          <p className="text-lg text-white/60 mb-10">
            We don&apos;t offer team or enterprise plans yet. If your organization would use one,
            tell us what you need — it directly shapes what we build next.
          </p>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-white/60" />
              What PDFflow offers today
            </h2>
            <ul className="space-y-3">
              {facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/40">
              PDFflow does not currently hold security certifications such as SOC 2 or ISO 27001 and does not sign
              HIPAA Business Associate Agreements. Check with your compliance team before using it for regulated data.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Tell us what you need <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition-colors"
            >
              How processing works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
