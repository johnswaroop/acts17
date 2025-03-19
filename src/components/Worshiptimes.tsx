import React from "react";
import Image from "next/image";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const churchSchedule = [
  {
    day: "Sunday Mornings",
    events: [
      { name: "English Worship Service", time: "10:00 am" },
      {
        name: "Greek Worship Service",
        subtext: "with the 3rd Greek Evangelical Church",
        time: "11:15 am",
      },
    ],
  },

  {
    day: "Thursday Evenings",
    events: [
      {
        name: "English Bible Study",
        time: "7:30 pm",
        subtext: "(Zoom link available)",
      },
    ],
  },
];
// mix-blend-mode: multiply;
export function Worshiptimes() {
  return (
    <section id="worship-times" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Church Info */}
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/brown-logo.png"
                alt="Trinity Church Logo"
                width={140}
                height={140}
                className="object-contain mb-8"
              />
              <h2 className="text-5xl sm:text-6xl font-bold text-[#1a1a1a]">
                Worship Times
              </h2>
            </div>

            {/* Location Info */}
            <div className="flex flex-col items-center text-center space-y-4">
              <FaMapMarkerAlt className="w-8 h-8 text-[#084428]" />
              <div className="space-y-2">
                <p className="text-xl text-[#4a4a4a]">
                  Chelntrech 37, Athina 117 45
                </p>
                <p className="text-xl text-[#4a4a4a]">
                  Building of the 3rd Greek Evangelical Church
                </p>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  window.open(
                    "https://maps.app.goo.gl/EbXZGBmCVgB5M6N19",
                    "_blank"
                  );
                }}
                className="inline-flex items-center px-8 py-4 bg-[#084428] text-white text-xl font-semibold rounded-lg hover:bg-[#084428]/90 transition-all duration-300"
              >
                Get Directions
                <FaMapMarkerAlt className="ml-3 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div className="space-y-12">
            {churchSchedule.map((slot, idx) => (
              <div key={"day" + idx} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FaCalendarCheck className="w-8 h-8 text-[#084428]" />
                  <h3 className="text-3xl font-bold text-[#1a1a1a]">
                    {slot.day}
                  </h3>
                </div>
                <div className="space-y-6 pl-12">
                  {slot.events.map((evt, idx) => (
                    <div key={"event" + idx} className="space-y-1">
                      <div className="flex items-center">
                        <FaClock className="w-6 h-6 text-[#4a4a4a] mr-3" />
                        <span className="text-xl font-medium text-[#1a1a1a]">
                          {evt.name}
                        </span>
                        <span className="text-xl text-[#4a4a4a] ml-3">
                          · {evt.time}
                        </span>
                      </div>
                      {evt?.subtext && (
                        <p className="text-lg text-[#6b6b6b] pl-9">
                          {evt.subtext}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
