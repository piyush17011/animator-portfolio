import React from "react";
import { motion } from "framer-motion";

const SOCIALS = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dim px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-platinum">
            O<span className="text-ember">B</span>
          </span>
          <span className="font-mono text-xs text-slate">
            © {year} Omkar Bane. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-8">
          {SOCIALS.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate hover:text-ember transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
