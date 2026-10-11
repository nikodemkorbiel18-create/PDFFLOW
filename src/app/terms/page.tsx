import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using PDFflow services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using PDFflow ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.`,
  },
  {
    title: "2. Description of Service",
    content: "PDFflow provides online tools for PDF manipulation, including but not limited to merging, splitting, compressing, rotating, and converting PDF files. We offer both free and paid tiers of service.",
  },
  {
    title: "3. User Responsibilities",
    content: "You agree to:",
    list: [
      "Use the Service only for lawful purposes",
      "Not use the Service with files containing malware or malicious content",
      "Not attempt to circumvent usage limits or security measures",
      "Not use the Service to process illegal or infringing content",
      "Maintain the security of your account credentials",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: "You retain all rights to the files you process with the Service. Files are processed in your browser and are not uploaded to us, and we do not claim any ownership of or license to your content.",
    footer: "The PDFflow name, logo, and all related trademarks are our property. You may not use these without our written permission.",
  },
  {
    title: "5. Free Tier",
    content: "The free tier includes:",
    list: [
      "Unlimited use of tools marked as free",
      "4 free uses in total of tools marked as premium",
      "A maximum file size of 10MB",
      "A small \"Processed with PDFflow.space\" line on the last page of some outputs",
    ],
    footer: "We may change free-tier limits in the future. Changes will not affect a paid plan during a period you have already paid for.",
  },
  {
    title: "6. Paid Subscriptions",
    content: null,
    subsections: [
      {
        title: "Plans and Automatic Renewal",
        content: "PDFflow Pro is offered as a monthly subscription ($4.99 USD per month) or an annual subscription ($39.99 USD per year), plus any applicable taxes. Your subscription renews automatically at the end of each billing period, and your payment method is charged the then-current price, until you cancel. Payments are processed by Stripe. We will give you advance notice of any price change, and it will apply from your next renewal after the notice.",
      },
      {
        title: "Cancellation",
        content: "You may cancel at any time from Settings > Account > Manage billing, or by emailing hello@pdfflow.space. Cancellation stops future renewals; you keep Pro until the end of the period you have already paid for.",
      },
      {
        title: "Failed Payments",
        content: "If a renewal payment fails, Stripe will retry it for a limited time and you keep Pro during that period. If payment still cannot be collected, your account returns to the free tier.",
      },
      {
        title: "Legacy Lifetime Purchases",
        content: "Customers who bought the previously offered one-time \"Lifetime\" Pro option keep Pro access for as long as PDFflow operates the Service.",
      },
      {
        title: "Refunds",
        content: "If you are a new subscriber and are not happy with Pro, email hello@pdfflow.space within 7 days of your first payment for a full refund. Later refund requests are handled case by case. This does not limit any refund or withdrawal rights you have under the law where you live.",
      },
    ],
  },
  {
    title: "7. Service Availability",
    content: "We strive to maintain high availability but do not guarantee uninterrupted access to the Service. We may perform maintenance or updates that temporarily affect availability.",
  },
  {
    title: "8. Disclaimer of Warranties",
    content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.`,
    isLegal: true,
  },
  {
    title: "9. Limitation of Liability",
    content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OR CORRUPTION OF DATA OR FILES, ARISING FROM YOUR USE OF THE SERVICE. YOU ARE RESPONSIBLE FOR KEEPING COPIES OF YOUR ORIGINAL FILES AND CHECKING OUTPUTS BEFORE RELYING ON THEM. OUR TOTAL LIABILITY FOR ANY CLAIM IS LIMITED TO THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM. NOTHING IN THESE TERMS LIMITS LIABILITY THAT CANNOT BE LIMITED BY LAW.",
    isLegal: true,
  },
  {
    title: "10. Indemnification",
    content: "You agree to indemnify and hold harmless PDFflow and its affiliates from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.",
  },
  {
    title: "11. Changes to Terms",
    content: "We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Continued use after changes constitutes acceptance of the new Terms.",
  },
  {
    title: "12. Governing Law",
    content: "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which PDFflow operates, without regard to conflict of law principles.",
  },
  {
    title: "13. Contact",
    content: "For questions about these Terms, please contact us at:",
    footer: "Email: hello@pdfflow.space",
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 shadow-lg shadow-emerald-500/25">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Terms of Service
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
                  <p className={`leading-relaxed ${section.isLegal ? "text-sm text-[var(--muted-foreground)] font-mono" : "text-[var(--muted-foreground)]"}`}>
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
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
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
