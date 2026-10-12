import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  defaultMessage,
}) => {
  const settings = useSiteSettings();
  const effectivePhoneNumber = phoneNumber ?? settings?.whatsapp_number;
  const effectiveDefaultMessage = defaultMessage ?? settings?.whatsapp_default_message;
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    '🏡 Schedule an Atelier Visit',
    '📐 Share Architectural Plans & Brief',
    '✨ Inquire About Residential Villa Design',
    '🏢 Commercial / Workspace Consultation',
  ];

  const handleSend = (text?: string) => {
    if (!effectivePhoneNumber || !effectiveDefaultMessage) return;
    const messageToSend = encodeURIComponent(text || customMsg || effectiveDefaultMessage);
    const url = `https://wa.me/${effectivePhoneNumber}?text=${messageToSend}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomMsg('');
  };

  if (!effectivePhoneNumber || !effectiveDefaultMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* WhatsApp Interactive Drawer / Modal Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[340px] sm:w-[380px] bg-[#141311] border border-[#C8A97E]/30 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(200, 169, 126, 0.1)',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#181715] to-[#1F1E1B] p-5 border-b border-[#F5F2EC]/10 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[#8E8A82] hover:text-[#F5F2EC] p-1.5 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#11110F] border border-[#C8A97E]/50 flex items-center justify-center p-2 text-[#25D366]">
                    {/* WhatsApp Icon */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.05 3.67C16.58 3.67 20.28 7.37 20.28 11.92C20.28 16.46 16.58 20.17 12.05 20.17C10.57 20.17 9.15 19.77 7.91 19.03L7.43 18.75L4.31 19.57L5.14 16.53L4.83 16.03C4.02 14.75 3.59 13.27 3.59 11.91C3.6 7.37 7.3 3.67 12.05 3.67M9.23 7.08C9.07 7.08 8.81 7.14 8.59 7.38C8.37 7.62 7.74 8.21 7.74 9.42C7.74 10.63 8.62 11.8 8.74 11.96C8.86 12.12 10.47 14.61 12.93 15.67C13.51 15.93 13.97 16.08 14.33 16.2C14.91 16.38 15.43 16.35 15.85 16.29C16.32 16.22 17.29 15.7 17.49 15.13C17.7 14.56 17.7 14.08 17.64 13.98C17.58 13.88 17.41 13.82 17.16 13.69C16.91 13.57 15.68 12.96 15.45 12.88C15.22 12.8 15.06 12.76 14.9 13C14.74 13.24 14.28 13.82 14.14 13.98C14 14.14 13.86 14.16 13.61 14.04C13.36 13.92 12.56 13.65 11.61 12.8C10.87 12.14 10.37 11.33 10.23 11.08C10.09 10.83 10.21 10.7 10.34 10.58C10.45 10.47 10.59 10.29 10.72 10.14C10.85 9.99 10.89 9.87 10.97 9.71C11.05 9.55 11.01 9.41 10.95 9.29C10.89 9.17 10.43 8.04 10.24 7.58C10.05 7.14 9.86 7.2 9.72 7.2L9.23 7.08Z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#141311] rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#F5F2EC] flex items-center space-x-1.5">
                    <span className="font-brand">Manvvi Design Studio</span>
                    <Sparkles className="w-3 h-3 text-[#C8A97E]" />
                  </h4>
                  <p className="text-[11px] text-[#25D366] font-medium flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                    <span>Direct Atelier Line · Online</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 bg-[#11110F]">
              <div className="bg-[#191816] border border-[#F5F2EC]/10 p-3.5 rounded-xl space-y-1">
                <p className="text-xs text-[#8E8A82]">Principal Architect Consultation:</p>
                <p className="text-sm text-[#F5F2EC] font-serif leading-snug">
                  "Welcome. Share your vision, site blueprints, or schedule a studio visit directly with us."
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] font-medium">Quick Inquiries</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="text-left text-xs px-3 py-1.5 bg-[#181715] hover:bg-[#C8A97E]/15 border border-[#F5F2EC]/10 hover:border-[#C8A97E]/50 text-[#F5F2EC]/85 hover:text-[#F5F2EC] rounded-lg transition-all duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="pt-1">
                <div className="flex items-center space-x-2 bg-[#181715] border border-[#F5F2EC]/15 rounded-xl px-3 py-2 focus-within:border-[#C8A97E] transition-colors">
                  <input
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-xs text-[#F5F2EC] placeholder-[#8E8A82] focus:outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    className="p-1.5 bg-[#C8A97E] hover:bg-[#D4BA92] text-[#11110F] rounded-lg transition-colors"
                    aria-label="Send WhatsApp message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-1 text-center">
                <button
                  onClick={() => handleSend()}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#22bf5b] text-[#11110F] text-xs uppercase tracking-[0.15em] font-medium rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 font-sans"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center space-x-3 bg-gradient-to-r from-[#181715] to-[#24221D] border border-[#C8A97E]/60 hover:border-[#C8A97E] text-[#F5F2EC] pl-3.5 pr-4 py-3 rounded-full shadow-2xl transition-all duration-300 overflow-hidden"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(200, 169, 126, 0.25)',
        }}
        aria-label="Contact on WhatsApp"
      >
        {/* Ambient background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/10 via-transparent to-[#C8A97E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* WhatsApp Icon with Status Dot */}
        <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-[#11110F] shadow-md shadow-[#25D366]/40 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.05 3.67C16.58 3.67 20.28 7.37 20.28 11.92C20.28 16.46 16.58 20.17 12.05 20.17C10.57 20.17 9.15 19.77 7.91 19.03L7.43 18.75L4.31 19.57L5.14 16.53L4.83 16.03C4.02 14.75 3.59 13.27 3.59 11.91C3.6 7.37 7.3 3.67 12.05 3.67M9.23 7.08C9.07 7.08 8.81 7.14 8.59 7.38C8.37 7.62 7.74 8.21 7.74 9.42C7.74 10.63 8.62 11.8 8.74 11.96C8.86 12.12 10.47 14.61 12.93 15.67C13.51 15.93 13.97 16.08 14.33 16.2C14.91 16.38 15.43 16.35 15.85 16.29C16.32 16.22 17.29 15.7 17.49 15.13C17.7 14.56 17.7 14.08 17.64 13.98C17.58 13.88 17.41 13.82 17.16 13.69C16.91 13.57 15.68 12.96 15.45 12.88C15.22 12.8 15.06 12.76 14.9 13C14.74 13.24 14.28 13.82 14.14 13.98C14 14.14 13.86 14.16 13.61 14.04C13.36 13.92 12.56 13.65 11.61 12.8C10.87 12.14 10.37 11.33 10.23 11.08C10.09 10.83 10.21 10.7 10.34 10.58C10.45 10.47 10.59 10.29 10.72 10.14C10.85 9.99 10.89 9.87 10.97 9.71C11.05 9.55 11.01 9.41 10.95 9.29C10.89 9.17 10.43 8.04 10.24 7.58C10.05 7.14 9.86 7.2 9.72 7.2L9.23 7.08Z" />
          </svg>
        </div>

        {/* Text and Pulse Indicator */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-medium tracking-wide text-[#F5F2EC]">WhatsApp Studio</span>
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          </div>
          <span className="text-[10px] text-[#C8A97E] tracking-wider font-light">Online · Quick Response</span>
        </div>
      </motion.button>
    </div>
  );
};
