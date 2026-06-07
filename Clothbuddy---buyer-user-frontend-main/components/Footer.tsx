import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-6 text-white sm:py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Logo and Newsletter Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">ClothBuddy</h2>
          <div className="w-full sm:max-w-md">
            <h3 className="mb-2 text-xs sm:text-sm">Subscribe to our Newsletter</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your E-mail"
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-black sm:px-4"
              />
              <button className="whitespace-nowrap rounded-md bg-pink-300 px-4 py-2 text-sm text-black transition-colors hover:bg-pink-400 sm:px-6">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
          {/* Help Section */}
          <div>
            <h3 className="mb-2 text-sm font-bold sm:mb-4 sm:text-base">Help</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a href="#" className="text-sm transition-colors hover:text-gray-300 sm:text-base">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors hover:text-gray-300 sm:text-base">
                  FAQ's
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="mb-2 text-sm font-bold sm:mb-4 sm:text-base">About Us</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a href="#" className="text-sm transition-colors hover:text-gray-300 sm:text-base">
                  Who are we ?
                </a>
              </li>
            </ul>
          </div>

          {/* Policies Section */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-2 text-sm font-bold sm:mb-4 sm:text-base">Policies</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a href="#" className="text-sm transition-colors hover:text-gray-300 sm:text-base">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors hover:text-gray-300 sm:text-base">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
