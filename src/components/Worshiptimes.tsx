import React from "react";
import { FaCalendarCheck } from "react-icons/fa6";

const churchSchedule = [
  {
    day: "Sunday Mornings",
    events: [
      { name: "Sunday School", time: "9:00 am" },
      { name: "Corporate Worship", time: "10:20 am" },
      { name: "Livestream", time: "10:20 am" },
    ],
  },
  {
    day: "Online Livestream",
    events: [{ name: "Livestream", time: "10:20 am" }],
  },
  {
    day: "Wednesday Nights",
    events: [
      { name: "Wednesday Night Dinner", time: "5:00 pm" },
      { name: "AWANA", time: "5:45 pm" },
      { name: "Youth & Adult Bible Studies", time: "6:00 pm" },
    ],
  },
];

export function Worshiptimes() {
  return (
    <div
      id="worship-times"
      className="flex w-full h-full bg-white justify-center"
    >
      <div className="h-fit w-full max-w-[1700px] flex bg-white py-[4vw] items-center justify-evenly">
        <div className="flex flex-col">
          <div className="flex gap-4 invert">
            <img className="w-32 " src="/logo6.png" alt="" />
            <span className="flex flex-col text-white font-bold text-2xl">
              <h1 className="text-5xl tracking-widest uppercase">Trinity </h1>
              <h1 className="text-base">International Bible Church</h1>
            </span>
          </div>
          <h1 className="text-2xl text-black font-semibold mt-4">
            Worship Times
          </h1>
          <p className="text-l text-black">
            2801 S SE Loop 323 Tyler, TX 75701
          </p>
          <button
            onClick={() => {
              window.open(
                "https://maps.app.goo.gl/EbXZGBmCVgB5M6N19",
                "_blank"
              );
            }}
            className="uppercase rounded-xl mt-6 bg-primary border-primary text-white text-xl p-4 px-6 w-fit font-medium"
          >
            Get Directions
          </button>
        </div>
        <div className="flex flex-col gap-12">
          {churchSchedule.map((slot, idx) => {
            return (
              <span className="flex items-start gap-6" key={"day" + idx}>
                <FaCalendarCheck color="#0F1E22" size={"2em"} />
                <h1 className="text-3xl text-black font-semibold">
                  {slot.day}
                  <span className="text-base gap-2 flex flex-col mt-3">
                    {slot.events.map((evt, idx) => {
                      return (
                        <p className="text-black" key={"idx" + evt.name}>
                          <strong>{evt.time}</strong> - {evt.name}
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
