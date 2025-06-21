import React from "react";
import { FaInstagram, FaEnvelope, FaHeart } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <CgGym className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Trainwithhari</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Transforming lives through professional strength training
              programs. Join our community and unlock your potential with
              personalized coaching, nutrition guidance, and unwavering support.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/trainwithharie/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:haranhari350@gmail.com"
                className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#calories"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Calorie Tracker
                </a>
              </li>
              <li>
                <a
                  href="#meal-planner"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Meal Planner
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {/* <FaEnvelope className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">coach@fitcoachpro.com</span> */}
              </div>
              <div className="flex items-center space-x-3">
                <FaInstagram className="h-5 w-5 text-pink-400" />
                <span className="text-gray-400">@trainwithharie</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">
                Ready to Transform?
              </h4>
              <p className="text-gray-400 text-sm mb-3">
                Join hundreds of clients who've achieved their strength goals.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 Trainwithhari. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <FaHeart className="h-4 w-4 text-red-400" />
              <span>for your fitness journey</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
