import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Infinity, Check, Sparkles, Lock, Globe, Cpu } from "lucide-react";
import { getFreeToolsCount, getPremiumToolsCount } from "@/config/tools";

export const metadata: Metadata = {
  title: "Why PDFflow? A Privacy-Focused PDF Tool | PDFflow",
  description:
    "PDFflow processes PDFs in your browser instead of uploading them. See what's free, what Pro adds, and how it works.",
  keywords: [
    "private pdf tools",
    "browser pdf editor",
    "pdf tools no upload",
    "free pdf tools",
  ],
  openGraph: {
    title: "Why PDFflow? A Privacy-Focused PDF Tool",
    description: "PDFflow processes PDFs in your browser instead of uploading them.",
    type: "website",
  },
};

const freeToolsCount = getFreeToolsCount();
const premiumToolsCount = getPremiumToolsCount();

const pdfflowFeatures = [
  {
    icon: Shield,
    title: "Private by Design",
    description: "PDF processing happens in your browser, so your files aren't uploaded to our servers.",
  },
  {
    icon: Zap,
    title: "No Upload Wait",
    description: "Because files aren't uploaded, there's no upload or download step. Speed depends on your device and file size.",
  },
  {
    icon: Infinity,
    title: `${freeToolsCount + premiumToolsCount} Tools`,
    description: "Merge, split, compress, convert, sign, watermark, protect, and more in one place.",
  },
  {
    icon: Lock,
    title: "No Account Needed for Free Tools",
    description: `Use the ${freeToolsCount} free tools without signing up. An account is only needed for Pro.`,
  },
  {
    icon: Globe,
    title: "Works in Your Browser",
    description: "Runs on Windows, Mac, Linux and mobile in a modern browser, and can be installed as a web app.",
  },
  {
    icon: Cpu,
    title: "Offline Support",
    description: "When installed, core tools you've already opened can keep working without a connection.",
  },
];

const planFacts = [
  { feature: "Tools", free: `${freeToolsCount} free, unlimited`, pro: `All ${freeToolsCount + premiumToolsCount}, unlimited` },
  { feature: "Premium tools", free: "4 free uses in total", pro: "Unlimited" },
  { feature: "Max file size", free: "10MB", pro: "100MB" },
  { feature: "\"Processed with PDFflow\" footer on some outputs", free: "Yes", pro: "No" },
  { feature: "Price", free: "$0", pro: "$4.99/month or $39.99/year" },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--primary)]/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            The Privacy-First PDF Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Why PDFflow?
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Many online PDF tools process files on their servers. PDFflow processes them in your browser,
            so your files aren&apos;t uploaded to us.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium shadow-lg hover:opacity-90 transition-all"
          >
            Try PDFflow Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pdfflowFeatures.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                <feature.icon className="h-6 w-6 text-[var(--primary)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Pro */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Free vs Pro</h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">Feature</th>
                  <th className="p-4 text-sm font-medium">Free</th>
                  <th className="p-4 text-sm font-medium text-[var(--primary)]">Pro</th>
                </tr>
              </thead>
              <tbody>
                {planFacts.map((row) => (
                  <tr key={row.feature} className="border-b border-[var(--border)] last:border-0">
                    <td className="p-4 text-sm text-[var(--text-secondary)]">{row.feature}</td>
                    <td className="p-4 text-sm text-center">{row.free}</td>
                    <td className="p-4 text-sm text-center">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:opacity-80">
              <Check className="h-4 w-4" /> See pricing details
            </Link>
          </div>
          <p className="mt-10 text-xs text-[var(--text-secondary)] text-center">
            Thinking of switching from another PDF tool? Features and pricing elsewhere change often, so check
            their website for current details.
          </p>
        </div>
      </section>
    </div>
  );
}
