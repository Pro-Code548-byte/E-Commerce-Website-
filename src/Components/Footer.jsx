import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">JUMIA</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your trusted online shopping destination for quality products at
              great prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-orange-400 transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-orange-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-orange-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-orange-400 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-300 hover:text-white transition"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="text-gray-300 hover:text-white transition"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account"
                  className="text-gray-300 hover:text-white transition"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className="text-gray-300 hover:text-white transition"
                >
                  Careers
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Returns & Refunds
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Payment */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Contact Us
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <MdLocationOn className="text-xl text-orange-400" />
                <span className="text-sm">123 Shopping St, City, Country</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MdPhone className="text-xl text-orange-400" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MdEmail className="text-xl text-orange-400" />
                <span className="text-sm">support@jumia.com</span>
              </div>
            </div>
            <h5 className="text-sm font-semibold mb-2 text-orange-400">
              We Accept
            </h5>
            <div className="flex gap-3">
              <SiVisa className="text-2xl text-gray-400" />
              <SiMastercard className="text-2xl text-gray-400" />
              <SiPaypal className="text-2xl text-gray-400" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-700 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2026 Jumia. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Sitemap
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie Settings
            </a>
            <NavLink to="/contact" className="hover:text-white transition">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
