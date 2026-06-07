'use client';

import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  profileImage?: string;
}

function ProfilePage() {
  const [user, setUser] = useState<User>({
    firstName: 'Cloth',
    lastName: 'Buddy',
    email: 'clothbuddy@gmail.com',
    phone: '+09 345 346 46',
    country: 'India',
    city: 'Gurgaon, Haryana',
    postalCode: '12200X',
    profileImage: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex h-16 items-center justify-center bg-black md:h-20 lg:justify-start">
        <Link href="#">
          <h1 className="font-[Sigmar] text-3xl font-semibold text-white lg:ml-6">ClothBuddy</h1>
        </Link>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 p-6 text-black">
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 rounded-lg bg-white p-6 shadow-lg lg:flex-row">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-purple-500 text-2xl font-bold text-white">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
                width={50}
                height={50}
              />
            ) : (
              <span>
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            )}
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-400">
              {user.city}, {user.country}
            </p>
          </div>
        </div>

        <div className="mt-6 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 lg:grid-cols-2">
            {Object.keys(user).map(
              (key) =>
                key !== 'profileImage' && (
                  <div key={key} className="flex flex-col">
                    <p className="font-medium">{key.toUpperCase()}</p>
                    <input
                      type="text"
                      name={key}
                      value={user[key as keyof User]}
                      onChange={handleChange}
                      className="w-full rounded border bg-gray-50 p-2 disabled:bg-gray-200"
                      disabled={!isEditing}
                    />
                  </div>
                )
            )}
          </div>
          <button
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit ✏️'}
          </button>
        </div>

        <div className="mt-6 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Additional Information</h3>
          <p className="text-gray-600">
            This is a placeholder section for extra profile details such as hobbies, interests, or
            professional experience.
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
