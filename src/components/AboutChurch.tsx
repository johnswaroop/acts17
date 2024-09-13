import React from "react";

function AboutChurch() {
  return (
    <div className="flex w-full h-full bg-gray-200 justify-center ">
      <div className="h-fit w-full max-w-[1700px] flex mx-[4vw]  my-[4vw] rounded-xl overflow-hidden ">
        <picture className="w-[50%] h-[100%] ">
          <img src="/congregation.jpeg" alt="" />
        </picture>
        <div className="bg-white w-[50%] px-8 pt-8">
          <h1 className="text-3xl font-semibold capitalize text-black leading-[115%]">
            A Quick Intro to Trinity international bible church
          </h1>
          <p className="text-lg font-light mt-3 leading-[150%] text-gray-500">
            Trinity International Bible Church is an evangelical assembly
            adhering to historic Bible teaching, with members and visitors from
            many continents, but with one common faith in Jesus Christ.
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
