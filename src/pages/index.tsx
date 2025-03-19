import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Nav } from "../components/Nav";
import { Worshiptimes } from "../components/Worshiptimes";
import { AboutChurch } from "../components/AboutChurch";
import RecentSermons from "../components/RecentSermons";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";
import { Contact } from "../components/Contact";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <div className={`flex w-full flex-col ${montserrat.variable} font-sans`}>
      {/* Hero Section */}
      <section
        className="relative h-screen w-full overflow-hidden"
        ref={heroRef}
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <Image
            src="/bible.jpg"
            alt="Bible background"
            fill
            className="object-cover"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"
            style={{ opacity: heroOpacity }}
          />
        </motion.div>

        <Nav />

        <motion.div
          className="relative h-full flex items-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <motion.div className="mb-8" variants={fadeInUp}>
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wide mb-4">
                  Welcome to
                </span>
                <h2 className="text-xl sm:text-2xl text-white/90 font-medium tracking-normal">
                  Trinity International Bible Church, Athens, Greece
                </h2>
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
                variants={fadeInUp}
              >
                We preach Christ and Him crucified
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl text-white/90 font-medium tracking-normal mb-8"
                variants={fadeInUp}
              >
                Join us on Sunday @ 10 AM
              </motion.p>
              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById("worship-times");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                    });
                  }
                }}
                className="bg-white text-primary hover:bg-white/90 text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Directions & Worship Times
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center text-white/80">
            <span className="text-sm font-medium tracking-wider mb-2">
              Scroll
            </span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="w-full">
        <motion.section
          id="worship-times"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white"
        >
          <Worshiptimes />
        </motion.section>

        <motion.section
          id="sermons"
          className="py-20 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <RecentSermons />
        </motion.section>

        <motion.section
          id="about"
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AboutChurch />
        </motion.section>

        <motion.section
          id="statement"
          className="py-20 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Faqs />
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Contact />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
