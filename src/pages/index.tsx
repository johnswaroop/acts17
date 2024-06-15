import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Nav } from "../components/Nav";
import { Worshiptimes } from "../components/Worshiptimes";
import { AboutChurch } from "../components/AboutChurch";
import { RecentSermons } from "../components/RecentSermons";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";

const inter = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`flex w-full flex-col ${inter.className}`}>
      <div
        style={{
          background: `url("/bible.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`bg-white flex w-full h-screen flex-col  `}
      >
        <Nav />
        <div className="flex w-full max-w-[1700px] h-full mx-auto">
          <div
            style={{
              textShadow: "2px 3px 5px rgba(0, 0, 0, 0.266)",
            }}
            className="flex  w-full h-full items-center p-[4vw] "
          >
            <span className="text-white ">
              <p className="text-3xl font-semibold ">
                Trinity International Bible Church, in Athens, Greece
              </p>
              <h1 className="text-6xl font-bold w-[900px] leading-[110%] my-5">
                Let the word of Christ <br></br> dwell in us and to set our
                affections on things above
              </h1>
              <p className="font-medium text-2xl text-gray-300">
                Join us on Sunday @ 10 AM
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("worship-times");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                    });
                  }
                }}
                className="uppercase font-bold rounded-xl mt-6 bg-primary border-primary text-white text-xl p-4 px-6 "
              >
                Directions & Worship Times
              </button>
            </span>
          </div>
        </div>
      </div>
      <Worshiptimes />
      <RecentSermons />
      <AboutChurch />

      {/* statment of faith */}
      <Faqs />
      <Footer />
    </div>
  );
}
