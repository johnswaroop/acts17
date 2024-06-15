import React from "react";

function AboutChurch() {
  return (
    <div className="flex w-full h-full bg-gray-200 justify-center ">
      <div className="h-fit w-full max-w-[1700px] flex mx-[4vw]  my-[4vw] rounded-xl overflow-hidden ">
        <picture className="w-[50%] h-[100%] ">
          <img
            src="https://cdn.sylvaniachurch.com/wp-content/uploads/2019/07/25112949/Sylvania-Church-Tyler-Texas.webp"
            alt=""
          />
        </picture>
        <div className="bg-white w-[50%] px-8 pt-8">
          <h1 className="text-5xl font-semibold text-black leading-[115%]">
            A Quick Intro to Acts Seventeen Church
          </h1>
          <p className="text-2xl font-light mt-3 leading-[120%] text-gray-500">
            Sylvania Church is centered on the gospel. And we`re committed to
            expository preaching, biblical fellowship, and making disciples.
            Theologically, we`re a reformed Southern Baptist church. And we want
            to see Jesus treasured (Matthew 13:44) not only here in Tyler, but
            everywhere on earth. To learn more, check out…
          </p>
          <button className="uppercase rounded-xl mt-6 bg-primary border-primary text-white text-xl p-4 px-6 w-fit font-medium">
            What we believe
          </button>
        </div>
      </div>
    </div>
  );
}

export { AboutChurch };
