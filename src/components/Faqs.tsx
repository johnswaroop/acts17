import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const Item = ({ question, answer, isOpen, onToggle, index }: ItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-xl font-semibold text-gray-900 pr-8">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg
            className="h-6 w-6 text-primary"
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
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6">
              <div className="h-px w-full bg-gray-200 mb-6" />
              <p className="text-lg text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const faqs = [
  {
    question: "What should I expect when I visit?",
    answer:
      "When you visit Trinity International Bible Church, you'll be warmly welcomed into our community. Our service begins with worship through song, followed by the preaching of God's Word. After the service, we have a time of fellowship where you can meet other members of our church family. We're a diverse congregation from various backgrounds, united by our faith in Christ.",
  },
  {
    question: "What is the dress code?",
    answer:
      "We welcome everyone to come as they are. While some members dress in their Sunday best, others come in more casual attire. The most important thing is that you're comfortable and feel welcome to worship with us.",
  },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            More About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our church, services, and
            ways to get involved in our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <Item
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Faqs };
