import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  CheckCircle2,
  Mail,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquare,
  Copy,
  Check,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { CursorMode } from '../types';
import { EDITOR_CONFIG, getWhatsAppUrl } from '../data/config';

interface ContactSectionProps {
  initialService?: string;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function ContactSection({
  initialService,
  setCursorMode,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialService || 'Short-Form Reels / TikToks',
    budgetRange: 'Flexible / To Discuss',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Clean dispatch simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EDITOR_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projectTypes = [
    'Short-Form Reels / TikToks',
    'High-Retention YouTube Cut',
    'Brand & Commercial Edit',
    'Cinematic Documentary / Story',
    'Podcast & Talking Head Cut',
    'Color Grading & Sound Design Polish',
  ];

  const budgetRanges = [
    'Flexible / To Discuss',
    'Under $300 (Single Reel/Trial)',
    '$300 – $800 (Package/Multi-reel)',
    '$800 – $2,000 (Full Production/Monthly)',
    '$2,000+ (Comprehensive Creator Channel)',
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#060608] text-white border-t border-zinc-900/80"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
          <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
            COMMISSION & INQUIRIES
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white pb-6 border-b border-zinc-900">
          HAVE FOOTAGE? LET&apos;S TURN IT INTO SOMETHING WORTH WATCHING.
        </h2>

        <p className="mt-4 font-body text-base sm:text-lg text-zinc-400 max-w-2xl">
          Whether you have raw footage ready for the timeline or want to discuss a custom editing style for your channel, get in touch below.
        </p>

        {/* Contact Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-2xl bg-[#0c0c10] border border-red-600/40 text-center flex flex-col items-center justify-center gap-4 shadow-[0_0_40px_rgba(229,9,20,0.2)]"
              >
                <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  PROJECT INQUIRY TRANSMITTED
                </h3>
                <p className="font-body text-sm text-zinc-400 max-w-md">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Bilal will review your project brief and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      projectType: 'Short-Form Reels / TikToks',
                      budgetRange: 'Flexible / To Discuss',
                      message: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-300 border border-zinc-800 transition-colors"
                >
                  SEND ANOTHER INQUIRY
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-2xl bg-[#0c0c10] border border-zinc-800/90 flex flex-col gap-6 shadow-2xl"
              >
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-600/60 text-red-400 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-xs text-zinc-400 uppercase tracking-wider"
                  >
                    NAME *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name or creator handle"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121217] border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-body text-sm transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-xs text-zinc-400 uppercase tracking-wider"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@creator.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121217] border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-body text-sm transition-colors"
                  />
                </div>

                {/* Row: Project Type & Optional Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-project-type"
                      className="font-mono text-xs text-zinc-400 uppercase tracking-wider"
                    >
                      PROJECT TYPE
                    </label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#121217] border border-zinc-800 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-body text-sm transition-colors"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#121217] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-budget"
                      className="font-mono text-xs text-zinc-400 uppercase tracking-wider"
                    >
                      BUDGET RANGE (OPTIONAL)
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#121217] border border-zinc-800 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-body text-sm transition-colors"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} className="bg-[#121217] text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-details"
                    className="font-mono text-xs text-zinc-400 uppercase tracking-wider"
                  >
                    PROJECT DETAILS & FOOTAGE DESCRIPTION *
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your footage, turnaround deadlines, inspiration links, or desired style..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#121217] border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-body text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setCursorMode('open', 'SEND')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="mt-2 w-full py-4 rounded-xl bg-red-600 hover:bg-[#ff1e27] text-white font-display text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(229,9,20,0.4)] active:scale-[0.99] disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'TRANSMITTING BRIEF...' : 'SEND PROJECT BRIEF →'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Channels & WhatsApp CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-8 rounded-2xl bg-[#0c0c10] border border-zinc-800/80 flex flex-col gap-6">
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest">
                DIRECT COMMUNICATION
              </span>

              {/* Instant WhatsApp CTA Button */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorMode('open', 'CHAT')}
                onMouseLeave={() => setCursorMode('default')}
                className="p-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-600/50 hover:border-emerald-500 flex items-center justify-between transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display text-xs font-bold text-white uppercase tracking-wider">
                      CHAT ON WHATSAPP
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400">
                      Discuss your footage in real-time
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  OPEN →
                </span>
              </a>

              {/* Direct Email with Copy button */}
              <div className="p-4 rounded-xl bg-[#121217] border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">
                      PRIMARY EMAIL
                    </span>
                    <span className="font-mono text-sm text-white font-semibold">
                      {EDITOR_CONFIG.email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels */}
              <div>
                <span className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-3">
                  CHANNELS & PLATFORMS
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Instagram', icon: Instagram, href: EDITOR_CONFIG.instagram, handle: '@bilalali.edits' },
                    { label: 'YouTube', icon: Youtube, href: EDITOR_CONFIG.youtube, handle: 'Bilal Ali Edits' },
                    { label: 'TikTok', icon: MessageSquare, href: EDITOR_CONFIG.tiktok, handle: '@bilaledits' },
                    { label: 'LinkedIn', icon: Linkedin, href: EDITOR_CONFIG.linkedin, handle: 'Bilal Ali' },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-[#121217] border border-zinc-800/80 flex items-center gap-2.5 hover:border-red-600/60 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-red-500" />
                        <div className="flex flex-col">
                          <span className="font-display text-xs font-bold text-white">
                            {social.label}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400">
                            {social.handle}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Turnaround Guarantee */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-[#0c0c10] border border-red-900/40 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-red-400 uppercase tracking-wider font-semibold">
                  {EDITOR_CONFIG.availabilityStatus}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  TURNAROUND: {EDITOR_CONFIG.turnaroundEstimate}
                </span>
              </div>
              <p className="font-body text-xs text-zinc-300 leading-relaxed">
                Accepting new creator reels, brand campaigns, and agency post-production retainers. All projects receive deliberate pacing, sound design, and color grading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
