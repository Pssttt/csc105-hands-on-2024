import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="grid grid-cols-1 md:grid-cols-2 my-12 items-center gap-8 mx-24 px-8 md:px-20 py-12"
      >
        <div>
          <div className="space-y-4 md:space-y-6">
            <p className="text-lg font-medium">Hello, It’s me</p>
            <h1 className="text-4xl md:text-5xl font-extrabold">Artist John</h1>
            <h2 className="text-xl font-semibold">I’m an Artist</h2>
            <p className="text-gray-600">
              Please hold your breath as we dive into a world full of creativity
              with designer John.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-12 mb-12">
            <a
              href="#"
              className="w-15 h-15 border border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a
              href="#"
              className="w-15 h-15 border border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="#"
              className="w-15 h-15 border border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
          </div>
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none transition cursor-pointer font-medium rounded-full shadow-lg shadow-green-100 text-lg px-12 py-2 text-center"
            type="button"
          >
            My Portfolio
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src="https://www.pngall.com/wp-content/uploads/9/Male-Entrepreneur-PNG-Free-Image.png"
            alt="Artist John"
            className="w-72 md:w-96 object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
