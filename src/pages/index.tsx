import Image from "next/image";
import { Inter } from "next/font/google";
import { Nav } from "../components/Nav";
import { Worshiptimes } from "../components/Worshiptimes";
import { AboutChurch } from "../components/AboutChurch";
import { RecentSermons } from "../components/RecentSermons";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div
        style={{
          background: `url("/hero1.jpg")`,
          backgroundSize: "cover",
        }}
        className="bg-white flex w-full h-screen flex-col"
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
              <p className="text-4xl font-semibold ">
                Trinity International Bible Church
              </p>
              <h1 className="text-7xl font-bold w-[900px] leading-[110%] my-5">
                Let the word of Christ <br></br> dwell in us and to set our
                affections on things above
              </h1>
              <p className="font-medium text-2xl text-gray-300">
                Join us on Sunday @ 10 AM
              </p>
              <button className="uppercase rounded-xl mt-6 bg-primary border-primary text-white text-xl p-4 px-6 font-medium">
                Worship Times
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
    </>
  );
}
