'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';

// Define types for account options & quick links
interface AccountOption {
  name: string;
  icon: string;
  href: string;
}

const accountOptions: AccountOption[] = [
  { name: 'Account Information', icon: 'ri-account-circle-line', href: '#' },
  { name: 'Saved Addresses', icon: 'ri-map-pin-line', href: '#' },
  { name: 'Saved Credit / Debit & Gift Cards', icon: 'ri-bank-card-line', href: '#' },
  { name: 'Privacy Settings', icon: 'ri-git-repository-private-line', href: '#' },
];

const quickLinks: AccountOption[] = [
  { name: 'Orders', icon: 'ri-instance-line', href: '#' },
  { name: 'Wishlist', icon: 'ri-heart-line', href: '#' },
  { name: 'Coupons', icon: 'ri-gift-line', href: '#' },
  { name: 'Help Center', icon: 'ri-customer-service-2-fill', href: '#' },
];

const UserAccount: React.FC = () => {
  // Wallet Balance
  const [balance, setBalance] = useState<number>(100);
  const [userName, setUserName] = useState<string>('Ajay Kumar');

  return (
    <div className="bg-[#E2E8F0]">
      {/* Header */}
      <div className="flex h-16 items-center justify-center bg-black md:h-20 lg:justify-start">
        <Link href="#">
          <h1 className="font-[Sigmar] text-3xl font-semibold text-white lg:ml-6">ClothBuddy</h1>
        </Link>
      </div>

      {/* User Info */}
      <div className="bg-white px-4 py-10 shadow-md md:px-8">
        <div className="justify-between rounded-xl border-2 p-6 text-black md:flex">
          <div className="flex items-center gap-x-14 md:gap-x-10">
            {/* User Image */}
            <div className="h-22 w-22 overflow-hidden rounded-full border-2">
              <Image
                src="/mens.png"
                width={100}
                height={100}
                className="h-22 w-22 rounded-full object-cover duration-300 ease-linear hover:scale-110"
                alt="User Avatar"
                priority
              />
            </div>
            <div>
              <h1 className="font-[ubuntu] text-2xl font-semibold">Hi, {userName}</h1>
              <h2 className="mt-1 text-sm md:text-base">
                Wallet Balance <i className="ri-money-rupee-circle-line"></i>
                {balance}
              </h2>
            </div>
          </div>
          {/* Quick Links */}
          <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-5 px-4 py-10 text-base md:px-8 md:text-lg lg:mt-0 lg:grid-cols-4 lg:grid-rows-none lg:gap-x-10 lg:gap-y-0">
            {quickLinks.map(({ name, icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="rounded-xl border-2 px-0 py-2 text-center text-black duration-200 ease-linear hover:bg-blue-400 hover:text-white lg:px-2"
              >
                <i className={`${icon} mr-2`}></i> {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-2 bg-white px-4 py-10 text-black shadow-md md:px-8">
        <h2 className="font-[ubuntu] text-2xl font-semibold md:text-3xl">Account Settings</h2>
        <div className="mt-5 rounded-xl border-2 p-4 py-5 text-base md:text-lg">
          {accountOptions.map(({ name, icon, href }, index) => (
            <React.Fragment key={index}>
              <Link href={href} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <i className={`${icon} text-xl text-[#2A55E5]`}></i>
                  <h1>{name}</h1>
                </div>
                <i className="ri-arrow-right-s-line"></i>
              </Link>
              {index < accountOptions.length - 1 && <hr className="mb-3 mt-1" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Earning section */}
      <div className="mb-2 bg-white px-4 py-10 text-black shadow-md md:px-8">
        <h2 className="font-[ubuntu] text-2xl font-semibold md:text-3xl">Earn with ClothBuddy</h2>
        <div className="mt-5 flex items-center justify-between rounded-xl border-2 p-4 py-5 text-base md:text-lg">
          <div className="flex items-center gap-2">
            <i className="ri-store-2-line text-[#2A55E5]"></i>
            <Link href="#">Sell on ClothBuddy</Link>
          </div>
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>

      {/* Feedback and Info Section */}
      <div className="mb-2 bg-white px-4 py-10 text-black shadow-md md:px-8">
        <h2 className="font-[ubuntu] text-2xl font-semibold md:text-3xl">Feedback & Information</h2>

        <div className="mt-5 rounded-xl border-2 p-4 py-5 text-base md:text-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="ri-article-line text-[#2A55E5]"></i>
              <Link href="#">Terms and Conditions</Link>
            </div>
            <i className="ri-arrow-right-s-line"></i>
          </div>
          <hr className="mb-3 mt-1" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="ri-feedback-line text-[#2A55E5]"></i>
              <Link href="#">Feedback</Link>
            </div>
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </div>
      </div>

      {/* LogOut Button */}
      <div className="mb-2 bg-white px-4 py-8 text-black shadow-md">
        <button className="w-full rounded-lg bg-black py-3 text-lg font-bold text-white md:w-56">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserAccount;
