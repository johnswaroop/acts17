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

const faqsList = [
  {
    question: "What should I expect during a Sunday service?",
    answers:
      "Our Sunday services are centered around the expository preaching of God's Word. You'll experience reverent worship through hymns and spiritual songs, prayer, Scripture reading, and fellowship with believers from various backgrounds.",
  },
  {
    question: "Is there a dress code?",
    answers:
      "While we don't have a strict dress code, we encourage modest and respectful attire suitable for worship. Most attendees dress in smart casual to semi-formal wear.",
  },
  {
    question: "Are there programs for children?",
    answers:
      "Yes, we have age-appropriate Sunday School classes and nursery care available during our main service. Our children's ministry focuses on teaching Biblical truths in an engaging way.",
  },
  {
    question: "Do you have Bible studies during the week?",
    answers:
      "Yes, we offer various Bible study groups throughout the week, including our main Wednesday evening Bible study. These provide opportunities for deeper study and fellowship.",
  },
  {
    question: "How can I get involved in serving?",
    answers:
      "There are many opportunities to serve within our church community, including worship teams, children's ministry, outreach events, and more. We encourage you to speak with a ministry leader or pastor to find where your gifts can best be used.",
  },
  {
    question: "What mission and outreach activities do you support?",
    answers:
      "Our church is actively involved in local and global missions, supporting missionaries, engaging in community service, and partnering with organizations to spread the Gospel and serve the needy.",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="space-y-6">
            {faqsList.slice(0, 3).map((faq, idx) => (
              <Item
                key={idx}
                question={faq.question}
                answer={faq.answers}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                index={idx}
              />
            ))}
          </div>
          <div className="space-y-6">
            {faqsList.slice(3).map((faq, idx) => (
              <Item
                key={idx + 3}
                question={faq.question}
                answer={faq.answers}
                isOpen={openIndex === idx + 3}
                onToggle={() =>
                  setOpenIndex(openIndex === idx + 3 ? null : idx + 3)
                }
                index={idx + 3}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Faqs };
