import React, { useState } from "react";
import { Mail, MapPin, Send, Globe, CheckCircle, AlertCircle, Phone, Youtube, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadVCF = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:2.1",
      "FN:Kiran Kumar K",
      "N:K;Kiran;Kumar;;",
      "ORG:InvisionXR Studios Pvt Ltd",
      "TITLE:CEO",
      "TEL;CELL;VOICE:+91 9502206655",
      "TEL;WORK;VOICE:+91 9492779885",
      "EMAIL;PREF;INTERNET:kiran.k@invisionxrstudios.com",
      "EMAIL;INTERNET:kirankudupudi@gmail.com",
      "ADR;WORK;CHARSET=UTF-8:;;Nizampet;Hyderabad;;;India",
      "URL:https://www.artstation.com/kiranprince9297",
      "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Kiran_Kumar_K_Contact.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    // Simulate API delivery
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-theme-bg border-t border-theme-border/40 relative transition-colors duration-500 overflow-hidden">
      <div className="stark-hex transition-opacity duration-700" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/25 text-theme-primary text-xs font-semibold tracking-wider uppercase mb-4 transition-all duration-350">
            <Mail size={14} />
            Let's Connect
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Start a <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">New Collaboration</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl">
            Whether you want to discuss full-time art direction roles, 3D/VR consultation, or generative AI pipeline design, feel free to reach out.
          </p>
        </div>

        {/* Form & Channels Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Info details & links */}
          <div className="lg:col-span-5 space-y-8 text-left" id="contact-info-panel">
            
            {/* Digital Business Card */}
            <div className="p-1 rounded-2xl bg-gradient-to-br from-theme-primary/30 to-theme-secondary/30 aspect-[1.8/1] w-full max-w-sm mb-4 shadow-2xl relative overflow-hidden group transition-all duration-500">
              <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:bg-[#000000]/65"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-theme-primary to-theme-secondary"></div>
              <div className="relative p-6 flex flex-col justify-between h-full z-10 w-full">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-xl font-bold font-sans text-white tracking-wide">Kiran Kumar K</h3>
                    <p className="text-xs font-mono font-semibold text-theme-primary uppercase tracking-widest mt-1">CEO @ InvisionXRStudios</p>
                  </div>
                  <button
                    onClick={handleDownloadVCF}
                    title="Download vCard (.vcf) directly"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-primary/10 hover:bg-theme-primary/25 border border-theme-primary/35 text-theme-primary text-[10px] font-extrabold uppercase font-mono tracking-wider cursor-pointer shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Save vCard
                  </button>
                </div>
                
                <div className="space-y-2.5 mt-auto">
                    <div className="flex items-center gap-2.5 text-gray-300 text-xs">
                        <Phone size={12} className="text-gray-500" />
                        <span className="font-mono">+91 9502206655</span>
                        <span className="text-gray-600">|</span>
                        <span className="font-mono">+91 9492779885</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-300 text-xs">
                        <Mail size={12} className="text-gray-500" />
                        <span className="font-mono text-[9px] sm:text-xs">kiran.k@invisionxrstudios.com</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-300 text-xs">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="font-sans">Hyderabad, India</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Quick Contact CTA Integration */}
            <button
              onClick={handleDownloadVCF}
              className="w-full max-w-sm py-3.5 rounded-xl bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] hover:from-[var(--theme-button-hover-from)] hover:to-[var(--theme-button-hover-to)] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer mb-6"
              style={{
                boxShadow: "0 4px 15px rgba(var(--theme-glow-crimson), 0.2)"
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 11h6m-3-3v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Save Kiran to Contacts (.VCF)
            </button>

            <div className="p-8 rounded-3xl bg-theme-card-bg border border-theme-border space-y-6 transition-all duration-500">
              <h3 className="text-xl font-extrabold text-white font-sans tracking-tight">Contact Information</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                I am located in Hyderabad, India's thriving software, game dev, and CGI center. Available for hybrid/remote leadership engagements and client design workshops worldwide.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-theme-border/60">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-black/45 border border-theme-border/40 text-theme-primary">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] uppercase tracking-widest text-gray-550 font-mono font-bold">Email Addresses</div>
                    <a href="mailto:kiran.k@invisionxrstudios.com" className="text-sm font-semibold text-white hover:text-theme-primary transition-colors break-all">
                      kiran.k@invisionxrstudios.com
                    </a>
                    <a href="mailto:kirankudupudi@gmail.com" className="text-sm font-semibold text-gray-400 hover:text-theme-primary transition-colors break-all">
                      kirankudupudi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-black/45 border border-theme-border/40 text-theme-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-550 font-mono font-bold">Location</div>
                    <div className="text-sm font-semibold text-white">Nizampet, Hyderabad, India</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-black/45 border border-theme-border/40 text-theme-primary">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] uppercase tracking-widest text-gray-550 font-mono font-bold">Phone Numbers</div>
                    <a href="tel:+919502206655" className="text-sm font-semibold text-white hover:text-theme-primary transition-colors">
                      +91 9502206655
                    </a>
                    <a href="tel:+919492779885" className="text-sm font-semibold text-gray-400 hover:text-theme-primary transition-colors">
                      +91 9492779885
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-black/45 border border-theme-border/40 text-theme-primary">
                    <Globe size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-550 font-mono font-bold">Time Zone</div>
                    <div className="text-sm font-semibold text-white">IST (UTC +5:30)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels card */}
            <div className="p-8 rounded-3xl bg-theme-card-bg border border-theme-border space-y-4 transition-all duration-500">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-mono">Digital Showcase</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.artstation.com/kiranprince9297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-black/35 border border-theme-border text-gray-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300"
                >
                  <Globe size={14} className="text-theme-primary" />
                  ArtStation
                </a>
                <a
                  href="https://www.linkedin.com/in/kiran-kudupudi-b69a6928/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-black/35 border border-theme-border text-gray-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300"
                >
                  <Linkedin size={14} className="text-[#0077b5]" />
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@kirangameartist9297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-black/35 border border-theme-border text-gray-300 hover:text-white flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-300"
                >
                  <Youtube size={14} className="text-[#ff0000]" />
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message validation form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-theme-card-bg border border-theme-border space-y-6 text-left shadow-2xl relative transition-all duration-500 stark-hud" id="contact-message-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-xs font-extrabold uppercase tracking-wider text-gray-450 font-mono">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g., John Doe"
                    disabled={status === "sending" || status === "success"}
                    className="w-full bg-black/35 border border-theme-border focus:border-theme-primary focus:ring-1 focus:ring-theme-primary/35 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-650 outline-none transition"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-xs font-extrabold uppercase tracking-wider text-gray-450 font-mono">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E.g., contact@example.com"
                    disabled={status === "sending" || status === "success"}
                    className="w-full bg-black/35 border border-theme-border focus:border-theme-primary focus:ring-1 focus:ring-theme-primary/35 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-650 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject-input" className="text-xs font-extrabold uppercase tracking-wider text-gray-450 font-mono">
                  Subject
                </label>
                <input
                  id="subject-input"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry Topic"
                  disabled={status === "sending" || status === "success"}
                  className="w-full bg-black/35 border border-theme-border focus:border-theme-primary focus:ring-1 focus:ring-theme-primary/35 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-650 outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message-input" className="text-xs font-extrabold uppercase tracking-wider text-gray-450 font-mono">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project, idea, or role specifications..."
                  disabled={status === "sending" || status === "success"}
                  className="w-full bg-black/35 border border-theme-border focus:border-theme-primary focus:ring-1 focus:ring-theme-primary/35 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-650 outline-none resize-none transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-4">
                {/* Sending Toast Alerts */}
                <div className="w-full sm:w-auto h-8 flex items-center">
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2 text-emerald-400 text-xs font-semibold font-sans bg-emerald-500/10 px-3.5 py-1.5 rounded-lg border border-emerald-500/25"
                        id="form-alert-success"
                      >
                        <CheckCircle size={14} />
                        Message sent successfully!
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2 text-rose-400 text-xs font-semibold font-sans bg-rose-500/10 px-3.5 py-1.5 rounded-lg border border-rose-500/25"
                        id="form-alert-error"
                      >
                        <AlertCircle size={14} />
                        Please check all required fields.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] hover:from-[var(--theme-button-hover-from)] hover:to-[var(--theme-button-hover-to)] text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[170px]"
                  style={{
                    boxShadow: "0 4px 15px rgba(var(--theme-glow-crimson), 0.3)"
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-theme-border/40 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4" id="portfolio-footer">
          <div>© {new Date().getFullYear()} Kiran Kumar K. All rights reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </section>
  );
}
