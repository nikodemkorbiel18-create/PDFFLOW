import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how PDFflow handles your data and protects your privacy.",
};

const sections = [
  {
    title: "1. Introduction",
    content: `Welcome to PDFflow ("we," "our," or "us"). This Privacy Policy explains what information we collect when you use pdfflow.space, how we use it, and the choices you have.`,
  },
  {
    title: "2. Information We Collect",
    content: null,
    subsections: [
      {
        title: "Files You Process",
        content: "PDF processing happens in your browser using JavaScript and WebAssembly. The files you process are not uploaded to our servers, and we cannot see their contents. Your browser keeps a short list of recently processed file names (not the files) in local storage so you can find them again; you can clear it at any time.",
      },
      {
        title: "Account Information",
        content: "If you create an account we collect your email address and, if you choose to provide them or sign in with Google, your name and profile picture. If you upload a profile picture it is stored with our database provider. Pro users' saved watermark and signature templates are stored with their account so they sync across devices.",
      },
      {
        title: "Payment Information",
        content: "Payments are handled by Stripe. We receive your Stripe customer ID, plan, subscription status and renewal date, but we never see or store your full card details.",
      },
      {
        title: "Messages You Send Us",
        content: "If you use the contact form or tool-request form, we receive your message and any name and email address you include, and use them to reply.",
      },
      {
        title: "Usage Data",
        content: "We use Vercel Web Analytics to collect anonymous, aggregated information such as pages visited, referrer, device type and country. It does not use cookies to identify you. For signed-in free users we also count how many times premium tools have been used, to apply the free-use limit.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: "We use the information we collect to:",
    list: [
      "Provide and maintain our services and your account",
      "Process payments and manage your subscription",
      "Send service emails (such as welcome, receipt-related and cancellation confirmations)",
      "Respond to your messages",
      "Improve our website",
      "Comply with legal obligations",
    ],
    footer: "We do not sell your personal information, and we do not use it for advertising.",
  },
  {
    title: "4. Data Security and Retention",
    content: "All connections to PDFflow use HTTPS. Account data is stored with our database provider and protected by access controls. We keep account and billing records while your account is active and as long as needed afterwards to meet legal, tax and accounting obligations. No method of storage or transmission is 100% secure, but we work to protect your information.",
  },
  {
    title: "5. Cookies and Local Storage",
    content: "We use cookies and your browser's local storage to:",
    list: [
      "Keep you signed in",
      "Remember your preferences (like theme and favorite tools)",
      "Track free-tier usage limits on your device",
      "Keep your recent file list and saved templates",
    ],
    footer: "You can clear cookies and site data through your browser settings; some features may stop working if you do.",
  },
  {
    title: "6. Third-Party Services",
    content: "We share information with the following service providers only as needed to run PDFflow:",
    list: [
      "Vercel: hosting and anonymous web analytics",
      "Supabase: user accounts, authentication and database",
      "Stripe: payment processing and billing",
      "Resend: sending emails",
      "Google: optional sign-in with Google; Google Fonts on the Sign PDF tool",
      "DiceBear: default avatar images during onboarding",
    ],
    footer: "None of these providers receive the files you process. Each has its own privacy policy governing its use of your information. Some of them may process data outside your country.",
  },
  {
    title: "7. Your Rights",
    content: "Depending on where you live (for example under the GDPR, UK GDPR or CCPA), you may have the right to:",
    list: [
      "Access your personal data",
      "Correct inaccurate data",
      "Request deletion of your data and account",
      "Object to or restrict processing",
      "Data portability",
      "Complain to your local data protection authority",
    ],
    footer: "To exercise these rights, email hello@pdfflow.space. We will respond within the time required by applicable law.",
  },
  {
    title: "8. Children",
    content: "PDFflow is not directed at children under 13 (or the minimum age in your country), and we do not knowingly collect their personal information.",
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will post the new policy on this page and update the "Last updated" date, and notify account holders by email of material changes.`,
  },
  {
    title: "10. Contact Us",
    content: "If you have questions about this Privacy Policy, please contact us at:",
    footer: "Email: hello@pdfflow.space",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--accent)]/20 to-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 mb-6 shadow-lg shadow-[var(--accent)]/25">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[var(--muted-foreground)]">
              Last updated: October 11, 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="rounded-3xl border bg-[var(--card)] p-6 sm:p-8 hover:shadow-glass transition-all"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>

                {section.content && (
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div className="space-y-4 mt-4">
                    {section.subsections.map((sub) => (
                      <div key={sub.title}>
                        <h3 className="font-medium text-[var(--foreground)]">{sub.title}</h3>
                        <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[var(--muted-foreground)]">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-4 text-[var(--muted-foreground)]">
                    {section.footer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
