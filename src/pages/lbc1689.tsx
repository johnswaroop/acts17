import { Nav } from "@/components/Nav";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import lbc1689Data from "../lbc1689.json";
import type { LBC1689Data, Chapter } from "../types/lbc1689";

const sections = Object.entries(lbc1689Data.chapters).map(
  ([id, chapter]: [string, Chapter], index) => ({
    id,
    title: chapter.title,
    number: index + 1,
  })
);

function Icon({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-[#084427] to-[#0a5533] rounded-full p-2 sm:p-3 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl ${className}`}
    >
      <svg
        className="h-5 w-5 sm:h-7 sm:w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="white"
      >
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"></path>
      </svg>
    </div>
  );
}

function LBC1689() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f7f7f7]">
      <Nav />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#084427] origin-left z-50"
        style={{ scaleX }}
      />
      <main className="w-full">
        {/* Hero Section */}
        <section
          className="relative h-[400px] sm:h-[600px] bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: "url('/bg-statement.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center h-full pt-16 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-wide mb-6 text-center">
                {lbc1689Data.title}
              </h1>
              <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#084427] to-[#0a5533] rounded-full mx-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-white/90 text-lg sm:text-xl max-w-2xl text-center"
            >
              A comprehensive statement of our church&apos;s theological
              convictions
            </motion.div>
          </motion.div>
        </section>

        {/* Mobile Table of Contents Button */}
        <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-800 font-medium">Table of Contents</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {/* Mobile Table of Contents */}
          <motion.nav
            initial={false}
            animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
            className="overflow-hidden bg-white/80 backdrop-blur-sm border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {sections.map(({ id, title, number }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === id
                      ? "bg-[#084427] text-white shadow-md"
                      : "hover:bg-[#084427]/10"
                  }`}
                >
                  <span className="font-medium mr-2">{number}.</span>
                  {title}
                </a>
              ))}
            </div>
          </motion.nav>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Desktop Table of Contents */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-64 p-6 hidden lg:block overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contents
            </h3>
            <nav className="space-y-2">
              {sections.map(({ id, title, number }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block py-2 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === id
                      ? "bg-[#084427] text-white shadow-md"
                      : "hover:bg-[#084427]/10"
                  }`}
                >
                  <span className="font-medium mr-2">{number}.</span>
                  {title}
                </a>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Introduction Section */}
            <section className="bg-white py-12 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 sm:mb-8 font-serif italic">
                  The 1689 London Baptist Confession of Faith emerged from a
                  pivotal moment in church history, as Particular Baptists in
                  England sought to articulate their theological convictions in
                  the aftermath of the English Civil War and the Act of
                  Toleration.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  First published in 1689, this confession was largely based on
                  the Westminster Confession of Faith (1646) and the Savoy
                  Declaration (1658), but with significant modifications to
                  reflect Baptist distinctives. It was adopted by the Particular
                  Baptists of England and Wales, becoming a foundational
                  document that continues to shape Reformed Baptist theology to
                  this day.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
                  This historic confession represents our church&apos;s
                  commitment to the rich theological heritage of the Reformed
                  Baptist tradition, particularly emphasizing the doctrines of
                  grace, believer&apos;s baptism, and congregational church
                  government.
                </p>
              </motion.div>
            </section>

            {/* Statements Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
              <div className="space-y-16 sm:space-y-24">
                {Object.entries(lbc1689Data.chapters).map(
                  ([id, chapter], index) => (
                    <motion.article
                      key={id}
                      id={id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="statement-article group scroll-mt-24"
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0 pt-1">
                          <Icon />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                            <span className="font-medium mr-2">
                              {sections.find((s) => s.id === id)?.number}.
                            </span>
                            {chapter.title}
                          </h2>
                          <div className="prose prose-base sm:prose-lg text-gray-700 prose-headings:text-gray-900 prose-a:text-[#084427] hover:prose-a:text-[#0a5533] max-w-none">
                            {Object.entries(chapter.paragraphs).map(
                              ([paraId, text]) => (
                                <p
                                  key={paraId}
                                  className="leading-relaxed mb-6 text-lg"
                                >
                                  {text}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LBC1689;
