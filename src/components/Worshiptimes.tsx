import React from "react";
import { FaCalendarCheck } from "react-icons/fa6";

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
    <div
      id="worship-times"
      className="flex w-full h-full bg-white justify-center py-8"
    >
      <div className="h-fit w-full max-w-[1700px] flex bg-white py-[4vw] items-center justify-evenly">
        <div className="flex flex-col">
          <div className="flex gap-4 ">
            <img
              className="w-56 object-contain  "
              src="/brown-logo.png"
              alt=""
            />
          </div>
          <h1 className="text-6xl  font-bold mt-4 text-[#2B2623]">
            Worship Times
          </h1>
          <p className="text-lg text-black mt-4 ">
            Chelntrech 37, Athina 117 45
          </p>
          <p className="text-lg text-black  mt-1">
            Building of the 3rd Greek Evangelical Church
          </p>
          <button
            onClick={() => {
              window.open(
                "https://maps.app.goo.gl/EbXZGBmCVgB5M6N19",
                "_blank"
              );
            }}
            className="uppercase font-bold rounded-xl mt-6 bg-primary border-primary text-white text-xl p-4 px-6 w-fit"
          >
            Get Directions
          </button>
        </div>
        <div className="flex flex-col gap-12">
          {churchSchedule.map((slot, idx) => {
            return (
              <span className="flex items-start gap-6" key={"day" + idx}>
                <FaCalendarCheck color="#0F1E22" size={"2em"} />
                <h1 className="text-3xl text-[#2B2623] font-semibold">
                  {slot.day}
                  <span className="text-base gap-2 flex flex-col mt-3">
                    {slot.events.map((evt, idx) => {
                      return (
                        <p
                          className="text-[#2B2623] flex"
                          key={"idx" + evt.name}
                        >
                          <strong className=" flex w-20 justify-end text-right mr-2">
                            {evt.time}
                          </strong>{" "}
                          -{" "}
                          <span className="ml-2 flex-col">
                            <p> {evt.name}</p>
                            {evt?.subtext && <p>{evt.subtext}</p>}
                          </span>
                        </p>
                      );
                    })}
                  </span>
                </h1>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
