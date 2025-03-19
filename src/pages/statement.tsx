import { Nav } from "@/components/Nav";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

const sections = [
  { id: "scriptures", title: "Holy Scriptures" },
  { id: "god", title: "True God" },
  { id: "christ", title: "Jesus Christ" },
  { id: "man", title: "Man" },
  { id: "salvation", title: "Way of Salvation" },
  { id: "church", title: "Church" },
  { id: "future", title: "World to Come" },
];

function Icon({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-[#084427] to-[#0a5533] rounded-full p-1.5 sm:p-2.5 shadow-lg transform transition-transform duration-300 hover:scale-110 ${className}`}
    >
      <svg
        className="h-4 w-4 sm:h-6 sm:w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="white"
      >
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"></path>
      </svg>
    </div>
  );
}

function Statement() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center h-full pt-16 px-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-wide mb-6 text-center">
              Statement of Faith
            </h1>
            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#084427] to-[#0a5533] rounded-full" />
          </motion.div>
        </section>

        {/* Mobile Table of Contents Button */}
        <div className="lg:hidden sticky top-0 z-40 bg-white shadow-sm">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-left"
          >
            <span className="text-gray-800 font-medium">Table of Contents</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
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
            className="overflow-hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {sections.map(({ id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === id
                      ? "bg-[#084427] text-white"
                      : "hover:bg-[#084427]/10"
                  }`}
                >
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
            className="lg:sticky lg:top-24 lg:h-screen lg:w-64 p-6 hidden lg:block"
          >
            <nav className="space-y-2">
              {sections.map(({ id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block py-2 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === id
                      ? "bg-[#084427] text-white"
                      : "hover:bg-[#084427]/10"
                  }`}
                >
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
                  There is no Statement of Faith that can replace the inspired,
                  authoritative and sufficient Holy Scriptures. Anything written
                  by uninspired men, even the best and holiest of men, is not
                  binding upon man&apos;s conscience and not to be believed
                  without due searching and comparison with the Word of God.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  However, a Statement of Faith serves as a summary of the main
                  doctrinal beliefs that shape the theology of the church. Our
                  theology is most accurately reflected in the{" "}
                  <Link
                    href="/lbc1689"
                    className="text-[#084427] hover:text-[#0a5533] underline"
                  >
                    2nd London Baptist Confession of Faith of 1689
                  </Link>
                  . Our Statement of Faith is below.
                </p>
              </motion.div>
            </section>

            {/* Statements Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
              <div className="space-y-16 sm:space-y-24">
                {/* Holy Scriptures */}
                <motion.article
                  id="scriptures"
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
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 group-hover:text-[#084427] transition-colors">
                        Of the Holy Scriptures
                      </h2>
                      <div className="prose prose-base sm:prose-lg text-gray-700 prose-headings:text-gray-900 prose-a:text-[#084427] hover:prose-a:text-[#0a5533] max-w-none">
                        <p className="leading-relaxed">
                          We believe the Bible, consisting of the sixty-six
                          books of the Old and New Testaments, is the revelation
                          of God and was written by men who were prepared and
                          superintended by the Holy Spirit. We believe the Bible
                          is without error in the original manuscripts and is
                          our final and infallible authority in all matters of
                          faith and conduct. Since the Bible is the very words
                          of God, it does not rely upon any church, council, or
                          creed for its authority.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* True God */}
                <motion.article
                  id="god"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="statement-article group scroll-mt-24"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                        Of the True God
                      </h2>
                      <div className="prose prose-lg text-gray-700">
                        <p className="leading-relaxed">
                          We believe there is one true, eternal and unchanging
                          God who is three distinct but equal persons: the
                          Father, the Son and the Holy Spirit. He is the
                          Creator, Preserver and Lord of the universe and
                          governs all things according to His sovereign will for
                          His own glory.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Jesus Christ */}
                <motion.article
                  id="christ"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="statement-article group scroll-mt-24"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                        Of Jesus Christ
                      </h2>
                      <div className="prose prose-lg text-gray-700">
                        <p className="leading-relaxed">
                          We believe that Jesus Christ is both truly God and
                          truly man. We believe in His virgin birth, His sinless
                          life, His death on the cross as the only
                          substitutionary sacrifice for our sins, His bodily
                          resurrection, His ascension to heaven where He rules
                          over all things, and His personal return in power and
                          glory.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Man */}
                <motion.article
                  id="man"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="statement-article group scroll-mt-24"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                        Of Man
                      </h2>
                      <div className="prose prose-lg text-gray-700">
                        <p className="leading-relaxed">
                          We believe that Man was created in the image of God to
                          glorify Him. However, Man rebelled against his Creator
                          and fell into a state of sin. As a result, every
                          aspect of human nature was corrupted, and Man became
                          spiritually dead, alienated from God, and incapable of
                          saving himself. Man is at enmity with God, justly
                          condemned, and thus in need of forgiveness and
                          reconciliation with God.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Way of Salvation */}
                <motion.article
                  id="salvation"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="statement-article group scroll-mt-24"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                        Of the Way of Salvation
                      </h2>
                      <div className="prose prose-lg text-gray-700">
                        <p className="leading-relaxed">
                          We believe that God, in His love, grace and mercy,
                          reconciles sinners to Himself through the sacrificial
                          death of Jesus Christ on the cross. Those who repent
                          from sin and turn to God in faith are forgiven,
                          adopted into God&apos;s family and given eternal life.
                          Salvation is by grace alone, through faith alone, in
                          Christ alone, according to the Holy Scriptures alone,
                          for the praise and glory of God alone.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Church */}
                <motion.article
                  id="church"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="statement-article group scroll-mt-24"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                        Of the Church
                      </h2>
                      <div className="prose prose-lg text-gray-700">
                        <p className="leading-relaxed">
                          We believe that the one universal church, the body of
                          Christ, of which each local church is a visible
                          expression, consists of all true believers born again
                          by the Holy Spirit. As a fellowship of believers, the
                          church is called to worship God, grow in the grace and
                          knowledge of Him, and bear witness to Christ and His
                          kingdom throughout the world.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* World to Come */}
                <motion.article
                  id="future"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="statement-article group scroll-mt-24"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 group-hover:text-[#084427] transition-colors">
                        Of the World to Come
                      </h2>
                      <div className="prose prose-lg text-gray-700">
                        <p className="leading-relaxed">
                          We believe that the Lord Jesus Christ will return
                          personally and visibly, to raise the dead and bring to
                          completion His work of salvation and judgment.
                          Believers will be welcomed into the presence of God
                          forever, while unbelievers will suffer eternal
                          punishment in separation from God.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Statement;
