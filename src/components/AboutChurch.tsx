import Image from "next/image";

function AboutChurch() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/congregation.jpeg"
              alt="Church congregation"
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              A Quick Intro to Trinity International Bible Church
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Trinity International Bible Church is an evangelical assembly
              adhering to historic Bible teaching, with members and visitors
              from many continents, but with one common faith in Jesus Christ.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("statement");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    inline: "nearest",
                  });
                }
              }}
              className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 transform hover:scale-105"
            >
              What we believe
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AboutChurch };
