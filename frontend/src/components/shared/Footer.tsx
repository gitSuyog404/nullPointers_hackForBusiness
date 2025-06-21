"use client";

import type React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { HiMail, HiPhone } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://facebook.com/foodrescue",
  },
  { name: "Twitter", icon: FaTwitter, href: "https://twitter.com/foodrescue" },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com/foodrescue",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com/company/foodrescue",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/@foodrescue",
  },
  {
    name: "GitHub",
    icon: BsGithub,
    href: "https://github.com/foodrescue",
  },
  { name: "Email", icon: AiOutlineMail, href: "mailto:hello@foodrescue.com" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Safety & Guidelines */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Safety & Guidelines
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/food-safety"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Food Safety Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer-guidelines"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Volunteer Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurant-guidelines"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Restaurant Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/quality-standards"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Quality Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/liability"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Food Liability Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/data-protection"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Data Protection
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Press & Media
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/api-docs"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <HiMail className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-300 text-sm">
                hello@foodrescue.com
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <HiPhone className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <MdLocationOn className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-300 text-sm">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-8 px-2">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target={social.name !== "Email" ? "_blank" : undefined}
              rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={social.name}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FoodRescue Platform. All rights
            reserved. | Fighting food waste, feeding communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
