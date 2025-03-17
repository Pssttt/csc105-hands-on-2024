import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="flex justify-between items-center px-12 py-4">
        <a className="text-2xl font-bold" href="#">
          Artist John
        </a>
        <nav>
          <ul className="flex items-center list-none gap-9 font-medium text-sm">
            <li>
              <a
                className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded-full transition"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-green-300 transition" href="#">
                About Me
              </a>
            </li>
            <li>
              <a className="hover:text-green-300 transition" href="#">
                Gallery
              </a>
            </li>
          </ul>
        </nav>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none cursor-pointer font-medium rounded-full shadow-lg shadow-green-100 text-sm px-4 py-2 text-center transition"
          type="button"
        >
          Contact
        </button>
      </header>
    </>
  );
};

export default Navbar;
