import React from "react";

const Card = ({ title }: { title: string }) => {
  return (
    <div className="card w-96 bg-white shadow-xl cursor-pointer">
      <figure>
        <img
          src="/cover.jpg"
          alt="Shoes"
          className="max-h-[200px] object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-black">{title}</h2>
        <p className="text-gray-500">
          If a dog chews shoes whose shoes does he choose?
        </p>
      </div>
    </div>
  );
};

function RecentSermons() {
  return (
    <div className="flex flex-col w-full justify-center p-[4vw] max-w-[1700px] mx-auto">
      <h1 className="mx-auto text-4xl font-bold text-white">Recent Sermons</h1>
      <div className="flex w-full w-max-[1700px]  justify-between mt-[4vw]">
        <Card title="Sola Scriptura In The Bible" />
        <Card title="When The World Collapses" />
        <Card title="The Story Of King Manasseh" />
      </div>
      <button className="mx-auto font-bold uppercase rounded-xl mt-[4vw] bg-white text-primary border-primary text-xl p-4 px-6 w-fit ">
        More Sermons
      </button>
    </div>
  );
}

export { RecentSermons };
