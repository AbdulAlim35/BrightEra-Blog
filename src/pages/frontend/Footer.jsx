import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import settingDatabas from "../../app/settingDatabas";
import { useTheme } from "../../contex/TheemProvider";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  const { logo, icone } = useTheme();

  const icons = {
    facebook: <FaFacebook className="inline mr-1" />,
    twitter: <FaTwitter className="inline mr-1" />,
    linkedin: <FaLinkedin className="inline mr-1" />,
    github: <FaGithub className="inline mr-1" />,
  };

  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{logo?.logo}</h3>
            <p className="text-gray-300 mb-6 max-w-md">{logo?.text}</p>
            <div className="flex space-x-4">
              {icone?.sociallink &&
                JSON.parse(icone?.sociallink).map((item, idx) => (
                  <a key={idx} href={item.url} target="_blank">
                    {icons[item.type]}
                  </a>
                ))}
              {/* {Array.isArray(icone) &&icone.map((item) => (
                <div
                  key={item.$id}
                  className="bg-white p-4 rounded-md shadow mb-3"
                >
                  <h4 className="font-medium mb-2">Links:</h4>
                  <ul className="space-y-1">
                    {JSON.parse(item.sociallink).map((link, idx) => (
                      <li key={idx}>
                        <span>{icons[link.type]}</span> 
                        <a
                          href={link.url}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.type}: {link.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/home/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/home/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/home/nev/technology"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/home/nev/business"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/home/nev/design"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to="/home/nev/development"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Development
                </Link>
              </li>
              <li>
                <Link
                  to="/home/nev/marketing"
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Marketing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-center text-gray-500 text-sm">
            © 2025 BrightEra — Covering Technology, Business, Design,
            Development & Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
