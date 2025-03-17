import React from "react";

const AboutMe = () => {
  return (
    <>
      <section
        id="about"
        className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-24 px-8 md:px-20 py-12"
      >
        <div className="flex justify-center">
          <img
            src="https://pngimg.com/d/man_PNG6531.png"
            alt="Artist John"
            className="w-72 md:w-96 object-cover"
          />
        </div>
        <div>
          <div className="space-y-4 md:space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold">About Me</h1>
            <h2 className="text-xl font-semibold">Artist & Designer</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              eveniet doloribus similique unde! Eligendi, deserunt totam quaerat
              laborum, veritatis aliquid placeat quis hic facilis officiis
              dolore ea aperiam consequuntur modi?
            </p>
          </div>
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none transition cursor-pointer font-medium rounded-full shadow-lg shadow-green-100 text-lg px-8 py-2 text-center"
            type="button"
          >
            Read More
          </button>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
