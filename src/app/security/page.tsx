"use client";

import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Server,
  FileCheck,
  Globe,
  HardDrive,
  ShieldCheck,
  ArrowRight,
  Laptop,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Laptop,
    title: "100% Client-Side Processing",
    description: "Your files are processed entirely in your browser using WebAssembly and JavaScript. Your files never touch our servers.",
  },
  {
    icon: HardDrive,
    title: "Files Stay on Your Device",
    description: "Documents remain on your local machine throughout the entire process. We literally cannot see your files.",
  },
  {
    icon: Lock,
    title: "No File Uploads",
    description: "Unlike other PDF tools, we don't upload your files to process them. Everything happens locally.",
  },
  {
    icon: Eye,
    title: "Zero Data Collection",
    description: "We don't collect, store, or analyze the contents of your documents. Your data is your data.",
  },
  {
    icon: Globe,
    title: "HTTPS Everywhere",
    description: "The site is served only over HTTPS, so your connection to PDFflow is encrypted.",
  },
  {
    icon: Server,
    title: "No Server Storage",
    description: "We have no servers storing your PDFs. When you close the tab, your files exist only on your device.",
  },
];

const complianceItems = [
  {
    title: "Privacy by Design",
    description: "PDF files are processed on your device, not uploaded",
    icon: ShieldCheck,
  },
  {
    title: "No Document Collection",
    description: "We don't collect the contents of your documents",
    icon: ShieldCheck,
  },
  {
    title: "In-browser Processing",
    description: "PDF processing happens in your browser",
    icon: FileCheck,
  },
  {
    title: "No File Storage",
    description: "We don't store your documents on our servers",
    icon: FileCheck,
  },
];

const faqs = [
  {
    question: "Do you store my files on your servers?",
    answer: "No. PDFflow processes all files directly in your browser. Your files never leave your device and are never uploaded to any server.",
  },
  {
    question: "Can PDFflow employees see my documents?",
    answer: "No. Since files are processed locally in your browser, we have no technical ability to access your documents. We literally cannot see them.",
  },
  {
    question: "What happens to my files after processing?",
    answer: "Nothing — they stay on your device. Processed files live in browser memory until you download them or close the tab. PDFflow keeps a short list of recently processed file names in your browser so you can find them again; you can clear it from your dashboard.",
  },
  {
    question: "Is PDFflow safe for confidential documents?",
    answer: "Because files are processed in your browser and not uploaded, PDFflow avoids the main risk of online PDF tools. That said, you are responsible for deciding whether it meets your own legal or compliance requirements (for example HIPAA) before using it with regulated data.",
  },
  {
    question: "Do you use third-party services that might access my files?",
    answer: "No third-party service processes your files. We use Vercel (hosting and anonymous page analytics), Supabase (accounts) and Stripe (payments); none of them receive your documents.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#030304]">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Security First
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your files never leave
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              your device
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            PDFflow processes everything locally in your browser. No uploads, no file storage.
            Your sensitive documents stay exactly where they should — with you.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/merge"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Try It Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How local processing works
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our architecture is fundamentally different from other PDF tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 mb-3">You select files</h3>
              <p className="text-white/50">
                Files are loaded into your browser&apos;s memory. They never leave your computer.
              </p>
            </div>

            <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 mb-3">Browser processes locally</h3>
              <p className="text-white/50">
                Using PDF.js and pdf-lib, your browser handles all the heavy lifting. Zero server involvement.
              </p>
            </div>

            <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mt-4 mb-3">Download result</h3>
              <p className="text-white/50">
                The processed file is saved directly to your device. Close the tab and all temporary data is gone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security by design
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We built PDFflow from the ground up with privacy as the core principle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our privacy principles
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              How PDFflow handles your documents. PDFflow does not currently hold formal security certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceItems.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/50">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to process PDFs securely?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Process your PDFs without uploading them anywhere.
            </p>
            <Link
              href="/merge"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
