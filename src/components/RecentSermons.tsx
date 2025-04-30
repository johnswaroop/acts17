import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SermonApiResponse {
  id: string;
  title: string;
  preacher_name: string;
  datetime: string;
  description: string;
  stuff: Array<{
    type: string;
    name: string;
    count: string;
    duration: string;
  }>;
}

interface SermonCardProps {
  title: string;
  date: string;
  preacher: string;
  description: string;
  thumbnail: string;
  index: number;
}

// Helper function to extract Vimeo video ID from base64 encoded iframe
const getVimeoThumbnail = (base64String: string): string => {
  try {
    const decodedString = atob(base64String);
    const videoIdMatch = decodedString.match(/video\/(\d+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://vumbnail.com/${videoIdMatch[1]}.jpg`;
    }
    return "/cover.jpg"; // Fallback thumbnail
  } catch (error) {
    console.error("Error decoding Vimeo iframe:", error);
    return "/cover.jpg";
  }
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SermonCard = ({
  title,
  date,
  preacher,
  description,
  thumbnail,
  index,
}: SermonCardProps) => {
  return (
    <motion.div
      onClick={() =>
        (window.location.href = `https://actsseventeen.com/sermons/${title.replace(
          /\s+/g,
          "-"
        )}`)
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 group-hover:from-black/50 group-hover:to-black/70 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium"
          >
            Watch Now
          </motion.button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{preacher}</p>
        <p className="text-gray-600 line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

function RecentSermons() {
  const [sermons, setSermons] = useState<SermonCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch(
          "https://actsseventeen.com/wp-json/customapi/v1/latest-sermons"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sermons");
        }
        const data: SermonApiResponse[] = await response.json();

        // Transform the data and take only the first 3 sermons
        const transformedSermons = data.slice(0, 3).map((sermon, index) => {
          const vimeoItem = sermon.stuff.find((item) => item.type === "code");
          const thumbnail = vimeoItem
            ? getVimeoThumbnail(vimeoItem.name)
            : "/cover.jpg";

          return {
            title: sermon.title,
            date: formatDate(sermon.datetime),
            preacher: sermon.preacher_name,
            description: sermon.description,
            thumbnail,
            index,
          };
        });

        setSermons(transformedSermons);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-primary hover:text-primary/80"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Recent Sermons
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
            Listen to God&apos;s Word being preached at Trinity International
            Bible Church
          </p>
        </motion.div>

        {/* Sermon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sermons.map((sermon, index) => (
            <SermonCard key={sermon.title} {...sermon} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() =>
              (window.location.href = "https://actsseventeen.com/sermons")
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            View All Sermons
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default RecentSermons;
