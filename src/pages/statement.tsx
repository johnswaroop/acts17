import { Nav } from "@/components/Nav";
import React from "react";

function Icon() {
  return (
    <div className="bg-[#084427] rounded-full p-2 w-min h-min">
      <svg
        className="h-[30px] w-[30px]  "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="white"
      >
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"></path>
      </svg>
    </div>
  );
}

function statement() {
  return (
    <div className="flex w-full bg-[#f7f7f7]">
      <Nav />
      <div className="w-full min-h-screen bg-white">
        <span
          style={{
            backgroundImage: "url('/bg-statement.jpg') ",
          }}
          className="flex  flex-col w-full h-[450px] bg-cover bg-bottom border mt-[86px]"
        >
          <span className="flex backdrop-brightness-75  items-center justify-center flex-col w-full h-full">
            <h1 className="text-[80px] tracking-wide font-medium text-white mb-12">
              Statement of faith
            </h1>
          </span>
        </span>
        <div className="flex flex-col w-full bg-white pb-24 ">
          <div className="flex flex-col text-[25px] items-center bg-[#f7f7f7] w-full   p-4 py-6 text-black  text-[25px] mx-auto  justify-center   h-max ">
            <p className=" leading-[140%]  max-w-[1000px] mt-6">
              There is no Statement of Faith that can replace the inspired,
              authoritative and sufficient Holy Scriptures. Anything written by
              uninspired men, even the best and holiest of men, is not binding
              upon man’s conscience and not to be believed without due searching
              and comparison with the Word of God.
            </p>
            <p className="leading-[140%]  mt-4 max-w-[1000px] mb-6">
              However, a Statement of Faith serves as a summary of the main
              doctrinal beliefs that shape the theology of the church. Our
              theology is most accurately reflected in the 2nd London Baptist
              Confession of Faith of 1689. Our Statement of Faith is below.
            </p>
          </div>

          <div className="flex flex-col gap-14 max-w-[1000px] text-black mx-auto mt-12">
            <div className="flex flex-col gap-2 ">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon /> Of the Holy Scriptures
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe the Bible, consisting of the sixty-six books of the
                Old and New Testaments, is the revelation of God and was written
                by men who were prepared and superintended by the Holy Spirit.
                We believe the Bible is without error in the original
                manuscripts and is our final and infallible authority in all
                matters of faith and conduct. Since the Bible is the very words
                of God, it does not rely upon any church, council, or creed for
                its authority.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon />
                Of the True God
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe there is one true, eternal and unchanging God who is
                three distinct but equal persons: the Father, the Son and the
                Holy Spirit. He is the Creator, Preserver and Lord of the
                universe and governs all things according to His sovereign will
                for His own glory.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon />
                Of Jesus Christ
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe that Jesus Christ is both truly God and truly man. We
                believe in His virgin birth, His sinless life, His death on the
                cross as the only substitutionary sacrifice for our sins, His
                bodily resurrection, His ascension to heaven where He rules over
                all things, and His personal return in power and glory.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon />
                Of Man
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe that Man was created in the image of God to glorify
                Him. However, Man rebelled against his Creator and fell into a
                state of sin. As a result, every aspect of human nature was
                corrupted, and Man became spiritually dead, alienated from God,
                and incapable of saving himself. Man is at enmity with God,
                justly condemned, and thus in need of forgiveness and
                reconciliation with God.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon />
                Of the Way of Salvation
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe that God, in His love, grace and mercy, reconciles
                sinners to Himself through the sacrificial death of Jesus Christ
                on the cross. Those who repent from sin and turn to God in faith
                are forgiven, adopted into God’s family and given eternal life.
                Salvation is by grace alone, through faith alone, in Christ
                alone, according to the Holy Scriptures alone, for the praise
                and glory of God alone.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon />
                Of the Church
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe that the one universal church, the body of Christ, of
                which each local church is a visible expression, consists of all
                true believers born again by the Holy Spirit. As a fellowship of
                believers, the church is called to worship God, grow in the
                grace and knowledge of Him, and bear witness to Christ and His
                kingdom throughout the world.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="relative right-16  text-[40px] font-medium flex items-center gap-3">
                <Icon />
                Of the World to Come
              </h1>
              <p className="leading-[160%] text-[25px]">
                We believe that the Lord Jesus Christ will return personally and
                visibly, to raise the dead and bring to completion His work of
                salvation and judgment. Believers will be welcomed into the
                presence of God forever, while unbelievers will suffer eternal
                punishment in separation from God.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default statement;
